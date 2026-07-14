"use client";

import { useEffect, useState } from "react";
import { BarChart3, FileText } from "lucide-react";

import { DashboardCard } from "@/components/shared/dashboard-card";
import { Button } from "@/components/ui/button";
import type { AuditedAssistantResponse } from "../models";
import { formatAssistantDateTime } from "../utils/format-assistant-date";
import { AgentWorkflow } from "./agent-workflow";
import { AssistantCitation } from "./assistant-citation";
import { FreshnessDetails } from "./freshness-details";
import { SourceList } from "./source-list";
import {
  TrustSummary,
  trustDetailRegionIds,
  type TrustDetailSection,
} from "./trust-summary";
import { ValidationChecklist } from "./validation-checklist";

export type AuditedResponseRevealStage = "summary" | "analysis" | "complete";

interface AuditedAssistantResponseProps {
  response: AuditedAssistantResponse;
  stage: AuditedResponseRevealStage;
  auditHref: string;
  onViewFullAudit: () => void;
}

export function AuditedAssistantResponse({
  response,
  stage,
  auditHref,
  onViewFullAudit,
}: AuditedAssistantResponseProps) {
  const [expandedDetail, setExpandedDetail] =
    useState<TrustDetailSection | null>(null);
  const [highlightedCitationNumber, setHighlightedCitationNumber] = useState<
    number | null
  >(null);
  const responseComplete = stage === "complete";

  useEffect(() => {
    if (expandedDetail !== "sources" || highlightedCitationNumber === null) {
      return;
    }

    const sourceCard = document.getElementById(
      `assistant-source-${highlightedCitationNumber}`,
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    sourceCard?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
    sourceCard?.focus({ preventScroll: true });
  }, [expandedDetail, highlightedCitationNumber]);

  const handleCitationActivate = (citationNumber: number) => {
    setExpandedDetail("sources");
    setHighlightedCitationNumber(citationNumber);
  };

  const handleToggleDetail = (detail: TrustDetailSection) => {
    setExpandedDetail((current) => (current === detail ? null : detail));
    setHighlightedCitationNumber(null);
  };

  return (
    <DashboardCard
      className="min-w-0 flex-1 shadow-none"
      contentClassName="space-y-3"
    >
      <div aria-busy={!responseComplete}>
        <p className="text-brand-text text-sm leading-6">
          {response.claims.map((claim, claimIndex) => (
            <span key={claim.id}>
              {claimIndex > 0 ? " " : null}
              {claim.text}
              {responseComplete
                ? claim.citations.map((citation) => {
                    const source = response.sources.find(
                      (candidate) => candidate.id === citation.sourceId,
                    );

                    return source ? (
                      <AssistantCitation
                        key={source.id}
                        source={source}
                        onActivate={handleCitationActivate}
                      />
                    ) : null;
                  })
                : null}
              {claimIndex === 0
                ? "."
                : claimIndex === response.claims.length - 1
                  ? "."
                  : ","}
            </span>
          ))}
        </p>

        {stage !== "summary" ? <DemandAnalysis response={response} /> : null}
      </div>

      {responseComplete ? (
        <>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" type="button">
              <FileText className="size-4" aria-hidden="true" />
              Create report
            </Button>
            <Button variant="outline" size="sm" type="button">
              <BarChart3 className="size-4" aria-hidden="true" />
              View full analysis
            </Button>
          </div>
          <TrustSummary
            summary={response.trust}
            expandedDetail={expandedDetail}
            auditHref={auditHref}
            onToggleDetail={handleToggleDetail}
            onViewFullAudit={onViewFullAudit}
          />
          <SourceList
            id={trustDetailRegionIds.sources}
            sources={response.sources}
            open={expandedDetail === "sources"}
            highlightedCitationNumber={highlightedCitationNumber}
          />
          {expandedDetail === "agents" ? (
            <section
              id={trustDetailRegionIds.agents}
              aria-label="Specialist agents used for this AI response"
              className="border-border-default bg-surface-bg rounded-lg border p-3"
            >
              <h2 className="text-brand-secondary text-sm font-semibold">
                Specialist agents
              </h2>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                Three demo specialists contributed to this response.
              </p>
              <AgentWorkflow
                agents={response.specialistAgents}
                className="mt-3"
              />
            </section>
          ) : null}
          {expandedDetail === "validation" ? (
            <section
              id={trustDetailRegionIds.validation}
              aria-label="Validation checks for this AI response"
              className="border-border-default bg-surface-bg rounded-lg border p-3"
            >
              <h2 className="text-brand-secondary text-sm font-semibold">
                Validation checks
              </h2>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                All six illustrative checks passed for the demo response.
              </p>
              <ValidationChecklist
                checks={response.validationChecks}
                className="mt-3"
              />
            </section>
          ) : null}
          {expandedDetail === "freshness" ? (
            <FreshnessDetails
              id={trustDetailRegionIds.freshness}
              freshness={response.trust.freshness}
            />
          ) : null}
        </>
      ) : null}
    </DashboardCard>
  );
}

function DemandAnalysis({ response }: { response: AuditedAssistantResponse }) {
  return (
    <div className="border-border-default bg-surface-bg mt-3 grid gap-3 rounded-lg border p-2.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
      <div>
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Peak Demand
        </p>
        <p className="text-brand-secondary mt-2 text-2xl font-bold">
          {response.peakDemand.value} {response.peakDemand.unit}
        </p>
        <time
          className="text-muted-foreground mt-1 block text-xs"
          dateTime={response.peakDemand.occurredAt}
        >
          {formatAssistantDateTime(
            response.peakDemand.occurredAt,
            response.peakDemand.timeZone,
          )}
        </time>
      </div>
      <div className="min-w-0 space-y-2">
        {response.contributors.map((contributor) => (
          <div
            key={contributor.id}
            className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-3"
          >
            <span className="text-brand-text text-sm">{contributor.label}</span>
            <span className="text-success text-sm font-semibold">
              {contributor.contributionPercent.toFixed(1)}%
            </span>
            <span className="bg-border-default col-span-2 h-2 overflow-hidden rounded-full">
              <span className="bg-brand-primary block h-full w-3/4 rounded-full" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
