# Getting Started with Colibrí.js

> **"Your first flight with Colibrí.js"**
> A beginner-friendly guide to setting up and running a Colibrí.js app, a minimal, zero-dependency frontend micro-framework you can master in minutes.

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js** ≥ 18.x
- **npm** ≥ 8.x  (or **Yarn** ≥ 1.22)
- **Git** ≥ 2.25
- A modern code editor (we recommend [VS Code](https://code.visualstudio.com/) + [Biome](https://biomejs.dev/) + [GitLens](https://gitlens.amod.io/))

---

## Installation

You can consume Colibrí.js either via a CDN `<script>` tag or as an npm package.

### CDN

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Colibrí.js CDN Example</title>
</head>
<body>
  <div id="app"></div>

  <!-- Load Colibrí.js from jsDelivr -->
  <script src="https://cdn.jsdelivr.net/npm/@colombiadevs/colibrijs/dist/colibrijs.umd.js"></script>
  <script>
    // Your code goes here
  </script>
</body>
</html>
```

### npm / Yarn

```bash
# with npm
npm install @colombiadevs/colibrijs

# with Yarn
yarn add @colombiadevs/colibrijs
```

---

## Your First App

Let’s build a simple “Hello, World!” counter component.

1. **Create an HTML file**

   ```html
   <!-- public/index.html -->
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <title>Colibrí.js App</title>
   </head>
   <body>
     <div id="app"></div>
     <script type="module" src="/src/main.js"></script>
   </body>
   </html>
   ```

2. **Scaffold the entry point**

   ```js
   // src/main.js
   import { createApp, h, ref } from '@colombiadevs/colibrijs';

   function Counter() {
     const count = ref(0);

     return () =>
       h(
         'div',
         null,
         h('h1', null, `Count: ${count.value}`),
         h(
           'button',
           { onClick: () => (count.value += 1) },
           'Increment'
         )
       );
   }

   // Mount the Counter component to #app
   createApp(Counter).mount('#app');
   ```

3. **Run in development**

   If you have a simple server (e.g., [Vite](https://vitejs.dev/)), add this to your `package.json`:

   ```jsonc
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     },
     "devDependencies": {
       "vite": "^4.0.0"
     }
   }
   ```

   Then run:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` (or the port shown in your terminal) to see your counter in action!

---

## Development Commands

| Command            | Description                           |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Start dev server with HMR             |
| `npm run build`    | Produce optimized ESM & UMD bundles   |
| `npm run preview`  | Preview the production build locally  |
| `npm test`         | Run unit & integration tests (Vitest) |
| `npm run coverage` | Generate code coverage report         |

---

## Project Structure

A typical Colibrí.js project has the following structure, designed with maintainability and [SOLID principles](./solid-principles.md) in mind:

```plaintext
colibrijs/
├── .github/           # CI workflows, issue/PR templates
├── docs/              # Guides, API reference, roadmap
├── examples/          # Demo apps for reference
├── scripts/           # CLI & build scripts
├── src/               # Framework source (core, compiler, runtime)
│   ├── core/
│   ├── compiler/
│   └── runtime/
├── tests/             # Vitest unit & integration tests
├── public/            # Static assets & HTML entry
├── package.json
├── vite.config.js
└── getting-started.md
```

---

## Learn More

- **API Reference**: `docs/api-reference.md`
- **Architecture & Internals**: `docs/architecture.md`
- **Full Roadmap**: `docs/roadmap.md`
- **Examples**: `examples/basic-app`, `examples/advanced-app`

---

## Contribute

We love community contributions!

1. Fork the repo & create a branch:

   ```bash
   git checkout -b feature/your-feature develop
   ```

2. Implement your feature or fix.
3. Write tests in `tests/` and ensure `npm test` passes.
4. Submit a Pull Request against `develop`, using Conventional Commits:

   ```plaintext
   feat: add new X feature
   fix: correct Y bug
   ```

5. Join discussions on [r/ColombiaDevs](https://www.reddit.com/r/ColombiaDevs/) or our Discord.

---

> **Start small. Learn deeply. Build fast.**
> Colibrí.js © ColombiaDevs · [MIT License](LICENSE)
