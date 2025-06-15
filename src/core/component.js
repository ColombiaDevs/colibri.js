/**
 * @fileoverview Component system for Colibrí.js
 *
 * This module provides the foundation for Colibrí's component system.
 * Currently contains placeholder implementations for educational purposes.
 */

import { h, mount } from "./vdom.js";

// Context tracking for lifecycle hooks and component instance
let currentInstance = null;

/**
 * Registers a callback to run when component is mounted
 * @param {Function} hook - Function to call on mount
 */
export function onMounted(hook) {
  // TODO: Implement lifecycle hook registration system that:
  // 1. Associates hooks with current component instance
  // 2. Calls hooks at the right time in component lifecycle
  // 3. Provides proper cleanup and error handling
  console.warn(
    "Lifecycle hooks system not implemented - onMounted() is a no-op"
  );
}

/**
 * Registers a callback to run when component is unmounted
 * @param {Function} hook - Function to call on unmount
 */
export function onUnmounted(hook) {
  // TODO: Implement unmount hook registration
  console.warn(
    "Lifecycle hooks system not implemented - onUnmounted() is a no-op"
  );
}

/**
 * Registers a callback to run when component is updated
 * @param {Function} hook - Function to call on update
 */
export function onUpdated(hook) {
  // TODO: Implement update hook registration
  console.warn(
    "Lifecycle hooks system not implemented - onUpdated() is a no-op"
  );
}

/**
 * Gets the current active component instance
 * @returns {Object|null} Current component instance or null if not in component context
 */
export function getCurrentInstance() {
  // TODO: Implement proper component instance context management
  console.warn("Component instance tracking not implemented");
  return currentInstance;
}

/**
 * Creates an application instance
 * @param {Function} rootComponent - Root component function
 * @returns {Object} Application API object
 */
export function createApp(rootComponent) {
  // TODO: Implement full application lifecycle that:
  // 1. Creates component tree from root component
  // 2. Manages component mounting and lifecycle
  // 3. Handles updates through the virtual DOM system
  // 4. Implements proper event handling and reactivity

  console.warn("Component system is a minimal placeholder");

  // Return minimal app API
  return {
    /**
     * Mount the application to a DOM element
     * @param {string|Element} selector - CSS selector or DOM element
     * @returns {Object} App instance
     */
    mount(selector) {
      const container =
        typeof selector === "string"
          ? document.querySelector(selector)
          : selector;

      if (!container) {
        console.error(`Container not found: ${selector}`);
        return this;
      }

      // Display placeholder to indicate missing implementation
      container.innerHTML = "";
      const placeholder = document.createElement("div");
      placeholder.textContent = "Colibrí.js component system not implemented";
      container.appendChild(placeholder);

      return this;
    },

    /**
     * Register a plugin with the application
     * @param {Object} plugin - Plugin with install method
     * @returns {Object} App instance for chaining
     */
    use(plugin) {
      console.warn("Plugin system not implemented");
      return this;
    },
  };
}
