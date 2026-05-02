# Equinox

Equinox is a custom Lovelace card for Home Assistant. It is designed for
Versatile Thermostat while keeping compatibility with standard `climate`
entities.

The project uses Lit, strict TypeScript, and Vite library mode. The Lovelace
card is registered as:

```yaml
type: custom:equinox-card
```

## Status

Equinox is in early implementation. The current codebase provides:

- a Vite + Lit + TypeScript scaffold;
- the `equinox-card` custom element;
- the `equinox-card-editor` Lovelace editor;
- FR/EN localization files;
- MVP configuration typing and validation;
- a minimal placeholder card render.

The complete thermostat UI, climate state mapping, VT-specific state mapping,
service actions, overlays, and dashboards are implemented step by step.

## Build

Install dependencies:

```bash
npm install
```

Build the distributable card:

```bash
npm run build
```

The generated Lovelace resource is:

```text
dist/equinox-card.js
```

Vite 8 requires Node `^20.19.0 || >=22.12.0`.

## Home Assistant Resource

After building, expose `dist/equinox-card.js` to Home Assistant and add it as a
Lovelace resource:

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
disable_name: false
enable_lock: true
additional_dashboards: auto
```

## Configuration

| Option | Required | Default | Description |
| --- | --- | --- | --- |
| `entity` | yes | - | Climate entity to display. Must use the `climate` domain. |
| `name` | no | Entity friendly name | Display name. |
| `diagnostic_entity` | no | - | Diagnostic sensor for algorithm dashboards. |
| `power_entity` | no | - | Sensor or input number for instant power. |
| `humidity_entity` | no | - | External humidity sensor when climate humidity is unavailable. |
| `theme` | no | `flat` | Visual theme. Only `flat` is available in the MVP. |
| `display_mode` | no | `classic` | Display format: `classic` or `compact`. |
| `disable_name` | no | `false` | Hide the header name. |
| `enable_lock` | no | `true` | Enable lock UI when supported by VT. |
| `additional_dashboards` | no | `auto` | Dashboard mode: `auto`, `custom`, or `disabled`. |

## Development Notes

- User-visible text must go through `src/localize/languages/fr.json` and
  `src/localize/languages/en.json`.
- The card must remain compatible with a standard Home Assistant `climate`
  entity.
- VT-specific features are displayed only when the required data or capability
  is available.
- The source of truth for implementation details is
  `plans/equinox-cahier-des-charges.md`.
