import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

interface AuditDemoNoteProps {
  className?: string;
}

export function AuditDemoNote({ className }: AuditDemoNoteProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground flex items-start gap-1.5 text-[11px] leading-5",
        className,
      )}
    >
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      Audit metadata is illustrative demo data.
    </p>
  );
}
