import { AppConfig } from "./config";
export declare function hasModelInCache(modelId: string, appConfig?: AppConfig): Promise<boolean>;
export declare function deleteModelAllInfoInCache(modelId: string, appConfig?: AppConfig): Promise<void>;
export declare function deleteModelInCache(modelId: string, appConfig?: AppConfig): Promise<void>;
export declare function deleteChatConfigInCache(modelId: string, appConfig?: AppConfig): Promise<void>;
export declare function deleteModelWasmInCache(modelId: string, appConfig?: AppConfig): Promise<void>;
//# sourceMappingURL=cache_util.d.ts.map