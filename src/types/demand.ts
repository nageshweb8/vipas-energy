export type DemandKpiIcon = "zap" | "bars" | "activity" | "target";

export type DemandKpiTone = "green" | "blue" | "violet" | "red";

export type TrendDirection = "up" | "down" | "flat";

export type TrendSentiment = "positive" | "negative" | "neutral";

export interface DemandKpiTrend {
  direction: TrendDirection;
  value: string;
  label: string;
  sentiment: TrendSentiment;
}

export interface DemandKpi {
  id: string;
  label: string;
  value: string;
  unit: string;
  caption: string;
  trend: DemandKpiTrend;
  icon: DemandKpiIcon;
  tone: DemandKpiTone;
}

export interface DemandTrendPoint {
  label: string;
  actual: number;
  forecast: number;
  previous: number;
  isForecast: boolean;
}

export interface DemandSiteBreakdown {
  name: string;
  demandMwh: number;
  percentage: number;
}

export type DemandAlertSeverity = "High" | "Medium" | "Low";

export interface DemandAlert {
  id: string;
  title: string;
  timestamp: string;
  severity: DemandAlertSeverity;
  description: string;
}

export type DemandSiteStatus = "High" | "Watch" | "Normal";

export interface DemandSiteRow {
  id: string;
  site: string;
  totalDemandMwh: number;
  percentageOfTotal: number;
  deltaPercent: number;
  status: DemandSiteStatus;
}

export interface DemandAssistantPrompt {
  id: string;
  label: string;
}

export interface DemandDashboardData {
  dateRangeLabel: string;
  refreshedLabel: string;
  timezoneLabel: string;
  kpis: DemandKpi[];
  trend: DemandTrendPoint[];
  siteBreakdown: DemandSiteBreakdown[];
  alerts: DemandAlert[];
  topSites: DemandSiteRow[];
  assistantPrompts: DemandAssistantPrompt[];
}
