import { defineConfig } from "vite";
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

const LANGUAGES_SRC = resolve("src/localize/languages");
const TRANSLATIONS_DEST = resolve("dist/translations");

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
  },
  plugins: [
    {
      name: "copy-translations",
      closeBundle() {
        mkdirSync(TRANSLATIONS_DEST, { recursive: true });
        for (const file of readdirSync(LANGUAGES_SRC).filter((f) => f.endsWith(".json"))) {
          copyFileSync(join(LANGUAGES_SRC, file), join(TRANSLATIONS_DEST, file));
        }
      }
    }
  ]
});
