# Contributing to WebLLM Chat

Thank you for your interest in contributing to WebLLM Chat! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)
- [Issue Labels](#issue-labels)

---

## Code of Conduct

This project follows the [MLC.ai Community Code of Conduct](https://github.com/mlc-ai). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Git** ([Download](https://git-scm.com/))
- Modern browser with **WebGPU support** (Chrome, Edge, or Firefox Nightly)

### Development Setup

1. **Fork the repository**
   - Visit https://github.com/mlc-ai/web-llm-chat
   - Click the "Fork" button in the top right

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/web-llm-chat.git
   cd web-llm-chat
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/mlc-ai/web-llm-chat.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

5. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   - Visit http://localhost:3000
   - The application should now be running locally

### Verify Your Setup

- Check that the development server starts without errors
- Open DevTools console to check for WebGPU availability
- Try loading a small model to verify everything works

---

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features (e.g., `feature/add-model-selector`)
- `fix/` - Bug fixes (e.g., `fix/model-loading-error`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/cleanup-webllm-api`)
- `test/` - Test additions/updates (e.g., `test/add-unit-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(models): add support for Llama 3.2 models
fix(webllm): resolve model loading timeout issue
docs(readme): update installation instructions
```

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your local main
git checkout main
git merge upstream/main

# Push updates to your fork
git push origin main
```

---

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Enable strict mode
- Avoid `any` types - use proper type definitions
- Use interfaces for object shapes
- Use enums for constants with multiple values

**Example:**
```typescript
// ✅ Good
interface ModelConfig {
  name: string;
  temperature: number;
  maxTokens: number;
}

// ❌ Avoid
const config: any = { ... };
```

### React Components

- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into custom hooks
- Use proper TypeScript types for props

**Example:**
```typescript
// ✅ Good
interface ChatMessageProps {
  message: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function ChatMessage({ message, role, timestamp }: ChatMessageProps) {
  // Component implementation
}
```

### File Organization

```
app/
├── client/          # API clients and WebLLM integration
├── components/      # React components
├── store/          # State management (Zustand)
├── utils/          # Utility functions
├── styles/         # Global styles and themes
├── locales/        # Internationalization
└── worker/         # Service/Web Workers
```

### Naming Conventions

- **Files**: kebab-case (e.g., `chat-message.tsx`, `model-config.ts`)
- **Components**: PascalCase (e.g., `ChatMessage`, `ModelSelector`)
- **Functions**: camelCase (e.g., `loadModel`, `formatMessage`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_MODELS`, `API_ENDPOINT`)
- **Interfaces/Types**: PascalCase (e.g., `ModelConfig`, `ChatOptions`)

### Code Formatting

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code (if using Prettier)
npm run format
```

**Important:** All code must pass linting before PR submission.

---

## Pull Request Process

### Before Submitting

1. **Create a feature branch** from `main`
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Follow the style guidelines
   - Keep commits focused and atomic

3. **Test your changes**
   ```bash
   npm run build    # Ensure it builds successfully
   npm run lint     # Check for linting errors
   npm test         # Run tests (if available)
   ```

4. **Update documentation**
   - Update README.md if needed
   - Add JSDoc comments for new functions/classes
   - Update relevant documentation files

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting the PR

1. Go to https://github.com/mlc-ai/web-llm-chat/pulls
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template:
   - **Clear title** following conventional commits format
   - **Description** of what changes were made and why
   - **Link related issues** using "Fixes #123" or "Relates to #456"
   - **Screenshots/videos** for UI changes
   - **Testing notes** - how you tested the changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Related Issues
Fixes #123

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added (if applicable)
```

### PR Review Process

1. **Automated checks** will run (linting, build)
2. **Maintainers will review** your code (usually within 1-3 business days)
3. **Address feedback** by pushing additional commits
4. **Once approved**, a maintainer will merge your PR

### After Your PR is Merged

1. Delete your feature branch (locally and on GitHub)
2. Update your local main branch:
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

---

## Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

While we're working on expanding test coverage, here are guidelines for writing tests:

**Unit Tests**
- Test individual functions/components in isolation
- Use descriptive test names
- Follow AAA pattern: Arrange, Act, Assert

**Example:**
```typescript
describe('formatMessage', () => {
  it('should remove HTML tags from message', () => {
    // Arrange
    const input = '<p>Hello <b>world</b></p>';
    
    // Act
    const result = formatMessage(input);
    
    // Assert
    expect(result).toBe('Hello world');
  });
});
```

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Application builds without errors
- [ ] No console errors in browser DevTools
- [ ] Model loading works correctly
- [ ] UI is responsive on different screen sizes
- [ ] Feature works in Chrome, Firefox, and Edge
- [ ] Service Worker functions properly (if applicable)

---

## Documentation

### README Updates

Update the README.md when:
- Adding new features that users should know about
- Changing setup/installation instructions
- Modifying configuration options
- Adding new dependencies with special requirements

### Code Comments

- Use JSDoc format for functions, classes, and complex logic
- Explain **why**, not **what** - code should be self-explanatory
- Add TODO comments for future improvements

**Example:**
```typescript
/**
 * Loads a model with automatic fallback to alternative CDNs
 * if the primary source is unavailable.
 * 
 * @param modelName - Name of the model to load (e.g., "Llama-3.1-8B")
 * @param config - Optional model configuration
 * @returns Promise that resolves when model is loaded
 * @throws {NetworkError} When all CDN sources fail
 */
async function loadModelWithFallback(
  modelName: string, 
  config?: ModelConfig
): Promise<void> {
  // Implementation
}
```

### Inline Documentation

- Comment complex algorithms or non-obvious code
- Add references to issues or discussions for context
- Document workarounds with reasons

---

## Community

### Getting Help

- **GitHub Issues** - For bug reports and feature requests
- **GitHub Discussions** - For questions and community support
- **Discord** - Join the [MLC.ai Discord](https://discord.gg/9Xpy2HGBuD) for real-time chat

### Reporting Bugs

Use the bug report template and include:
- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser and OS information
- Screenshots or error messages
- Any relevant console logs

### Suggesting Features

Use the feature request template and include:
- Problem description - what are you trying to solve?
- Proposed solution - how would you implement it?
- Alternatives considered
- Additional context or examples

### Security Issues

**Do not** report security vulnerabilities in public issues. Instead:
- Email the maintainers directly
- Provide detailed information privately
- Allow time for a fix before public disclosure

---

## Issue Labels

Understanding issue labels helps you find ways to contribute:

### Priority Labels
- `priority: critical` - Urgent fixes needed
- `priority: high` - Important issues
- `priority: medium` - Standard priority
- `priority: low` - Nice to have

### Type Labels
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `question` - Questions or discussions

### Status Labels
- `good first issue` - Great for newcomers
- `help wanted` - Extra attention needed
- `wontfix` - Won't be worked on
- `duplicate` - Already reported

### Area Labels
- `models` - Related to model support
- `ui` - User interface changes
- `performance` - Performance improvements
- `webgpu` - WebGPU related issues

---

## Additional Resources

### Useful Links
- [WebLLM Documentation](https://llm.mlc.ai/docs/deploy/webllm.html)
- [MLC-LLM Project](https://github.com/mlc-ai/mlc-llm)
- [WebGPU Specification](https://www.w3.org/TR/webgpu/)
- [Next.js Documentation](https://nextjs.org/docs)

### Learning Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Documentation](https://react.dev/)
- [WebGPU Fundamentals](https://webgpufundamentals.org/)

---

## Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Community highlights in Discord

---

## Questions?

If you have questions not covered in this guide:
1. Check existing [GitHub Discussions](https://github.com/mlc-ai/web-llm-chat/discussions)
2. Ask in [Discord](https://discord.gg/9Xpy2HGBuD)
3. Open a new discussion

---

Thank you for contributing to WebLLM Chat! 🎉

Your contributions help make AI more accessible to everyone.
