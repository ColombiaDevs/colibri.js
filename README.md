# Colibrí.js

> **"Simplicity, modularity and expressiveness for modern frontend"**

<!-- Badges -->
[![npm version](https://img.shields.io/npm/v/@colombiadevs/colibrijs.svg)](https://www.npmjs.com/package/@colombiadevs/colibrijs)
[![Coverage Status](https://img.shields.io/codecov/c/github/ColombiaDevs/colibrijs.svg)](https://codecov.io/gh/ColombiaDevs/colibrijs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Colibrí.js** is a lightweight JavaScript framework for building reactive user interfaces. Created by and for the [r/ColombiaDevs](https://www.reddit.com/r/ColombiaDevs/) community, the project prioritizes simplicity, learning, and full transparency into how a UI framework works under the hood.

This repository contains the framework's source code and tools to support community-driven development with a focus on educational exploration and practical application.

---

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install @colombiadevs/colibrijs

# Using yarn
yarn add @colombiadevs/colibrijs
```

### Basic Example

```js
import { createApp, h, ref } from '@colombiadevs/colibrijs';

function Counter() {
  const count = ref(0);

  return () => h('div', null, [
    h('p', null, `Count: ${count.value}`),
    h('button', { onClick: () => count.value++ }, 'Increment')
  ]);
}

createApp(Counter).mount('#app');
```

---

## 💾 Requirements

- **Node.js** ≥ 18
- **npm** ≥ 8 or **Yarn** ≥ 1.22
- **Git** ≥ 2.25
- Recommended: VS Code with Biome, and GitLens extensions

---

## 🧭 Framework Philosophy

- **Simplicity**: Minimal and intuitive APIs with zero dependencies
- **Transparency**: Understandable internal workings
- **Modularity**: Use only what you need
- **Extensibility**: Designed to be extended through hooks and plugins
- **Pedagogy**: Facilitates learning of modern UI concepts

All framework components are designed following the SOLID principles, ensuring maintainability and flexibility.

---

## 📖 Documentation

### Main Guides

- [🚀 Getting Started](./docs/getting-started.md) - First steps with Colibrí.js
- [📚 API Reference](./docs/api-reference.md) - Complete documentation of all APIs
- [🔄 Hooks](./docs/hooks-reference.md) - Detailed guide on the hooks system
- [🏛️ Architecture](./docs/architecture.md) - Framework structure and design

### Development and Contribution

- [🚣️ Roadmap](./docs/roadmap.md) - Detailed development plan by phases
- [📝 Development Plan](./docs/development-plan.md) - Fundamental principles and organization
- [🧩 Patterns](./docs/patterns.md) - Component patterns and best practices

### Principles and Concepts

- [🔧 SOLID Principles](./docs/solid-principles.md) - Application of SOLID principles in Colibrí.js
- [📕 Glossary](./docs/glossary.md) - Technical terms and key concepts

---

## 🗂 Directory Structure

```plaintext
colibrijs/
├── .github/           # GitHub Actions, templates
├── docs/              # Architecture, roadmap, internal design
├── examples/          # Demo apps for testing framework behavior
├── scripts/           # CLI and automation tools
├── src/               # Framework source (compiler, runtime, hooks)
│   ├── core/
│   ├── compiler/
│   └── runtime/
├── tests/             # Unit and integration tests (Vitest)
├── README.md
├── package.json
└── vite.config.js
````

---

## 🛠 Development Workflow

1. **Clone & install**

   ```bash
   git clone https://github.com/ColombiaDevs/colibrijs.git
   cd colibrijs
   npm install
   ```

2. **Branching model**
   - `main`: Production-ready release code
   - `develop`: Active development
   - `feature/*`: New features
   - `bugfix/*`: Fixes and small patches
   - `hotfix/*`: Urgent fixes to be released immediately

3. **Scripts**

   ```jsonc
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "serve": "vite preview",
       "test": "vitest",
       "test:ci": "vitest run",
       "coverage": "vitest run --coverage"
     }
   }
   ```

4. **Testing**
   - Uses [Vitest](https://vitest.dev/) for fast, native ES module testing
   - Coverage reporting via `vitest run --coverage`

5. **Code standards**
   - ES2020+ syntax
   - Type declarations in `src/types/`

6. **Pull Requests**
   - Use Conventional Commits (e.g., `feat:`, `fix:`, `refactor:`)
   - Open PRs against `develop`
   - Run all checks before submitting

---

## 📈 Roadmap

| Phase       | Milestones                                                         | ETA         |
| ----------- | ------------------------------------------------------------------ | ----------- |
| **MVP**     | Core compiler, runtime reactivity, basic router, minimal demo      | Weeks 1–2   |
| **Phase 1** | Nested components, lifecycle hooks, custom hooks API, unit tests   | Weeks 3–5   |
| **Phase 2** | CLI scaffold, HMR, build optimization, ESLint/Prettier integration | Weeks 6–8   |
| **Phase 3** | Plugin system, theming & CSS‑in‑JS support, E2E testing setup      | Weeks 9–12  |
| **Phase 4** | Performance benchmarks, comprehensive docs, v1.0 release prep      | Weeks 13–16 |

Full details in [docs/roadmap.md](docs/roadmap.md).

---

## 🔌 Plugin & Extension System

Planned capabilities for plugin hooks:

- Compiler hooks (`preprocess`, `transform`)
- Runtime lifecycle hooks (`onMount`, `onDestroy`)
- CLI templates for scaffolding projects

---

## 🧪 Tooling Stack

- **Vite**: Development/build tool (ESM-native)
- **Vitest**: Unit and integration testing
- **Biome**: Code quality
- **Husky**: Git hooks
- **TypeScript Declarations*- (planned): Public API typings

---

## 📤 Package Publishing

Scoped under `@colombiadevs`:

```bash
npm install @colombiadevs/colibrijs
```

Internal builds are not yet published. Stable builds will be versioned semantically and published via GitHub Actions.

---

## 🤜 Contributing

This project thrives on collaboration! To get involved:

- Review [CONTRIBUTING.md](CONTRIBUTING.md) for code standards and workflow
- Before getting started, please review:
  - [Development Plan](./docs/development-plan.md) to understand the project direction
  - [Roadmap](./docs/roadmap.md) to learn about specific microtasks
  - [SOLID Principles](./docs/solid-principles.md) to maintain architectural coherence
- Join the discussion on [r/ColombiaDevs](https://www.reddit.com/r/ColombiaDevs/)
- Submit feedback, bugs, ideas, or PRs 🚀

---

## 📄 License

MIT © [ColombiaDevs](https://github.com/ColombiaDevs)
See [`LICENSE`](./LICENSE) for full terms.
