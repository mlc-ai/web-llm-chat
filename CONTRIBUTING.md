# Contributing to WebLLM Chat

Thank you for your interest in contributing to WebLLM Chat! This guide will help you get started.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)
- [Getting Help](#getting-help)

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **Yarn** package manager
- **Git** for version control
- **WebGPU-compatible browser** (Chrome 113+, Edge 113+)

### Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/web-llm-chat.git
   cd web-llm-chat
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Start Development Server**
   ```bash
   yarn dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:3000` to see your local instance.


## Development Workflow

### 1. Find or Create an Issue

Before starting work:
- Check [existing issues](https://github.com/mlc-ai/web-llm-chat/issues)
- Look for issues labeled `good first issue` or `help wanted`
- If reporting a bug, use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.yml)
- If suggesting a feature, use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.yml)

### 2. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b type/short-description

# Examples:
# fix/model-loading-error
# feat/add-cache-management
# docs/update-readme
```

### 3. Make Your Changes

- Write clean, readable code
- Follow existing patterns in the codebase
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes

**Manual Testing Checklist:**
- [ ] Changes work in Chrome/Edge
- [ ] No console errors
- [ ] UI looks correct on desktop and mobile
- [ ] Models load properly (if applicable)
- [ ] Settings persist correctly (if applicable)

## Submitting Changes

### Commit Messages

Keep commits clear and descriptive:

```bash
# Good examples
git commit -m "fix: resolve model loading timeout issue"
git commit -m "feat: add local model URL configuration"
git commit -m "docs: update local models guide"

# Include issue reference if applicable
git commit -m "fix: resolve CORS error in model loading (#85)"
```

**Format:** `<type>: <description>`

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance tasks

### Push and Create Pull Request

```bash
# Push to your fork
git push origin your-branch-name
```

Then:
1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill in the description:
   - What changes did you make?
   - Why did you make them?
   - How did you test them?
   - Link to related issue (if any)
4. Submit the pull request

### Pull Request Checklist

Before submitting, make sure:
- [ ] Code follows the project's style (auto-formatted)
- [ ] No ESLint errors (`yarn lint`)
- [ ] Changes work in supported browsers
- [ ] Related documentation is updated
- [ ] Commit messages are clear
- [ ] PR description explains the changes

**Ready to contribute?** 🚀

1. Find an issue or create one
2. Fork the repository
3. Make your changes
4. Submit a pull request

Thank you for making WebLLM Chat better!
