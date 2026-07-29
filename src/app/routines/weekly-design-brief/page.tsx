import Link from "next/link";
import { ArrowLeft, Play, CalendarClock, Workflow } from "lucide-react";
import { Shell, Canvas, MenuBar, Dock } from "@/components/shell";
import { StatusPill } from "@/components/ui";
import { weeklyDesignBrief } from "@/lib/data";
import { StepEditor } from "./step-editor";

export default function RoutineBuilderPage() {
  const r = weeklyDesignBrief;
  return (
    <Shell>
      <Canvas>
        <MenuBar />

        <div className="z-10 mx-auto -mt-1 flex h-11 w-fit items-center gap-2 rounded-full bg-white/60 px-2 shadow-toolbar backdrop-blur-sm">
          <Link
            href="/routines"
            aria-label="Back to routines"
            className="flex h-7 w-7 items-center justify-center rounded-full"
          >
            <ArrowLeft size={16} strokeWidth={1.8} className="text-content-secondary" />
          </Link>
          <span className="flex h-8 items-center gap-1.5 rounded-full bg-accent-tint px-3 text-label-md font-medium text-accent">
            <Workflow size={14} strokeWidth={1.8} />
            {r.name}
          </span>
          <Link
            href="/runs/current"
            className="flex h-8 items-center gap-1.5 rounded-full bg-inverse px-3 text-label-md font-medium text-on-fill"
          >
            <Play size={14} strokeWidth={1.8} />
            Run now
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24 pt-2">
          <article className="mx-auto w-full max-w-3xl rounded-11 bg-raised px-14 pb-16 pt-12 max-md:px-6">
            <header className="mb-8">
              <h1 className="text-heading-md font-semibold text-content">
                {r.name}
              </h1>
              <p className="mt-2 max-w-xl text-body-md text-content-secondary">
                {r.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <StatusPill kind="accent">
                  <CalendarClock size={12} strokeWidth={1.8} />
                  {r.schedule}
                </StatusPill>
                <StatusPill kind="ok">active</StatusPill>
                <span className="text-body-sm text-content-tertiary">
                  Last run {r.lastRun}
                </span>
              </div>
            </header>

            <h2 className="mb-4 text-label-md font-medium tracking-wide text-content-tertiary">
              STEPS — EDIT ANY OF THESE
            </h2>
            <StepEditor steps={r.steps} />

            <p className="mt-8 rounded-8 bg-canvas px-4 py-3 text-body-sm text-content-secondary">
              Steps marked <span className="font-medium text-content">“Ask first”</span> pause
              the run and wait for your approval before touching anything
              outward-facing — publishing, posting, sending.
            </p>
          </article>
        </div>

        <Dock />
      </Canvas>
    </Shell>
  );
}
