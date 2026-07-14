import { ArrowRight } from "lucide-react";

import { DashboardCard } from "@/components/shared/dashboard-card";
import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import type { EnergySite, EnergySiteStatus } from "../models";

interface TopSitesCardProps {
  sites: EnergySite[];
  className?: string;
  onViewFullList?: () => void;
}

const statusVariant: Record<EnergySiteStatus, StatusBadgeVariant> = {
  Active: "success",
  Watch: "warning",
};

export function TopSitesCard({
  sites,
  className,
  onViewFullList,
}: TopSitesCardProps) {
  return (
    <DashboardCard
      title="Top 5 Sites"
      description="Highest current demand across the portfolio footprint."
      {...(className ? { className } : {})}
    >
      <div className="space-y-2.5">
        {sites.map((site, index) => (
          <article
            key={site.id}
            className="border-border-default bg-surface-bg flex items-center gap-3 rounded-xl border p-2.5"
          >
            <span className="bg-brand-mint text-brand-secondary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-brand-secondary truncate text-sm font-semibold">
                {site.name}
              </p>
              <p className="text-muted-foreground mt-1 truncate text-xs">
                {site.city}, {site.state}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-brand-secondary text-sm font-semibold">
                {site.demandMw.toFixed(1)} MW
              </p>
              <div className="mt-1 flex justify-end">
                <StatusBadge variant={statusVariant[site.status]}>
                  {site.status}
                </StatusBadge>
              </div>
            </div>
          </article>
        ))}

        <Button
          type="button"
          variant="ghost"
          className="text-brand-primary h-9 w-full justify-between"
          onClick={onViewFullList}
          disabled={!onViewFullList}
        >
          Open portfolio list
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </DashboardCard>
  );
}
