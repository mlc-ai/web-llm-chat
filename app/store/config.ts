import { LogLevel, prebuiltAppConfig } from "@mlc-ai/web-llm";
import { ModelRecord } from "../client/api";
import {
  DEFAULT_INPUT_TEMPLATE,
  DEFAULT_MODELS,
  DEFAULT_SIDEBAR_WIDTH,
  StoreKey,
} from "../constant";
import { createPersistStore } from "../utils/store";

export type Model = (typeof DEFAULT_MODELS)[number]["name"];

export enum SubmitKey {
  Enter = "Enter",
  CtrlEnter = "Ctrl + Enter",
  ShiftEnter = "Shift + Enter",
  AltEnter = "Alt + Enter",
  MetaEnter = "Meta + Enter",
}

export enum Theme {
  Auto = "auto",
  Dark = "dark",
  Light = "light",
}

export enum CacheType {
  Cache = "cache",
  IndexDB = "index_db",
}

export enum ModelClient {
  WEBLLM = "webllm",
  MLCLLM_API = "mlc-llm-api",
}

export type ModelConfig = {
  model: Model;

  // Chat configs
  temperature: number;
  context_window_size?: number;
  top_p: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;

  // MLC LLM configs
  mlc_endpoint: string;
};

export type ConfigType = {
  lastUpdate: number; // timestamp, to merge state

  submitKey: SubmitKey;
  avatar: string;
  fontSize: number;
  theme: Theme;
  tightBorder: boolean;
  sendPreviewBubble: boolean;
  enableAutoGenerateTitle: boolean;
  sidebarWidth: number;

  disablePromptHint: boolean;
  hideBuiltinTemplates: boolean;

  sendMemory: boolean;
  historyMessageCount: number;
  compressMessageLengthThreshold: number;
  enableInjectSystemPrompts: boolean;
  template: string;

  modelClientType: ModelClient;
  models: ModelRecord[];

  cacheType: CacheType;
  logLevel: LogLevel;
  enableThinking: boolean;
  modelConfig: ModelConfig;
};

const DEFAULT_MODEL = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

const DEFAULT_MODEL_CONFIG: ModelConfig = {
  model: DEFAULT_MODEL,

  // Chat configs
  temperature: 1.0,
  top_p: 1,
  context_window_size:
    prebuiltAppConfig.model_list.find((m) => m.model_id === DEFAULT_MODEL)
      ?.overrides?.context_window_size ?? 4096,
  max_tokens: 4000,
  presence_penalty: 0,
  frequency_penalty: 0,

  // Use recommended config to overwrite above parameters
  ...DEFAULT_MODELS.find((m) => m.name === DEFAULT_MODEL)!.recommended_config,

  mlc_endpoint: "",
};

export const DEFAULT_CONFIG: ConfigType = {
  lastUpdate: Date.now(), // timestamp, to merge state

  submitKey: SubmitKey.Enter,
  avatar: "1f603",
  fontSize: 14,
  theme: Theme.Auto,
  tightBorder: false,
  sendPreviewBubble: true,
  enableAutoGenerateTitle: true,
  sidebarWidth: DEFAULT_SIDEBAR_WIDTH,

  disablePromptHint: false,
  hideBuiltinTemplates: false, // dont add builtin masks

  sendMemory: true,
  historyMessageCount: 4,
  compressMessageLengthThreshold: 1000,
  enableInjectSystemPrompts: false,
  template: DEFAULT_INPUT_TEMPLATE,

  modelClientType: ModelClient.WEBLLM,
  models: DEFAULT_MODELS,
  cacheType: CacheType.Cache,
  logLevel: "INFO",
  enableThinking: false,

  modelConfig: DEFAULT_MODEL_CONFIG,
};

export type ChatConfig = typeof DEFAULT_CONFIG;

export function limitNumber(
  x: number,
  min: number,
  max: number,
  defaultValue: number,
) {
  if (isNaN(x)) {
    return defaultValue;
  }

  return Math.min(max, Math.max(min, x));
}

export const ModalConfigValidator = {
  model(x: string) {
    return x as Model;
  },
  max_tokens(x: number) {
    return limitNumber(x, 0, 131072, 1024);
  },
  context_window_size(x: number) {
    return limitNumber(x, 0, 131072, 1024);
  },
  presence_penalty(x: number) {
    return limitNumber(x, -2, 2, 0);
  },
  frequency_penalty(x: number) {
    return limitNumber(x, -2, 2, 0);
  },
  temperature(x: number) {
    return limitNumber(x, 0, 2, 1);
  },
  top_p(x: number) {
    return limitNumber(x, 0, 1, 1);
  },
};

export const useAppConfig = createPersistStore(
  { ...DEFAULT_CONFIG },
  (set, get) => ({
    reset() {
      set(() => ({ ...DEFAULT_CONFIG }));
    },

    selectModel(model: Model) {
      const config = DEFAULT_MODELS.find((m) => m.name === model);

      set((state) => ({
        ...state,
        modelConfig: {
          ...state.modelConfig,
          model,
          ...(config?.recommended_config || {}),
        },
      }));
    },

    setModels(models: ModelRecord[]) {
      if (models.some((m) => m.name === get().modelConfig.model)) {
        set((state) => ({
          ...state,
          models,
        }));
      } else {
        set((state) => ({
          ...state,
          models,
          modelConfig: {
            ...state.modelConfig,
            model: models[0].name,
          },
        }));
      }
    },

    updateModelConfig(config: Partial<ModelConfig>) {
      set((state) => ({
        ...state,
        modelConfig: {
          ...state.modelConfig,
          ...config,
        },
      }));
    },
  }),
  {
    name: StoreKey.Config,
    version: 0.64,
    migrate: (persistedState, version) => {
      if (version < 0.64) {
        return {
          ...DEFAULT_CONFIG,
          ...(persistedState as any),
          models: DEFAULT_MODELS as any as ModelRecord[],
        };
      }
      return persistedState;
    },
  },
);
