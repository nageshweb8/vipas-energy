"use client";

import { ArrowRight, Download, Filter } from "lucide-react";

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
import { supplyData } from "@/lib/stub/supply";
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
  "On Track": "success",
  "At Risk": "warning",
  Delayed: "danger",
};

export function SupplyManagementPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-brand-secondary text-3xl font-bold tracking-tight sm:text-4xl">
            Supply Management
          </h1>
          <p className="text-brand-text mt-3 max-w-2xl text-sm leading-6 sm:text-base">
            Track supplier commitments, generation coverage, fulfillment risk,
            and delivery health from staged reporting data.
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

      <ModuleKpiStrip kpis={supplyData.kpis} />

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard
          title="Supply Fulfillment Trend"
          className="xl:col-span-7"
          headerAction={
            <Button type="button" variant="outline" size="sm">
              Granularity: Daily
            </Button>
          }
        >
          <MultiLineChart
            labels={supplyData.trendLabels}
            yAxisName="GWh"
            series={supplyData.trendSeries.map((series) => ({
              name: series.name,
              values: series.values,
              color: trendToneColor[series.tone],
              dashed: series.dashed,
              area: series.area,
            }))}
          />
        </DashboardCard>

        <ActionAlertList
          title="Risk Alerts"
          alerts={supplyData.alerts}
          className="xl:col-span-5"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <DashboardCard title="Supplier Status" className="xl:col-span-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-border-default text-muted-foreground border-b text-xs">
                  <th className="pb-3 font-semibold">Supplier</th>
                  <th className="pb-3 font-semibold">Commitment</th>
                  <th className="pb-3 font-semibold">Delivered</th>
                  <th className="pb-3 font-semibold">Fulfillment</th>
                  <th className="pb-3 font-semibold">Contract End</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {supplyData.rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-border-default/70 border-b last:border-0"
                  >
                    <td className="text-brand-secondary py-3 font-semibold">
                      {row.supplier}
                    </td>
                    <td className="text-brand-text py-3">
                      {row.committedGwh.toFixed(1)} GWh
                    </td>
                    <td className="text-brand-text py-3">
                      {row.deliveredGwh.toFixed(1)} GWh
                    </td>
                    <td className="text-brand-text py-3">
                      {row.fulfillmentPercent.toFixed(1)}%
                    </td>
                    <td className="text-brand-text py-3">{row.contractEnd}</td>
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

        <DashboardCard title="Upcoming Deliveries" className="xl:col-span-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-border-default text-muted-foreground border-b text-xs">
                  <th className="pb-3 font-semibold">Delivery Date</th>
                  <th className="pb-3 font-semibold">Supplier</th>
                  <th className="pb-3 font-semibold">Commodity</th>
                  <th className="pb-3 font-semibold">Quantity</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {supplyData.deliveries.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="border-border-default/70 border-b last:border-0"
                  >
                    <td className="text-brand-text py-3">
                      {delivery.deliveryDate}
                    </td>
                    <td className="text-brand-secondary py-3 font-semibold">
                      {delivery.supplier}
                    </td>
                    <td className="text-brand-text py-3">
                      {delivery.commodity}
                    </td>
                    <td className="text-brand-text py-3">
                      {delivery.quantityGwh.toFixed(1)} GWh
                    </td>
                    <td className="py-3">
                      <StatusBadge
                        variant={statusVariant[delivery.status] ?? "neutral"}
                      >
                        {delivery.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="text-brand-primary inline-flex items-center gap-2 text-sm font-semibold"
            >
              View full schedule
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <DataFreshnessIndicator
          timezoneLabel={supplyData.timezoneLabel}
          refreshedLabel={supplyData.refreshedLabel}
        />
        <AssistantEntry />
      </section>
    </main>
  );
}
