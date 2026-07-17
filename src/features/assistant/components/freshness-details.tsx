import { CheckCircle2, CircleAlert, CircleX, Clock3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type {
  AssistantDataFreshness,
  AssistantFreshnessStatus,
} from "../models";
import { formatAssistantDateTime } from "../utils/format-assistant-date";

interface FreshnessDetailsProps {
  freshness: AssistantDataFreshness;
  id?: string;
  className?: string;
}

const statusConfig: Record<
  AssistantFreshnessStatus,
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
  stale: {
    label: "Stale",
    icon: CircleX,
    className: "text-danger",
  },
};

export function FreshnessDetails({
  freshness,
  id,
  className,
}: FreshnessDetailsProps) {
  const status = statusConfig[freshness.status];
  const StatusIcon = status.icon;

  return (
    <div
      id={id}
      className={cn(
        "border-border-default bg-surface-white rounded-lg border p-3",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-brand-mint text-brand-primary flex size-8 items-center justify-center rounded-lg">
            <Clock3 className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-brand-secondary text-sm font-semibold">
              Data freshness
            </h3>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Response data and cited source update window
            </p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-semibold",
            status.className,
          )}
        >
          <StatusIcon className="size-3.5" aria-hidden="true" />
          {status.label}
        </span>
      </div>
      <dl className="mt-3 grid gap-3 text-xs sm:grid-cols-3">
        <FreshnessItem
          label="Data as of"
          value={formatAssistantDateTime(
            freshness.dataAsOf,
            freshness.timeZone,
          )}
        />
        <FreshnessItem
          label="Earliest source update"
          value={formatAssistantDateTime(
            freshness.sourceUpdateRange.from,
            freshness.timeZone,
          )}
        />
        <FreshnessItem
          label="Latest source update"
          value={formatAssistantDateTime(
            freshness.sourceUpdateRange.to,
            freshness.timeZone,
          )}
        />
      </dl>
      <p className="text-muted-foreground mt-3 text-[11px] leading-5">
        Times are presented in {freshness.timeZone}.
      </p>
    </div>
  );
}

function FreshnessItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground text-[11px] font-medium">{label}</dt>
      <dd className="text-brand-secondary mt-1 leading-5 font-semibold">
        {value}
      </dd>
    </div>
  );
}
