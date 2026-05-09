import { LitElement, css, html } from "lit";
import { EDITOR_TAG } from "./const";
import { ensureHaComponents } from "./ha/load-components";
import { localize } from "./localize/localize";
import { DEFAULT_CONFIG } from "./types/config";
import type { EquinoxCardConfigInput } from "./types/config";
import type { HaFormChangedEvent, HaFormSchema, HomeAssistant, LovelaceCardEditor } from "./types/ha";

void ensureHaComponents();

function cleanEditorConfig(config: EquinoxCardConfigInput): EquinoxCardConfigInput {
  const cleaned = { ...config };
  delete (cleaned as { card_height?: unknown }).card_height;

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
  `;

  hass?: HomeAssistant;

  private _config: EquinoxCardConfigInput = {};
  private _activeTab: "general" | "presentation" = "general";

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
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._activeTab === "presentation" ? this._presentationSchema(language) : this._generalSchema(language)}
        .computeLabel=${this._computeLabel(language)}
        @value-changed=${this._valueChanged}
      ></ha-form>
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

    return [
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
  }

  private _computeLabel(language?: string): (schema: HaFormSchema) => string {
    return (schema: HaFormSchema) => localize(language, `editor.${schema.name}`);
  }

  private _valueChanged(event: HaFormChangedEvent<EquinoxCardConfigInput>): void {
    this._config = cleanEditorConfig({ ...this._config, ...event.detail.value });

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      })
    );
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
