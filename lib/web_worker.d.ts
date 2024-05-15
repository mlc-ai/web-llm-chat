import { AppConfig, ChatOptions, EngineConfig, GenerationConfig } from "./config";
import { EngineInterface, GenerateProgressCallback, InitProgressCallback } from "./types";
import { ChatCompletionRequestBase, ChatCompletionRequestStreaming, ChatCompletionRequestNonStreaming, ChatCompletion, ChatCompletionChunk } from "./openai_api_protocols/index";
import * as API from "./openai_api_protocols/apis";
import { WorkerMessage, MessageContent } from "./message";
export interface PostMessageHandler {
    postMessage: (message: any) => void;
}
/**
 * Worker handler that can be used in a WebWorker
 *
 * @example
 *
 * // setup a chat worker handler that routes
 * // requests to the chat
 * const engine = new Engine();
 * cont handler = new EngineWorkerHandler(engine);
 * onmessage = handler.onmessage;
 */
export declare class EngineWorkerHandler {
    protected engine: EngineInterface;
    protected chatCompletionAsyncChunkGenerator?: AsyncGenerator<ChatCompletionChunk, void, void>;
    protected postMessageHandler?: PostMessageHandler;
    /**
     * @param engine A concrete implementation of EngineInterface
     * @param postMessageHandler Optionally, a handler to communicate with the content script.
     *   This is only needed in ServiceWorker. In web worker, we can use `postMessage` from
     *   DOM API directly.
     */
    constructor(engine: EngineInterface, postMessageHandler?: PostMessageHandler);
    postMessageInternal(event: any): void;
    setPostMessageHandler(postMessageHandler: PostMessageHandler): void;
    handleTask<T extends MessageContent>(uuid: string, task: () => Promise<T>): Promise<void>;
    onmessage(event: any): void;
}
export interface ChatWorker {
    onmessage: any;
    postMessage: (message: any) => void;
}
/**
 * Creates `WebWorkerEngine`, a client that holds the same interface as `Engine`.
 *
 * Equivalent to `new webllm.WebWorkerEngine(worker).reload(...)`.
 *
 * @param worker The worker that holds the actual Engine, intialized with `new Worker()`.
 * @param modelId The model to load, needs to either be in `webllm.prebuiltAppConfig`, or in
 * `engineConfig.appConfig`.
 * @param engineConfig Optionally configures the engine, see `webllm.EngineConfig` for more.
 * @returns An initialized `WebLLM.WebWorkerEngine` with `modelId` loaded.
 *
 * @note engineConfig.logitProcessorRegistry is ignored for `CreateWebWorkEngine()`.
 */
export declare function CreateWebWorkerEngine(worker: any, modelId: string, engineConfig?: EngineConfig): Promise<WebWorkerEngine>;
/**
 * A client of Engine that exposes the same interface
 *
 * @example
 *
 * const chat = new webllm.WebWorkerEngine(new Worker(
 *   new URL('./worker.ts', import.meta.url),
 *   {type: 'module'}
 * ));
 */
export declare class WebWorkerEngine implements EngineInterface {
    worker: ChatWorker;
    chat: API.Chat;
    private initProgressCallback?;
    private generateCallbackRegistry;
    private pendingPromise;
    constructor(worker: ChatWorker);
    setInitProgressCallback(initProgressCallback?: InitProgressCallback): void;
    getInitProgressCallback(): InitProgressCallback | undefined;
    protected getPromise<T extends MessageContent>(msg: WorkerMessage): Promise<T>;
    reload(modelId: string, chatOpts?: ChatOptions, appConfig?: AppConfig): Promise<void>;
    getMaxStorageBufferBindingSize(): Promise<number>;
    getGPUVendor(): Promise<string>;
    getMessage(): Promise<string>;
    generate(input: string | ChatCompletionRequestNonStreaming, progressCallback?: GenerateProgressCallback, streamInterval?: number, genConfig?: GenerationConfig): Promise<string>;
    runtimeStatsText(): Promise<string>;
    interruptGenerate(): void;
    unload(): Promise<void>;
    resetChat(keepStats?: boolean): Promise<void>;
    forwardTokensAndSample(inputIds: Array<number>, isPrefill: boolean): Promise<number>;
    /**
     * Every time the generator is called, we post a message to the worker asking it to
     * decode one step, and we expect to receive a message of `ChatCompletionChunk` from
     * the worker which we yield. The last message is `void`, meaning the generator has nothing
     * to yield anymore.
     */
    chatCompletionAsyncChunkGenerator(): AsyncGenerator<ChatCompletionChunk, void, void>;
    chatCompletion(request: ChatCompletionRequestNonStreaming): Promise<ChatCompletion>;
    chatCompletion(request: ChatCompletionRequestStreaming): Promise<AsyncIterable<ChatCompletionChunk>>;
    chatCompletion(request: ChatCompletionRequestBase): Promise<AsyncIterable<ChatCompletionChunk> | ChatCompletion>;
    onmessage(event: any): void;
}
//# sourceMappingURL=web_worker.d.ts.map