# Hooks Reference

> **"A complete guide to hooks in Colibrí.js"**
> Detailed reference of all native hooks and patterns for creating custom hooks

---

## Introduction to Hooks

Hooks in Colibrí.js are functions that allow you to "hook into" reactive features and component lifecycle. They follow a design inspired by React hooks but with a focus on simplicity and transparency of the reactive system.

### Design Principles

Hooks in Colibrí.js follow these design principles:

1. **Composition over inheritance**: We favor composition of functionality
2. **Clear purpose per hook**: Each hook has a well-defined responsibility
3. **Predictable and consistent**: Clear and documented behavior
4. **Extensible**: System designed for creating custom hooks
5. **Full integration with the reactive system**: Leverage the framework's reactivity

---

## Lifecycle Hooks

### `onMount(callback: () => void | (() => void)): void`

Executes once when the component is mounted in the DOM.

**Parameters**:

- `callback`: Function that executes on mount. Can return a cleanup function.

**Example**:

```js
import { onMount, ref } from '@colombiadevs/colibrijs';

function Timer() {
  const seconds = ref(0);
  let intervalId;

  onMount(() => {
    intervalId = setInterval(() => {
      seconds.value++;
    }, 1000);

    // Optional cleanup function
    return () => clearInterval(intervalId);
  });

  return () => h('p', null, `Seconds: ${seconds.value}`);
}
```

### `onUnmount(callback: () => void): void`

Executes just before the component is removed from the DOM.

**Parameters**:

- `callback`: Cleanup function that executes before unmounting.

**Example**:

```js
import { onUnmount } from '@colombiadevs/colibrijs';

function Component() {
  // Set up some external resource
  const resource = setupResource();

  onUnmount(() => {
    // Clean up resource when component is removed
    resource.dispose();
  });

  return () => h('div', null, 'Component with cleanup');
}
```

### `onUpdate(callback: () => void): void`

Executes after each reactive rendering of the component.

**Parameters**:

- `callback`: Function that executes after each update.

**Example**:

```js
import { onUpdate, ref } from '@colombiadevs/colibrijs';

function Counter() {
  const count = ref(0);

  onUpdate(() => {
    console.log(`Counter updated to: ${count.value}`);
  });

  return () => h('button', {
    onClick: () => count.value++
  }, `Clicks: ${count.value}`);
}
```

---

## State and Effect Hooks

### `useState<T>(initialValue: T): Signal<T>`

Convenient alias for `ref()` that creates a reactive value. Designed for familiarity with hooks from other frameworks.

**Parameters**:

- `initialValue`: Initial state value.

**Returns**:

- `Signal<T>`: A reactive object with a `.value` property.

**Example**:

```js
import { useState } from '@colombiadevs/colibrijs';

function Counter() {
  const count = useState(0);

  return () => h('div', null, [
    h('p', null, `Count: ${count.value}`),
    h('button', { onClick: () => count.value++ }, 'Increment')
  ]);
}
```

### `useEffect(effect: () => void | (() => void), deps?: any[]): void`

Executes a side effect that can depend on a specific set of dependencies.

**Parameters**:

- `effect`: Function to execute. Can return a cleanup function.
- `deps`: (Optional) Array of dependencies that, when changed, trigger the re-execution of the effect.

**Example**:

```js
import { useEffect, ref } from '@colombiadevs/colibrijs';

function UserProfile({ userId }) {
  const user = ref(null);

  // The effect will run again if userId changes
  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      if (!cancelled) {
        user.value = data;
      }
    }

    fetchUser();

    return () => { cancelled = true; };
  }, [userId]);

  return () => /* render profile */;
}
```

---

## Custom Hooks

Custom hooks in Colibrí.js are normal functions that can use other hooks. They follow the `useX` naming convention.

### Ejemplo: `useFetch`

```js
import { ref } from '@colombiadevs/colibrijs';

export function useFetch(url, options = {}) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      data.value = json;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  onMount(fetchData);

  return { data, error, loading, refetch: fetchData };
}
```

**Uso**:

```js
function PostList() {
  const { data: posts, loading, error } = useFetch('/api/posts');

  return () => {
    if (loading.value) return h('p', null, 'Loading...');
    if (error.value) return h('p', null, `Error: ${error.value.message}`);

    return h('ul', null,
      posts.value.map(post => h('li', { key: post.id }, post.title))
    );
  };
}
```

### Principles for Creating Custom Hooks

1. **Composition**: Custom hooks can use other hooks
2. **Reusability**: Extract common logic to multiple components
3. **Encapsulation**: Hide complex implementation details
4. **Testability**: Hooks are pure functions, easy to test

---

## Rules of Hooks

To ensure the correct functioning of hooks in Colibrí.js:

1. **Only call hooks at the top level** of a component or inside other hooks
2. **Don't call hooks conditionally** or inside loops
3. **Name custom hooks starting with "use"** for clarity and consistency
4. **Maintain the same sequence of hook calls** between renders

---

> **"Simple components, reusable logic."**
> Colibrí.js © ColombiaDevs · MIT License
