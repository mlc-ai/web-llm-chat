# Coding Standards

## Overview

WebLLM Chat maintains high code quality through consistent coding standards, automated tooling, and best practices. This document defines the conventions used across the TypeScript/React codebase.

## TypeScript Guidelines

### Type Safety

**Always prefer explicit types over `any`**

```typescript
// ❌ Bad
function processData(data: any) {
  return data.value;
}

// ✅ Good
interface DataType {
  value: string;
}

function processData(data: DataType): string {
  return data.value;
}
```

### Strict Mode

TypeScript strict mode is enabled in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true
  }
}
```

### Type Annotations

**Explicitly type function parameters and return values**

```typescript
// ❌ Bad
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Good
interface Item {
  price: number;
  quantity: number;
}

function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Interface vs Type

**Use interfaces for object shapes, types for unions/intersections**

```typescript
// ✅ Interfaces for objects
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Types for unions
type Status = 'idle' | 'loading' | 'success' | 'error';

// ✅ Types for intersections
type AdminUser = User & { role: 'admin'; permissions: string[] };
```

### Enum Alternatives

**Prefer const objects or union types over enums**

```typescript
// ❌ Avoid enums
enum Color {
  Red,
  Green,
  Blue
}

// ✅ Prefer const objects
const Color = {
  Red: 'red',
  Green: 'green',
  Blue: 'blue',
} as const;

type ColorValue = typeof Color[keyof typeof Color];

// ✅ Or union types
type Color = 'red' | 'green' | 'blue';
```

## React Guidelines

### Component Structure

**Use functional components with hooks**

```typescript
import React from 'react';
import styles from './component.module.scss';

interface ComponentProps {
  title: string;
  onAction?: () => void;
  children?: React.ReactNode;
}

export function Component({ title, onAction, children }: ComponentProps) {
  // Hooks first
  const [state, setState] = React.useState<string>('');
  
  // Event handlers
  const handleClick = () => {
    onAction?.();
  };
  
  // Render
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {children}
      <button onClick={handleClick}>Action</button>
    </div>
  );
}
```

### Props Pattern

**Destructure props in function parameters**

```typescript
// ❌ Bad
export function Component(props: ComponentProps) {
  return <div>{props.title}</div>;
}

// ✅ Good
export function Component({ title, subtitle }: ComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
    </div>
  );
}
```

### Optional Props

**Use optional chaining and nullish coalescing**

```typescript
interface Props {
  config?: {
    theme?: string;
    locale?: string;
  };
}

export function Component({ config }: Props) {
  // ✅ Good
  const theme = config?.theme ?? 'light';
  const locale = config?.locale ?? 'en';
  
  return <div data-theme={theme} data-locale={locale} />;
}
```

### Hooks Usage

**Follow Rules of Hooks**

```typescript
import { useState, useEffect, useMemo, useCallback } from 'react';

export function Component({ data }: Props) {
  // ✅ Always call hooks at the top level
  const [state, setState] = useState<Data[]>([]);
  
  // ✅ Use useCallback for functions passed as props
  const handleUpdate = useCallback((id: string) => {
    setState(prev => prev.filter(item => item.id !== id));
  }, []);
  
  // ✅ Use useMemo for expensive computations
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);
  
  // ✅ Use useEffect for side effects
  useEffect(() => {
    fetchData().then(setState);
  }, []);
  
  return <div>{/* ... */}</div>;
}
```

### Event Handlers

**Naming convention: handle[EventName]**

```typescript
export function Component() {
  const handleClick = () => {
    console.log('clicked');
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Handle input change
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
```

## Naming Conventions

### Files and Directories

```
PascalCase:    ComponentName.tsx (React components)
kebab-case:    component-name.module.scss (styles)
               component-name.test.tsx (tests)
camelCase:     utilityFunction.ts (utilities)
lowercase:     config.ts (configuration, stores)
```

### Variables and Functions

```typescript
// ✅ camelCase for variables and functions
const userName = 'John';
function getUserName() { }

// ✅ PascalCase for classes and React components
class UserManager { }
function UserProfile() { }

// ✅ UPPER_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// ✅ Prefix booleans with is/has/should
const isLoading = true;
const hasPermission = false;
const shouldRender = true;
```

