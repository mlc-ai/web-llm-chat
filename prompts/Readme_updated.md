# WebLLM Chat

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![WebGPU](https://img.shields.io/badge/WebGPU-Enabled-32a852)](https://www.w3.org/TR/webgpu/)
[![Related Repository: WebLLM](https://img.shields.io/badge/Related_Repo-WebLLM-fafbfc?logo=github)](https://github.com/mlc-ai/web-llm)
[![Web App](https://img.shields.io/badge/Web_App-Deployed-32a852?logo=pwa)](https://chat.webllm.ai)
[![Discord](https://img.shields.io/badge/Join-Discord-7289DA?logo=discord&logoColor=white)](https://discord.gg/9Xpy2HGBuD)

**Private AI Conversations, Fully In-Browser – Zero Server Infrastructure Required**

---

## Overview

**WebLLM Chat** is a privacy-first AI chat interface that runs large language models (LLMs) entirely in your browser using WebGPU acceleration. Built on top of the powerful [WebLLM](https://github.com/mlc-ai/web-llm) engine, it combines cutting-edge browser technologies with a user-friendly design to deliver an unprecedented AI conversation experience.

Every conversation happens **locally on your device**. Your data never leaves your computer, ensuring complete privacy and security. After initial model setup, the application works **entirely offline**, making it the perfect solution for private AI interactions without relying on cloud services or expensive API subscriptions.

Built with **Next.js 13**, **React 18**, **TypeScript 5**, and **Zustand**, WebLLM Chat represents the future of AI applications: powerful, private, and accessible to everyone with a modern browser.

**Target Users**: Developers, privacy-conscious individuals, researchers, and anyone seeking private AI assistance without cloud dependencies or data exposure.

---

## Technology Stack

### Core Technologies

- **Language**: TypeScript 5.4.5
- **Framework**: Next.js 13.4.9 with App Router
- **UI Library**: React 18.2.0 with concurrent rendering
- **State Management**: Zustand 4.3.8
- **Package Manager**: Yarn 1.22.19

### AI & Machine Learning

- **@mlc-ai/web-llm 0.2.79** - WebGPU-accelerated LLM inference engine
  - Browser-native model execution
  - Streaming responses
  - Vision model support
  - Intelligent model caching
- **WebGPU API** (`@webgpu/types 0.1.42`) - Direct GPU access for high-performance inference

### Key Dependencies

- **React Router DOM 6.23.1** - Client-side routing for seamless navigation
- **SASS 1.59.2** - CSS preprocessor with modules for component scoping
- **Lucide React 0.454.0** - Beautiful, tree-shakeable icon library
- **Emoji Picker React 4.9.2** - Native emoji support for expressive messaging
- **@hello-pangea/dnd 16.5.0** - Accessible drag-and-drop functionality

### Content Rendering

- **React Markdown 9.0.1** - Safe markdown parsing and rendering
- **Remark GFM 4.0.0** - GitHub Flavored Markdown (tables, task lists, strikethrough)
- **Remark Math 6.0.0** - Mathematical notation support
- **Rehype KaTeX 7.0.0** - Beautiful LaTeX math rendering
- **Rehype Highlight 7.0.0** - Syntax highlighting for code blocks
- **Mermaid 10.6.1** - Create diagrams and charts from text

### Progressive Web App

- **@serwist/next 9.0.2** - Next-generation service worker management
- **Next PWA 5.6.0** - PWA configuration for installable web apps

### Development Tools

- **ESLint 8.57.0** - Code linting with Next.js and Prettier plugins
- **Prettier 3.0.2** - Consistent code formatting across the codebase
- **Husky 9.0.11** - Git hooks for automated quality assurance
- **TypeScript 5.4.5** - Static type checking with strict mode enabled

### Browser Requirements

- **Chrome/Edge** 113+ (WebGPU support)
- **Firefox Nightly** (with WebGPU enabled via flags)
- **Safari Technology Preview** 17.4+

---

## Key Features

- 🔒 **100% Private** - All AI processing happens locally; your conversations never leave your device
- ⚡ **WebGPU Accelerated** - Lightning-fast inference using your GPU, no powerful hardware needed
- 📴 **Fully Offline** - Works completely offline after initial model download
- 🎨 **Beautiful UI** - Modern, responsive interface with dark/light themes
- 💬 **Rich Markdown** - Support for code blocks, math equations, tables, and mermaid diagrams
- 🌐 **Multi-Language** - 20+ language translations for global accessibility
- 📦 **Multi-Model Support** - Choose from various LLMs including Llama, Mistral, Gemma, and more
- 🎯 **Custom Prompts** - Create and manage system prompts and conversation templates
- 💾 **Session Management** - Save and restore conversation sessions locally
- 📱 **Progressive Web App** - Install as a native app on desktop and mobile
- 🎭 **No Sign-Up Required** - Start chatting immediately without accounts or API keys
- 🚀 **Zero Server Costs** - No backend infrastructure needed

---

## Architecture

### High-Level Overview

WebLLM Chat employs a **modular, privacy-first architecture** where all processing occurs client-side using a layered approach:

```
┌─────────────────────────────────────────────────────────────────┐
│                      Browser Environment                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  ┌─────────┐ │
│  │   Next.js    │  │   React UI   │  │  Service │  │  PWA    │ │
│  │   App Layer  │──│  Components  │──│  Worker  │──│  Cache  │ │
│  └──────────────┘  └──────────────┘  └──────────┘  └─────────┘ │
│         │                  │                │                    │
│         └──────────────────┴────────────────┘                    │
│                       │                                          │
│              ┌────────▼────────┐                                 │
│              │  Zustand Store  │                                 │
│              │  (State Mgmt)   │                                 │
│              └────────┬────────┘                                 │
│                       │                                          │
│         ┌─────────────┼─────────────┐                           │
│         │             │             │                           │
│    ┌────▼────┐  ┌────▼────┐  ┌────▼────┐                       │
│    │  Chat   │  │ Config  │  │ Prompt  │                       │
│    │  Store  │  │  Store  │  │  Store  │                       │
│    └─────────┘  └─────────┘  └─────────┘                       │
│                       │                                          │
│              ┌────────▼────────┐                                 │
│              │   WebLLM Core   │                                 │
│              │  (@mlc-ai/...)  │                                 │
│              └────────┬────────┘                                 │
│                       │                                          │
│              ┌────────▼────────┐                                 │
│              │     WebGPU      │                                 │
│              │   (GPU Access)  │                                 │
│              └─────────────────┘                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components

- **Presentation Layer**: React components with SCSS modules for modular, maintainable UI
- **State Management Layer**: Zustand stores for chat, config, prompts, and templates with persistence
- **Application Logic Layer**: Client APIs, utilities, and business logic separate from UI
- **AI Inference Layer**: WebLLM integration providing model loading, GPU inference, and streaming
- **Service Worker Layer**: PWA support with offline caching and model storage
- **Build & Configuration Layer**: Next.js, TypeScript, and tooling configuration

### Design Patterns

- **Modular Architecture** - Clear separation of concerns across layers
- **Privacy by Design** - Zero data transmission; everything client-side
- **Component-Based UI** - Reusable React components with co-located styles
- **Declarative State** - Zustand stores with immutable updates
- **Progressive Enhancement** - Works offline after initial setup
- **Responsive Design** - Mobile-first, adapts to all screen sizes

---

## Getting Started

### Prerequisites

- **Node.js** 16.0+ (for development)
- **Yarn** 1.22.19 or npm 8+
- **Modern Browser** with WebGPU support:
  - Chrome/Edge 113+
  - Safari Technology Preview 17.4+
  - Firefox Nightly (enable WebGPU in `about:config`)
- **GPU** - Integrated or dedicated GPU (most modern computers)
- **Disk Space** - 2-10 GB for model storage (varies by model)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mlc-ai/web-llm-chat.git
   cd web-llm-chat
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment (optional)**
   ```bash
   cp .env.example .env
   # Configure environment variables if needed
   ```

4. **Fetch prompt templates (optional)**
   ```bash
   yarn prompts
   ```

### Running the Application

#### Development Mode

```bash
yarn dev
# or
npm run dev
```

The application will be available at: **http://localhost:3000**

#### Production Build

```bash
# Build the application
yarn build

# Start production server
yarn start
```

#### Static Export (for hosting)

```bash
# Export as static site
yarn export

# Output will be in the 'out' directory
```

### First-Time Setup

1. **Open in browser** - Navigate to `http://localhost:3000`
2. **Select a model** - Choose from available LLMs (Llama 3, Mistral, Gemma, etc.)
3. **Wait for download** - Model will download and cache (one-time, 1-10 minutes)
4. **Start chatting** - Once loaded, begin your private AI conversations!

### Troubleshooting Common Setup Issues

- **WebGPU not supported**: Update your browser to the latest version or try Chrome/Edge
- **Model download fails**: Check internet connection; large files may take time
- **Out of memory**: Try a smaller model variant (e.g., 7B instead of 13B)
- **Build errors**: Clear `node_modules` and reinstall: `rm -rf node_modules yarn.lock && yarn install`

---

## Project Structure

```
web-llm-chat/
├── app/                    # Main application source (Next.js App Router)
│   ├── client/             # API client and WebLLM integration
│   ├── components/         # React UI components + SCSS modules
│   ├── config/             # Application configuration files
│   ├── icons/              # SVG icon components
│   ├── locales/            # i18n translation files (20+ languages)
│   ├── store/              # Zustand state management stores
│   │   ├── chat.ts         # Chat sessions and messages
│   │   ├── config.ts       # User preferences and settings
│   │   ├── prompt.ts       # Prompt management
│   │   └── template.ts     # Message templates
│   ├── styles/             # Global and shared styles
│   ├── templates/          # Chat and message templates
│   ├── utils/              # Helper functions and utilities
│   ├── worker/             # Service worker (PWA)
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main page component
├── docs/                   # Additional documentation
├── prompts/                # Agent prompt templates
├── public/                 # Static assets (fonts, icons, manifests)
├── scripts/                # Build and utility scripts
├── .github/                # GitHub configuration
│   ├── copilot/            # Copilot documentation
│   │   ├── Architecture.md
│   │   ├── Code_Exemplars.md
│   │   ├── Coding_Standards.md
│   │   ├── Project_Folder_Structure.md
│   │   ├── Technology_Stack.md
│   │   ├── Unit_Tests.md
│   │   └── Workflow_Analysis.md
│   └── workflows/          # GitHub Actions CI/CD
├── next.config.mjs         # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation

```

### Key Directories

- **`app/components/`** - All React components with co-located `.module.scss` styles
- **`app/store/`** - Zustand stores for centralized state management with persistence
- **`app/client/`** - WebLLM integration and API client layer
- **`app/locales/`** - Translation files for internationalization (Arabic, Chinese, English, Spanish, etc.)
- **`app/utils/`** - Pure utility functions for formatting, validation, and helpers
- **`.github/copilot/`** - Comprehensive development documentation for the project

---

## Development Workflow

### Branching Strategy

WebLLM Chat follows a **simplified Git Flow** approach:

- **`main`** - Production-ready code, protected branch
- **`feature/*`** - New features (e.g., `feature/vision-model-support`)
- **`bugfix/*`** - Bug fixes (e.g., `bugfix/webgpu-context-loss`)
- **`hotfix/*`** - Critical production fixes
- **`refactor/*`** - Code refactoring without functional changes
- **`docs/*`** - Documentation updates

### Development Process

1. **Create feature branch** from `main`
   ```bash
   git checkout -b feature/my-awesome-feature
   ```

2. **Make changes** following coding standards
   - Write TypeScript with explicit types
   - Use functional React components
   - Follow naming conventions
   - Co-locate component styles

3. **Write/update tests** (when available)
   ```bash
   yarn test
   ```

4. **Run quality checks locally**
   ```bash
   yarn lint        # ESLint
   yarn format      # Prettier (via lint-staged)
   ```

5. **Commit with conventional format**
   ```bash
   git commit -m "feat: add vision model support"
   git commit -m "fix: resolve WebGPU context loss"
   git commit -m "docs: update installation guide"
   ```

6. **Push and create pull request**
   ```bash
   git push origin feature/my-awesome-feature
   ```

7. **Address review feedback** from maintainers

8. **Merge after approval** - Requires passing CI checks and code review

### Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting, no code change
- `refactor:` - Code restructuring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### CI/CD Pipeline

Automated checks on every pull request:

1. **Lint Check** - ESLint validation
2. **Type Check** - TypeScript compilation
3. **Build Verification** - Ensure production build succeeds
4. **Deploy Preview** - Automatic preview deployment for testing

Automated deployments:

- **GitHub Pages** - Main branch auto-deploys to production
- **Vercel** - Alternative deployment platform with previews

---

## Coding Standards

### TypeScript Standards

- **Always use explicit types** - Never use `any`, prefer `unknown` if type is truly unknown
- **Enable strict mode** - All type checking rules enforced in `tsconfig.json`
- **Interfaces for objects** - Use `interface` for object shapes, `type` for unions/intersections
- **Const objects over enums** - Prefer `const` objects with `as const` assertion

```typescript
// ✅ Good
interface UserProps {
  name: string;
  email: string;
}

export function User({ name, email }: UserProps) {
  return <div>{name}</div>;
}

// ❌ Avoid
export default function User(props: any) {
  return <div>{props.name}</div>;
}
```

### React Conventions

- **Functional components only** - Use hooks, no class components
- **Destructure props** in function parameters
- **Named exports** - Avoid default exports for components
- **SCSS modules** - Co-locate styles with components (e.g., `button.module.scss`)
- **Memoize expensive operations** - Use `useMemo`, `useCallback` appropriately

```typescript
import React, { useState, useMemo } from 'react';
import { useChatStore } from '@/app/store';
import styles from './component.module.scss';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState<string>('');
  const messages = useChatStore((state) => state.messages);
  
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);
  
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {/* Implementation */}
    </div>
  );
}
```

### File Naming

- **Components**: PascalCase (`Button.tsx`) or kebab-case (`button.tsx`)
- **Styles**: kebab-case with `.module.scss` (`button.module.scss`)
- **Utilities**: camelCase (`format.ts`, `validators.ts`)
- **Stores**: lowercase (`chat.ts`, `config.ts`)

### Import Organization

```typescript
// External dependencies
import React from 'react';
import { useState } from 'react';

// Internal absolute imports (use @ alias)
import { Button } from '@/app/components/button';
import { useChatStore } from '@/app/store';
import { formatDate } from '@/app/utils/format';

// Relative imports
import { helper } from './helper';

// Styles (always last)
import styles from './component.module.scss';
```

### Code Quality Tools

- **ESLint**: Automated linting with Next.js and Prettier plugins
  ```bash
  yarn lint
  ```

- **Prettier**: Consistent code formatting
  ```bash
  yarn format
  ```

- **Husky**: Pre-commit hooks automatically run linting and formatting
  - Blocks commits if checks fail
  - Ensures consistent code quality

### Accessibility

- Always include ARIA labels for interactive elements
- Use semantic HTML (`<article>`, `<nav>`, `<main>`)
- Ensure keyboard navigation works
- Maintain proper heading hierarchy

```typescript
<button
  onClick={handleClick}
  aria-label="Send message"
  aria-disabled={disabled}
>
  <SendIcon />
</button>
```

---

## Testing

### Testing Strategy

WebLLM Chat follows a **comprehensive testing approach** (in development):

- **Unit Tests** - Individual functions and components
- **Integration Tests** - Component interactions and state management
- **E2E Tests** - Complete user workflows with WebGPU

### Testing Stack (Planned)

- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing with user-centric queries
- **Playwright** - End-to-end browser testing with WebGPU support
- **@testing-library/jest-dom** - Custom Jest matchers for DOM

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run with coverage
yarn test:coverage

# Run E2E tests
yarn test:e2e
```

### Test Structure

```
app/
├── components/
│   ├── button.tsx
│   ├── button.test.tsx              # Component tests
│   └── button.module.scss
├── store/
│   ├── chat.ts
│   └── chat.test.ts                 # Store tests
└── utils/
    ├── format.ts
    └── format.test.ts               # Utility tests
```

### Coverage Requirements

Target coverage thresholds:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

---

## Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, documentation improvements, or translations, your help makes WebLLM Chat better for everyone.

### How to Contribute

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/web-llm-chat.git
   cd web-llm-chat
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/my-contribution
   ```

4. **Follow coding standards** ([see Coding Standards section](#coding-standards))
   - Use TypeScript with explicit types
   - Follow React best practices
   - Co-locate component styles
   - Write meaningful commit messages

5. **Write/update tests** for new features (when testing is available)

6. **Ensure all checks pass**
   ```bash
   yarn lint       # ESLint
   yarn build      # Build verification
   ```

7. **Commit your changes**
   ```bash
   git commit -m "feat: add awesome feature"
   ```

8. **Push to your fork**
   ```bash
   git push origin feature/my-contribution
   ```

9. **Submit a pull request** with a clear description of changes

### Code Examples

See [Code_Exemplars.md](.github/copilot/Code_Exemplars.md) for reference implementations and best practices.

### Pull Request Guidelines

- **Clear description** - Explain what changes and why
- **Reference issues** - Link to related GitHub issues
- **Include tests** - Add tests for new features
- **Update documentation** - Keep docs in sync with changes
- **Follow commit conventions** - Use conventional commit messages
- **Keep PRs focused** - One feature/fix per PR

### Areas to Contribute

- 🐛 **Bug Fixes** - Report and fix issues
- ✨ **New Features** - Vision models, voice input, advanced prompts
- 📖 **Documentation** - Improve guides, add examples
- 🌐 **Translations** - Add or improve language translations
- 🎨 **UI/UX** - Enhance design and user experience
- ⚡ **Performance** - Optimize speed and memory usage
- 🧪 **Testing** - Add test coverage

### Need Help?

- Check [existing issues](https://github.com/mlc-ai/web-llm-chat/issues) and discussions
- Review documentation in [`.github/copilot/`](.github/copilot/)
- Join our [Discord community](https://discord.gg/9Xpy2HGBuD)
- Tag maintainers in your PR for review

---

## Configuration

### Environment Variables

WebLLM Chat can be configured via environment variables (optional):

```bash
# .env.local
NEXT_PUBLIC_APP_NAME="WebLLM Chat"
NEXT_PUBLIC_DEFAULT_MODEL="Llama-3-8B"
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Build Modes

```bash
# Development server
yarn dev

# Production standalone server
yarn build && yarn start

# Static export (for GitHub Pages, Vercel, etc.)
yarn export
```

### Model Configuration

Edit model settings in `app/config/model.config.ts`:

```typescript
export const AVAILABLE_MODELS = [
  {
    id: 'Llama-3-8B',
    name: 'Llama 3 8B',
    size: '4.7GB',
    description: 'Balanced performance and speed',
  },
  // Add custom models
];
```

---

## Deployment

### GitHub Pages

Automatic deployment via GitHub Actions:

```yaml
# .github/workflows/gh_deploy.yml
# Pushes to main automatically deploy
```

### Vercel

1. **Connect repository** to Vercel
2. **Configure build settings**:
   - Build Command: `yarn export`
   - Output Directory: `out`
3. **Deploy** - Automatic on push to main

### Docker

```bash
# Build Docker image
docker build -t webllm-chat .

# Run container
docker run -p 3000:3000 webllm-chat
```

### Self-Hosting

Static export can be hosted on any web server:

```bash
yarn export
# Upload 'out' directory to your server
```

---

## Troubleshooting

### WebGPU Not Available

- **Update browser** to Chrome/Edge 113+ or Safari TP 17.4+
- **Enable WebGPU** in Firefox via `about:config` → `dom.webgpu.enabled`
- **Check GPU support** at https://webgpureport.org/

### Model Download Issues

- **Slow download**: Models are large (1-10 GB), be patient
- **Failed download**: Check internet connection, try smaller model
- **Quota exceeded**: Clear browser storage or use smaller model

### Out of Memory

- **Use smaller model**: Try 7B instead of 13B variant
- **Close other tabs**: Free up RAM and GPU memory
- **Restart browser**: Clear memory leaks

### Performance Issues

- **Update GPU drivers**: Ensure latest drivers installed
- **Close background apps**: Free up GPU resources
- **Try different model**: Some models are more efficient

### Build Errors

```bash
# Clear and reinstall
rm -rf node_modules yarn.lock .next
yarn install
yarn build
```

---

## Roadmap

### Planned Features

- ✅ Multi-model support
- ✅ Markdown rendering with syntax highlighting
- ✅ Progressive Web App support
- ✅ Multi-language translations (20+)
- 🚧 Vision model integration (in progress)
- 📋 Voice input and speech-to-text
- 📋 Model fine-tuning support
- 📋 Plugin system for extensions
- 📋 Collaborative chat sessions
- 📋 Advanced prompt engineering tools
- 📋 Export conversations to different formats
- 📋 Mobile native apps (iOS, Android)

### Future Improvements

- Enhanced accessibility features
- Better mobile experience
- More model options
- Performance optimizations
- Comprehensive test coverage

---

## License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for full details.

### Third-Party Licenses

This project includes components from other open-source projects. See [licenses/](licenses/) directory for complete license information.

---

## Acknowledgments

- **[WebLLM Team](https://github.com/mlc-ai/web-llm)** - For the incredible WebGPU-accelerated LLM engine
- **[MLC-AI](https://mlc.ai/)** - Machine Learning Compilation framework
- **ChatGPT-Next-Web** - UI/UX inspiration (see [licenses/LICENSE.ChatGPT-Next-Web.txt](licenses/LICENSE.ChatGPT-Next-Web.txt))
- **Open Source Community** - All contributors who make this project possible

---

## Contact & Support

- **🐛 Report Issues**: [GitHub Issues](https://github.com/mlc-ai/web-llm-chat/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/mlc-ai/web-llm-chat/discussions)
- **💬 Discord Community**: [Join Discord](https://discord.gg/9Xpy2HGBuD)
- **📧 Email**: Contact maintainers via GitHub
- **📚 Documentation**: See [`.github/copilot/`](.github/copilot/) directory
- **🌐 Web App**: [https://chat.webllm.ai](https://chat.webllm.ai)

---

## Star History

If you find WebLLM Chat useful, please consider giving us a ⭐ on GitHub!

---

**Made with ❤️ by the WebLLM Chat community**

*Empowering private, accessible AI conversations for everyone*
