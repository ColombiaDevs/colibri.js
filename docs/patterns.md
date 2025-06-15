# Component & Design Patterns in Colibrí.js

> **"Pattern over abstraction. Function over framework. Simplicity first."**

A practical guide for writing expressive, maintainable, and scalable components with Colibrí.js, applying SOLID principles.

---

## Design Philosophy

- **Functional composition**: small, reusable components ([Single Responsibility Principle](./solid-principles.md#s---principio-de-responsabilidad-%C3%BAnica-single-responsibility)).
- **Transparent reactivity**: easy to follow [signals](./glossary.md#se%C3%B1al-signal) and [effects](./glossary.md#efecto-effect).
- **Minimal API surface**: maximum power with few functions ([Interface Segregation Principle](./solid-principles.md#i---principio-de-segregaci%C3%B3n-de-interfaces-interface-segregation)).
- **Extensibility**: [hooks](./hooks-reference.md) and plugins as natural extension points ([Open/Closed Principle](./solid-principles.md#o---principio-de-abiertocerrado-openclosed)).

This guide illustrates how to implement components and design patterns that adhere to [SOLID principles](./solid-principles.md), with practical examples for each use case. For a complete reference of the terminology used, check the [glossary](./glossary.md).

---

## 1. Stateless Functional Components

Purely presentational components:

```js
import { h } from '@colombiadevs/colibrijs';

function Greeting({ name }) {
  return () => h('h1', null, `Hello, ${name}!`);
}
````

**Uso:**

```js
import { createApp, h } from '@colombiadevs/colibrijs';

createApp(() => () => h(Greeting, { name: 'Sara' })).mount('#app');
```

**SOLID principles applied:**

- **Single Responsibility (S)**: The component has a single responsibility - to display a greeting.
- **Interface Segregation (I)**: It only receives the necessary props (name), without unnecessary dependencies.

---

## 2. Reactive Local State with `ref()`

Manages the internal state of a component:

```js
import { h, ref } from '@colombiadevs/colibrijs';

function Counter() {
  const count = ref(0);

  return () =>
    h('div', null, [
      h('p', null, `Count: ${count.value}`),
      h('button', { onClick: () => count.value++ }, 'Increment')
    ]);
}
```

> **Tip**: Define your signals (`ref`) **before** the render function so that the library detects them correctly.

**SOLID principles applied:**

- **Single Responsibility (S)**: State management is encapsulated within the component.
- **Open/Closed (O)**: The reactive system allows extending functionality without modifying the implementation of `ref`.

---

## 3. Custom Hooks for Reusable Logic

Extract logic to hooks:

```js
// src/hooks/useToggle.ts
import { ref } from '@colombiadevs/colibrijs';

export function useToggle(initial = false) {
  const state = ref(initial);
  const toggle = () => (state.value = !state.value);
  return [state, toggle] as const;
}
```

**In a component:**

```js
import { h } from '@colombiadevs/colibrijs';
import { useToggle } from './hooks/useToggle';

function LightSwitch() {
  const [on, toggle] = useToggle();

  return () =>
    h('button', { onClick: toggle }, on.value ? 'ON' : 'OFF');
}
```

**SOLID principles applied:**

- **Single Responsibility (S)**: The hook handles a single specific functionality.
- **Dependency Inversion (D)**: The component depends on abstractions (the hook) rather than concrete implementations.
- **Interface Segregation (I)**: The hook exposes only what's necessary (state and toggle).

---

## 4. Slots and Component Composition

Pass children (slots) implicitly:

```js
import { h } from '@colombiadevs/colibrijs';

function Card(_, children) {
  return () => h('div', { class: 'card' }, children);
}

function App() {
  return () =>
    h(Card, null, [
      h('h2', null, 'Welcome'),
      h('p', null, 'This is a slot example.')
    ]);
}
```

**SOLID principles applied:**

- **Open/Closed (O)**: The Card component can receive any child content without needing to modify its implementation.
- **Dependency Inversion (D)**: The container component does not know the implementation details of its children.
- **Single Responsibility (S)**: The Card component is only responsible for providing the container, not the content.

---

## 5. Controlled Forms

Bind inputs to signals:

```js
import { h, ref } from '@colombiadevs/colibrijs';

function InputBox() {
  const value = ref('');

  return () =>
    h('input', {
      type: 'text',
      value: value.value,
      onInput: e => (value.value = (e.target as HTMLInputElement).value)
    });
}
```

**Principios SOLID aplicados:**

- **Responsabilidad Única (S)**: El componente maneja exclusivamente la entrada de un campo de texto.
- **Abierto/Cerrado (O)**: El comportamiento del input puede extenderse sin modificar su implementación base.

---

## 6. Routing Declarativo

```js
import { createApp, h } from '@colombiadevs/colibrijs';
import { createRouter, Link, RouterView } from '@colombiadevs/colibrijs/router';
import Home from './pages/Home';
import About from './pages/About';

const router = createRouter([
  { path: '/', component: Home },
  { path: '/about', component: About }
]);

function App() {
  return () =>
    h('div', null, [
      h('nav', null, [
        h(Link, { to: '#/' }, 'Home'),
        h(Link, { to: '#/about' }, 'About')
      ]),
      h(RouterView)
    ]);
}

createApp(App).use(router).mount('#app');
```

- `<Link>`: navigation without reload.
- `<RouterView>`: space where the active route is rendered.

**SOLID principles applied:**

- **Open/Closed (O)**: The routing system allows adding new routes without modifying existing code.
- **Liskov Substitution (L)**: Any component can be used as a route destination without affecting the router's functionality.
- **Dependency Inversion (D)**: The router depends on abstractions (generic components) and not on specific implementations.

---

## 7. Render Props & Higher-Order Patterns

Allows passing render functions as props:

```js
import { h } from '@colombiadevs/colibrijs';

function RenderPropExample({ render }: { render: () => any }) {
  return () =>
    h('div', null, [
      h('p', null, 'Above'),
      render(),
      h('p', null, 'Below')
    ]);
}
```

**SOLID principles applied:**

- **Single Responsibility (S)**: The component focuses on providing a structure, delegating the rendering of the central content.
- **Dependency Inversion (D)**: The component depends on an abstraction (render function) instead of a specific implementation.
- **Interface Segregation (I)**: It only receives the props it needs (the render function).

---

## 8. Cleanup with `onUnmount`

Register effects and clean them up when unmounting:

```js
import { h, ref, onUnmount } from '@colombiadevs/colibrijs';

function Clock() {
  const now = ref(new Date().toLocaleTimeString());

  const timer = setInterval(() => {
    now.value = new Date().toLocaleTimeString();
  }, 1000);

  onUnmount(() => clearInterval(timer));

  return () => h('p', null, `Time: ${now.value}`);
}
```

**SOLID principles applied:**

- **Single Responsibility (S)**: The component has a clear responsibility and manages its own lifecycle.
- **Open/Closed (O)**: The hooks system allows extending the lifecycle without modifying the internal implementation of the component.

---

## 9. Best Practices

| Practice                       | Reason                                        | SOLID Principle           |
| ------------------------------ | --------------------------------------------- | ------------------------- |
| Small and focused components   | Better readability and reusability            | S - Single Responsibility |
| Hooks for shared logic         | Facilitates testing and decoupling            | D - Dependency Inversion  |
| Write tests alongside code     | Ensures stability and facilitates refactoring | O - Open/Closed           |
| Avoid unnecessary global state | Improves predictability and eases maintenance | S - Single Responsibility |
| Import only what's necessary   | Keeps bundles lightweight                     | I - Interface Segregation |

---

## 10. Testing Patterns

With [Vitest](https://vitest.dev/):

- **Hooks**: pure function testing.
- **Components**: mount and check declarative output.
- **Reactive effects**: simulate changes in signals and verify effects.

```js
import { useToggle } from '../src/hooks/useToggle';
import { describe, it, expect } from 'vitest';

describe('useToggle', () => {
  it('toggles boolean state', () => {
    const [state, toggle] = useToggle(true);
    expect(state.value).toBe(true);
    toggle();
    expect(state.value).toBe(false);
  });
});
```

**SOLID principles applied:**

- **Single Responsibility (S)**: Each test evaluates a specific behavior of the component or hook.
- **Open/Closed (O)**: The tests allow refactoring the internal implementation without changing the tests as long as the public interface is maintained.
- **Liskov Substitution (L)**: The tests ensure that components comply with their interface contracts.

---

> **Build small. Learn deeply. Scale when ready.**
> Colibrí.js © ColombiaDevs · MIT License
