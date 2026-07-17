import { CheckCircle2, CircleAlert, CircleX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AssistantSource, AssistantSourceAvailability } from "../models";
import {
  formatAssistantDateTime,
  formatAssistantTimeRange,
} from "../utils/format-assistant-date";

interface SourceCardProps {
  source: AssistantSource;
  highlighted: boolean;
}

const availabilityConfig: Record<
  AssistantSourceAvailability,
  {
    label: string;
    icon: LucideIcon;
    className: string;
  }
> = {
  available: {
    label: "Available",
    icon: CheckCircle2,
    className: "text-success",
  },
  limited: {
    label: "Limited",
    icon: CircleAlert,
    className: "text-warning",
  },
  unavailable: {
    label: "Unavailable",
    icon: CircleX,
    className: "text-danger",
  },
};

export function SourceCard({ source, highlighted }: SourceCardProps) {
  const availability = availabilityConfig[source.availability];
  const AvailabilityIcon = availability.icon;

  return (
    <article
      id={`assistant-source-${source.citationNumber}`}
      tabIndex={-1}
      className={cn(
        "border-border-default bg-surface-white rounded-lg border p-3 transition outline-none",
        highlighted &&
          "border-brand-primary/50 bg-brand-mint/30 ring-brand-primary/15 ring-2",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="bg-brand-mint text-brand-primary flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold">
            [{source.citationNumber}]
          </span>
          <div className="min-w-0">
            <h3 className="text-brand-secondary text-sm font-semibold">
              {source.name}
            </h3>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {source.sourceSystem}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 text-xs font-semibold",
            availability.className,
          )}
        >
          <AvailabilityIcon className="size-3.5" aria-hidden="true" />
          {availability.label}
        </span>
      </div>

      <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
        <SourceDetail
          label={source.scope.type === "site" ? "Site scope" : "Account scope"}
          value={source.scope.label}
        />
        <SourceDetail
          label="Last updated"
          value={formatAssistantDateTime(
            source.lastUpdatedAt,
            source.timeRange.timeZone,
          )}
        />
        <div className="sm:col-span-2">
          <SourceDetail
            label="Time range used"
            value={formatAssistantTimeRange(
              source.timeRange.from,
              source.timeRange.to,
              source.timeRange.timeZone,
            )}
          />
        </div>
      </dl>

      <div className="border-border-default bg-surface-bg mt-3 rounded-md border px-2.5 py-2">
        <p className="text-muted-foreground text-[11px] font-medium">
          Evidence supported
        </p>
        <p className="text-brand-text mt-1 text-xs leading-5">
          {source.supportedClaim}
        </p>
      </div>
    </article>
  );
}

function SourceDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-muted-foreground text-[11px] font-medium">{label}</dt>
      <dd className="text-brand-secondary mt-0.5 leading-5 font-semibold">
        {value}
      </dd>
    </div>
  );
}
