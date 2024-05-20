import { type Template } from "../store/template";

export type BuiltinTemplate = Omit<Template, "id"> & {
  builtin: Boolean;
};
