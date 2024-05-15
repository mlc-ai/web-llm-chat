/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
const CHATGPT_NEXT_WEB_CACHE = "chatgpt-next-web-cache";
self.addEventListener("activate", function (event) {
  console.log("ServiceWorker activated.");
});
self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CHATGPT_NEXT_WEB_CACHE).then(function (cache) {
    return cache.addAll([]);
  }));
});
self.addEventListener("fetch", e => {});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'MSG_ID') {
    //Process message
  }
});

/******/ })()
;