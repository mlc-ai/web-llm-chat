# Workflow Analysis

## Overview

WebLLM Chat uses a streamlined development workflow with automated quality checks, CI/CD pipelines, and clear branching strategies. This document outlines the complete development lifecycle from ideation to deployment.

## Development Workflow

### 1. Planning & Design Phase

```
Idea/Feature Request
        ↓
Create GitHub Issue
        ↓
Discussion & Design
        ↓
Assign to Developer
        ↓
Start Development
```

**Actions**:
- Create detailed GitHub issue with description, acceptance criteria
- Use issue templates (bug_report.yml, feature_request.yml)
- Discuss approach in issue comments
- Break down into smaller tasks if needed

### 2. Development Phase

```
Create Feature Branch
        ↓
Code Implementation
        ↓
Local Testing
        ↓
Commit Changes (with Pre-commit Hooks)
        ↓
Push to Remote
```

**Branch Naming**:
```
feature/description      # New features
bugfix/description       # Bug fixes
hotfix/description       # Critical production fixes
refactor/description     # Code refactoring
docs/description         # Documentation updates
```

**Examples**:
```
feature/vision-model-support
bugfix/webgpu-context-loss
hotfix/critical-memory-leak
refactor/store-architecture
docs/update-readme
```

### 3. Code Quality Phase

#### Pre-commit Hooks (Husky)

Automatically runs before each commit:

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint-staged
```

**Checks**:
1. **ESLint**: Code linting
2. **Prettier**: Code formatting
3. **Type Check**: TypeScript validation

```json
// .lintstagedrc.json
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ]
}
```

**If checks fail**:
- Commit is blocked
- Fix issues reported by linters
- Re-attempt commit

### 4. Pull Request Phase

```
Push Feature Branch
        ↓
Create Pull Request
        ↓
Automated CI Checks
        ↓
Code Review
        ↓
Address Feedback
        ↓
Approval
        ↓
Merge to Main
```

#### Pull Request Template (if exists)

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Local testing completed
- [ ] Works offline
- [ ] WebGPU functionality verified
- [ ] Cross-browser tested

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

#### Automated CI/CD (GitHub Actions)

**On Pull Request**:

1. **Lint Check** (`lint.yml` - if exists)
   ```yaml
   - name: Run ESLint
     run: yarn lint
   ```

2. **Type Check** (`type-check.yml` - if exists)
   ```yaml
   - name: TypeScript Check
     run: tsc --noEmit
   ```

3. **Build Verification**
   ```yaml
   - name: Build
     run: yarn build
   ```

4. **Deploy Preview** (`deploy_preview.yml`)
   ```yaml
   - name: Deploy Preview
     # Creates preview deployment for testing
   ```

#### Code Review Process

**Reviewer Checklist**:
- [ ] Code quality and readability
- [ ] Follows coding standards
- [ ] Proper error handling
- [ ] TypeScript types are correct
- [ ] No security vulnerabilities
- [ ] Performance considerations
- [ ] Accessibility (a11y) compliance
- [ ] Documentation is clear
- [ ] Tests cover new functionality

**Review Outcomes**:
- **Approve**: Ready to merge
- **Request Changes**: Issues need fixing
- **Comment**: Suggestions without blocking

### 5. Merge Strategy

**Main Branch Protection**:
- Requires pull request
- Requires code review approval
- Requires passing CI checks
- No direct pushes to main

**Merge Methods**:
1. **Squash and Merge** (preferred)
   - Combines all commits into one
   - Clean history
   - Single commit message

2. **Rebase and Merge**
   - Maintains individual commits
   - Linear history

3. **Merge Commit**
   - Creates merge commit
   - Preserves branch history

### 6. Deployment Phase

#### Automatic Deployments

**Production Deployment** (`gh_deploy.yml`)

Triggers: Push to `main` branch

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: yarn install
      
      - name: Build
        run: yarn export
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

**Vercel Deployment** (`vercel_deploy.yaml`)

Triggers: Push to any branch

```yaml
name: Vercel Deploy

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

**Preview Cleanup** (`remove_deploy_preview.yml`)

Triggers: Pull request closed

