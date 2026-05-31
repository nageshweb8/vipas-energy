"use client";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  Menu,
  MessageSquareText,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAssistantOpen } from "@/store/slices/uiSlice";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const dispatch = useAppDispatch();
  const dateRange = useAppSelector((state) => state.ui.dateRange);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="border-border-default bg-surface-white sticky top-0 z-30 flex h-[73px] items-center justify-between gap-3 border-b px-4 sm:px-6 lg:px-8">
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
          className="text-brand-secondary hidden h-10 gap-2 rounded-lg px-3 sm:inline-flex"
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
          className="relative"
        >
          <Bell className="size-5" aria-hidden="true" />
          <span className="bg-brand-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
            3
          </span>
          <span className="sr-only">View notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-brand-mint flex min-w-0 items-center gap-2 rounded-lg px-1.5 py-1 transition">
            <Avatar className="size-10">
              <AvatarFallback className="font-semibold">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden min-w-0 text-left lg:block">
              <span className="text-brand-secondary block truncate text-sm font-semibold">
                {user.name}
              </span>
              <span className="text-muted-foreground block truncate text-xs">
                {user.company}
              </span>
            </span>
            <ChevronDown
              className="text-muted-foreground hidden size-4 lg:block"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{user.company}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account profile</DropdownMenuItem>
            <DropdownMenuItem>Workspace settings</DropdownMenuItem>
            <DropdownMenuItem>Notification preferences</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
