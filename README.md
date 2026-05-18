# Equinox

Equinox is a custom Lovelace card for Home Assistant. It is designed for
Versatile Thermostat while keeping compatibility with standard `climate`
entities.

The project uses Lit, strict TypeScript, and Vite library mode. The Lovelace
card is registered as:

```yaml
type: custom:equinox-card
```

If Equinox is useful in your Home Assistant setup, you can support development
on [Buy Me a Coffee](https://buymeacoffee.com/kipk).

![Equinox Lovelace climate cards in classic and compact layouts](assets/screens/cards.png)

## History Viewer

Equinox embeds
[`@kipk/ha-better-history`](https://www.npmjs.com/package/@kipk/ha-better-history),
a standalone Home Assistant history web component also available on
[GitHub](https://github.com/KipK/ha-better-history). It powers the history
dialog with multi-series charts, no-refetch view zoom, display modes, entity and
attribute series support, and portable JSON export/import.

![ha-better-history viewer tools with chart zoom and display controls](assets/screens/ha-better-history-tools.png)

## Installation

### Via HACS

[![Add this repository to HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=KipK&repository=equinox&category=Plugin)


1. Add this repository as a custom repository in HACS (type: **Dashboard**).
2. Install **equinox** from HACS.
3. Clear browser cache and reload Home Assistant.

### Manual

1. Download  the latest release.
2. Copy content inside dist/ directory to `www/community/equinox/`.
3. Add it as a Lovelace resource:

```yaml
url: /local/community/equinox/equinox-card.js
type: module
```


## Build

Install dependencies:

```bash
npm install
```

`@kipk/ha-better-history` is installed from npm and bundled into
`equinox-card.js`. Equinox registers its embedded history component as
`<equinox-better-history>` so local development can run alongside other cards
that bundle different `ha-better-history` builds.

Build the distributable card:

```bash
npm run build
```

The generated Lovelace resource is:

```text
dist/equinox-card.js
```

The build also copies runtime assets:

```text
dist/attributes.json
dist/dashboards/regulation/*.json
dist/equinox-card.js.gz
```

Release/HACS packages must include all generated `dist/` files. `equinox-card.js`
loads `attributes.json` next to itself and already contains the history web
component. Built-in Regulation dashboards are loaded from the generated
`dashboards/regulation/` directory next to the card bundle. Keep the generated
files together. The `.gz` file is a precompressed copy for Home Assistant
deployments that serve it when the browser advertises gzip support.

In `attributes.json`, use `"temperature"` for attributes that should follow the
active Home Assistant temperature unit (`°C` or `°F`) instead of hard-coding a
unit.

Vite 8 requires Node `^20.19.0 || >=22.12.0`.

## Home Assistant Resource

After building, expose `dist/equinox-card.js`, `dist/attributes.json`, and the
`dist/dashboards/` directory to Home Assistant in the same directory, then add
the JS file as a Lovelace resource:

```yaml
url: /local/equinox-card.js
type: module
```

The exact `/local/` path depends on where the built file is copied in the Home
Assistant `www/` directory.

## Example

```yaml
type: custom:equinox-card
entity: climate.salon
name: Salon
diagnostic_entity: sensor.salon_smartpi_diagnostics
power_entity: sensor.salon_puissance
humidity_entity: sensor.salon_humidity
theme: flat
display_mode: classic
primary_display: setpoint
card_background_color: "#20242a"
card_background_opacity: 92
disable_name: false
enable_lock: true
additional_dashboards: auto
```

## Configuration

| Option                  | Required | Default              | Description                                                    |
| ----------------------- | -------- | -------------------- | -------------------------------------------------------------- |
| `entity`                | yes      | -                    | Climate entity to display. Must use the `climate` domain.      |
| `name`                  | no       | Entity friendly name | Display name.                                                  |
| `diagnostic_entity`     | no       | -                    | Diagnostic sensor for algorithm dashboards.                    |
| `power_entity`          | no       | -                    | Sensor or input number for instant power.                      |
| `humidity_entity`       | no       | -                    | External humidity sensor when climate humidity is unavailable. |
| `theme`                 | no       | `flat`               | Visual theme: `flat` or `liquid_glow`.                         |
| `display_mode`          | no       | `classic`            | Display format: `classic` or `compact`.                        |
| `primary_display`       | no       | `setpoint`           | Main emphasis: `setpoint` or `sensors`.                        |
| `card_background_color` | no       | HA card background   | CSS color for the card background, editable with the visual editor color picker. HVAC and preset selectors follow this surface. |
| `card_background_opacity` | no     | `100`                | Card background opacity from `0` to `100`; lower values make the card more transparent. |
| `disable_name`          | no       | `false`              | Hide the header name.                                          |
| `enable_lock`           | no       | `true`               | Enable lock UI when supported by VT.                           |
| `additional_dashboards` | no       | `auto`               | Regulation dashboard mode: `auto`, `custom`, or `disabled`.    |

## Regulation Dashboard

Equinox can show a **Regulation** entry in the card menu. It opens a dashboard
dialog that explains the current thermostat regulation algorithm with compact
sections, values, statuses, progress bars, graphs, and optional confirmed
actions.

`additional_dashboards` controls this feature:

| Value | Behavior |
| ----- | -------- |
| `auto` | Detects the regulation algorithm from the climate entity and loads a built-in dashboard from `dashboards/regulation/<algorithm>.json`. If no file exists for the detected algorithm, the Regulation menu entry is hidden. |
| `custom` | Always shows the Regulation menu entry and loads `/local/equinox/dash/custom.js`. If the file is missing or invalid, the dialog shows a short error. |
| `disabled` | Hides Regulation completely. |

In `auto` mode, Equinox reads the algorithm from these climate attributes, in
order: `configuration.proportional_function`,
`vtherm_over_valve.function`,
`vtherm_over_climate_valve.valve_regulation.function`,
`vtherm_over_switch.function`, then
`specific_states.proportional_function`. Algorithm names are normalized to
lowercase and may contain only letters, numbers, `_`, and `-`.

Built-in dashboards currently include:

- `smartpi.json`: Smart PI sections for overview, learning, thermal model,
  command, and protections/calibration/health.
- `hysteresis.json`: a conservative dashboard that uses confirmed climate and
  Versatile Thermostat attributes only.

Desktop dashboards use a side section menu inside the dialog. On mobile, a
single-section dashboard opens directly; a multi-section dashboard shows its
sections from the Equinox menu, then opens the selected section.

### Custom Regulation Dashboard

Place a trusted JavaScript file at:

```text
/config/www/equinox/dash/custom.js
```

Home Assistant serves that file as:

```text
/local/equinox/dash/custom.js
```

Minimal example:

```js
export default {
  schema_version: 1,
  kind: "regulation-dashboard",
  algorithm: "custom",
  title: "Custom Regulation",
  translations: {
    en: {
      "sections.main.title": "Summary",
      "blocks.note": "This dashboard is loaded from custom.js."
    },
    fr: {
      "sections.main.title": "Synthese",
      "blocks.note": "Ce dashboard est charge depuis custom.js."
    }
  },
  sections: [
    {
      id: "main",
      title_key: "sections.main.title",
      icon: "mdi:tune-variant",
      items: [
        {
          type: "section_note",
          text_key: "blocks.note",
          tone: "info"
        }
      ]
    }
  ]
};
```

The fallback non-module form is also accepted:

```js
window.EquinoxRegulationDashboard = {
  schema_version: 1,
  kind: "regulation-dashboard",
  title: "Custom Regulation",
  sections: [
    {
      id: "main",
      title: "Summary",
      items: [{ type: "section_note", text: "Loaded from custom.js.", tone: "info" }]
    }
  ]
};
```

`custom.js` is executable JavaScript. Use only code you trust. Equinox never runs
dashboard actions during render, and actions from custom dashboards require
confirmation before calling a Home Assistant service.

### Dashboard Texts And Data

Dashboard-specific labels live inside the dashboard itself under
`translations`. Equinox normalizes the Home Assistant language, for example
`fr-CA` to `fr`, then falls back to `en`, then to direct fields such as `title`,
`label`, or `text`, and finally to the technical key.

Use `*_key` fields for translated text in shared dashboards:

```json
{
  "label_key": "metrics.power.applied"
}
```

Direct text fields are useful for simple custom dashboards:

```json
{
  "label": "Applied power"
}
```

Dashboard values can read these sources:

| Source | Data |
| ------ | ---- |
| `climate` | The configured `entity` and its attributes. |
| `diagnostic` | The configured `diagnostic_entity` and its attributes. |
| `power` | The configured `power_entity`. |
| `humidity` | The configured `humidity_entity`. |
| `temperature` | The configured `temperature_entity`. |
| `config` | The normalized Equinox card config. |

Paths use `/`, such as `model/confidence` or `configuration/proportional_function`.
Missing, `unknown`, `unavailable`, `null`, and empty values are displayed as
`--`.

Regulation graph blocks use the embedded `ha-better-history` component in a
simplified dashboard mode. Tooltips, legends, and scales are enabled by default;
date, entity, range, import/export, and line-mode controls are hidden unless the
dashboard explicitly enables them.

## Dashboard sizing

Equinox declares Home Assistant dashboard sizing hints for both masonry and
sections views. In sections view, the default grid height is automatic so the
card follows its rendered content instead of forcing a fixed row count.

## Development Notes

- User-visible text must go through `src/localize/languages/{lang}.json` (19
  languages). The English file (`en.json`) is the reference; other languages
  fall back to it for missing keys.
- The card must remain compatible with a standard Home Assistant `climate`
  entity.
- VT-specific features are displayed only when the required data or capability
  is available.
- The source of truth for implementation details is
  `plans/equinox-cahier-des-charges.md`.

## Adding a language

1. Add `src/localize/languages/{code}.json` using `en.json` as a template.
2. Add the language code to `SUPPORTED_LANGUAGES` in
   `src/localize/loader.ts`.
3. Add the `card.description` string to the `CARD_DESCRIPTIONS` map in
   `src/equinox-card.ts`.
4. Run `npm run build` — Vite copies the new file to `dist/translations/`
   automatically.
