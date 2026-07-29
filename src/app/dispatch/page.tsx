import Link from "next/link";
import { CalendarClock, Plus, ChevronRight } from "lucide-react";
import { Shell, Canvas, MenuBar, Dock } from "@/components/shell";
import { StatusPill } from "@/components/ui";
import { runs, routines } from "@/lib/data";

const RUN_STATUS = {
  succeeded: { kind: "ok", label: "Succeeded" },
  "needs-approval": { kind: "warn", label: "Needs approval" },
  failed: { kind: "danger", label: "Failed" },
  running: { kind: "accent", label: "Running" },
} as const;

export default function DispatchPage() {
  const active = routines.filter((r) => r.status === "active").length;
  const needsApproval = runs.filter((r) => r.status === "needs-approval").length;

  return (
    <Shell>
      <Canvas>
        <MenuBar />

        <div className="z-10 mx-auto -mt-1 flex h-11 w-fit items-center gap-2 rounded-full bg-white/60 px-2 shadow-toolbar backdrop-blur-sm">
          <span className="flex h-8 items-center gap-1.5 rounded-full bg-accent-tint px-3 text-label-md font-medium text-accent">
            <CalendarClock size={14} strokeWidth={1.8} />
            Dispatch
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24 pt-2">
          <article className="mx-auto w-full max-w-4xl rounded-11 bg-raised px-14 pb-16 pt-12 max-md:px-6">
            <header className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-heading-md font-semibold">
                  <span className="text-content-tertiary">Your agent, </span>
                  <span className="text-content">while you sleep.</span>
                </h1>
                <p className="mt-1 text-body-md text-content-tertiary">
                  Everything scheduled, everything that ran, and anything
                  waiting on you.
                </p>
              </div>
              <button
                type="button"
                className="gloss flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-label-md font-medium text-on-fill"
              >
                <Plus size={16} strokeWidth={1.8} />
                New schedule
              </button>
            </header>

            <div className="mb-10 grid grid-cols-3 gap-3 max-md:grid-cols-1">
              <div className="rounded-8 border border-subtle p-4">
                <p className="text-heading-lg font-semibold text-content tabular-nums">
                  {active}
                </p>
                <p className="mt-0.5 text-body-sm text-content-tertiary">
                  active routines
                </p>
              </div>
              <div className="rounded-8 border border-subtle p-4">
                <p className="text-heading-lg font-semibold text-content tabular-nums">
                  {runs.length}
                </p>
                <p className="mt-0.5 text-body-sm text-content-tertiary">
                  runs in the last 14 days
                </p>
              </div>
              <div className="rounded-8 border border-subtle bg-warn-surface p-4">
                <p className="text-heading-lg font-semibold text-warn tabular-nums">
                  {needsApproval}
                </p>
                <p className="mt-0.5 text-body-sm text-warn">
                  waiting for your approval
                </p>
              </div>
            </div>

            <h2 className="mb-3 text-label-md font-medium tracking-wide text-content-tertiary">
              UP NEXT
            </h2>
            <div className="mb-10 overflow-hidden rounded-8 border border-subtle">
              {routines
                .filter((r) => r.status === "active")
                .map((r, i) => (
                  <div
                    key={r.id}
                    className={`flex items-center gap-4 px-4 py-3.5 ${
                      i > 0 ? "border-t border-subtle" : ""
                    }`}
                  >
                    <span className="min-w-0 flex-1 truncate text-body-md font-medium text-content">
                      {r.name}
                    </span>
                    <span className="text-body-sm text-content-secondary">
                      {r.schedule}
                    </span>
                    <StatusPill kind="ok">on</StatusPill>
                  </div>
                ))}
            </div>

            <h2 className="mb-3 text-label-md font-medium tracking-wide text-content-tertiary">
              RECENT RUNS
            </h2>
            <div className="overflow-hidden rounded-8 border border-subtle">
              {runs.map((run, i) => {
                const s = RUN_STATUS[run.status];
                const row = (
                  <>
                    <span className="min-w-0 flex-1 truncate text-body-md text-content">
                      {run.routineName}
                    </span>
                    <span className="hidden text-body-sm text-content-tertiary md:block">
                      {run.started}
                    </span>
                    <span className="hidden text-body-sm text-content-tertiary tabular-nums sm:block">
                      {run.stepsDone}/{run.stepsTotal} steps · {run.duration}
                    </span>
                    <StatusPill kind={s.kind}>{s.label}</StatusPill>
                  </>
                );
                const cls = `flex items-center gap-4 px-4 py-3.5 ${
                  i > 0 ? "border-t border-subtle" : ""
                }`;
                return run.status === "needs-approval" ? (
                  <Link
                    key={run.id}
                    href="/runs/current"
                    className={`${cls} bg-warn-surface/40 hover:bg-warn-surface/70`}
                  >
                    {row}
                    <ChevronRight size={16} className="shrink-0 text-content-tertiary" />
                  </Link>
                ) : (
                  <div key={run.id} className={cls}>
                    {row}
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        <Dock />
      </Canvas>
    </Shell>
  );
}
