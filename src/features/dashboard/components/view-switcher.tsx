import { LayoutGrid, List, MapPinned } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PortfolioViewMode = "map" | "grid" | "list";

interface ViewSwitcherProps {
  value: PortfolioViewMode;
  onChange: (value: PortfolioViewMode) => void;
}

interface ViewOption {
  value: PortfolioViewMode;
  label: string;
  icon: LucideIcon;
}

const viewOptions: ViewOption[] = [
  {
    value: "map",
    label: "Map",
    icon: MapPinned,
  },
  {
    value: "grid",
    label: "Grid",
    icon: LayoutGrid,
  },
  {
    value: "list",
    label: "List",
    icon: List,
  },
];

export function ViewSwitcher({ value, onChange }: ViewSwitcherProps) {
  return (
    <div
      className="border-border-default bg-surface-white inline-flex items-center gap-1 rounded-xl border p-1 shadow-sm"
      aria-label="Portfolio view switcher"
      role="group"
    >
      {viewOptions.map((option) => {
        const Icon = option.icon;
        const isActive = option.value === value;

        return (
          <Button
            key={option.value}
            type="button"
            size="sm"
            variant={isActive ? "default" : "ghost"}
            className={cn(
              "min-w-[4.5rem] gap-1.5 rounded-lg px-3",
              !isActive && "text-brand-text",
            )}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            <Icon className="size-4" aria-hidden="true" />
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
