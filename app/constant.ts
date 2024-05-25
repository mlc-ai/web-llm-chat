import { LLMModel } from "./client/api";

export const OWNER = "mlc-ai";
export const REPO = "web-llm-chat";
export const WEBLLM_HOME_URL = "https://webllm.mlc.ai";
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const ISSUE_URL = `https://github.com/${OWNER}/${REPO}/issues`;

export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  Templates = "/templates",
}

export enum ApiPath {
  Cors = "",
}

export enum SlotID {
  AppBody = "app-body",
  CustomModel = "custom-model",
}

export enum FileName {
  Templates = "templates.json",
  Prompts = "prompts.json",
}

export enum StoreKey {
  Chat = "chat-next-web-store",
  Access = "access-control",
  Config = "app-config",
  Templates = "templates-store",
  Prompt = "prompt-store",
  Update = "chat-update",
  Sync = "sync",
}

export const DEFAULT_SIDEBAR_WIDTH = 320;
export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 260;
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "nk-";

export const LAST_INPUT_KEY = "last-input";
export const UNFINISHED_INPUT = (name: string) => "unfinished-input-" + name;

export const STORAGE_KEY = "chatgpt-next-web";

export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export const DEFAULT_INPUT_TEMPLATE = `{{input}}`; // input / time / model / lang

export const DEFAULT_SYSTEM_TEMPLATE = `
You are an AI large language model assistant trained by {{provider}}.
You are currently engaging with users on WebLLM Chat, an open-source AI Chatbot UI developed by MLC.ai (Machine Learning Compilation).
Model display_name:  {{model}}
The current date and time is {{time}}.
Latex inline format: \\(x^2\\) 
Latex block format: $$e=mc^2$$
`;