```yaml
name: Remove Deploy Preview

on:
  pull_request:
    types: [closed]

jobs:
  cleanup:
    # Remove preview deployment
```

## Branching Strategy

### Main Branches

```
main (production)
  ├── Protected branch
  ├── Always deployable
  └── Requires PR and review
```

### Feature Branches

```
feature/new-feature
  ├── Created from: main
  ├── Merged to: main
  └── Deleted after merge
```

### Hotfix Workflow

For critical production bugs:

```
1. Create hotfix/bug-name from main
2. Implement fix
3. Test thoroughly
4. Create PR
5. Fast-track review
6. Merge immediately
7. Deploy
```

## Issue Management

### Issue Types

**Bug Report** (bug_report.yml):
```yaml
name: Bug Report
description: File a bug report
body:
  - type: textarea
    label: Describe the bug
  - type: textarea
    label: Steps to reproduce
  - type: textarea
    label: Expected behavior
  - type: input
    label: Browser/OS
```

**Feature Request** (feature_request.yml):
```yaml
name: Feature Request
description: Suggest a feature
body:
  - type: textarea
    label: Problem description
  - type: textarea
    label: Proposed solution
  - type: textarea
    label: Alternatives considered
```

### Issue Labels

```
Type:
- bug          # Something isn't working
- feature      # New feature request
- enhancement  # Improvement to existing feature
- documentation # Documentation changes

Priority:
- critical     # Blocks users
- high         # Important but not blocking
- medium       # Nice to have
- low          # Future consideration

Status:
- needs-triage # Needs review
- in-progress  # Being worked on
- blocked      # Waiting on something
- ready        # Ready for development

Area:
- ui           # User interface
- ai           # AI/model related
- performance  # Performance issues
- a11y         # Accessibility
- i18n         # Internationalization
```

### Issue Workflow

```
New Issue Created
        ↓
Triage (add labels)
        ↓
Discussion
        ↓
Assign to Developer
        ↓
Link to PR
        ↓
Close when PR merged
```

## Release Process

### Versioning (Semantic Versioning)

```
MAJOR.MINOR.PATCH

Example: 0.2.0
- MAJOR: Breaking changes (0 → 1)
- MINOR: New features (0.2 → 0.3)
- PATCH: Bug fixes (0.2.0 → 0.2.1)
```

### Release Workflow

```
1. Update version in package.json
2. Update CHANGELOG.md
3. Create Git tag: v0.2.0
4. Push tag to GitHub
5. Create GitHub Release
6. Automated deployment triggers
7. Announce release
```

### Changelog Format

```markdown
# Changelog

## [0.2.0] - 2024-02-15

### Added
- Vision model support for image analysis
- Export chat as markdown or JSON

### Changed
- Improved model loading performance
- Updated UI for better mobile experience

### Fixed
- WebGPU context loss on tab switch
- Memory leak in chat store

### Security
- Updated dependencies with security patches
```

## Continuous Integration

### GitHub Actions Workflows

#### 1. Deploy Preview (`deploy_preview.yml`)

**Trigger**: Pull request opened/updated

**Purpose**: Create preview deployment for testing

**Steps**:
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Build application
5. Deploy to preview URL
6. Comment preview link on PR

#### 2. GitHub Pages Deploy (`gh_deploy.yml`)

**Trigger**: Push to `main`

**Purpose**: Deploy to production (chat.webllm.ai)

**Steps**:
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Build static export
5. Deploy to GitHub Pages

#### 3. Vercel Deploy (`vercel_deploy.yaml`)

**Trigger**: Push to any branch

**Purpose**: Deploy to Vercel (alternative hosting)

**Steps**:
1. Checkout code
2. Deploy to Vercel
3. Set environment variables

#### 4. Issue Translator (`issue-translator.yml`)

**Trigger**: New issue created

**Purpose**: Auto-translate issues to English

**Steps**:
1. Detect issue language
2. Translate if not English
3. Add translation as comment

## Dependency Management

### Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

**Process**:
1. Dependabot creates PR for updates
2. Automated CI checks run
3. Review changes
4. Merge if tests pass

### Security Updates

- **Automatic**: Dependabot alerts
- **Manual Review**: Security advisories
- **Priority**: Critical vulnerabilities fixed immediately

