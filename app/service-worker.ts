import {
  WebServiceWorkerEngineHandler,
  EngineInterface,
  Engine,
} from "@mlc-ai/web-llm";
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

const CHATGPT_NEXT_WEB_CACHE = "chatgpt-next-web-cache";
const engine: EngineInterface = new Engine();
let handler: WebServiceWorkerEngineHandler;

self.addEventListener("install", function (event) {
  // Always update right away
  self.skipWaiting();

  event.waitUntil(
    caches.open(CHATGPT_NEXT_WEB_CACHE).then(function (cache) {
      return cache.addAll([]);
    }),
  );
});

self.addEventListener("activate", function (event) {
  handler = new WebServiceWorkerEngineHandler(engine);
  console.log("Web-LLM Service Worker Activated");
});

serwist.addEventListeners();
