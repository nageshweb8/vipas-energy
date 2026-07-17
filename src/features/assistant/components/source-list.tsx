import { SourceCard } from "./source-card";
import type { AssistantSource } from "../models";

interface SourceListProps {
  id: string;
  open: boolean;
  sources: AssistantSource[];
  highlightedCitationNumber: number | null;
}

export function SourceList({
  id,
  open,
  sources,
  highlightedCitationNumber,
}: SourceListProps) {
  if (!open) {
    return null;
  }

  return (
    <section
      id={id}
      aria-label="Sources used for this AI response"
      className="border-border-default bg-surface-bg rounded-lg border p-3"
    >
      <div>
        <h2 className="text-brand-secondary text-sm font-semibold">
          Sources used
        </h2>
        <p className="text-muted-foreground mt-1 text-xs leading-5">
          Supporting evidence is shown without prompts, hidden reasoning, or raw
          tool parameters.
        </p>
      </div>
      <div className="mt-3 grid gap-2.5">
        {sources.map((source) => (
          <SourceCard
            key={source.id}
            source={source}
            highlighted={source.citationNumber === highlightedCitationNumber}
          />
        ))}
      </div>
    </section>
  );
}
