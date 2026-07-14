export type CarbonInitiativeStatus =
  | "On Track"
  | "In Progress"
  | "Planned"
  | "Completed";

export interface CarbonInitiative {
  id: string;
  title: string;
  annualImpactTco2e: number;
  progressPercent: number;
  status: CarbonInitiativeStatus;
}

export interface CarbonComplianceReport {
  id: string;
  title: string;
  detail: string;
}

export interface CarbonSiteTotals {
  emissions: number;
  intensity: number;
  deltaPercent: number;
}

export interface CarbonSiteRow {
  id: string;
  site: string;
  emissions: number;
  intensity: number;
  deltaPercent: number;
}
