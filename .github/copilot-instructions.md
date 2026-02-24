# GitHub Copilot Instructions for WebLLM Chat

## Project Overview

WebLLM Chat is a privacy-first AI chat interface that runs large language models entirely in the browser using WebGPU acceleration. No data leaves the user's device, ensuring complete privacy and offline functionality after initial setup.

**Key Technologies**: Next.js 13, React 18, TypeScript 5, WebLLM, WebGPU, Zustand, SCSS

**Repository Structure**: Next.js App Router with modular architecture, Zustand state management, and comprehensive documentation in `.github/copilot/`.

## Quick Reference

### Documentation Structure

All key documentation is located in `.github/copilot/`:

1. **Architecture.md** - System design, data flow, architectural principles
2. **Technology_Stack.md** - Complete tech stack with versions and rationale
3. **Project_Folder_Structure.md** - Directory organization and file conventions
4. **Coding_Standards.md** - TypeScript, React, and style guidelines
5. **Workflow_Analysis.md** - Development workflow, Git, CI/CD processes
6. **Unit_Tests.md** - Testing strategy and examples (planned)
7. **Code_Exemplars.md** - Reference implementations and patterns

## Code Generation Guidelines

### TypeScript Standards

- **Always use explicit types** - Never use `any`, prefer interfaces for objects
- **Enable strict mode** - All type checking rules are enforced
- **Use functional components** - React hooks-based components only
- **Export named functions** - Avoid default exports for components

```typescript
// ✅ Good
export interface UserProps {
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

### React Patterns

- **Destructure props** in function parameters
- **Use Zustand for state** - No Context API for global state
- **Memoize expensive operations** - Use useMemo, useCallback appropriately
- **SCSS modules for styling** - Co-locate *.module.scss with components

```typescript
// Component template
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

### State Management

- **Use Zustand stores** for global state (chat, config, prompts, templates)
- **Select only needed state** - Don't over-subscribe to store updates
- **Persist important data** - Use persist middleware for user data

```typescript
// Store access pattern
const messages = useChatStore((state) => state.messages);
const addMessage = useChatStore((state) => state.addMessage);

// Not: const store = useChatStore();
```

### File Organization

```
app/
├── components/          # React components + .module.scss
├── store/              # Zustand stores
├── utils/              # Helper functions
├── client/             # API clients (WebLLM)
└── config/             # Configuration

Naming:
- Components: PascalCase (Button.tsx) or kebab-case (button.tsx)
- Styles: kebab-case (button.module.scss)
- Utils: camelCase (format.ts)
- Stores: lowercase (chat.ts)
```

### Import Patterns

```typescript
// Use @ alias for absolute imports
import { Component } from '@/app/components/Component';
import { useChatStore } from '@/app/store';
import { formatDate } from '@/app/utils/format';

// Order: External → Internal → Relative → Styles
import React from 'react';
import { Button } from '@/app/components/button';
import { helper } from './helper';
import styles from './component.module.scss';
```

### Error Handling

```typescript
// Always handle errors with try-catch
try {
  await riskyOperation();
} catch (error) {
  console.error('Operation failed:', error);
  // Show user-friendly error
  throw new AppError('Failed to complete operation', 'OPERATION_ERROR');
}
```

### Accessibility

```typescript
// Always include ARIA labels for interactive elements
<button
  onClick={handleClick}
  aria-label="Send message"
  aria-disabled={disabled}
>
  <SendIcon />
</button>

// Use semantic HTML
<article>
  <header><h1>Title</h1></header>
  <section><p>Content</p></section>
</article>
```

## WebLLM Integration

### Model Loading

```typescript
import * as webllm from '@mlc-ai/web-llm';

const engine = await webllm.CreateMLCEngine(modelId, {
  initProgressCallback: (progress) => {
    console.log(`Loading: ${progress.text}`);
  },
});
```

### Chat Completion

```typescript
// Streaming
const completion = await engine.chat.completions.create({
  messages: [{ role: 'user', content: 'Hello!' }],
  temperature: 0.7,
  max_tokens: 1024,
  stream: true,
});

for await (const chunk of completion) {
  const content = chunk.choices[0]?.delta?.content || '';
  // Handle streaming content
}
```

## Code Style (Prettier)

```javascript
// Automatically enforced by Prettier
{
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,    // Use double quotes
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
}
```

## Git Workflow

### Commit Messages

