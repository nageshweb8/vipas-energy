"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  BadgeCheck,
  ExternalLink,
  ListChecks,
  MessageSquareText,
  RotateCcw,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { DashboardCard } from "@/components/shared/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { assistantAuditResponses } from "../mocks/assistant-audit-responses";
import type {
  AssistantBusinessModule,
  AssistantResponseStatus,
  AuditedAssistantResponse,
} from "../models";
import { assistantResponseStatusLabels } from "../utils/audit-status";
import { formatAssistantDateTime } from "../utils/format-assistant-date";
import { AssistantStatusBadge } from "./assistant-status-badge";
import { AuditDemoNote } from "./audit-demo-note";

type DateRangeFilter = "all" | "may-16" | "may-13-15" | "before-may-13";

const dateRangeOptions: Array<{ value: DateRangeFilter; label: string }> = [
  { value: "all", label: "All dates" },
  { value: "may-16", label: "May 16, 2026" },
  { value: "may-13-15", label: "May 13–15, 2026" },
  { value: "before-may-13", label: "Before May 13, 2026" },
];

const businessModules = Array.from(
  new Set(assistantAuditResponses.map((response) => response.businessModule)),
);

const agents = Array.from(
  new Map(
    assistantAuditResponses
      .flatMap((response) => response.specialistAgents)
      .map((agent) => [agent.id, agent]),
  ).values(),
);

const totalValidationChecks = assistantAuditResponses.reduce(
  (total, response) => total + response.trust.validation.total,
  0,
);
const totalPassedChecks = assistantAuditResponses.reduce(
  (total, response) => total + response.trust.validation.passed,
  0,
);
const averageValidationPassRate =
  totalValidationChecks === 0
    ? 0
    : (totalPassedChecks / totalValidationChecks) * 100;

