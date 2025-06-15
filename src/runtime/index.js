/**
 * @fileoverview Runtime module for Colibrí.js
 *
 * This module connects the core and compiler systems, providing
 * a unified runtime environment for Colibrí.js applications.
 */

import { createApp, h } from "../core/index.js";
import { compile } from "../compiler/index.js";

/**
 * Creates an application from an HTML template
 * @param {string} template - HTML template
 * @param {Object} data - Component data/state
 * @param {Object} methods - Component methods
 * @returns {Object} Application instance
 */
export function createTemplateApp(template, data = {}, methods = {}) {
  // TODO: Implement template-based app creation
  console.warn("Template app creation needs implementation");

  // Get placeholder render function from compiler
  const render = compile(template);

  // Create basic component
  function TemplateComponent() {
    return () => render(h);
  }

  // Return minimal app
  return createApp(TemplateComponent);
}

/**
 * Plugin system functions
 */
export const plugins = {
  /**
   * Registered plugins
   */
  _plugins: [],

  /**
   * Register a plugin
   * @param {Object} plugin - Plugin object
   * @param {Object} [options] - Plugin options
   */
  register(plugin, options = {}) {
    // TODO: Implement plugin registration and lifecycle
    console.warn("Plugin system needs implementation");
    this._plugins.push(plugin);
  },
};

/**
 * Runtime utilities
 */
export const utils = {
  /**
   * Deep clone an object
   * @template T
   * @param {T} obj - Object to clone
   * @returns {T} Cloned object
   */
  clone(obj) {
    // TODO: Implement proper deep cloning
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Simple event emitter
   * @returns {Object} Event emitter
   */
  createEventEmitter() {
    // TODO: Implement full event system with proper cleanup
    console.warn("Event emitter needs implementation");

    return {
      on(event, callback) {
        // TODO: Implement event subscription
        return () => {}; // Return dummy unsubscribe function
      },

      off(event, callback) {
        // TODO: Implement event unsubscription
      },

      emit(event, ...args) {
        // TODO: Implement event emission
      },
    };
  },
};
