# Contributing to WebLLM Chat

Thank you for your interest in contributing to WebLLM Chat! This document provides guidelines and instructions for contributing to this project.

We welcome contributions of all kinds—bug reports, feature requests, documentation improvements, and code changes.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Code of Conduct](#code-of-conduct)
- [Questions and Support](#questions-and-support)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **Yarn**: Version 1.22.19 (specified in `package.json`)
- **Git**: For version control
- **WebGPU-capable browser**: Chrome/Edge v113+ for testing (see [WebGPU compatibility](https://caniuse.com/webgpu))

### Development Setup

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the [repository page](https://github.com/mlc-ai/web-llm-chat).

2. **Clone your fork**
   
   ```bash
   git clone https://github.com/YOUR_USERNAME/web-llm-chat.git
   cd web-llm-chat
   ```

3. **Add upstream remote**
   
   ```bash
   git remote add upstream https://github.com/mlc-ai/web-llm-chat.git
   ```

4. **Install dependencies**
   
   ```bash
   yarn install
   ```

5. **Start the development server**
   
   ```bash
   yarn dev
   ```
   
   The application will be available at `http://localhost:3000`.

6. **Verify the setup**
   
   Open the app in a WebGPU-capable browser and try loading a model to ensure everything works.

---

## How to Contribute

### Finding Issues to Work On

- Browse the [Issues](https://github.com/mlc-ai/web-llm-chat/issues) page
- Look for issues labeled:
  - `good first issue` - Great for newcomers
  - `help wanted` - Community contributions welcome
  - `bug` - Bug fixes needed
  - `enhancement` - New features or improvements

### Claiming an Issue

Before starting work on an issue:

1. **Comment on the issue** expressing your interest
2. **Wait for acknowledgment** from maintainers (especially for larger changes)
3. **Ask questions** if anything is unclear

This helps avoid duplicate work and ensures alignment with project goals.

### Reporting Bugs

When reporting bugs, please include:

- **Clear title** describing the issue
- **Steps to reproduce** the bug
- **Expected behavior** vs actual behavior
- **Browser and version** (e.g., Chrome 120, Edge 119)
- **Device information** (OS, GPU if relevant)
- **Screenshots or videos** if applicable
- **Console logs** or error messages

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml) when creating an issue .

### Suggesting Features

When suggesting new features:

- **Check existing issues** to avoid duplicates
- **Explain the use case** and why it's valuable
- **Provide examples** or mockups if possible
- **Consider feasibility** within the project's scope

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml).

---

## Development Workflow

### Branching Strategy

The project follows **trunk-based development**:

- **`main`** - Production branch, always deployable
- **Feature branches** - Created from `main` for all changes
- **Branch naming**: Use descriptive names like:
  - `feature/add-model-xyz`
  - `fix/chat-rendering-bug`
  - `docs/update-readme`

### Making Changes

1. **Create a feature branch**
   
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our [Coding Standards](#coding-standards)

3. **Test your changes** manually:
   - Run the dev server and test in WebGPU-capable browsers
   - Verify chat functionality with multiple models
   - Test edge cases and error scenarios
   - Check responsive design on different screen sizes

4. **Lint your code**
   
   ```bash
   yarn lint
   ```

5. **Commit your changes**
   
   We use [Conventional Commits](https://www.conventionalcommits.org/):
   
   ```bash
   git commit -m "feat: add support for XYZ model"
   git commit -m "fix: resolve chat history export bug"
   git commit -m "docs: update installation instructions"
   ```
   
   **Commit types**:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, no logic change)
   - `refactor:` - Code refactoring
   - `perf:` - Performance improvements
   - `test:` - Adding or updating tests
   - `chore:` - Build process or tooling changes

6. **Keep your branch updated**
   
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Coding Standards

#### TypeScript

- **Strict mode** enabled - no implicit `any` types
- **Type all functions** with parameters and return types
- **Use interfaces** for object shapes and component props
- **Avoid type assertions** unless absolutely necessary

#### Code Style

- **Prettier** for automatic formatting (runs on pre-commit)
- **ESLint** for code quality (Next.js + Prettier rules)
- **Run** `yarn lint` before committing

#### Naming Conventions

- **React Components**: `PascalCase` (e.g., `ChatList`, `ModelSelect`)
- **Functions**: `camelCase` (e.g., `trimTopic`, `estimateTokenLength`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `DEFAULT_MODELS`)
- **Files**:
  - Components: `ComponentName.tsx`
  - Utilities: `utilityName.ts`
  - Styles: `component.module.scss`

#### Import Organization

```typescript
// External dependencies
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// Internal components
import { ChatList } from "./components/chat-list";
import { Settings } from "./components/settings";

// Types
import type { ChatMessage, ModelConfig } from "./typing";

// Styles
import styles from "./component.module.scss";
```

#### Documentation

- **JSDoc comments** for public APIs and exported functions
- **Inline comments** for complex logic
- **README updates** when adding new features
- **Type annotations** serve as inline documentation

### Pre-commit Hooks

The project uses **Husky** and **lint-staged**:

- Automatically runs on `git commit`
- Lints and formats staged files
- Blocks commits with linting errors

---

## Pull Request Process

### Before Submitting

- [ ] Code follows the [Coding Standards](#coding-standards)
- [ ] Code has been tested manually in WebGPU-capable browser
- [ ] Linting passes (`yarn lint` returns no errors)
- [ ] No console errors or warnings introduced
- [ ] Documentation updated (README, JSDoc) if needed
- [ ] Commit messages follow Conventional Commits format

### Creating a Pull Request

1. **Push your branch** to your fork
   
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub:
   - Go to the [mlc-ai/web-llm-chat repository](https://github.com/mlc-ai/web-llm-chat)
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template

3. **PR Description** should include:
   - **What** changed and **why**
   - **Related issues** (e.g., "Closes #89", "Fixes #456")
   - **Testing steps** for reviewers
   - **Screenshots** or videos for UI changes
   - **Breaking changes** if applicable

4. **Preview Deployment**
   
   A preview deployment will be automatically created for your PR. Test your changes in the preview environment.

### Review Process

- **Maintainer review**: Expect feedback within a few days
- **Address feedback**: Make requested changes and push to the same branch
- **CI checks**: Must pass before merging
- **Approval required**: At least one maintainer approval needed

### After Merge

- Your PR will be merged into `main`
- Automatic deployment to GitHub Pages and Vercel
- Your contribution will be credited in the commit history
- Branch will be deleted automatically

---

## Code of Conduct

### Our Standards

We are committed to providing a welcoming and inclusive environment. We expect all contributors to:

- **Be respectful** and considerate in communications
- **Accept constructive criticism** gracefully
- **Focus on what's best** for the project and community
- **Show empathy** towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or hate speech
- Trolling, insulting comments, or personal attacks
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

### Reporting Issues

If you experience or witness unacceptable behavior, please report it to the maintainers by:

- Opening a private issue
- Contacting maintainers on [Discord](https://discord.gg/9Xpy2HGBuD)

All reports will be handled with discretion and confidentiality.

---

## Questions and Support

### Getting Help

- **Discord**: Join our [Discord community](https://discord.gg/9Xpy2HGBuD) for real-time discussions
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and ideas (if enabled)

### Community Resources

- **Documentation**: [README.md](README.md)
- **WebLLM Docs**: [https://llm.mlc.ai/docs](https://llm.mlc.ai/docs)
- **Related Projects**:
  - [WebLLM](https://github.com/mlc-ai/web-llm) - Core library
  - [MLC-LLM](https://llm.mlc.ai/) - Model compilation

### Asking Good Questions

When asking for help:

1. **Search first** - Check if it's already answered
2. **Be specific** - Provide context and details
3. **Include code** - Show what you've tried
4. **Share errors** - Include full error messages
5. **Describe environment** - Browser, OS, Node version

---

## Additional Information

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server (hot reload) |
| `yarn build` | Build as standalone Next.js app |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn export` | Build as static site (GitHub Pages) |
| `yarn prompts` | Fetch updated prompts |

### Project Structure

```
web-llm-chat/
├── app/                  # Main application code
│   ├── client/          # LLM API clients (WebLLM, MLC-LLM)
│   ├── components/      # React components
│   ├── store/           # State management (Zustand)
│   ├── utils/           # Utility functions
│   ├── locales/         # Internationalization
│   └── worker/          # Service/Web workers
├── public/              # Static assets
├── docs/                # Documentation
├── scripts/             # Build and utility scripts
├── .github/             # GitHub workflows and templates
└── licenses/            # License files
```

### Technology Stack

- **Framework**: Next.js 13
- **Language**: TypeScript 5.x
- **State Management**: Zustand
- **Styling**: SCSS Modules
- **LLM Runtime**: @mlc-ai/web-llm
- **PWA**: Serwist/Workbox

---

## License

By contributing to WebLLM Chat, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).

---

## Acknowledgments

Thank you for contributing to WebLLM Chat! Every contribution, no matter how small, helps make this project better for everyone. 🎉

If you have suggestions for improving this contributing guide, please open an issue or pull request.

---

**Happy Contributing! 🚀**
