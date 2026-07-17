import { CheckCircle2, CircleAlert, CircleX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type {
  AssistantValidationCheck,
  AssistantValidationStatus,
} from "../models";

interface ValidationChecklistProps {
  checks: AssistantValidationCheck[];
  id?: string;
  className?: string;
}

const statusConfig: Record<
  AssistantValidationStatus,
  { label: string; icon: LucideIcon; className: string }
> = {
  passed: {
    label: "Passed",
    icon: CheckCircle2,
    className: "text-success",
  },
  "needs-review": {
    label: "Needs review",
    icon: CircleAlert,
    className: "text-warning",
  },
  failed: {
    label: "Failed",
    icon: CircleX,
    className: "text-danger",
  },
};

export function ValidationChecklist({
  checks,
  id,
  className,
}: ValidationChecklistProps) {
  return (
    <div id={id} className={cn("grid gap-2", className)}>
      {checks.map((check) => {
        const status = statusConfig[check.status];
        const StatusIcon = status.icon;

        return (
          <article
            key={check.id}
            className="border-border-default bg-surface-white flex items-start gap-2.5 rounded-lg border p-3"
          >
            <StatusIcon
              className={cn("mt-0.5 size-4 shrink-0", status.className)}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-brand-secondary text-xs font-semibold">
                  {check.name}
                </h3>
                <span
                  className={cn("text-[11px] font-semibold", status.className)}
                >
                  {status.label}
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                {check.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
