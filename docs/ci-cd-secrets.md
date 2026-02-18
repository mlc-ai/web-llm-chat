# CI/CD Secrets for Vercel Workflows

This document explains the GitHub Actions secrets required by Vercel-related workflows in this repository.

## Required Secrets

| Secret | Required | Purpose |
| --- | --- | --- |
| `VERCEL_TOKEN` | Yes | Authenticates Vercel CLI commands and Vercel API calls used in deployment and preview cleanup. |
| `VERCEL_ORG_ID` | Yes | Identifies the Vercel team/org context used by workflows. |
| `VERCEL_PROJECT_ID` | Yes | Identifies the Vercel project to deploy and manage. |

## Workflow Dependency Matrix

| Workflow | Trigger | Secrets Used |
| --- | --- | --- |
| [.github/workflows/vercel_deploy.yaml](../.github/workflows/vercel_deploy.yaml) | Push to `main` | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |
| [.github/workflows/deploy_preview.yml](../.github/workflows/deploy_preview.yml) | Push to non-`main` branches | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |
| [.github/workflows/remove_deploy_preview.yml](../.github/workflows/remove_deploy_preview.yml) | `pull_request_target` on close | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |

## How to Configure Secrets in GitHub

1. Open the repository on GitHub.
2. Navigate to **Settings > Secrets and variables > Actions**.
3. Select **New repository secret**.
4. Add each required secret:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
5. Re-run failed workflows or push a new commit to validate setup.

## How to Obtain Values

- `VERCEL_TOKEN`: Create a personal/team token in Vercel account settings.
- `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: Available from Vercel project settings or via Vercel CLI project linking metadata.

## Typical Failure Modes

### Missing `VERCEL_TOKEN`

- `vercel pull` fails during environment fetch.
- `vercel build` / `vercel deploy` fails with authentication errors.
- Preview cleanup script cannot call Vercel API delete endpoints.

### Missing `VERCEL_ORG_ID` or `VERCEL_PROJECT_ID`

- Vercel CLI cannot resolve project context for pull/build/deploy.
- Cleanup script cannot query correct deployment list for deletion.

## Verification Checklist

- Non-main branch push completes preview deployment workflow.
- Main branch push/merge completes production deployment workflow.
- Closing a PR from a preview branch triggers deployment cleanup workflow.

## Maintenance Note

When workflow files change secret usage, update this document and the README CI/CD prerequisites section in the same pull request.
