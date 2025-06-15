# Architecture of Colibrí.js

> **"Under the hood of your hummingbird."**
> A deep dive into the core design and modules that power Colibrí.js

---

## 1. High-Level Overview

Colibrí.js is split into three main layers, each with clear responsibilities and extension points that follow [SOLID principles](./solid-principles.md):

```plaintext

┌───────────────────────────────────────────┐
│           User-facing API                │
│  • createApp, h(), ref(), useEffect()    │
│  • Router component, plugin hooks        │
└──────────────┬────────────────────────────┘
│
┌──────────────▼──────────────┐   Plugins & Extensions
│    Compiler & Bundling      │   • preprocess / transform hooks
│  • Parser → AST             │   • Codegen to JS + sourcemaps
│  • Single-file component     │
│    support (.colibri/.cjs)  │
└──────────────┬──────────────┘
│
┌──────────────▼──────────────┐   Runtime Libraries
│     Runtime Core            │   • Reactive signals & effects
│  • Virtual DOM & Diffing    │   • Component lifecycle
│  • Renderer (patch & mount) │   • Router view swapping
└─────────────────────────────┘

```

---

## 2. Project Structure

```plaintext
colibrijs/
├── src/
│   ├── compiler/      # SFC parser, AST, codegen
│   │   ├── parser.ts
│   │   ├── ast.ts
│   │   └── codegen.ts
│   ├── core/          # Component abstraction & mounting
│   │   ├── app.ts
│   │   └── component.ts
│   ├── runtime/       # VDOM, reactivity, scheduler
│   │   ├── vdom.ts
│   │   ├── diff.ts
│   │   ├── patch.ts
│   │   └── scheduler.ts
│   ├── hooks/         # Built-in hook implementations
│   │   ├── useState.ts
│   │   ├── useEffect.ts
│   │   └── lifecycle.ts
│   └── router/        # Minimal hash-based router
│       ├── router.ts
│       └── link.ts
├── tests/             # Vitest unit & integration tests
├── examples/          # Demo apps showing patterns
└── docs/              # Guides & API reference
```

---

## 3. Compiler Layer

### 3.1 Parser & AST

* **Entry**: Single-file components (`.colibri`, `.cjs`) with `<template>`, `<script>`, optional `<style>`.
* **Output**: AST representing:

  * Template tree (elements, text, bindings)
  * Script block (import statements, setup function)

### 3.2 Code Generation

* **Transforms**:

  * Template AST → `h()` calls (hyperscript) with static/dynamic parts
  * Inject `ref()` and reactive binding wrappers
  * Add lifecycle hook registrations
* **Plugins**:
  Hooks for `preprocess` (e.g. JSX support), `transform` (e.g. CSS modules), `postprocess` (sourcemaps).

---

## 4. Runtime Core

### 4.1 Virtual DOM

* **`vdom.ts`**: Defines `VNode` shape (type, props, children).
* **`diff.ts`**: Compares old/new VNode trees, produces minimal patch operations.
* **`patch.ts`**: Applies patches to the real DOM.

### 4.2 Reactivity System

* **`ref()`**: Creates a reactive signal holding a `.value`.
* **`effect()`**: Tracks dependencies, re-runs callbacks on signal changes.
* **`computed()`** (optional): Lazy cached derivations.

### 4.3 Scheduler

* Batches multiple updates into a single DOM patch for performance.
* Uses microtask queue (`Promise.resolve().then(...)`) to flush effects.

---

## 5. Component & Hooks

### 5.1 Component Model (`core/component.ts`)

* **Factory**: `createApp(rootComponent)` returns an app instance.

* **Mount**: `app.mount('#selector')`:

  1. Instantiate root component
  2. Call its render function to produce VNode tree
  3. Patch into the DOM

* **Props & Slots**:

  * Props passed in as a reactive object.
  * Default slot support for children.

### 5.2 Lifecycle Hooks (`hooks/lifecycle.ts`)

* `onMount(callback)`: runs after DOM insertion.
* `onUpdate(callback)`: runs after reactive state updates.
* `onUnmount(callback)`: runs before component removal.

### 5.3 Custom Hooks API

* **`useState(initial)`** → alias for `ref(initial)`.
* **`useEffect(fn, deps?)`** → dependency-aware effect.
* Extendable via user-defined hooks, living in `src/hooks/`.

---

## 6. Router

* **Hash-based** by default (`#/home`, `#/about`).
* `<Router>` component listens to `window.onhashchange`.
* `<Link>` helper updates `location.hash` without full reload.
* Registers route definitions via `router.define(path, component)`.

---

## 7. Extension Points

1. **Compiler Plugins**

   * `preprocess(code, id)`: transform source before parsing.
   * `transform(ast, codegenContext)`: modify AST or codegen output.
2. **Runtime Plugins**

   * Hook into lifecycle events (e.g. analytics, cross-component state).
3. **CLI Hooks**

   * Custom templates (`colibri init --template my-template`).

---

## 8. Performance & Optimizations

* **Tree-shaking**: ESM exports allow bundlers to eliminate unused code.
* **Lazy loading**: Dynamic imports for routes or components.
* **Minimal re-renders**: Fine-grained reactivity tracks only used signals.
* **Batching**: All updates in one tick via scheduler.

---

## 9. Further Reading

* **API Reference**: `docs/api-reference.md`
* **Roadmap & Milestones**: `docs/roadmap.md`
* **Component Patterns**: `docs/patterns.md`
* **Plugin Development**: `docs/plugins.md`

---

> **Build small. Learn deeply. Scale when ready.**
> Colibrí.js © ColombiaDevs · MIT License
