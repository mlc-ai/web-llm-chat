# Technology Stack

## Overview

WebLLM Chat is built with modern web technologies focusing on performance, type safety, and developer experience. The stack is carefully chosen to enable client-side AI inference while maintaining a production-ready application.

## Core Framework & Runtime

### Next.js 13.4.9
- **Purpose**: React framework with App Router
- **Features**:
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - File-based routing
  - API routes
  - Image optimization
  - Built-in CSS/SCSS support
- **Build Modes**: Standalone server or static export
- **Documentation**: https://nextjs.org/

### React 18.2.0
- **Purpose**: UI component library
- **Features**:
  - Concurrent rendering
  - Automatic batching
  - Suspense for data fetching
  - Hooks API
  - Server Components support
- **Why React**: Mature ecosystem, excellent developer tools, component reusability
- **Documentation**: https://react.dev/

### TypeScript 5.4.5
- **Purpose**: Type-safe JavaScript
- **Configuration**:
  - Target: ES2015
  - Strict mode enabled
  - Path aliases: `@/*` points to root
- **Features**:
  - Static type checking
  - IntelliSense support
  - Compile-time error detection
  - Enhanced refactoring capabilities
- **Documentation**: https://www.typescriptlang.org/

### Node.js & Yarn 1.22.19
- **Node.js**: JavaScript runtime for development and build
- **Yarn**: Package manager for dependency management
- **Minimum Version**: Node.js 16+
- **Features**: Fast installs, lockfile for reproducible builds

## AI & Machine Learning

### @mlc-ai/web-llm 0.2.79
- **Purpose**: WebGPU-accelerated LLM inference
- **Features**:
  - Browser-native model execution
  - Multiple model support
  - Streaming responses
  - Vision model capabilities
  - Model caching
- **Integration**: Primary AI engine
- **Repository**: https://github.com/mlc-ai/web-llm
- **Documentation**: https://mlc.ai/web-llm/

### WebGPU API
- **Purpose**: GPU acceleration in browser
- **Type Definitions**: `@webgpu/types 0.1.42`
- **Features**:
  - Compute shaders for AI inference
  - High-performance tensor operations
  - Cross-platform GPU access
- **Browser Support**:
  - Chrome/Edge 113+
  - Firefox Nightly
  - Safari Technology Preview 17.4+
- **Documentation**: https://www.w3.org/TR/webgpu/

## State Management

### Zustand 4.3.8
- **Purpose**: Lightweight state management
- **Features**:
  - Minimal boilerplate
  - No context wrapping needed
  - Built-in persistence middleware
  - DevTools support
  - TypeScript-first API
- **Usage**:
  - Chat state management
  - Configuration persistence
  - Prompt storage
  - Template management
- **Why Zustand**: Simpler than Redux, more flexible than Context API
- **Documentation**: https://zustand-demo.pmnd.rs/

### Middleware: zustymiddlewarets 1.4.2
- **Purpose**: Zustand middleware extensions
- **Features**: Enhanced persistence and synchronization

## Routing

### React Router DOM 6.23.1
- **Purpose**: Client-side routing
- **Features**:
  - Declarative routing
  - Nested routes
  - Route-based code splitting
  - Navigation guards
- **Integration**: Works alongside Next.js routing for SPA mode
- **Documentation**: https://reactrouter.com/

## UI Components & Styling

### SASS 1.59.2
- **Purpose**: CSS preprocessor
- **Features**:
  - Variables and mixins
  - Nesting
  - Modules for scoped styles
  - CSS-in-JS alternative
- **File Pattern**: `*.module.scss` for component styles
- **Documentation**: https://sass-lang.com/

### Lucide React 0.454.0
- **Purpose**: Icon library
- **Features**:
  - 1000+ open-source icons
  - Tree-shakeable
  - Customizable size and color
  - TypeScript support
- **Usage**: UI icons throughout the application
- **Documentation**: https://lucide.dev/

### Emoji Picker React 4.9.2
- **Purpose**: Emoji selection component
- **Features**:
  - Native emoji support
  - Search functionality
  - Categories and favorites
  - Customizable appearance
- **Usage**: Message composition, reactions
- **Documentation**: https://www.npmjs.com/package/emoji-picker-react

### @hello-pangea/dnd 16.5.0
- **Purpose**: Drag-and-drop functionality
- **Features**:
  - Beautiful, accessible DnD
  - Keyboard navigation
  - Touch device support
- **Usage**: Chat reordering, message organization
- **Fork**: Community-maintained fork of react-beautiful-dnd
- **Documentation**: https://github.com/hello-pangea/dnd

## Markdown & Content Rendering

### React Markdown 9.0.1
- **Purpose**: Markdown parser and renderer
- **Features**:
  - Safe by default (XSS protection)
  - Plugin system (remark/rehype)
  - Component overrides
