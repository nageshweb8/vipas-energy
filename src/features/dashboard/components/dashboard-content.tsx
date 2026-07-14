"use client";

import { useState } from "react";
import { Download, Filter } from "lucide-react";

import { DashboardCard } from "@/components/shared/dashboard-card";
import { DataFreshnessIndicator } from "@/components/shared/data-freshness-indicator";
import { ViewSwitcher, type PortfolioViewMode } from "./view-switcher";
import { DashboardKpiStrip } from "./dashboard-kpi-strip";
import { SiteGridView } from "./site-grid-view";
import { SiteListView } from "./site-list-view";
import { SiteMapChart } from "./site-map-chart";
import { TopSitesCard } from "./top-sites-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DashboardData } from "../models";

interface DashboardContentProps {
  data: DashboardData;
}

export function DashboardContent({ data }: DashboardContentProps) {
  const [viewMode, setViewMode] = useState<PortfolioViewMode>("map");
  const coverageCount = new Set(data.sites.map((site) => site.state)).size;

  const viewTitle =
    viewMode === "map"
      ? "Portfolio Site Map"
      : viewMode === "grid"
        ? "Portfolio Site Grid"
        : "Portfolio Site List";

  const viewDescription =
    viewMode === "map"
      ? "Use the United States portfolio footprint as the primary default view for the post-login experience."
      : viewMode === "grid"
        ? "Scan site health, load, and connected meters in a compact portfolio grid."
        : "Review the full portfolio as a structured operational list before drilling into a module workflow.";

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-5 sm:px-5 lg:px-6">
      <section className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-brand-secondary text-2xl font-bold tracking-tight sm:text-3xl">
            Energy Portfolio Overview
          </h1>
          <p className="text-brand-text mt-3 max-w-2xl text-sm leading-6 sm:text-base">
            Start with the national portfolio footprint, confirm enabled
            modules, and move into demand, supply, rate, or carbon workflows
            from a single overview.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ViewSwitcher value={viewMode} onChange={setViewMode} />
          <Button
            type="button"
            variant="outline"
            className="h-9 gap-2"
            disabled
          >
            <Filter className="size-4" aria-hidden="true" />
            Filters
          </Button>
          <Button type="button" className="h-9 gap-2" disabled>
            <Download className="size-4" aria-hidden="true" />
            Export
          </Button>
        </div>
      </section>

      <DataFreshnessIndicator
        timezoneLabel={data.timezoneLabel}
        refreshedLabel={data.refreshedLabel}
      />

      <section className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Enabled Modules
          </span>
          {data.enabledModules.map((module) => (
            <Badge
              key={module.id}
              variant="outline"
              className="border-brand-primary/20 bg-brand-mint text-brand-secondary px-2.5 py-1 text-xs font-semibold"
            >
              {module.label}
            </Badge>
          ))}
        </div>

        <p className="text-muted-foreground text-xs font-medium">
          {data.sites.length} sites across {coverageCount} states
        </p>
      </section>

      <DashboardKpiStrip kpis={data.kpis} />

      <section className="grid gap-3 xl:grid-cols-12">
        <DashboardCard
          title={viewTitle}
          description={viewDescription}
          className="xl:col-span-8"
        >
          {viewMode === "map" ? (
            <SiteMapChart sites={data.sites} />
          ) : viewMode === "grid" ? (
            <SiteGridView sites={data.sites} />
          ) : (
            <SiteListView sites={data.sites} />
          )}
        </DashboardCard>

        <TopSitesCard
          className="xl:col-span-4"
          sites={data.topSites}
          onViewFullList={() => setViewMode("list")}
        />
      </section>
    </main>
  );
}
