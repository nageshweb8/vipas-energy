import { LoaderCircle } from "lucide-react";

interface AssistantProcessingRowProps {
  message: string;
}

export function AssistantProcessingRow({
  message,
}: AssistantProcessingRowProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="text-muted-foreground mt-3 flex items-center gap-2 px-1 text-xs leading-5"
    >
      <LoaderCircle
        className="text-brand-primary size-4 shrink-0 motion-safe:animate-spin"
        aria-hidden="true"
      />
      <span>{message}</span>
    </div>
  );
}
