# Project Folder Structure

## Overview

WebLLM Chat follows a modular Next.js App Router structure with clear separation of concerns. The project is organized for scalability, maintainability, and developer experience.

## Root Directory Structure

```
web-llm-chat/
├── .github/              # GitHub-specific configuration
├── .husky/               # Git hooks configuration
├── app/                  # Main application source (Next.js App Router)
├── docs/                 # Additional documentation
├── licenses/             # Third-party licenses
├── prompts/              # Agent prompt templates
├── public/               # Static assets served at root
├── scripts/              # Build and utility scripts
├── .babelrc              # Babel configuration
├── .dockerignore         # Docker ignore patterns
├── .eslintignore         # ESLint ignore patterns
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore patterns
├── .gitpod.yml           # Gitpod configuration
├── .lintstagedrc.json    # Lint-staged configuration
├── .prettierrc.js        # Prettier configuration
├── Dockerfile            # Docker container definition
├── LICENSE               # Apache 2.0 license
├── README.md             # Project documentation
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment configuration
└── yarn.lock             # Yarn dependency lock file
```

## Core Directories

### `.github/` - GitHub Configuration

```
.github/
├── ISSUE_TEMPLATE/        # Issue templates
│   ├── bug_report.yml     # Bug report template
│   └── feature_request.yml # Feature request template
├── workflows/             # GitHub Actions CI/CD
│   ├── deploy_preview.yml       # Preview deployments
│   ├── gh_deploy.yml            # GitHub Pages deployment
│   ├── issue-translator.yml     # Auto-translate issues
│   ├── remove_deploy_preview.yml # Cleanup previews
│   └── vercel_deploy.yaml       # Vercel deployments
├── copilot/               # Copilot documentation (this directory)
│   ├── Architecture.md
│   ├── Code_Exemplars.md
│   ├── Coding_Standards.md
│   ├── Project_Folder_Structure.md
│   ├── Technology_Stack.md
│   ├── Unit_Tests.md
│   └── Workflow_Analysis.md
├── copilot-instructions.md # Copilot instructions
└── dependabot.yml         # Dependency updates configuration
```

**Purpose**: GitHub-specific configurations for issues, pull requests, CI/CD, and automated workflows.

### `app/` - Main Application Code

```
app/
├── client/                # API client and integration
├── components/            # React UI components
├── config/                # Application configuration
├── icons/                 # SVG icon components
├── locales/               # Internationalization files
├── store/                 # Zustand state management
├── styles/                # Global and component styles
├── templates/             # Message and chat templates
├── utils/                 # Utility functions and helpers
├── worker/                # Service worker (PWA)
├── command.ts             # Command handling
├── constant.ts            # Application constants
├── context.ts             # React context providers
├── global.d.ts            # Global TypeScript definitions
├── layout.tsx             # Root layout component
├── page.tsx               # Main page component
├── polyfill.ts            # Browser polyfills
├── typing.ts              # TypeScript type definitions
└── utils.ts               # General utilities
```

**Purpose**: All application source code following Next.js App Router conventions.

#### `app/client/` - API Client Layer

```
app/client/
├── api/                   # API integration
├── models/                # Model adapters
└── services/              # Service layer
```

**Purpose**: API clients, WebLLM integration, and external service interfaces.

#### `app/components/` - React Components

```
app/components/
├── button.tsx             # Button component
├── button.module.scss     # Button styles
├── chat-list.tsx          # Chat session list
├── chat.tsx               # Main chat interface
├── chat.module.scss       # Chat styles
├── emoji.tsx              # Emoji picker integration
├── error.tsx              # Error boundary component
├── exporter.tsx           # Chat export functionality
├── exporter.module.scss   # Exporter styles
├── home.tsx               # Home/landing component
├── home.module.scss       # Home styles
├── input-range.tsx        # Range input component
├── input-range.module.scss # Range input styles
├── markdown.tsx           # Markdown renderer
├── message-selector.tsx   # Message selection component
├── message-selector.module.scss # Message selector styles
├── model-config.tsx       # Model configuration panel
├── model-row.tsx          # Individual model row
├── model-row.module.scss  # Model row styles
├── model-select.tsx       # Model selection component
├── model-select.module.scss # Model select styles
├── settings.tsx           # Settings panel
├── settings.module.scss   # Settings styles
├── sidebar.tsx            # Navigation sidebar
├── template.tsx           # Template component
├── template.module.scss   # Template styles
├── ui-lib.tsx             # UI library components
└── ui-lib.module.scss     # UI library styles
```

**Purpose**: Reusable React components with co-located SCSS modules for styling.

**Naming Convention**: 
- Component: `component-name.tsx`
- Styles: `component-name.module.scss`

