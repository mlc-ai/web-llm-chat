# Unit Testing

## Overview

WebLLM Chat is building a comprehensive testing strategy to ensure code quality, reliability, and maintainability. This document outlines the testing approach, tools, and best practices for the project.

## Current Testing Status

**Status**: Testing infrastructure is in planning phase

**Goal**: Achieve comprehensive test coverage for:
- React components
- State management (Zustand stores)
- Utility functions
- WebLLM integration
- User interactions

## Testing Stack

### Planned Testing Tools

#### Jest
- **Purpose**: JavaScript testing framework
- **Features**:
  - Fast test execution
  - Built-in mocking
  - Code coverage reports
  - Snapshot testing
- **Configuration**: `jest.config.js`

#### React Testing Library
- **Purpose**: React component testing
- **Philosophy**: Test components like users interact with them
- **Features**:
  - Query by accessibility roles
  - User event simulation
  - Async testing utilities
- **Why**: Encourages best testing practices

#### Playwright
- **Purpose**: End-to-end testing
- **Features**:
  - Cross-browser testing
  - Network mocking
  - Screenshot comparison
  - WebGPU support
- **Use Cases**: Full user flows, integration tests

#### @testing-library/jest-dom
- **Purpose**: Custom Jest matchers
- **Features**: Enhanced assertions for DOM elements
- **Examples**: `toBeInTheDocument()`, `toHaveClass()`

### Future Testing Configuration

```javascript
// jest.config.js (planned)
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.module\\.scss$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.stories.tsx',
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

## Test Structure

### File Organization

```
app/
├── components/
│   ├── button.tsx
│   ├── button.test.tsx              # Component tests
│   └── button.module.scss
├── store/
│   ├── chat.ts
│   └── chat.test.ts                 # Store tests
├── utils/
│   ├── format.ts
│   └── format.test.ts               # Utility tests
└── __tests__/
    ├── integration/                 # Integration tests
    └── e2e/                         # End-to-end tests
```

### Naming Conventions

- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts`

## Testing Patterns

### 1. Component Testing

#### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    render(<Button className="custom">Test</Button>);
    
    const button = screen.getByText('Test');
    expect(button).toHaveClass('custom');
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Test</Button>);
    
    expect(screen.getByText('Test')).toBeDisabled();
  });
});
```

#### Testing User Interactions

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chat } from './chat';

describe('Chat', () => {
  it('sends message when user clicks send button', async () => {
    const user = userEvent.setup();
    const onSend = jest.fn();
    
    render(<Chat onSend={onSend} />);
    
    // Type message
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello AI!');
    
    // Click send
    const sendButton = screen.getByRole('button', { name: /send/i });
    await user.click(sendButton);
    
    // Verify
    expect(onSend).toHaveBeenCalledWith('Hello AI!');
    expect(input).toHaveValue('');
  });
  
  it('sends message when user presses Enter', async () => {
    const user = userEvent.setup();
    const onSend = jest.fn();
    
    render(<Chat onSend={onSend} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello{Enter}');
    
    expect(onSend).toHaveBeenCalledWith('Hello');
  });
});
```

#### Testing Async Operations

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { ModelSelect } from './model-select';

describe('ModelSelect', () => {
  it('loads and displays available models', async () => {
    // Mock API call
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => [
        { id: 'llama-3', name: 'Llama 3' },
        { id: 'mistral', name: 'Mistral 7B' },
      ],
    } as Response);
    
    render(<ModelSelect />);
    
    // Initially shows loading
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for models to load
    await waitFor(() => {
      expect(screen.getByText('Llama 3')).toBeInTheDocument();
      expect(screen.getByText('Mistral 7B')).toBeInTheDocument();
    });
    
    global.fetch.mockRestore();
  });
});
```

### 2. Store Testing (Zustand)

```typescript
import { renderHook, act } from '@testing-library/react';
import { useChatStore } from './chat';

