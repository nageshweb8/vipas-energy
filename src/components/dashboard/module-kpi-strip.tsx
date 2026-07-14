import {
  Activity,
  AlertTriangle,
  BarChart3,
  CalendarDays,
  Cloud,
  CreditCard,
  Database,
  Leaf,
  ShieldCheck,
  Target,
  UsersRound,
  WalletCards,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import type { ModuleKpi, ModuleKpiIcon } from "@/types/energy-modules";

interface ModuleKpiStripProps {
  kpis: ModuleKpi[];
}

const moduleKpiIconMap: Record<ModuleKpiIcon, LucideIcon> = {
  activity: Activity,
  alert: AlertTriangle,
  bar: BarChart3,
  calendar: CalendarDays,
  cloud: Cloud,
  credit: CreditCard,
  database: Database,
  leaf: Leaf,
  shield: ShieldCheck,
  target: Target,
  users: UsersRound,
  wallet: WalletCards,
  zap: Zap,
};

export function ModuleKpiStrip({ kpis }: ModuleKpiStripProps) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = moduleKpiIconMap[kpi.icon];

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
