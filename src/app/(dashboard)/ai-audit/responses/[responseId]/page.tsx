import { notFound } from "next/navigation";

import {
  AssistantAuditPage,
  assistantAuditResponseIds,
  getAssistantAuditResponse,
} from "@/features/assistant";

export const dynamicParams = false;

export function generateStaticParams() {
  return assistantAuditResponseIds.map((responseId) => ({ responseId }));
}

export default async function AssistantAuditDetailRoute({
  params,
}: {
  params: Promise<{ responseId: string }>;
}) {
  const { responseId } = await params;
  const response = getAssistantAuditResponse(responseId);

  if (!response) {
    notFound();
  }

  return <AssistantAuditPage response={response} />;
}
