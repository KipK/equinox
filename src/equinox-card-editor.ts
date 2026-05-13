import { LitElement, css, html } from "lit";
import { EDITOR_TAG } from "./const";
import { HVAC_ICONS, HVAC_ORDER, PRESET_ICONS, PRESET_ORDER } from "./data/climate-modes";
import { ensureHaComponents } from "./ha/load-components";
import { localize } from "./localize/localize";
import { DEFAULT_CONFIG } from "./types/config";
import type { EquinoxCardConfigInput } from "./types/config";
import type { HaFormChangedEvent, HaFormSchema, HassEntity, HomeAssistant, LovelaceCardEditor } from "./types/ha";

void ensureHaComponents();

function cleanEditorConfig(config: EquinoxCardConfigInput): EquinoxCardConfigInput {
  const cleaned = { ...config };
  delete (cleaned as { card_height?: unknown }).card_height;

  if (!Array.isArray(cleaned.hidden_hvac_modes) || cleaned.hidden_hvac_modes.length === 0) {
    delete cleaned.hidden_hvac_modes;
  }

  if (!Array.isArray(cleaned.hidden_preset_modes) || cleaned.hidden_preset_modes.length === 0) {
    delete cleaned.hidden_preset_modes;
  }

  return cleaned;
}

export class EquinoxCardEditor extends LitElement implements LovelaceCardEditor {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _activeTab: { state: true }
  };

  static styles = css`
    .tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--divider-color);
      flex-wrap: wrap;
    }

    .tab {
      border: 0;
      border-bottom: 2px solid transparent;
      background: transparent;
      color: var(--secondary-text-color);
      padding: 8px 12px;
      font: inherit;
      cursor: pointer;
    }

    .tab[active] {
      border-bottom-color: var(--primary-color);
      color: var(--primary-text-color);
    }

    .options-panel {
      display: grid;
      gap: 12px;
    }

    .options-help,
    .options-empty {
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 1.4;
    }

    .checkbox-list {
      display: grid;
      gap: 8px;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: var(--card-background-color);
      cursor: pointer;
    }

    .checkbox-item:hover {
      border-color: var(--primary-color);
    }

    .checkbox-item input {
      margin: 0;
      accent-color: var(--primary-color);
    }

    .checkbox-label {
      color: var(--primary-text-color);
      font: inherit;
    }
  `;

  hass?: HomeAssistant;

  private _config: EquinoxCardConfigInput = {};
  private _activeTab: "general" | "presentation" | "hvac" | "preset" = "general";

  setConfig(config: EquinoxCardConfigInput): void {
    this._config = cleanEditorConfig(config);
  }

  protected render() {
    const language = this.hass?.locale?.language ?? this.hass?.language;
    const data = { ...DEFAULT_CONFIG, ...this._config };

    return html`
      <div class="tabs">
        <button class="tab" ?active=${this._activeTab === "general"} @click=${() => { this._activeTab = "general"; }}>
          ${localize(language, "editor.tabs.general")}
        </button>
        <button class="tab" ?active=${this._activeTab === "presentation"} @click=${() => { this._activeTab = "presentation"; }}>
          ${localize(language, "editor.tabs.presentation")}
        </button>
        <button class="tab" ?active=${this._activeTab === "hvac"} @click=${() => { this._activeTab = "hvac"; }}>
          ${localize(language, "editor.tabs.hvac")}
        </button>
        <button class="tab" ?active=${this._activeTab === "preset"} @click=${() => { this._activeTab = "preset"; }}>
          ${localize(language, "editor.tabs.preset")}
        </button>
      </div>
      ${this._activeTab === "general" || this._activeTab === "presentation"
        ? html`
            <ha-form
              .hass=${this.hass}
              .data=${data}
              .schema=${this._activeTab === "presentation" ? this._presentationSchema(language) : this._generalSchema(language)}
              .computeLabel=${this._computeLabel(language)}
              @value-changed=${this._valueChanged}
            ></ha-form>
          `
        : this._renderVisibilityTab(language, this._activeTab)}
    `;
  }

  private _renderVisibilityTab(language: string | undefined, tab: "hvac" | "preset") {
    const options = tab === "hvac" ? this._supportedHvacModes() : this._supportedPresetModes();
    const hidden = new Set(tab === "hvac" ? this._config.hidden_hvac_modes ?? [] : this._config.hidden_preset_modes ?? []);
    const emptyKey = tab === "hvac" ? "editor.visibility.no_hvac_modes" : "editor.visibility.no_presets";

    return html`
      <div class="options-panel">
        <div class="options-help">${localize(language, "editor.visibility.help")}</div>
        ${options.length === 0
          ? html`<div class="options-empty">${localize(language, this._config.entity ? emptyKey : "editor.visibility.no_entity")}</div>`
          : html`
              <div class="checkbox-list">
                ${options.map((option) => {
                  const checked = !hidden.has(option);

                  return html`
                    <label class="checkbox-item">
                      <input
                        type="checkbox"
                        .checked=${checked}
                        @change=${(event: Event) => this._toggleVisibility(tab, option, (event.currentTarget as HTMLInputElement).checked)}
                      />
                      <span class="checkbox-label">${tab === "hvac" ? this._hvacLabel(language, option) : this._presetLabel(language, option)}</span>
                    </label>
                  `;
                })}
              </div>
            `}
      </div>
    `;
  }

  private _generalSchema(language?: string): HaFormSchema[] {
    return [
      {
        name: "entity",
        selector: {
          entity: {
            domain: ["climate"]
          }
        }
      },
      {
        name: "name",
        selector: {
          text: {}
        }
      },
      {
        name: "diagnostic_entity",
        selector: {
          entity: {
            domain: ["sensor"]
          }
        }
      },
      {
        name: "power_entity",
        selector: {
          entity: {
            domain: ["sensor", "input_number"]
          }
        }
      },
      {
        name: "humidity_entity",
        selector: {
          entity: {
            domain: ["sensor"]
          }
        }
      },
      {
        name: "temperature_entity",
        selector: {
          entity: {
            domain: ["sensor"]
          }
        }
      },
      {
        name: "additional_dashboards",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: localize(language, "editor.options.additional_dashboards.auto") },
              { value: "custom", label: localize(language, "editor.options.additional_dashboards.custom") },
              { value: "disabled", label: localize(language, "editor.options.additional_dashboards.disabled") }
            ]
          }
        }
      }
    ];
  }

  private _presentationSchema(language?: string): HaFormSchema[] {
    const orientationOptions = [
      { value: "horizontal", label: localize(language, "editor.options.layout_orientation.horizontal") },
      { value: "vertical", label: localize(language, "editor.options.layout_orientation.vertical") }
    ];

    const schema: HaFormSchema[] = [
      {
        name: "disable_name",
        selector: {
          boolean: {}
        }
      },
      {
        name: "theme",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "flat", label: localize(language, "editor.options.theme.flat") },
              { value: "liquid_glow", label: localize(language, "editor.options.theme.liquid_glow") }
            ]
          }
        }
      },
      {
        name: "display_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "classic", label: localize(language, "editor.options.display_mode.classic") },
              { value: "compact", label: localize(language, "editor.options.display_mode.compact") }
            ]
          }
        }
      },
      {
        name: "primary_display",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "setpoint", label: localize(language, "editor.options.primary_display.setpoint") },
              { value: "sensors", label: localize(language, "editor.options.primary_display.sensors") }
            ]
          }
        }
      },
      {
        name: "state_icons_layout",
        selector: {
          select: {
            mode: "dropdown",
            options: orientationOptions
          }
        }
      },
      {
        name: "hide_lock_button",
        selector: {
          boolean: {}
        }
      }
    ];

    if (this._config.theme === "liquid_glow") {
      schema.push({
        name: "border_glow_on_action",
        selector: {
          boolean: {}
        }
      });
    }

    return schema;
  }

  private _climateEntity(): HassEntity | undefined {
    const entityId = this._config.entity;

    return entityId ? this.hass?.states[entityId] : undefined;
  }

  private _attributeModes(attribute: "hvac_modes" | "preset_modes"): string[] {
    const value = this._climateEntity()?.attributes[attribute];

    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter((entry): entry is string => typeof entry === "string");
  }

  private _supportedHvacModes(): string[] {
    const available = new Set(this._attributeModes("hvac_modes"));

    return HVAC_ORDER.filter((mode) => available.has(mode) && HVAC_ICONS[mode]);
  }

  private _supportedPresetModes(): string[] {
    const available = new Set(this._attributeModes("preset_modes"));

    return PRESET_ORDER.filter((preset) => available.has(preset) && preset !== "none" && PRESET_ICONS[preset]);
  }

  private _hvacLabel(language: string | undefined, mode: string): string {
    const label = localize(language, `main.hvac.${mode}`);

    return label === `main.hvac.${mode}` ? mode : label;
  }

  private _presetLabel(language: string | undefined, preset: string): string {
    const label = localize(language, `main.preset.${preset}`);

    return label === `main.preset.${preset}` ? preset : label;
  }

  private _computeLabel(language?: string): (schema: HaFormSchema) => string {
    return (schema: HaFormSchema) => localize(language, `editor.${schema.name}`);
  }

  private _emitConfigChanged(): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      })
    );
  }

  private _toggleVisibility(tab: "hvac" | "preset", value: string, checked: boolean): void {
    const key = tab === "hvac" ? "hidden_hvac_modes" : "hidden_preset_modes";
    const current = new Set(this._config[key] ?? []);

    if (checked) {
      current.delete(value);
    } else {
      current.add(value);
    }

    this._config = cleanEditorConfig({
      ...this._config,
      [key]: current.size > 0 ? [...current] : undefined
    });

    this._emitConfigChanged();
  }

  private _valueChanged(event: HaFormChangedEvent<EquinoxCardConfigInput>): void {
    this._config = cleanEditorConfig({ ...this._config, ...event.detail.value });
    this._emitConfigChanged();
  }
}

if (!customElements.get(EDITOR_TAG)) {
  customElements.define(EDITOR_TAG, EquinoxCardEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    "equinox-card-editor": EquinoxCardEditor;
  }
}
