import { LitElement, html } from "lit";
import { EDITOR_TAG } from "./const";
import { ensureHaComponents } from "./ha/load-components";
import { localize } from "./localize/localize";
import { DEFAULT_CONFIG } from "./types/config";
import type { EquinoxCardConfigInput } from "./types/config";
import type { HaFormChangedEvent, HaFormSchema, HomeAssistant, LovelaceCardEditor } from "./types/ha";

void ensureHaComponents();

export class EquinoxCardEditor extends LitElement implements LovelaceCardEditor {
  static properties = {
    hass: { attribute: false },
    _config: { state: true }
  };

  hass?: HomeAssistant;

  private _config: EquinoxCardConfigInput = {};

  setConfig(config: EquinoxCardConfigInput): void {
    this._config = { ...config };
  }

  protected render() {
    const language = this.hass?.locale?.language ?? this.hass?.language;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{ ...DEFAULT_CONFIG, ...this._config }}
        .schema=${this._schema(language)}
        .computeLabel=${this._computeLabel(language)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _schema(language?: string): HaFormSchema[] {
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
        name: "theme",
        selector: {
          select: {
            mode: "dropdown",
            options: [{ value: "flat", label: localize(language, "editor.options.theme.flat") }]
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
        name: "disable_name",
        selector: {
          boolean: {}
        }
      },
      {
        name: "enable_lock",
        selector: {
          boolean: {}
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

  private _computeLabel(language?: string): (schema: HaFormSchema) => string {
    return (schema: HaFormSchema) => localize(language, `editor.${schema.name}`);
  }

  private _valueChanged(event: HaFormChangedEvent<EquinoxCardConfigInput>): void {
    this._config = event.detail.value;

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
