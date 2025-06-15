# API Reference

> A complete, alphabetical listing of all public APIs in **Colibrí.js**.
> This reference documents all public framework APIs, designed following the [SOLID principles](./solid-principles.md).

For a complete understanding of the terminology used, check the [glossary](./glossary.md) and [hooks reference](./hooks-reference.md).

---

## Table of Contents

- [Global API](#global-api)
- [Reactivity](#reactivity)
- [Component](#component)
- [Lifecycle Hooks](#lifecycle-hooks)
- [Router](#router)
- [Utilities](#utilities)
- [Plugin Hooks](#plugin-hooks)

---

## Global API

### `createApp(rootComponent: ComponentFactory): AppInstance`

Bootstraps a Colibrí.js application.

**Applied SOLID principles:**

- **S (Single Responsibility)**: Encapsulates the creation and configuration of the application.
- **O (Open/Closed)**: Allows extending the application through plugins without modifying the core.
- **D (Dependency Inversion)**: Accepts the root component as an external dependency.

- **Parameters**
  - `rootComponent` — A function or class that returns a render function (VNode factory).
- **Returns**
  - `AppInstance` with methods:
    - `.mount(selector: string | HTMLElement): void` — Mounts app into DOM container.
    - `.use(plugin: Plugin): void` — Installs a plugin before mounting.
    - `.unmount(): void` — Tears down the app and unmounts from DOM.

---

## Reactivity

### `ref<T>(initialValue: T): Signal<T>`

Creates a reactive [signal](./glossary.md#señal-signal).

**Applied SOLID principles:**

- **S (Single Responsibility)**: Encapsulates a single reactive value and its operations.
- **O (Open/Closed)**: Reactive behavior can be extended without modifying the implementation.

- **Parameters**
  - `initialValue` — The initial state value.
- **Returns**
  - `Signal<T>` — An object with a mutable `.value` property; reading registers dependencies, writing triggers effects.

### `computed<T>(computeFn: () => T): ComputedSignal<T>`

Creates a lazily-evaluated, cached derivation of one or more signals.

- **Parameters**
  - `computeFn` — A function that reads other signals and returns a computed value.
- **Returns**
  - `ComputedSignal<T>` — A read-only signal whose `.value` updates when dependencies change.

### `effect(fn: () => void): void`

Runs a reactive side‐effect whenever any accessed signals change.

- **Parameters**
  - `fn` — A function that reads signals; re‐runs automatically on dependency updates.

---

## Component

> Components are simple functions that return a render function. You can also define them as objects with lifecycle hooks.

```ts
type ComponentFactory<Props = any> = (props?: Props) => RenderFunction;
type RenderFunction = () => VNode;
```

- **Usage Example**

  ```js
  function MyComponent({ title }) {
    const count = ref(0);
    return () => h('div', null, [
      h('h1', null, title),
      h('button', { onClick: () => (count.value += 1) }, `Count: ${count.value}`)
    ]);
  }
  ```

---

## Lifecycle Hooks

These hooks can only be called *inside* a component setup function (before returning the render function).

### `onMount(fn: () => void): void`

Called once after the component’s root DOM is inserted.

- **Parameters**

  - `fn` — Callback invoked post‐mount.

### `onUpdate(fn: () => void): void`

Called after every reactive update *in* the component.

- **Parameters**

  - `fn` — Callback invoked post‐update.

### `onUnmount(fn: () => void): void`

Called just before the component is removed from the DOM.

- **Parameters**

  - `fn` — Cleanup callback.

---

## Router

### `createRouter(routes: RouteRecord[]): RouterInstance`

Instantiates a hash-based router.

- **Parameters**

  - `routes` — Array of route definitions:

    ```ts
    interface RouteRecord {
      path: string;           // e.g. '/home' or '/users/:id'
      component: ComponentFactory;
    }
    ```

- **Returns**

  - `RouterInstance` with:

    - `.mount(selector: string | HTMLElement): void` — Mounts the current route’s component.
    - `.push(path: string): void` — Programmatic navigation.
    - `.onChange(listener: (to: string, from: string) => void): void` — Subscribe to route changes.

---

### `<Router />` Component

A declarative wrapper that you can mount within your app:

```js
import { createApp, h } from '@colombiadevs/colibrijs';
import { Router } from '@colombiadevs/colibrijs/router';

createApp(() => () => h(Router)).mount('#app');
```

- Listens to `window.location.hash` by default.
- Renders the matching route’s component.

### `<Link>` Component

Generates in-app navigation without full page reload.

- **Props**

  | Prop      | Type                 | Description                                       |
  | --------- | -------------------- | ------------------------------------------------- |
  | `to`      | `string`             | Hash path to navigate to (e.g. `#/about`)         |
  | `replace` | `boolean` (optional) | Use `history.replaceState` instead of `pushState` |

- **Usage**

  ```js
  h(Link, { to: '#/about' }, 'About Us')
  ```

---

## Utilities

### `h(tag: string | ComponentFactory, props?: Record<string, any>, children?: VNodeChild[]): VNode`

Hyperscript helper to create virtual DOM nodes.

- **Parameters**

  - `tag` — HTML tag name or a component factory.
  - `props` — Attributes, event handlers (`onClick`, `onInput`, etc.).
  - `children` — Text or array of VNodes.

### `watch<T>(signal: Signal<T>, cb: (newVal: T, oldVal: T) => void): StopHandle`

Subscribe to a single signal’s changes.

- **Parameters**

  - `signal` — A `Signal<T>` to watch.
  - `cb` — Callback with `newVal` and `oldVal`.
- **Returns**

  - `StopHandle` — `{ stop(): void }` to unsubscribe.

---

## Plugin Hooks

You can extend the compiler or runtime by passing a plugin object to `app.use()` before mounting.

```ts
interface Plugin {
  name: string;
  // Compiler stage:
  preprocess?: (code: string, id: string) => string | Promise<string>;
  transform?: (ast: AST, context: CodegenContext) => void;
  // Runtime stage:
  onComponentInit?: (componentInstance: ComponentInstance) => void;
  onComponentMount?: (componentInstance: ComponentInstance) => void;
}
```

- **Example**

  ```js
  const logPlugin = {
    name: 'logger',
    onComponentMount(c) {
      console.log(`[Colibrí] Mounted`, c);
    }
  };

  createApp(App).use(logPlugin).mount('#app');
  ```

---

## SOLID in Colibrí.js API

The Colibrí.js API has been designed strictly following the [SOLID principles](./solid-principles.md):

- **S (Single Responsibility)**: Each API has a single well-defined responsibility.
- **O (Open/Closed)**: APIs are designed to be extensible without modifying their internal code.
- **L (Liskov Substitution)**: Derived components can substitute base ones without affecting behavior.
- **I (Interface Segregation)**: APIs offer minimal and specific interfaces for each use case.
- **D (Dependency Inversion)**: The framework depends on abstractions rather than concrete implementations.

For a deeper exploration of patterns and advanced usage, check [patterns.md](patterns.md), [hooks-reference.md](./hooks-reference.md) and [architecture](./architecture.md).

---

> **Note:** All APIs are tree-shakeable—import only what you need to keep bundle sizes minimal.
