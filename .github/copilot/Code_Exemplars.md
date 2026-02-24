# Code Exemplars

## Overview

This document provides code examples and patterns used in WebLLM Chat. These exemplars serve as reference implementations for common tasks and demonstrate best practices for the project.

## React Component Patterns

### 1. Basic Functional Component with TypeScript

```typescript
// app/components/button.tsx
import React from 'react';
import styles from './button.module.scss';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
  className = '',
}: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### 2. Component with State and Effects

```typescript
// app/components/model-select.tsx
import React, { useState, useEffect } from 'react';
import { useConfigStore } from '@/app/store';
import styles from './model-select.module.scss';

interface Model {
  id: string;
  name: string;
  size: string;
  description: string;
}

export function ModelSelect() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { selectedModel, setSelectedModel } = useConfigStore();
  
  useEffect(() => {
    loadAvailableModels();
  }, []);
  
  const loadAvailableModels = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch available models from WebLLM
      const response = await fetch('/api/models');
      const data = await response.json();
      
      setModels(data.models);
    } catch (err) {
      setError('Failed to load models');
      console.error('Model loading error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading models...</div>;
  }
  
  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={loadAvailableModels}>Retry</button>
      </div>
    );
  }
  
  return (
    <div className={styles.modelSelect}>
      <h3>Select Model</h3>
      <div className={styles.modelList}>
        {models.map((model) => (
          <button
            key={model.id}
            className={`${styles.modelItem} ${
              selectedModel === model.id ? styles.selected : ''
            }`}
            onClick={() => handleModelSelect(model.id)}
            aria-label={`Select ${model.name}`}
            aria-pressed={selectedModel === model.id}
          >
            <div className={styles.modelName}>{model.name}</div>
            <div className={styles.modelSize}>{model.size}</div>
            <div className={styles.modelDescription}>{model.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

### 3. Component with Memoization

```typescript
// app/components/message-list.tsx
import React, { useMemo, memo } from 'react';
import { MessageItem } from './message-item';
import styles from './message-list.module.scss';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
  onDelete?: (id: string) => void;
}

export const MessageList = memo<MessageListProps>(({ messages, onDelete }) => {
  // Memoize sorted messages
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);
  
  // Memoize statistics
  const stats = useMemo(() => {
    return {
      total: messages.length,
      userMessages: messages.filter(m => m.role === 'user').length,
      assistantMessages: messages.filter(m => m.role === 'assistant').length,
    };
  }, [messages]);
  
  if (messages.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No messages yet. Start a conversation!</p>
      </div>
    );
  }
  
  return (
    <div className={styles.messageList}>
      <div className={styles.stats}>
        {stats.total} messages ({stats.userMessages} from you, {stats.assistantMessages} from AI)
      </div>
      
      {sortedMessages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});

MessageList.displayName = 'MessageList';
```

## Zustand Store Patterns

### 4. Complete Store Implementation

```typescript
// app/store/chat.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: number;
  model?: string;
  error?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

interface ChatState {
  // State
  sessions: ChatSession[];
  currentSessionId: string | null;
  isStreaming: boolean;
  
  // Computed
  currentSession: () => ChatSession | null;
  currentMessages: () => Message[];
  
  // Actions
  createSession: (title?: string) => string;
  deleteSession: (sessionId: string) => void;
  setCurrentSession: (sessionId: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (messageId: string, content: string) => void;
  deleteMessage: (messageId: string) => void;
  clearCurrentSession: () => void;
  setStreaming: (isStreaming: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Initial state
      sessions: [],
      currentSessionId: null,
      isStreaming: false,
      
      // Computed values
      currentSession: () => {
        const { sessions, currentSessionId } = get();
        return sessions.find(s => s.id === currentSessionId) || null;
      },
      
      currentMessages: () => {
        const session = get().currentSession();
        return session?.messages || [];
      },
      
      // Actions
      createSession: (title = 'New Chat') => {
        const sessionId = `session-${Date.now()}`;
        const newSession: ChatSession = {
          id: sessionId,
          title,
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: sessionId,
        }));
        
        return sessionId;
      },
      
      deleteSession: (sessionId: string) => {
        set((state) => ({
          sessions: state.sessions.filter(s => s.id !== sessionId),
          currentSessionId:
            state.currentSessionId === sessionId
              ? state.sessions[0]?.id || null
              : state.currentSessionId,
        }));
      },
      
      setCurrentSession: (sessionId: string) => {
        set({ currentSessionId: sessionId });
      },
      
      addMessage: (messageData) => {
        const message: Message = {
          ...messageData,
          id: `msg-${Date.now()}-${Math.random()}`,
          timestamp: Date.now(),
        };
        
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === state.currentSessionId
              ? {
                  ...session,
                  messages: [...session.messages, message],
                  updatedAt: Date.now(),
                }
              : session
          ),
        }));
      },
      
      updateMessage: (messageId: string, content: string) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === state.currentSessionId
              ? {
                  ...session,
                  messages: session.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, content } : msg
                  ),
                  updatedAt: Date.now(),
                }
              : session
          ),
        }));
      },
      
      deleteMessage: (messageId: string) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === state.currentSessionId
              ? {
                  ...session,
                  messages: session.messages.filter((msg) => msg.id !== messageId),
                  updatedAt: Date.now(),
                }
              : session
          ),
        }));
      },
      
      clearCurrentSession: () => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === state.currentSessionId
              ? { ...session, messages: [], updatedAt: Date.now() }
              : session
          ),
        }));
      },
      
      setStreaming: (isStreaming: boolean) => {
        set({ isStreaming });
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
      }),
    }
  )
);
```

## WebLLM Integration Pattern

### 5. WebLLM Client Wrapper

```typescript
// app/client/webllm-client.ts
import * as webllm from '@mlc-ai/web-llm';

export class WebLLMClient {
  private engine: webllm.MLCEngine | null = null;
  private currentModel: string | null = null;
  
  async initialize(modelId: string): Promise<void> {
    try {
      // Create engine if not exists or model changed
      if (!this.engine || this.currentModel !== modelId) {
        this.engine = await webllm.CreateMLCEngine(modelId, {
          initProgressCallback: (progress) => {
            console.log('Loading progress:', progress);
            // Emit progress event for UI
            this.onProgress?.(progress);
          },
        });
        
        this.currentModel = modelId;
      }
    } catch (error) {
      console.error('Failed to initialize WebLLM:', error);
      throw new Error('Model initialization failed');
    }
  }
  
  async chat(
    messages: Array<{ role: string; content: string }>,
    options?: {
      temperature?: number;
      maxTokens?: number;
      onStream?: (chunk: string) => void;
    }
  ): Promise<string> {
    if (!this.engine) {
      throw new Error('Engine not initialized');
    }
    
    const { temperature = 0.7, maxTokens = 1024, onStream } = options || {};
    
    try {
      // Streaming response
      if (onStream) {
        let fullResponse = '';
        
        const completion = await this.engine.chat.completions.create({
          messages,
          temperature,
          max_tokens: maxTokens,
          stream: true,
        });
        
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || '';
          fullResponse += content;
          onStream(content);
        }
        
        return fullResponse;
      }
      
      // Non-streaming response
      const completion = await this.engine.chat.completions.create({
        messages,
        temperature,
        max_tokens: maxTokens,
      });
      
      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Chat error:', error);
      throw new Error('Failed to generate response');
    }
  }
  
  async resetChat(): Promise<void> {
    if (this.engine) {
      await this.engine.resetChat();
    }
  }
  
  async dispose(): Promise<void> {
    if (this.engine) {
      await this.engine.unload();
      this.engine = null;
      this.currentModel = null;
    }
  }
  
  // Progress callback
  onProgress?: (progress: webllm.InitProgressReport) => void;
}

// Singleton instance
export const webllmClient = new WebLLMClient();
```

## Utility Functions

### 6. Common Utilities

```typescript
// app/utils/format.ts

/**
 * Format timestamp to readable date string
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than 1 minute
  if (diff < 60000) {
    return 'Just now';
  }
  
  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  
  // Less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  // Format as date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generate unique ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
```

## Custom Hooks

### 7. useLocalStorage Hook

```typescript
// app/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });
  
  // Update localStorage when value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function (same API as useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };
  
  return [storedValue, setValue];
}
```

### 8. useDebounce Hook

```typescript
// app/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
```

## Error Handling Pattern

### 9. Custom Error Classes

```typescript
// app/utils/errors.ts

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ModelLoadError extends AppError {
  constructor(message: string, public modelId: string) {
    super(message, 'MODEL_LOAD_ERROR', 500);
    this.name = 'ModelLoadError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, 'NETWORK_ERROR', statusCode);
    this.name = 'NetworkError';
  }
}

/**
 * Error handler with logging
 */
export function handleError(error: unknown): string {
  if (error instanceof AppError) {
    console.error(`[${error.code}] ${error.message}`, error);
    return error.message;
  }
  
  if (error instanceof Error) {
    console.error('Unexpected error:', error);
    return error.message;
  }
  
  console.error('Unknown error:', error);
  return 'An unexpected error occurred';
}
```

## SCSS/CSS Patterns

### 10. Component Styles

```scss
// app/components/chat.module.scss

@import '@/app/styles/variables';
@import '@/app/styles/mixins';

.chatContainer {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md);
  
  @include respond-to('mobile') {
    padding: var(--spacing-sm);
  }
}

.messageList {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  
  // Custom scrollbar
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 4px;
    
    &:hover {
      background: var(--scrollbar-thumb-hover);
    }
  }
}

.inputArea {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  
  input {
    flex: 1;
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: var(--font-size-base);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px var(--primary-color-alpha);
    }
  }
  
  button {
    @include button-base;
    @include button-primary;
  }
}

.empty {
  @include center-content;
  height: 100%;
  color: var(--text-secondary);
  font-style: italic;
}
```

## Configuration Patterns

### 11. Environment Configuration

```typescript
// app/config/env.ts

export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  // API endpoints
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  
  // Feature flags
  features: {
    enableVisionModels: process.env.NEXT_PUBLIC_ENABLE_VISION === 'true',
    enableExport: process.env.NEXT_PUBLIC_ENABLE_EXPORT !== 'false',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  
  // Build configuration
  buildMode: process.env.BUILD_MODE || 'standalone',
} as const;

export function getPublicConfig() {
  return {
    apiUrl: ENV.apiUrl,
    features: ENV.features,
  };
}
```

## Testing Examples

### 12. Component Test Template

```typescript
// app/components/__tests__/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
  
  it('applies correct variant class', () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    expect(container.firstChild).toHaveClass('danger');
  });
});
```

## Documentation Patterns

### 13. JSDoc Comments

```typescript
/**
 * Sends a message to the AI model and returns the response.
 * 
 * @param message - The user's message to send
 * @param options - Optional configuration for the request
 * @param options.temperature - Controls randomness (0-1). Default: 0.7
 * @param options.maxTokens - Maximum response length. Default: 1024
 * @param options.onStream - Callback for streaming responses
 * 
 * @returns Promise resolving to the AI's response
 * 
 * @throws {ModelLoadError} If model is not loaded
 * @throws {NetworkError} If network request fails
 * 
 * @example
 * ```typescript
 * const response = await sendMessage('Hello AI!', {
 *   temperature: 0.8,
 *   onStream: (chunk) => console.log(chunk)
 * });
 * ```
 */
export async function sendMessage(
  message: string,
  options?: SendMessageOptions
): Promise<string> {
  // Implementation
}
```

## Best Practices Demonstrated

These exemplars demonstrate:

1. **Type Safety**: Explicit TypeScript types throughout
2. **Error Handling**: Try-catch blocks and custom errors
3. **Performance**: Memoization and optimization techniques
4. **Accessibility**: ARIA labels and semantic HTML
5. **Code Organization**: Clear structure and separation of concerns
6. **Documentation**: JSDoc comments for complex functions
7. **Testing**: Comprehensive test examples
8. **State Management**: Zustand best practices
9. **Styling**: SCSS modules and CSS custom properties
10. **Reusability**: Generic utilities and custom hooks

## Usage Guidelines

When implementing new features:

1. **Reference these exemplars** for consistent patterns
2. **Follow the established architecture** in existing code
3. **Maintain type safety** with explicit TypeScript types
4. **Document complex logic** with JSDoc comments
5. **Write tests** following the test exemplars
6. **Use consistent naming** as shown in examples
7. **Apply accessibility** patterns from component examples
