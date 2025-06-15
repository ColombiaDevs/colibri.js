/**
 * @fileoverview Main entry point for Colibrí.js core
 *
 * This file exports the public API of Colibrí.js following
 * the Interface Segregation Principle - users can import only what they need.
 */

// Export reactivity primitives
export { ref, computed, watchEffect } from "./reactivity.js";

// Export virtual DOM functions
export { h, mount, patch } from "./vdom.js";

// Export component system
export {
  createApp,
  onMounted,
  onUnmounted,
  onUpdated,
  getCurrentInstance,
} from "./component.js";

// Export hooks
export {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  useFetch,
} from "./hooks.js";

/**
 * Framework version
 * @type {string}
 */
export const VERSION = "0.1.0";

/**
 * Register a plugin with the framework
 * @param {Object} plugin - Plugin object with install method
 * @param {Object} [options] - Plugin options
 */
export function use(plugin, options = {}) {
  // TODO: Implement plugin registration system
  console.warn("Plugin system not implemented");
}