### TypeScript Types

```typescript
// ✅ PascalCase for interfaces and types
interface UserProfile { }
type ApiResponse = { };

// ✅ Suffix props interfaces with "Props"
interface ButtonProps { }
interface ChatListProps { }

// ✅ Descriptive names
type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
```

## Code Style (Prettier Configuration)

### Formatting Rules

Configuration in `.prettierrc.js`:

```javascript
module.exports = {
  printWidth: 80,           // ✅ Maximum line width
  tabWidth: 2,              // ✅ Indent with 2 spaces
  useTabs: false,           // ✅ Use spaces, not tabs
  semi: true,               // ✅ Always use semicolons
  singleQuote: false,       // ✅ Use double quotes
  trailingComma: 'all',     // ✅ Trailing commas everywhere
  bracketSpacing: true,     // ✅ Spaces in object literals
  arrowParens: 'always',    // ✅ Always use parentheses in arrows
};
```

### Examples

```typescript
// ✅ Proper formatting
const config = {
  theme: "dark",
  language: "en",
  features: ["chat", "export"],
};

const sum = (a: number, b: number): number => {
  return a + b;
};

// Line breaks for long lines
const result = someVeryLongFunctionName(
  firstParameter,
  secondParameter,
  thirdParameter,
);
```

## ESLint Configuration

### Key Rules

```json
{
  "extends": "next/core-web-vitals",
  "plugins": ["prettier"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

### Usage

```typescript
// ❌ Bad - will trigger ESLint errors
var x = 10;  // Use const or let
console.log(x);  // Avoid console in production

// ✅ Good
const x = 10;
logger.info({ value: x });
```

## Import Organization

### Import Order

```typescript
// 1. External dependencies
import React from 'react';
import { useRouter } from 'next/router';

// 2. Internal modules (using @/ alias)
import { Button } from '@/app/components/button';
import { useStore } from '@/app/store';

// 3. Relative imports
import { helper } from './utils';
import styles from './component.module.scss';

// 4. Types (if imported separately)
import type { User } from '@/app/types';
```

### Path Aliases

Use `@/` alias for absolute imports:

```typescript
// ❌ Bad - relative imports can break
import { Component } from '../../../components/Component';

// ✅ Good - absolute imports with alias
import { Component } from '@/app/components/Component';
```

## Comments and Documentation

### JSDoc Comments

**Document public APIs and complex functions**

```typescript
/**
 * Calculates the total price including tax and discount.
 * 
 * @param basePrice - The original price before tax and discount
 * @param taxRate - Tax rate as a decimal (e.g., 0.1 for 10%)
 * @param discount - Discount amount to subtract
 * @returns The final price after tax and discount
 * 
 * @example
 * ```ts
 * const total = calculateTotal(100, 0.1, 5);
 * // Returns 105 (100 + 10% tax - 5 discount)
 * ```
 */
function calculateTotal(
  basePrice: number,
  taxRate: number,
  discount: number,
): number {
  return basePrice * (1 + taxRate) - discount;
}
```

### Inline Comments

**Explain "why", not "what"**

```typescript
// ❌ Bad - explains what (obvious from code)
// Set the user name to John
const userName = 'John';

// ✅ Good - explains why
// Default to admin user during development
const userName = isDevelopment ? 'admin' : getCurrentUser();

// ✅ Good - explains complex logic
// WebGPU requires power preference to be set before initialization
// to ensure we get the high-performance GPU on multi-GPU systems
const gpu = await navigator.gpu.requestAdapter({
  powerPreference: 'high-performance',
});
```

## Error Handling

### Try-Catch Blocks

```typescript
// ✅ Proper error handling
async function loadModel(modelId: string): Promise<Model> {
  try {
    const model = await fetchModel(modelId);
    return model;
  } catch (error) {
    // Log error with context
    logger.error('Failed to load model', {
      modelId,
      error: error instanceof Error ? error.message : String(error),
    });
    
    // Re-throw or handle gracefully
    throw new ModelLoadError(`Failed to load model: ${modelId}`, { cause: error });
  }
}
```

### Custom Errors

```typescript
// ✅ Create custom error classes
class ModelLoadError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ModelLoadError';
  }
}

