import { defineConfig } from "vite";

export default defineConfig({
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
