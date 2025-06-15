# Technical Glossary for Colibrí.js

> **"Let's speak the same language"**
> Standardized terms and concepts for all Colibrí.js documentation

---

## A

### API (Application Programming Interface)

Set of definitions and protocols that enable communication between different software components. In Colibrí.js, it refers to the public functions and methods that can be used by developers.

### AST (Abstract Syntax Tree)

Tree representation of the abstract syntactic structure of source code. Colibrí.js uses ASTs to analyze and transform components during the compilation phase.

---

## C

### Compiler

System that transforms Colibrí.js code (.cjs or .colibri files) into executable JavaScript. Includes the parser, AST transformers, and code generator.

### Component

Basic user interface unit in Colibrí.js. It's a function that accepts props (properties) and returns a render function that returns a virtual node or VNode.

### Computed

Reactively derived value calculated from other reactive signals that automatically updates when its dependencies change.

---

## D

### Diffing

Algorithm that compares two VNode trees to determine the minimum differences needed to update the DOM. Also called reconciliation.

### Directive

Special instruction applied to DOM elements that provides additional behaviors, such as event handling or conditional rendering.

---

## E

### Effect

Function that executes when the reactive signals it uses internally change. Similar to an observer that reacts to changes in the reactive system.

### State

Data that controls the behavior and representation of a component. In Colibrí.js, it is managed through reactive signals (`ref`).

---

## H

### Hook

Function that allows "hooking into" Colibrí.js component features, such as state or lifecycle. Always begin with the prefix `use`.

### Hyperscript (`h`)

Function that creates virtual nodes (VNodes) for the virtual DOM. Accepts a type (tag or component), properties, and children.

---

## M

### Microtask

Minimal unit of work in Colibrí.js development. Small, self-contained, and well-defined work packages.

### Module

Organizational unit of code in Colibrí.js that groups related functionalities (for example, reactivity module, VDOM module).

### Mounting

Process of inserting a component into the real DOM after its initial creation.

---

## P

### Patch

Operation that applies the differences found by the diffing algorithm to the real DOM.

### Plugin

Extension that adds functionality to Colibrí.js without modifying its source code, using the framework's official extension points.

### Props

Properties passed to a component from its parent component. Analogous to attributes in HTML.

---

## R

### Reactive

Programming paradigm where state changes automatically propagate through the system, updating the user interface when necessary.

### Ref (Reference)

Reactive container that wraps a value and notifies subscribers when that value changes. Main reactive primitive in Colibrí.js.

### Rendering

Process of generating the representation of a component in the DOM based on its current state.

### Router

System that handles navigation between different views in a single-page application (SPA), without needing to reload the entire page.

---

## S

### SFC (Single File Component)

File that contains the structure (template), logic (script), and styles (style) of a component in one place. In Colibrí.js, they use the extension `.cjs` or `.colibri`.

### Signal

Observable value that notifies subscribers when it changes. In Colibrí.js, it is implemented through the `ref()` function.

### Slot

Mechanism that allows parent components to pass content to be rendered inside child components at specific locations.

### SOLID

Set of five object-oriented design principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) applied to the architecture of Colibrí.js.

---

## T

### Testing

Process of verifying the correct functioning of code through unit, integration, and end-to-end tests.

---

## V

### VDOM (Virtual DOM)

In-memory representation of the DOM structure that allows efficiently comparing changes before updating them in the real DOM.

### VNode (Virtual Node)

JavaScript object that represents a DOM element in the Virtual DOM. Contains type, properties, and children.

---

> This glossary is a living document that will be updated as the framework evolves. If you find missing terms or terms that need clarification, please contribute to its improvement.
