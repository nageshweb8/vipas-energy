import { Bot, CheckCircle2, CircleAlert, CircleX, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AssistantAgentStatus, AssistantSpecialistAgent } from "../models";

interface AgentWorkflowProps {
  agents: AssistantSpecialistAgent[];
  id?: string;
  className?: string;
}

const statusConfig: Record<
  AssistantAgentStatus,
  { label: string; icon: LucideIcon; className: string }
> = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "text-success",
  },
  "completed-with-warnings": {
    label: "Completed with warnings",
    icon: CircleAlert,
    className: "text-warning",
  },
  failed: {
    label: "Failed",
    icon: CircleX,
    className: "text-danger",
  },
};

export function AgentWorkflow({ agents, id, className }: AgentWorkflowProps) {
  return (
    <div id={id} className={cn("grid gap-2.5", className)}>
      {agents.map((agent) => {
        const status = statusConfig[agent.status];
        const StatusIcon = status.icon;

        return (
          <article
            key={agent.id}
            className="border-border-default bg-surface-white rounded-lg border p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-2.5">
                <span className="bg-brand-mint text-brand-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-brand-secondary text-sm font-semibold">
                    {agent.name}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-xs leading-5">
                    {agent.role}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold",
                  status.className,
                )}
              >
                <StatusIcon className="size-3.5" aria-hidden="true" />
                {status.label}
              </span>
            </div>
            <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <dt className="text-muted-foreground text-[11px] font-medium">
                  Contribution
                </dt>
                <dd className="text-brand-text mt-1 leading-5">
                  {agent.contribution}
                </dd>
              </div>
              <div className="sm:min-w-24">
                <dt className="text-muted-foreground flex items-center gap-1 text-[11px] font-medium">
                  <Timer className="size-3.5" aria-hidden="true" />
                  Duration
                </dt>
                <dd className="text-brand-secondary mt-1 font-semibold">
                  {agent.executionDurationMs} ms
                </dd>
              </div>
            </dl>
          </article>
        );
      })}
    </div>
  );
}
