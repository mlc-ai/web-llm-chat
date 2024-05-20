import { BUILTIN_TEMPLATE_ID, BUILTIN_TEMPLATES } from "../templates";
import { getLang, Lang } from "../locales";
import { DEFAULT_TOPIC, ChatMessage } from "./chat";
import { useAppConfig } from "./config";
import { StoreKey } from "../constant";
import { nanoid } from "nanoid";
import { createPersistStore } from "../utils/store";

export type Template = {
  id: string;
  createdAt: number;
  avatar: string;
  name: string;
  hideContext?: boolean;
  context: ChatMessage[];
  syncGlobalConfig?: boolean;
  lang: Lang;
  builtin: boolean;
};

export const DEFAULT_TEMPLATE_STATE = {
  templates: {} as Record<string, Template>,
};

export type TemplateState = typeof DEFAULT_TEMPLATE_STATE;

export const DEFAULT_TEMPLATE_AVATAR = "mlc-ai";
export const createEmptyTemplate = () =>
  ({
    id: nanoid(),
    avatar: DEFAULT_TEMPLATE_AVATAR,
    name: DEFAULT_TOPIC,
    context: [],
    lang: getLang(),
    builtin: false,
    createdAt: Date.now(),
  }) as Template;

export const useTemplateStore = createPersistStore(
  { ...DEFAULT_TEMPLATE_STATE },

  (set, get) => ({
    create(template?: Partial<Template>) {
      const templates = get().templates;
      const id = nanoid();
      templates[id] = {
        ...createEmptyTemplate(),
        ...template,
        id,
        builtin: false,
      };

      set(() => ({ templates }));
      get().markUpdate();

      return templates[id];
    },
    updateTemplate(id: string, updater: (templates: Template) => void) {
      const templates = get().templates;
      const template = templates[id];
      if (!template) return;
      const updateTemplate = { ...template };
      updater(updateTemplate);
      templates[id] = updateTemplate;
      set(() => ({ templates }));
      get().markUpdate();
    },
    delete(id: string) {
      const templates = get().templates;
      delete templates[id];
      set(() => ({ templates }));
      get().markUpdate();
    },

    get(id?: string) {
      return get().templates[id ?? 1145141919810];
    },
    getAll() {
      const userTemplates = Object.values(get().templates).sort(
        (a, b) => b.createdAt - a.createdAt,
      );
      return userTemplates.concat(BUILTIN_TEMPLATES);
    },
    search(text: string) {
      return Object.values(get().templates);
    },
  }),
  {
    name: StoreKey.Templates,
  },
);
