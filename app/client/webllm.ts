"use client";

import log from "loglevel";
import {
  InitProgressReport,
  prebuiltAppConfig,
  ChatCompletionMessageParam,
  ServiceWorkerMLCEngine,
  ChatCompletionChunk,
  ChatCompletion,
  WebWorkerMLCEngine,
  CompletionUsage,
  ChatCompletionFinishReason,
} from "@mlc-ai/web-llm";

import { ChatOptions, LLMApi, LLMConfig, RequestMessage } from "./api";
import { LogLevel } from "@mlc-ai/web-llm";
import { fixMessage } from "../utils";
import { DEFAULT_MODELS } from "../constant";

const KEEP_ALIVE_INTERVAL = 5_000;

type ServiceWorkerWebLLMHandler = {
  type: "serviceWorker";
  engine: ServiceWorkerMLCEngine;
};

type WebWorkerWebLLMHandler = {
  type: "webWorker";
  engine: WebWorkerMLCEngine;
};

type WebLLMHandler = ServiceWorkerWebLLMHandler | WebWorkerWebLLMHandler;

export class WebLLMApi implements LLMApi {
  private llmConfig?: LLMConfig;
  private initialized = false;
  private loading = false;
  private pendingChat = Promise.resolve();
  private abortId = 0;
  webllm: WebLLMHandler;

  constructor(
    type: "serviceWorker" | "webWorker",
    logLevel: LogLevel = "WARN",
  ) {
    const engineConfig = {
      appConfig: prebuiltAppConfig,
      logLevel,
    };

    if (type === "serviceWorker") {
      log.info("Create ServiceWorkerMLCEngine");
      this.webllm = {
        type: "serviceWorker",
        engine: new ServiceWorkerMLCEngine(engineConfig, KEEP_ALIVE_INTERVAL),
      };
    } else {
      log.info("Create WebWorkerMLCEngine");
      this.webllm = {
        type: "webWorker",
        engine: new WebWorkerMLCEngine(
          new Worker(new URL("../worker/web-worker.ts", import.meta.url), {
            type: "module",
          }),
          engineConfig,
        ),
      };
    }
  }

  private async initModel(onUpdate?: (message: string, chunk: string) => void) {
    if (!this.llmConfig) {
      throw Error("llmConfig is undefined");
    }
    this.webllm.engine.setInitProgressCallback((report: InitProgressReport) => {
      onUpdate?.(report.text, report.text);
    });
    this.webllm.engine.setAppConfig({
      ...prebuiltAppConfig,
      cacheBackend: this.llmConfig.cache === "index_db" ? "indexeddb" : "cache",
    });
    await this.webllm.engine.reload(this.llmConfig.model, {
      context_window_size: this.llmConfig.context_window_size,
    });
    this.initialized = true;
  }

  chat(options: ChatOptions): Promise<void> {
    const abortId = this.abortId;
    const request = this.pendingChat.then(() => this.runChat(options, abortId));
    this.pendingChat = request.catch(() => {});
    return request;
  }

  private async runChat(options: ChatOptions, abortId: number): Promise<void> {
    if (abortId !== this.abortId) {
      options.onFinish("", "abort");
      return;
    }
    const config = { ...this.llmConfig, ...options.config };
    const reload = !this.initialized || this.isDifferentConfig(config);
    const cacheChanged =
      this.initialized && this.llmConfig?.cache !== config.cache;
    this.llmConfig = config;
    if (reload) {
      this.initialized = false;
      this.loading = true;
      try {
        if (cacheChanged) await this.webllm.engine.unload();
        await this.initModel(options.onUpdate);
      } catch (err: any) {
        if (abortId !== this.abortId) {
          options.onFinish("", "abort");
          return;
        }
        let errorMessage = err.message || err.toString() || "";
        if (errorMessage === "[object Object]") {
          errorMessage = JSON.stringify(err);
        }
        console.error("Error while initializing the model", errorMessage);
        options?.onError?.(errorMessage);
        return;
      } finally {
        this.loading = false;
      }
    }

    if (abortId !== this.abortId) {
      this.initialized = false;
      options.onFinish("", "abort");
      return;
    }

    let reply: string | null = "";
    let stopReason: ChatCompletionFinishReason | undefined;
    let usage: CompletionUsage | undefined;
    try {
      const completion = await this.chatCompletion(
        !!options.config.stream,
        options.messages,
        options.onUpdate,
      );
      reply = completion.content;
      stopReason = completion.stopReason;
      usage = completion.usage;
    } catch (err: any) {
      let errorMessage = err.message || err.toString() || "";
      if (errorMessage === "[object Object]") {
        log.error(JSON.stringify(err));
        errorMessage = JSON.stringify(err);
      }
      console.error("Error in chatCompletion", errorMessage);
      if (
        errorMessage.includes("WebGPU") &&
        errorMessage.includes("compatibility chart")
      ) {
        // Add WebGPU compatibility chart link
        errorMessage = errorMessage.replace(
          "compatibility chart",
          "[compatibility chart](https://caniuse.com/webgpu)",
        );
      }
      options.onError?.(errorMessage);
      return;
    }

    if (abortId !== this.abortId) {
      options.onFinish(reply ? fixMessage(reply) : "", "abort", usage);
    } else if (reply) {
      reply = fixMessage(reply);
      options.onFinish(reply, stopReason, usage);
    } else {
      options.onError?.(new Error("Empty response generated by LLM"));
    }
  }

