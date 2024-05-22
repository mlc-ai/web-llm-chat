import { ServiceWorkerMLCEngineHandler, MLCEngine } from "@neet-nestor/web-llm";
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, ExpirationPlugin, Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ sameOrigin, url: { pathname } }) =>
        sameOrigin && pathname === "/ping.txt",
      handler: new CacheFirst({
        cacheName: "WebLLMChatServiceWorkerKeepAlive",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
            maxAgeFrom: "last-used",
          }),
        ],
      }),
    },
  ],
});

declare const self: ServiceWorkerGlobalScope;

const CHATGPT_NEXT_WEB_CACHE = "chatgpt-next-web-cache";
const engine = new MLCEngine();
let handler: ServiceWorkerMLCEngineHandler;

self.addEventListener("install", (event) => {
  // Always update right away
  self.skipWaiting();

  event.waitUntil(
    caches.open(CHATGPT_NEXT_WEB_CACHE).then((cache) => {
      return cache.addAll([]);
    }),
  );
});

self.addEventListener("activate", (event) => {
  if (!handler) {
    handler = new ServiceWorkerMLCEngineHandler(engine);
    console.log("Service Worker: Web-LLM Engine Activated");
  }
});

self.addEventListener("message", (event) => {
  if (!handler) {
    handler = new ServiceWorkerMLCEngineHandler(engine);
    console.log("Service Worker: Web-LLM Engine Activated");
  }
});

serwist.addEventListeners();
