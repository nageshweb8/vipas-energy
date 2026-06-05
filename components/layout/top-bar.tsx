"use client";

import { useRouter } from "next/navigation";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  MessageSquareText,
  Moon,
  Sun,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearSession } from "@/store/slices/authSlice";
import { setAssistantOpen, toggleTheme } from "@/store/slices/uiSlice";

interface TopBarProps {
  onMenuClick: () => void;
}

const SESSION_KEY = "vipas_session";

export function TopBar({ onMenuClick }: TopBarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dateRange = useAppSelector((state) => state.ui.dateRange);
  const theme = useAppSelector((state) => state.ui.theme);
  const user = useAppSelector((state) => state.auth.user);

  function handleSignOut() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore if sessionStorage is unavailable
    }
    dispatch(clearSession());
    router.replace("/login");
  }
  const displayInitials =
    user.initials.replace(/\s+/g, "").slice(0, 2).toUpperCase() ||
    user.name
      .split(" ")
      .map((part) => part[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <header className="border-border-default bg-surface-white sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b px-4 sm:px-5 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="size-5" aria-hidden="true" />
          <span className="sr-only">Open navigation</span>
        </Button>
        <div className="hidden min-w-0 sm:block">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Vipas Energy Navigator
          </p>
          <p className="text-brand-secondary truncate text-sm font-semibold">
            Staged analytics workspace
          </p>
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
        <Button
          type="button"
          variant="outline"
          className="text-brand-secondary hidden h-9 gap-2 rounded-lg px-3 sm:inline-flex"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          <span className="hidden md:inline">
            {dateRange.fromLabel} - {dateRange.toLabel}
          </span>
          <span className="md:hidden">Date range</span>
          <ChevronDown className="size-4" aria-hidden="true" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          className="relative"
          onClick={() => dispatch(setAssistantOpen(true))}
        >
          <MessageSquareText className="size-5" aria-hidden="true" />
          <span className="sr-only">Open assistant</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? (
            <Sun className="size-5" aria-hidden="true" />
          ) : (
            <Moon className="size-5" aria-hidden="true" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          className="relative"
        >
          <Bell className="size-5" aria-hidden="true" />
          <span className="bg-brand-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
            3
          </span>
          <span className="sr-only">View notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-brand-mint focus-visible:ring-border-default flex size-11 items-center justify-center rounded-full p-1 outline-hidden transition focus-visible:ring-2">
            <Avatar className="size-9">
              <AvatarFallback className="text-sm font-semibold">
                {displayInitials}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Open account menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-1.5">
                <span className="text-brand-secondary block truncate text-sm font-semibold">
                  {user.name}
                </span>
                <span className="text-muted-foreground block truncate text-xs">
                  {user.company}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Account profile</DropdownMenuItem>
              <DropdownMenuItem>Workspace settings</DropdownMenuItem>
              <DropdownMenuItem>Notification preferences</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-danger focus:bg-danger/10 focus:text-danger gap-2"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
