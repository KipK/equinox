import { DEFAULT_HA_COMPONENTS, loadHaComponents } from "@kipk/load-ha-components";

let loadPromise: Promise<void> | undefined;

export function ensureHaComponents(): Promise<void> {
  loadPromise ??= loadHaComponents(DEFAULT_HA_COMPONENTS);

  return loadPromise;
}
