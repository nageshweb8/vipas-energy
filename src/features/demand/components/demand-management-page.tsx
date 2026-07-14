"use client";

import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  ChevronRight,
  Download,
  Filter,
  Info,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { DashboardCard } from "@/components/shared/dashboard-card";
import { DataFreshnessIndicator } from "@/components/shared/data-freshness-indicator";
import { KpiCard } from "@/components/shared/kpi-card";
import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemandBySiteChart } from "./demand-by-site-chart";
import { DemandTrendChart } from "./demand-trend-chart";
import { demandDashboardData } from "../mocks/demand";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { setAssistantOpen } from "@/store/slices/uiSlice";
import type {
  DemandAlertSeverity,
  DemandKpiIcon,
  DemandSiteStatus,
} from "../models";

const kpiIcons: Record<DemandKpiIcon, LucideIcon> = {
  zap: Zap,
  bars: BarChart3,
  activity: Activity,
  target: Target,
};

const severityVariant: Record<DemandAlertSeverity, StatusBadgeVariant> = {
  High: "danger",
  Medium: "warning",
  Low: "info",
};

const siteStatusVariant: Record<DemandSiteStatus, StatusBadgeVariant> = {
  High: "danger",
  Watch: "warning",
  Normal: "success",
};

const breakdownDotClasses = [
  "bg-brand-primary",
  "bg-info",
  "bg-violet-500",
  "bg-slate-400",
  "bg-slate-300",
] as const;

