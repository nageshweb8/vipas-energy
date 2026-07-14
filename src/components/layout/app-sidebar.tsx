"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CalendarDays,
  ChevronLeft,
  Gauge,
  LayoutDashboard,
  Leaf,
  MessageCircle,
  Settings,
  UserRound,
  WalletCards,
  Zap,
} from "lucide-react";

import logoMark from "@public/brand/vipas-energy-logo.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navigationItems: NavigationItem[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/demand",
    label: "Demand Management",
    icon: Activity,
  },
  {
    href: "/supply",
    label: "Supply Management",
    icon: Zap,
  },
  {
    href: "/rate-tariff",
    label: "Rate & Tariff",
    icon: WalletCards,
  },
  {
    href: "/carbon",
    label: "Carbon Management",
    icon: Leaf,
  },
  {
    href: "/subscriptions",
    label: "Subscriptions & Settings",
    icon: CalendarDays,
  },
  {
    href: "/account",
    label: "Manage Account",
    icon: UserRound,
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  className?: string;
  onAskAssistant: () => void;
  onNavigate?: () => void;
  onToggleCollapsed: () => void;
}

export function AppSidebar({
  collapsed,
  className,
  onAskAssistant,
  onNavigate,
  onToggleCollapsed,
}: AppSidebarProps) {
  const pathname = usePathname();
  const handleNavigate = () => {
    onNavigate?.();
  };

  return (
    <aside
      className={cn(
        "border-border-default bg-surface-white flex h-full min-h-0 flex-col overflow-hidden border-r",
        className,
      )}
    >
      <div
        className={cn(
          "border-border-default flex h-16 shrink-0 items-center border-b px-4",
          collapsed ? "justify-center" : "justify-start",
        )}
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="Go to dashboard"
          onClick={handleNavigate}
        >
          <Image
            src={logoMark}
            alt=""
            className="size-9 shrink-0 object-contain"
            priority
          />
          {!collapsed && (
            <span className="text-brand-secondary truncate text-lg font-bold tracking-tight">
              Vipas<span className="text-brand-primary">Energy</span>
            </span>
          )}
        </Link>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : ""}
                onClick={handleNavigate}
                className={cn(
                  "text-brand-text flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition",
                  "hover:bg-brand-mint hover:text-brand-secondary",
                  isActive &&
                    "bg-brand-primary text-primary-foreground hover:bg-brand-primary hover:text-primary-foreground shadow-sm",
                  collapsed && "justify-center px-0",
                )}
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-border-default shrink-0 border-t px-3 py-4">
          {!collapsed && (
            <p className="text-muted-foreground mb-3 px-3 text-xs font-semibold tracking-wide uppercase">
              Conversational UX
            </p>
          )}
          <button
            type="button"
            title={collapsed ? "Ask Vipas Assistant" : undefined}
            onClick={onAskAssistant}
            className={cn(
              "text-brand-text hover:bg-brand-mint hover:text-brand-secondary flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold transition",
              collapsed && "justify-center px-0",
            )}
          >
            <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
            {!collapsed && (
              <>
                <span className="min-w-0 flex-1 truncate">
                  Ask Vipas Assistant
                </span>
                <Badge
                  variant="outline"
                  className="border-violet-200 bg-violet-50 text-[10px] text-violet-600 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200"
                >
                  BETA
                </Badge>
              </>
            )}
          </button>

          <div className="mt-2.5">
            <Button
              type="button"
              variant="ghost"
              className={cn(
                "text-muted-foreground h-10 w-full justify-start gap-3",
                collapsed && "justify-center px-0",
              )}
              onClick={onToggleCollapsed}
            >
              {collapsed ? (
                <Gauge className="size-5" aria-hidden="true" />
              ) : (
                <ChevronLeft className="size-5" aria-hidden="true" />
              )}
              {!collapsed && <span>Collapse</span>}
            </Button>
          </div>

          {!collapsed && (
            <div className="px-3 pt-3">
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <Settings className="size-3.5" aria-hidden="true" />
                Demo workspace
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
