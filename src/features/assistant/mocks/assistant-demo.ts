import type { AuditedAssistantResponse } from "../models";

export const assistantSuggestedPrompts = [
  "Why did demand spike on May 16 around 2:30 PM?",
  "Compare demand against forecast this week.",
  "Which sites should operations review first?",
  "Create a weekly demand summary.",
] as const;

export const supportedAssistantPrompt = assistantSuggestedPrompts[0];

export const preparingCitedResponseStatusMessage =
  "Preparing a cited response…";

export const assistantProcessingStatuses = [
  {
    message: "Analyzing demand and operational data…",
    durationMs: 2500,
  },
  {
    message: "Comparing demand, cooling, production, and solar signals…",
    durationMs: 3000,
  },
  {
    message: "Validating supporting evidence…",
    durationMs: 2500,
  },
  {
    message: preparingCitedResponseStatusMessage,
    durationMs: 2100,
  },
] as const;

export const demoAssistantAuditHref =
  "/ai-audit/responses/demo-response-001" as const;

export const demoAuditedResponse = {
  id: "demo-response-001",
  question: "Why did demand spike on May 16 around 2:30 PM?",
  businessModule: "Demand Management",
  claims: [
    {
      id: "peak-demand",
      text: "Demand reached 28.7 MWh at approximately 2:30 PM",
      citations: [{ citationNumber: 1, sourceId: "demand-meter-data" }],
    },
    {
      id: "cooling-demand",
      text: "Increased cooling demand",
      citations: [
        { citationNumber: 2, sourceId: "building-management-system" },
      ],
    },
    {
      id: "industrial-activity",
      text: "scheduled industrial activity",
      citations: [{ citationNumber: 4, sourceId: "production-schedule" }],
    },
    {
      id: "solar-generation",
      text: "and reduced solar generation were the main contributors",
      citations: [{ citationNumber: 3, sourceId: "solar-generation-data" }],
    },
  ],
  peakDemand: {
    value: 28.7,
    unit: "MWh",
    occurredAt: "2026-05-16T09:00:00.000Z",
    timeZone: "Asia/Kolkata",
  },
  contributors: [
    {
      id: "cooling-load",
      label: "Cooling Load",
      contributionPercent: 18.6,
    },
    {
      id: "industrial-activity",
      label: "Industrial Activity",
      contributionPercent: 12.4,
    },
    {
      id: "solar-generation-gap",
      label: "Solar Generation Gap",
      contributionPercent: 15.3,
    },
  ],
  trust: {
    status: "verified",
    sourceCount: 4,
    specialistAgentCount: 3,
    validation: {
      passed: 6,
      total: 6,
    },
    freshness: {
      status: "passed",
      dataAsOf: "2026-05-16T09:00:00.000Z",
      timeZone: "Asia/Kolkata",
      sourceUpdateRange: {
        from: "2026-05-16T08:50:00.000Z",
        to: "2026-05-16T09:04:00.000Z",
      },
    },
  },
  sources: [
    {
      id: "demand-meter-data",
      citationNumber: 1,
      name: "Demand Meter Data",
      sourceSystem: "Energy Metering Platform",
      scope: {
        type: "account",
        label: "Vipas Energy portfolio",
      },
      timeRange: {
        from: "2026-05-16T08:30:00.000Z",
        to: "2026-05-16T09:30:00.000Z",
        timeZone: "Asia/Kolkata",
      },
      lastUpdatedAt: "2026-05-16T09:02:00.000Z",
      supportedClaim:
        "Portfolio demand reached 28.7 MWh at approximately 2:30 PM.",
      availability: "available",
    },
    {
      id: "building-management-system",
      citationNumber: 2,
      name: "Building Management System",
      sourceSystem: "BMS Operations Warehouse",
      scope: {
        type: "site",
        label: "Solar Park Alpha",
      },
      timeRange: {
        from: "2026-05-16T08:00:00.000Z",
        to: "2026-05-16T09:15:00.000Z",
        timeZone: "Asia/Kolkata",
      },
      lastUpdatedAt: "2026-05-16T09:04:00.000Z",
      supportedClaim:
        "Cooling demand increased during the period surrounding the peak.",
      availability: "available",
    },
    {
      id: "solar-generation-data",
      citationNumber: 3,
      name: "Solar Generation Data",
      sourceSystem: "Solar Monitoring Platform",
      scope: {
        type: "site",
        label: "Solar Park Alpha",
      },
      timeRange: {
        from: "2026-05-16T08:00:00.000Z",
        to: "2026-05-16T09:15:00.000Z",
        timeZone: "Asia/Kolkata",
      },
      lastUpdatedAt: "2026-05-16T09:01:00.000Z",
      supportedClaim:
        "Solar generation was below the expected contribution during the peak.",
      availability: "available",
    },
    {
      id: "production-schedule",
      citationNumber: 4,
      name: "Production Schedule",
      sourceSystem: "Manufacturing Execution System",
      scope: {
        type: "site",
        label: "Manufacturing Plant",
      },
      timeRange: {
        from: "2026-05-16T06:30:00.000Z",
        to: "2026-05-16T10:30:00.000Z",
        timeZone: "Asia/Kolkata",
      },
      lastUpdatedAt: "2026-05-16T08:50:00.000Z",
      supportedClaim:
        "Scheduled production activity overlapped with the portfolio demand peak.",
      availability: "available",
    },
  ],
  specialistAgents: [
    {
      id: "demand-analysis-agent",
      name: "Demand Analysis Agent",
      role: "Analyzes portfolio demand patterns and identifies peak events.",
      contribution:
        "Calculated the 28.7 MWh peak and quantified the demand drivers.",
      status: "completed",
      executionDurationMs: 842,
    },
    {
      id: "operations-context-agent",
      name: "Operations Context Agent",
      role: "Adds facility operations and production schedule context.",
      contribution:
        "Connected cooling load and scheduled industrial activity to the spike.",
      status: "completed",
      executionDurationMs: 613,
    },
    {
      id: "renewable-supply-agent",
      name: "Renewable Supply Agent",
      role: "Evaluates renewable supply conditions and generation gaps.",
      contribution:
        "Confirmed reduced solar generation during the demand peak.",
      status: "completed",
      executionDurationMs: 527,
    },
  ],
  validationChecks: [
    {
      id: "key-claims-grounded",
      name: "Key claims grounded",
      description: "Each material response claim is supported by cited data.",
      status: "passed",
    },
    {
      id: "citation-coverage",
      name: "Citation coverage",
      description: "All material claims include a matching source citation.",
      status: "passed",
    },
    {
      id: "tenant-source-access",
      name: "Tenant/source access validated",
      description:
        "Demo source scopes align with the response account context.",
      status: "passed",
    },
    {
      id: "data-freshness",
      name: "Data freshness passed",
      description: "All cited data met the illustrative freshness criteria.",
      status: "passed",
    },
    {
      id: "date-time-unit-alignment",
      name: "Date/time and unit alignment passed",
      description: "Timestamps, time zone, and MWh units are aligned.",
      status: "passed",
    },
    {
      id: "cross-source-consistency",
      name: "Cross-source consistency passed",
      description:
        "The four cited sources do not present conflicting evidence.",
      status: "passed",
    },
  ],
  auditMetadata: {
    correlationId: "demo-corr-20260516-1430",
    generatedAt: "2026-05-16T09:05:00.000Z",
    schemaVersion: "assistant-audit.v1",
    mode: "illustrative-demo",
  },
} satisfies AuditedAssistantResponse;
