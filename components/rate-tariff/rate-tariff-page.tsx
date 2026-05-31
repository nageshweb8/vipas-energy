"use client";

import { Download, Filter, Play } from "lucide-react";

import { BarComparisonChart } from "@/components/charts/bar-comparison-chart";
import { MultiLineChart } from "@/components/charts/multi-line-chart";
import { ActionAlertList } from "@/components/dashboard/action-alert-list";
import { AssistantEntry } from "@/components/dashboard/assistant-entry";
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
  Watch: "warning",
  Open: "info",
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

        <DashboardCard
          title="Rate Comparison"
          description="Supplier and regional rate comparison."
          className="xl:col-span-4"
        >
          <BarComparisonChart items={rateTariffData.comparison} unit="Rs/kWh" />
        </DashboardCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard title="Tariff Comparison" className="xl:col-span-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-border-default text-muted-foreground border-b text-xs">
                  <th className="pb-3 font-semibold">Plan</th>
                  <th className="pb-3 font-semibold">Provider</th>
                  <th className="pb-3 font-semibold">Region</th>
                  <th className="pb-3 font-semibold">Rate Type</th>
                  <th className="pb-3 font-semibold">Unit Rate</th>
                  <th className="pb-3 font-semibold">Status</th>
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
                    <td className="text-brand-text py-3">{row.region}</td>
                    <td className="text-brand-text py-3">{row.rateType}</td>
                    <td className="text-brand-text py-3">
                      Rs {row.unitRate.toFixed(2)}
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

        <ActionAlertList
          title="Tariff Opportunities"
          alerts={rateTariffData.alerts}
          className="xl:col-span-4"
        />
      </section>

      <DashboardCard
        title="Cost Simulation"
        description="Visual-only controls for the demo milestone."
      >
        <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_auto]">
          <Input readOnly value="C&I Time of Use Plan" />
          <Input readOnly value="220,000 kWh" />
          <Input readOnly value="600 kVA" />
          <Button type="button" className="gap-2">
            <Play className="size-4" aria-hidden="true" />
            Run Simulation
          </Button>
        </div>
      </DashboardCard>

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
