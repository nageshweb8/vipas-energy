import { Activity, AlertTriangle, Building2, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import type { DashboardKpi, DashboardKpiIcon } from "@/types/dashboard";

interface DashboardKpiStripProps {
  kpis: DashboardKpi[];
}

const kpiIconMap: Record<DashboardKpiIcon, LucideIcon> = {
  building: Building2,
  activity: Activity,
  alert: AlertTriangle,
  zap: Zap,
};

export function DashboardKpiStrip({ kpis }: DashboardKpiStripProps) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpiIconMap[kpi.icon];

        return (
          <KpiCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            caption={kpi.caption}
            trendValue={kpi.trendValue}
            trendLabel={kpi.trendLabel}
            trendDirection={kpi.trendDirection}
            trendSentiment={kpi.trendSentiment}
            tone={kpi.tone}
            icon={Icon}
          />
        );
      })}
    </section>
  );
}
