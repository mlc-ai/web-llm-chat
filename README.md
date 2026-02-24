<div align="center">

# WebLLM Chat

<a href="https://github.com/mlc-ai/web-llm"><img alt="Related Repository: WebLLM" src="https://img.shields.io/badge/Related_Repo-WebLLM-fafbfc?logo=github"></a>
<a href="https://chat.webllm.ai"><img alt="Web App Deployed on GitHub Pages" src="https://img.shields.io/badge/Web_App-Deployed-32a852?logo=pwa"></a>
<a href="https://www.apache.org/licenses/LICENSE-2.0"><img alt="License: Apache-2.0" src="https://img.shields.io/badge/License-Apache_2.0-blue.svg"></a>
<a href="https://discord.gg/9Xpy2HGBuD"><img alt="Join Discord" src="https://img.shields.io/badge/Join-Discord-7289DA?logo=discord&logoColor=white"></a>

**Private AI Conversations, Fully In-Browser.**

[**Chat Now**](https://chat.webllm.ai/)

[WebLLM Chat Demo Video](https://github.com/mlc-ai/web-llm-chat/assets/23090573/f700e27e-bb88-4068-bc8b-8a33ea5a4300)

</div>

## Overview

**WebLLM Chat** is a private AI chat interface that combines [WebLLM](https://github.com/mlc-ai/web-llm) with a user-friendly design, leveraging WebGPU to run large language models (LLMs) natively in your browser. Experience an unprecedented, private, and accessible AI conversation experience with zero server infrastructure requirements.

All AI processing happens locally on your device using WebGPU acceleration. Your conversations never leave your computer, ensuring complete privacy. After initial setup, the application works entirely offline.

## Technology Stack

### Core Framework
- **Next.js 13.4.9** - React framework with App Router for optimal performance
- **React 18.2.0** - Modern UI library with concurrent rendering
- **TypeScript 5.4.5** - Type-safe development with strict mode enabled

### AI & Machine Learning
- **@mlc-ai/web-llm 0.2.79** - WebGPU-accelerated LLM inference engine
- **WebGPU API** - Direct GPU access for high-performance AI inference in the browser

### State Management & Routing
- **Zustand 4.3.8** - Lightweight, flexible state management with persistence
- **React Router DOM 6.23.1** - Client-side routing for seamless navigation

### UI & Styling
- **SASS 1.59.2** - CSS preprocessor with modules for component scoping
- **Lucide React 0.454.0** - Beautiful, consistent icon library
- **Emoji Picker React 4.9.2** - Native emoji support for expressive messaging
- **@hello-pangea/dnd 16.5.0** - Accessible drag-and-drop functionality

### Markdown & Content Rendering
- **React Markdown 9.0.1** - Safe markdown parsing and rendering
- **Remark GFM 4.0.0** - GitHub Flavored Markdown (tables, strikethrough, task lists)
- **Remark Math 6.0.0** - Mathematical notation support
- **Rehype KaTeX 7.0.0** - Beautiful LaTeX math rendering
- **Rehype Highlight 7.0.0** - Syntax highlighting for code blocks
- **Mermaid 10.6.1** - Create diagrams and charts from text

### Progressive Web App
- **@serwist/next 9.0.2** - Next-generation service worker management
- **Next PWA 5.6.0** - PWA configuration for installable web apps

### Development Tools
- **ESLint 8.57.0** with Next.js and Prettier plugins
- **Prettier 3.0.2** - Consistent code formatting
- **Husky 9.0.11** - Git hooks for quality assurance
- **TypeScript 5.4.5** - Static type checking

### Browser Requirements
- Chrome/Edge 113+ (WebGPU support)
- Firefox Nightly (with WebGPU enabled)
- Safari Technology Preview 17.4+

## Project Architecture

WebLLM Chat employs a modular, privacy-first architecture where all processing occurs client-side:

```
┌─────────────────────────────────────────────────────┐
│                Browser Environment                   │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌───────┐ │
│  │ Next.js  │──│  React   │──│ Service│──│  PWA  │ │
│  │   App    │  │    UI    │  │ Worker │  │ Cache │ │
│  └──────────┘  └──────────┘  └────────┘  └───────┘ │
│         │             │            │                 │
│         └─────────────┴────────────┘                 │
│                   │                                  │
│          ┌────────▼────────┐                         │
│          │  Zustand Stores │                         │
│          │  (State Layer)  │                         │
│          └────────┬────────┘                         │
│                   │                                  │
│          ┌────────▼────────┐                         │
│          │   WebLLM Core   │                         │
│          └────────┬────────┘                         │
│                   │                                  │
│          ┌────────▼────────┐                         │
│          │     WebGPU      │                         │
│          │  (GPU Access)   │                         │
│          └─────────────────┘                         │
└─────────────────────────────────────────────────────┘
```

### Key Architectural Principles

1. **Privacy by Design** - All data processing happens locally, zero telemetry
2. **Progressive Enhancement** - Core functionality works everywhere, enhanced by WebGPU
3. **Modular Architecture** - Clear separation between presentation, business logic, and state
4. **Offline-First** - Service worker enables full offline functionality after initial load
5. **Type Safety** - Comprehensive TypeScript coverage prevents runtime errors

### Data Flow

```
User Input → React UI → Zustand Store → WebLLM Client
                                            ↓
                                      GPU Inference
                                            ↓
                                    Streaming Response
                                            ↓
                   Zustand Store ← Response Handler
                         ↓
                   UI Update (React)
```

## Getting Started

### Prerequisites

- **Node.js 16+** and **Yarn** package manager
- **Modern Browser** with WebGPU support:
  - Chrome/Edge 113+ 
  - Firefox Nightly (with WebGPU flag enabled)
  - Safari Technology Preview 17.4+

### Installation

```bash
# Clone the repository
git clone https://github.com/mlc-ai/web-llm-chat.git
cd web-llm-chat

# Install dependencies
yarn install

# Configure environment (optional)
cp .env.example .env.local
# Edit .env.local with your settings

# Start development server
yarn dev
```

The application will be available at `http://localhost:3000`

### Environment Configuration

Create `.env.local` for local development:

```bash
# Build mode: 'standalone' or 'export'
BUILD_MODE=standalone

# Disable webpack chunking (optional)
DISABLE_CHUNK=false

# Proxy configuration (optional)
PROXY_URL=http://localhost:7890
```

## Project Structure

```
web-llm-chat/
├── .github/                 # GitHub configuration
│   ├── copilot/            # Copilot documentation
│   ├── workflows/          # CI/CD workflows
│   └── ISSUE_TEMPLATE/     # Issue templates
├── app/                    # Main application code (Next.js App Router)
│   ├── client/            # API clients and WebLLM integration
│   ├── components/        # React UI components
│   ├── config/            # Application configuration
│   ├── icons/             # SVG icons
│   ├── locales/           # i18n translations
│   ├── store/             # Zustand state management
│   │   ├── chat.ts       # Chat state (sessions, messages)
│   │   ├── config.ts     # User preferences
│   │   ├── prompt.ts     # Prompt management
│   │   └── template.ts   # Template management
│   ├── styles/            # Global styles and themes
│   ├── utils/             # Utility functions
│   ├── worker/            # Service worker for PWA
│   └── page.tsx           # Main entry point
├── docs/                   # Additional documentation
├── public/                 # Static assets (icons, manifest)
├── scripts/                # Build and utility scripts
├── prompts/                # AI agent prompt templates
├── .eslintrc.json         # ESLint configuration
├── .prettierrc.js         # Prettier configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.mjs        # Next.js configuration
├── Dockerfile             # Docker container setup
└── README.md              # This file
```

### Key Directories

- **`app/components/`**: Modular React components with co-located SCSS styles
- **`app/store/`**: Zustand stores managing application state with localStorage persistence
- **`app/client/`**: WebLLM integration and API layer
- **`app/worker/`**: Service worker for offline functionality and caching
- **`.github/copilot/`**: Comprehensive developer documentation

## Key Features

### 🔒 Privacy & Security
- **100% Client-Side Processing** - All AI runs locally in your browser
- **Zero Data Transmission** - Conversations never leave your device
- **No Servers Required** - Completely self-contained application
- **Offline Capable** - Works without internet after model download
- **Content Security Policy** - Protection against XSS and injection attacks

### 🚀 AI Capabilities
- **WebGPU Acceleration** - Hardware-accelerated inference for fast responses
- **Multiple Models** - Support for various LLMs (Llama, Mistral, Phi, Gemma, etc.)
- **Vision Models** - Upload and analyze images with AI
- **Streaming Responses** - Real-time token generation
- **Context Management** - Maintains conversation history
- **Custom Models** - Connect to MLC-LLM REST API for custom models

### 💻 User Experience
- **Intuitive Interface** - Clean, responsive design for all screen sizes
- **Rich Markdown** - Full GFM support with tables, task lists, and more
- **Code Highlighting** - Beautiful syntax highlighting for 100+ languages
- **Math Rendering** - KaTeX support for mathematical equations
- **Mermaid Diagrams** - Create flowcharts and diagrams in chat
- **Dark Mode** - Eye-friendly theme with automatic system detection
- **Emoji Picker** - Express yourself with native emoji support
- **Drag & Drop** - Organize chats with intuitive interactions
- **Export** - Save conversations as Markdown, JSON, or images

### 🌐 Progressive Web App
- **Installable** - Add to home screen on desktop and mobile
- **Offline Support** - Full functionality without internet connection
- **Fast Loading** - Aggressive caching for instant startup
- **Service Worker** - Background updates and resource management
- **Cross-Platform** - Works on Windows, macOS, Linux, iOS, Android

### 🛠️ Developer Features
- **Open Source** - Apache 2.0 license for maximum flexibility
- **TypeScript** - Full type safety with strict mode
- **Modular Design** - Clear separation of concerns for easy extension
- **Hot Reload** - Fast development iteration with HMR
- **Code Quality** - ESLint, Prettier, and Husky for consistency
- **Comprehensive Docs** - Detailed architecture and development guides

## Built-in Models

WebLLM Chat natively supports all WebLLM built-in models. Popular models include:

- **Llama 3 series** - Meta's powerful open models
- **Mistral & Mixtral** - Fast, efficient models from Mistral AI
- **Phi-3 series** - Microsoft's compact, capable models  
- **Gemma** - Google's open models
- **And many more...**

View the complete list: [WebLLM Built-in Models](https://github.com/mlc-ai/web-llm?tab=readme-ov-file#built-in-models)

## Use Custom Models

Connect WebLLM Chat to any custom language model through [MLC-LLM](https://llm.mlc.ai/):

### Step 1: (Optional) Compile Your Model

Compile your model into MLC format following the [conversion guide](https://llm.mlc.ai/docs/compilation/convert_weights.html).

### Step 2: Host REST API

Set up a REST API through MLC-LLM using the [deployment instructions](https://llm.mlc.ai/docs/deploy/rest.html).

### Step 3: Configure WebLLM Chat

1. Open [WebLLM Chat](https://chat.webllm.ai/)
2. Navigate to **Settings** in the sidebar
3. Select **"MLC-LLM REST API (Advanced)"** as Model Type
4. Enter your REST API endpoint URL from Step 2
5. Start chatting with your custom model!

## Development

### Local Development Workflow

```bash
# Start development server with hot reload
yarn dev

# The app runs at http://localhost:3000
# Changes to code automatically refresh the browser
```

### Available Scripts

```bash
# Development
yarn dev              # Start dev server with hot reload
yarn export:dev       # Dev server in static export mode

# Production
yarn build            # Build for standalone deployment
yarn export           # Build static site for CDN/GitHub Pages
yarn start            # Start production server (after build)

# Code Quality
yarn lint             # Run ESLint
yarn lint --fix       # Auto-fix linting issues
yarn prepare          # Setup Husky git hooks

# Utilities
yarn prompts          # Fetch prompt templates
yarn proxy-dev        # Development with proxy support
```

### Development with Proxy

For development behind a proxy:

```bash
yarn proxy-dev
```

Or manually:

```bash
sh ./scripts/init-proxy.sh
proxychains -f ./scripts/proxychains.conf yarn dev
```

### Code Style

The project uses automated code formatting:

- **Prettier**: Enforces consistent style (80 char width, 2 space indent, semicolons, double quotes)
- **ESLint**: Catches common issues and enforces best practices
- **TypeScript**: Strict mode enabled for maximum type safety
- **Husky**: Pre-commit hooks ensure code quality before commits

## Development Workflow

### Branching Strategy

- **`main`**: Production-ready code, protected branch
- **`feature/*`**: New features (e.g., `feature/vision-support`)
- **`bugfix/*`**: Bug fixes (e.g., `bugfix/memory-leak`)
- **`hotfix/*`**: Critical production fixes
- **`docs/*`**: Documentation updates

### Pull Request Process

1. **Create Branch** - Fork and create feature branch from `main`
2. **Develop** - Implement changes following coding standards
3. **Test Locally** - Verify functionality works as expected
4. **Commit** - Use conventional commits (feat, fix, docs, etc.)
5. **Push** - Push to your fork
6. **Open PR** - Create pull request with detailed description
7. **CI Checks** - Automated linting, type checking, and builds
8. **Code Review** - Maintainer reviews and provides feedback
9. **Merge** - Once approved, changes are merged to main

### Commit Convention

```
type(scope): subject

Examples:
feat(chat): add message export functionality
fix(model): resolve WebGPU context loss on tab switch
docs(readme): update installation instructions
style(button): adjust padding and colors
refactor(store): simplify state management
perf(render): optimize message list rendering
test(chat): add integration tests
chore(deps): update dependencies
```

## Coding Standards

### TypeScript Guidelines

- **Strict Mode**: All strict type checking rules enabled
- **Explicit Types**: Avoid `any`, prefer interfaces for objects
- **Functional Components**: Use React hooks, no class components
- **Props Destructuring**: Destructure props in function parameters

```typescript
// ✅ Good
interface ButtonProps {
  text: string;
  onClick: () => void;
}

export function Button({ text, onClick }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>;
}

// ❌ Avoid
export function Button(props: any) {
  return <button>{props.text}</button>;
}
```

### React Patterns

- **Hooks**: useState, useEffect, useMemo, useCallback
- **Zustand for State**: No Context API for global state
- **SCSS Modules**: Co-locate styles with components
- **Memoization**: Use memo, useMemo, useCallback appropriately

### File Organization

- Components: `ComponentName.tsx` + `component-name.module.scss`
- Stores: `domain.ts` (e.g., `chat.ts`, `config.ts`)
- Utils: `utility-name.ts` (e.g., `format.ts`)
- Imports: Use `@/` alias for absolute imports

## Testing

### Current Status

Testing infrastructure is in planning phase. Manual testing checklist:

- [ ] Model loading and initialization
- [ ] Message sending and receiving
- [ ] Markdown and code rendering
- [ ] Math equation display
- [ ] Image upload (vision models)
- [ ] Chat export functionality
- [ ] Theme switching
- [ ] Settings persistence
- [ ] Offline functionality
- [ ] PWA installation
- [ ] Cross-browser compatibility

### Future Testing Strategy

Planned testing tools:
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **Coverage Goal**: 80%+ across statements, branches, functions, lines

## Deployment

### Static Export (GitHub Pages, Netlify, Vercel, Cloudflare Pages)

```bash
# Build static site
yarn export

# Output in 'out' directory
# Deploy 'out' folder to your static hosting
```

**Advantages**: Simple, fast CDN delivery, no server costs

### Standalone Server

```bash
# Build for standalone deployment  
yarn build

# Start production server
yarn start
```

**Advantages**: Server-side features, dynamic rendering, API routes

### Docker Deployment

**Basic deployment:**
```bash
docker build -t webllm_chat .
docker run -d -p 3000:3000 webllm_chat
```

**With proxy support:**
```bash
docker run -d -p 3000:3000 \
  -e PROXY_URL=http://localhost:7890 \
  webllm_chat
```

**With proxy authentication:**
```bash
docker run -d -p 3000:3000 \
  -e PROXY_URL="http://127.0.0.1:7890 user pass" \
  webllm_chat
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Configuration is included in `vercel.json`.

### CI/CD Workflows

GitHub Actions workflows automate deployment:

- **`gh_deploy.yml`**: Deploy to GitHub Pages on push to main
- **`vercel_deploy.yaml`**: Deploy to Vercel on every push
- **`deploy_preview.yml`**: Create preview deployments for PRs
- **`remove_deploy_preview.yml`**: Clean up preview deployments

## Contributing

We welcome contributions from the community! WebLLM Chat thrives on collaboration.

### How to Contribute

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes following our coding standards
5. **Test** thoroughly in multiple browsers
6. **Commit** using conventional commits
7. **Push** to your fork (`git push origin feature/amazing-feature`)
8. **Open** a Pull Request with detailed description

### Contribution Areas

- 🐛 **Bug Fixes** - Resolve issues and improve stability
- ✨ **Features** - Add new functionality
- 📝 **Documentation** - Improve guides and examples
- 🌐 **i18n** - Add translations for new languages
- 🎨 **UI/UX** - Enhance design and user experience
- ⚡ **Performance** - Optimize speed and efficiency
- 🧪 **Testing** - Expand test coverage
- ♿ **Accessibility** - Improve a11y compliance

### Code Review

All contributions undergo code review:

1. Automated checks must pass (ESLint, type checking, build)
2. At least one maintainer approval required
3. Feedback addressed constructively
4. Once approved, maintainers merge the PR

### Getting Help

- 💬 **Discord**: Join our [Discord community](https://discord.gg/9Xpy2HGBuD)
- 🐛 **Issues**: [Report bugs](https://github.com/mlc-ai/web-llm-chat/issues)
- 💡 **Discussions**: [Ask questions](https://github.com/mlc-ai/web-llm-chat/discussions)
- 📖 **Docs**: Check `.github/copilot/` for detailed developer guides

## Community and Support

### Join the Community

- 💬 **Discord**: Connect with developers and users - [Join Server](https://discord.gg/9Xpy2HGBuD)
- 🐛 **GitHub Issues**: Report bugs and request features
- 💡 **GitHub Discussions**: Ask questions and share ideas
- 📧 **Mailing List**: Stay updated on releases and news

### Related Projects

- **[WebLLM](https://github.com/mlc-ai/web-llm)** - The LLM inference engine powering this chat
- **[MLC-LLM](https://llm.mlc.ai/)** - Universal LLM deployment solution
- **[NextChat](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)** - UI inspiration

## License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

The Apache 2.0 license is a permissive open-source license that allows you to:
- ✅ Use the software commercially
- ✅ Modify the software
- ✅ Distribute the software
- ✅ Sublicense the software
- ✅ Use patent claims from contributors

With the requirements to:
- 📄 Include the license and copyright notice
- 📄 State significant changes made to the software

### Third-Party Licenses

This project uses various open-source libraries. Complete third-party license information is available in the `licenses/` directory.

## Acknowledgements

WebLLM Chat stands on the shoulders of giants. We extend our sincere gratitude to:

### Core Dependencies
- **[WebLLM Team](https://github.com/mlc-ai/web-llm)** - Browser-native LLM inference engine
- **[NextChat Team](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)** - UI design inspiration

### Open Source Ecosystem
- **Apache TVM Community** - Machine learning compilation framework
- **PyTorch & Hugging Face** - Model accessibility and tooling ecosystem
- **Model Creators** - LLaMA (Meta), Mistral AI, Microsoft (Phi), Google (Gemma), and all open model contributors
- **Web Standards** - WebAssembly, Emscripten, WebGPU working groups
- **Dawn Team** - WebGPU implementation
- **Next.js & React Teams** - Frontend framework and library
- **All Contributors** - Every developer who has contributed to this project

### Special Thanks

- The broader open-source AI community for making powerful models publicly available
- Early adopters and beta testers providing invaluable feedback
- All users who trust us with their private AI conversations

## Documentation

Comprehensive developer documentation is available in `.github/copilot/`:

- **[Architecture.md](.github/copilot/Architecture.md)** - System architecture and design patterns
- **[Technology_Stack.md](.github/copilot/Technology_Stack.md)** - Complete technology stack details
- **[Project_Folder_Structure.md](.github/copilot/Project_Folder_Structure.md)** - Directory organization
- **[Coding_Standards.md](.github/copilot/Coding_Standards.md)** - Development standards and best practices
- **[Workflow_Analysis.md](.github/copilot/Workflow_Analysis.md)** - Git workflow and CI/CD
- **[Unit_Tests.md](.github/copilot/Unit_Tests.md)** - Testing strategy and examples
- **[Code_Exemplars.md](.github/copilot/Code_Exemplars.md)** - Reference code examples
- **[copilot-instructions.md](.github/copilot-instructions.md)** - Quick reference for developers

---

<div align="center">

**Built with ❤️ by the MLC.AI community**

[Website](https://chat.webllm.ai/) · [Documentation](https://github.com/mlc-ai/web-llm-chat) · [Discord](https://discord.gg/9Xpy2HGBuD) · [WebLLM](https://github.com/mlc-ai/web-llm)

**Privacy First · Client-Side AI · Offline Capable**

</div>
