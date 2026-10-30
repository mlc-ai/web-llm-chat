import { ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, ExpirationPlugin, Serwist } from "serwist";

declare const self: ServiceWorkerGlobalScope;
const CHATGPT_NEXT_WEB_CACHE = "chatgpt-next-web-cache";

async function checkGPUAvailablity() {
  if (!("gpu" in navigator)) {
    return false;
  }
  const adapter = await navigator.gpu.requestAdapter().catch(() => null);
  if (!adapter) {
    return false;
  }
  return true;
}

self.addEventListener("message", (event) => {
  const msg = event.data;
  if (msg.kind === "checkWebGPUAvilability") {
    event.stopImmediatePropagation();
    event.waitUntil(
      checkGPUAvailablity().then((gpuAvailable) => {
        console.log(
          "Service Worker: WebGPU is " +
            (gpuAvailable ? "available" : "unavailable"),
        );
        const reply = {
          kind: "return",
          uuid: msg.uuid,
          content: gpuAvailable,
        };
        event.source?.postMessage(reply);
      }),
    );
  }
});

new ServiceWorkerMLCEngineHandler();

self.addEventListener("install", (event) => {
  // Always update right away
  self.skipWaiting();

  event.waitUntil(
    caches.open(CHATGPT_NEXT_WEB_CACHE).then((cache) => {
      return cache.addAll([]);
    }),
  );
});

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

serwist.addEventListeners();
