import { ChatCompletionFinishReason, CompletionUsage } from "@mlc-ai/web-llm";
import { CacheType, Model } from "../store";
import { ModelFamily } from "../constant";
export const ROLES = ["system", "user", "assistant"] as const;
export type MessageRole = (typeof ROLES)[number];

export const Models = ["gpt-3.5-turbo", "gpt-4"] as const;
export type ChatModel = Model;

export interface MultimodalContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: {
    url: string;
  };
  dimension?: {
    width: number;
    height: number;
  };
}

export interface RequestMessage {
  role: MessageRole;
  content: string | MultimodalContent[];
}

export interface LLMConfig {
  model: string;
  cache: CacheType;
  temperature?: number;
  context_window_size?: number;
  top_p?: number;
  stream?: boolean;
  presence_penalty?: number;
  frequency_penalty?: number;
  enable_thinking?: boolean;
}

export interface ChatOptions {
  messages: RequestMessage[];
  config: LLMConfig;

  onUpdate?: (message: string, chunk: string) => void;
  onFinish: (
    message: string,
    stopReason?: ChatCompletionFinishReason,
    usage?: CompletionUsage,
  ) => void;
  onError?: (err: Error) => void;
}

export interface LLMUsage {
  used: number;
  total: number;
}

export interface ModelRecord {
  name: string;
  display_name: string;
  provider?: string;
  size?: string;
  quantization?: string;
  family: ModelFamily;
  recommended_config?: {
    temperature?: number;
    context_window_size?: number;
    top_p?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
  };
}

export abstract class LLMApi {
  abstract chat(options: ChatOptions): Promise<void>;
  abstract abort(): Promise<void>;
  abstract models(): Promise<ModelRecord[] | Model[]>;
}
