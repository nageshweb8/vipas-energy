export type AssistantResponseStatus =
  | "verified"
  | "needs-review"
  | "insufficient-evidence";

export type AssistantSourceAvailability =
  | "available"
  | "limited"
  | "unavailable";

export type AssistantAgentStatus =
  | "completed"
  | "completed-with-warnings"
  | "failed";

export type AssistantValidationStatus = "passed" | "needs-review" | "failed";

export type AssistantFreshnessStatus = "passed" | "needs-review" | "stale";

export type AssistantBusinessModule =
  | "Demand Management"
  | "Supply Management"
  | "Rate & Tariff"
  | "Carbon Management";

export interface AssistantCitationReference {
  citationNumber: number;
  sourceId: string;
}

export interface AssistantResponseClaim {
  id: string;
  text: string;
  citations: AssistantCitationReference[];
}

export interface AssistantSourceScope {
  type: "account" | "site";
  label: string;
}

export interface AssistantSourceTimeRange {
  from: string;
  to: string;
  timeZone: string;
}

export interface AssistantSource {
  id: string;
  citationNumber: number;
  name: string;
  sourceSystem: string;
  scope: AssistantSourceScope;
  timeRange: AssistantSourceTimeRange;
  lastUpdatedAt: string;
  supportedClaim: string;
  availability: AssistantSourceAvailability;
}

export interface AssistantValidationSummary {
  passed: number;
  total: number;
}

export interface AssistantDataFreshness {
  status: AssistantFreshnessStatus;
  dataAsOf: string;
  timeZone: string;
  sourceUpdateRange: {
    from: string;
    to: string;
  };
}

export interface AssistantTrustSummaryModel {
  status: AssistantResponseStatus;
  sourceCount: number;
  specialistAgentCount: number;
  validation: AssistantValidationSummary;
  freshness: AssistantDataFreshness;
}

export interface AssistantSpecialistAgent {
  id: string;
  name: string;
  role: string;
  contribution: string;
  status: AssistantAgentStatus;
  executionDurationMs: number;
}

export interface AssistantValidationCheck {
  id: string;
  name: string;
  description: string;
  status: AssistantValidationStatus;
}

export interface AssistantAuditMetadata {
  correlationId: string;
  generatedAt: string;
  schemaVersion: string;
  mode: "illustrative-demo";
}

export interface AssistantResponseContributor {
  id: string;
  label: string;
  contributionPercent: number;
}

export interface AuditedAssistantResponse {
  id: string;
  question: string;
  businessModule: AssistantBusinessModule;
  claims: AssistantResponseClaim[];
  peakDemand: {
    value: number;
    unit: string;
    occurredAt: string;
    timeZone: string;
  };
  contributors: AssistantResponseContributor[];
  trust: AssistantTrustSummaryModel;
  sources: AssistantSource[];
  specialistAgents: AssistantSpecialistAgent[];
  validationChecks: AssistantValidationCheck[];
  auditMetadata: AssistantAuditMetadata;
}
