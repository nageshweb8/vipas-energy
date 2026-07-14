import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Database,
  ListChecks,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type {
  AssistantResponseStatus,
  AssistantTrustSummaryModel,
} from "../models";
import { assistantResponseStatusLabels } from "../utils/audit-status";
import { formatAssistantDateTime } from "../utils/format-assistant-date";
import { AuditDemoNote } from "./audit-demo-note";

export type TrustDetailSection =
  | "sources"
  | "agents"
  | "validation"
  | "freshness";

export const trustDetailRegionIds: Record<TrustDetailSection, string> = {
  sources: "assistant-response-sources",
  agents: "assistant-response-agents",
  validation: "assistant-response-validation",
  freshness: "assistant-response-freshness",
};

interface TrustSummaryProps {
  summary: AssistantTrustSummaryModel;
  expandedDetail: TrustDetailSection | null;
  auditHref: string;
  onToggleDetail: (detail: TrustDetailSection) => void;
  onViewFullAudit: () => void;
}

const statusConfig: Record<
  AssistantResponseStatus,
  {
    icon: LucideIcon;
    className: string;
  }
> = {
  verified: {
    icon: CheckCircle2,
    className:
      "border-success/20 bg-success/10 text-success dark:border-success/30",
  },
  "needs-review": {
    icon: AlertTriangle,
    className:
      "border-warning/20 bg-warning/10 text-warning dark:border-warning/30",
  },
  "insufficient-evidence": {
    icon: CircleHelp,
    className:
      "border-danger/20 bg-danger/10 text-danger dark:border-danger/30",
  },
};

export function TrustSummary({
  summary,
  expandedDetail,
  auditHref,
  onToggleDetail,
  onViewFullAudit,
}: TrustSummaryProps) {
  const config = statusConfig[summary.status];
  const StatusIcon = config.icon;
  const sourcesExpanded = expandedDetail === "sources";

  return (
    <section
      aria-label="AI response trust summary"
      className="border-border-default bg-surface-bg rounded-lg border p-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-brand-secondary text-xs font-semibold tracking-wide uppercase">
            Trust summary
          </p>
          <span
            className={cn(
              "inline-flex min-h-6 items-center gap-1.5 rounded-full border px-2 text-xs font-semibold",
              config.className,
            )}
          >
            <StatusIcon className="size-3.5" aria-hidden="true" />
            {assistantResponseStatusLabels[summary.status]}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <button
            type="button"
            onClick={() => onToggleDetail("sources")}
            aria-expanded={sourcesExpanded}
            aria-controls={trustDetailRegionIds.sources}
            className="text-brand-primary hover:text-brand-primary/80 focus-visible:ring-brand-primary/40 rounded text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {sourcesExpanded ? "Hide sources" : "View sources"}
          </button>
          <Link
            href={auditHref}
            onClick={onViewFullAudit}
            className="text-brand-primary hover:text-brand-primary/80 focus-visible:ring-brand-primary/40 inline-flex items-center gap-1 rounded text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            View full audit
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4">
        <TrustMetric
          icon={Database}
          label="Sources"
          value={String(summary.sourceCount)}
        />
        <InteractiveTrustMetric
          icon={Bot}
          label="Agents"
          value={String(summary.specialistAgentCount)}
          expanded={expandedDetail === "agents"}
          controls={trustDetailRegionIds.agents}
          onClick={() => onToggleDetail("agents")}
        />
        <InteractiveTrustMetric
          icon={ListChecks}
          label="Validation"
          value={`${summary.validation.passed}/${summary.validation.total} checks passed`}
          expanded={expandedDetail === "validation"}
          controls={trustDetailRegionIds.validation}
          onClick={() => onToggleDetail("validation")}
        />
        <InteractiveTrustMetric
          icon={Clock3}
          label="Data as of"
          value={formatAssistantDateTime(
            summary.freshness.dataAsOf,
            summary.freshness.timeZone,
          )}
          expanded={expandedDetail === "freshness"}
          controls={trustDetailRegionIds.freshness}
          onClick={() => onToggleDetail("freshness")}
        />
      </dl>
      <AuditDemoNote className="mt-3" />
    </section>
  );
}

function TrustMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-muted-foreground flex items-center gap-1 text-[11px] font-medium">
        <Icon className="size-3.5 shrink-0" aria-hidden="true" />
        {label}
      </dt>
      <dd className="text-brand-secondary mt-1 text-xs leading-5 font-semibold">
        {value}
      </dd>
    </div>
  );
}

function InteractiveTrustMetric({
  icon: Icon,
  label,
  value,
  expanded,
  controls,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  expanded: boolean;
  controls: string;
  onClick: () => void;
}) {
  return (
    <div className="min-w-0">
      <dt>
        <button
          type="button"
          onClick={onClick}
          aria-expanded={expanded}
          aria-controls={controls}
          className="text-muted-foreground hover:text-brand-primary focus-visible:ring-brand-primary/40 flex w-full items-center gap-1 rounded text-left text-[11px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <Icon className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1">{label}</span>
          <ChevronDown
            className={cn(
              "size-3.5 shrink-0 transition-transform",
              expanded && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </dt>
      <dd className="text-brand-secondary mt-1 text-xs leading-5 font-semibold">
        {value}
      </dd>
    </div>
  );
}
