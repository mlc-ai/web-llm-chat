import { LogLevel } from "@neet-nestor/web-llm";
import { ModelRecord } from "../client/api";
import {
  DEFAULT_INPUT_TEMPLATE,
  DEFAULT_MODELS,
  DEFAULT_SIDEBAR_WIDTH,
  StoreKey,
} from "../constant";
import { createPersistStore } from "../utils/store";

export type ModelType = (typeof DEFAULT_MODELS)[number]["name"];

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

export const DEFAULT_CONFIG = {
  lastUpdate: Date.now(), // timestamp, to merge state

  submitKey: SubmitKey.Enter,
  avatar: "1f603",
  fontSize: 14,
  theme: Theme.Auto as Theme,
  tightBorder: false,
  sendPreviewBubble: true,
  enableAutoGenerateTitle: true,
  sidebarWidth: DEFAULT_SIDEBAR_WIDTH,

  disablePromptHint: false,

  hideBuiltinTemplates: false, // dont add builtin masks

  cacheType: "cache" as CacheType,
  logLevel: "INFO" as LogLevel,
  models: DEFAULT_MODELS as any as ModelRecord[],

  modelConfig: {
    model: DEFAULT_MODELS[0].name,
    sendMemory: true,
    historyMessageCount: 4,
    compressMessageLengthThreshold: 1000,
    enableInjectSystemPrompts: false,
    template: DEFAULT_INPUT_TEMPLATE,

    // Chat configs
    temperature: 1.0,
    top_p: 1,
    max_tokens: 4000,
    presence_penalty: 0,
    frequency_penalty: 0,

    // Use recommended config to overwrite above parameters
    ...DEFAULT_MODELS[0].recommended_config,
  },
};

export type ChatConfig = typeof DEFAULT_CONFIG;

export type ModelConfig = ChatConfig["modelConfig"];

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
    return x as ModelType;
  },
  max_tokens(x: number) {
    return limitNumber(x, 0, 512000, 1024);
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

    mergeModels(newModels: ModelRecord[]) {
      if (!newModels || newModels.length === 0) {
        return;
      }

      const oldModels = get().models;
      const modelMap: Record<string, ModelRecord> = {};

      for (const model of oldModels) {
        modelMap[model.name] = model;
      }

      for (const model of newModels) {
        modelMap[model.name] = model;
      }

      set(() => ({
        models: Object.values(modelMap),
      }));
    },

    allModels() {
      return get().models;
    },

    selectModel(model: ModelType) {
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
    version: 0.41,
    migrate: (persistedState, version) => {
      if (version < 0.41) {
        return {
          ...DEFAULT_CONFIG,
          ...(persistedState as any),
          models: DEFAULT_MODELS as any as ModelRecord[],
          modelConfig: {
            model: DEFAULT_MODELS[0].name,
            sendMemory: true,
            historyMessageCount: 4,
            compressMessageLengthThreshold: 1000,
            enableInjectSystemPrompts: false,
            template: DEFAULT_INPUT_TEMPLATE,

            // Chat configs
            temperature: 1.0,
            top_p: 1,
            max_tokens: 4000,
            presence_penalty: 0,
            frequency_penalty: 0,

            // Use recommended config to overwrite above parameters
            ...DEFAULT_MODELS[0].recommended_config,
          },
        };
      }
      return persistedState;
    },
  },
);
