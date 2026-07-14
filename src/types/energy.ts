export type DemandKpiTone = "green" | "blue" | "violet" | "red";

export type TrendDirection = "up" | "down" | "flat";

export type TrendSentiment = "positive" | "negative" | "neutral";

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
  | "Expired"
  | "Good"
  | "Invited"
  | "Normal"
  | "On Track"
  | "Open"
  | "Paid"
  | "Planned"
  | "Upcoming"
  | "Watch";
