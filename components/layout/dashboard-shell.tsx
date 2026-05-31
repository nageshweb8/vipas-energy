"use client";

import { useEffect, useRef, useState } from "react";

import { VipasAssistant } from "@/components/ai/vipas-assistant";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  type AppTheme,
  setAssistantOpen,
  setTheme,
  toggleSidebarCollapsed,
} from "@/store/slices/uiSlice";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const theme = useAppSelector((state) => state.ui.theme);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const skipInitialThemePersistRef = useRef(true);

  const openAssistant = () => {
    dispatch(setAssistantOpen(true));
  };

  useEffect(() => {
    const storedTheme = sessionStorage.getItem("vipas-theme");

    if (storedTheme === "dark" || storedTheme === "light") {
      const restoredTheme: AppTheme = storedTheme;

      document.documentElement.classList.toggle(
        "dark",
        restoredTheme === "dark",
      );
      dispatch(setTheme(restoredTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (skipInitialThemePersistRef.current) {
      skipInitialThemePersistRef.current = false;
      return;
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    sessionStorage.setItem("vipas-theme", theme);
  }, [theme]);

  return (
    <div
      className={cn(
        "bg-surface-bg text-brand-text min-h-screen lg:grid",
        sidebarCollapsed
          ? "lg:grid-cols-[5.25rem_minmax(0,1fr)]"
          : "lg:grid-cols-[16rem_minmax(0,1fr)]",
      )}
    >
      <AppSidebar
        collapsed={sidebarCollapsed}
        className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen"
        onAskAssistant={openAssistant}
        onToggleCollapsed={() => dispatch(toggleSidebarCollapsed())}
      />

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative h-full w-[18rem] max-w-[85vw]">
            <AppSidebar
              collapsed={false}
              onAskAssistant={openAssistant}
              onNavigate={() => setMobileNavOpen(false)}
              onToggleCollapsed={() => setMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="min-w-0">
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />
        {children}
      </div>

      <VipasAssistant />
    </div>
  );
}
