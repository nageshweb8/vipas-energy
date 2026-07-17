"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  BookOpen,
  ClipboardCheck,
  Clock3,
  Copy,
  Ellipsis,
  Flag,
  ListChecks,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type {
  AssistantTrustSummaryModel,
  AuditedAssistantResponse,
} from "../models";
import { assistantResponseStatusLabels } from "../utils/audit-status";
import { formatAssistantDateTime } from "../utils/format-assistant-date";

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

type FeedbackSelection = "helpful" | "not-helpful" | null;

interface AssistantResponseFooterProps {
  response: AuditedAssistantResponse;
  expandedDetail: TrustDetailSection | null;
  auditHref: string;
  onToggleDetail: (detail: TrustDetailSection) => void;
  onRetry: () => void;
  onViewFullAudit: () => void;
}

export function AssistantResponseFooter({
  response,
  expandedDetail,
  auditHref,
  onToggleDetail,
  onRetry,
  onViewFullAudit,
}: AssistantResponseFooterProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackSelection>(null);
  const [announcement, setAnnouncement] = useState("");
  const sourcesExpanded = expandedDetail === "sources";

  const handleCopy = async (includeCitations: boolean) => {
    const label = includeCitations
      ? "Response with citations copied."
      : "Response copied.";

    try {
      await copyText(formatResponseText(response, { includeCitations }));
      setAnnouncement(label);
    } catch {
      setAnnouncement("Unable to copy the response in this browser.");
    }
  };

  const handleFeedback = (selection: Exclude<FeedbackSelection, null>) => {
    setFeedback((current) => (current === selection ? null : selection));
  };

  const handleViewFullAudit = () => {
    onViewFullAudit();
    router.push(auditHref);
  };

  return (
    <footer
      aria-label="AI response trust and actions"
      className="border-border-default border-t pt-3"
    >
      <TrustLine
        summary={response.trust}
        expandedDetail={expandedDetail}
        onToggleDetail={onToggleDetail}
      />

      <div
        className="mt-2 flex flex-wrap items-center gap-0.5"
        aria-label="Response actions"
      >
        <ActionButton
          id="assistant-action-copy"
          label="Copy response"
          icon={announcement === "Response copied." ? ClipboardCheck : Copy}
          onClick={() => void handleCopy(false)}
        />
        <ActionButton
          id="assistant-action-helpful"
          label="Helpful"
          icon={ThumbsUp}
          selected={feedback === "helpful"}
          onClick={() => handleFeedback("helpful")}
        />
        <ActionButton
          id="assistant-action-not-helpful"
          label="Not helpful"
          icon={ThumbsDown}
          selected={feedback === "not-helpful"}
          onClick={() => handleFeedback("not-helpful")}
        />
        <ActionButton
          id="assistant-action-retry"
          label="Retry response"
          icon={RefreshCw}
          onClick={onRetry}
        />
        <ActionButton
          id="assistant-action-sources"
          label={sourcesExpanded ? "Hide sources" : "Show sources"}
          icon={BookOpen}
          expanded={sourcesExpanded}
          controls={trustDetailRegionIds.sources}
          onClick={() => onToggleDetail("sources")}
        />

        <Tooltip id="assistant-action-more-tooltip" label="More actions">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="More actions"
              aria-describedby="assistant-action-more-tooltip"
              className={buttonVariants({
                variant: "ghost",
                size: "icon-sm",
              })}
            >
              <Ellipsis className="size-4" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-60">
              <DropdownMenuItem onClick={handleViewFullAudit}>
                <ClipboardCheck className="size-4" aria-hidden="true" />
                View full audit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleDetail("agents")}>
                <Bot className="size-4" aria-hidden="true" />
                View participating agents
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleDetail("validation")}>
                <ListChecks className="size-4" aria-hidden="true" />
                View validation checks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleDetail("freshness")}>
                <Clock3 className="size-4" aria-hidden="true" />
                View data freshness
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setAnnouncement(
                    "Issue reporting is not available in this static demo.",
                  )
                }
              >
                <Flag className="size-4" aria-hidden="true" />
                Report an issue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => void handleCopy(true)}>
                <Copy className="size-4" aria-hidden="true" />
                Copy response with citations
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Tooltip>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </footer>
  );
}

function TrustLine({
  summary,
  expandedDetail,
  onToggleDetail,
}: {
  summary: AssistantTrustSummaryModel;
  expandedDetail: TrustDetailSection | null;
  onToggleDetail: (detail: TrustDetailSection) => void;
}) {
  const items = [
    {
      detail: "validation" as const,
      label: assistantResponseStatusLabels[summary.status],
    },
    {
      detail: "sources" as const,
      label: `${summary.sourceCount} sources`,
    },
    {
      detail: "freshness" as const,
      label: `Data as of ${formatAssistantDateTime(
        summary.freshness.dataAsOf,
        summary.freshness.timeZone,
      )}`,
    },
  ];

  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs leading-5">
      {items.map((item, index) => (
        <span key={item.detail} className="contents">
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          <button
            type="button"
            onClick={() => onToggleDetail(item.detail)}
            aria-expanded={expandedDetail === item.detail}
            aria-controls={trustDetailRegionIds[item.detail]}
            className="hover:text-brand-primary focus-visible:ring-brand-primary/40 rounded outline-none hover:underline focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  );
}

function ActionButton({
  id,
  label,
  icon: Icon,
  selected = false,
  expanded,
  controls,
  onClick,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  selected?: boolean;
  expanded?: boolean;
  controls?: string;
  onClick: () => void;
}) {
  const tooltipId = `${id}-tooltip`;

  return (
    <Tooltip id={tooltipId} label={label}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={label}
        aria-describedby={tooltipId}
        aria-pressed={selected || undefined}
        aria-expanded={expanded}
        aria-controls={controls}
        onClick={onClick}
        className={cn(
          "text-muted-foreground hover:text-brand-primary",
          selected && "bg-brand-mint text-brand-primary",
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </Button>
    </Tooltip>
  );
}

function Tooltip({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        id={id}
        role="tooltip"
        className="bg-brand-secondary text-surface-white pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 rounded px-2 py-1 text-[11px] whitespace-nowrap opacity-0 shadow-sm transition-opacity group-focus-within/tooltip:visible group-focus-within/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:opacity-100 motion-reduce:transition-none"
      >
        {label}
      </span>
    </span>
  );
}

function formatResponseText(
  response: AuditedAssistantResponse,
  { includeCitations }: { includeCitations: boolean },
) {
  return response.claims
    .map((claim, index) => {
      const citations = includeCitations
        ? claim.citations
            .map((citation) => `[${citation.citationNumber}]`)
            .join(" ")
        : "";
      const punctuation =
        index === 0 || index === response.claims.length - 1 ? "." : ",";

      return `${claim.text}${citations ? ` ${citations}` : ""}${punctuation}`;
    })
    .join(" ");
}

async function copyText(value: string) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall back to the document copy command for restricted browser contexts.
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.className = "fixed top-0 left-[-9999px]";
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Copy command was not successful.");
  }
}
