import { useMemo } from "react";
import { useAppConfig } from "../store";
import { collectModels } from "./model";
import { ModelRecord } from "../client/api";

export function useAllModels(): ModelRecord[] {
  const configStore = useAppConfig();
  const models = useMemo(() => {
    return collectModels(configStore.models, configStore.customModels);
  }, [configStore.customModels, configStore.models]);

  return models;
}
