import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    dedupe: ["lit", "lit-html", "@lit/reactive-element", "@kipk/load-ha-components"]
  },
  build: {
    lib: {
      entry: "src/equinox-card.ts",
      name: "EquinoxCard",
      formats: ["es"],
      fileName: () => "equinox-card.js"
    },
    rolldownOptions: {
      output: {
        entryFileNames: "equinox-card.js"
      }
    }
  }
});
