import { ModelRecord } from "../client/api";

export function collectModelTable(
  models: readonly ModelRecord[],
  customModels: string,
) {
  const modelTable: Record<
    string,
    {
      name: string;
      display_name: string;
      provider?: ModelRecord["provider"]; // Marked as optional
      isDefault?: boolean;
    }
  > = {};

  // default models
  models.forEach((m) => {
    modelTable[m.name] = {
      ...m,
      display_name: m.name, // 'provider' is copied over if it exists
    };
  });

  // server custom models
  customModels
    .split(",")
    .filter((v) => !!v && v.length > 0)
    .forEach((m) => {
      const available = !m.startsWith("-");
      const nameConfig =
        m.startsWith("+") || m.startsWith("-") ? m.slice(1) : m;
      const [name, display_name] = nameConfig.split("=");

      modelTable[name] = {
        name,
        display_name: display_name || name,
        provider: modelTable[name]?.provider ?? "", // Use optional chaining
      };
    });

  return modelTable;
}

/**
 * Generate full model table.
 */
export function collectModels(
  models: readonly ModelRecord[],
  customModels: string,
) {
  const modelTable = collectModelTable(models, customModels);
  const allModels = Object.values(modelTable);

  return allModels;
}
