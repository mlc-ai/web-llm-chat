import { ResponseFormat } from "./openai_api_protocols";
import { LogitProcessor, InitProgressCallback } from "./types";
/**
 * Conversation template config
 */
export interface ConvTemplateConfig {
    system_template: string;
    system_message: string;
    roles: Record<Role, string>;
    role_templates?: Partial<Record<Role, string>>;
    seps: Array<string>;
    role_content_sep?: string;
    role_empty_sep?: string;
    offset: number;
    stop_str: Array<string>;
    system_prefix_token_ids?: Array<number>;
    stop_token_ids: Array<number>;
    add_role_after_system_message?: boolean;
}
export declare enum Role {
    user = "user",
    assistant = "assistant"
}
/**
 * Place holders that can be used in role templates.
 * For example, a role template of
 * `<<question>> ${MessagePlaceholders.USER} <<function>> ${MessagePlaceholders.FUNCTION}`
 * will insert the user message to ${MessagePlaceholders.USER}
 * and insert the function message to ${MessagePlaceholders.FUNCTION}
 * at run time.
 */
export declare enum MessagePlaceholders {
    system = "{system_message}",
    user = "{user_message}",
    assistant = "{assistant_message}",
    tool = "{tool_message}",
    function = "{function_string}"
}
/**
 * Config of one chat model, a data structure representing `mlc-chat-config.json`.
 * This only corresponds to the chat-related fields and `tokenizer_files` of `mlc-chat-config.json`.
 * Only these fields affect the conversation in runtime.
 * i.e. The third part in https://llm.mlc.ai/docs/get_started/mlc_chat_config.html.
 *
 * This is initialized in `ChatModule.reload()` with the model's `mlc-chat-config.json`.
 */
export interface ChatConfig {
    tokenizer_files: Array<string>;
    conv_config?: Partial<ConvTemplateConfig>;
    conv_template: string | ConvTemplateConfig;
    mean_gen_len: number;
    max_gen_len: number;
    shift_fill_factor: number;
    repetition_penalty: number;
    frequency_penalty: number;
    presence_penalty: number;
    top_p: number;
    temperature: number;
    bos_token_id?: number;
}
/**
 * Custom options that can be used to override known config values.
 */
export interface ChatOptions extends Partial<ChatConfig> {
}
/**
 * Optional configurations for `CreateEngine()` and `CreateWebWorkerEngine()`.
 *
 * chatOpts: To optionally override the `mlc-chat-config.json` of `modelId`.
 * appConfig: Configure the app, including the list of models and whether to use IndexedDB cache.
 * initProgressCallback: A callback for showing the progress of loading the model.
 * logitProcessorRegistry: A register for stateful logit processors, see `webllm.LogitProcessor`.
 *
 * @note All fields are optional, and `logitProcessorRegistry` is only used for `CreateEngine()`
 * not `CreateWebWorkerEngine()`.
 */
export interface EngineConfig {
    chatOpts?: ChatOptions;
    appConfig?: AppConfig;
    initProgressCallback?: InitProgressCallback;
    logitProcessorRegistry?: Map<string, LogitProcessor>;
}
/**
 * Config for a single generation.
 * Essentially `ChatConfig` without `tokenizer_files`, `conv_config`, or `conv_template`.
 * We also support additional fields not present in `mlc-chat-config.json` due to OpenAI-like APIs.
 *
 * Note that all values are optional. If unspecified, we use whatever values in `ChatConfig`
 * initialized during `ChatModule.reload()`.
 */
export interface GenerationConfig {
    mean_gen_len?: number;
    shift_fill_factor?: number;
    repetition_penalty?: number;
    top_p?: number | null;
    temperature?: number | null;
    max_gen_len?: number | null;
    frequency_penalty?: number | null;
    presence_penalty?: number | null;
    stop?: string | null | Array<string>;
    n?: number | null;
    logit_bias?: Record<string, number> | null;
    logprobs?: boolean | null;
    top_logprobs?: number | null;
    response_format?: ResponseFormat | null;
}
export declare function postInitAndCheckGenerationConfigValues(config: GenerationConfig): void;
/**
 * Information for a model.
 * @param model_url: the huggingface link to download the model weights.
 * @param model_id: what we call the model.
 * @param model_lib_url: link to the model library (wasm file) the model uses.
 * @param vram_required_MB: amount of vram in MB required to run the model (can use
 *    `utils/vram_requirements` to calculate).
 * @param low_resource_required: whether the model can run on limited devices (e.g. Android phone).
 * @param buffer_size_required_bytes: required `maxStorageBufferBindingSize`, different for each device.
 * @param required_features: feature needed to run this model (e.g. shader-f16).
 */
export interface ModelRecord {
    model_url: string;
    model_id: string;
    model_lib_url: string;
    vram_required_MB?: number;
    low_resource_required?: boolean;
    buffer_size_required_bytes?: number;
    required_features?: Array<string>;
}
/**
 * Extra configuration that can be
 * passed to the load.
 *
 * @param model_list: models to be used.
 * @param useIndexedDBCache: if true, will use IndexedDBCache to cache models and other artifacts.
 * If false or unspecified, will use the Cache API. For more information of the two, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#what_technologies_store_data_in_the_browser
 *
 * @note Note that the Cache API is more well-tested in WebLLM as of now.
 */
export interface AppConfig {
    model_list: Array<ModelRecord>;
    useIndexedDBCache?: boolean;
}
/**
 * modelVersion: the prebuilt model libraries that the current npm is compatible with, affects the
 * `model_lib_url`s in `prebuiltAppConfig`.
 *
 * @note The model version does not have to match the npm version, since not each npm update
 * requires an update of the model libraries.
 */
export declare const modelVersion = "v0_2_34";
export declare const modelLibURLPrefix = "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/";
/**
 * Default models and model library mapping to be used if unspecified.
 *
 * @note This is the only source of truth of which prebuilt model libraries are compatible with the
 * current WebLLM npm version.
 */
export declare const prebuiltAppConfig: AppConfig;
//# sourceMappingURL=config.d.ts.map