```
type(scope): subject

Types: feat, fix, docs, style, refactor, perf, test, chore
Scope: component name or area
Subject: imperative mood, lowercase, no period

Examples:
feat(chat): add message export functionality
fix(model): resolve WebGPU context loss on tab switch
docs(readme): update installation instructions
```

### Branch Naming

```
feature/description      # New features
bugfix/description       # Bug fixes
hotfix/description       # Critical production fixes
refactor/description     # Code refactoring
docs/description         # Documentation
```

## Common Tasks

### Add New Component

```typescript
// 1. Create component file: app/components/new-component.tsx
import React from 'react';
import styles from './new-component.module.scss';

export interface NewComponentProps {
  // Props definition
}

export function NewComponent({ }: NewComponentProps) {
  return <div className={styles.container}>Content</div>;
}

// 2. Create styles: app/components/new-component.module.scss
.container {
  // Styles
}

// 3. Export and use
```

### Add Store Action

```typescript
// app/store/chat.ts
addMessage: (message) =>
  set((state) => ({
    messages: [...state.messages, message],
  })),
```

### Add Utility Function

```typescript
// app/utils/format.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
```

## Performance Considerations

- **Memoize expensive computations** with useMemo
- **Memoize callback functions** passed as props with useCallback
- **Use React.memo** for components with complex props
- **Code split large features** with dynamic imports
- **Optimize images** through Next.js Image component

## Testing (When Implemented)

```typescript
// Component test template
import { render, screen } from '@testing-library/react';
import { Component } from './component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Security Guidelines

- **Sanitize user input** before rendering
- **Use Content Security Policy** (configured in next.config.mjs)
- **No sensitive data in client code** - Everything is client-side
- **Validate all inputs** before processing

## Build & Deployment

```bash
# Development
yarn dev              # Start dev server

# Production
yarn build            # Standalone build
yarn export           # Static export for GitHub Pages

# Code Quality
yarn lint             # ESLint
yarn lint --fix       # Auto-fix issues

# Docker
docker build -t webllm_chat .
docker run -p 3000:3000 webllm_chat
```

## Common Patterns to Follow

### 1. State Updates (Immutable)

```typescript
// ✅ Correct - create new array/object
set((state) => ({
  messages: [...state.messages, newMessage],
}));

// ❌ Wrong - mutates state
state.messages.push(newMessage);
```

### 2. Conditional Rendering

```typescript
// ✅ Correct
return (
  <div>
    {isLoading && <Spinner />}
    {error && <Error message={error} />}
    {data && <DataDisplay data={data} />}
  </div>
);
```

### 3. Event Handlers

```typescript
// ✅ Correct - use handle prefix
const handleClick = () => { };
const handleSubmit = (e: React.FormEvent) => { };
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { };
```

### 4. Async Operations

```typescript
// ✅ Correct - with error handling
useEffect(() => {
  const loadData = async () => {
    try {
      const data = await fetchData();
      setData(data);
    } catch (error) {
      setError(handleError(error));
    }
  };
  
  loadData();
}, []);
```

## Anti-Patterns to Avoid

❌ Don't use `any` type
❌ Don't mutate state directly
❌ Don't use default exports for components
❌ Don't ignore TypeScript errors
❌ Don't use inline styles (use SCSS modules)
❌ Don't forget error handling
❌ Don't skip accessibility attributes
❌ Don't commit console.log statements
❌ Don't push directly to main branch

## Resources

For detailed information, refer to:
- `.github/copilot/Architecture.md` - System architecture
- `.github/copilot/Coding_Standards.md` - Detailed coding standards
- `.github/copilot/Code_Exemplars.md` - Code examples
- `README.md` - Project documentation

## Project Philosophy

1. **Privacy First** - All processing happens locally, no data transmission
2. **Type Safety** - Leverage TypeScript for catching errors early
3. **Developer Experience** - Clear structure, good documentation
4. **Performance** - Optimize for fast load times and smooth interactions
5. **Accessibility** - Build for all users, follow WCAG guidelines
6. **Open Source** - Encourage community contributions

## When in Doubt

1. **Check existing code** in the same directory for patterns
2. **Refer to Code_Exemplars.md** for reference implementations
3. **Follow TypeScript compiler** suggestions
4. **Run ESLint** to catch style issues
5. **Test your changes** locally before committing
6. **Ask in pull request** if unsure about approach

---

**Remember**: This project prioritizes privacy, type safety, and user experience. Write code that is clear, well-documented, and accessible to all users.
