import Link from "next/link";
import { Plus, Play, ChevronRight, ListTree, Download } from "lucide-react";
import { Shell, Canvas, MenuBar, Dock } from "@/components/shell";
import { Monogram, StatusPill } from "@/components/ui";
import { routines, templates, connectorById } from "@/lib/data";

function ConnectorStack({ ids }: { ids: string[] }) {
  return (
    <span className="flex items-center -space-x-1.5">
      {ids.map((id) => {
        const c = connectorById(id);
        return (
          <span key={id} className="rounded-5 ring-2 ring-raised" title={c.name}>
            <Monogram letter={c.monogram} brand={c.brand} size={20} radius={5} />
          </span>
        );
      })}
    </span>
  );
}

export default function RoutinesPage() {
  return (
    <Shell>
      <Canvas>
        <MenuBar />

        {/* floating toolbar, Document_1 pattern */}
        <div className="z-10 mx-auto -mt-1 flex h-11 w-fit items-center gap-3 rounded-full bg-white/60 px-2 shadow-toolbar backdrop-blur-sm">
          <span className="flex h-8 items-center gap-1.5 rounded-full bg-accent-tint px-3 text-label-md font-medium text-accent">
            <ListTree size={14} strokeWidth={1.8} />
            Routines
          </span>
          <button
            type="button"
            aria-label="Export"
            className="flex h-7 w-7 items-center justify-center rounded-full"
          >
            <Download size={16} strokeWidth={1.8} className="text-content-secondary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24 pt-2">
          <article className="mx-auto w-full max-w-5xl rounded-11 bg-raised px-14 pb-16 pt-12 max-md:px-6">
            <header className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-heading-md font-semibold text-content">
                  Routines
                </h1>
                <p className="mt-1 text-body-md text-content-tertiary">
                  Describe a routine once. It becomes editable steps that run on
                  a schedule — and ask before doing anything risky.
                </p>
              </div>
              <button
                type="button"
                className="flex h-8 shrink-0 items-center gap-1.5 rounded-6 bg-inverse px-2.5 text-label-md font-medium text-on-fill"
              >
                <Plus size={16} strokeWidth={1.8} />
                New routine
              </button>
            </header>

            <h2 className="mb-3 text-label-md font-medium tracking-wide text-content-tertiary">
              YOUR ROUTINES
            </h2>
            <div className="mb-10 overflow-hidden rounded-8 border border-subtle">
              {routines.map((r, i) => (
                <Link
                  key={r.id}
                  href={r.id === "weekly-design-brief" ? "/routines/weekly-design-brief" : "/routines"}
                  className={`flex items-center gap-4 bg-raised px-4 py-3.5 hover:bg-canvas ${
                    i > 0 ? "border-t border-subtle" : ""
                  }`}
                >
                  <ConnectorStack ids={r.connectorIds} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-body-md font-medium text-content">
                      {r.name}
                    </span>
                    <span className="block truncate text-body-sm text-content-tertiary">
                      {r.description}
                    </span>
                  </span>
                  <span className="hidden text-body-sm text-content-secondary md:block">
                    {r.schedule}
                  </span>
                  <StatusPill kind={r.status === "active" ? "ok" : "neutral"}>
                    {r.status}
                  </StatusPill>
                  <ChevronRight size={16} className="shrink-0 text-content-tertiary" />
                </Link>
              ))}
            </div>

            <h2 className="mb-3 text-label-md font-medium tracking-wide text-content-tertiary">
              READY-MADE
            </h2>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {templates.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-3 rounded-8 border border-subtle bg-raised p-4 hover:shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <ConnectorStack ids={t.connectorIds} />
                    {t.popular ? (
                      <StatusPill kind="accent">Popular</StatusPill>
                    ) : (
                      <span className="text-label-xs text-content-tertiary">
                        {t.category}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-body-md font-medium text-content">
                      {t.name}
                    </h3>
                    <p className="mt-0.5 text-body-sm text-content-tertiary">
                      {t.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex h-8 w-fit items-center gap-1.5 rounded-6 bg-fill-secondary px-2.5 text-label-md font-medium text-content"
                  >
                    <Play size={14} strokeWidth={1.8} />
                    Use routine
                  </button>
                </div>
              ))}
            </div>
          </article>
        </div>

        <Dock />
      </Canvas>
    </Shell>
  );
}
