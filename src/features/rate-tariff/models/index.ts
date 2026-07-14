import type { OperationalStatus } from "@/types/energy";

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
