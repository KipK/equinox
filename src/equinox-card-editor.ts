import { LitElement, css, html, nothing } from "lit";
import { EDITOR_TAG } from "./const";
import { HVAC_ORDER, PRESET_ORDER, SWING_ORDER } from "./data/climate-modes";
import { AUTO_FAN_MODES, FAN_ORDER } from "./data/fan";
import { MODE_TONES_BY_FAMILY, isModeHidden, modeCustomization, modeLabel, normalizeModeCustomizations, orderedVisibleModes, type ModeFamily } from "./data/mode-customizations";
import { ensureHaComponents } from "./ha/load-components";
import { localize } from "./localize/localize";
import { DEFAULT_CONFIG } from "./types/config";
import type { EquinoxCardConfig, EquinoxCardConfigInput, EquinoxModeCustomization } from "./types/config";
import type { HaFormChangedEvent, HaFormSchema, HassEntity, HomeAssistant, LovelaceCardEditor } from "./types/ha";

function rgbChannel(value: unknown): number | undefined {
  const channel = Number(value);
  if (!Number.isFinite(channel)) return undefined;

  return Math.min(255, Math.max(0, Math.round(channel)));
}

function cssColor(value: string | number[] | undefined): string | undefined {
  if (typeof value === "string" && value.trim() !== "") return value.trim();
  if (!Array.isArray(value) || value.length < 3) return undefined;

  const [r, g, b] = value.map(rgbChannel);
  if (![r, g, b].every((part) => part !== undefined)) return undefined;

  return `rgb(${r}, ${g}, ${b})`;
}

