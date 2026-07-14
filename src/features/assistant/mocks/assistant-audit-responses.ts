import type {
  AssistantBusinessModule,
  AssistantResponseStatus,
  AuditedAssistantResponse,
} from "../models";
import { demoAuditedResponse } from "./assistant-demo";

interface AuditResponseSeed {
  id: string;
  question: string;
  businessModule: AssistantBusinessModule;
  status: AssistantResponseStatus;
  summary: string;
  sourceCount: number;
  agentCount: number;
  validationPassed: number;
  generatedAt: string;
}

const responseSeeds: AuditResponseSeed[] = [
  {
    id: "demo-response-002",
    question: "How did demand compare with forecast before the latest peak?",
    businessModule: "Demand Management",
    status: "verified",
    summary:
      "Demand tracked near forecast before the documented peak, with the cited operating context explaining the later variance",
    sourceCount: 3,
    agentCount: 2,
    validationPassed: 6,
    generatedAt: "2026-05-15T10:40:00.000Z",
  },
  {
    id: "demo-response-003",
    question: "How did lower solar output affect supply coverage?",
    businessModule: "Supply Management",
    status: "needs-review",
    summary:
      "Solar generation was below its expected contribution, but additional supply-plan evidence should be reviewed before finalizing the impact",
    sourceCount: 3,
    agentCount: 2,
    validationPassed: 5,
    generatedAt: "2026-05-15T04:50:00.000Z",
  },
  {
    id: "demo-response-004",
    question: "Was the demand peak inside a high-cost tariff interval?",
    businessModule: "Rate & Tariff",
    status: "insufficient-evidence",
    summary:
      "The available evidence confirms the demand event but does not include enough tariff context to determine the applicable cost interval",
    sourceCount: 1,
    agentCount: 1,
    validationPassed: 2,
    generatedAt: "2026-05-14T12:35:00.000Z",
  },
  {
    id: "demo-response-005",
    question: "Which operating conditions should inform the carbon review?",
    businessModule: "Carbon Management",
    status: "verified",
    summary:
      "Cooling demand, scheduled production activity, and reduced solar generation are the supported operating conditions for the carbon review",
    sourceCount: 4,
    agentCount: 3,
    validationPassed: 6,
    generatedAt: "2026-05-13T11:45:00.000Z",
  },
  {
    id: "demo-response-006",
    question: "Which source conditions contributed most to the supply gap?",
    businessModule: "Supply Management",
    status: "verified",
    summary:
      "Reduced solar generation and overlapping operating demand were the primary supported conditions contributing to the supply gap",
    sourceCount: 4,
    agentCount: 3,
    validationPassed: 6,
    generatedAt: "2026-05-10T08:15:00.000Z",
  },
];

function createAuditResponse(
  seed: AuditResponseSeed,
): AuditedAssistantResponse {
  const sourceDate = seed.generatedAt.slice(0, 10);
  const applySourceDate = (value: string) => `${sourceDate}${value.slice(10)}`;
  const sources = demoAuditedResponse.sources
    .slice(0, seed.sourceCount)
    .map((source) => ({
      ...source,
      timeRange: {
        ...source.timeRange,
        from: applySourceDate(source.timeRange.from),
        to: applySourceDate(source.timeRange.to),
      },
      lastUpdatedAt: applySourceDate(source.lastUpdatedAt),
    }));
  const specialistAgents = demoAuditedResponse.specialistAgents.slice(
    0,
    seed.agentCount,
  );
  const validationChecks = demoAuditedResponse.validationChecks.map(
    (check, index) => {
      const status =
        index < seed.validationPassed
          ? ("passed" as const)
          : seed.status === "insufficient-evidence"
            ? ("failed" as const)
            : ("needs-review" as const);

      return {
        ...check,
        status,
        description:
          status === "passed"
            ? check.description
            : status === "needs-review"
              ? "This illustrative check requires business review before approval."
              : "This check could not be completed with the available illustrative evidence.",
      };
    },
  );

  return {
    ...demoAuditedResponse,
    id: seed.id,
    question: seed.question,
    businessModule: seed.businessModule,
    claims: [
      {
        id: `${seed.id}-summary`,
        text: seed.summary,
        citations: sources.map((source) => ({
          citationNumber: source.citationNumber,
          sourceId: source.id,
        })),
      },
    ],
    trust: {
      ...demoAuditedResponse.trust,
      status: seed.status,
      sourceCount: sources.length,
      specialistAgentCount: specialistAgents.length,
      validation: {
        passed: seed.validationPassed,
        total: validationChecks.length,
      },
      freshness: {
        ...demoAuditedResponse.trust.freshness,
        status:
          seed.status === "verified"
            ? "passed"
            : seed.status === "needs-review"
              ? "needs-review"
              : "stale",
        dataAsOf: seed.generatedAt,
        sourceUpdateRange: {
          from: applySourceDate(
            demoAuditedResponse.trust.freshness.sourceUpdateRange.from,
          ),
          to: applySourceDate(
            demoAuditedResponse.trust.freshness.sourceUpdateRange.to,
          ),
        },
      },
    },
    sources,
    specialistAgents,
    validationChecks,
    auditMetadata: {
      ...demoAuditedResponse.auditMetadata,
      correlationId: `demo-corr-${seed.id}`,
      generatedAt: seed.generatedAt,
    },
  };
}

export const assistantAuditResponses: AuditedAssistantResponse[] = [
  demoAuditedResponse,
  ...responseSeeds.map(createAuditResponse),
];

export const assistantAuditResponseIds = assistantAuditResponses.map(
  (response) => response.id,
);

export function getAssistantAuditResponse(responseId: string) {
  return assistantAuditResponses.find((response) => response.id === responseId);
}
