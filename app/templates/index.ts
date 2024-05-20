import { Template } from "../store/template";
import { CN_TEMPLATES } from "./cn";
import { EN_TEMPLATES } from "./en";
import { TW_TEMPLATES } from "./tw";

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
    const mask = { ...m, id: this.buildinId++, builtin: true };
    this.masks[mask.id] = mask;
    return mask;
  },
};

export const BUILTIN_TEMPLATES: BuiltinTemplate[] = EN_TEMPLATES.concat(
  CN_TEMPLATES,
)
  .concat(TW_TEMPLATES)
  .map((m) => BUILTIN_TEMPLATE_STORE.add(m));