#### `app/config/` - Configuration

```
app/config/
├── api.config.ts          # API endpoints and configuration
├── app.config.ts          # Application settings
└── model.config.ts        # Model configurations
```

**Purpose**: Centralized configuration files for different aspects of the application.

#### `app/icons/` - SVG Icons

```
app/icons/
├── icon-name.svg          # SVG icon files
└── index.ts               # Icon exports
```

**Purpose**: SVG icon assets imported as React components via @svgr/webpack.

#### `app/locales/` - Internationalization

```
app/locales/
├── ar.ts                  # Arabic translations
├── bn.ts                  # Bengali translations
├── cn.ts                  # Chinese (Simplified) translations
├── cs.ts                  # Czech translations
├── de.ts                  # German translations
├── en.ts                  # English translations (default)
├── es.ts                  # Spanish translations
├── fr.ts                  # French translations
├── id.ts                  # Indonesian translations
├── it.ts                  # Italian translations
├── ja.ts                  # Japanese translations
├── ko.ts                  # Korean translations
├── no.ts                  # Norwegian translations
├── pt.ts                  # Portuguese translations
├── ru.ts                  # Russian translations
├── sk.ts                  # Slovak translations
├── tr.ts                  # Turkish translations
├── tw.ts                  # Chinese (Traditional) translations
├── vi.ts                  # Vietnamese translations
└── index.ts               # Locale exports and utilities
```

**Purpose**: Multi-language support with translation files for each supported language.

#### `app/store/` - State Management

```
app/store/
├── chat.ts                # Chat state (messages, sessions)
├── config.ts              # Configuration state (settings, theme)
├── prompt.ts              # Prompt management state
├── template.ts            # Template management state
└── index.ts               # Store exports and initialization
```

**Purpose**: Zustand stores for managing application state with persistence.

**Store Pattern**:
- Each store focuses on a specific domain
- Actions are defined within the store
- Selectors available for optimized access
- Middleware for persistence and logging

#### `app/styles/` - Global Styles

```
app/styles/
├── globals.scss           # Global styles and resets
├── variables.scss         # SCSS variables
├── mixins.scss            # SCSS mixins
├── themes/                # Theme definitions
│   ├── dark.scss          # Dark theme
│   └── light.scss         # Light theme
├── animations.scss        # Animation definitions
└── fonts.scss             # Font imports and definitions
```

**Purpose**: Global stylesheets, variables, themes, and reusable SCSS mixins.

#### `app/templates/` - Templates

```
app/templates/
├── chat/                  # Chat templates
├── message/               # Message templates
└── prompts/               # Prompt templates
```

**Purpose**: Pre-defined templates for chats, messages, and prompts.

#### `app/utils/` - Utilities

```
app/utils/
├── api.ts                 # API utilities
├── format.ts              # Formatting functions
├── storage.ts             # LocalStorage utilities
├── validator.ts           # Validation functions
├── markdown.ts            # Markdown utilities
├── clipboard.ts           # Clipboard operations
└── index.ts               # Utility exports
```

**Purpose**: Reusable utility functions and helper methods.

#### `app/worker/` - Service Worker

```
app/worker/
└── service-worker.ts      # PWA service worker
```

**Purpose**: Service worker for Progressive Web App functionality (offline support, caching).

### `docs/` - Documentation

```
docs/
├── architecture.md        # Architecture documentation
├── api.md                 # API documentation
├── deployment.md          # Deployment guides
└── development.md         # Development setup
```

**Purpose**: Additional project documentation beyond the main README.

### `licenses/` - Third-Party Licenses

```
licenses/
└── [various license files] # Third-party dependency licenses
```

**Purpose**: Legal compliance - contains licenses of all third-party dependencies.

### `prompts/` - Agent Prompts

```
prompts/
├── readme-blueprint-generator.prompt.md # README generation prompt
└── [other prompts]        # Additional AI agent prompts
```

**Purpose**: Prompt templates for AI agents and automation.

### `public/` - Static Assets

```
public/
├── favicon.ico            # Browser favicon
├── favicon-16x16.png      # Favicon 16x16
├── favicon-32x32.png      # Favicon 32x32
├── apple-touch-icon.png   # iOS home screen icon
├── android-chrome-192x192.png # Android icon
├── android-chrome-512x512.png # Android icon (large)
├── site.webmanifest       # PWA manifest
├── sw.js                  # Generated service worker
├── robots.txt             # Search engine directives
├── logo.svg               # Application logo
└── [other assets]         # Images, fonts, etc.
```

**Purpose**: Static files served directly from the root URL path.

### `scripts/` - Build Scripts

```
scripts/
├── fetch-prompts.mjs      # Fetch prompt templates
├── init-proxy.sh          # Initialize proxy configuration
└── proxychains.conf       # Proxy configuration file
```

