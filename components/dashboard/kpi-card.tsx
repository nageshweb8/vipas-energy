import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

import type {
  DemandKpiTone,
  TrendDirection,
  TrendSentiment,
} from "@/types/demand";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  unit: string;
  caption: string;
  trendValue: string;
  trendLabel: string;
  trendDirection: TrendDirection;
  trendSentiment: TrendSentiment;
  tone: DemandKpiTone;
  icon: LucideIcon;
}

const toneClasses: Record<DemandKpiTone, string> = {
  green: "bg-brand-mint text-brand-primary ring-brand-primary/10",
  blue: "bg-info/10 text-info ring-info/10",
  violet: "bg-violet-500/10 text-violet-600 ring-violet-500/10",
  red: "bg-danger/10 text-danger ring-danger/10",
};

const sentimentClasses: Record<TrendSentiment, string> = {
  positive: "text-success",
  negative: "text-danger",
  neutral: "text-muted-foreground",
};

const trendIcons: Record<TrendDirection, LucideIcon> = {
  up: ArrowUp,
  down: ArrowDown,
  flat: ArrowRight,
};

export function KpiCard({
  label,
  value,
  unit,
  caption,
  trendValue,
  trendLabel,
  trendDirection,
  trendSentiment,
  tone,
  icon: Icon,
}: KpiCardProps) {
  const TrendIcon = trendIcons[trendDirection];

  return (
    <article className="border-border-default bg-surface-white rounded-xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-full ring-1",
            toneClasses[tone],
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-brand-text text-sm font-medium">{label}</p>
          <div className="mt-2 flex flex-wrap items-end gap-x-1.5 gap-y-1">
            <span className="text-brand-secondary text-2xl font-bold tracking-tight">
              {value}
            </span>
            <span className="text-brand-secondary pb-0.5 text-sm font-semibold">
              {unit}
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">{caption}</p>
          <div
            className={cn(
              "mt-3 flex items-center gap-1 text-xs font-semibold",
              sentimentClasses[trendSentiment],
            )}
          >
            <TrendIcon className="size-3.5" aria-hidden="true" />
            <span>{trendValue}</span>
            <span className="text-muted-foreground font-medium">
              {trendLabel}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