describe('useChatStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { clearMessages } = useChatStore.getState();
    clearMessages();
  });
  
  it('adds message to store', () => {
    const { result } = renderHook(() => useChatStore());
    
    act(() => {
      result.current.addMessage({
        id: '1',
        content: 'Hello',
        role: 'user',
        timestamp: Date.now(),
      });
    });
    
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('Hello');
  });
  
  it('clears all messages', () => {
    const { result } = renderHook(() => useChatStore());
    
    // Add messages
    act(() => {
      result.current.addMessage({ id: '1', content: 'Test 1', role: 'user' });
      result.current.addMessage({ id: '2', content: 'Test 2', role: 'assistant' });
    });
    
    expect(result.current.messages).toHaveLength(2);
    
    // Clear
    act(() => {
      result.current.clearMessages();
    });
    
    expect(result.current.messages).toHaveLength(0);
  });
  
  it('persists to localStorage', () => {
    const { result } = renderHook(() => useChatStore());
    
    act(() => {
      result.current.addMessage({
        id: '1',
        content: 'Persisted message',
        role: 'user',
      });
    });
    
    // Check localStorage
    const stored = localStorage.getItem('chat-storage');
    expect(stored).toContain('Persisted message');
  });
});
```

### 3. Utility Function Testing

```typescript
import { formatTimestamp, truncateText, parseMarkdown } from './format';

describe('Utility Functions', () => {
  describe('formatTimestamp', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-02-15T10:30:00Z');
      expect(formatTimestamp(date)).toBe('Feb 15, 2024 10:30 AM');
    });
    
    it('handles invalid date', () => {
      expect(formatTimestamp(null)).toBe('Invalid date');
    });
  });
  
  describe('truncateText', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text that needs truncation';
      expect(truncateText(text, 20)).toBe('This is a very long...');
    });
    
    it('does not truncate short text', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });
  });
  
  describe('parseMarkdown', () => {
    it('parses bold text', () => {
      const md = '**bold text**';
      const html = parseMarkdown(md);
      expect(html).toContain('<strong>bold text</strong>');
    });
    
    it('parses code blocks', () => {
      const md = '```js\nconst x = 1;\n```';
      const html = parseMarkdown(md);
      expect(html).toContain('<code');
      expect(html).toContain('const x = 1');
    });
  });
});
```

### 4. Mocking WebLLM

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { ChatInterface } from './chat-interface';

// Mock WebLLM
jest.mock('@mlc-ai/web-llm', () => ({
  CreateMLCEngine: jest.fn().mockResolvedValue({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Mocked AI response',
              },
            },
          ],
        }),
      },
    },
  }),
}));

describe('ChatInterface with WebLLM', () => {
  it('displays AI response', async () => {
    render(<ChatInterface />);
    
    const input = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    // Send message
    await userEvent.type(input, 'Hello AI');
    await userEvent.click(sendButton);
    
    // Wait for response
    await waitFor(() => {
      expect(screen.getByText('Mocked AI response')).toBeInTheDocument();
    });
  });
});
```

### 5. Integration Testing

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/app/page';

