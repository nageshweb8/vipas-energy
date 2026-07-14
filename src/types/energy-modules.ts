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

export interface SupplySiteRow {
  id: string;
  supplier: string;
  committedGwh: number;
  deliveredGwh: number;
  fulfillmentPercent: number;
  contractEnd: string;
  status: OperationalStatus;
}

export interface SupplyDeliveryRow {
  id: string;
  deliveryDate: string;
  supplier: string;
  commodity: string;
  quantityGwh: number;
  status: OperationalStatus;
}

export interface RatePlanRow {
  id: string;
  plan: string;
  provider: string;
  rateType: string;
  unitRate: number;
  demandCharge: number;
  effectiveDate: string;
  status: OperationalStatus;
}

export interface RateSimulationConfig {
  planName: string;
  consumptionKwh: string;
  demandKva: string;
  helperText: string;
}

export interface RateSummaryMetric {
  id: string;
  label: string;
  value: string;
  detail?: string;
  tone?: "default" | "positive";
}

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

export interface AccountSummaryItem {
  id: string;
  label: string;
  value: string;
  actionLabel: string;
  icon: ModuleKpiIcon;
  tone: "green" | "blue" | "violet";
  supportingText?: string;
}

export interface AccountBillingContact {
  id: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  badge?: string;
}

export interface AccountUserRow {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  status: OperationalStatus;
  lastActive: string;
}

export interface AccountSecuritySetting {
  id: string;
  label: string;
  description: string;
  value: string;
  enabled: boolean;
}

export interface AccountActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  tone: "green" | "blue" | "violet" | "red" | "warning";
  icon: ModuleKpiIcon;
}

export interface UsageAllocation {
  id: string;
  label: string;
  value: number;
  usedLabel: string;
  actionLabel: string;
  tone: "green" | "blue" | "violet";
}

export interface RoleDistributionItem {
  id: string;
  role: string;
  count: number;
  percentage: number;
  tone: "green" | "blue" | "violet" | "neutral";
}

export interface InvoiceRow {
  id: string;
  date: string;
  plan: string;
  billingCycle: string;
  amount: string;
  status: OperationalStatus;
}
