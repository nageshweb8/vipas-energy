"use client";

import { ArrowDown, ArrowUp, Download, Filter } from "lucide-react";

import { MultiLineChart } from "@/components/charts/multi-line-chart";
import { ActionAlertList } from "@/components/dashboard/action-alert-list";
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
import { carbonData } from "@/lib/stub/carbon";
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
  "On Track": "success",
  Watch: "warning",
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
        <ActionAlertList
          title="Reduction Opportunities"
          alerts={carbonData.alerts}
          className="xl:col-span-5"
        />

        <DashboardCard title="Emissions by Site" className="xl:col-span-7">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-border-default text-muted-foreground border-b text-xs">
                  <th className="pb-3 font-semibold">Site</th>
                  <th className="pb-3 font-semibold">Emissions</th>
                  <th className="pb-3 font-semibold">Intensity</th>
                  <th className="pb-3 font-semibold">vs Last Week</th>
                  <th className="pb-3 font-semibold">Status</th>
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
                      {row.emissions.toLocaleString()} tCO2e
                    </td>
                    <td className="text-brand-text py-3">
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
                    <td className="py-3">
                      <StatusBadge
                        variant={statusVariant[row.status] ?? "neutral"}
                      >
                        {row.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
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
