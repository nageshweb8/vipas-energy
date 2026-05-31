import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Info,
  ShieldAlert,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/dashboard/status-badge";
import { cn } from "@/lib/utils";
import type { ActionAlert, Severity } from "@/types/energy-modules";

interface ActionAlertListProps {
  title: string;
  alerts: ActionAlert[];
  className?: string;
}

const severityVariant: Record<Severity, StatusBadgeVariant> = {
  High: "danger",
  Medium: "warning",
  Low: "info",
  Info: "neutral",
};

export function ActionAlertList({
  title,
  alerts,
  className,
}: ActionAlertListProps) {
  return (
    <DashboardCard
      title={title}
      {...(className ? { className } : {})}
      headerAction={
        <button
          type="button"
          className="text-brand-primary inline-flex items-center gap-2 text-sm font-semibold"
        >
          View all
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      }
    >
      <div className="space-y-3">
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3",
              alert.severity === "High" && "border-danger/10 bg-danger/5",
              alert.severity === "Medium" && "border-warning/10 bg-warning/5",
              (alert.severity === "Low" || alert.severity === "Info") &&
                "border-info/10 bg-info/5",
            )}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full",
                alert.severity === "High" && "bg-danger/10 text-danger",
                alert.severity === "Medium" && "bg-warning/10 text-warning",
                (alert.severity === "Low" || alert.severity === "Info") &&
                  "bg-info/10 text-info",
              )}
            >
              {alert.severity === "High" ? (
                <ShieldAlert className="size-5" aria-hidden="true" />
              ) : alert.severity === "Medium" ? (
                <AlertTriangle className="size-5" aria-hidden="true" />
              ) : alert.severity === "Low" ? (
                <Info className="size-5" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="size-5" aria-hidden="true" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-brand-secondary truncate text-sm font-semibold">
                {alert.title}
              </p>
              <p className="text-muted-foreground mt-1 line-clamp-1 text-xs">
                {alert.description}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">{alert.meta}</p>
            </div>
            <StatusBadge variant={severityVariant[alert.severity]}>
              {alert.severity}
            </StatusBadge>
          </article>
        ))}
      </div>
    </DashboardCard>
  );
}