export function DemandManagementPage() {
  const dispatch = useAppDispatch();
  const data = demandDashboardData;

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-5 sm:px-5 lg:px-6">
      <section className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-brand-secondary text-2xl font-bold tracking-tight sm:text-3xl">
            Demand Management
          </h1>
          <p className="text-brand-text mt-3 max-w-2xl text-sm leading-6 sm:text-base">
            Monitor portfolio demand, forecast variance, and anomaly signals
            from staged reporting data so Anand can walk through the operating
            story clearly.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" className="h-9 gap-2">
            <Filter className="size-4" aria-hidden="true" />
            Filters
          </Button>
          <Button type="button" className="h-9 gap-2">
            <Download className="size-4" aria-hidden="true" />
            Export
          </Button>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((kpi) => {
          const Icon = kpiIcons[kpi.icon];

          return (
            <KpiCard
              key={kpi.id}
              label={kpi.label}
              value={kpi.value}
              unit={kpi.unit}
              caption={kpi.caption}
              trendValue={kpi.trend.value}
              trendLabel={kpi.trend.label}
              trendDirection={kpi.trend.direction}
              trendSentiment={kpi.trend.sentiment}
              tone={kpi.tone}
              icon={Icon}
            />
          );
        })}
      </section>

      <section className="grid gap-3 xl:grid-cols-12">
        <DashboardCard
          title="Demand Trend"
          className="xl:col-span-8"
          headerAction={
            <div className="flex items-center gap-2">
              <div className="border-border-default hidden overflow-hidden rounded-lg border sm:flex">
                <button
                  type="button"
                  className="bg-brand-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold"
                >
                  MWh
                </button>
                <button
                  type="button"
                  className="text-brand-text px-3 py-1.5 text-xs font-semibold"
                >
                  kW
                </button>
              </div>
              <Button type="button" variant="outline" size="sm">
                Granularity: Hourly
              </Button>
            </div>
          }
        >
          <DemandTrendChart data={data.trend} />
        </DashboardCard>

        <DashboardCard title="Demand by Site" className="xl:col-span-4">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12.5rem] xl:grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_12rem]">
            <DemandBySiteChart data={data.siteBreakdown} totalLabel="128.4" />
            <div className="space-y-2.5 self-start sm:pt-3 xl:pt-0 2xl:pt-3">
              {data.siteBreakdown.map((site, index) => (
                <div key={site.name} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      breakdownDotClasses[index % breakdownDotClasses.length] ??
                        "bg-slate-400",
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-brand-secondary truncate text-[13px] leading-5 font-semibold">
                      {site.name}
                    </p>
                    <p className="text-muted-foreground text-[11px] leading-4">
                      {site.demandMwh.toFixed(1)} MWh (
                      {site.percentage.toFixed(1)}
                      %)
                    </p>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="text-brand-primary inline-flex items-center gap-2 pt-1 text-sm font-semibold"
              >
                View all sites
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-3 xl:grid-cols-12">
        <DashboardCard
          title="Anomalies & Alerts"
          className="xl:col-span-5"
          headerAction={
            <button
              type="button"
              className="text-brand-primary inline-flex items-center gap-2 text-sm font-semibold"
            >
              View all alerts
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          }
        >
          <div className="space-y-2.5">
            {data.alerts.map((alert) => (
              <article
                key={alert.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-2.5",
                  alert.severity === "High" && "border-danger/10 bg-danger/5",
                  alert.severity === "Medium" &&
                    "border-warning/10 bg-warning/5",
                  alert.severity === "Low" && "border-info/10 bg-info/5",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    alert.severity === "High" && "bg-danger/10 text-danger",
                    alert.severity === "Medium" && "bg-warning/10 text-warning",
                    alert.severity === "Low" && "bg-info/10 text-info",
                  )}
                >
                  {alert.severity === "High" ? (
                    <TrendingUp className="size-5" aria-hidden="true" />
                  ) : alert.severity === "Medium" ? (
                    <Info className="size-5" aria-hidden="true" />
                  ) : (
                    <Activity className="size-5" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-brand-secondary truncate text-sm font-semibold">
                    {alert.title}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {alert.timestamp}
                  </p>
                  <p className="text-muted-foreground mt-1 line-clamp-1 text-xs">
                    {alert.description}
                  </p>
                </div>
                <StatusBadge variant={severityVariant[alert.severity]}>
                  {alert.severity}
                </StatusBadge>
                <ChevronRight
                  className="text-muted-foreground size-4 shrink-0"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Top Consuming Sites" className="xl:col-span-7">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-border-default text-muted-foreground border-b text-xs">
                  <th className="pb-3 font-semibold">Site</th>
                  <th className="pb-3 font-semibold">Total Demand (MWh)</th>
                  <th className="pb-3 font-semibold">% of Total</th>
                  <th className="pb-3 font-semibold">vs Last Week</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 text-right font-semibold">Signal</th>
                </tr>
              </thead>
              <tbody>
                {data.topSites.map((site) => (
                  <tr
                    key={site.id}
                    className="border-border-default/70 border-b last:border-0"
                  >
                    <td className="text-brand-secondary py-2.5 font-semibold">
                      {site.site}
                    </td>
                    <td className="text-brand-text py-2.5">
                      {site.totalDemandMwh.toFixed(1)}
                    </td>
                    <td className="text-brand-text py-2.5">
                      {site.percentageOfTotal.toFixed(1)}%
                    </td>
                    <td
                      className={cn(
                        "py-2.5 font-semibold",
                        site.deltaPercent >= 0 ? "text-success" : "text-danger",
                      )}
                    >
                      <span className="inline-flex items-center gap-1">
                        {site.deltaPercent >= 0 ? (
                          <ArrowUp className="size-3.5" aria-hidden="true" />
                        ) : (
                          <ArrowDown className="size-3.5" aria-hidden="true" />
                        )}
                        {Math.abs(site.deltaPercent).toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-2.5">
                      <StatusBadge variant={siteStatusVariant[site.status]}>
                        {site.status}
                      </StatusBadge>
                    </td>
                    <td className="py-2.5 text-right">
                      <TrendingUp
                        className="text-brand-primary ml-auto size-5"
                        aria-hidden="true"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <DataFreshnessIndicator
          timezoneLabel={data.timezoneLabel}
          refreshedLabel={data.refreshedLabel}
        />

        <button
          type="button"
          onClick={() => dispatch(setAssistantOpen(true))}
          className="border-border-default bg-surface-white hover:border-brand-primary/40 flex h-14 items-center gap-3 rounded-xl border px-4 text-left shadow-sm transition hover:shadow-md"
        >
          <Sparkles className="size-5 shrink-0 text-violet-500" />
          <span className="text-muted-foreground min-w-0 flex-1 truncate text-sm">
            Ask Vipas Assistant...
          </span>
          <Send className="text-brand-primary size-5 shrink-0" />
        </button>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {data.assistantPrompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            onClick={() => dispatch(setAssistantOpen(true))}
            className="border-border-default bg-surface-white text-brand-secondary hover:border-brand-primary/40 hover:bg-brand-mint flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left text-sm font-semibold shadow-sm transition"
          >
            <span>{prompt.label}</span>
            <Badge
              variant="outline"
              className="text-brand-primary bg-surface-white"
            >
              Ask
            </Badge>
          </button>
        ))}
      </section>
    </main>
  );
}
