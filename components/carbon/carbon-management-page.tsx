"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronRight,
  Download,
  FileText,
  Filter,
  Lightbulb,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { MultiLineChart } from "@/components/charts/multi-line-chart";
import { AssistantEntry } from "@/components/dashboard/assistant-entry";
import { BreakdownCard } from "@/components/dashboard/breakdown-card";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DataFreshnessIndicator } from "@/components/dashboard/data-freshness-indicator";
import { ModuleKpiStrip } from "@/components/dashboard/module-kpi-strip";
import { Button } from "@/components/ui/button";
import { carbonData } from "@/lib/stub/carbon";
import { chartColors } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import type {
  CarbonInitiativeStatus,
  TrendSeries,
} from "@/types/energy-modules";

const trendToneColor: Record<TrendSeries["tone"], string> = {
  primary: chartColors.primary,
  info: chartColors.info,
  accent: chartColors.accent,
  warning: chartColors.warning,
  neutral: chartColors.neutral,
};

const initiativeIconMap: Record<string, LucideIcon> = {
  "solar-expansion-phase-2": TrendingUp,
  "hvac-efficiency-upgrade": Sun,
  "fleet-electrification": Zap,
  "led-lighting-retrofit": Lightbulb,
};

const initiativeIconToneClasses: Record<string, string> = {
  "solar-expansion-phase-2": "bg-brand-mint text-brand-primary",
  "hvac-efficiency-upgrade": "bg-warning/10 text-warning",
  "fleet-electrification": "bg-info/10 text-info",
  "led-lighting-retrofit": "bg-brand-mint text-brand-primary",
};

const initiativeProgressWidthClasses: Record<string, string> = {
  "solar-expansion-phase-2": "w-3/4",
  "hvac-efficiency-upgrade": "w-2/5",
  "fleet-electrification": "w-[15%]",
  "led-lighting-retrofit": "w-[90%]",
};

const initiativeProgressToneClasses: Record<CarbonInitiativeStatus, string> = {
  "On Track": "bg-brand-primary",
  "In Progress": "bg-info",
  Planned: "bg-violet-500",
  Completed: "bg-brand-primary",
};

const initiativeStatusClasses: Record<CarbonInitiativeStatus, string> = {
  "On Track": "border-brand-primary/15 bg-brand-mint text-brand-primary",
  "In Progress": "border-info/15 bg-info/10 text-info",
  Planned: "border-violet-500/15 bg-violet-500/10 text-violet-600",
  Completed: "border-brand-primary/15 bg-brand-mint text-brand-primary",
};

