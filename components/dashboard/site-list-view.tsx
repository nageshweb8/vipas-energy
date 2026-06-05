import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/dashboard/status-badge";
import type { EnergySite, EnergySiteStatus } from "@/types/dashboard";

interface SiteListViewProps {
  sites: EnergySite[];
}

const statusVariant: Record<EnergySiteStatus, StatusBadgeVariant> = {
  Active: "success",
  Watch: "warning",
};

export function SiteListView({ sites }: SiteListViewProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-border-default text-muted-foreground border-b text-xs">
            <th className="pb-3 font-semibold">Site</th>
            <th className="pb-3 font-semibold">Location</th>
            <th className="pb-3 font-semibold">Demand (MW)</th>
            <th className="pb-3 font-semibold">Portfolio Share</th>
            <th className="pb-3 font-semibold">Meters</th>
            <th className="pb-3 font-semibold">Status</th>
            <th className="pb-3 font-semibold">Latest Sync</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr
              key={site.id}
              className="border-border-default/70 border-b last:border-b-0"
            >
              <td className="py-3 pr-4">
                <span className="text-brand-secondary font-semibold">
                  {site.name}
                </span>
              </td>
              <td className="text-brand-text py-3 pr-4">
                {site.city}, {site.state}
              </td>
              <td className="text-brand-secondary py-3 pr-4 font-semibold">
                {site.demandMw.toFixed(1)}
              </td>
              <td className="text-brand-text py-3 pr-4">
                {site.portfolioSharePercent.toFixed(1)}%
              </td>
              <td className="text-brand-text py-3 pr-4">{site.meterCount}</td>
              <td className="py-3 pr-4">
                <StatusBadge variant={statusVariant[site.status]}>
                  {site.status}
                </StatusBadge>
              </td>
              <td className="text-muted-foreground py-3">
                {site.lastUpdatedLabel}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
