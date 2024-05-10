import { EngineWorkerHandler, Engine } from "@mlc-ai/web-llm";

// Hookup an Engine to a worker handler
const engine = new Engine();
const handler = new EngineWorkerHandler(engine);

// WebLLM Message Handling
self.onmessage = (msg) => {
  handler.onmessage(msg);
};
