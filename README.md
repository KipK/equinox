# Equinox

Equinox is a custom Lovelace card for Home Assistant. It is designed for
Versatile Thermostat while keeping compatibility with standard `climate`
entities.

The project uses Lit, strict TypeScript, and Vite library mode. The Lovelace
card is registered as:

```yaml
type: custom:equinox-card
```

![Equinox Lovelace climate cards in classic and compact layouts](assets/screens/cards.png)

## Status

Equinox is in early implementation. The current codebase provides:

- a Vite + Lit + TypeScript scaffold;
- the `equinox-card` custom element;
- the `equinox-card-editor` Lovelace editor;
- 19-language runtime-loaded localization (bg, ca, cn, cs, da, de, el, en, es, fi, fr, hu, it, nl, no, pl, pt, ru, sk);
- MVP configuration typing and validation;
- a minimal placeholder card render.

The thermostat UI, climate state mapping, VT-specific state mapping, service
actions, overlays, and dashboards are implemented step by step. Standard
Home Assistant climate entities can expose only the controls they support:
HVAC modes, presets, fan modes, swing modes, and heat/cool target ranges are
rendered conditionally from the entity attributes.

## Build

Install dependencies:

```bash
npm install
```

`ha-better-history` is installed directly from
`https://github.com/KipK/ha-better-history.git`. Its npm `prepare` script builds
the package during install, so no local `lib/` checkout or extra install script
is required.

Build the distributable card:

```bash
npm run build
```

The generated Lovelace resource is:

```text
dist/equinox-card.js
```

The build also copies the runtime attribute-unit map:

```text
dist/attributes.json
dist/lib/ha-better-history/define.js
dist/equinox-card.js.gz
dist/lib/ha-better-history/define.js.gz
```

Release/HACS packages must include all generated `dist/` files. `equinox-card.js`
loads `attributes.json` next to itself, and lazy-loads the history web component
from `lib/ha-better-history/define.js` when the history dialog opens. Keep the
generated directory structure intact. The `.gz` files are precompressed copies
for Home Assistant deployments that serve them when the browser advertises gzip
support.

In `attributes.json`, use `"temperature"` for attributes that should follow the
active Home Assistant temperature unit (`°C` or `°F`) instead of hard-coding a
unit.

Vite 8 requires Node `^20.19.0 || >=22.12.0`.

## Home Assistant Resource

After building, expose `dist/equinox-card.js` and `dist/attributes.json` to Home
Assistant in the same directory, then add the JS file as a Lovelace resource:

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
| `theme` | no | `flat` | Visual theme: `flat` or `liquid_glow`. |
| `display_mode` | no | `classic` | Display format: `classic` or `compact`. |
| `primary_display` | no | `setpoint` | Main emphasis: `setpoint` or `sensors`. |
| `disable_name` | no | `false` | Hide the header name. |
| `enable_lock` | no | `true` | Enable lock UI when supported by VT. |
| `additional_dashboards` | no | `auto` | Dashboard mode: `auto`, `custom`, or `disabled`. |

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
