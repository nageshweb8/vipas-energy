import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  description?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function DashboardCard({
  title,
  description,
  headerAction,
  children,
  className,
  contentClassName,
}: DashboardCardProps) {
  return (
    <section
      className={cn(
        "border-border-default bg-surface-white rounded-xl border shadow-sm",
        className,
      )}
    >
      {(title || description || headerAction) && (
        <div className="flex items-start justify-between gap-4 border-b border-transparent px-4 pt-4 sm:px-5">
          <div className="min-w-0">
            {title && (
              <h2 className="text-brand-secondary text-base font-semibold">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                {description}
              </p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className={cn("p-4 sm:p-5", contentClassName)}>{children}</div>
    </section>
  );
}
