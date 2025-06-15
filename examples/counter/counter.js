/**
 * @fileoverview Counter example application using Colibrí.js
 *
 * This example demonstrates a simple counter application built with
 * Colibrí.js core features including reactive state, components, and
 * event handling, following SOLID principles.
 */

// Import core Colibrí.js features from the framework
import { createApp, h, ref, onMounted } from "../../src/core/index.js";

/**
 * Counter Component
 * @returns {Function} Render function for the counter component
 */
function CounterComponent() {
  // Create reactive state using ref
  const count = ref(0);

  // Methods
  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    if (count.value > 0) {
      count.value--;
    }
  };

  const reset = () => {
    count.value = 0;
  };

  // Lifecycle hooks
  onMounted(() => {
    console.log("Counter component mounted!");
  });

  // Return render function - this creates the virtual DOM
  return () =>
    h("div", { class: "counter" }, [
      h("h1", null, "Colibrí.js Counter"),
      h("p", { class: "count" }, count.value.toString()),
      h("div", { class: "buttons" }, [
        h(
          "button",
          {
            class: "decrement",
            onClick: decrement,
          },
          "Decrement"
        ),
        h(
          "button",
          {
            class: "reset",
            onClick: reset,
          },
          "Reset"
        ),
        h(
          "button",
          {
            class: "increment",
            onClick: increment,
          },
          "Increment"
        ),
      ]),
    ]);
}

// Create and mount the app
const app = createApp(CounterComponent);
app.mount("#app");

// Export the app instance for potential reuse
export default app;