  async abort() {
    this.abortId++;
    if (this.loading) {
      await this.webllm.engine.unload();
    } else {
      await this.webllm.engine.interruptGenerate();
    }
  }

  private isDifferentConfig(config: LLMConfig): boolean {
    if (!this.llmConfig) {
      return true;
    }

    return (
      this.llmConfig.model !== config.model ||
      this.llmConfig.cache !== config.cache ||
      this.llmConfig.context_window_size !== config.context_window_size
    );
  }

  async chatCompletion(
    stream: boolean,
    messages: RequestMessage[],
    onUpdate?: (
      message: string,
      chunk: string,
      usage?: CompletionUsage,
    ) => void,
  ) {
    // For Qwen3 models, we need to filter out the <think>...</think> content
    // Do not do it inplace, create a new messages array
    let newMessages: RequestMessage[] | undefined;
    const isQwen3Model = this.llmConfig?.model
      ?.toLowerCase()
      .startsWith("qwen3");
    if (isQwen3Model) {
      newMessages = messages.map((message) => {
        const newMessage = { ...message };
        if (
          message.role === "assistant" &&
          typeof message.content === "string"
        ) {
          newMessage.content = message.content.replace(
            /^<think>[\s\S]*?<\/think>\n?\n?/,
            "",
          );
        }
        return newMessage;
      });
    }

    // Prepare extra_body with enable_thinking option for Qwen3 models
    const extraBody: Record<string, any> = {};
    if (isQwen3Model) {
      extraBody.enable_thinking = this.llmConfig?.enable_thinking ?? false;
    }

    const thinking = isQwen3Model && this.llmConfig?.enable_thinking;
    const completion = await this.webllm.engine.chat.completions.create({
      stream: stream,
      messages: (newMessages || messages) as ChatCompletionMessageParam[],
      temperature: thinking ? 0.6 : this.llmConfig?.temperature,
      top_p: thinking ? 0.95 : this.llmConfig?.top_p,
      max_tokens: this.llmConfig?.max_tokens,
      presence_penalty: this.llmConfig?.presence_penalty,
      frequency_penalty: this.llmConfig?.frequency_penalty,
      ...(stream ? { stream_options: { include_usage: true } } : {}),
      ...(Object.keys(extraBody).length > 0 ? { extra_body: extraBody } : {}),
    });

    if (stream) {
      let content: string | null = "";
      let stopReason: ChatCompletionFinishReason | undefined;
      let usage: CompletionUsage | undefined;
      const asyncGenerator = completion as AsyncIterable<ChatCompletionChunk>;
      for await (const chunk of asyncGenerator) {
        if (chunk.choices[0]?.delta.content) {
          content += chunk.choices[0].delta.content;
          onUpdate?.(content, chunk.choices[0].delta.content);
        }
        if (chunk.usage) {
          usage = chunk.usage;
        }
        if (chunk.choices[0]?.finish_reason) {
          stopReason = chunk.choices[0].finish_reason;
        }
      }
      return { content, stopReason, usage };
    }

    const chatCompletion = completion as ChatCompletion;
    return {
      content: chatCompletion.choices[0].message.content,
      stopReason: chatCompletion.choices[0].finish_reason,
      usage: chatCompletion.usage,
    };
  }

  async models() {
    return DEFAULT_MODELS;
  }
}
