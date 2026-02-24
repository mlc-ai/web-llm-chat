# Implementation Plan: Issue #85 - Models Not Loading

## Issue Information
- **Repository**: mlc-ai/web-llm-chat
- **Issue Number**: 85
- **Title**: [Bug] chat.weblm.ai not loading LLMs
- **Status**: Open
- **Reporter**: lonnietc
- **Created**: 2026-01-15
- **URL**: https://github.com/mlc-ai/web-llm-chat/issues/85

## Problem Description

### Symptoms
Users report that LLMs fail to load across multiple surfaces:
1. Main chat site (https://chat.webllm.ai/)
2. JSFiddle example (https://jsfiddle.net/neetnestor/4nmgvsa2/)
3. WebLLM Chrome Extensions

The reporter suspects backend/infrastructure problems and requests guidance on setting up local LLM repositories to avoid dependency on hosted storage.

### Missing Information
- No specific model IDs mentioned
- No browser details provided
- No error logs/messages captured
- No network request failures documented
- No screenshots provided

## Root Cause Analysis

Based on code review of `web-llm-chat/app/client/webllm.ts` and related components, potential failure points include:

### 1. **Model Artifact Fetching Issues**
- **Location**: `webllm.ts:77` - `engine.reload()` call
- **Hypothesis**: CDN/hosting issues, CORS errors, 404s, rate limiting
- **Evidence**: Issue affects multiple surfaces simultaneously → suggests upstream dependency failure

### 2. **WebGPU Compatibility**
- **Location**: `webllm.ts:133-142` - WebGPU error handling
- **Hypothesis**: Browser lacks WebGPU support
- **Evidence**: Code already handles this case but may not surface clearly

### 3. **Cache Corruption**
- **Location**: `webllm.ts:43-44` - IndexedDB/Cache configuration
- **Hypothesis**: Stale or corrupted cached model weights
- **Evidence**: No cache invalidation logic present

### 4. **Worker Initialization Failures**
- **Location**: `webllm.ts:55-67` - Worker creation
- **Hypothesis**: Service/Web Worker registration failures
- **Evidence**: No explicit worker error handling

### 5. **Insufficient Error Diagnostics**
- **Location**: `webllm.ts:104-110`, `chat.ts:377-381`
- **Current State**: Generic error messages without classification
- **Problem**: Users can't self-diagnose or provide actionable reports

## Implementation Plan

### Phase 1: Enhanced Error Diagnostics (High Priority)

#### Objective
Make failures debuggable and reportable without developer assistance.

#### Changes Required

##### 1.1 Create Structured Error Types
**File**: `web-llm-chat/app/client/api.ts`

Add new error type definitions:
```typescript
export enum ModelLoadErrorCode {
  MANIFEST_FETCH_FAILED = "manifest_fetch_failed",
  ARTIFACT_FETCH_FAILED = "artifact_fetch_failed", 
  WORKER_INIT_FAILED = "worker_init_failed",
  WEBGPU_INIT_FAILED = "webgpu_init_failed",
  CACHE_INVALID = "cache_invalid",
  NETWORK_ERROR = "network_error",
  UNKNOWN_ERROR = "unknown_error",
}

export interface ModelLoadError extends Error {
  code: ModelLoadErrorCode;
  model: string;
  stage: "engine_init" | "model_reload" | "chat_completion";
  httpStatus?: number;
  url?: string;
  retryable: boolean;
  timestamp: number;
}

export function createModelLoadError(
  code: ModelLoadErrorCode,
  message: string,
  details: Partial<ModelLoadError>,
): ModelLoadError {
  const error = new Error(message) as ModelLoadError;
  error.code = code;
  error.model = details.model || "unknown";
  error.stage = details.stage || "engine_init";
  error.httpStatus = details.httpStatus;
  error.url = details.url;
  error.retryable = details.retryable ?? false;
  error.timestamp = Date.now();
  return error;
}
```

##### 1.2 Update WebLLM Error Handling
**File**: `web-llm-chat/app/client/webllm.ts`

Update `initModel` error handling (lines 103-111):
```typescript
try {
  await this.initModel(options.onUpdate);
} catch (err: any) {
  const modelError = this.classifyError(err, options.config.model);
  console.error("Model initialization failed:", {
    code: modelError.code,
    model: modelError.model,
    stage: modelError.stage,
    message: modelError.message,
    retryable: modelError.retryable,
  });
  options?.onError?.(modelError);
  return;
}
```

Add error classification method:
```typescript
private classifyError(err: any, modelId: string): ModelLoadError {
  const errorMessage = err.message || err.toString() || "";
  
  // WebGPU errors
  if (errorMessage.includes("WebGPU") || errorMessage.includes("GPU")) {
    return createModelLoadError(
      ModelLoadErrorCode.WEBGPU_INIT_FAILED,
      "WebGPU is not available. See https://caniuse.com/webgpu",
      {
        model: modelId,
        stage: "engine_init",
        retryable: false,
      }
    );
  }
  
  // Network/fetch errors
  if (errorMessage.includes("fetch") || 
      errorMessage.includes("network") ||
      errorMessage.includes("Failed to load")) {
    return createModelLoadError(
      ModelLoadErrorCode.ARTIFACT_FETCH_FAILED,
      `Failed to download model artifacts: ${errorMessage}`,
      {
        model: modelId,
        stage: "model_reload",
        retryable: true,
      }
    );
  }
  
  // Cache errors
  if (errorMessage.includes("cache") || 
      errorMessage.includes("IndexedDB") ||
      errorMessage.includes("storage")) {
    return createModelLoadError(
      ModelLoadErrorCode.CACHE_INVALID,
      `Cache error during model load: ${errorMessage}`,
      {
        model: modelId,
        stage: "model_reload",
        retryable: true,
      }
    );
  }
  
  // Worker errors
  if (errorMessage.includes("worker") || errorMessage.includes("Worker")) {
    return createModelLoadError(
      ModelLoadErrorCode.WORKER_INIT_FAILED,
      `Worker initialization failed: ${errorMessage}`,
      {
        model: modelId,
        stage: "engine_init",
        retryable: true,
      }
    );
  }
  
  // Default unknown error
  return createModelLoadError(
    ModelLoadErrorCode.UNKNOWN_ERROR,
    errorMessage || "Unknown model loading error",
    {
      model: modelId,
      stage: "model_reload",
      retryable: false,
    }
  );
}
```

##### 1.3 Update Chat Store Error Display
**File**: `web-llm-chat/app/store/chat.ts`

Update error handling (lines 376-390):
```typescript
onError(error) {
  let errorMessage: string;
  let retryHint = "";
  
  if (error.code) {
    // Structured ModelLoadError
    errorMessage = `❌ **${error.code}**\n\n${error.message}`;
    
    if (error.retryable) {
      retryHint = "\n\n💡 **Suggestion**: This error may be temporary. Try:\n" +
                  "1. Refresh the page\n" +
                  "2. Clear browser cache (Settings → Storage)\n" +
                  "3. Try a different model";
    }
    
    if (error.code === ModelLoadErrorCode.WEBGPU_INIT_FAILED) {
      retryHint = "\n\n💡 **Your browser doesn't support WebGPU**. " +
                  "Please use Chrome 113+, Edge 113+, or check compatibility at https://caniuse.com/webgpu";
    }
    
    console.error("[Chat Error Details]", {
      code: error.code,
      model: error.model,
      stage: error.stage,
      timestamp: error.timestamp,
    });
  } else {
    // Fallback for non-structured errors
    errorMessage = error.message || error.toString?.() || "Unknown error";
  }
  
  const isAborted = errorMessage.includes("aborted");
  botMessage.content += "\n\n" + errorMessage + retryHint;
  botMessage.streaming = false;
  userMessage.isError = !isAborted;
  botMessage.isError = !isAborted;
  
  get().updateCurrentSession((session) => {
    session.messages = session.messages.concat();
    session.isGenerating = false;
  });
}
```

##### 1.4 Add Diagnostic Copy Feature
**File**: `web-llm-chat/app/components/chat-message.tsx` (or similar)

Add a "Copy Diagnostics" button for error messages:
```typescript
interface DiagnosticInfo {
  errorCode: string;
  model: string;
  timestamp: number;
  browser: string;
  webGPUSupport: boolean;
  message: string;
}

function generateDiagnostics(error: ModelLoadError): string {
  const info: DiagnosticInfo = {
    errorCode: error.code,
    model: error.model,
    timestamp: error.timestamp,
    browser: navigator.userAgent,
    webGPUSupport: "gpu" in navigator,
    message: error.message,
  };
  
  return `### WebLLM Error Diagnostics
  
**Error Code**: ${info.errorCode}
**Model**: ${info.model}
**Timestamp**: ${new Date(info.timestamp).toISOString()}
**Browser**: ${info.browser}
**WebGPU Available**: ${info.webGPUSupport}

**Error Message**:
${info.message}

**Stage**: ${error.stage}
**Retryable**: ${error.retryable}
${error.httpStatus ? `**HTTP Status**: ${error.httpStatus}` : ""}
${error.url ? `**Failed URL**: ${error.url}` : ""}

---
Please include this diagnostic information when reporting the issue at:
https://github.com/mlc-ai/web-llm-chat/issues
`;
}
```

### Phase 2: Retry Logic & Self-Recovery (Medium Priority)

#### Objective
Automatically recover from transient failures without user intervention.

#### Changes Required

##### 2.1 Add Retry Configuration
**File**: `web-llm-chat/app/client/webllm.ts`

Add retry configuration:
```typescript
interface RetryConfig {
  maxAttempts: number;
  baseDelay: number; // milliseconds
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000,
  maxDelay: 5000,
};
```

##### 2.2 Implement Retry Logic in initModel
```typescript
private async initModel(
  onUpdate?: (message: string, chunk: string) => void,
  retryCount = 0
): Promise<void> {
  if (!this.llmConfig) {
    throw Error("llmConfig is undefined");
  }
  
  try {
    this.webllm.engine.setInitProgressCallback((report: InitProgressReport) => {
      onUpdate?.(report.text, report.text);
    });
    await this.webllm.engine.reload(this.llmConfig.model, this.llmConfig);
    this.initialized = true;
  } catch (err: any) {
    const modelError = this.classifyError(err, this.llmConfig.model);
    
    // Retry logic for retryable errors
    if (modelError.retryable && retryCount < DEFAULT_RETRY_CONFIG.maxAttempts) {
      const delay = Math.min(
        DEFAULT_RETRY_CONFIG.baseDelay * Math.pow(2, retryCount),
        DEFAULT_RETRY_CONFIG.maxDelay
      );
      
      log.warn(
        `Model init failed (attempt ${retryCount + 1}/${DEFAULT_RETRY_CONFIG.maxAttempts}). ` +
        `Retrying in ${delay}ms...`,
        modelError
      );
      
      onUpdate?.(
        `⚠️ Loading failed, retrying (${retryCount + 1}/${DEFAULT_RETRY_CONFIG.maxAttempts})...`,
        ""
      );
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.initModel(onUpdate, retryCount + 1);
    }
    
    throw modelError;
  }
}
```

##### 2.3 Implement Cache Clear on Cache Errors
```typescript
private async clearModelCache(modelId: string): Promise<void> {
  try {
    log.info(`Attempting to clear cache for model: ${modelId}`);
    
    // Clear IndexedDB cache
    if ("indexedDB" in window) {
      const dbName = `webllm-${modelId}`;
      await new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);
        request.onsuccess = resolve;
        request.onerror = reject;
      });
    }
    
    // Clear Cache API
    if ("caches" in window) {
      const cacheKeys = await caches.keys();
      for (const key of cacheKeys) {
        if (key.includes(modelId) || key.includes("webllm")) {
          await caches.delete(key);
        }
      }
    }
    
    log.info(`Cache cleared successfully for model: ${modelId}`);
  } catch (err) {
    log.error("Failed to clear cache:", err);
  }
}

// Update error classification to trigger cache clear
private classifyError(err: any, modelId: string): ModelLoadError {
  // ... existing code ...
  
  // Cache errors - trigger cache clear
  if (errorMessage.includes("cache") || 
      errorMessage.includes("IndexedDB") ||
      errorMessage.includes("storage")) {
    
    // Async cache clear (don't await)
    this.clearModelCache(modelId).catch(console.error);
    
    return createModelLoadError(
      ModelLoadErrorCode.CACHE_INVALID,
      `Cache error detected. Clearing cache and retrying...`,
      {
        model: modelId,
        stage: "model_reload",
        retryable: true,
      }
    );
  }
  
  // ... rest of code ...
}
```

### Phase 3: Custom Artifact Source Support (Low Priority)

#### Objective
Allow users to host model artifacts locally/privately to avoid dependency on default CDN.

#### Changes Required

##### 3.1 Add Configuration Option
**File**: `web-llm-chat/app/store/config.ts`

Update `ConfigType` interface:
```typescript
export type ConfigType = {
  // ... existing fields ...
  
  // Custom artifact base URL for self-hosted models
  customModelBaseUrl?: string;
  
  // ... rest of fields ...
};

export const DEFAULT_CONFIG: ConfigType = {
  // ... existing defaults ...
  customModelBaseUrl: undefined, // Use default WebLLM CDN
  // ... rest of defaults ...
};
```

##### 3.2 Add UI Setting
**File**: `web-llm-chat/app/components/model-config.tsx`

Add after existing WebLLM settings:
```tsx
{config.modelClientType === ModelClient.WEBLLM && (
  <>
    {/* Existing settings... */}
    
    <ListItem
      title="Custom Model Base URL (Advanced)"
      subTitle="Override default artifact hosting. Leave empty for default CDN."
    >
      <input
        type="text"
        placeholder="https://your-cdn.com/models/"
        value={config.customModelBaseUrl || ""}
        onChange={(e) =>
          config.update(
            (config) => (config.customModelBaseUrl = e.currentTarget.value || undefined),
          )
        }
      />
    </ListItem>
  </>
)}
```

##### 3.3 Apply Custom Base URL
**File**: `web-llm-chat/app/client/webllm.ts`

Update constructor to use custom base URL:
```typescript
constructor(
  type: "serviceWorker" | "webWorker",
  logLevel: LogLevel = "WARN",
  customBaseUrl?: string,
) {
  const appConfig = { ...prebuiltAppConfig };
  
  // Apply custom base URL if provided
  if (customBaseUrl) {
    appConfig.model_list = prebuiltAppConfig.model_list.map(model => ({
      ...model,
      model_url: customBaseUrl + model.model_id,
    }));
  }
  
  const engineConfig = {
    appConfig: {
      ...appConfig,
      useIndexedDBCache: this.llmConfig?.cache === "index_db",
    },
    logLevel,
  };
  
  // ... rest of constructor ...
}
```

Update instantiation in context/provider to pass config:
```typescript
const customBaseUrl = useAppConfig.getState().customModelBaseUrl;
const webllm = new WebLLMApi(workerType, logLevel, customBaseUrl);
```

### Phase 4: Documentation & User Guidance

#### Objective
Provide clear documentation for troubleshooting and self-hosting.

#### Changes Required

##### 4.1 Add Troubleshooting Guide
**File**: `web-llm-chat/docs/TROUBLESHOOTING.md`

```markdown
# Troubleshooting Guide

## Models Not Loading

### Quick Checks

1. **Browser Compatibility**
   - Chrome 113+ or Edge 113+
   - Check WebGPU support: https://caniuse.com/webgpu

2. **Network Connection**
   - Check browser console (F12) for failed network requests
   - Look for 404, 403, or CORS errors

3. **Clear Cache**
   - Settings → Privacy → Clear browsing data
   - Select "Cached images and files"
   - Or use custom Clear Cache button in app

### Error Codes

#### `webgpu_init_failed`
Your browser doesn't support WebGPU. Update to Chrome/Edge 113+ or use a compatible browser.

#### `artifact_fetch_failed`
Model files couldn't be downloaded. Possible causes:
- Network connectivity issues
- CDN/hosting service unavailable
- Firewall/proxy blocking requests

**Solutions**:
- Check internet connection
- Try different network
- Set up self-hosted models (see below)

#### `cache_invalid`
Cached model data is corrupted. The app will automatically clear cache and retry.

#### `worker_init_failed`
Web Worker failed to initialize. Try:
- Refresh page
- Disable browser extensions
- Check browser console for detailed errors

### Self-Hosting Models

To avoid dependency on default CDN:

1. Download model artifacts from WebLLM repository
2. Host files on your server/CDN
3. In app Settings → Model Config → Custom Model Base URL
4. Enter: `https://your-server.com/models/`

See [SELF_HOSTING.md](./SELF_HOSTING.md) for detailed instructions.
```

##### 4.2 Add Self-Hosting Guide
**File**: `web-llm-chat/docs/SELF_HOSTING.md`

```markdown
# Self-Hosting WebLLM Models

## Overview

Host model artifacts on your infrastructure to:
- Avoid dependency on default CDN
- Improve loading speed with local/private CDN
- Work in restricted network environments
- Ensure availability and control

## Prerequisites

- Web server or CDN with CORS properly configured
- Sufficient storage for model files (varies by model, typically 1-10GB)
- HTTPS support (required for WebGPU in browsers)

## Steps

### 1. Download Model Artifacts

Models are stored in WebLLM's repository. Example structure:
```
your-cdn.com/models/
  ├── Llama-3.2-1B-Instruct-q4f32_1-MLC/
  │   ├── config.json
  │   ├── tokenizer.json
  │   ├── params_shard_0.bin
  │   └── ...
  └── ...
```

### 2. Configure CORS Headers

Your server must allow cross-origin requests:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Allow-Headers: Range
```

### 3. Configure WebLLM Chat

1. Open WebLLM Chat app
2. Navigate to Settings
3. Scroll to "Custom Model Base URL"
4. Enter: `https://your-cdn.com/models/`
5. Save and reload a model

### 4. Verify

Check browser console for:
- ✅ Model artifacts loading from your URL
- ❌ Any 404 or CORS errors

## Troubleshooting

**CORS Errors**: Ensure `Access-Control-Allow-Origin: *` header is set.

**404 Errors**: Verify file paths match WebLLM's expected structure.

**Slow Loading**: Consider using a CDN with edge caching.

## Cost Considerations

- Storage: $0.02-0.10/GB/month (varies by provider)
- Bandwidth: $0.05-0.12/GB (first load only, cached locally after)

For typical usage (1-2 models, <100 users), expect < $10/month.
```

##### 4.3 Update Issue Template
**File**: `.github/ISSUE_TEMPLATE/bug_report.md`

Add diagnostic fields:
```markdown
### Error Diagnostics (if available)

Please paste diagnostic info from "Copy Diagnostics" button:

```
[Paste diagnostic output here]
```

### Browser Information
- Browser: [e.g., Chrome 120, Edge 115]
- OS: [e.g., Windows 11, macOS 14]
- WebGPU Support: [Check at chrome://gpu or edge://gpu]

### Network Investigation
- [ ] Checked browser console (F12) for errors
- [ ] Checked Network tab for failed requests
- [ ] Noted any 404/403/CORS errors
- [ ] Tried different network connection

### Attempted Solutions
- [ ] Refreshed page
- [ ] Cleared browser cache
- [ ] Tried different browser
- [ ] Tried different model
```

## Testing Plan

### Unit Tests

1. **Error Classification**
   ```typescript
   describe("classifyError", () => {
     it("should classify WebGPU errors", () => {
       const error = new Error("WebGPU is not supported");
       const classified = webllm.classifyError(error, "test-model");
       expect(classified.code).toBe(ModelLoadErrorCode.WEBGPU_INIT_FAILED);
       expect(classified.retryable).toBe(false);
     });
     
     it("should classify network errors as retryable", () => {
       const error = new Error("Failed to fetch");
       const classified = webllm.classifyError(error, "test-model");
       expect(classified.code).toBe(ModelLoadErrorCode.ARTIFACT_FETCH_FAILED);
       expect(classified.retryable).toBe(true);
     });
   });
   ```

2. **Retry Logic**
   ```typescript
   describe("initModel retry", () => {
     it("should retry on retryable errors", async () => {
       // Mock engine.reload to fail twice then succeed
       let attempts = 0;
       engine.reload = jest.fn(() => {
         attempts++;
         if (attempts < 3) throw new Error("Network error");
         return Promise.resolve();
       });
       
       await webllm.initModel();
       expect(attempts).toBe(3);
     });
     
     it("should not retry on non-retryable errors", async () => {
       engine.reload = jest.fn(() => 
         Promise.reject(new Error("WebGPU not supported"))
       );
       
       await expect(webllm.initModel()).rejects.toThrow();
       expect(engine.reload).toHaveBeenCalledTimes(1);
     });
   });
   ```

### Integration Tests

1. **Model Loading Flow**
   - Start with clean cache
   - Load default model → should succeed
   - Simulate network failure → should retry and show structured error
   - Clear and retry → should succeed

2. **Error Display**
   - Trigger each error code
   - Verify error messages are user-friendly
   - Verify "Copy Diagnostics" includes all required fields

3. **Custom Base URL**
   - Configure custom URL
   - Verify artifacts load from custom location
   - Revert to default → verify fallback works

### Manual Testing Scenarios

| Scenario | Steps | Expected Result |
|----------|-------|-----------------|
| Happy Path | Load model on clean profile | Model loads successfully |
| Network Failure | Disconnect network mid-load | Retries then shows clear error |
| WebGPU Missing | Test on Firefox (no WebGPU) | Clear error with browser upgrade prompt |
| Cache Corruption | Manually corrupt IndexedDB | Auto-clears cache and retries |
| Custom CDN | Set custom base URL | Loads from custom location |
| Error Copy | Trigger error, click "Copy Diagnostics" | Copies formatted diagnostic info |

## Acceptance Criteria

### Phase 1: Diagnostics ✅
- [ ] All errors map to defined `ModelLoadErrorCode`
- [ ] Error messages include actionable guidance
- [ ] "Copy Diagnostics" button provides complete debug info
- [ ] Browser console logs include structured error details
- [ ] Issue template requests diagnostic info

### Phase 2: Recovery ✅
- [ ] Retryable errors trigger automatic retry (max 3 attempts)
- [ ] Exponential backoff implemented (1s, 2s, 4s)
- [ ] Cache errors trigger automatic cache clear + retry
- [ ] Non-retryable errors fail immediately (no retry)
- [ ] Retry progress shown to user

### Phase 3: Custom Hosting ✅
- [ ] Custom base URL configurable in Settings
- [ ] URL validation prevents invalid inputs
- [ ] Model artifacts load from custom location when configured
- [ ] Default behavior unchanged when field empty
- [ ] Configuration persists across sessions

### Phase 4: Documentation ✅
- [ ] Troubleshooting guide covers all error codes
- [ ] Self-hosting guide includes complete setup instructions
- [ ] Issue template guides reporters to provide diagnostics
- [ ] README links to troubleshooting resources

## Rollout Strategy

### Week 1: Phase 1 (Diagnostics)
- **Risk**: Low - only improves error messages
- **Deploy**: Staging → 10% production → 100%
- **Monitor**: Error report quality improvement

### Week 2: Phase 2 (Recovery)
- **Risk**: Medium - changes core loading flow
- **Deploy**: Feature flag → Staging → 25% → 100%
- **Monitor**: Retry success rates, loading times

### Week 3: Phase 3 (Custom Hosting)
- **Risk**: Low - opt-in feature
- **Deploy**: Direct to production
- **Monitor**: Usage adoption, custom URL failures

### Week 4: Phase 4 (Documentation)
- **Risk**: None
- **Deploy**: Direct to production
- **Monitor**: Support ticket reduction

## Success Metrics

1. **Diagnostic Quality**
   - 80%+ of bug reports include diagnostic info
   - Issue resolution time reduced by 50%

2. **Self-Recovery**
   - 70%+ of transient failures auto-recover
   - User intervention reduced by 60%

3. **Custom Hosting Adoption**
   - 10+ organizations using self-hosted setup
   - 99.9% uptime for self-hosted users

4. **User Satisfaction**
   - Error-related support tickets reduced by 70%
   - Positive sentiment in issue comments

## Open Questions

1. **Q**: Should we rate-limit retry attempts to prevent server overload?
   **A**: Yes, implement per-model cooldown (5 min) after 3 failed attempts.

2. **Q**: Should custom base URL support authentication?
   **A**: Not in MVP. Add in follow-up if requested.

3. **Q**: Should we track error telemetry?
   **A**: Yes, but opt-in only with privacy-preserving aggregation.

4. **Q**: Should we pre-cache multiple models?
   **A**: Out of scope. Revisit based on bandwidth data.

## Related Issues

- #85 - Original bug report (this plan addresses it)
- Future: Add telemetry for proactive error detection
- Future: Model download progress granularity improvements
- Future: Multi-CDN failover for resilience

## Conclusion

This plan transforms issue #85 from a vague "models won't load" report into a systematic solution covering:
- **Diagnostics**: Users can self-debug and report structured errors
- **Recovery**: Automatic retry and cache management
- **Flexibility**: Self-hosted model support
- **Documentation**: Clear guidance for troubleshooting and setup

**Estimated Effort**: 3-4 weeks (1 developer)  
**Maintenance**: Low (mostly documentation updates)  
**Impact**: High (resolves entire class of loading failures)
