import { cn } from "@/lib/utils";

export type StatusBadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

interface StatusBadgeProps {
  children: React.ReactNode;
  variant: StatusBadgeVariant;
}

const statusBadgeClasses: Record<StatusBadgeVariant, string> = {
  success:
    "border-success/20 bg-success/10 text-success dark:border-success/30",
  warning:
    "border-warning/20 bg-warning/10 text-warning dark:border-warning/30",
  danger: "border-danger/20 bg-danger/10 text-danger dark:border-danger/30",
  info: "border-info/20 bg-info/10 text-info dark:border-info/30",
  neutral:
    "border-border-default bg-surface-bg text-muted-foreground dark:border-white/10",
};

export function StatusBadge({ children, variant }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 text-xs font-semibold",
        statusBadgeClasses[variant],
      )}
    >
      {children}
    </span>
  );
}
