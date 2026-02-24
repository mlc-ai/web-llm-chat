# WebLLM Chat Architecture

## Overview

WebLLM Chat follows a modular, client-side architecture designed for privacy, performance, and offline functionality. All AI processing happens locally in the browser using WebGPU acceleration.

## High-Level Architecture

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

## Architectural Layers

### 1. Presentation Layer (React Components)

**Location**: `app/components/`

The UI layer consists of modular React components:

- **Chat Interface** (`chat.tsx`): Main conversation interface
- **Sidebar** (`sidebar.tsx`): Navigation and session management
- **Settings** (`settings.tsx`): Configuration panel
- **Model Selection** (`model-select.tsx`, `model-row.tsx`): Model picker
- **UI Library** (`ui-lib.tsx`): Reusable UI components
- **Markdown Renderer** (`markdown.tsx`): Rich text display with syntax highlighting

**Key Characteristics**:
- Functional components with React hooks
- TypeScript for type safety
- SCSS modules for scoped styling
- Responsive design for all screen sizes

### 2. State Management Layer (Zustand)

**Location**: `app/store/`

Zustand stores manage application state:

- **Chat Store** (`chat.ts`): 
  - Conversation sessions
  - Message history
  - Current chat context
  - Message streaming state

- **Config Store** (`config.ts`):
  - User preferences
  - Model configuration
  - Theme settings
  - Language selection

- **Prompt Store** (`prompt.ts`):
  - System prompts
  - User-defined prompts
  - Prompt templates

- **Template Store** (`template.ts`):
  - Message templates
  - Chat templates
  - Quick actions

**Benefits**:
- Centralized state management
- No prop drilling
- Easy state persistence
- Predictable state updates

### 3. Application Logic Layer

**Location**: `app/client/`, `app/utils/`

Business logic and utilities:

- **Client API** (`app/client/`): WebLLM integration and API handling
- **Utilities** (`app/utils/`): Helper functions, formatters, validators
- **Context** (`context.ts`): React context providers
- **Constants** (`constant.ts`): Application constants

### 4. AI Inference Layer (WebLLM)

**Library**: `@mlc-ai/web-llm`

The WebLLM library provides:

- **Model Loading**: Download and cache LLM weights
- **Inference Engine**: Run model predictions locally
- **WebGPU Acceleration**: GPU-accelerated computation
- **Streaming**: Real-time response generation
- **Context Management**: Handle conversation context

**Key Features**:
- Zero-copy tensor operations
- Efficient memory management
- Multi-model support
- Vision model capabilities

### 5. Service Worker Layer (PWA)

**Location**: `app/worker/`

Service worker enables:

- **Offline Functionality**: Cache app shell and assets
- **Model Caching**: Store downloaded models
- **Background Sync**: Update models in background
- **Push Notifications**: (future capability)

**Implementation**: Using Serwist for Next.js PWA support

### 6. Build & Configuration Layer

**Files**: `next.config.mjs`, `tsconfig.json`, `package.json`

Build configuration:

- **Next.js Config**: Webpack customization, CSP headers, image optimization
- **TypeScript Config**: Strict mode, path aliases, WebGPU types
- **Babel Config**: JavaScript transpilation
- **ESLint/Prettier**: Code quality and formatting

## Data Flow

### Message Processing Flow

```
User Input → Chat Component → Chat Store → WebLLM Client
                                              ↓
                                         GPU Inference
                                              ↓
                                    Streaming Response
                                              ↓
Chat Store ← Message Update ← Response Handler
    ↓
Chat Component (Re-render with new message)
```

### Model Loading Flow

```
User Selects Model → Config Store → WebLLM Client
                                          ↓
                                    Check Cache
                                          ↓
                               ┌──────────┴──────────┐
                               ↓                     ↓
                          Cache Hit            Cache Miss
                               ↓                     ↓
                          Load Model          Download Model
                               ↓                     ↓
                               └──────────┬──────────┘
                                          ↓
                                    Initialize Model
                                          ↓
                                      Ready State
```

### State Persistence Flow

```
User Action → Store Update → Middleware → Local Storage
                                              ↓
                                    Persist State
                                              
On App Load: Local Storage → Hydrate Store → UI Update
```

