"use client";

import {
  AlertTriangle,
  ArrowRight,
  Clock3,
  Download,
  Filter,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { MultiLineChart } from "@/components/charts/multi-line-chart";
import { AssistantEntry } from "@/components/dashboard/assistant-entry";
import { BreakdownCard } from "@/components/dashboard/breakdown-card";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DataFreshnessIndicator } from "@/components/dashboard/data-freshness-indicator";
import { ModuleKpiStrip } from "@/components/dashboard/module-kpi-strip";
import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { rateTariffData } from "@/lib/stub/rate-tariff";
import { chartColors } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import type { OperationalStatus, TrendSeries } from "@/types/energy-modules";

const trendToneColor: Record<TrendSeries["tone"], string> = {
  primary: chartColors.primary,
  info: chartColors.info,
  accent: chartColors.accent,
  warning: chartColors.warning,
  neutral: chartColors.neutral,
};

const statusVariant: Partial<Record<OperationalStatus, StatusBadgeVariant>> = {
  Active: "success",
  Upcoming: "info",
  Expired: "danger",
};

const tariffAlertVariant: Record<string, StatusBadgeVariant> = {
  "rate-revision": "warning",
  "contract-expiry": "warning",
  "rate-update": "info",
};

const tariffAlertIconMap: Record<string, LucideIcon> = {
  "rate-revision": AlertTriangle,
  "contract-expiry": Clock3,
  "rate-update": Info,
};

const tariffAlertIconTone: Record<string, string> = {
  "rate-revision": "bg-warning/10 text-warning",
  "contract-expiry": "bg-warning/10 text-warning",
  "rate-update": "bg-info/10 text-info",
};

export function RateTariffPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-brand-secondary text-3xl font-bold tracking-tight sm:text-4xl">
            Rate & Tariff
          </h1>
          <p className="text-brand-text mt-3 max-w-2xl text-sm leading-6 sm:text-base">
            Centralize tariff plans, rate movement, comparison intelligence, and
            savings opportunities for Anand&apos;s rate analytics story.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" className="h-10 gap-2">
            <Filter className="size-4" aria-hidden="true" />
            Filters
          </Button>
          <Button type="button" className="h-10 gap-2">
            <Download className="size-4" aria-hidden="true" />
            Export
          </Button>
        </div>
      </section>

      <ModuleKpiStrip kpis={rateTariffData.kpis} />

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard
          title="Rate Movement"
          description="Weighted average unit rate across active tariff plans."
          className="xl:col-span-8"
          headerAction={
            <Button type="button" variant="outline" size="sm">
              7D
            </Button>
          }
        >
          <MultiLineChart
            labels={rateTariffData.trendLabels}
            yAxisName="Rs/kWh"
            series={rateTariffData.trendSeries.map((series) => ({
              name: series.name,
              values: series.values,
              color: trendToneColor[series.tone],
              dashed: series.dashed,
              area: series.area,
            }))}
          />
        </DashboardCard>

        <BreakdownCard
          title="Time-of-Use Breakdown (Today)"
          items={rateTariffData.timeOfUseBreakdown}
          centerLabel="24,680"
          centerSubtext="Rs\nTotal Cost"
          actionLabel="View full TOU details"
          className="xl:col-span-4"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard title="Tariff Comparison" className="xl:col-span-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-border-default text-muted-foreground border-b text-xs">
                  <th className="pb-3 font-semibold">Plan Name</th>
                  <th className="pb-3 font-semibold">Provider</th>
                  <th className="pb-3 font-semibold">Rate Type</th>
                  <th className="pb-3 font-semibold">Unit Rate</th>
                  <th className="pb-3 font-semibold">Demand Charge</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Effective Date</th>
                </tr>
              </thead>
              <tbody>
                {rateTariffData.rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-border-default/70 border-b last:border-0"
                  >
                    <td className="text-brand-secondary py-3 font-semibold">
                      {row.plan}
                    </td>
                    <td className="text-brand-text py-3">{row.provider}</td>
                    <td className="text-brand-text py-3">{row.rateType}</td>
                    <td className="text-brand-text py-3">
                      Rs {row.unitRate.toFixed(2)}
                    </td>
                    <td className="text-brand-text py-3">
                      Rs {row.demandCharge.toFixed(0)}
                    </td>
                    <td className="py-3">
                      <StatusBadge
                        variant={statusVariant[row.status] ?? "neutral"}
                      >
                        {row.status}
                      </StatusBadge>
                    </td>
                    <td className="text-brand-text py-3">
                      {row.effectiveDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Tariff Alerts"
          className="xl:col-span-4"
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
          <div className="space-y-3">
            {rateTariffData.alerts.map((alert) => {
              const AlertIcon = tariffAlertIconMap[alert.id] ?? Info;

              return (
                <article
                  key={alert.id}
                  className="border-border-default/70 flex items-center gap-3 rounded-lg border p-3"
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full",
                      tariffAlertIconTone[alert.id] ?? "bg-info/10 text-info",
                    )}
                  >
                    <AlertIcon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-brand-secondary truncate text-sm font-semibold">
                      {alert.title}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {alert.description}
                    </p>
                  </div>
                  <StatusBadge
                    variant={tariffAlertVariant[alert.id] ?? "neutral"}
                  >
                    {alert.meta}
                  </StatusBadge>
                </article>
              );
            })}
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard
          title="Cost Simulation (Next 30 Days)"
          className="xl:col-span-7"
        >
          <div className="grid gap-3 md:grid-cols-[1.25fr_1fr_1fr_auto] md:items-end">
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-xs font-medium">
                Select Plan
              </p>
              <Input readOnly value={rateTariffData.costSimulation.planName} />
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-xs font-medium">
                Consumption (kWh)
              </p>
              <Input
                readOnly
                value={rateTariffData.costSimulation.consumptionKwh}
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-xs font-medium">
                Demand (kVA)
              </p>
              <Input readOnly value={rateTariffData.costSimulation.demandKva} />
            </div>
            <Button type="button" className="h-10">
              Run Simulation
            </Button>
          </div>
          <p className="text-muted-foreground mt-3 text-xs">
            {rateTariffData.costSimulation.helperText}
          </p>
        </DashboardCard>

        <DashboardCard className="xl:col-span-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rateTariffData.costSummary.map((item) => (
              <div key={item.id} className="min-w-0">
                <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  {item.label}
                </p>
                <p className="text-brand-secondary mt-2 text-lg font-bold tracking-tight">
                  {item.value}
                </p>
                {item.detail && (
                  <p
                    className={cn(
                      "mt-1 text-xs font-medium",
                      item.tone === "positive"
                        ? "text-success"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <DataFreshnessIndicator
          timezoneLabel={rateTariffData.timezoneLabel}
          refreshedLabel={rateTariffData.refreshedLabel}
        />
        <AssistantEntry />
      </section>
    </main>
  );
}
