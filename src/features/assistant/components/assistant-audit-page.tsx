import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  Database,
  Fingerprint,
  ListChecks,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { DashboardCard } from "@/components/shared/dashboard-card";
import type { AuditedAssistantResponse } from "../models";
import { formatAssistantDateTime } from "../utils/format-assistant-date";
import { AgentWorkflow } from "./agent-workflow";
import { AssistantStatusBadge } from "./assistant-status-badge";
import { AuditDemoNote } from "./audit-demo-note";
import { FreshnessDetails } from "./freshness-details";
import { SourceCard } from "./source-card";
import { ValidationChecklist } from "./validation-checklist";

export function AssistantAuditPage({
  response,
}: {
  response: AuditedAssistantResponse;
}) {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-5 sm:px-5 lg:px-6">
      <header>
        <Link
          href="/ai-audit"
          className="text-brand-primary focus-visible:ring-brand-primary/40 inline-flex items-center gap-1.5 rounded text-sm font-semibold outline-none hover:underline focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to AI Trust &amp; Audit
        </Link>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-brand-secondary text-2xl font-bold tracking-tight sm:text-3xl">
                AI response audit
              </h1>
              <AssistantStatusBadge status={response.trust.status} />
            </div>
            <p className="text-brand-text mt-3 max-w-2xl text-sm leading-6 sm:text-base">
              Review the evidence, specialist workflow, validation results, and
              safe technical metadata associated with this response.
            </p>
          </div>
          <AuditDemoNote className="sm:max-w-64" />
        </div>
      </header>

      <DashboardCard title="Overview">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]">
          <div>
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              User question
            </p>
            <p className="text-brand-primary mt-2 text-xs font-semibold">
              {response.businessModule}
            </p>
            <p className="text-brand-secondary mt-2 text-base font-semibold">
              {response.question}
            </p>
            <p className="text-brand-text mt-4 text-sm leading-6">
              {response.claims.map((claim, claimIndex) => (
                <span key={claim.id}>
                  {claimIndex > 0 ? " " : null}
                  {claim.text}
                  {claim.citations.map((citation) => (
                    <sup
                      key={`${claim.id}-${citation.sourceId}`}
                      className="text-brand-primary ml-0.5 font-bold"
                    >
                      [{citation.citationNumber}]
                    </sup>
                  ))}
                  {claimIndex === 0
                    ? "."
                    : claimIndex === response.claims.length - 1
                      ? "."
                      : ","}
                </span>
              ))}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            <OverviewMetric
              icon={Database}
              label="Sources"
              value={String(response.trust.sourceCount)}
            />
            <OverviewMetric
              icon={Bot}
              label="Agents"
              value={String(response.trust.specialistAgentCount)}
            />
            <OverviewMetric
              icon={ListChecks}
              label="Validation"
              value={`${response.trust.validation.passed}/${response.trust.validation.total} passed`}
            />
            <OverviewMetric
              icon={Clock3}
              label="Data as of"
              value={formatAssistantDateTime(
                response.trust.freshness.dataAsOf,
                response.trust.freshness.timeZone,
              )}
            />
          </dl>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Sources"
        description="Pre-aggregated demo evidence supporting the cited claims."
      >
        <div className="grid gap-3 xl:grid-cols-2">
          {response.sources.map((source) => (
            <SourceCard key={source.id} source={source} highlighted={false} />
          ))}
        </div>
      </DashboardCard>

      <DashboardCard
        title="Agent workflow"
        description="Specialist contributions used to assemble the demo response."
      >
        <AgentWorkflow
          agents={response.specialistAgents}
          className="lg:grid-cols-3"
        />
      </DashboardCard>

      <DashboardCard
        title="Validation"
        description="Checks applied to grounding, citations, access scope, freshness, and consistency."
      >
        <ValidationChecklist
          checks={response.validationChecks}
          className="lg:grid-cols-2"
        />
      </DashboardCard>

      <DashboardCard title="Technical metadata">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)]">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <MetadataItem
              icon={Fingerprint}
              label="Response ID"
              value={response.id}
            />
            <MetadataItem
              icon={Fingerprint}
              label="Correlation ID"
              value={response.auditMetadata.correlationId}
            />
            <MetadataItem
              icon={Clock3}
              label="Generated at"
              value={formatAssistantDateTime(
                response.auditMetadata.generatedAt,
                response.trust.freshness.timeZone,
              )}
            />
            <MetadataItem
              icon={CheckCircle2}
              label="Audit schema"
              value={response.auditMetadata.schemaVersion}
            />
            <MetadataItem
              icon={Database}
              label="Metadata mode"
              value="Illustrative static demo"
            />
            <MetadataItem
              icon={Clock3}
              label="Time zone"
              value={response.trust.freshness.timeZone}
            />
          </dl>
          <FreshnessDetails freshness={response.trust.freshness} />
        </div>
        <p className="text-muted-foreground mt-4 text-xs leading-5">
          Prompts, hidden reasoning, credentials, and raw tool parameters are
          intentionally not included in this audit view.
        </p>
      </DashboardCard>
    </main>
  );
}

function OverviewMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="border-border-default bg-surface-bg rounded-lg border p-3">
      <dt className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd className="text-brand-secondary mt-2 text-sm leading-5 font-semibold">
        {value}
      </dd>
    </div>
  );
}

function MetadataItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="border-border-default rounded-lg border p-3">
      <dt className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd className="text-brand-secondary mt-1.5 text-sm font-semibold break-words">
        {value}
      </dd>
    </div>
  );
}
