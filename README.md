<div align="center">

# WebLLM Chat

<a href="https://github.com/mlc-ai/web-llm"><img alt="Related Repository: WebLLM" src="https://img.shields.io/badge/Related_Repo-WebLLM-fafbfc?logo=github"></a>
<a href="https://chat.webllm.ai"><img alt="Web App Deployed on GitHub Pages" src="https://img.shields.io/badge/Web_App-Deployed-32a852?logo=pwa"></a>
<a href="https://discord.gg/9Xpy2HGBuD"><img alt="Join Discord" src="https://img.shields.io/badge/Join-Discord-7289DA?logo=discord&logoColor=white"></a>
<img alt="License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg">
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-13.4.9-black?logo=next.js">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.4.5-blue?logo=typescript">

**Private AI Conversations, Fully In-Browser.**

[**Chat Now**](https://chat.webllm.ai/)

[WebLLM Chat Demo Video](https://github.com/mlc-ai/web-llm-chat/assets/23090573/f700e27e-bb88-4068-bc8b-8a33ea5a4300)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Built-in Models](#built-in-models)
- [Custom Models](#custom-models)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Overview

**WebLLM Chat** is a private AI chat interface that combines [WebLLM](https://github.com/mlc-ai/web-llm) with a user-friendly design, leveraging WebGPU to run large language models (LLMs) natively in your browser. Enjoy an unprecedented, private, and accessible AI conversation experience.

WebLLM Chat is a pioneering initiative that combines the robust backend capabilities of WebLLM with the user-friendly interface inspired by NextChat. As a part of the broader MLC.ai family, this project contributes to our mission of democratizing AI technology by making powerful tools accessible directly to end-users.

## Key Features

- **🌐 Browser-Native AI**: Experience cutting-edge language models running natively within your web browser with WebGPU acceleration, eliminating the need for server-side processing or cloud dependencies.

- **🔒 Guaranteed Privacy**: With the AI model running locally on your hardware and all data processing happening within your browser, your data and conversations never leave your computer, ensuring your privacy.

- **📡 Offline Accessibility**: Run entirely offline after the initial setup and download, allowing you to engage with AI-powered conversations without an active internet connection.

- **🖼️ Vision Model Support**: Chat with AI by uploading and sending images, making it easy to get insights and answers based on visual content.

- **🎨 User-Friendly Interface**: Enjoy the intuitive and feature-rich user interface, complete with markdown support, dark mode, and a responsive design optimized for various screen sizes.

- **🔧 Custom Models**: Connect to any custom language model on your local environment through [MLC-LLM](https://llm.mlc.ai/).

- **📱 Progressive Web App**: Install as a PWA for a native app-like experience with offline capabilities.

- **🌍 Internationalization**: Multi-language support for global accessibility.

- **⚡ Service Worker Support**: Enhanced performance and offline functionality through intelligent caching strategies.

## Technology Stack

### Core Technologies

- **[Next.js](https://nextjs.org/) 13.4.9** - React framework for production-grade applications
- **[React](https://reactjs.org/) 18.2.0** - UI component library
- **[TypeScript](https://www.typescriptlang.org/) 5.4.5** - Type-safe JavaScript
- **[@mlc-ai/web-llm](https://github.com/mlc-ai/web-llm) 0.2.79** - WebGPU-powered LLM inference

### UI & Styling

- **[Sass](https://sass-lang.com/)** - CSS preprocessor for modular styling
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Emoji Picker React](https://github.com/ealush/emoji-picker-react)** - Emoji integration
- **[@hello-pangea/dnd](https://github.com/hello-pangea/dnd)** - Drag and drop functionality

### State Management & Data

- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Fuse.js](https://fusejs.io/)** - Fuzzy search functionality

### Markdown & Content Rendering

- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Mermaid](https://mermaid.js.org/)** - Diagram and flowchart generation
- **[Rehype](https://github.com/rehypejs/rehype) & [Remark](https://github.com/remarkjs/remark)** - Markdown processing with syntax highlighting and math support
- **[KaTeX](https://katex.org/)** - LaTeX math rendering

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[Lint-staged](https://github.com/okonet/lint-staged)** - Run linters on staged files

### Build & Deployment

- **[Serwist](https://serwist.pages.dev/)** - Service Worker tooling
- **[Docker](https://www.docker.com/)** - Containerization
- **[Vercel](https://vercel.com/)** / **GitHub Pages** - Deployment platforms

## Project Architecture

WebLLM Chat follows a modern client-side architecture with the following key components:

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser Environment                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js Application Layer                 │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         React Components (UI Layer)             │  │  │
│  │  │  - Chat Interface  - Settings  - Model Selector │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │      State Management (Zustand Stores)          │  │  │
│  │  │  - Chat Store  - Config Store  - Prompt Store  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │          Client API Layer                        │  │  │
│  │  │  - WebLLM API  - MLC-LLM API (REST)            │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │            Service/Web Worker Layer                    │  │
│  │         WebLLM Engine (Model Inference)                │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 WebGPU Runtime                         │  │
│  │          (Hardware-Accelerated Computation)            │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Patterns

1. **Client-Side Rendering (CSR)**: Primary rendering happens in the browser for dynamic interactions
2. **Static Site Generation (SSG)**: Can be exported as static files for edge deployment
3. **Web Workers**: Offload heavy computation (LLM inference) to background threads
4. **Service Workers**: Cache assets and enable offline functionality
5. **State Management**: Centralized state using Zustand with persistent storage
6. **Component-Based Architecture**: Modular React components with SCSS modules for styling

### Data Flow

1. User interacts with UI components
2. Actions dispatched to Zustand stores
3. Stores trigger API calls to WebLLM or MLC-LLM clients
4. Client APIs communicate with Worker engines
5. LLM inference runs on WebGPU
6. Results stream back through the layers to update UI

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **Yarn** 1.22.19 (or npm)
- **Modern Browser** with WebGPU support:
  - Chrome/Edge 113+
  - Safari Technology Preview
  - Firefox Nightly (with WebGPU enabled)

### Installation

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/mlc-ai/web-llm-chat.git
cd web-llm-chat
\`\`\`

2. **Install dependencies**

\`\`\`bash
yarn install
# or
npm install
\`\`\`

3. **Configure environment variables (optional)**

Create a \`.env.local\` file in the root directory:

\`\`\`bash
# Add any custom environment variables here
# NEXT_PUBLIC_API_URL=https://your-api-url.com
\`\`\`

4. **Start the development server**

\`\`\`bash
yarn dev
# or
npm run dev
\`\`\`

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Verify WebGPU Support

To check if your browser supports WebGPU, visit [webgpureport.org](https://webgpureport.org/)

## Project Structure

\`\`\`
web-llm-chat/
├── app/                          # Application code (Next.js App Router)
│   ├── client/                   # Client-side API implementations
│   │   ├── api.ts               # Base API interface
│   │   ├── webllm.ts            # WebLLM client implementation
│   │   └── mlcllm.ts            # MLC-LLM REST API client
│   ├── components/              # React UI components
│   │   ├── home.tsx             # Main application container
│   │   ├── chat.tsx             # Chat interface component
│   │   ├── chat-list.tsx        # Chat history list
│   │   ├── sidebar.tsx          # Navigation sidebar
│   │   ├── settings.tsx         # Settings panel
│   │   ├── model-select.tsx     # Model selection interface
│   │   ├── markdown.tsx         # Markdown renderer
│   │   └── ...                  # Other UI components
│   ├── store/                   # Zustand state stores
│   │   ├── chat.ts              # Chat state management
│   │   ├── config.ts            # App configuration
│   │   ├── prompt.ts            # Prompt templates
│   │   └── ...
│   ├── worker/                  # Web Worker implementations
│   ├── locales/                 # Internationalization files
│   ├── icons/                   # SVG icon components
│   ├── styles/                  # Global styles
│   ├── utils/                   # Utility functions
│   ├── config/                  # Configuration files
│   ├── templates/               # Prompt templates
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   └── ...                      # Other app files
├── public/                      # Static assets
│   ├── fonts/                   # Custom fonts
│   ├── prompts.json             # Prompt library
│   └── ...
├── scripts/                     # Build and utility scripts
│   ├── fetch-prompts.mjs        # Fetch prompt templates
│   └── ...
├── .github/                     # GitHub configuration
│   ├── workflows/               # CI/CD workflows
│   └── ISSUE_TEMPLATE/          # Issue templates
├── docs/                        # Documentation
├── Dockerfile                   # Docker configuration
├── next.config.mjs              # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
\`\`\`

### Key Directories Explained

- **\`app/client/\`**: Abstractions for different LLM backends (WebLLM, MLC-LLM REST API)
- **\`app/components/\`**: Reusable React components with co-located SCSS modules
- **\`app/store/\`**: Global state management using Zustand
- **\`app/worker/\`**: Web Worker implementations for background processing
- **\`app/locales/\`**: Language files for internationalization (i18n)

## Built-in Models

WebLLM Chat natively supports all WebLLM built-in models, including:

- **Llama Series**: Llama-2, Llama-3, Code Llama
- **Mistral Series**: Mistral-7B, Mixtral
- **Phi Series**: Phi-2, Phi-3
- **Gemma Series**: Gemma-2B, Gemma-7B
- **Qwen Series**: Qwen-1.5, Qwen-2
- **Vision Models**: LLaVA, Phi-3-Vision

For the complete and up-to-date list, visit the [WebLLM Built-in Models](https://github.com/mlc-ai/web-llm?tab=readme-ov-file#built-in-models) documentation.

## Custom Models

WebLLM Chat supports custom language models through [MLC-LLM](https://llm.mlc.ai/).

### Using Custom Models

1. **(Optional) Compile the model into MLC format**

   Follow the [MLC-LLM model compilation guide](https://llm.mlc.ai/docs/compilation/convert_weights.html)

2. **Host REST API through MLC-LLM**

   Follow the [MLC-LLM REST API deployment guide](https://llm.mlc.ai/docs/deploy/rest.html)

3. **Configure in WebLLM Chat**

   - Go to [WebLLM Chat](https://chat.webllm.ai/)
   - Select **Settings** in the sidebar
   - Choose **"MLC-LLM REST API (Advanced)"** as **Model Type**
   - Enter the REST API endpoint URL from step 2

## Development Workflow

### Available Scripts

\`\`\`bash
# Development
yarn dev              # Start development server
yarn dev:export       # Start dev server in export mode

# Building
yarn build            # Build for production (standalone)
yarn export           # Build as static site

# Code Quality
yarn lint             # Run ESLint
yarn prepare          # Setup Husky git hooks

# Utilities
yarn prompts          # Fetch latest prompt templates
yarn proxy-dev        # Start dev server with proxychains
\`\`\`

### Branch Strategy

- **\`main\`** - Production-ready code, deployed to GitHub Pages
- **Feature branches** - Create from \`main\`, merge via Pull Requests

### CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

1. **GitHub Pages Deployment** (\`gh_deploy.yml\`)
   - Triggers on push to \`main\`
   - Builds static export
   - Deploys to GitHub Pages

2. **Vercel Deployment** (\`vercel_deploy.yaml\`)
   - Automatic deployment for preview and production
   - Handles environment-specific builds

3. **Deploy Preview** (\`deploy_preview.yml\`)
   - Creates preview deployments for pull requests
   - Automated cleanup after PR merge/close

4. **Issue Translator** (\`issue-translator.yml\`)
   - Automatically translates issues for international collaboration

### Git Hooks

Pre-commit hooks (via Husky) automatically:
- Run ESLint on staged files
- Format code with Prettier
- Ensure code quality before commits

## Coding Standards

### TypeScript Configuration

- **Target**: ES2015
- **Strict mode** enabled for type safety
- **No implicit any** to ensure explicit typing
- Module resolution via Node.js

### Linting Rules

**ESLint Configuration:**
- Extends \`next/core-web-vitals\` for Next.js best practices
- Prettier integration for consistent formatting

**Key Conventions:**
- Use functional components with hooks
- Prefer named exports for components
- Use TypeScript interfaces for component props
- Follow Next.js file-based routing conventions

### Code Formatting

**Prettier Configuration:**
\`\`\`javascript
{
  printWidth: 80,          // Line wrap at 80 characters
  tabWidth: 2,             // 2 spaces for indentation
  useTabs: false,          // Use spaces, not tabs
  semi: true,              // Always use semicolons
  singleQuote: false,      // Use double quotes
  trailingComma: 'all',    // Trailing commas where valid
  bracketSpacing: true,    // Spaces in object literals
  arrowParens: 'always',   // Always parentheses around arrow function params
}
\`\`\`

### Component Structure

\`\`\`typescript
// imports
import React from "react";
import styles from "./component.module.scss";

// types
interface ComponentProps {
  title: string;
  children?: React.ReactNode;
}

// component
export function Component({ title, children }: ComponentProps) {
  // hooks
  // state
  // effects
  // handlers
  // render
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
\`\`\`

### File Naming Conventions

- **Components**: \`kebab-case.tsx\` (e.g., \`chat-list.tsx\`)
- **Styles**: \`component-name.module.scss\`
- **Utilities**: \`camelCase.ts\` (e.g., \`utils.ts\`)
- **Types**: Define in component file or \`typing.ts\`

## Deployment

### Static Export (Recommended for GitHub Pages)

\`\`\`bash
yarn export
\`\`\`

Output: \`.next/\` directory with static files

### Next.js Standalone Build

\`\`\`bash
yarn build
yarn start
\`\`\`

### Docker Deployment

**Basic Docker deployment:**

\`\`\`bash
docker build -t webllm_chat .
docker run -d -p 3000:3000 webllm_chat
\`\`\`

**With proxy support:**

\`\`\`bash
docker run -d -p 3000:3000 \
   -e PROXY_URL=http://localhost:7890 \
   webllm_chat
\`\`\`

**With authenticated proxy:**

\`\`\`bash
docker run -d -p 3000:3000 \
   -e PROXY_URL="http://127.0.0.1:7890 user pass" \
   webllm_chat
\`\`\`

### Platform-Specific Deployment

- **Vercel**: Connect GitHub repo, automatic deployments
- **GitHub Pages**: Automatic via GitHub Actions on push to \`main\`
- **Self-hosted**: Use Docker or standalone build

For detailed deployment guides, see the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying).

## Contributing

WebLLM Chat thrives on community involvement! We welcome contributions of all kinds.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (\`git checkout -b feature/amazing-feature\`)
3. **Make your changes**
4. **Commit your changes** (\`git commit -m 'Add amazing feature'\`)
5. **Push to the branch** (\`git push origin feature/amazing-feature\`)
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the [coding standards](#coding-standards)
- Write clear commit messages
- Add tests for new features (when applicable)
- Update documentation for significant changes
- Ensure all CI checks pass

### Join the Community

- **Discord**: [Join our Discord server](https://discord.gg/9Xpy2HGBuD)
- **GitHub Discussions**: Share ideas and ask questions
- **Issue Tracker**: Report bugs or request features

We are committed to fostering an inclusive and innovative community where developers and AI enthusiasts can collaborate and push the boundaries of what's possible with browser-based AI.

## Acknowledgements

WebLLM Chat is built on the shoulders of giants. We extend our sincere gratitude to:

- **[WebLLM](https://github.com/mlc-ai/web-llm/)** - For the powerful browser-based LLM inference engine
- **[NextChat (ChatGPT-Next-Web)](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)** - For the excellent UI/UX foundation and chat interface design
- **[Apache TVM](https://tvm.apache.org/)** - For the machine learning compilation framework
- **[MLC AI Community](https://mlc.ai/)** - For advancing accessible AI technology
- **Open-Source ML Community** - Including PyTorch, Hugging Face, and model creators (Llama, Mistral, Phi, Gemma, Qwen, etc.)
- **Web Standards Organizations** - For WebGPU, WebAssembly, and related technologies
- **Browser Engine Teams** - Chrome, Safari, Firefox for WebGPU implementation

This project is only possible thanks to the collaborative open-source ecosystem.

## License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

### Additional Licenses

- NextChat components: [LICENSE.ChatGPT-Next-Web.txt](licenses/LICENSE.ChatGPT-Next-Web.txt)

---

<div align="center">

**Built with ❤️ by the MLC AI Community**

[Website](https://mlc.ai) • [Discord](https://discord.gg/9Xpy2HGBuD) • [GitHub](https://github.com/mlc-ai)

</div>
