import { Template } from "../store/template";
import { EN_TEMPLATES } from "./en";

import { type BuiltinTemplate } from "./typing";
export { type BuiltinTemplate } from "./typing";

export const BUILTIN_TEMPLATE_ID = 100000;

export const BUILTIN_TEMPLATE_STORE = {
  buildinId: BUILTIN_TEMPLATE_ID,
  masks: {} as Record<string, BuiltinTemplate>,
  get(id?: string) {
    if (!id) return undefined;
    return this.masks[id] as Template | undefined;
  },
  add(m: BuiltinTemplate) {
    const mask = { ...m, id: (this.buildinId++).toString(), builtin: true };
    this.masks[mask.id] = mask;
    return mask as Template;
  },
};

export const BUILTIN_TEMPLATES: Template[] = EN_TEMPLATES.map((m) =>
  BUILTIN_TEMPLATE_STORE.add(m),
);
