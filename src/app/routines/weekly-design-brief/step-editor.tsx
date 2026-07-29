"use client";

import { useState } from "react";
import { GripVertical, ShieldCheck } from "lucide-react";
import { Monogram } from "@/components/ui";
import { connectorById, type RoutineStep } from "@/lib/data";

export function StepEditor({ steps }: { steps: RoutineStep[] }) {
  const [asks, setAsks] = useState<Record<string, boolean>>(
    Object.fromEntries(steps.map((s) => [s.id, s.needsApproval]))
  );

  return (
    <ol className="relative flex flex-col gap-3">
      {/* connecting line */}
      <span
        aria-hidden
        className="absolute bottom-6 left-[19px] top-6 w-px bg-subtle"
      />
      {steps.map((s, i) => {
        const c = connectorById(s.connectorId);
        const ask = asks[s.id];
        return (
          <li
            key={s.id}
            className="relative flex gap-3 rounded-8 border border-subtle bg-raised p-4 shadow-xs"
          >
            <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas ring-4 ring-raised">
              <Monogram letter={c.monogram} brand={c.brand} size={24} radius={6} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-label-sm font-medium text-content-tertiary">
                  {i + 1}
                </span>
                <h3 className="truncate text-body-md font-medium text-content">
                  {s.title}
                </h3>
              </div>
              <p className="mt-0.5 text-body-sm text-content-secondary">
                {s.detail}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-chip px-2 py-0.5 text-label-sm text-content-secondary">
                  {c.name}
                </span>
                <span className="rounded-full bg-chip px-2 py-0.5 text-label-sm text-content-secondary">
                  → {s.output}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end justify-between gap-2">
              <GripVertical
                size={16}
                className="cursor-grab text-content-tertiary"
                aria-hidden
              />
              <button
                type="button"
                role="switch"
                aria-checked={ask}
                onClick={() => setAsks((a) => ({ ...a, [s.id]: !a[s.id] }))}
                className={`flex h-7 items-center gap-1.5 rounded-full px-2.5 text-label-sm font-medium ${
                  ask
                    ? "bg-accent-tint text-accent"
                    : "bg-fill-secondary text-content-tertiary"
                }`}
              >
                <ShieldCheck size={13} strokeWidth={1.8} />
                {ask ? "Ask first" : "Runs solo"}
              </button>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
