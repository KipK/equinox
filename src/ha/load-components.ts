import { loadHaComponents } from "@kipk/load-ha-components";

const HA_COMPONENTS = [
  "ha-form",
  "ha-icon",
  "ha-entity-picker",
  "ha-dialog",
  "ha-control-circular-slider",
  "ha-control-button",
  "ha-icon-button",
  "ha-color-picker",
  "ha-md-list",
  "ha-md-list-item",
  "ha-input-chip"
];

let loadPromise: Promise<void> | undefined;

export function ensureHaComponents(): Promise<void> {
  loadPromise ??= loadHaComponents(HA_COMPONENTS);

  return loadPromise;
}
