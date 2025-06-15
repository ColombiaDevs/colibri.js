/**
 * @fileoverview Core reactivity system for Colibrí.js
 *
 * This module provides the foundation for Colibrí's reactive state management.
 * Currently contains placeholder implementations awaiting educational completion.
 */

/**
 * Creates a reactive reference that triggers updates when its value changes
 * @template T
 * @param {T} initialValue - The initial value to store in the ref
 * @returns {{value: T}} - A reactive reference object with a value property
 */
export function ref(initialValue) {
  // TODO: Implement a full reactive reference system that:
  // 1. Tracks when the .value property is accessed (dependency tracking)
  // 2. Notifies subscribers when .value is modified
  // 3. Integrates with the rest of the reactivity system
  console.warn("ref() is a placeholder - reactive updates will not work!");

  return { value: initialValue };
}

/**
 * Creates a computed value that automatically updates when its dependencies change
 * @template T
 * @param {() => T} getter - Function that computes and returns a value
 * @returns {{value: T}} - A read-only reference containing the computed value
 */
export function computed(getter) {
  // TODO: Implement a computed value system that:
  // 1. Lazily evaluates the getter function
  // 2. Caches the result until dependencies change
  // 3. Tracks its own dependencies automatically
  // 4. Is read-only (value cannot be directly assigned)
  console.warn(
    "computed() is a placeholder - values will not update reactively!"
  );

  return { value: getter() };
}

/**
 * Runs an effect function and automatically tracks its reactive dependencies
 * @param {Function} effect - The effect function to run
 * @returns {Function} - Function to stop the effect
 */
export function watchEffect(effect) {
  // TODO: Implement a reactive effect system that:
  // 1. Runs the effect once immediately
  // 2. Tracks which reactive values are accessed during execution
  // 3. Re-runs the effect when any of those dependencies change
  // 4. Provides proper cleanup to avoid memory leaks
  console.warn("watchEffect() is a placeholder - will not track changes!");

  effect();
  return () => console.warn("Effect cleanup is a no-op");
}
