import type {
  DemandKpiTone,
  TrendDirection,
  TrendSentiment,
} from "@/types/demand";

export type DashboardKpiIcon = "building" | "activity" | "alert" | "zap";

export type EnergySiteStatus = "Active" | "Watch";

export interface DashboardKpi {
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
  icon: DashboardKpiIcon;
}

export interface EnabledModule {
  id: string;
  label: string;
}

export interface EnergySite {
  id: string;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  status: EnergySiteStatus;
  demandMw: number;
  portfolioSharePercent: number;
  meterCount: number;
  lastUpdatedLabel: string;
}

export interface DashboardData {
  refreshedLabel: string;
  timezoneLabel: string;
  kpis: DashboardKpi[];
  enabledModules: EnabledModule[];
  sites: EnergySite[];
  topSites: EnergySite[];
}
