import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

async function createClient() {
  const calls = { reload: [], requests: [], appConfig: [], unload: 0 };
  const engine = {
    setInitProgressCallback() {},
    setAppConfig(config) {
      calls.appConfig.push(config);
    },
    async reload(...args) {
      calls.reload.push(args);
    },
    async interruptGenerate() {},
    async unload() {
      calls.unload++;
    },
    async chatCompletion(request) {
      calls.requests.push(request);
      if (request.stream) {
        return (async function* () {
          yield {
            choices: [{ delta: { content: "Paris" }, finish_reason: "stop" }],
          };
        })();
      }
      return {
        choices: [{ message: { content: "Paris" }, finish_reason: "stop" }],
      };
    },
  };
  engine.chat = {
    completions: { create: (request) => engine.chatCompletion(request) },
  };
  class WorkerEngine {
    constructor(_worker, config) {
      calls.appConfig.push(config.appConfig);
      return engine;
    }
  }
  const dependencies = {
    "@mlc-ai/web-llm": {
      WebWorkerMLCEngine: WorkerEngine,
      ServiceWorkerMLCEngine: WorkerEngine,
      prebuiltAppConfig: { model_list: [] },
    },
    loglevel: { default: { info() {}, error() {} } },
    "../utils": { fixMessage: (message) => message },
    "../constant": { DEFAULT_MODELS: [] },
  };
  const context = vm.createContext({
    console,
    URL,
    Worker: class {},
    Error,
    AbortController,
  });
  const path = new URL("../app/client/webllm.ts", import.meta.url);
  const source = ts.transpileModule(await readFile(path, "utf8"), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
  const module = new vm.SourceTextModule(source, {
    context,
    initializeImportMeta(meta) {
      meta.url = path.href;
    },
  });
  await module.link((specifier) => {
    const exports = dependencies[specifier];
    assert.ok(exports, `Unexpected dependency: ${specifier}`);
    return new vm.SyntheticModule(
      Object.keys(exports),
      function () {
        for (const [name, value] of Object.entries(exports))
          this.setExport(name, value);
      },
      { context },
    );
  });
  await module.evaluate();
  return { client: new module.namespace.WebLLMApi("webWorker"), engine, calls };
}

function request(config = {}) {
  const result = { finished: [], errors: [] };
  return {
    messages: [{ role: "user", content: "Name the capital of France." }],
    config: {
      model: "Qwen3-0.6B-q4f16_1-MLC",
      cache: "cache",
      stream: true,
      ...config,
    },
    onFinish(...args) {
      result.finished.push(args);
    },
    onError(error) {
      result.errors.push(error);
    },
    result,
  };
}

test("generation settings reach the request without reloading the model", async () => {
  const { client, calls } = await createClient();
  await client.chat(request({ temperature: 0.2, max_tokens: 17, top_p: 0.8 }));
  await client.chat(
    request({ temperature: 0.7, max_tokens: 9, stream: false }),
  );
  assert.equal(calls.requests[0].max_tokens, 17);
  assert.equal(calls.requests[0].temperature, 0.2);
  assert.equal(calls.requests[0].top_p, 0.8);
  assert.equal(calls.requests[1].max_tokens, 9);
  assert.equal(calls.requests[1].temperature, 0.7);
  assert.equal(calls.reload.length, 1);
});

test("cache selection is applied before loading and changing it reloads", async () => {
  const { client, calls } = await createClient();
  await client.chat(request({ cache: "index_db" }));
  assert.equal(calls.appConfig.at(-1).cacheBackend, "indexeddb");
  await client.chat(request({ cache: "cache" }));
  assert.equal(calls.appConfig.at(-1).cacheBackend, "cache");
  assert.equal(calls.reload.length, 2);
  assert.equal(calls.unload, 1);
});

test("a failed model switch can be retried", async () => {
  const { client, engine, calls } = await createClient();
  await client.chat(request());
  const reload = engine.reload;
  engine.reload = async () => {
    throw new Error("download failed");
  };
  const failed = request({ model: "gemma-4-E2B-it-q4f16_1-MLC" });
  await client.chat(failed);
  assert.equal(failed.result.errors.length, 1);
  engine.reload = reload;
  const retry = request({ model: "gemma-4-E2B-it-q4f16_1-MLC" });
  await client.chat(retry);
  assert.equal(calls.reload.at(-1)[0], retry.config.model);
  assert.equal(retry.result.finished.length, 1);
});

test("a title request waits for the active chat instead of reloading it", async () => {
  const { client, engine } = await createClient();
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  let active = 0;
  let overlap = false;
  const complete = engine.chatCompletion;
  engine.chatCompletion = async (request) => {
    overlap ||= active > 0;
    active++;
    await gate;
    active--;
    return complete(request);
  };
  const first = client.chat(request());
  const title = client.chat(request({ stream: false, enable_thinking: false }));
  await new Promise((resolve) => setImmediate(resolve));
  release();
  await Promise.all([first, title]);
  assert.equal(overlap, false);
});

test("stopping a download skips generation and the next request reloads", async () => {
  const { client, engine, calls } = await createClient();
  let release;
  const reload = engine.reload;
  engine.reload = () =>
    new Promise((resolve) => {
      release = resolve;
    });
  const options = request();
  const pending = client.chat(options);
  await new Promise((resolve) => setImmediate(resolve));
  await client.abort();
  release();
  await pending;
  assert.equal(calls.requests.length, 0);
  assert.equal(options.result.errors.length, 0);
  assert.equal(options.result.finished[0][1], "abort");
  engine.reload = reload;
  await client.chat(request());
  assert.equal(calls.reload.length, 1);
});
