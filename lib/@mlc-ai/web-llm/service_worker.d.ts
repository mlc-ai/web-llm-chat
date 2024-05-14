/// <reference types="chrome" />
import { AppConfig, ChatOptions, EngineConfig } from "./config";
import { EngineInterface } from "./types";
import { EngineWorkerHandler, WebWorkerEngine, PostMessageHandler } from "./web_worker";
/**
 * A post message handler that sends messages to a chrome.runtime.Port.
 */
export declare class PortPostMessageHandler implements PostMessageHandler {
    port: chrome.runtime.Port;
    enabled: boolean;
    constructor(port: chrome.runtime.Port);
    /**
     * Close the PortPostMessageHandler. This will prevent any further messages
     */
    close(): void;
    postMessage(event: any): void;
}
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
    constructor(engine: EngineInterface, port: chrome.runtime.Port);
    setPort(port: chrome.runtime.Port): void;
    onmessage(event: any): void;
}
/**
 * Create a ServiceWorkerEngine.
 *
 * @param modelId The model to load, needs to either be in `webllm.prebuiltAppConfig`, or in
 * `engineConfig.appConfig`.
 * @param engineConfig Optionally configures the engine, see `webllm.EngineConfig` for more.
 * @param keepAliveMs The interval to send keep alive messages to the service worker.
 * See [Service worker lifecycle](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle#idle-shutdown)
 * The default is 10s.
 * @returns An initialized `WebLLM.ServiceWorkerEngine` with `modelId` loaded.
 */
export declare function CreateServiceWorkerEngine(modelId: string, engineConfig?: EngineConfig, keepAliveMs?: number): Promise<ServiceWorkerEngine>;
/**
 * A client of Engine that exposes the same interface
 */
export declare class ServiceWorkerEngine extends WebWorkerEngine {
    port: chrome.runtime.Port;
    constructor();
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
//# sourceMappingURL=service_worker.d.ts.map