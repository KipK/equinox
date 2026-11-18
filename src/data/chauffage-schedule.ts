import type { EquinoxCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/ha";

// ha-chauffage (https://github.com/armellarcier/ha-chauffage) serves its frontend module on every
// page through add_extra_js_url, so its documented Lovelace card element is globally defined
// whenever the integration is set up.
export const CHAUFFAGE_DOMAIN = "chauffage";
export const CHAUFFAGE_SCHEDULE_CARD_TAG = "chauffage-programme-card";

export function chauffageIntegrationLoaded(hass: HomeAssistant | undefined): boolean {
  return hass?.config?.components?.includes(CHAUFFAGE_DOMAIN) === true;
}

export function chauffageScheduleCardDefined(): boolean {
  return typeof customElements !== "undefined" && customElements.get(CHAUFFAGE_SCHEDULE_CARD_TAG) !== undefined;
}

export function chauffageScheduleAvailable(
  hass: HomeAssistant | undefined,
  config: EquinoxCardConfig | undefined
): boolean {
  return (
    config?.show_schedule !== false &&
    typeof config?.entity === "string" &&
    config.entity.startsWith("climate.") &&
    chauffageIntegrationLoaded(hass) &&
    chauffageScheduleCardDefined()
  );
}

// Configuration of the embedded ha-chauffage card, limited to the Equinox thermostat.
export function chauffageScheduleCardConfig(entity: string): Record<string, unknown> {
  return { type: `custom:${CHAUFFAGE_SCHEDULE_CARD_TAG}`, thermostats: [entity] };
}
