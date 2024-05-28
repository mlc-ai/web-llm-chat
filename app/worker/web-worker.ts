import log from "loglevel";
import { MLCEngineWorkerHandler, MLCEngine } from "@neet-nestor/web-llm";

const engine = new MLCEngine();
let handler: MLCEngineWorkerHandler;

self.addEventListener("message", (event) => {});

self.onmessage = (msg: MessageEvent) => {
  if (!handler) {
    handler = new MLCEngineWorkerHandler(engine);
    log.info("Web Worker: Web-LLM Engine Activated");
  }
  handler.onmessage(msg);
};