## Local Development Workflow

### Initial Setup

```bash
# 1. Clone repository
git clone https://github.com/mlc-ai/web-llm-chat.git
cd web-llm-chat

# 2. Install dependencies
yarn install

# 3. Setup environment (optional)
cp .env.example .env.local
# Edit .env.local

# 4. Start development server
yarn dev
```

### Daily Development

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes and test
yarn dev  # Test in browser

# 4. Commit changes (pre-commit hooks run)
git add .
git commit -m "feat: add my feature"

# 5. Push to remote
git push origin feature/my-feature

# 6. Create pull request on GitHub
```

### Development Scripts

```bash
# Development
yarn dev          # Start dev server (hot reload)
yarn export:dev   # Dev server in export mode

# Production Builds
yarn build        # Standalone build
yarn export       # Static export
yarn start        # Start production server

# Code Quality
yarn lint         # Run ESLint
yarn lint --fix   # Fix auto-fixable issues

# Utilities
yarn prompts      # Fetch prompt templates
yarn proxy-dev    # Dev with proxy
```

## Testing Workflow (Future)

### Test Types

**Unit Tests**:
```bash
yarn test                # Run all tests
yarn test:watch          # Watch mode
yarn test:coverage       # Coverage report
```

**Integration Tests**:
```bash
yarn test:integration    # API and store tests
```

**End-to-End Tests**:
```bash
yarn test:e2e            # Full user flows
yarn test:e2e:ci         # CI mode (headless)
```

### Test-Driven Development (TDD)

```
1. Write failing test
2. Implement feature
3. Test passes
4. Refactor
5. Repeat
```

## Rollback Procedure

### If Deployment Fails

```bash
# 1. Identify last working commit
git log --oneline

# 2. Revert to working state
git revert <commit-hash>

# 3. Push revert
git push origin main

# 4. Deployment automatically triggers
```

### Emergency Hotfix

```bash
# 1. Create hotfix branch from main
git checkout -b hotfix/critical-bug main

# 2. Implement fix

# 3. Open PR with "HOTFIX" label

# 4. Fast-track review and merge

# 5. Verify deployment
```

## Communication Channels

### Development Updates

- **GitHub Issues**: Feature discussions
- **Pull Requests**: Code reviews
- **Discord**: Real-time chat
- **GitHub Discussions**: General questions
- **Commit Messages**: Change documentation

### Release Announcements

- GitHub Releases
- Discord announcements
- README updates

## Documentation Workflow

### Documentation Updates

```
Code Change
     ↓
Update Docs (same PR)
     ↓
Review Together
     ↓
Deploy Docs with Code
```

### Documentation Types

1. **README.md**: Project overview
2. **docs/**: Detailed guides
3. **.github/copilot/**: Developer docs
4. **JSDoc Comments**: Code documentation
5. **CHANGELOG.md**: Version history

## Best Practices

### Do's

✅ Create feature branches for all changes
✅ Write descriptive commit messages
✅ Keep PRs focused and small
✅ Respond to review feedback promptly
✅ Update documentation with code changes
✅ Test locally before pushing
✅ Use conventional commits

### Don'ts

❌ Don't push directly to main
❌ Don't ignore pre-commit hooks
❌ Don't merge without review
❌ Don't commit console.log statements
❌ Don't leave commented-out code
❌ Don't merge with failing CI checks
❌ Don't force push to shared branches

## Metrics & Monitoring

### Development Metrics

- **PR Cycle Time**: Time from PR open to merge
- **Code Review Time**: Time to first review
- **Build Time**: CI build duration
- **Deployment Frequency**: Releases per week/month

### Quality Metrics

- **Test Coverage**: Percentage of code covered
- **ESLint Warnings**: Number of linting issues
- **TypeScript Errors**: Type safety issues
- **Bundle Size**: Application size over time

## Continuous Improvement

### Retrospectives

- Regular team reviews
- Identify workflow bottlenecks
- Propose improvements
- Update documentation

### Workflow Evolution

The workflow is continuously refined based on:
- Team feedback
- Industry best practices
- Tool improvements
- Project growth
