"use client";

import Image from "next/image";
import { ArrowRight, BarChart3, FileText, Plus } from "lucide-react";

import logoMark from "@public/brand/vipas-energy-logo.png";
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

export function VipasAssistant() {
  const dispatch = useAppDispatch();
  const assistantOpen = useAppSelector((state) => state.ui.assistantOpen);

  return (
    <Sheet
      open={assistantOpen}
      onOpenChange={(open) => dispatch(setAssistantOpen(open))}
    >
      <SheetContent
        side="right"
        disableDefaultWidth
        className="border-border-default bg-surface-white w-full max-w-[100vw] gap-0 p-0 sm:w-[42rem] xl:w-[50rem]"
      >
        <SheetHeader className="border-border-default border-b px-4 py-3">
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

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="mb-5">
            <p className="text-brand-secondary mb-3 text-sm font-semibold">
              Suggested prompts
            </p>
            <div className="grid gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="border-border-default text-brand-text bg-surface-white hover:border-brand-primary/30 hover:bg-brand-mint flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 flex justify-end">
            <div className="bg-brand-mint text-brand-secondary max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm font-medium">
              Why did demand spike on May 16 around 2:30 PM?
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-brand-mint text-brand-primary flex size-9 shrink-0 items-center justify-center rounded-full">
              <Image src={logoMark} alt="" className="size-5 object-contain" />
            </div>
            <DashboardCard
              className="min-w-0 flex-1 shadow-none"
              contentClassName="space-y-3"
            >
              <p className="text-brand-text text-sm leading-6">
                Demand peaked at 28.7 MWh due to higher cooling load, increased
                industrial activity, and lower solar output. The production
                assistant will later render this from a controlled chart
                component payload.
              </p>
              <div className="border-border-default bg-surface-bg grid gap-3 rounded-lg border p-2.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
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

        <div className="border-border-default border-t p-3.5">
          <div className="border-border-default bg-surface-white flex items-center gap-2 rounded-xl border p-2 shadow-sm">
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
