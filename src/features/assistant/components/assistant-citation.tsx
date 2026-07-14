import type { AssistantSource } from "../models";

interface AssistantCitationProps {
  source: AssistantSource;
  onActivate: (citationNumber: number) => void;
}

export function AssistantCitation({
  source,
  onActivate,
}: AssistantCitationProps) {
  return (
    <sup className="ml-0.5 inline-flex align-super leading-none">
      <button
        type="button"
        onClick={() => onActivate(source.citationNumber)}
        aria-label={`View source ${source.citationNumber}: ${source.name}`}
        className="border-brand-primary/30 bg-brand-mint text-brand-primary hover:border-brand-primary hover:bg-brand-primary hover:text-primary-foreground focus-visible:ring-brand-primary/40 inline-flex min-h-5 min-w-5 items-center justify-center rounded border px-1 text-[10px] font-bold transition outline-none focus-visible:ring-2"
      >
        [{source.citationNumber}]
      </button>
    </sup>
  );
}
