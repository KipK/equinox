import {
  HaComponentsLoadError,
  loadHaComponents as loadRequestedHaComponents,
} from "@kipk/load-ha-components";

const HA_COMPONENTS = [
  "ha-form",
  "ha-icon",
  "ha-entity-picker",
  "ha-dialog",
  "ha-control-circular-slider",
  "ha-control-button",
  "ha-icon-button",
  "ha-icon-picker",
  "ha-color-picker",
  "ha-input-chip"
];

let loadPromise: Promise<void> | undefined;
let loadWarningShown = false;

export function ensureHaComponents(): Promise<void> {
  if (HA_COMPONENTS.every((component) => customElements.get(component))) {
    return Promise.resolve();
  }

  loadPromise ??= loadComponents();

  return loadPromise;
}

async function loadComponents(): Promise<void> {
  try {
    await loadRequestedHaComponents(HA_COMPONENTS);
  } catch (error) {
    loadPromise = undefined;
    if (!loadWarningShown) {
      loadWarningShown = true;
      if (error instanceof HaComponentsLoadError) {
        console.warn(
          `[equinox-card] Failed to load Home Assistant UI components. Missing: ${error.result.missing.join(", ") || "unknown"}.`,
          error.cause ?? error,
        );
      } else {
        console.warn("[equinox-card] Failed to load Home Assistant UI components.", error);
      }
    }
    throw error;
  }
}
