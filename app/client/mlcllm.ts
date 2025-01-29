import log from "loglevel";
import { ChatOptions, LLMApi } from "./api";
import {
  ChatCompletionFinishReason,
  CompletionUsage,
  ChatCompletion,
} from "@mlc-ai/web-llm";

export class MlcLLMApi implements LLMApi {
  private endpoint: string;
  private abortController: AbortController | null = null;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async chat(options: ChatOptions) {
    const { messages, config } = options;

    const payload = {
      messages: messages,
      ...config,
    };

    // Instantiate a new AbortController for this request
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    let reply: string = "";
    let stopReason: ChatCompletionFinishReason | undefined;
    let usage: CompletionUsage | undefined;

    try {
      const response = await fetch(`${this.endpoint}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal,
      });

      if (config.stream) {
        const reader = response.body!.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          // Extracting the data part from the server response
          const chunk = new TextDecoder("utf-8").decode(value);
          const result = chunk.match(/data: (.+)/);
          if (result) {
            try {
              const data = JSON.parse(result[1]);
              if (data.choices && data.choices.length > 0) {
                reply += data.choices[0].delta.content; // Append the content
                options.onUpdate?.(reply, chunk); // Handle the chunk update

                if (data.choices[0].finish_reason) {
                  stopReason = data.choices[0].finish_reason;
                }

                if (data.usage) {
                  usage = data.usage;
                }
              }
            } catch (e) {
              log.error(
                "Error parsing streaming response from MLC-LLM server",
                e,
              );
            }
          }

          if (chunk.includes("[DONE]")) {
            // Ending the stream when "[DONE]" is found
            break;
          }
        }
        options.onFinish(reply, stopReason, usage);
      } else {
        const data = await response.json();
        options.onFinish(
          data.choices[0].message.content,
          data.choices[0].finish_reason || undefined,
          data.usage || undefined,
        );
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        log.info("MLC_LLM: chat aborted");
      } else {
        log.error("MLC_LLM: Fetch error:", error);
        options.onError?.(error);
      }
    }
  }

  // Implements the abort method to cancel the request
  async abort() {
    this.abortController?.abort();
  }

  async models() {
    try {
      const response = await fetch(`${this.endpoint}/v1/models`, {
        method: "GET",
      });
      const jsonRes = await response.json();
      return jsonRes.data.map((model: { id: string }) => ({
        name: model.id,
        display_name: model.id.split("/")[model.id.split("/").length - 1],
      }));
    } catch (error: any) {
      log.error("MLC_LLM: Fetch error:", error);
    }
  }
}
