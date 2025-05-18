import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    globals: true, // enable global describe/it/expect
    environment: 'jsdom', // simulate a browser DOM in Node
    include: ['tests/**/*.test.[jt]s'], // match test files
    coverage: {
      provider: 'istanbul', // coverage engine
      reporter: ['text', 'lcov'], // output formats
      exclude: ['node_modules/', 'scripts/', 'examples/'],
    },
    alias: {
      '@': path.resolve(__dirname, 'src'), // same alias as Vite
    },
    setupFiles: ['./tests/setup.js'], // files to run before tests
  },
})