- **Usage**: Display user messages with rich formatting
- **Documentation**: https://github.com/remarkjs/react-markdown

### Remark Plugins

#### remark-gfm 4.0.0
- **Purpose**: GitHub Flavored Markdown support
- **Features**: Tables, strikethrough, task lists, autolinks

#### remark-math 6.0.0
- **Purpose**: Math notation support
- **Features**: Inline and block math expressions

#### remark-breaks 4.0.0
- **Purpose**: Convert line breaks to `<br>` tags
- **Features**: Preserve line breaks in markdown

### Rehype Plugins

#### rehype-katex 7.0.0
- **Purpose**: LaTeX math rendering
- **Features**: Render math expressions with KaTeX
- **Usage**: Display mathematical formulas in chat

#### rehype-highlight 7.0.0
- **Purpose**: Syntax highlighting for code blocks
- **Features**: Automatic language detection, multiple themes
- **Usage**: Syntax-highlighted code in messages

### Mermaid 10.6.1
- **Purpose**: Diagram and chart generation
- **Features**:
  - Flowcharts
  - Sequence diagrams
  - Gantt charts
  - Class diagrams
- **Usage**: Render diagrams in chat messages
- **Documentation**: https://mermaid.js.org/

## Progressive Web App (PWA)

### @serwist/next 9.0.2
- **Purpose**: Service worker management
- **Features**:
  - Next.js integration
  - Workbox-based
  - Precaching strategies
  - Runtime caching
- **Configuration**: `app/worker/service-worker.ts`
- **Documentation**: https://serwist.pages.dev/

### serwist 9.0.2
- **Purpose**: Core service worker library
- **Features**: Modern service worker toolkit

### next-pwa 5.6.0
- **Purpose**: PWA configuration for Next.js
- **Features**:
  - Manifest generation
  - Icon optimization
  - Offline support
- **Documentation**: https://github.com/shadowwalker/next-pwa

## Utilities & Helpers

### nanoid 5.0.3
- **Purpose**: Unique ID generation
- **Features**:
  - Compact IDs (21 characters)
  - URL-safe
  - Cryptographically strong
- **Usage**: Session IDs, message IDs

### spark-md5 3.0.2
- **Purpose**: MD5 hashing
- **Type Definitions**: `@types/spark-md5 3.0.4`
- **Features**: Fast MD5 calculation
- **Usage**: File hashing, cache keys

### use-debounce 10.0.1
- **Purpose**: Debouncing hook for React
- **Features**: Prevent excessive function calls
- **Usage**: Search inputs, auto-save

### fuse.js 7.0.0
- **Purpose**: Fuzzy search library
- **Features**:
  - Fuzzy matching
  - Weighted search
  - Configurable threshold
- **Usage**: Model search, prompt search

### html-to-image 1.11.11
- **Purpose**: Convert HTML to images
- **Features**: PNG, JPEG, SVG export
- **Usage**: Chat export, screenshot feature

### loglevel 1.9.1
- **Purpose**: Logging library
- **Features**:
  - Log levels (trace, debug, info, warn, error)
  - Browser and Node.js support
- **Usage**: Development debugging, error tracking

## HTTP & API

### @fortaine/fetch-event-source 3.0.6
- **Purpose**: Server-Sent Events (SSE) client
- **Features**:
  - Streaming responses
  - Retry logic
  - Custom headers
- **Usage**: Streaming AI responses

### node-fetch 3.3.1
- **Purpose**: Fetch API for Node.js
- **Usage**: Build-time data fetching

## Development Tools

### ESLint 8.57.0
- **Purpose**: JavaScript/TypeScript linting
- **Plugins**:
  - `eslint-config-next 13.4.19`: Next.js rules
  - `eslint-config-prettier 9.1.0`: Prettier compatibility
  - `eslint-plugin-prettier 5.1.3`: Prettier as ESLint rule
- **Configuration**: `.eslintrc.json`
- **Documentation**: https://eslint.org/

### Prettier 3.0.2
- **Purpose**: Code formatting
- **Configuration**: `.prettierrc.js`
- **Settings**:
  - Print width: 80
  - Tab width: 2
  - Semicolons: true
  - Single quotes: false (double quotes)
  - Trailing commas: all
- **Documentation**: https://prettier.io/

### Husky 9.0.11
- **Purpose**: Git hooks management
- **Features**:
  - Pre-commit hooks
  - Automated linting
  - Prevent bad commits
- **Configuration**: `.husky/` directory
- **Documentation**: https://typicode.github.io/husky/

### lint-staged 13.2.2
- **Purpose**: Run linters on staged files
- **Configuration**: `.lintstagedrc.json`
- **Features**:
  - Only lint changed files
  - Fast pre-commit checks
- **Documentation**: https://github.com/okonet/lint-staged