export const DEFAULT_MODELS: LLMModel[] = [
  {
    name: "Llama-3-8B-Instruct-q4f32_1",
    display_name: "Llama 3",
    provider: "Meta",
    size: "8B",
    quantization: "q4f32_1",
    is_default: true,
    family: "Llama 3",
  },
  {
    name: "Llama-3-8B-Instruct-q4f16_1",
    display_name: "Llama 3",
    provider: "Meta",
    size: "8B",
    quantization: "q4f16_1",
    family: "Llama 3",
  },
  {
    name: "Llama-3-8B-Instruct-q4f32_1-1k",
    display_name: "Llama 3",
    provider: "Meta",
    size: "8B",
    quantization: "q4f32_1",
    context_length: "1k",
    family: "Llama 3",
  },
  {
    name: "Llama-3-8B-Instruct-q4f16_1-1k",
    display_name: "Llama 3",
    provider: "Meta",
    size: "8B",
    quantization: "q4f16_1",
    context_length: "1k",
    family: "Llama 3",
  },
  {
    name: "Llama-3-70B-Instruct-q3f16_1",
    display_name: "Llama 3",
    provider: "Meta",
    size: "70B",
    quantization: "q3f16_1",
    family: "Llama 3",
  },
  {
    name: "Llama-2-7b-chat-hf-q4f32_1-1k",
    display_name: "Llama 2",
    provider: "Meta",
    size: "7B",
    quantization: "q4f32_1",
    context_length: "1k",
    family: "Llama 2",
  },
  {
    name: "Llama-2-7b-chat-hf-q4f16_1-1k",
    display_name: "Llama 2",
    provider: "Meta",
    size: "7B",
    quantization: "q4f16_1",
    context_length: "1k",
    family: "Llama 2",
  },
  {
    name: "Llama-2-7b-chat-hf-q4f32_1",
    display_name: "Llama 2",
    provider: "Meta",
    size: "7B",
    quantization: "q4f32_1",
    family: "Llama 2",
  },
  {
    name: "Llama-2-7b-chat-hf-q4f16_1",
    display_name: "Llama 2",
    provider: "Meta",
    size: "7B",
    family: "Llama 2",
  },
  {
    name: "Llama-2-13b-chat-hf-q4f16_1",
    display_name: "Llama 2",
    provider: "Meta",
    size: "13B",
    quantization: "q4f16_1",
    family: "Llama 2",
  },
  {
    name: "WizardMath-7B-V1.1-q4f16_1",
    display_name: "WizardMath",
    provider: "WizardLM",
    size: "7B",
    quantization: "q4f16_1",
    family: "WizardMath",
  },
  {
    name: "Mistral-7B-Instruct-v0.2-q4f16_1",
    display_name: "Mistral",
    provider: "Mistral AI",
    size: "7B",
    quantization: "q4f16_1",
    family: "Mistral",
  },
  {
    name: "OpenHermes-2.5-Mistral-7B-q4f16_1",
    display_name: "OpenHermes 2.5",
    provider: "NousResearch",
    size: "7B",
    quantization: "q4f16_1",
    family: "Hermes",
  },
  {
    name: "NeuralHermes-2.5-Mistral-7B-q4f16_1",
    display_name: "NeuralHermes 2.5",
    provider: "Maxime Labonne",
    size: "7B",
    quantization: "q4f16_1",
    family: "Hermes",
  },
  {
    name: "Hermes-2-Pro-Mistral-7B-q4f16_1",
    display_name: "Hermes 2 Pro",
    provider: "NousResearch",
    size: "7B",
    quantization: "q4f16_1",
    family: "Hermes",
  },
  {
    name: "gemma-2b-it-q4f16_1",
    display_name: "Gemma",
    provider: "Google",
    size: "2B",
    quantization: "q4f16_1",
    family: "Gemma",
  },
  {
    name: "gemma-2b-it-q4f32_1",
    display_name: "Gemma",
    provider: "Google",
    size: "2B",
    quantization: "q4f32_1",
    family: "Gemma",
  },
  {
    name: "gemma-2b-it-q4f16_1-1k",
    display_name: "Gemma",
    provider: "Google",
    size: "2B",
    quantization: "q4f16_1",
    context_length: "1k",
    family: "Gemma",
  },
  {
    name: "gemma-2b-it-q4f32_1-1k",
    display_name: "Gemma",
    provider: "Google",
    size: "2B",
    quantization: "q4f32_1",
    context_length: "1k",
    family: "Gemma",
  },
  {
    name: "RedPajama-INCITE-Chat-3B-v1-q4f16_1",
    display_name: "RedPajama",
    provider: "Together",
    size: "3B",
    quantization: "q4f16_1",
    family: "RedPajama",
  },
  {
    name: "RedPajama-INCITE-Chat-3B-v1-q4f32_1",
    display_name: "RedPajama",
    provider: "Together",
    size: "3B",
    quantization: "q4f32_1",
    family: "RedPajama",
  },
  {
    name: "RedPajama-INCITE-Chat-3B-v1-q4f16_1-1k",
    display_name: "RedPajama",
    provider: "Together",
    size: "3B",
    quantization: "q4f16_1",
    context_length: "1k",
    family: "RedPajama",
  },
  {
    name: "RedPajama-INCITE-Chat-3B-v1-q4f32_1-1k",
    display_name: "RedPajama",
    provider: "Together",
    size: "3B",
    quantization: "q4f32_1",
    context_length: "1k",
    family: "RedPajama",
  },
  {
    name: "Phi2-q0f16",
    display_name: "Phi 2",
    provider: "Microsoft",
    quantization: "q0f16",
    family: "Phi2",
  },
  {
    name: "Phi2-q0f32",
    display_name: "Phi 2",
    provider: "Microsoft",
    quantization: "q0f32",
    family: "Phi2",
  },
  {
    name: "Phi2-q4f16_1",
    display_name: "Phi 2",
    provider: "Microsoft",
    quantization: "q4f16_1",
    family: "Phi2",
  },
  {
    name: "Phi2-q4f32_1",
    display_name: "Phi 2",
    provider: "Microsoft",
    quantization: "q4f32_1",
    family: "Phi2",
  },
  {
    name: "Phi2-q4f16_1-1k",
    display_name: "Phi 2",
    provider: "Microsoft",
    quantization: "q4f16_1",
    context_length: "1k",
    family: "Phi2",
  },
  {
    name: "Phi2-q4f32_1-1k",
    display_name: "Phi 2",
    provider: "Microsoft",
    quantization: "q4f32_1",
    context_length: "1k",
    family: "Phi2",
  },
  {
    name: "Phi1.5-q0f16",
    display_name: "Phi 1.5",
    provider: "Microsoft",
    quantization: "q0f16",
    family: "Phi1.5",
  },
  {
    name: "Phi1.5-q0f32",
    display_name: "Phi 1.5",
    provider: "Microsoft",
    quantization: "q0f32",
    family: "Phi1.5",
  },
  {
    name: "Phi1.5-q4f16_1-1k",
    display_name: "Phi 1.5",
    provider: "Microsoft",
    quantization: "q4f16_1",
    context_length: "1k",
    family: "Phi1.5",
  },
  {
    name: "Phi1.5-q4f32_1-1k",
    display_name: "Phi 1.5",
    provider: "Microsoft",
    quantization: "q4f32_1",
    context_length: "1k",
    family: "Phi1.5",
  },
  {
    name: "TinyLlama-1.1B-Chat-v0.4-q0f16",
    display_name: "TinyLlama",
    provider: "Zhang Peiyuan",
    size: "1.1B",
    quantization: "q0f16",
    family: "TinyLlama",
  },
  {
    name: "TinyLlama-1.1B-Chat-v0.4-q0f32",
    display_name: "TinyLlama",
    provider: "Zhang Peiyuan",
    size: "1.1B",
    quantization: "q0f32",
    family: "TinyLlama",
  },
  {
    name: "TinyLlama-1.1B-Chat-v0.4-q4f16_1-1k",
    display_name: "TinyLlama",
    provider: "Zhang Peiyuan",
    size: "1.1B",
    quantization: "q4f16_1",
    context_length: "1k",
    family: "TinyLlama",
  },
  {
    name: "TinyLlama-1.1B-Chat-v0.4-q4f32_1-1k",
    display_name: "TinyLlama",
    provider: "Zhang Peiyuan",
    size: "1.1B",
    quantization: "q4f32_1",
    context_length: "1k",
    family: "TinyLlama",
  },
];

export const CHAT_PAGE_SIZE = 15;
export const MAX_RENDER_MSG_COUNT = 45;
