import { Template } from "../store/template";
import { EN_TEMPLATES } from "./en";

import { type BuiltinTemplate } from "./typing";
export { type BuiltinTemplate } from "./typing";

export const BUILTIN_TEMPLATE_ID = 100000;

export const BUILTIN_TEMPLATE_STORE = {
  buildinId: BUILTIN_TEMPLATE_ID,
  templates: {} as Record<string, BuiltinTemplate>,
  get(id?: string) {
    if (!id) return undefined;
    return this.templates[id] as Template | undefined;
  },
  add(m: BuiltinTemplate) {
    const mask = { ...m, id: this.buildinId++, builtin: true };
    this.templates[mask.id] = mask;
    return mask;
  },
};

export const BUILTIN_TEMPLATES: BuiltinTemplate[] = EN_TEMPLATES.map((m) =>
  BUILTIN_TEMPLATE_STORE.add(m),
);