## Key Architectural Principles

### 1. Privacy by Design

- **No Server Communication**: All processing happens client-side
- **No Telemetry**: Zero data collection
- **Local Storage Only**: Data never leaves the device
- **No Third-Party Scripts**: Self-contained application

### 2. Progressive Enhancement

- **Core Functionality First**: Basic chat works everywhere
- **WebGPU Enhancement**: GPU acceleration when available
- **Offline Support**: Works without internet after setup
- **Graceful Degradation**: Fallbacks for unsupported features

### 3. Modular Design

- **Component Independence**: Components are self-contained
- **Store Separation**: Logical state boundaries
- **Utility Functions**: Reusable helper functions
- **Type Safety**: TypeScript across the entire codebase

### 4. Performance Optimization

- **Code Splitting**: Dynamic imports for large modules
- **Lazy Loading**: Load components on demand
- **Memoization**: Prevent unnecessary re-renders
- **Service Worker**: Cache assets for fast loading

### 5. Developer Experience

- **Hot Module Replacement**: Fast development iteration
- **Type Safety**: Catch errors at compile time
- **Consistent Formatting**: Prettier and ESLint
- **Clear Structure**: Intuitive file organization

## Technology Stack Integration

### Next.js App Router

- Server Components for static content
- Client Components for interactive UI
- File-based routing
- Optimized builds (standalone or static export)

### React 18

- Concurrent rendering
- Automatic batching
- Suspense boundaries
- Hook-based state management

### WebGPU API

- Direct GPU access
- Compute shaders for AI inference
- High-performance tensor operations
- Cross-platform support

### Zustand State Management

- Minimal boilerplate
- No context wrapping
- Built-in persistence
- DevTools integration

## Security Considerations

### Content Security Policy (CSP)

Implemented in `next.config.mjs`:

```javascript
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline';
worker-src 'self';
connect-src 'self' blob: data: https: http:;
style-src 'self' 'unsafe-inline';
img-src 'self' blob: data: https:;
```

### Security Features

- **No External Scripts**: All code is bundled
- **CORS Configuration**: Controlled API access
- **Input Sanitization**: XSS protection
- **CSP Headers**: Prevent injection attacks

## Scalability & Extensibility

### Adding New Models

1. Define model configuration in WebLLM format
2. Add to model selection UI
3. WebLLM handles loading and inference

### Custom Components

1. Create component in `app/components/`
2. Define styles in `.module.scss`
3. Export and use in other components

### New State Features

1. Extend existing store or create new store
2. Define actions and selectors
3. Connect to components via hooks

### Plugin Architecture (Future)

Potential for plugin system:
- Custom prompts
- Model adapters
- UI themes
- Export formats

## Deployment Modes

### 1. Static Export

- Pre-rendered HTML pages
- Client-side hydration
- CDN-friendly
- Best for GitHub Pages, Netlify

### 2. Standalone Server

- Next.js server for SSR
- Dynamic rendering
- API routes (if needed)
- Best for VPS, Docker

### 3. Docker Container

- Self-contained deployment
- Environment variables
- Proxy support
- Best for enterprise deployments

## Performance Metrics

### Target Metrics

- **Time to Interactive**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Model Load Time**: Varies by model size (1-30 seconds)
- **Inference Speed**: Depends on GPU (10-100 tokens/sec)
- **Bundle Size**: < 2MB (excluding models)

### Optimization Strategies

1. **Code Splitting**: Separate chunks for routes
2. **Tree Shaking**: Remove unused code
3. **Asset Optimization**: Compress images and fonts
4. **Caching**: Aggressive service worker caching
5. **WebGPU**: Hardware acceleration for AI

## Future Architecture Considerations

### Potential Enhancements

1. **WebRTC**: Peer-to-peer model sharing
2. **Web Workers**: Background processing
3. **IndexedDB**: More efficient model storage
4. **Streaming SSE**: Real-time updates
5. **Plugin System**: Community extensions

### Research Areas

- Model quantization for smaller downloads
- Multi-model ensembles
- Federated learning for privacy-preserving improvements
- WebNN API adoption (when available)
