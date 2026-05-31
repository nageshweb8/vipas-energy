"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowRight, BarChart3, FileText, Plus } from "lucide-react";

import logoMark from "@/docs/Vipas Files/Final Logo Files/Vipas Energy Final Logo Transparant.png";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAssistantOpen } from "@/store/slices/uiSlice";

const suggestedPrompts = [
  "What drove the May 16 demand spike?",
  "Compare demand against forecast this week.",
  "Which sites should operations review first?",
  "Create a weekly demand summary.",
] as const;

const ASSISTANT_DEFAULT_WIDTH = 800;
const ASSISTANT_MIN_WIDTH = 560;
const ASSISTANT_MAX_WIDTH = 1120;
const ASSISTANT_RESIZE_STEP = 32;

function clampAssistantWidth(width: number) {
  const viewportMaxWidth =
    typeof window === "undefined"
      ? ASSISTANT_DEFAULT_WIDTH
      : Math.max(360, Math.min(ASSISTANT_MAX_WIDTH, window.innerWidth - 12));

  const viewportMinWidth = Math.min(ASSISTANT_MIN_WIDTH, viewportMaxWidth);

  return Math.min(Math.max(width, viewportMinWidth), viewportMaxWidth);
}

export function VipasAssistant() {
  const dispatch = useAppDispatch();
  const assistantOpen = useAppSelector((state) => state.ui.assistantOpen);
  const [assistantWidth, setAssistantWidth] = useState(() =>
    clampAssistantWidth(ASSISTANT_DEFAULT_WIDTH),
  );
  const resizeCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleViewportResize = () => {
      setAssistantWidth((currentWidth) => clampAssistantWidth(currentWidth));
    };

    window.addEventListener("resize", handleViewportResize);

    return () => {
      window.removeEventListener("resize", handleViewportResize);
      resizeCleanupRef.current?.();
    };
  }, []);

  const handleResizeStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") {
      return;
    }

    event.preventDefault();

    resizeCleanupRef.current?.();

    const startX = event.clientX;
    const startWidth = assistantWidth;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const widthDelta = startX - moveEvent.clientX;

      setAssistantWidth(clampAssistantWidth(startWidth + widthDelta));
    };

    const stopResize = () => {
      resizeCleanupRef.current?.();
    };

    const cleanup = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("pointercancel", stopResize);
      document.body.classList.remove("cursor-col-resize", "select-none");
      resizeCleanupRef.current = null;
    };

    resizeCleanupRef.current = cleanup;

    document.body.classList.add("cursor-col-resize", "select-none");
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);
  };

  const handleResizeKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setAssistantWidth((currentWidth) =>
        clampAssistantWidth(currentWidth + ASSISTANT_RESIZE_STEP),
      );
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setAssistantWidth((currentWidth) =>
        clampAssistantWidth(currentWidth - ASSISTANT_RESIZE_STEP),
      );
    }

    if (event.key === "Home") {
      event.preventDefault();
      setAssistantWidth(clampAssistantWidth(ASSISTANT_MIN_WIDTH));
    }

    if (event.key === "End") {
      event.preventDefault();
      setAssistantWidth(clampAssistantWidth(ASSISTANT_MAX_WIDTH));
    }
  };

  return (
    <Sheet
      open={assistantOpen}
      onOpenChange={(open) => dispatch(setAssistantOpen(open))}
    >
      <SheetContent
        side="right"
        disableDefaultWidth
        className="border-border-default bg-surface-white gap-0 p-0"
        style={{ width: `${assistantWidth}px`, maxWidth: "100vw" }}
      >
        <div
          role="separator"
          aria-label="Resize assistant width"
          aria-orientation="vertical"
          aria-valuemin={ASSISTANT_MIN_WIDTH}
          aria-valuemax={ASSISTANT_MAX_WIDTH}
          aria-valuenow={assistantWidth}
          tabIndex={0}
          onPointerDown={handleResizeStart}
          onKeyDown={handleResizeKeyDown}
          className="group absolute top-0 left-0 z-20 hidden h-full w-4 -translate-x-1/2 cursor-col-resize touch-none items-center justify-center outline-hidden sm:flex"
        >
          <span className="bg-border-default group-hover:bg-brand-primary/35 group-focus-visible:bg-brand-primary/45 h-20 w-1 rounded-full transition" />
          <span className="sr-only">
            Drag to resize the assistant panel. Use Left or Right arrow keys to
            adjust the width.
          </span>
        </div>

        <SheetHeader className="border-border-default border-b px-5 py-4">
          <SheetTitle className="text-brand-secondary flex items-center gap-2">
            <span className="bg-brand-mint text-brand-primary flex size-9 items-center justify-center rounded-full">
              <Image src={logoMark} alt="" className="size-5 object-contain" />
            </span>
            Vipas Assistant
          </SheetTitle>
          <SheetDescription>
            Demo-only conversational workspace for demand, supply, rates, and
            carbon insights.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="mb-5">
            <p className="text-brand-secondary mb-3 text-sm font-semibold">
              Suggested prompts
            </p>
            <div className="grid gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="border-border-default text-brand-text hover:border-brand-primary/30 hover:bg-brand-mint flex items-center justify-between gap-3 rounded-lg border bg-white px-3 py-3 text-left text-sm transition"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 flex justify-end">
            <div className="bg-brand-mint text-brand-secondary max-w-[85%] rounded-xl px-4 py-3 text-sm font-medium">
              Why did demand spike on May 16 around 2:30 PM?
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-brand-mint text-brand-primary flex size-9 shrink-0 items-center justify-center rounded-full">
              <Image src={logoMark} alt="" className="size-5 object-contain" />
            </div>
            <DashboardCard
              className="min-w-0 flex-1 shadow-none"
              contentClassName="space-y-4"
            >
              <p className="text-brand-text text-sm leading-6">
                Demand peaked at 28.7 MWh due to higher cooling load, increased
                industrial activity, and lower solar output. The production
                assistant will later render this from a controlled chart
                component payload.
              </p>
              <div className="border-border-default bg-surface-bg grid gap-3 rounded-lg border p-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Peak Demand
                  </p>
                  <p className="text-brand-secondary mt-2 text-2xl font-bold">
                    28.7 MWh
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    May 16, 2025 - 2:30 PM
                  </p>
                </div>
                <div className="min-w-0 space-y-2">
                  {[
                    ["Cooling Load", "18.6%"],
                    ["Industrial Activity", "12.4%"],
                    ["Solar Generation Gap", "15.3%"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-3"
                    >
                      <span className="text-brand-text text-sm">{label}</span>
                      <span className="text-success text-sm font-semibold">
                        {value}
                      </span>
                      <span className="bg-border-default col-span-2 h-2 overflow-hidden rounded-full">
                        <span className="bg-brand-primary block h-full w-3/4 rounded-full" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" type="button">
                  <FileText className="size-4" aria-hidden="true" />
                  Create report
                </Button>
                <Button variant="outline" size="sm" type="button">
                  <BarChart3 className="size-4" aria-hidden="true" />
                  View full analysis
                </Button>
              </div>
            </DashboardCard>
          </div>
        </div>

        <div className="border-border-default border-t p-4">
          <div className="border-border-default flex items-center gap-2 rounded-xl border bg-white p-2 shadow-sm">
            <Button type="button" variant="ghost" size="icon">
              <Plus className="size-4" aria-hidden="true" />
              <span className="sr-only">Attach context</span>
            </Button>
            <Input
              readOnly
              value=""
              placeholder="Ask anything about demand, supply, rates, or carbon..."
              className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button type="button" size="icon-lg">
              <ArrowRight className="size-5" aria-hidden="true" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          <p className="text-muted-foreground mt-3 text-center text-xs">
            Demo mode: no real AI calls are made in this milestone.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
