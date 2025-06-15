# SOLID Principles in Colibrí.js

> **"Clean code, robust architecture."**
> Guide to applying SOLID principles in Colibrí.js development

---

## Introduction to SOLID Principles

SOLID principles are five fundamental principles of object-oriented programming and software design that aim to create more maintainable, flexible, and scalable systems. In Colibrí.js, these principles guide both the framework design and recommended practices for developers using it.

---

## S - Single Responsibility Principle

> "A class should have one, and only one, reason to change"

### Application in Colibrí.js

- **Focused modules and components**: Each framework module has a single, clearly defined responsibility.
- **Clear separation of concerns**: Differentiation between reactivity, rendering, and state management.

### Practical example

```js
// ❔ Component with multiple responsibilities
function UserDashboard() {
  const userData = ref(null);
  const isLoading = ref(true);

  // Data management, UI, and navigation in a single component
  const fetchUserData = async () => {
    const data = await apiCall('/user');
    userData.value = data;
    isLoading.value = false;
  };

  onMount(fetchUserData);

  return () => h('div', null, /* ... Complex UI ... */);
}

// ✅ Separation of responsibilities with custom hooks
function useUserData() {
  const userData = ref(null);
  const isLoading = ref(true);

  const fetchUserData = async () => {
    isLoading.value = true;
    userData.value = await apiCall('/user');
    isLoading.value = false;
  };

  onMount(fetchUserData);

  return { userData, isLoading, refetch: fetchUserData };
}

// Component focused only on UI
function UserDashboard() {
  const { userData, isLoading } = useUserData();

  return () => h('div', null, /* Simple UI that consumes data */);
}
```

---

## O - Open/Closed Principle

> "Software entities should be open for extension, but closed for modification"

### Application in Colibrí.js

- **Plugin system**: Allows extending functionality without modifying core code.
- **Customizable hooks**: Stable interfaces that enable custom behaviors.

### Practical example

```js
// ❌ System difficult to extend
function renderComponent(component, props) {
  // Rigid logic that requires modifying the function
  if (component.type === 'basic') {
    return createBasicComponent(component, props);
  } else if (component.type === 'advanced') {
    return createAdvancedComponent(component, props);
  }
  // Adding a new type requires modifying this function
}

// ✅ Extensible system through handler registration
const componentRenderers = {
  basic: createBasicComponent,
  advanced: createAdvancedComponent
};

// Extensible without modifying the original function
function registerComponentRenderer(type, renderer) {
  componentRenderers[type] = renderer;
}

function renderComponent(component, props) {
  const renderer = componentRenderers[component.type];
  if (!renderer) throw new Error(`Unknown component type: ${component.type}`);
  return renderer(component, props);
}

// Extending with a new type:
registerComponentRenderer('custom', createCustomComponent);
```

---

## L - Liskov Substitution Principle

> "Objects in a program should be replaceable with instances of their subtypes without altering the correctness of the program"

### Application in Colibrí.js

- **Consistent interfaces**: APIs with predictable behaviors regardless of implementation.
- **Clear contracts**: Explicit documentation of what each function expects and returns.

### Practical example

```js
// ❌ Violation of the Liskov principle
class BaseComponent {
  render() {
    return h('div', null, 'Base content');
  }
}

class ExtendedComponent extends BaseComponent {
  // Changes the contract by requiring an unexpected argument
  render(specialFlag) {
    if (specialFlag) {
      return h('span', null, 'Special content');
    }
    return super.render();
  }
}

// ✅ Respecting the substitution principle
class BaseComponent {
  render() {
    return h('div', null, this.getContent());
  }

  getContent() {
    return 'Base content';
  }
}

class ExtendedComponent extends BaseComponent {
  // Overrides the method designed for extension
  getContent() {
    return 'Extended content';
  }

  // render() maintains its original contract
}
```

---

## I - Interface Segregation Principle

> "Clients should not be forced to depend upon interfaces that they do not use"

### Application in Colibrí.js

- **Modular APIs**: Selective import of only what's necessary.
- **Specific hooks**: Each hook performs a well-defined function.

### Practical example

```js
// ❌ Large interface that forces unnecessary dependencies
import { entireFramework } from '@colombiadevs/colibríjs';

function SimpleComponent() {
  // Only uses a small part but loads everything
  return () => entireFramework.h('div', null, 'Hello');
}

// ✅ Specific imports
import { h } from '@colombiadevs/colibríjs/core';
// We only import what we need

function SimpleComponent() {
  return () => h('div', null, 'Hello');
}
```

---

## D - Dependency Inversion Principle

> "High-level modules should not depend on low-level modules. Both should depend on abstractions"

### Application in Colibrí.js:

- **Dependency injection**: Components receive their dependencies instead of creating them.
- **Use of abstractions**: Common interface for interchangeable services.

### Practical example:

```js
// ❌ Direct dependency on implementation
function UserProfile() {
  // Direct dependency on the implementation
  const httpClient = new HttpClient();

  const fetchUser = () => {
    return httpClient.get('/user');
  };

  return () => /* ... */;
}

// ✅ Dependency inversion
// Abstract interface definition
function createHttpClient(implementation) {
  return implementation;
}

// Usage with dependency injection
function useUser(httpClient) {
  const fetchUser = () => {
    return httpClient.get('/user');
  };

  return { fetchUser };
}

function UserProfile({ httpClient }) {
  const { fetchUser } = useUser(httpClient);

  return () => /* ... */;
}

// In the application composition:
const app = createApp(() => h(UserProfile, { httpClient: myHttpImplementation }));
```

---

## Application of SOLID in Colibrí.js Development

The following table shows how each phase of Colibrí.js development applies the SOLID principles:

| Phase                | Main Focus                 | SOLID Principles                                                                              |
| -------------------- | -------------------------- | --------------------------------------------------------------------------------------------- |
| MVP                  | Compiler and Runtime Core  | S: Clear separation between compilation and runtime <br /> O: Extensible design of the parser |
| Components and Hooks | Nested component system    | L: Components as interchangeable substitutes <br /> I: Specific hooks for each need           |
| Tools                | DevTools and extensions    | O: Well-defined extension points <br /> D: Tools depend on abstractions, not implementations  |
| Plugins              | Extension ecosystem        | O: Extensible framework <br /> I: Minimal interfaces for each plugin type                     |
| 1.0 Release          | Optimization and stability | S: Modules with clear responsibilities <br /> D: Inverted dependencies for testing            |

---

> For more information on the specific implementation of these principles in the codebase, please refer to the architecture documentation and design patterns.
