import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
// If you create a plugin for .colibri files:
// import colibriPlugin from './scripts/vite-plugin-colibri';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: __dirname, // project root directory
  base: './', // base public path
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // import shortcut
    },
    extensions: [
      '.js',
      '.json' /*, '.colibri' if you use a custom extension */,
    ],
  },
  server: {
    port: 3000, // dev server port
    open: true, // open browser on start
    strictPort: true, // fail if port is already in use
    hmr: {
      // customize hot module replacement if needed
    },
  },
  build: {
    outDir: 'dist', // output directory for build
    sourcemap: true, // generate source maps
    rollupOptions: {
      input: path.resolve(__dirname, 'public/index.html'), // entry HTML
      output: {
        // configure multiple formats (ESM, UMD) here if desired
      },
    },
  },
  plugins: [
    // your plugin to transform .colibri into JS
    // colibriPlugin(),
    // legacy plugin for older browser support:
    // legacy({
    //   targets: ['defaults', 'not IE 11']
    // })
  ],
})
