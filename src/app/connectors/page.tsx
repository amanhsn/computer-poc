import { Plug } from "lucide-react";
import { Shell, Canvas, MenuBar, Dock } from "@/components/shell";
import { Monogram, StatusPill } from "@/components/ui";
import { connectors } from "@/lib/data";

export default function ConnectorsPage() {
  const connected = connectors.filter((c) => c.connected).length;
  return (
    <Shell>
      <Canvas>
        <MenuBar />

        <div className="z-10 mx-auto -mt-1 flex h-11 w-fit items-center gap-2 rounded-full bg-white/60 px-2 shadow-toolbar backdrop-blur-sm">
          <span className="flex h-8 items-center gap-1.5 rounded-full bg-accent-tint px-3 text-label-md font-medium text-accent">
            <Plug size={14} strokeWidth={1.8} />
            Connections
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24 pt-2">
          <article className="mx-auto w-full max-w-4xl rounded-11 bg-raised px-14 pb-16 pt-12 max-md:px-6">
            <header className="mb-8">
              <h1 className="text-heading-md font-semibold">
                <span className="text-content-tertiary">Your tools, </span>
                <span className="text-content">run for you.</span>
              </h1>
              <p className="mt-1 max-w-xl text-body-md text-content-tertiary">
                Every connection you approve becomes something your agent can
                do — {connected} connected, {connectors.length - connected} more
                available.
              </p>
            </header>

            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              {connectors.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-8 border border-subtle bg-raised p-4"
                >
                  <Monogram letter={c.monogram} brand={c.brand} size={36} radius={9} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-body-md font-medium text-content">
                      {c.name}
                    </span>
                    <span className="block text-body-sm text-content-tertiary">
                      {c.actions} actions your agent can use
                    </span>
                  </span>
                  {c.connected ? (
                    <StatusPill kind="ok">Connected</StatusPill>
                  ) : (
                    <button
                      type="button"
                      className="gloss flex h-8 items-center rounded-full px-3 text-label-md font-medium text-on-fill"
                    >
                      Connect
                    </button>
                  )}
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