function cleanEditorConfig(config: EquinoxCardConfigInput): EquinoxCardConfigInput {
  const cleaned = { ...config };
  delete (cleaned as { card_height?: unknown }).card_height;
  delete (cleaned as { diagnostic_entity?: unknown }).diagnostic_entity;

  if (cleaned.setpoint_selector === undefined && typeof cleaned.use_temperature_popup === "boolean") {
    cleaned.setpoint_selector = cleaned.use_temperature_popup ? "slider" : "buttons";
  }
  delete cleaned.use_temperature_popup;

  if (!Array.isArray(cleaned.hidden_hvac_modes) || cleaned.hidden_hvac_modes.length === 0) {
    delete cleaned.hidden_hvac_modes;
  }

  if (!Array.isArray(cleaned.hidden_preset_modes) || cleaned.hidden_preset_modes.length === 0) {
    delete cleaned.hidden_preset_modes;
  }
  const customizations = normalizeModeCustomizations(cleaned.mode_customizations);
  if (customizations) cleaned.mode_customizations = customizations;
  else delete cleaned.mode_customizations;

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

    .mode-card { display: grid; gap: 8px; padding: 12px; border: 1px solid var(--divider-color); border-radius: 10px; }
    .mode-header { display: flex; align-items: center; gap: 10px; }
    .mode-title { color: var(--primary-text-color); font-size: 16px; font-weight: 600; line-height: 1.3; }
    .mode-key { color: var(--secondary-text-color); font-size: 12px; overflow-wrap: anywhere; margin-inline-start: 28px; }
    .mode-fields { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
    .mode-fields label { display: grid; gap: 4px; color: var(--secondary-text-color); font-size: 12px; }
    .mode-fields input, .mode-fields select { box-sizing: border-box; width: 100%; padding: 8px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 6px; }
    .mode-fields ha-icon-picker { width: 100%; }
    @media (max-width: 600px) { .mode-fields { grid-template-columns: 1fr; } }

    .color-grid {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      margin-top: 12px;
      margin-bottom: 16px;
    }

    .color-picker {
      max-width: 260px;
      width: 100%;
    }
  `;

  hass?: HomeAssistant;

  private _config: EquinoxCardConfigInput = {};
  private _activeTab: "general" | "presentation" | ModeFamily = "general";
  private _pendingModeCustomizations = new Map<ModeFamily, Map<string, Partial<EquinoxModeCustomization>>>();

  connectedCallback(): void {
    super.connectedCallback();
    void ensureHaComponents().catch(() => undefined);
  }

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
        ${(["fan", "swing", "swing_horizontal"] as ModeFamily[]).map((tab) => html`
          <button class="tab" ?active=${this._activeTab === tab} @click=${() => { this._activeTab = tab; }}>
            ${localize(language, `editor.tabs.${tab}`)}
          </button>`)}
      </div>
      ${this._activeTab === "presentation"
        ? this._renderPresentationTab(language, data)
        : this._activeTab === "general"
          ? html`
              <ha-form
                .hass=${this.hass}
                .data=${data}
                .schema=${this._generalSchema(language, data.display_mode)}
                .computeLabel=${this._computeLabel(language)}
                @value-changed=${this._valueChanged}
              ></ha-form>
            `
          : this._renderModeTab(language, this._activeTab)}
    `;
  }

  private _renderPresentationTab(language: string | undefined, data: EquinoxCardConfigInput) {
    const schema = this._presentationSchema(language, data.display_mode);
    const colorIndex = schema.findIndex((item) => item.name === "card_background_color");
    const beforeColor = colorIndex >= 0 ? schema.slice(0, colorIndex) : schema;
    const colorFields = schema.filter((item) => item.name === "card_background_color");
    const afterColor = colorIndex >= 0 ? schema.slice(colorIndex + 1) : [];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${beforeColor}
        .computeLabel=${this._computeLabel(language)}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="color-grid">
        ${colorFields.map((item) => this._renderColorField(language, item))}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${afterColor}
        .computeLabel=${this._computeLabel(language)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _renderModeTab(language: string | undefined, family: ModeFamily) {
    const options = this._supportedModes(family);
    const emptyKey = family === "hvac" ? "editor.visibility.no_hvac_modes" : family === "preset" ? "editor.visibility.no_presets" : `editor.mode_customization.no_${family}_modes`;

    return html`
      <div class="options-panel">
        <div class="options-help">${localize(language, "editor.visibility.help")}</div>
        ${options.length === 0
        ? html`<div class="options-empty">${localize(language, this._config.entity ? emptyKey : "editor.visibility.no_entity")}</div>`
        : html`
              <div class="checkbox-list">
                ${options.map((option) => {
          const custom = this._modeCustomization(family, option);
          const defaultLabel = modeLabel({ language, family, mode: option });
          return html`<div class="mode-card">
                    <label class="mode-header">
                      <input
                        type="checkbox"
                        .checked=${!this._isModeHidden(family, option)}
                        @change=${(event: Event) => this._commitModeCustomization(family, option, { hidden: !(event.currentTarget as HTMLInputElement).checked })}
                      />
                      <span class="mode-title">${defaultLabel}</span>
                    </label>
                    ${defaultLabel !== option ? html`<div class="mode-key">${option}</div>` : nothing}
                    <div class="mode-fields">
                      ${this._modeField(
                        language,
                        "label",
                        custom.label ?? "",
                        (value) => this._stageModeCustomization(family, option, { label: value }),
                        (value) => this._commitModeCustomization(family, option, { label: value })
                      )}
                      <ha-icon-picker
                        .hass=${this.hass}
                        .label=${localize(language, "editor.mode_customization.icon")}
                        .value=${custom.icon ?? ""}
                        @value-changed=${(event: CustomEvent<{ value?: string }>) => this._commitModeCustomization(family, option, { icon: event.detail.value ?? "" })}
                      ></ha-icon-picker>
                      <label>${localize(language, "editor.mode_customization.tone")}<select .value=${custom.tone ?? ""} @change=${(event: Event) => this._commitModeCustomization(family, option, { tone: (event.currentTarget as HTMLSelectElement).value as EquinoxModeCustomization["tone"] })}>
                        <option value="">${localize(language, "editor.mode_customization.automatic")}</option>
                        ${MODE_TONES_BY_FAMILY[family].map((tone) => html`<option value=${tone}>${tone}</option>`)}
                      </select></label>
                    </div>
                  </div>`;
        })}
              </div>
            `}
      </div>
    `;
  }

  private _modeField(
    language: string | undefined,
    field: "label",
    value: string,
    stage: (value: string) => void,
    commit: (value: string) => void
  ) {
    return html`<label>${localize(language, `editor.mode_customization.${field}`)}<input
      type="text"
      .value=${value}
      @input=${(event: Event) => stage((event.currentTarget as HTMLInputElement).value)}
      @change=${(event: Event) => commit((event.currentTarget as HTMLInputElement).value)}
    /></label>`;
  }

  private _generalSchema(language: string | undefined, displayMode: EquinoxCardConfigInput["display_mode"]): HaFormSchema[] {
    const isThin = displayMode === "thin";
    const schema: HaFormSchema[] = [
      {
        name: "entity",
        selector: {
          entity: {
            domain: ["climate"]
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

    if (!isThin) {
      schema.splice(1, 0, {
        name: "name",
        selector: {
          text: {}
        }
      });
    }

    return schema;
  }

  private _presentationSchema(language: string | undefined, displayMode: EquinoxCardConfigInput["display_mode"]): HaFormSchema[] {
    const orientationOptions = [
      { value: "horizontal", label: localize(language, "editor.options.layout_orientation.horizontal") },
      { value: "vertical", label: localize(language, "editor.options.layout_orientation.vertical") }
    ];
    const isThin = displayMode === "thin";

    const schema: HaFormSchema[] = [
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
              { value: "compact", label: localize(language, "editor.options.display_mode.compact") },
              { value: "thin", label: localize(language, "editor.options.display_mode.thin") }
            ]
          }
        }
      }
    ];

    if (!isThin) {
      schema.push({
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
      });
      schema.push({
        name: "setpoint_selector",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "slider", label: localize(language, "editor.options.setpoint_selector.slider") },
              { value: "buttons", label: localize(language, "editor.options.setpoint_selector.buttons") }
            ]
          }
        }
      });
      schema.push({
        name: "state_icons_layout",
        selector: {
          select: {
            mode: "dropdown",
            options: orientationOptions
          }
        }
      });
    }

    schema.push(
      {
        name: "card_background_color",
        selector: {
          color_rgb: {}
        }
      },
      {
        name: "card_background_opacity",
        selector: {
          number: {
            min: 0,
            max: 100,
            mode: "slider",
            unit_of_measurement: "%"
          }
        }
      }
    );

    if (!isThin) {
      schema.push({
        name: "disable_name",
        selector: {
          boolean: {}
        }
      });
    }

    schema.push(
      {
        name: "show_fan_mode",
        selector: {
          boolean: {}
        }
      },
      {
        name: "show_swing_mode",
        selector: {
          boolean: {}
        }
      },
      {
        name: "hide_lock_button",
        selector: {
          boolean: {}
        }
      },
      {
        name: "show_power_value",
        selector: {
          boolean: {}
        }
      }
    );

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

  private _renderColorField(language: string | undefined, schema: HaFormSchema) {
    return html`
      <ha-color-picker
        class="color-picker"
        .label=${this._computeLabel(language)(schema)}
        .value=${this._colorValue(schema.name)}
        @value-changed=${(event: CustomEvent<{ value?: string | number[] }>) => this._colorChanged(schema.name, event)}
      ></ha-color-picker>
    `;
  }

  private _colorValue(name: string): string | undefined {
    const value = (this._config as Record<string, unknown>)[name];
    return cssColor(value as string | number[] | undefined);
  }

  private _colorChanged(name: string, event: CustomEvent<{ value?: string | number[] }>): void {
    const next = { ...this._config } as Record<string, unknown>;
    const value = cssColor(event.detail.value);

    if (value === undefined || value === "") {
      delete next[name];
    } else {
      next[name] = value;
    }

    this._config = cleanEditorConfig(next as EquinoxCardConfigInput);
    this._emitConfigChanged();
  }

  private _climateEntity(): HassEntity | undefined {
    const entityId = this._config.entity;

    return entityId ? this.hass?.states[entityId] : undefined;
  }

  private _attributeModes(attribute: "hvac_modes" | "preset_modes" | "fan_modes" | "swing_modes" | "swing_horizontal_modes"): string[] {
    const value = this._climateEntity()?.attributes[attribute];

    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter((entry): entry is string => typeof entry === "string");
  }

  private _supportedModes(family: ModeFamily): string[] {
    if (family === "fan") {
      const vt = this._climateEntity()?.attributes.vtherm_over_climate as Record<string, unknown> | undefined;
      const hasAutoFan = typeof vt?.auto_fan_mode === "string" || typeof vt?.current_auto_fan_mode === "string";
      const modes = hasAutoFan ? AUTO_FAN_MODES : this._attributeModes("fan_modes");
      return orderedVisibleModes({ family, modes, standardOrder: FAN_ORDER });
    }
    const attributes = { hvac: "hvac_modes", preset: "preset_modes", swing: "swing_modes", swing_horizontal: "swing_horizontal_modes" } as const;
    const orders = { hvac: HVAC_ORDER, preset: PRESET_ORDER, swing: SWING_ORDER, swing_horizontal: ["off", "on"] } as const;
    const modes = this._attributeModes(attributes[family]).filter((mode) => family !== "preset" || mode !== "none");
    return orderedVisibleModes({ family, modes, standardOrder: orders[family] });
  }

  private _modeCustomization(family: ModeFamily, mode: string): EquinoxModeCustomization {
    const current = modeCustomization(this._config as EquinoxCardConfig, family, mode) ?? {};
    const pending = this._pendingModeCustomizations.get(family)?.get(mode);

    if (!pending) {
      return current;
    }

    const merged = { ...current, ...pending };
    if (pending.hidden === false) delete merged.hidden;

    return merged;
  }

  private _isModeHidden(family: ModeFamily, mode: string): boolean {
    const pending = this._pendingModeCustomizations.get(family)?.get(mode);

    if (pending && Object.prototype.hasOwnProperty.call(pending, "hidden")) {
      return pending.hidden === true;
    }

    return isModeHidden(this._config as EquinoxCardConfig, family, mode);
  }

  private _stageModeCustomization(family: ModeFamily, mode: string, patch: Partial<EquinoxModeCustomization>): void {
    const familyUpdates = this._pendingModeCustomizations.get(family) ?? new Map<string, Partial<EquinoxModeCustomization>>();
    familyUpdates.set(mode, { ...familyUpdates.get(mode), ...patch });
    this._pendingModeCustomizations.set(family, familyUpdates);
  }

  private _commitModeCustomization(family: ModeFamily, mode: string, patch: Partial<EquinoxModeCustomization>): void {
    this._stageModeCustomization(family, mode, patch);
    this._flushModeCustomizations();
  }

  private _flushModeCustomizations(): void {
    if (this._pendingModeCustomizations.size === 0) {
      return;
    }

    let nextConfig = this._config;

    for (const [family, modes] of this._pendingModeCustomizations) {
      for (const [mode, patch] of modes) {
        const current = modeCustomization(nextConfig as EquinoxCardConfig, family, mode) ?? {};
        const nextEntry = { ...current, ...patch };
        if (patch.hidden === false) delete nextEntry.hidden;

        const legacyKey = family === "hvac" ? "hidden_hvac_modes" : family === "preset" ? "hidden_preset_modes" : undefined;
        const legacy = legacyKey ? (nextConfig[legacyKey] ?? []).filter((value) => patch.hidden !== false || value !== mode) : undefined;

        nextConfig = {
          ...nextConfig,
          ...(legacyKey ? { [legacyKey]: legacy } : {}),
          mode_customizations: {
            ...nextConfig.mode_customizations,
            [family]: { ...nextConfig.mode_customizations?.[family], [mode]: nextEntry }
          }
        };
      }
    }

    this._pendingModeCustomizations.clear();
    this._config = cleanEditorConfig(nextConfig);
    this._emitConfigChanged();
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