export function AuditCenterPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeFilter>("all");
  const [status, setStatus] = useState<AssistantResponseStatus | "all">("all");
  const [businessModule, setBusinessModule] = useState<
    AssistantBusinessModule | "all"
  >("all");
  const [agentId, setAgentId] = useState("all");

  const filteredResponses = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return assistantAuditResponses.filter((response) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [
          response.id,
          response.question,
          response.businessModule,
          ...response.specialistAgents.map((agent) => agent.name),
        ].some((value) => value.toLowerCase().includes(normalizedQuery));

      return (
        matchesSearch &&
        matchesDateRange(response, dateRange) &&
        (status === "all" || response.trust.status === status) &&
        (businessModule === "all" ||
          response.businessModule === businessModule) &&
        (agentId === "all" ||
          response.specialistAgents.some((agent) => agent.id === agentId))
      );
    });
  }, [agentId, businessModule, dateRange, searchQuery, status]);

  const filtersActive =
    searchQuery.length > 0 ||
    dateRange !== "all" ||
    status !== "all" ||
    businessModule !== "all" ||
    agentId !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setDateRange("all");
    setStatus("all");
    setBusinessModule("all");
    setAgentId("all");
  };

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-5 sm:px-5 lg:px-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-brand-secondary text-2xl font-bold tracking-tight sm:text-3xl">
            AI Trust &amp; Audit
          </h1>
          <p className="text-brand-text mt-3 max-w-2xl text-sm leading-6 sm:text-base">
            Trace AI responses to their supporting sources, specialist agents,
            validation results, and business-friendly audit metadata.
          </p>
        </div>
        <AuditDemoNote className="sm:max-w-64" />
      </header>

      <section
        aria-label="AI audit summary"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <AuditKpiCard
          label="Total responses"
          value={String(assistantAuditResponses.length)}
          caption="Recent illustrative response audits"
          icon={MessageSquareText}
          tone="primary"
        />
        <AuditKpiCard
          label="Evidence verified"
          value={String(
            assistantAuditResponses.filter(
              (response) => response.trust.status === "verified",
            ).length,
          )}
          caption="Responses with supported evidence"
          icon={BadgeCheck}
          tone="success"
        />
        <AuditKpiCard
          label="Needs review"
          value={String(
            assistantAuditResponses.filter(
              (response) => response.trust.status === "needs-review",
            ).length,
          )}
          caption="Responses requiring business review"
          icon={AlertTriangle}
          tone="warning"
        />
        <AuditKpiCard
          label="Average validation pass rate"
          value={`${averageValidationPassRate.toFixed(1)}%`}
          caption="Across all illustrative checks"
          icon={ListChecks}
          tone="info"
        />
      </section>

      <DashboardCard
        title="Search and filters"
        description="Narrow the local demo audit records by business context."
      >
        <div className="relative">
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search response ID, question, module, or agent"
            aria-label="Search response audits"
            className="pl-9"
          />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <FilterSelect
            label="Date range"
            value={dateRange}
            onChange={(value) => setDateRange(value as DateRangeFilter)}
            options={dateRangeOptions}
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={(value) =>
              setStatus(value as AssistantResponseStatus | "all")
            }
            options={[
              { value: "all", label: "All statuses" },
              ...Object.entries(assistantResponseStatusLabels).map(
                ([value, label]) => ({ value, label }),
              ),
            ]}
          />
          <FilterSelect
            label="Business module"
            value={businessModule}
            onChange={(value) =>
              setBusinessModule(value as AssistantBusinessModule | "all")
            }
            options={[
              { value: "all", label: "All modules" },
              ...businessModules.map((module) => ({
                value: module,
                label: module,
              })),
            ]}
          />
          <FilterSelect
            label="Agent"
            value={agentId}
            onChange={setAgentId}
            options={[
              { value: "all", label: "All agents" },
              ...agents.map((agent) => ({
                value: agent.id,
                label: agent.name,
              })),
            ]}
          />
        </div>
      </DashboardCard>

      <DashboardCard
        title="Recent response audits"
        description={`${filteredResponses.length} of ${assistantAuditResponses.length} illustrative records shown`}
        headerAction={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearFilters}
            disabled={!filtersActive}
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Clear filters
          </Button>
        }
      >
        {filteredResponses.length === 0 ? (
          <div className="border-border-default bg-surface-bg rounded-lg border border-dashed px-4 py-10 text-center">
            <p className="text-brand-secondary text-sm font-semibold">
              No response audits match these filters.
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              Clear one or more filters to view the local demo records.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-border-default text-muted-foreground border-b text-xs">
                  <th className="px-2 pb-3 font-semibold">Response ID</th>
                  <th className="px-2 pb-3 font-semibold">User question</th>
                  <th className="px-2 pb-3 font-semibold">Module</th>
                  <th className="px-2 pb-3 font-semibold">Status</th>
                  <th className="px-2 pb-3 text-center font-semibold">
                    Sources
                  </th>
                  <th className="px-2 pb-3 text-center font-semibold">
                    Agents
                  </th>
                  <th className="px-2 pb-3 font-semibold">Validation result</th>
                  <th className="px-2 pb-3 font-semibold">Generated</th>
                  <th className="px-2 pb-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredResponses.map((response) => {
                  const href = `/ai-audit/responses/${response.id}`;

                  return (
                    <tr
                      key={response.id}
                      onClick={() => router.push(href)}
                      className="border-border-default hover:bg-brand-mint/30 cursor-pointer border-b transition last:border-b-0"
                    >
                      <td className="text-brand-primary px-2 py-3 font-semibold">
                        {response.id}
                      </td>
                      <td className="text-brand-secondary max-w-80 px-2 py-3 font-medium">
                        <span className="line-clamp-2">
                          {response.question}
                        </span>
                      </td>
                      <td className="text-brand-text px-2 py-3">
                        {response.businessModule}
                      </td>
                      <td className="px-2 py-3">
                        <AssistantStatusBadge status={response.trust.status} />
                      </td>
                      <td className="text-brand-secondary px-2 py-3 text-center font-semibold">
                        {response.trust.sourceCount}
                      </td>
                      <td className="text-brand-secondary px-2 py-3 text-center font-semibold">
                        {response.trust.specialistAgentCount}
                      </td>
                      <td className="text-brand-text px-2 py-3">
                        {response.trust.validation.passed}/
                        {response.trust.validation.total} passed
                      </td>
                      <td className="text-muted-foreground px-2 py-3 text-xs">
                        {formatAssistantDateTime(
                          response.auditMetadata.generatedAt,
                          response.trust.freshness.timeZone,
                        )}
                      </td>
                      <td className="px-2 py-3 text-right">
                        <Link
                          href={href}
                          onClick={(event) => event.stopPropagation()}
                          className="text-brand-primary focus-visible:ring-brand-primary/40 inline-flex items-center gap-1 rounded text-xs font-semibold outline-none hover:underline focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          View audit
                          <ExternalLink
                            className="size-3.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-muted-foreground mt-4 text-xs leading-5">
          Customer-facing audit views exclude hidden reasoning, prompts,
          credentials, and raw tool parameters.
        </p>
      </DashboardCard>
    </main>
  );
}

function matchesDateRange(
  response: AuditedAssistantResponse,
  dateRange: DateRangeFilter,
) {
  const generatedAt = response.auditMetadata.generatedAt;

  switch (dateRange) {
    case "may-16":
      return generatedAt >= "2026-05-16T00:00:00.000Z";
    case "may-13-15":
      return (
        generatedAt >= "2026-05-13T00:00:00.000Z" &&
        generatedAt < "2026-05-16T00:00:00.000Z"
      );
    case "before-may-13":
      return generatedAt < "2026-05-13T00:00:00.000Z";
    case "all":
      return true;
  }
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-brand-secondary text-xs font-semibold">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-border-default bg-surface-white text-brand-text focus:border-brand-primary focus:ring-brand-primary/20 h-9 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function AuditKpiCard({
  label,
  value,
  caption,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  caption: string;
  icon: LucideIcon;
  tone: "primary" | "success" | "warning" | "info";
}) {
  const toneClasses = {
    primary: "bg-brand-mint text-brand-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
  } as const;

  return (
    <article className="border-border-default bg-surface-white rounded-xl border p-3.5 shadow-sm sm:p-4">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full",
            toneClasses[tone],
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-brand-text text-sm font-medium">{label}</p>
          <p className="text-brand-secondary mt-2 text-2xl font-bold tracking-tight">
            {value}
          </p>
          <p className="text-muted-foreground mt-1 text-xs leading-5">
            {caption}
          </p>
        </div>
      </div>
    </article>
  );
}