export function CarbonManagementPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-brand-secondary text-3xl font-bold tracking-tight sm:text-4xl">
            Carbon Management
          </h1>
          <p className="text-brand-text mt-3 max-w-2xl text-sm leading-6 sm:text-base">
            Track emissions impact, reduction performance, and compliance-ready
            sustainability insights from the staged reporting layer.
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

      <ModuleKpiStrip kpis={carbonData.kpis} />

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard
          title="Emissions Trend"
          description="Portfolio emissions, intensity, and previous period context."
          className="xl:col-span-8"
          headerAction={
            <Button type="button" variant="outline" size="sm">
              Granularity: Daily
            </Button>
          }
        >
          <MultiLineChart
            labels={carbonData.trendLabels}
            yAxisName="tCO2e"
            series={carbonData.trendSeries.map((series) => ({
              name: series.name,
              values: series.values,
              color: trendToneColor[series.tone],
              dashed: series.dashed,
              area: series.area,
            }))}
          />
        </DashboardCard>

        <BreakdownCard
          title="Emissions by Source"
          items={carbonData.breakdown}
          centerLabel="12,845"
          centerSubtext="tCO2e\nTotal"
          actionLabel="View all sources"
          className="xl:col-span-4"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard
          title="Reduction Initiatives"
          className="xl:col-span-4"
          headerAction={
            <button
              type="button"
              className="text-brand-primary inline-flex items-center gap-2 text-sm font-semibold"
            >
              View all initiatives
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          }
        >
          <div className="space-y-3">
            {carbonData.initiatives.map((initiative) => {
              const InitiativeIcon =
                initiativeIconMap[initiative.id] ?? TrendingUp;

              return (
                <article
                  key={initiative.id}
                  className="border-border-default bg-surface-bg rounded-xl border p-3"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-full",
                        initiativeIconToneClasses[initiative.id] ??
                          "bg-brand-mint text-brand-primary",
                      )}
                    >
                      <InitiativeIcon className="size-5" aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-brand-secondary truncate text-sm font-semibold">
                            {initiative.title}
                          </p>
                          <p className="text-muted-foreground mt-1 text-xs">
                            {initiative.annualImpactTco2e.toLocaleString()}{" "}
                            tCO2e annual impact
                          </p>
                        </div>

                        <span
                          className={cn(
                            "inline-flex h-6 items-center rounded-md border px-2 text-xs font-semibold",
                            initiativeStatusClasses[initiative.status],
                          )}
                        >
                          {initiative.status}
                        </span>

                        <ChevronRight
                          className="text-muted-foreground mt-1 size-4 shrink-0"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <span className="bg-border-default h-2 flex-1 overflow-hidden rounded-full">
                          <span
                            className={cn(
                              "block h-full rounded-full",
                              initiativeProgressToneClasses[initiative.status],
                              initiativeProgressWidthClasses[initiative.id],
                            )}
                          />
                        </span>
                        <span className="text-brand-text text-xs font-semibold">
                          {initiative.progressPercent}%
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </DashboardCard>

        <DashboardCard title="Reporting & Compliance" className="xl:col-span-3">
          <div className="space-y-3">
            {carbonData.reports.map((report) => (
              <article
                key={report.id}
                className="border-border-default bg-surface-bg flex items-center gap-3 rounded-xl border p-3"
              >
                <span className="bg-brand-mint text-brand-primary flex size-11 shrink-0 items-center justify-center rounded-full">
                  <FileText className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-brand-secondary text-sm leading-5 font-semibold">
                    {report.title}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {report.detail}
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm">
                  View
                </Button>
              </article>
            ))}

            <button
              type="button"
              className="text-brand-primary inline-flex items-center gap-2 pt-1 text-sm font-semibold"
            >
              View all reports
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </DashboardCard>

        <DashboardCard title="Emissions by Site" className="xl:col-span-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[660px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-border-default text-muted-foreground border-b text-xs">
                  <th className="pb-3 font-semibold">Site</th>
                  <th className="pb-3 font-semibold">
                    <span className="block">Emissions</span>
                    <span className="block text-[11px] font-medium">
                      (tCO2e)
                    </span>
                  </th>
                  <th className="pb-3 font-semibold">
                    <span className="block">Intensity</span>
                    <span className="block text-[11px] font-medium">
                      (tCO2e / MWh)
                    </span>
                  </th>
                  <th className="pb-3 font-semibold">vs Last Week</th>
                </tr>
              </thead>
              <tbody>
                {carbonData.rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-border-default/70 border-b last:border-0"
                  >
                    <td className="text-brand-secondary py-3 font-semibold">
                      {row.site}
                    </td>
                    <td className="text-brand-text py-3">
                      {row.emissions.toLocaleString()}
                    </td>
                    <td className="text-brand-text py-3 font-medium">
                      {row.intensity.toFixed(2)}
                    </td>
                    <td
                      className={cn(
                        "py-3 font-semibold",
                        row.deltaPercent <= 0 ? "text-success" : "text-danger",
                      )}
                    >
                      <span className="inline-flex items-center gap-1">
                        {row.deltaPercent <= 0 ? (
                          <ArrowDown className="size-3.5" aria-hidden="true" />
                        ) : (
                          <ArrowUp className="size-3.5" aria-hidden="true" />
                        )}
                        {Math.abs(row.deltaPercent).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-border-default/70 border-t">
                  <td className="text-brand-secondary pt-4 font-semibold">
                    Total
                  </td>
                  <td className="text-brand-secondary pt-4 font-semibold">
                    {carbonData.siteTotals.emissions.toLocaleString()}
                  </td>
                  <td className="text-brand-secondary pt-4 font-semibold">
                    {carbonData.siteTotals.intensity.toFixed(2)}
                  </td>
                  <td
                    className={cn(
                      "pt-4 font-semibold",
                      carbonData.siteTotals.deltaPercent <= 0
                        ? "text-success"
                        : "text-danger",
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {carbonData.siteTotals.deltaPercent <= 0 ? (
                        <ArrowDown className="size-3.5" aria-hidden="true" />
                      ) : (
                        <ArrowUp className="size-3.5" aria-hidden="true" />
                      )}
                      {Math.abs(carbonData.siteTotals.deltaPercent).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <DataFreshnessIndicator
          timezoneLabel={carbonData.timezoneLabel}
          refreshedLabel={carbonData.refreshedLabel}
        />
        <AssistantEntry />
      </section>
    </main>
  );
}
