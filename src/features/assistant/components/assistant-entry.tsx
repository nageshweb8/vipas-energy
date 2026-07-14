"use client";

import { Send, Sparkles } from "lucide-react";

import { useAppDispatch } from "@/store/hooks";
import { setAssistantOpen } from "@/store/slices/uiSlice";

interface AssistantEntryProps {
  label?: string;
}

export function AssistantEntry({
  label = "Ask Vipas Assistant...",
}: AssistantEntryProps) {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      onClick={() => dispatch(setAssistantOpen(true))}
      className="border-border-default bg-surface-white hover:border-brand-primary/40 flex h-12 items-center gap-3 rounded-xl border px-3.5 text-left shadow-sm transition hover:shadow-md"
    >
      <Sparkles className="size-5 shrink-0 text-violet-500" />
      <span className="text-muted-foreground min-w-0 flex-1 truncate text-sm">
        {label}
      </span>
      <Send className="text-brand-primary size-5 shrink-0" />
    </button>
  );
}
