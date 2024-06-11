"use client";

import log from "loglevel";
import { createContext } from "react";
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
} from "@neet-nestor/web-llm";

import { ChatOptions, LLMApi, LLMConfig, RequestMessage } from "./api";
import { LogLevel } from "@neet-nestor/web-llm";

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
  webllm: WebLLMHandler;

  constructor(
    type: "serviceWorker" | "webWorker",
    logLevel: LogLevel = "WARN",
  ) {
    const engineConfig = {
      appConfig: {
        ...prebuiltAppConfig,
        useIndexedDBCache: this.llmConfig?.cache === "index_db",
      },
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

  async initModel(onUpdate?: (message: string, chunk: string) => void) {
    if (!this.llmConfig) {
      throw Error("llmConfig is undefined");
    }
    this.webllm.engine.setInitProgressCallback((report: InitProgressReport) => {
      onUpdate?.(report.text, report.text);
    });
    if (this.webllm.type === "serviceWorker") {
      await this.webllm.engine.reload(this.llmConfig.model, this.llmConfig);
    } else {
      await this.webllm.engine.reload(this.llmConfig.model, this.llmConfig);
    }
    this.initialized = true;
  }

  isConfigChanged(config: LLMConfig) {
    return (
      this.llmConfig?.model !== config.model ||
      this.llmConfig?.cache !== config.cache ||
      this.llmConfig?.temperature !== config.temperature ||
      this.llmConfig?.top_p !== config.top_p ||
      this.llmConfig?.presence_penalty !== config.presence_penalty ||
      this.llmConfig?.frequency_penalty !== config.frequency_penalty
    );
  }

  async chat(options: ChatOptions): Promise<void> {
    if (!this.initialized || this.isDifferentConfig(options.config)) {
      this.llmConfig = { ...(this.llmConfig || {}), ...options.config };
      try {
        await this.initModel(options.onUpdate);
      } catch (err: any) {
        let errorMessage = err.message || err.toString() || "";
        if (errorMessage === "[object Object]") {
          errorMessage = JSON.stringify(err);
        }
        console.error("Error while initializing the model", errorMessage);
        options?.onError?.(errorMessage);
        return;
      }
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
      if (!errorMessage.includes("MLCEngine.reload(model)")) {
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
      // Service worker has been stopped. Restart it
      try {
        await this.initModel(options.onUpdate);
      } catch (err: any) {
        let errorMessage = err.message || err.toString() || "";
        if (errorMessage === "[object Object]") {
          errorMessage = JSON.stringify(err);
        }
        console.error("Error while initializing the model", errorMessage);
        options?.onError?.(errorMessage);
        return;
      }
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
          errorMessage = JSON.stringify(err);
        }
        console.error("Error in chatCompletion", errorMessage);
        options.onError?.(errorMessage);
        return;
      }
    }

    if (reply) {
      options.onFinish(reply, stopReason, usage);
    } else {
      options.onError?.(new Error("Empty response generated by LLM"));
    }
  }

  async abort() {
    await this.webllm.engine?.interruptGenerate();
  }

  async usage() {
    return {
      used: 0,
      total: 0,
    };
  }

  isDifferentConfig(config: LLMConfig): boolean {
    if (!this.llmConfig) {
      return true;
    }

    // Compare required fields
    if (this.llmConfig.model !== config.model) {
      return true;
    }

    // Compare optional fields
    const optionalFields: (keyof LLMConfig)[] = [
      "temperature",
      "top_p",
      "stream",
      "presence_penalty",
      "frequency_penalty",
    ];

    for (const field of optionalFields) {
      if (
        this.llmConfig[field] !== undefined &&
        config[field] !== undefined &&
        config[field] !== config[field]
      ) {
        return true;
      }
    }

    return false;
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
    const completion = await this.webllm.engine.chatCompletion({
      stream: stream,
      messages: messages as ChatCompletionMessageParam[],
      ...(stream ? { stream_options: { include_usage: true } } : {}),
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
}

export const WebLLMContext = createContext<WebLLMApi | undefined>(undefined);
