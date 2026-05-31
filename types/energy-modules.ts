import type {
  DemandKpiTone,
  TrendDirection,
  TrendSentiment,
} from "@/types/demand";

export type ModuleKpiIcon =
  | "activity"
  | "alert"
  | "bar"
  | "calendar"
  | "cloud"
  | "credit"
  | "database"
  | "leaf"
  | "shield"
  | "target"
  | "users"
  | "wallet"
  | "zap";

export interface ModuleKpi {
  id: string;
  label: string;
  value: string;
  unit: string;
  caption: string;
  trendValue: string;
  trendLabel: string;
  trendDirection: TrendDirection;
  trendSentiment: TrendSentiment;
  tone: DemandKpiTone;
  icon: ModuleKpiIcon;
}

export interface TrendSeries {
  name: string;
  values: number[];
  tone: "primary" | "info" | "accent" | "warning" | "neutral";
  dashed?: boolean | undefined;
  area?: boolean | undefined;
}

export interface BreakdownItem {
  name: string;
  value: number;
  label: string;
  percentage: number;
}

export interface BarComparisonItem {
  label: string;
  value: number;
}

export type Severity = "High" | "Medium" | "Low" | "Info";

export interface ActionAlert {
  id: string;
  title: string;
  description: string;
  meta: string;
  severity: Severity;
}

export type OperationalStatus =
  | "Active"
  | "At Risk"
  | "Connected"
  | "Delayed"
  | "Enabled"
  | "Good"
  | "Invited"
  | "Normal"
  | "On Track"
  | "Open"
  | "Planned"
  | "Watch";

export interface SupplySiteRow {
  id: string;
  supplier: string;
  committedGwh: number;
  deliveredGwh: number;
  fulfillmentPercent: number;
  contractEnd: string;
  status: OperationalStatus;
}

export interface RatePlanRow {
  id: string;
  plan: string;
  provider: string;
  region: string;
  rateType: string;
  unitRate: number;
  status: OperationalStatus;
}

export interface CarbonSiteRow {
  id: string;
  site: string;
  emissions: number;
  intensity: number;
  deltaPercent: number;
  status: OperationalStatus;
}

export interface ConnectorCard {
  id: string;
  name: string;
  description: string;
  status: OperationalStatus;
  category: string;
}

export interface AccountDetail {
  label: string;
  value: string;
}

export interface AccountUserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: OperationalStatus;
  lastActive: string;
}
