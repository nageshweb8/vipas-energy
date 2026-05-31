import { Clock3, Info, RefreshCw } from "lucide-react";

interface DataFreshnessIndicatorProps {
  timezoneLabel: string;
  refreshedLabel: string;
}

export function DataFreshnessIndicator({
  timezoneLabel,
  refreshedLabel,
}: DataFreshnessIndicatorProps) {
  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
      <span className="inline-flex items-center gap-2">
        <Info className="size-4" aria-hidden="true" />
        {timezoneLabel}
      </span>
      <span className="inline-flex items-center gap-2">
        <RefreshCw className="size-4" aria-hidden="true" />
        {refreshedLabel}
      </span>
      <span className="inline-flex items-center gap-2">
        <Clock3 className="size-4" aria-hidden="true" />
        Staged reporting data
      </span>
    </div>
  );
}