class NetworkError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'NetworkError';
  }
}
```

## State Management (Zustand)

### Store Pattern

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatState {
  messages: Message[];
  currentSession: string | null;
  
  // Actions
  addMessage: (message: Message) => void;
  setSession: (sessionId: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      currentSession: null,
      
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      
      setSession: (sessionId) =>
        set({ currentSession: sessionId }),
      
      clearMessages: () =>
        set({ messages: [] }),
    }),
    {
      name: 'chat-storage',
    },
  ),
);
```

### Store Usage

```typescript
// ✅ Select only what you need
export function Component() {
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  
  // Component logic
}
```

## CSS/SCSS Standards

### Module Naming

```scss
// component-name.module.scss

// ✅ Use kebab-case for class names
.chat-container {
  display: flex;
  flex-direction: column;
}

.message-item {
  padding: 1rem;
  border-radius: 0.5rem;
  
  // ✅ Use nesting sparingly
  &:hover {
    background: var(--hover-bg);
  }
}

// ✅ Use CSS custom properties for theming
.button {
  background: var(--button-bg);
  color: var(--button-text);
  border: 1px solid var(--button-border);
}
```

### Usage in Components

```typescript
import styles from './component.module.scss';

export function Component() {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageItem}>
        Message content
      </div>
    </div>
  );
}
```

## Testing Standards

### Component Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Best Practices

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// ✅ Memoize expensive computations
export function Component({ data }: Props) {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.timestamp - b.timestamp);
  }, [data]);
  
  return <List items={sortedData} />;
}

// ✅ Memoize components that receive complex props
export const MemoizedComponent = memo(Component);
```

### Avoid Premature Optimization

```typescript
// ❌ Don't memoize everything
const SimpleComponent = memo(({ text }: { text: string }) => {
  return <div>{text}</div>;  // Too simple to benefit from memo
});

// ✅ Memoize when re-renders are expensive
const ComplexList = memo(({ items }: { items: Item[] }) => {
  return (
    <div>
      {items.map(item => (
        <ExpensiveItem key={item.id} item={item} />
      ))}
    </div>
  );
});
```

## Accessibility (a11y)

### Semantic HTML

```typescript
// ✅ Use semantic HTML elements
export function Article({ title, content }: Props) {
  return (
    <article>
      <header>
        <h1>{title}</h1>
      </header>
      <section>
        <p>{content}</p>
      </section>
    </article>
  );
}
```

### ARIA Attributes

```typescript
// ✅ Add ARIA labels for interactive elements
export function IconButton({ icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      type="button"
    >
      {icon}
    </button>
  );
}
```

### Keyboard Navigation

```typescript
// ✅ Support keyboard navigation
export function Dialog({ onClose }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  return (
    <div role="dialog" aria-modal="true" onKeyDown={handleKeyDown}>
      {/* Dialog content */}
    </div>
  );
}
```

## Git Commit Messages

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

### Examples

```
feat(chat): add message export functionality

Implement export chat as markdown, JSON, or image.
Includes date range selection and filtering options.

Closes #123
```

```
fix(model): resolve WebGPU context loss on tab switch

Handle WebGPU device lost event and reinitialize the model
when the tab becomes active again.

Fixes #456
```

## Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows TypeScript and React standards
- [ ] All ESLint warnings resolved
- [ ] Code formatted with Prettier
- [ ] No console.log statements in production code
- [ ] Types are explicit (no `any`)
- [ ] Components are properly documented
- [ ] Error handling is implemented
- [ ] Code is accessible (a11y)
- [ ] Performance considered (memoization where needed)
- [ ] Tests added for new functionality
- [ ] Commit messages follow convention

## Tools and Automation

### Pre-commit Hooks (Husky)

Automatically run before each commit:
- ESLint checks
- Prettier formatting
- Type checking

### Continuous Integration

GitHub Actions run on each PR:
- Linting
- Type checking
- Build verification
- Tests (when implemented)

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
