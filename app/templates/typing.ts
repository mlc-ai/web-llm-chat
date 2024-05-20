import { ModelConfig } from "../store";
import { type Template } from "../store/template";

export type BuiltinTemplate = Omit<Template, "id" | "modelConfig"> & {
  builtin: Boolean;
  modelConfig: Partial<ModelConfig>;
};
