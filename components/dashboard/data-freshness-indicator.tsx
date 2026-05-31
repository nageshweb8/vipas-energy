"use client";

import { useSyncExternalStore } from "react";
import { Clock3, Info, RefreshCw } from "lucide-react";

interface DataFreshnessIndicatorProps {
  timezoneLabel: string;
  refreshedLabel: string;
}

function formatCurrentRefreshLabel() {
  return `Last staged refresh: ${new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date())}`;
}

function subscribeToSystemClock() {
  return () => {};
}

export function DataFreshnessIndicator({
  timezoneLabel,
  refreshedLabel,
}: DataFreshnessIndicatorProps) {
  const currentRefreshLabel = useSyncExternalStore(
    subscribeToSystemClock,
    formatCurrentRefreshLabel,
    () => refreshedLabel,
  );

  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
      <span className="inline-flex items-center gap-2">
        <Info className="size-4" aria-hidden="true" />
        {timezoneLabel}
      </span>
      <span className="inline-flex items-center gap-2">
        <RefreshCw className="size-4" aria-hidden="true" />
        {currentRefreshLabel}
      </span>
      <span className="inline-flex items-center gap-2">
        <Clock3 className="size-4" aria-hidden="true" />
        Staged reporting data
      </span>
    </div>
  );
}
