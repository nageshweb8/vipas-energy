import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/shared/status-badge";
import type { AssistantResponseStatus } from "../models";
import { assistantResponseStatusLabels } from "../utils/audit-status";

interface AssistantStatusBadgeProps {
  status: AssistantResponseStatus;
}

const statusVariants: Record<AssistantResponseStatus, StatusBadgeVariant> = {
  verified: "success",
  "needs-review": "warning",
  "insufficient-evidence": "danger",
};

export function AssistantStatusBadge({ status }: AssistantStatusBadgeProps) {
  return (
    <StatusBadge variant={statusVariants[status]}>
      {assistantResponseStatusLabels[status]}
    </StatusBadge>
  );
}
