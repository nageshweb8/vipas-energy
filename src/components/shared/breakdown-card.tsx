import { ArrowRight } from "lucide-react";

import { DonutBreakdownChart } from "@/components/charts/donut-breakdown-chart";
import { DashboardCard } from "@/components/shared/dashboard-card";
import { cn } from "@/lib/utils";
import type { BreakdownItem } from "@/types/energy";

interface BreakdownCardProps {
  title: string;
  items: BreakdownItem[];
  centerLabel: string;
  centerSubtext: string;
  actionLabel: string;
  className?: string;
}

const dotClasses = [
  "bg-brand-primary",
  "bg-info",
  "bg-violet-500",
  "bg-warning",
  "bg-slate-300",
] as const;

export function BreakdownCard({
  title,
  items,
  centerLabel,
  centerSubtext,
  actionLabel,
  className,
}: BreakdownCardProps) {
  return (
    <DashboardCard title={title} {...(className ? { className } : {})}>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12.5rem] xl:grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_12rem]">
        <DonutBreakdownChart
          segments={items.map((item) => ({
            name: item.name,
            value: item.value,
            label: item.label,
          }))}
          centerLabel={centerLabel}
          centerSubtext={centerSubtext}
        />
        <div className="space-y-2.5 self-start sm:pt-3 xl:pt-0 2xl:pt-3">
          {items.map((item, index) => (
            <div key={item.name} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-1.5 size-2 shrink-0 rounded-full",
                  dotClasses[index % dotClasses.length] ?? "bg-slate-400",
                )}
              />
              <div className="min-w-0">
                <p className="text-brand-secondary truncate text-[13px] leading-5 font-semibold">
                  {item.name}
                </p>
                <p className="text-muted-foreground text-[11px] leading-4">
                  {item.label} ({item.percentage.toFixed(1)}%)
                </p>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-brand-primary inline-flex items-center gap-2 pt-1 text-sm font-semibold"
          >
            {actionLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </DashboardCard>
  );
}
