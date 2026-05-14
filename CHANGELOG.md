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
