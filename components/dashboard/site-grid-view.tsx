import { Gauge, MapPin, RadioTower } from "lucide-react";

import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/dashboard/status-badge";
import type { EnergySite, EnergySiteStatus } from "@/types/dashboard";

interface SiteGridViewProps {
  sites: EnergySite[];
}

const statusVariant: Record<EnergySiteStatus, StatusBadgeVariant> = {
  Active: "success",
  Watch: "warning",
};

export function SiteGridView({ sites }: SiteGridViewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
      {sites.map((site) => (
        <article
          key={site.id}
          className="border-border-default bg-surface-bg rounded-xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-brand-secondary truncate text-sm font-semibold">
                {site.name}
              </h3>
              <p className="text-muted-foreground mt-1 inline-flex items-center gap-1 text-xs">
                <MapPin className="size-3.5" aria-hidden="true" />
                {site.city}, {site.state}
              </p>
            </div>
            <StatusBadge variant={statusVariant[site.status]}>
              {site.status}
            </StatusBadge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                Demand
              </p>
              <p className="text-brand-secondary mt-1 inline-flex items-center gap-2 text-lg font-bold">
                <Gauge className="size-4" aria-hidden="true" />
                {site.demandMw.toFixed(1)} MW
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                Portfolio Share
              </p>
              <p className="text-brand-secondary mt-1 text-lg font-bold">
                {site.portfolioSharePercent.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                Meter Points
              </p>
              <p className="text-brand-secondary mt-1 inline-flex items-center gap-2 text-sm font-semibold">
                <RadioTower className="size-4" aria-hidden="true" />
                {site.meterCount} connected meters
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                Latest Sync
              </p>
              <p className="text-brand-text mt-1 text-sm font-medium">
                {site.lastUpdatedLabel}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
