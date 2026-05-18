import type { RegulationDashboard } from "../../types/regulation-dashboard";
import smartpi from "./regulation/smartpi.json";
import hysteresis from "./regulation/hysteresis.json";

const builtinDashboards: Record<string, RegulationDashboard> = {
  smartpi: smartpi as RegulationDashboard,
  hysteresis: hysteresis as RegulationDashboard
};

export function getBuiltinRegulationDashboard(algorithm: string): RegulationDashboard | undefined {
  return builtinDashboards[algorithm];
}

export function hasBuiltinRegulationDashboard(algorithm: string): boolean {
  return algorithm in builtinDashboards;
}
