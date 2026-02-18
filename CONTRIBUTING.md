# Contributing to WebLLM Chat

Thank you for your interest in contributing to WebLLM Chat! This guide will help you understand the project structure and how to make contributions.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Files to Know](#key-files-to-know)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Your Changes](#testing-your-changes)
- [Getting Help](#getting-help)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A browser with WebGPU support (Chrome/Edge 113+)
- Git for version control
- Code editor (VS Code recommended)

### Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/web-llm-chat.git
   cd web-llm-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Check that the app loads correctly

## Project Structure

Understanding the project structure will help you know where to make changes:

```
web-llm-chat/
├── app/                          # Main application code
│   ├── components/              # React UI components
│   │   ├── chat.tsx            # Main chat interface
│   │   ├── home.tsx            # Home page layout
│   │   ├── settings.tsx        # Settings panel
│   │   └── model-select.tsx    # Model selection UI
│   ├── client/                  # Client-side API integrations
│   │   ├── webllm.ts           # WebLLM API wrapper
│   │   └── api.ts              # API client utilities
│   ├── store/                   # State management (Zustand)
│   │   ├── chat.ts             # Chat state
│   │   ├── config.ts           # Configuration state
│   │   └── prompt.ts           # Prompt templates
│   ├── locales/                 # Internationalization
│   ├── styles/                  # Global styles (SCSS)
│   └── utils/                   # Utility functions
├── public/                       # Static assets
├── docs/                        # Documentation
└── scripts/                     # Build and utility scripts
```

## Key Files to Know

Depending on what you're working on, here are the most important files:

### For UI Changes
- **`app/components/chat.tsx`** - Main chat interface and message display
- **`app/components/home.tsx`** - Main layout and sidebar
- **`app/components/settings.tsx`** - Settings and configuration UI
- **`app/components/model-select.tsx`** - Model selection component
- **`app/styles/*.scss`** - Styling for components

### For Model/AI Integration
- **`app/client/webllm.ts`** - Core WebLLM integration
- **`app/constant.ts`** - Model configurations and constants
- **`app/store/chat.ts`** - Chat logic and model interactions

### For State Management
- **`app/store/chat.ts`** - Chat messages and conversation state
- **`app/store/config.ts`** - Application settings
- **`app/store/prompt.ts`** - Prompt templates and management

### For Internationalization
- **`app/locales/*.ts`** - Language translations
- **`app/locales/index.ts`** - Language registry

### For Configuration
- **`package.json`** - Dependencies and scripts
- **`next.config.mjs`** - Next.js configuration
- **`tsconfig.json`** - TypeScript configuration

## Development Workflow

### Making Changes

1. **Create a new branch** for your work
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** in the relevant files
   - Follow the coding standards below
   - Keep changes focused and atomic
   - Test as you develop

3. **Commit your changes** using clear commit messages
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```
   
   Use conventional commit prefixes:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Formatting, missing semicolons, etc.
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

4. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Submit your contribution** - Follow the project's PR and issue guidelines for the submission process

## Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use type imports: `import type { SomeType } from './types'`

### React/Next.js

- **Use functional components** with hooks
- Follow React best practices
- Use proper dependency arrays in useEffect
- Memoize expensive computations with useMemo/useCallback

### Code Style

- **Follow ESLint rules** - Run `npm run lint` to check
- **Use Prettier formatting** - Code is auto-formatted
- **Use descriptive variable names** - Be clear, not clever
- **Add comments** for complex logic

### File Naming

- **Components**: PascalCase (e.g., `ChatMessage.tsx`)
- **Utils/Helpers**: camelCase (e.g., `formatMessage.ts`)
- **Styles**: kebab-case (e.g., `chat-message.module.scss`)

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react';
import type { SomeType } from './types';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 3. Component
export function MyComponent({ title, onAction }: MyComponentProps) {
  // Hooks
  const [state, setState] = useState<string>('');
  
  // Event handlers
  const handleClick = () => {
    onAction();
  };
  
  // Render
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

### State Management

- **Use Zustand stores** for global state
- Keep component state local when possible
- Store location: `app/store/`
- Follow existing store patterns

### Styling

- **Use SCSS modules** for component styles
- Follow BEM naming convention
- Keep styles scoped to components
- Use CSS variables for theming (see `app/styles/globals.scss`)

## Testing Your Changes

### Manual Testing Checklist

Before submitting your contribution:

- [ ] **Run the dev server** - Ensure no build errors
  ```bash
  npm run dev
  ```

- [ ] **Test in multiple browsers**
  - Chrome/Edge (latest)
  - Test with WebGPU enabled

- [ ] **Test core functionality**
  - Chat interface loads correctly
  - Model selection works
  - Messages send and receive properly
  - Settings panel functions

- [ ] **Check the console** - No errors or warnings

- [ ] **Test different models** (if applicable)
  - Try at least 2-3 different models
  - Verify model loading works

- [ ] **Test responsive design** (if UI changes)
  - Desktop view
  - Mobile view
  - Tablet view

- [ ] **Run linting**
  ```bash
  npm run lint
  ```

### Performance Considerations

- Test with large conversation histories
- Monitor memory usage in browser DevTools
- Check model loading times
- Ensure UI remains responsive

## Getting Help

### Resources

- **Documentation**: Check the [README.md](README.md) for setup details
- **Project Issues**: Browse existing issues for context
- **Discord Community**: Join our [Discord server](https://discord.gg/9Xpy2HGBuD) for questions
- **WebLLM Docs**: [Official WebLLM Documentation](https://github.com/mlc-ai/web-llm)

### Common Questions

**Q: How do I add a new model?**  
A: Edit `app/constant.ts` to add model configurations. See existing models as examples.

**Q: How do I add a new language?**  
A: Create a new file in `app/locales/` following existing language file structure, then register it in `app/locales/index.ts`.

**Q: How do I modify the chat interface?**  
A: Start with `app/components/chat.tsx` and related style files in `app/components/chat.module.scss`.

**Q: Where is the WebLLM integration?**  
A: The main WebLLM wrapper is in `app/client/webllm.ts`.

**Q: The app won't load models. What should I check?**  
A: Ensure you're using a WebGPU-compatible browser (Chrome/Edge 113+) and check browser console for errors.

---

## Code of Conduct

Be respectful, inclusive, and collaborative. We're all here to build something great together.

## Questions?

If you have questions that aren't covered here, feel free to:
- Open a discussion in the repository
- Ask in the Discord community
- Check existing issues for similar questions

Thank you for contributing to WebLLM Chat! 🚀
