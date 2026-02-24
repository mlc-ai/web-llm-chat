# Step 3: Create Merge Request

## Objective

Create a Merge Request (MR) from the feature branch to the main branch using GitLab MCP tools, with proper title, description, and automatic issue linking.

## Prerequisites

- Feature branch exists and has been pushed to remote
- Changes have been committed
- Issue number is known (e.g., #96)

## Instructions for Copilot

Use the GitLab MCP tool to create a Merge Request with the following specifications:

### 1. Source and Target Branches

- **Source Branch**: `feat/model-load-error-diagnostics` (current feature branch)
- **Target Branch**: `main` (default branch)
- **Repository**: `mlc-ai/web-llm-chat`

### 2. Merge Request Title

Create a concise, descriptive title following conventional commit format:

```
feat: enhanced model load error diagnostics
```

or

```
Enhanced Model Load Error Diagnostics (Issue #96)
```

### 3. Merge Request Description

Include the following sections in the MR description:

```markdown
## Summary

Implements Phase 1 of issue #96: Enhanced error diagnostics for model loading failures.

This MR addresses the model loading failures reported in issue #85 by introducing structured error handling, classification, and user-actionable error messages.

## Changes Made

### 1. Added Structured Error Types (`app/client/api.ts`)
- Added `ModelLoadErrorCode` enum with 7 error categories
- Created `ModelLoadError` interface extending Error with diagnostic fields
- Implemented `createModelLoadError` helper function

### 2. Enhanced Error Classification (`app/client/webllm.ts`)
- Imported new error types and utilities
- Replaced generic error handling with structured classification
- Added `classifyError` method that categorizes errors into:
  - `webgpu_init_failed` - Browser lacks WebGPU support
  - `artifact_fetch_failed` - Network/CDN download failures
  - `cache_invalid` - Cache corruption issues
  - `worker_init_failed` - Web Worker startup failures
  - `unknown_error` - Unclassified errors
- Each error includes retryable flag and diagnostic context

### 3. Improved Error Display (`app/store/chat.ts`)
- Updated `onError` handler to display structured errors
- Added error code badges (❌) for visual clarity
- Implemented contextual retry hints based on error type
- Added specific guidance for WebGPU compatibility errors
- Enhanced console logging with structured diagnostic data

### 4. Documentation
- Added analysis and planning documents
- Created implementation prompts for reproducibility

## Benefits

✅ **Better Diagnostics**: Every error now has a classification code  
✅ **Actionable Guidance**: Users get specific steps to resolve issues  
✅ **Improved Debugging**: Console logs include structured error details  
✅ **User Experience**: Clear, helpful error messages instead of technical jargon  
✅ **Future-Ready**: Foundation for retry logic (Phase 2) and telemetry

## Testing

- ✅ No TypeScript compilation errors
- ✅ Code follows existing patterns and style
- ✅ All error paths now use structured errors
- ✅ Backward compatible (gracefully handles non-structured errors)

## Manual Testing Recommendations

1. **WebGPU Error**: Test on Firefox (no WebGPU) → should show clear upgrade message
2. **Network Error**: Disconnect network during model load → should classify as `artifact_fetch_failed`
3. **Cache Error**: Manually corrupt IndexedDB → should classify as `cache_invalid`
4. **Normal Flow**: Load model normally → should work without regressions

## Related Issues

Closes #96

## Next Steps (Future MRs)

- Phase 2: Automatic retry logic with exponential backoff
- Phase 3: Custom artifact base URL for self-hosting
- Phase 4: Documentation and troubleshooting guides
```

### 4. Link to Issue (Auto-close)

To automatically close the issue when the MR is merged, include in the description:

```
Closes #96
```

or

```
Fixes #96
```

This syntax will automatically close issue #96 when the MR is merged into main.

### 5. Additional MR Settings

- **Assignee**: Assign to yourself or relevant team member
- **Labels**: Add relevant labels (e.g., `enhancement`, `error-handling`, `documentation`)
- **Reviewers**: Request review from project maintainers
- **Delete source branch**: Enable "Delete source branch when merge request is accepted"

## GitLab MCP Tool Usage

### Example Tool Call

Use the GitLab MCP tool with parameters similar to:

```
mcp_gitlab_create_merge_request
- project: mlc-ai/web-llm-chat
- source_branch: feat/model-load-error-diagnostics
- target_branch: main
- title: "feat: enhanced model load error diagnostics"
- description: [Full description as outlined above]
- remove_source_branch: true
```

### Verification

After creating the MR:
1. Verify the MR appears in the repository
2. Confirm the issue link is properly formatted
3. Check that all files are included in the MR diff
4. Ensure CI/CD pipelines are triggered

## Expected Files in MR

- `app/client/api.ts` (modified)
- `app/client/webllm.ts` (modified)
- `app/store/chat.ts` (modified)
- `prompts/1-analyze-and-plan.prompt.md` (new)
- `prompts/2-branch-commit-push.prompt.md` (new)
- `prompts/3-raise-mr.prompt.md` (new - this file)
- `prompts/Readme_updated.md` (new)

## Success Criteria

- ✅ Merge Request is successfully created
- ✅ MR title is descriptive and follows conventions
- ✅ MR description includes all relevant sections
- ✅ Issue #96 is linked with auto-close syntax
- ✅ All changed files are visible in the MR
- ✅ MR is ready for review

## Troubleshooting

### If GitLab MCP tool is not available:
- Use the web interface: https://gitlab.com/mlc-ai/web-llm-chat/-/merge_requests/new
- Or use the GitLab CLI: `glab mr create --source-branch feat/model-load-error-diagnostics --target-branch main`

### If repository is on GitHub (not GitLab):
- Use GitHub MCP tools instead (e.g., `mcp_github_create_pull_request`)
- GitHub uses "Pull Request" terminology instead of "Merge Request"
- Auto-close syntax remains the same: `Closes #96` or `Fixes #96`

## Notes

- This is a GitLab-specific prompt. If the repository is hosted on GitHub, adapt the instructions to use GitHub MCP tools.
- The current repository (mlc-ai/web-llm-chat) appears to be on GitHub based on the remote URLs, so GitHub tools would be more appropriate.
- For GitHub, use `mcp_github_create_pull_request` instead of GitLab MR tools.

---

## Quick Command Summary

**For GitHub (Current Setup):**
```bash
# Use GitHub MCP tool
mcp_github_create_pull_request with:
- owner: mlc-ai
- repo: web-llm-chat
- head: feat/model-load-error-diagnostics
- base: main
- title: "feat: enhanced model load error diagnostics"
- body: [description with "Closes #96"]
```

**For GitLab (If Applicable):**
```bash
# Use GitLab MCP tool
mcp_gitlab_create_merge_request with:
- project: mlc-ai/web-llm-chat
- source_branch: feat/model-load-error-diagnostics
- target_branch: main
- title: "feat: enhanced model load error diagnostics"
- description: [description with "Closes #96"]
```