describe('Chat Flow Integration', () => {
  it('completes full chat interaction', async () => {
    const user = userEvent.setup();
    
    render(<App />);
    
    // 1. Select model
    const modelSelect = screen.getByRole('combobox', { name: /model/i });
    await user.click(modelSelect);
    await user.click(screen.getByText('Llama 3'));
    
    // 2. Wait for model to load
    await waitFor(() => {
      expect(screen.getByText(/ready/i)).toBeInTheDocument();
    });
    
    // 3. Send message
    const input = screen.getByRole('textbox');
    await user.type(input, 'What is WebGPU?');
    await user.click(screen.getByRole('button', { name: /send/i }));
    
    // 4. Verify user message appears
    expect(screen.getByText('What is WebGPU?')).toBeInTheDocument();
    
    // 5. Wait for AI response
    await waitFor(() => {
      expect(screen.getByText(/WebGPU is/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
```

### 6. Snapshot Testing

```typescript
import { render } from '@testing-library/react';
import { MessageItem } from './message-item';

describe('MessageItem', () => {
  it('matches snapshot for user message', () => {
    const { container } = render(
      <MessageItem
        message={{
          id: '1',
          content: 'Hello',
          role: 'user',
          timestamp: 1234567890000,
        }}
      />
    );
    
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot for assistant message', () => {
    const { container } = render(
      <MessageItem
        message={{
          id: '2',
          content: 'Hi! How can I help?',
          role: 'assistant',
          timestamp: 1234567890000,
        }}
      />
    );
    
    expect(container).toMatchSnapshot();
  });
});
```

## End-to-End Testing

### Playwright Configuration

```typescript
// playwright.config.ts (planned)
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'yarn dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('WebLLM Chat E2E', () => {
  test('full chat session', async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    
    // Wait for app to load
    await expect(page.locator('h1')).toContainText('WebLLM Chat');
    
    // Select model
    await page.click('[data-testid="model-select"]');
    await page.click('text=Llama 3');
    
    // Wait for model to load
    await expect(page.locator('[data-testid="status"]'))
      .toContainText('Ready', { timeout: 30000 });
    
    // Type and send message
    await page.fill('[data-testid="message-input"]', 'Hello AI!');
    await page.click('[data-testid="send-button"]');
    
    // Verify message appears
    await expect(page.locator('[data-testid="message"]'))
      .toContainText('Hello AI!');
    
    // Wait for AI response
    await expect(page.locator('[data-testid="message"]').last())
      .not.toContainText('Hello AI!', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ path: 'chat-session.png' });
  });
  
  test('works offline', async ({ page, context }) => {
    // Load page online
    await page.goto('/');
    
    // Wait for model to load
    await page.click('[data-testid="model-select"]');
    await page.click('text=Llama 3');
    await expect(page.locator('[data-testid="status"]'))
      .toContainText('Ready', { timeout: 30000 });
    
    // Go offline
    await context.setOffline(true);
    
    // Try to send message offline
    await page.fill('[data-testid="message-input"]', 'Offline test');
    await page.click('[data-testid="send-button"]');
    
    // Should still work
    await expect(page.locator('[data-testid="message"]'))
      .toContainText('Offline test');
  });
});
```

## Test Coverage

### Coverage Goals

```
Target Coverage:
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%
```

### Running Coverage

```bash
# Generate coverage report
yarn test --coverage

# View HTML report
open coverage/lcov-report/index.html
```

### Coverage Configuration

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.stories.tsx',
    '!app/**/index.ts',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/out/',
  ],
};
```

## Test Organization

### Test Suites

```
__tests__/
├── unit/                    # Unit tests
│   ├── components/
│   ├── stores/
│   └── utils/
├── integration/             # Integration tests
│   ├── chat-flow.test.ts
│   └── model-loading.test.ts
└── e2e/                     # End-to-end tests
    ├── chat.spec.ts
    ├── settings.spec.ts
    └── offline.spec.ts
```

## Continuous Integration

### Test Pipeline

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: yarn install
      
      - name: Run linting
        run: yarn lint
      
      - name: Run type check
        run: tsc --noEmit
      
      - name: Run unit tests
        run: yarn test --coverage
      
      - name: Run E2E tests
        run: yarn test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Testing Best Practices

### Do's

✅ Test user behavior, not implementation details
✅ Use descriptive test names
✅ Keep tests independent and isolated
✅ Mock external dependencies
✅ Test edge cases and error states
✅ Maintain test coverage above 70%
✅ Run tests before pushing

### Don'ts

❌ Don't test third-party libraries
❌ Don't rely on test execution order
❌ Don't use implementation details in queries
❌ Don't mock everything
❌ Don't write tests that never fail
❌ Don't skip failing tests

## Manual Testing Checklist

Until automated tests are fully implemented:

### Features to Test

- [ ] Model loading and initialization
- [ ] Message sending and receiving
- [ ] Markdown rendering
- [ ] Code syntax highlighting
- [ ] Math equation rendering
- [ ] Image upload (vision models)
- [ ] Chat export functionality
- [ ] Theme switching
- [ ] Settings persistence
- [ ] Offline functionality
- [ ] PWA installation
- [ ] Mobile responsiveness

### Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility Testing

- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] ARIA labels
- [ ] Color contrast
- [ ] Focus indicators

## Future Testing Initiatives

### Short Term
1. Set up Jest and React Testing Library
2. Write tests for utility functions
3. Implement component tests for UI library
4. Add store tests

### Medium Term
1. Integration tests for critical flows
2. E2E tests with Playwright
3. Visual regression testing
4. Performance testing

### Long Term
1. 80%+ code coverage
2. Automated accessibility testing
3. Load testing
4. Security testing

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
