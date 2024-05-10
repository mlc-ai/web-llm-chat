import { useMemo } from "react";
import { useAppConfig } from "../store";
import { collectModels } from "./model";

export function useAllModels() {
  const configStore = useAppConfig();
  const models = useMemo(() => {
    return collectModels(configStore.models, configStore.customModels);
  }, [configStore.customModels, configStore.models]);

  return models;
}
