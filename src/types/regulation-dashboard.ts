export type RegulationDashboardKind = "regulation-dashboard";
export type RegulationDashboardSource = "climate" | "diagnostic" | "power" | "humidity" | "temperature" | "config";
export type RegulationDashboardTone = "ok" | "info" | "warning" | "danger" | "muted";
export type RegulationDashboardPath = string;
export type RegulationDashboardTranslations = Record<string, Record<string, string>>;
export type RegulationDashboardCondition = Record<string, unknown>;

export interface RegulationDashboard {
  schema_version: 1;
  kind: RegulationDashboardKind;
  algorithm?: string;
  title?: string;
  title_key?: string;
  translations?: RegulationDashboardTranslations;
  sections: RegulationDashboardSection[];
}

export interface RegulationDashboardSection {
  id: string;
  title?: string;
  title_key?: string;
  icon?: string;
  summary?: string;
  summary_key?: string;
  items: RegulationDashboardItem[];
}

export type RegulationDashboardItem =
  | RegulationDashboardHeroStatusItem
  | RegulationDashboardValueItem
  | RegulationDashboardMetricGridItem
  | RegulationDashboardStatusItem
  | RegulationDashboardProgressItem
  | RegulationDashboardTextItem
  | RegulationDashboardSectionNoteItem
  | RegulationDashboardHistoryItem
  | RegulationDashboardActionItem;

export interface RegulationDashboardBaseItem {
  type: RegulationDashboardItemType;
  id?: string;
  visible_if?: RegulationDashboardCondition;
}

export type RegulationDashboardItemType =
  | "hero_status"
  | "value"
  | "metric_grid"
  | "status"
  | "progress"
  | "text"
  | "section_note"
  | "history"
  | "action";

export interface RegulationDashboardLabelFields {
  label?: string;
  label_key?: string;
}

export interface RegulationDashboardTextFields {
  title?: string;
  title_key?: string;
  subtitle?: string;
  subtitle_key?: string;
  description?: string;
  description_key?: string;
}

export interface RegulationDashboardValueRef {
  source: RegulationDashboardSource;
  path?: RegulationDashboardPath;
}

export interface RegulationDashboardHeroStatusItem extends RegulationDashboardBaseItem, RegulationDashboardTextFields {
  type: "hero_status";
  icon?: string;
  tone?: RegulationDashboardTone;
}

export interface RegulationDashboardValueItem extends RegulationDashboardBaseItem, RegulationDashboardLabelFields {
  type: "value";
  source: RegulationDashboardSource;
  path?: RegulationDashboardPath;
  unit?: string;
  unit_key?: string;
  digits?: number;
  fallback?: string;
  tone_map?: RegulationDashboardToneMap;
  transform?: RegulationDashboardCondition;
}

export interface RegulationDashboardMetricGridItem extends RegulationDashboardBaseItem {
  type: "metric_grid";
  title?: string;
  title_key?: string;
  metrics: RegulationDashboardMetric[];
}

export interface RegulationDashboardMetric extends RegulationDashboardLabelFields {
  source: RegulationDashboardSource;
  path?: RegulationDashboardPath;
  unit?: string;
  unit_key?: string;
  digits?: number;
  fallback?: string;
  icon?: string;
  tone_map?: RegulationDashboardToneMap;
}

export interface RegulationDashboardStatusItem extends RegulationDashboardBaseItem, RegulationDashboardLabelFields {
  type: "status";
  source: RegulationDashboardSource;
  path?: RegulationDashboardPath;
  map: Record<string, RegulationDashboardStatusMapEntry>;
  fallback?: RegulationDashboardStatusMapEntry;
}

export interface RegulationDashboardStatusMapEntry extends RegulationDashboardLabelFields {
  tone?: RegulationDashboardTone;
  icon?: string;
  description?: string;
  description_key?: string;
}

export interface RegulationDashboardProgressItem extends RegulationDashboardBaseItem, RegulationDashboardLabelFields {
  type: "progress";
  value: RegulationDashboardValueRef;
  target: RegulationDashboardValueRef | number;
  unit?: string;
  unit_key?: string;
  digits?: number;
}

export interface RegulationDashboardTextItem extends RegulationDashboardBaseItem {
  type: "text";
  text?: string;
  text_key?: string;
}

export interface RegulationDashboardSectionNoteItem extends RegulationDashboardBaseItem {
  type: "section_note";
  text?: string;
  text_key?: string;
  tone?: RegulationDashboardTone;
  icon?: string;
}

export interface RegulationDashboardHistoryItem extends RegulationDashboardBaseItem {
  type: "history";
  title?: string;
  title_key?: string;
  range?: string;
  series: RegulationDashboardHistorySeries[];
  options?: RegulationDashboardHistoryOptions;
}

export interface RegulationDashboardHistorySeries extends RegulationDashboardLabelFields {
  entity: RegulationDashboardEntityToken | string;
  attribute?: RegulationDashboardPath;
  unit?: string;
  unit_key?: string;
  scale_group?: string;
  color?: string;
}

export type RegulationDashboardEntityToken =
  | "$climate_entity"
  | "$diagnostic_entity"
  | "$power_entity"
  | "$humidity_entity"
  | "$temperature_entity";

export interface RegulationDashboardHistoryOptions {
  tooltip?: boolean;
  legend?: boolean;
  scales?: boolean;
  tools?: boolean;
  date_picker?: boolean;
  entity_picker?: boolean;
  range_picker?: boolean;
}

export interface RegulationDashboardActionItem extends RegulationDashboardBaseItem, RegulationDashboardLabelFields {
  type: "action";
  icon?: string;
  service: string;
  target?: Record<string, unknown>;
  data?: Record<string, unknown>;
  confirmation?: RegulationDashboardActionConfirmation;
}

export interface RegulationDashboardActionConfirmation {
  enabled?: boolean;
  title?: string;
  title_key?: string;
  text?: string;
  text_key?: string;
}

export type RegulationDashboardToneMap = Record<string, RegulationDashboardTone>;
