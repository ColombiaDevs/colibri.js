/**
 * @fileoverview Core hooks system for Colibrí.js
 *
 * Implements a collection of useful hooks for components, following
 * the Interface Segregation Principle with focused, single-purpose hooks.
 */

import { ref, computed } from "./reactivity.js";
import { onMounted, onUnmounted } from "./component.js";

/**
 * Creates a stateful value and a function to update it
 * @template T
 * @param {T} initialValue - The initial state
 * @returns {[Object, Function]} State and setter
 */
export function useState(initialValue) {
  const state = ref(initialValue);
  const setState = (newValue) => {
    state.value = newValue;
  };

  return [state, setState];
}

/**
 * Creates a memoized value that only changes when dependencies change
 * @template T
 * @param {Function} factory - Function that returns a value
 * @param {Array} deps - Dependencies array
 * @returns {Object} Memoized value
 */
export function useMemo(factory, deps = []) {
  // TODO: Implement proper dependency tracking for memoization
  console.warn("useMemo() needs implementation");
  return ref(factory()).value;
}

/**
 * Creates a memoized callback that only changes when dependencies change
 * @param {Function} callback - Function to memoize
 * @param {Array} deps - Dependencies array
 * @returns {Function} Memoized callback
 */
export function useCallback(callback, deps = []) {
  // TODO: Implement callback memoization with dependency tracking
  console.warn("useCallback() needs implementation");
  return callback;
}

/**
 * Runs side effects in response to reactive changes
 * @param {Function} effect - Effect function
 * @param {Array} deps - Dependencies array
 */
export function useEffect(effect, deps = []) {
  // TODO: Implement proper dependency tracking for effects
  console.warn("useEffect() needs implementation");

  // Only runs on mount and unmount currently
  onMounted(() => effect());
}

/**
 * Creates a mutable ref object that persists across renders
 * @template T
 * @param {T} initialValue - Initial ref value
 * @returns {{current: T}} Mutable ref object
 */
export function useRef(initialValue) {
  // TODO: Implement proper ref object that persists
  console.warn("useRef() needs implementation");
  return { current: initialValue };
}

/**
 * Fetches data from a URL and handles the response
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Object} Fetch state
 */
export function useFetch(url, options = {}) {
  // TODO: Implement data fetching with loading and error states
  console.warn("useFetch() needs implementation");

  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);

  // Return placeholder state
  return {
    data,
    loading,
    error,
    refetch: () => console.warn("Refetch not implemented"),
  };
}
