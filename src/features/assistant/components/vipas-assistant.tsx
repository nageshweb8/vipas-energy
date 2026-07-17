"use client";

import Image from "next/image";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowRight, Plus } from "lucide-react";

import logoMark from "@public/brand/vipas-energy-logo.png";
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
import {
  assistantProcessingStatuses,
  assistantSuggestedPrompts,
  demoAssistantAuditHref,
  demoAuditedResponse,
  preparingCitedResponseStatusMessage,
  supportedAssistantPrompt,
} from "../mocks/assistant-demo";
import { AssistantProcessingRow } from "./assistant-processing-row";
import {
  AuditedAssistantResponse,
  type AuditedResponseRevealStage,
} from "./audited-assistant-response";

type ConversationPhase =
  | "idle"
  | "processing"
  | "revealing"
  | "complete"
  | "unsupported";

const revealStageDurationMs: Record<
  Exclude<AuditedResponseRevealStage, "complete">,
  number
> = {
  summary: 700,
  analysis: 900,
};

export function VipasAssistant() {
  const dispatch = useAppDispatch();
  const assistantOpen = useAppSelector((state) => state.ui.assistantOpen);
  const [phase, setPhase] = useState<ConversationPhase>("idle");
  const [userQuestion, setUserQuestion] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [processingStatusIndex, setProcessingStatusIndex] = useState(0);
  const [revealStage, setRevealStage] =
    useState<AuditedResponseRevealStage>("summary");
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const isBusy = phase === "processing" || phase === "revealing";

  const resetConversation = useCallback(() => {
    setPhase("idle");
    setUserQuestion(null);
    setInputValue("");
    setProcessingStatusIndex(0);
    setRevealStage("summary");
  }, []);

  useEffect(() => {
    if (!assistantOpen || phase !== "processing") {
      return;
    }

    const currentStatus = assistantProcessingStatuses[processingStatusIndex];
    const timer = window.setTimeout(() => {
      if (processingStatusIndex === assistantProcessingStatuses.length - 1) {
        setPhase("revealing");
        setRevealStage("summary");
        return;
      }

      setProcessingStatusIndex((current) => current + 1);
    }, currentStatus?.durationMs ?? 0);

    return () => window.clearTimeout(timer);
  }, [assistantOpen, phase, processingStatusIndex]);

  useEffect(() => {
    if (!assistantOpen || phase !== "revealing") {
      return;
    }

    const currentStage = revealStage === "analysis" ? "analysis" : "summary";
    const timer = window.setTimeout(() => {
      if (currentStage === "summary") {
        setRevealStage("analysis");
        return;
      }

      setRevealStage("complete");
      setPhase("complete");
    }, revealStageDurationMs[currentStage]);

    return () => window.clearTimeout(timer);
  }, [assistantOpen, phase, revealStage]);

  useEffect(() => {
    if (phase === "idle") {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    conversationEndRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [phase, processingStatusIndex, revealStage]);

  const handleOpenChange = (open: boolean) => {
    dispatch(setAssistantOpen(open));

    if (!open) {
      resetConversation();
    }
  };

  const handleQuestion = (question: string) => {
    if (isBusy) {
      return;
    }

    const trimmedQuestion = question.trim();

    if (trimmedQuestion.length === 0) {
      return;
    }

    setUserQuestion(trimmedQuestion);
    setInputValue("");

    if (isSupportedQuestion(trimmedQuestion)) {
      setPhase("processing");
      setProcessingStatusIndex(0);
      setRevealStage("summary");
      return;
    }

    setPhase("unsupported");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleQuestion(inputValue);
  };

  const handleViewFullAudit = () => handleOpenChange(false);
  const handleRetry = () => {
    setPhase("processing");
    setProcessingStatusIndex(0);
    setRevealStage("summary");
  };
  const responseVisible = phase === "revealing" || phase === "complete";

  return (
    <Sheet open={assistantOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        disableDefaultWidth
        className="border-border-default bg-surface-white w-full max-w-[100vw] gap-0 p-0 sm:w-[42rem] xl:w-[50rem]"
      >
        <SheetHeader className="border-border-default border-b px-4 py-3">
          <SheetTitle className="text-brand-secondary flex items-center gap-2">
            <AssistantAvatar />
            Vipas Assistant
          </SheetTitle>
          <SheetDescription>
            Demo-only conversational workspace for demand, supply, rates, and
            carbon insights.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4" aria-busy={isBusy}>
          {phase === "idle" ? (
            <div className="space-y-5">
              <div className="flex gap-3">
                <AssistantAvatar />
                <div className="border-border-default bg-surface-bg text-brand-text max-w-[90%] rounded-xl border px-3.5 py-3 text-sm leading-6">
                  I can help explain energy performance using the traceable demo
                  response below. Select a suggested prompt to begin.
                </div>
              </div>

              <section aria-labelledby="assistant-suggested-prompts">
                <h2
                  id="assistant-suggested-prompts"
                  className="text-brand-secondary mb-3 text-sm font-semibold"
                >
                  Suggested prompts
                </h2>
                <div className="grid gap-2">
                  {assistantSuggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleQuestion(prompt)}
                      className="border-border-default text-brand-text bg-surface-white hover:border-brand-primary/30 hover:bg-brand-mint focus-visible:ring-brand-primary/40 flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
                    >
                      <span>{prompt}</span>
                      <ArrowRight
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {userQuestion ? <UserMessage question={userQuestion} /> : null}

          {phase === "processing" || phase === "revealing" ? (
            <AssistantProcessingRow
              message={
                phase === "revealing"
                  ? preparingCitedResponseStatusMessage
                  : (assistantProcessingStatuses[processingStatusIndex]
                      ?.message ?? assistantProcessingStatuses[0].message)
              }
            />
          ) : null}

          {responseVisible ? (
            <div className="mt-5 flex gap-3">
              <AssistantAvatar />
              <AuditedAssistantResponse
                response={demoAuditedResponse}
                stage={phase === "complete" ? "complete" : revealStage}
                auditHref={demoAssistantAuditHref}
                onRetry={handleRetry}
                onViewFullAudit={handleViewFullAudit}
              />
            </div>
          ) : null}

          {phase === "unsupported" ? <UnsupportedResponse /> : null}
          <div ref={conversationEndRef} aria-hidden="true" />
        </div>

        <div className="border-border-default border-t p-3.5">
          <form
            onSubmit={handleSubmit}
            className="border-border-default bg-surface-white flex items-center gap-2 rounded-xl border p-2 shadow-sm"
          >
            <Button type="button" variant="ghost" size="icon" disabled={isBusy}>
              <Plus className="size-4" aria-hidden="true" />
              <span className="sr-only">Attach context</span>
            </Button>
            <label htmlFor="assistant-chat-input" className="sr-only">
              Ask Vipas Assistant
            </label>
            <Input
              id="assistant-chat-input"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              disabled={isBusy}
              placeholder="Ask anything about demand, supply, rates, or carbon..."
              className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button
              type="submit"
              size="icon-lg"
              disabled={isBusy || inputValue.trim().length === 0}
            >
              <ArrowRight className="size-5" aria-hidden="true" />
              <span className="sr-only">
                {isBusy ? "Preparing response" : "Send message"}
              </span>
            </Button>
          </form>
          <p className="text-muted-foreground mt-3 text-center text-xs">
            Demo mode: no real AI calls are made in this milestone.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function AssistantAvatar() {
  return (
    <span className="bg-brand-mint text-brand-primary flex size-9 shrink-0 items-center justify-center rounded-full">
      <Image src={logoMark} alt="" className="size-5 object-contain" />
    </span>
  );
}

function UserMessage({ question }: { question: string }) {
  return (
    <div className="mt-5 flex justify-end">
      <div className="bg-brand-mint text-brand-secondary max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm font-medium">
        {question}
      </div>
    </div>
  );
}

function UnsupportedResponse() {
  return (
    <div className="mt-5 flex gap-3">
      <AssistantAvatar />
      <div className="border-border-default bg-surface-bg text-brand-text min-w-0 flex-1 rounded-xl border px-3.5 py-3 text-sm leading-6">
        This static demo can only prepare the audited May 16 demand-spike
        response. Enter “{supportedAssistantPrompt}” to try the supported
        experience. No sources or audit metadata are available for other demo
        questions.
      </div>
    </div>
  );
}

function isSupportedQuestion(question: string) {
  return (
    normalizeQuestion(question) === normalizeQuestion(supportedAssistantPrompt)
  );
}

function normalizeQuestion(question: string) {
  return question.trim().replace(/\s+/g, " ").replace(/\?+$/, "").toLowerCase();
}