### cross-env 7.0.3
- **Purpose**: Cross-platform environment variables
- **Features**: Windows/Unix compatibility
- **Usage**: Build scripts with env vars

## Build Tools

### Webpack 5.88.1
- **Purpose**: Module bundler
- **Integration**: Customized through Next.js config
- **Features**:
  - Code splitting
  - Tree shaking
  - Asset optimization
  - Custom loaders
- **Documentation**: https://webpack.js.org/

### @svgr/webpack 6.5.1
- **Purpose**: SVG to React component loader
- **Features**:
  - Import SVG as React components
  - Customizable transformations
- **Usage**: Icon imports

### Babel 
- **Configuration**: `.babelrc`
- **Purpose**: JavaScript transpilation
- **Features**: ES6+ to ES5 transformation

## Type Definitions

### @types/node 20.12.11
- **Purpose**: Node.js type definitions

### @types/react 18.3.1
- **Purpose**: React type definitions

### @types/react-dom 18.2.7
- **Purpose**: React DOM type definitions

### @types/react-katex 3.0.4
- **Purpose**: KaTeX React component types

### @types/spark-md5 3.0.4
- **Purpose**: Spark MD5 types

### @webgpu/types 0.1.42
- **Purpose**: WebGPU API type definitions

## Browser APIs Used

### Core Web Platform APIs
- **WebGPU**: GPU acceleration for AI inference
- **Web Workers**: Background processing
- **Service Workers**: Offline functionality and caching
- **IndexedDB** (via WebLLM): Model storage
- **LocalStorage**: Settings persistence
- **Fetch API**: HTTP requests
- **Blob API**: File handling
- **FileReader API**: Image uploads for vision models

### Modern JavaScript Features
- **ES2015+ (ES6)**: Arrow functions, classes, modules
- **Async/Await**: Asynchronous programming
- **Promises**: Async operations
- **Modules**: ESM imports/exports

## Compatibility & Browser Support

### Minimum Browser Versions
- **Chrome/Edge**: 113+ (for WebGPU)
- **Firefox**: Nightly builds with WebGPU flag
- **Safari**: Technology Preview 17.4+

### Polyfills & Fallbacks
- **Next.js Polyfills**: Automatic polyfills for older browsers
- **Core-js**: Not explicitly included, relying on Next.js defaults

### Browser Module Configuration
In `package.json`, the following modules are disabled for browser builds:
```json
"browser": {
  "fs": false,
  "path": false,
  "perf_hooks": false,
  "stream": false,
  "stream-browserify": false,
  "constants": false,
  "module": false,
  "os": false,
  "process": false,
  "util": false,
  "assert": false
}
```

## Version Management

### Package Manager
- **Yarn 1.22.19**: Specified in `packageManager` field
- **Resolutions**: `yaml@^2.2.2` for lint-staged compatibility

### Dependency Management Strategy
- **Exact Versions**: Some critical dependencies pinned
- **Caret Ranges**: Most dependencies use caret ranges (^)
- **Security**: Regular updates through Dependabot

## Future Technology Considerations

### Potential Additions
1. **WebNN API**: Future web standard for neural networks
2. **Web Codecs API**: Enhanced media processing
3. **WebTransport**: Low-latency networking
4. **Origin Private File System**: Better file storage

### Under Evaluation
1. **Rust/WASM**: Performance-critical components
2. **TensorFlow.js**: Alternative ML backend
3. **ONNX Runtime Web**: Cross-platform model support

## Technology Selection Rationale

### Why Next.js?
- Full-featured React framework
- Excellent developer experience
- Multiple deployment options
- Built-in optimizations

### Why Zustand?
- Lightweight (< 1KB)
- Simple API
- No boilerplate
- TypeScript support

### Why WebGPU over WebGL?
- Modern API design
- Better performance
- Compute shader support
- Future-proof

### Why SCSS over CSS-in-JS?
- Better performance (no runtime cost)
- Familiar syntax
- Module scoping
- No JavaScript overhead

### Why TypeScript?
- Type safety prevents bugs
- Better IDE support
- Self-documenting code
- Easier refactoring

## Performance Impact

### Bundle Size Analysis
- **Next.js Core**: ~200KB
- **React Runtime**: ~130KB
- **WebLLM**: ~500KB
- **Other Dependencies**: ~200KB
- **Total (before code splitting)**: ~1.0MB gzipped

### Loading Strategy
1. **Critical CSS**: Inlined for first paint
2. **Code Splitting**: Route-based chunks
3. **Dynamic Imports**: Lazy-load heavy features
4. **Service Worker**: Cache everything after first load

### Runtime Performance
- **Initial Load**: < 3 seconds on 3G
- **Time to Interactive**: < 3 seconds
- **Model Load**: Varies by model (1-30 seconds)
- **Inference**: GPU-dependent (10-100 tokens/sec)
