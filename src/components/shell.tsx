"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  MessageSquare,
  Workflow,
  CalendarClock,
  Plug,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { connectors } from "@/lib/data";
import { Monogram } from "@/components/ui";

/* ------------------------------------------------------------------ */
/* 48px icon-only side rail — identical on every screen                */
/* ------------------------------------------------------------------ */

const NAV: { href: string; icon: LucideIcon; label: string }[] = [
  { href: "/", icon: MessageSquare, label: "Agent" },
  { href: "/routines", icon: Workflow, label: "Routines" },
  { href: "/dispatch", icon: CalendarClock, label: "Dispatch" },
  { href: "/connectors", icon: Plug, label: "Connections" },
];

export function Rail() {
  const pathname = usePathname();
  return (
    <nav className="flex h-full w-12 shrink-0 flex-col border-r border-subtle bg-white/95 px-2 py-1">
      {/* logo */}
      <div className="flex h-10 items-center justify-center">
        <span
          aria-hidden
          className="block h-5 w-5 rounded-full"
          style={{ background: "linear-gradient(180deg,#a56eff,#6929c4)" }}
        />
      </div>

      {/* platform switcher */}
      <button
        type="button"
        aria-label="Switch platform"
        className="mt-3 flex h-[34px] w-8 items-center justify-center gap-0.5 rounded-6 border border-default bg-raised shadow-xs"
      >
        <span
          aria-hidden
          className="block h-[18px] w-[18px] rounded-full"
          style={{ background: "linear-gradient(180deg,#0073d7,#009dff)" }}
        />
      </button>

      {/* nav items */}
      <div className="mt-3 flex flex-col gap-0.5">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              className={`flex h-8 w-8 items-center justify-center rounded-6 ${
                active ? "bg-canvas" : "hover:bg-canvas"
              }`}
            >
              <Icon
                size={16}
                strokeWidth={1.8}
                className={active ? "text-content" : "text-content-secondary"}
              />
            </Link>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center">
        <ChevronDown size={12} className="text-content-tertiary" />
      </div>

      <div className="mt-auto">
        <div className="mx-auto mb-2 h-px w-8 rounded-full bg-subtle" />
        <div className="flex justify-center pb-2">
          <span
            aria-label="Profile"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-subtle bg-accent-tint text-label-sm font-medium text-accent"
          >
            A
          </span>
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Aside canvas — the "computer screen": wallpaper, menubar, dock      */
/* ------------------------------------------------------------------ */

export function Canvas({
  children,
  wallpaper = true,
}: {
  children: ReactNode;
  wallpaper?: boolean;
}) {
  return (
    <div className="relative h-full min-w-0 flex-1 bg-canvas p-4">
      <div
        className="relative flex h-full flex-col gap-3 overflow-hidden rounded-8"
        style={
          wallpaper
            ? {
                backgroundImage: "url(/wallpaper.svg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { background: "var(--surface-canvas)" }
        }
      >
        {children}
      </div>
    </div>
  );
}

export function MenuBar({ title }: { title?: string }) {
  return (
    <div className="z-10 mx-3 mt-3 flex h-11 shrink-0 items-center rounded-full bg-white/60 pl-4 pr-1.5 backdrop-blur-sm">
      <span aria-hidden className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </span>
      {title ? (
        <span className="ml-4 text-label-sm font-medium text-content">
          {title}
        </span>
      ) : null}
      <span className="ml-auto mr-2.5 flex items-center gap-4 text-label-sm font-medium text-content">
        <span>Mon 28 July</span>
        <span>8:34 AM</span>
      </span>
    </div>
  );
}

/* Floating dock of connected tools, bottom-center of the canvas */
export function Dock({ activeId }: { activeId?: string }) {
  const docked = connectors.filter((c) => c.connected);
  return (
    <div className="pointer-events-auto absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
      <div className="flex items-center gap-2.5 rounded-full bg-white/25 p-2 shadow-dock backdrop-blur-md">
        {docked.map((c) => (
          <div key={c.id} className="flex flex-col items-center gap-1">
            <span
              title={c.name}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-xs"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.icon} alt={c.name} width={20} height={20} />
            </span>
            <span
              aria-hidden
              className={`h-1 w-3 rounded-full ${
                c.id === activeId ? "bg-white" : "bg-transparent"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page shell: rail + optional chat column + canvas                    */
/* ------------------------------------------------------------------ */

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-surface">
      <Rail />
      {children}
    </div>
  );
}

export function ChatColumn({ children }: { children: ReactNode }) {
  return (
    <section className="flex h-full w-[520px] shrink-0 flex-col border-r border-subtle px-4 max-lg:w-[400px]">
      {children}
    </section>
  );
}

/* Small connector row used in glass windows (App-Store pattern) */
export function GlassAppRow({
  name,
  monogram,
  brand,
  connected,
}: {
  name: string;
  monogram: string;
  brand: string;
  connected: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-[23px] bg-white/20 p-2 backdrop-blur-xl">
      <span className="flex h-10 w-10 items-center justify-center rounded-8 bg-white/20 backdrop-blur-xl">
        <Monogram letter={monogram} brand={brand} size={24} radius={4} />
      </span>
      <span className="flex-1 truncate text-label-sm font-medium text-white">
        {name}
      </span>
      {connected ? (
        <span className="rounded-5 bg-white px-2 py-1 text-label-xs font-medium text-content">
          Open
        </span>
      ) : (
        <button
          type="button"
          className="rounded-5 bg-black/20 px-2 py-1 text-label-xs font-medium text-white backdrop-blur-xl"
        >
          Connect
        </button>
      )}
    </div>
  );
}
