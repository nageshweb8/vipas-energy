import type { AssistantResponseStatus } from "../models";

export const assistantResponseStatusLabels: Record<
  AssistantResponseStatus,
  string
> = {
  verified: "Evidence verified",
  "needs-review": "Needs review",
  "insufficient-evidence": "Insufficient evidence",
};
