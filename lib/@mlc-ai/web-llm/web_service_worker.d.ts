import { AppConfig, ChatOptions, EngineConfig } from "./config";
import { EngineInterface } from "./types";
import { EngineWorkerHandler, WebWorkerEngine, ChatWorker } from "./web_worker";
export declare const serviceWorkerBroadcastChannel: BroadcastChannel;
export declare const clientBroadcastChannel: BroadcastChannel;
/**
 * Worker handler that can be used in a ServiceWorker.
 *
 * @example
 *
 * const engine = new Engine();
 * let handler;
 * chrome.runtime.onConnect.addListener(function (port) {
 *   if (handler === undefined) {
 *     handler = new ServiceWorkerEngineHandler(engine, port);
 *   } else {
 *     handler.setPort(port);
 *   }
 *   port.onMessage.addListener(handler.onmessage.bind(handler));
 * });
 */
export declare class ServiceWorkerEngineHandler extends EngineWorkerHandler {
    modelId?: string;
    chatOpts?: ChatOptions;
    appConfig?: AppConfig;
    constructor(engine: EngineInterface);
    onmessage(event: any): void;
}
/**
 * Create a ServiceWorkerEngine.
 *
 * @param modelId The model to load, needs to either be in `webllm.prebuiltAppConfig`, or in
 * `engineConfig.appConfig`.
 * @param engineConfig Optionally configures the engine, see `webllm.EngineConfig` for more.
 * @returns An initialized `WebLLM.ServiceWorkerEngine` with `modelId` loaded.
 */
export declare function CreateServiceWorkerEngine(modelId: string, engineConfig?: EngineConfig): Promise<ServiceWorkerEngine>;
/**
 * A client of Engine that exposes the same interface
 */
export declare class ServiceWorkerEngine extends WebWorkerEngine {
    constructor(worker: ChatWorker);
    keepAlive(): void;
    /**
     * Initialize the chat with a model.
     *
     * @param modelId model_id of the model to load.
     * @param chatOpts Extra options to overide chat behavior.
     * @param appConfig Override the app config in this load.
     * @returns A promise when reload finishes.
     * @note The difference between init and reload is that init
     * should be called only once when the engine is created, while reload
     * can be called multiple times to switch between models.
     */
    init(modelId: string, chatOpts?: ChatOptions, appConfig?: AppConfig): Promise<void>;
}
//# sourceMappingURL=web_service_worker.d.ts.map