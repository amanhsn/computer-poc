"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PanelRight,
  X,
  Check,
  Loader2,
  Clock,
  ShieldCheck,
  MousePointer2,
  FileText,
  Download,
  List,
} from "lucide-react";
import { Shell, ChatColumn, Canvas, MenuBar, Dock } from "@/components/shell";
import { PromptBox, Disclaimer } from "@/components/prompt-box";
import { PillButton, IconButton } from "@/components/ui";
import { weeklyDesignBrief, connectorById } from "@/lib/data";

type Phase = { current: number; waiting: boolean; finished: boolean };

const STEP_MS = 2400;

/* what the ghost cursor is "doing" per running step */
const CURSOR_ACTIONS = [
  "Recomputing cost-per-lead…",
  "Writing Weekly Insights…",
  "Laying out the insight map…",
  "Updating the Hero A frame…",
  "Drafting the #design summary…",
];

const CURSOR_POS = [
  { top: "30%", left: "38%" },
  { top: "42%", left: "55%" },
  { top: "36%", left: "46%" },
  { top: "55%", left: "60%" },
  { top: "62%", left: "42%" },
];

export default function CurrentRunPage() {
  const steps = weeklyDesignBrief.steps;
  const [phase, setPhase] = useState<Phase>({
    current: 0,
    waiting: false,
    finished: false,
  });

  useEffect(() => {
    if (phase.finished || phase.waiting) return;
    const t = setTimeout(() => {
      setPhase((p) => {
        const next = p.current + 1;
        if (next >= steps.length) return { ...p, finished: true };
        if (steps[next].needsApproval) return { current: next, waiting: true, finished: false };
        return { current: next, waiting: false, finished: false };
      });
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [phase, steps]);

  const approve = () =>
    setPhase((p) => ({ ...p, waiting: false }));

  const activeConnector = useMemo(() => {
    if (phase.finished) return undefined;
    return steps[phase.current]?.connectorId;
  }, [phase, steps]);

  return (
    <Shell>
      <ChatColumn>
        <header className="flex items-center justify-end gap-2 pb-2 pt-4">
          <IconButton icon={PanelRight} label="Toggle sidebar" />
          <PillButton variant="brand">
            Interface
            <X size={16} strokeWidth={1.8} />
          </PillButton>
          <PillButton variant="neutral">New chat</PillButton>
        </header>

        {/* conversation */}
        <div className="flex flex-1 flex-col justify-end gap-4 overflow-y-auto pb-4">
          <div className="flex justify-end">
            <p className="max-w-[328px] rounded-10 bg-fill-secondary px-4 py-3 text-body-md text-content">
              Run my weekly design brief
            </p>
          </div>
          <div className="flex gap-3">
            <span
              aria-hidden
              className="mt-1 block h-6 w-6 shrink-0 rounded-full border border-subtle"
              style={{ background: "linear-gradient(180deg,#a56eff,#6929c4)" }}
            />
            <p className="max-w-xl text-body-md leading-7 text-content">
              On it. Five steps across Sheets, Docs, FigJam, Figma, and Slack —
              I&apos;ll pause before touching your Figma frames or posting
              anywhere.
            </p>
          </div>
        </div>

        {/* Prompt-with-Todo: progress tray docked in the outer shell */}
        <PromptBox
          tray={
            <div className="px-3.5 pb-1 pt-3">
              <div className="flex items-center justify-between pb-2">
                <span className="text-body-sm font-medium text-content">
                  {phase.finished
                    ? "Run complete"
                    : phase.waiting
                      ? "Waiting for you"
                      : "Task progress"}
                </span>
                <span className="text-label-sm text-content-tertiary">
                  {phase.finished ? steps.length : phase.current}/{steps.length}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5 pb-2">
                {steps.map((s, i) => {
                  const done = phase.finished || i < phase.current;
                  const running =
                    !phase.finished && !phase.waiting && i === phase.current;
                  const waiting = phase.waiting && i === phase.current;
                  return (
                    <li key={s.id} className="flex items-center gap-2.5">
                      {done ? (
                        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-ok-surface">
                          <Check size={11} strokeWidth={2.4} className="text-ok" />
                        </span>
                      ) : running ? (
                        <Loader2
                          size={18}
                          className="animate-spin text-accent"
                          strokeWidth={2}
                        />
                      ) : waiting ? (
                        <ShieldCheck size={18} className="text-accent" strokeWidth={1.8} />
                      ) : (
                        <Clock size={18} className="text-content-tertiary" strokeWidth={1.8} />
                      )}
                      <span
                        className={`truncate text-body-sm ${
                          done || running || waiting
                            ? "text-content"
                            : "text-content-tertiary"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span className="ml-auto text-label-xs text-content-tertiary">
                        {connectorById(s.connectorId).name}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {phase.waiting ? (
                <div className="mb-2 rounded-8 bg-accent-tint p-3">
                  <p className="text-body-sm text-content">
                    Next step updates{" "}
                    <span className="font-medium">
                      {steps[phase.current].output}
                    </span>
                    . Want to look first?
                  </p>
                  <div className="mt-2.5 flex gap-2">
                    <button
                      type="button"
                      onClick={approve}
                      className="gloss flex h-8 items-center gap-1.5 rounded-full px-3 text-label-md font-medium text-on-fill"
                    >
                      <Check size={14} strokeWidth={2} />
                      Approve
                    </button>
                    <button
                      type="button"
                      className="flex h-8 items-center rounded-full bg-raised px-3 text-label-md font-medium text-content shadow-xs"
                    >
                      View first
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          }
        />
        <Disclaimer />
      </ChatColumn>

      <Canvas>
        <MenuBar />

        {/* floating artifact toolbar */}
        <div className="z-10 mx-auto -mt-1 flex h-11 w-fit items-center gap-2 rounded-full bg-white/60 px-2 shadow-toolbar backdrop-blur-sm">
          <span className="flex h-8 items-center gap-1.5 rounded-full bg-accent-tint px-3 text-label-md font-medium text-accent">
            <FileText size={14} strokeWidth={1.8} />
            Weekly Insights — Jul 28
          </span>
          <IconButton icon={List} label="Outline" variant="glass" size={28} />
          <IconButton icon={Download} label="Download" variant="glass" size={28} />
        </div>

        {/* artifact sheet + ghost cursor */}
        <div className="relative flex-1 overflow-y-auto px-6 pb-24 pt-2">
          <article className="mx-auto w-full max-w-3xl rounded-11 bg-raised px-14 pb-16 pt-12 max-md:px-6">
            <h1 className="text-heading-md font-semibold text-content">
              Weekly Insights
            </h1>
            <p className="mt-1 text-body-sm text-content-tertiary">
              Generated from Campaign Budget · Q3 — Monday, July 28
            </p>
            <hr className="my-6 border-subtle" />
            <h2 className="text-heading-xs font-semibold text-content">
              What moved
            </h2>
            <p className="mt-2 text-body-md leading-7 text-content-secondary">
              Cost-per-lead dropped 18% after the creative refresh; short-form
              placements outperformed static by 2.3×. Spend is pacing 4% under
              budget with two weeks left in the flight.
            </p>
            {(phase.current >= 2 || phase.finished) && (
              <>
                <h2 className="mt-6 text-heading-xs font-semibold text-content">
                  Recommendations
                </h2>
                <ol className="mt-2 list-decimal pl-5 text-body-md leading-7 text-content-secondary">
                  <li>Shift 15% of static budget into short-form.</li>
                  <li>Iterate the Hero A direction — it carried the lift.</li>
                  <li>Refresh landing visuals to match the winning creative.</li>
                </ol>
              </>
            )}
            {phase.finished && (
              <p className="mt-6 rounded-8 bg-ok-surface px-4 py-3 text-body-sm text-ok">
                Run complete — doc, board, and frames updated; summary posted to
                #design.
              </p>
            )}
          </article>

          {/* Warmwind-style ghost cursor + action chip */}
          {!phase.finished && !phase.waiting && (
            <div
              aria-hidden
              className="pointer-events-none absolute z-20 transition-all duration-1000 ease-in-out"
              style={CURSOR_POS[phase.current]}
            >
              <MousePointer2
                size={20}
                className="fill-white text-content drop-shadow-md"
              />
              <span className="ml-4 mt-1 block w-max rounded-full bg-accent-tint px-2.5 py-1 text-label-sm font-medium text-accent shadow-xs backdrop-blur-sm">
                {CURSOR_ACTIONS[phase.current]}
              </span>
            </div>
          )}
        </div>

        <Dock activeId={activeConnector} />
      </Canvas>
    </Shell>
  );
}