**Purpose**: Build-time scripts and utilities for development and deployment.

### `.husky/` - Git Hooks

```
.husky/
├── pre-commit             # Pre-commit hook (lint-staged)
└── pre-push               # Pre-push hook (tests)
```

**Purpose**: Git hooks for enforcing code quality before commits.

## Configuration Files

### Build & Runtime Configuration

- **`next.config.mjs`**: Next.js configuration (webpack, CSP, build mode)
- **`tsconfig.json`**: TypeScript compiler options and paths
- **`.babelrc`**: Babel transpilation configuration
- **`vercel.json`**: Vercel deployment settings

### Code Quality

- **`.eslintrc.json`**: ESLint linting rules
- **`.eslintignore`**: Files to ignore for linting
- **`.prettierrc.js`**: Prettier formatting rules
- **`.lintstagedrc.json`**: Lint-staged configuration

### Package Management

- **`package.json`**: Dependencies, scripts, and project metadata
- **`yarn.lock`**: Locked dependency versions

### Version Control

- **`.gitignore`**: Files to ignore in Git
- **`.gitpod.yml`**: Gitpod cloud IDE configuration

### Containerization

- **`Dockerfile`**: Docker image definition
- **`.dockerignore`**: Files to ignore in Docker builds

## File Naming Conventions

### Components
- **React Components**: `ComponentName.tsx` or `component-name.tsx`
- **Styles**: `component-name.module.scss`
- **Tests**: `component-name.test.tsx`

### Stores
- **Store Files**: `domain.ts` (e.g., `chat.ts`, `config.ts`)
- **Lower case**: All store files use lowercase names

### Utilities
- **Utility Files**: `utility-name.ts` (e.g., `format.ts`, `validator.ts`)
- **Index**: `index.ts` for exports

### Types
- **Type Definitions**: `types.ts` or `typing.ts`
- **Co-located Types**: Define types in the same file when possible

## Import Path Aliases

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

**Usage**:
```typescript
// Instead of: import { Component } from '../../../components/Component'
import { Component } from '@/app/components/Component'
```

## Directory Organization Principles

### 1. Feature-Based Organization
- Components grouped by feature or domain
- Related files co-located (component + styles + tests)

### 2. Separation of Concerns
- **Presentation**: `app/components/`
- **Business Logic**: `app/client/`, `app/utils/`
- **State**: `app/store/`
- **Configuration**: `app/config/`

### 3. Scalability
- Easy to add new features without restructuring
- Clear boundaries between modules
- Predictable file locations

### 4. Next.js Conventions
- Follows App Router conventions
- `page.tsx` for route pages
- `layout.tsx` for layouts
- Special files: `error.tsx`, `loading.tsx`

## Adding New Code

### New Component
1. Create `app/components/new-component.tsx`
2. Create `app/components/new-component.module.scss`
3. Export from component file
4. Import where needed

### New Store
1. Create `app/store/new-domain.ts`
2. Define state interface
3. Create store with actions
4. Export from `app/store/index.ts`

### New Utility
1. Create `app/utils/new-utility.ts`
2. Export functions
3. Add to `app/utils/index.ts` if needed

### New Page
1. Create `app/[route-name]/page.tsx`
2. Define route component
3. Next.js automatically routes

## Build Output

### Development
```
.next/                     # Next.js development build
├── cache/                 # Build cache
├── server/                # Server components
└── static/                # Static assets
```

### Production (Standalone)
```
.next/
└── standalone/            # Self-contained server build
```

### Production (Static Export)
```
out/                       # Static HTML/CSS/JS files
├── index.html
├── _next/
└── [other routes]
```

## Environment-Specific Files

```
.env                       # Default environment variables
.env.local                 # Local overrides (git-ignored)
.env.development           # Development-specific
.env.production            # Production-specific
```

## Size Considerations

### Key Directories by Size
1. **`node_modules/`**: ~500MB (git-ignored)
2. **`.next/`**: ~200MB (git-ignored, build artifacts)
3. **`app/`**: ~5MB (source code)
4. **`public/`**: ~2MB (static assets)

### Repository Size
- **Source Code**: ~10MB
- **With Dependencies**: ~500MB
- **Production Build**: ~50MB

## Future Structure Considerations

### Potential Additions
1. **`app/api/`**: API routes if needed
2. **`app/middleware.ts`**: Next.js middleware
3. **`tests/`**: Separate test directory
4. **`e2e/`**: End-to-end tests
5. **`lib/`**: Shared libraries

### Scalability Notes
- Structure supports adding new features
- Can split large directories by subdomain
- Clear boundaries for team collaboration
- Easy to migrate to monorepo if needed
