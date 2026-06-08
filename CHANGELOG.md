# Changelog

All notable changes to Equinox will be documented in this file.

## 0.1.0

### Initial release

- Lovelace card for Home Assistant climate entities (Versatile Thermostat + standard).
- **Climate controls**: HVAC mode selector, temperature setpoint and responsive color-coded `heat_cool` range controls.
- **Preset selector** with Versatile Thermostat and standard preset support.
- **Boost / timed preset dialog** with circular duration slider.
- **Swing mode dialog** for `swing_mode` and `swing_horizontal_mode`.
- **Fan mode selector** with auto/off/speed icons.
- **Lock UI**: PIN pad dialog for VT lock/unlock with code validation.
- **History dialog** powered by `ha-better-history`: multi-series charts, entity/attribute series, no-refetch view zoom, display modes (stair/line/column), export/import, draggable zoom window, live future range, and browser Back/Forward handling.
- **Two visual themes**: `flat` (default) and `liquid_glow` (animated border glow).
- **Two display modes**: `classic` and `compact` (responsive with optional icon-only popups).
- **Primary display**: `setpoint` (temperature emphasis) or `sensors` (sensor values emphasis).
- **Power and humidity info**: optional external sensors with popover details.
- **Responsive layout**: adapts to narrow cards, mobile-friendly.
- **i18n**: 19 languages with runtime translation loading.
- **Light mode fix**: detects HA theme dark mode instead of OS preference.
- **Attribute unit map**: semantic unit resolution for history charts (including `temperature` → °C/°F).
- **Precompressed `.js.gz` files** for gzip-aware Home Assistant deployments.
- **HACS support**: `hacs.json` manifest, GitHub Actions CI/CD, draft release workflow.

## 0.1.1

- updated ha-better-history-component to 0.1.7
  . better UX on mobile
  . improved range selection slider handling on mobile & desktop.
- use private custom-element tag to avoid versionning conflict with other card using history component
- handle browser history
- fix card should default to automatic height
- improve Liquid Glow active heat/cool side glow with a center-out expanding pulse while preserving the Home Assistant card border theme
- Add option to only display border glow when hvac is active ( default checked )
- add editor tabs to hide specific HVAC mode and preset buttons based on the attached climate capabilities

## 0.1.2

- add card background color and opacity options in the visual editor

- update ha-better-history to 0.2.0
  . now we can set units and scale group to attributes from the graph by right click/long press the attributes chips
  . some UI fixes

## 0.1.3

- update ha-better-history to 0.2.1
  . set units and scale group to attributes and entities from the graph by right click/long press the attributes chips

## 0.1.4

- update ha-better-history to 0.2.2
- add card background color and opacity style options

## 0.1.5

- make HVAC and preset selector surfaces follow the configured card background
- make setpoint +/- buttons follow the configured card background
- ha-better-history 0.2.3:
  . fix chart clipping on loading multiple sources
  . add colored dots near scales
  . prevent scale ticks to appear above the chart.
  . allow to manually split/join scales for same unit graphs by dragging colored dots to the wated scale side.
  . auto scale splitting is more conservative
  . prevent splitting when there's 2 different units ( forced to one scale per unit )
  . prevent more than 2 different units per graph

## 0.1.6

- ha-better-history 0.2.5
  . fix race condition when adding multiple attributes at the same time
  . fix legend padding when a segment is displayed under the graph
  . fix long press on chips clearing the popup on release.

- fix menu not working when card is embedded in a dialog window.
- add Hebrew language ( thx @yosef-chai )

## 0.1.7

- introduce Regulation dashboards.
  Dynamically generated dashboards from json files.
  Only available to SmartPI for now.

## 0.1.8

- Rewrote SmartPI regulation wording and layout
- Unify Regulation navigation with Equinox UX
- Added browser history to Regulation section.


## 0.1.9

- Auto-discover Regulation diagnostics from `specific_states.regulation_diagnostics`, removing the need to configure `diagnostic_entity`. ( needs smartPI >= 0.3.3 )
- Mount Equinox dialogs only while active so closed popovers, history, Regulation, lock, and message overlays release their listeners and state.
- Fix: Keep floating menus inside viewport

## 0.1.10

- Align icons and colors with Home Assistant conventions n( thanks @yosef-chai )
- set default theme to glow

## 0.1.11

- improve vtherm-hysteresis regulation dashboard layout and diagnostics
- center orphan regulation grid items
- updated ha-better-history to 0.2.6

## 0.2.0

- Add new "Thin" layout, a compact control layout with color-coded popup temperature sliders, responsive sensor readings, inline HVAC/preset/fan/swing popups, and horizontal state icons.
- Fix the thin card ventilation icon color for generic fan modes such as `normal`.
- Add new setpoint setter ( legacy +/- setpoint setter can be switched back from the config )
- Many UI improvements
- Add custom more-info dialog box.
- Show the configured humidity entity in the default history only when the climate does not already expose
- Replace the temporary boost circular duration selector with a horizontal slider matching the popup setpoint control.

## 0.2.1

- Highlight active SmartPI calibration in the Regulation overview and on the card status icons.
- Add Home Assistant 2026.6 card picker suggestions for climate entities
- Fix thin fan icon color for normal mode

## 0.2.2-dev

- fix card background color picker values from HA theme color IDs and fractional RGB channels
- fix the custom sensor more-info date picker being clipped below the dialog, making its validation button unreachable
- update ha-better-history component
  . fix live refresh for some attributes

