"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import {
  LayoutGrid,
  Plus,
  Mic,
  X,
  History,
  Check,
  Loader2,
  Clock,
  GripHorizontal,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  Pause,
  SkipForward,
  ListTodo,
  ChevronRight,
  Trash2,
  Pin,
  Zap,
  CreditCard,
} from "lucide-react";
import {
  workers,
  APP_KINDS,
  DEFAULT_TITLES,
  type WorkerAgent,
  type WorkerTask,
  type WorkerWindow,
} from "@/lib/workers";
import { connectors, connectorById } from "@/lib/data";
import { AppWindow } from "./app-windows";
import { Welcome } from "./welcome";

function TaskIcon({ status, dark = true }: { status: WorkerTask["status"]; dark?: boolean }) {
  if (status === "done")
    return (
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${dark ? "bg-[#26d489]/25" : "bg-ok-surface"}`}>
        <Check size={10} strokeWidth={2.6} className={dark ? "text-[#26d489]" : "text-ok"} />
      </span>
    );
  if (status === "running")
    return <Loader2 size={15} className={`shrink-0 animate-spin ${dark ? "text-white" : "text-accent"}`} strokeWidth={2} />;
  return <Clock size={15} className={`shrink-0 ${dark ? "text-white/50" : "text-content-tertiary"}`} strokeWidth={1.8} />;
}

function Avatar({ w, size, ring = false }: { w: WorkerAgent; size: number; ring?: boolean }) {
  return (
    <img
      src={w.avatar}
      alt={w.name}
      width={size}
      height={size}
      className={`shrink-0 rounded-full object-cover ${ring ? "ring-[3px] ring-white shadow-dock" : ""}`}
      style={{ width: size, height: size }}
    />
  );
}

const GOOGLE_APPS = ["google-docs", "google-sheets", "google-slides", "gmail", "drive", "google-calendar"];

/* wallpaper library — Tahoe-family abstracts, plus the originals */
const WALLPAPERS = [
  { src: "/wallpapers/iridescence.svg", label: "Iridescence" },
  { src: "/wallpapers/motion-blue.svg", label: "Motion Blue" },
  { src: "/wallpapers/motion-purple.svg", label: "Motion Purple" },
  { src: "/wallpapers/dome.svg", label: "Dome" },
  { src: "/wallpapers/valley.svg", label: "Valley" },
  { src: "/wallpapers/grid-magenta.svg", label: "Grid Magenta" },
  { src: "/wallpaper-hero.jpg", label: "Hills" },
  { src: "/wallpaper.svg", label: "Bloom" },
  { src: "/wallpaper-dawn.svg", label: "Dawn" },
  { src: "/wallpaper-dusk.svg", label: "Dusk" },
];

export function DesktopExperience() {
  const [workerId, setWorkerId] = useState(workers[0].id);
  const worker = workers.find((w) => w.id === workerId)!;

  const [closed, setClosed] = useState<string[]>([]);
  const [added, setAdded] = useState<WorkerWindow[]>([]);
  const open = [
    ...worker.windows.filter((w) => !closed.includes(w.id)),
    ...added.filter((w) => !closed.includes(w.id)),
  ];

  const [focusedId, setFocusedId] = useState(worker.windows[0].id);
  const [overview, setOverview] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [workersOpen, setWorkersOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [controlOpen, setControlOpen] = useState(false);
  const [railHidden, setRailHidden] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [model, setModel] = useState<"Flash" | "Pro" | "Ultra">("Ultra");
  const [wallpaperOverride, setWallpaperOverride] = useState<string | null>(null);
  const [clock, setClock] = useState("");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const wheelLock = useRef(false);
  const wheelAcc = useRef(0);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" }) +
          "   " +
          new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      );
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (open.length && !open.some((w) => w.id === focusedId)) setFocusedId(open[0].id);
  }, [open, focusedId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setChatOpen(false);
        setWorkersOpen(false);
        setOverview(false);
        setLibraryOpen(false);
        setControlOpen(false);
        setHistoryOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const switchWorker = (id: string) => {
    const next = workers.find((w) => w.id === id)!;
    setWorkerId(id);
    setClosed([]);
    setAdded([]);
    setFocusedId(next.windows[0].id);
    setOverview(false);
    setMaximized(false);
    setWorkersOpen(false);
    setChatOpen(false);
    setLibraryOpen(false);
    setHistoryOpen(false);
  };

  const openApp = (connectorId: string) => {
    const existing = open.find((w) => w.connectorId === connectorId);
    if (existing) {
      setFocusedId(existing.id);
    } else {
      const kind = APP_KINDS[connectorId];
      if (!kind) return;
      const win: WorkerWindow = {
        id: `${workerId}-${connectorId}-${added.length}`,
        connectorId,
        kind,
        title: DEFAULT_TITLES[kind],
      };
      setAdded((a) => [...a, win]);
      setFocusedId(win.id);
    }
    setLibraryOpen(false);
    setOverview(false);
  };

  const focused = open.find((w) => w.id === focusedId) ?? open[0];
  const peeks = open.filter((w) => w.id !== focused?.id);
  const doneCount = worker.tasks.filter((t) => t.status === "done").length;
  const runningTask = worker.tasks.find((t) => t.status === "running");

  const enterOverview = () => {
    const idx = open.findIndex((w) => w.id === focused?.id);
    setCarouselIdx(idx < 0 ? 0 : idx);
    setOverview(true);
  };

  const onCarouselWheel = (e: React.WheelEvent) => {
    if (wheelLock.current) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    wheelAcc.current += d;
    if (Math.abs(wheelAcc.current) > 60) {
      const dir = wheelAcc.current > 0 ? 1 : -1;
      setCarouselIdx((i) => Math.min(open.length - 1, Math.max(0, i + dir)));
      wheelAcc.current = 0;
      wheelLock.current = true;
      setTimeout(() => {
        wheelLock.current = false;
      }, 400);
    }
  };

  useEffect(() => {
    if (!overview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setCarouselIdx((i) => Math.min(open.length - 1, i + 1));
      if (e.key === "ArrowLeft") setCarouselIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overview, open.length]);

  return (
    <div
      className="desktop-cursor relative h-full min-w-0 flex-1 overflow-hidden"
      style={{
        backgroundImage: `url(${wallpaperOverride ?? worker.wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Welcome wallpaper={wallpaperOverride ?? worker.wallpaper} />

      {/* ---- top app dock: open apps · library · overview ---- */}
      <div className="absolute inset-x-0 top-3 z-30 flex justify-center">
        <div className="lg flex items-center gap-1.5 rounded-full p-1.5">
          {open.map((w) => {
            const c = connectorById(w.connectorId);
            return (
              <div key={w.id} className="flex flex-col items-center">
                <button
                  type="button"
                  title={w.title}
                  onClick={() => {
                    setFocusedId(w.id);
                    setOverview(false);
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                    w.id === focused?.id && !overview
                      ? "bg-white shadow-xs"
                      : "hover:bg-white/70"
                  }`}
                >
                  <img src={c.icon} alt={c.name} width={20} height={20} />
                </button>
                <span
                  aria-hidden
                  className={`-mb-1 mt-0.5 h-1 w-1 rounded-full ${
                    w.id === focused?.id && !overview ? "bg-content/60" : "bg-transparent"
                  }`}
                />
              </div>
            );
          })}
          <span className="mx-1 h-5 w-px bg-content/15" />
          <button
            type="button"
            title="All windows"
            aria-pressed={overview}
            onClick={() => (overview ? setOverview(false) : enterOverview())}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              overview ? "bg-white shadow-xs" : "hover:bg-white/70"
            }`}
          >
            <LayoutGrid size={16} strokeWidth={1.8} className="text-content-secondary" />
          </button>
          <button
            type="button"
            title="App library"
            onClick={() => setLibraryOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/70"
          >
            <Plus size={16} strokeWidth={1.8} className="text-content-secondary" />
          </button>
        </div>
      </div>

      {/* workflow toggle + control center + clock */}
      <div className="absolute right-4 top-3 z-30 flex items-center gap-2">
        <button
          type="button"
          aria-label="Toggle workflow panel"
          aria-pressed={!railHidden}
          onClick={() => setRailHidden((h) => !h)}
          className={`lg flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            !railHidden ? "!bg-white/90" : ""
          }`}
        >
          <ListTodo size={16} strokeWidth={1.8} className="text-content" />
        </button>
        <button
          type="button"
          aria-label="Control Center"
          aria-pressed={controlOpen}
          onClick={() => setControlOpen((o) => !o)}
          className={`lg flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            controlOpen ? "!bg-white/90" : ""
          }`}
        >
          <SlidersHorizontal size={16} strokeWidth={1.8} className="text-content" />
        </button>
        <div className="lg flex h-11 items-center rounded-full px-4">
          <span className="whitespace-pre text-label-sm font-medium text-content">{clock}</span>
        </div>
      </div>

      {/* ---- control center ---- */}
      {controlOpen && (
        <>
          <button
            type="button"
            aria-label="Close Control Center"
            className="absolute inset-0 z-30 cursor-default"
            onClick={() => setControlOpen(false)}
          />
          <div className="lg absolute right-4 top-16 z-40 w-[340px] rounded-11 p-3">
            <div className="grid grid-cols-2 gap-2">
              {/* quick apps — toggle between what's open, jump to the library */}
              <div className="col-span-2 rounded-8 bg-white/55 p-3 shadow-xs">
                <p className="mb-2 text-label-sm font-medium text-content">Quick apps</p>
                <div className="flex items-center gap-2">
                  {open.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      title={w.title}
                      onClick={() => {
                        setFocusedId(w.id);
                        setOverview(false);
                        setControlOpen(false);
                      }}
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-xs transition-transform hover:scale-110 ${
                        w.id === focused?.id ? "ring-2 ring-accent/50" : ""
                      }`}
                    >
                      <img src={connectorById(w.connectorId).icon} alt="" width={20} height={20} />
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-label="Open app library"
                    onClick={() => {
                      setControlOpen(false);
                      setLibraryOpen(true);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 shadow-xs"
                  >
                    <Plus size={16} strokeWidth={1.8} className="text-content-secondary" />
                  </button>
                </div>
              </div>

              {/* now running — the agent's "now playing" */}
              <div className="flex flex-col justify-between rounded-8 bg-white/55 p-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <Avatar w={worker} size={28} />
                  <span className="min-w-0">
                    <span className="block truncate text-label-sm font-medium leading-4 text-content">
                      {worker.routine}
                    </span>
                    <span className="block text-label-xs text-content-secondary">
                      {worker.name} · step {doneCount + 1} of {worker.tasks.length}
                    </span>
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-center gap-4">
                  <button type="button" aria-label="Pause worker" className="text-content">
                    <Pause size={18} strokeWidth={2} />
                  </button>
                  <button type="button" aria-label="Skip step" className="text-content-secondary">
                    <SkipForward size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* model toggle */}
              <div className="rounded-8 bg-white/55 p-3 shadow-xs">
                <p className="mb-2 flex items-center gap-1.5 text-label-sm font-medium text-content">
                  <Zap size={13} strokeWidth={2} className="text-accent" />
                  Model
                </p>
                <div className="flex rounded-full bg-white/60 p-0.5">
                  {(["Flash", "Pro", "Ultra"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setModel(m)}
                      aria-pressed={model === m}
                      className={`flex-1 rounded-full py-1 text-label-xs font-medium transition-colors ${
                        model === m ? "bg-white text-content shadow-xs" : "text-content-secondary"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* approvals toggle */}
              <div className="flex items-center gap-2.5 rounded-8 bg-white/55 p-2.5 shadow-xs">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-tint">
                  <ShieldCheck size={15} strokeWidth={2} className="text-accent" />
                </span>
                <span className="min-w-0">
                  <span className="block text-label-sm font-medium leading-4 text-content">
                    Ask first
                  </span>
                  <span className="block text-label-xs text-content-secondary">
                    On for risky steps
                  </span>
                </span>
              </div>

              {/* billing */}
              <div className="flex items-center gap-2.5 rounded-8 bg-white/55 p-2.5 shadow-xs">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                  <CreditCard size={15} strokeWidth={2} className="text-content" />
                </span>
                <span className="min-w-0">
                  <span className="block text-label-sm font-medium leading-4 text-content">
                    2,400 credits
                  </span>
                  <span className="block text-label-xs text-content-secondary">
                    Manage billing
                  </span>
                </span>
              </div>

              {/* wallpaper library */}
              <div className="col-span-2 rounded-8 bg-white/55 p-3 shadow-xs">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-label-sm font-medium text-content">Wallpaper</p>
                  <span className="text-label-xs text-content-tertiary">
                    {WALLPAPERS.length} in library
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {WALLPAPERS.map((bg) => {
                    const active = (wallpaperOverride ?? worker.wallpaper) === bg.src;
                    return (
                      <button
                        key={bg.src}
                        type="button"
                        title={bg.label}
                        aria-pressed={active}
                        onClick={() => setWallpaperOverride(bg.src)}
                        className={`aspect-[16/10] rounded-4 bg-cover bg-center shadow-xs transition-transform hover:scale-105 ${
                          active ? "ring-2 ring-accent/70" : "ring-1 ring-white/60"
                        }`}
                        style={{ backgroundImage: `url(${bg.src})` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ---- worklist (right): teaching-mode steps with hints ---- */}
      <div
        onWheel={(e) => {
          if (e.deltaX > 40) setRailHidden(true);
        }}
        className={`absolute bottom-24 right-4 top-16 z-[35] flex w-[248px] flex-col transition-all duration-300 ${
          overview || railHidden ? "pointer-events-none translate-x-12 opacity-0" : ""
        }`}
      >
        {/* header */}
        <div className="flex shrink-0 items-center justify-between pb-1.5">
          <button
            type="button"
            aria-label="Hide worklist"
            onClick={() => setRailHidden(true)}
            className="lg flex h-7 w-7 items-center justify-center rounded-full"
          >
            <ChevronRight size={14} strokeWidth={1.8} className="text-content-secondary" />
          </button>
          <button
            type="button"
            className="lg flex h-7 items-center gap-1.5 rounded-full px-2.5 text-label-xs font-medium text-content"
          >
            <Trash2 size={12} strokeWidth={1.8} />
            Reset Worklist
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pb-1 pr-0.5">
          {/* general hints */}
          <div className="lg shrink-0 rounded-5 px-2.5 py-2">
            <p className="text-label-xs font-semibold text-content">General hints:</p>
            <p className="mt-0.5 text-[10px] leading-[14px] text-content-secondary">
              {worker.role_hint}
            </p>
          </div>

          {/* steps */}
          {worker.tasks.map((t, i) => (
            <div
              key={t.title}
              className={`lg shrink-0 rounded-5 px-2.5 py-2 ${
                t.status === "running" ? "ring-[1.5px] ring-accent/55" : ""
              }`}
            >
              <div className="flex items-start gap-1.5">
                <span className="mt-[1px] shrink-0">
                  <TaskIcon status={t.status} dark={false} />
                </span>
                <span
                  className={`min-w-0 flex-1 text-label-xs font-semibold leading-[15px] ${
                    t.status === "queued" ? "text-content-secondary" : "text-content"
                  }`}
                >
                  {i + 1}. {t.title}
                </span>
                <Pin size={11} strokeWidth={1.8} className="mt-[2px] shrink-0 text-content-tertiary" />
              </div>
              {t.hints?.length ? (
                <ul className="mt-1 flex flex-col gap-[3px] pl-[22px]">
                  {t.hints.map((h) => (
                    <li
                      key={h}
                      className="relative text-[10px] leading-[14px] text-content-secondary before:absolute before:-left-2 before:top-[5px] before:h-[3px] before:w-[3px] before:rounded-full before:bg-current before:opacity-60"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* ---- window stage ---- */}
      {!overview ? (
        <div className="absolute bottom-24 left-4 right-4 top-16">
          {focused && (
            <div
              className={`absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                maximized ? "h-full w-full" : "h-[92%] w-[72%] max-lg:w-[92%]"
              }`}
            >
              <AppWindow
                win={focused}
                onMinimize={enterOverview}
                onMaximize={() => setMaximized((m) => !m)}
                onClose={() => setClosed((c) => [...c, focused.id])}
              />
            </div>
          )}
          {!maximized && peeks[0] && (
            <div
              role="button"
              tabIndex={0}
              aria-label={`Focus ${peeks[0].title}`}
              onClick={() => setFocusedId(peeks[0].id)}
              onKeyDown={(e) => e.key === "Enter" && setFocusedId(peeks[0].id)}
              className="absolute left-0 top-1/2 z-10 h-[74%] w-[26%] -translate-x-[60%] -translate-y-1/2 text-left opacity-95 transition-all duration-500 hover:-translate-x-[48%] max-lg:hidden"
            >
              <span className="pointer-events-none block h-full">
                <AppWindow win={peeks[0]} chromeless />
              </span>
            </div>
          )}
          {!maximized && peeks[1] && (
            <div
              role="button"
              tabIndex={0}
              aria-label={`Focus ${peeks[1].title}`}
              onClick={() => setFocusedId(peeks[1].id)}
              onKeyDown={(e) => e.key === "Enter" && setFocusedId(peeks[1].id)}
              className="absolute right-0 top-1/2 z-10 h-[74%] w-[26%] translate-x-[60%] -translate-y-1/2 text-left opacity-95 transition-all duration-500 hover:translate-x-[48%] max-lg:hidden"
            >
              <span className="pointer-events-none block h-full">
                <AppWindow win={peeks[1]} chromeless />
              </span>
            </div>
          )}
        </div>
      ) : (
        /* app switcher: centered, elevated, swipe or click to bring forward */
        <div
          className="absolute inset-x-0 bottom-24 top-16 z-10"
          onWheel={onCarouselWheel}
        >
          {open.map((w, i) => {
            const off = i - carouselIdx;
            const hidden = Math.abs(off) > 1;
            const center = off === 0;
            return (
              <div
                key={w.id}
                className="absolute left-1/2 top-1/2 h-[76%] w-[560px] max-w-[38vw] transition-all duration-500 ease-out"
                style={{
                  transform: `translate(-50%, -54%) translateX(${off * 108}%) scale(${center ? 1 : 0.8})`,
                  zIndex: center ? 30 : 20,
                  opacity: hidden ? 0 : center ? 1 : 0.8,
                  pointerEvents: hidden ? "none" : "auto",
                  filter: center
                    ? "drop-shadow(0 28px 56px rgba(0,0,0,0.3))"
                    : "saturate(0.9)",
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={center ? `Open ${w.title}` : `Bring ${w.title} forward`}
                  onClick={() => {
                    if (center) {
                      setFocusedId(w.id);
                      setOverview(false);
                    } else {
                      setCarouselIdx(i);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    if (center) {
                      setFocusedId(w.id);
                      setOverview(false);
                    } else {
                      setCarouselIdx(i);
                    }
                  }}
                  className="block h-full w-full cursor-pointer text-left"
                >
                  <span className="pointer-events-none block h-full">
                    <AppWindow win={w} chromeless />
                  </span>
                </div>
                {center && (
                  <span className="lg absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5">
                    <img src={connectorById(w.connectorId).icon} alt="" width={14} height={14} />
                    <span className="whitespace-nowrap text-label-sm font-medium text-content">
                      {w.title}
                    </span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* bottom-left: workspace + history */}
      <div className="absolute bottom-5 left-5 z-30 flex items-center gap-2">
        <span className="lg flex h-9 items-center gap-2 rounded-full pl-1.5 pr-3">
          <Avatar w={worker} size={24} />
          <span className="text-label-sm font-medium text-content">
            {worker.name}&apos;s workspace
          </span>
        </span>
        <div className="relative">
          <button
            type="button"
            aria-expanded={historyOpen}
            onClick={() => setHistoryOpen((o) => !o)}
            className={`lg flex h-9 items-center gap-1.5 rounded-full px-3 ${
              historyOpen ? "!bg-white/90" : ""
            }`}
          >
            <History size={14} strokeWidth={1.8} className="text-content-secondary" />
            <span className="text-label-sm font-medium text-content">History</span>
          </button>

          {historyOpen && (
            <>
              <button
                type="button"
                aria-label="Close history"
                className="fixed inset-0 z-[38] cursor-default"
                onClick={() => setHistoryOpen(false)}
              />
              <div className="lg absolute bottom-11 left-0 z-[39] w-80 rounded-8 p-3">
                <div className="flex items-center gap-2 pb-2">
                  <Avatar w={worker} size={22} />
                  <span className="text-label-sm font-medium text-content">
                    {worker.name}&apos;s recent work
                  </span>
                  <span className="ml-auto text-label-xs text-content-tertiary">
                    {worker.history.length} tasks
                  </span>
                </div>
                <div className="flex flex-col">
                  {worker.history.map((h, i) => {
                    const c = connectorById(h.connectorId);
                    return (
                      <div
                        key={h.title}
                        className={`flex items-center gap-2.5 py-2 ${
                          i > 0 ? "border-t border-white/40" : ""
                        }`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/70">
                          <img src={c.icon} alt="" width={15} height={15} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-label-sm text-content">
                            {h.title}
                          </span>
                          <span className="block text-label-xs text-content-tertiary">
                            {c.name} · {h.when}
                          </span>
                        </span>
                        <Check size={13} strokeWidth={2.5} className="shrink-0 text-ok" />
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="mt-1 w-full rounded-5 bg-white/60 py-1.5 text-label-xs font-medium text-content"
                >
                  View all activity
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* prompt pill */}
      {!chatOpen && (
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          className="lg absolute bottom-5 left-1/2 z-30 flex w-[463px] max-w-[60%] -translate-x-1/2 items-center gap-2 rounded-full p-2 pl-3"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fill-secondary">
            <Plus size={18} strokeWidth={1.8} />
          </span>
          <span className="flex-1 text-left text-body-md text-content-tertiary">
            Ask {worker.name} anything ...
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-inverse text-on-fill">
            <Mic size={18} strokeWidth={1.8} />
          </span>
        </button>
      )}

      {/* ---- worker avatar notch, bottom-center above the prompt ---- */}
      {!chatOpen && (
        <div className="absolute bottom-[4.5rem] left-1/2 z-30 -translate-x-1/2">
          <button
            type="button"
            aria-label="Switch worker"
            title={`${worker.name} — ${worker.routine}`}
            onClick={() => setWorkersOpen(true)}
            className="lg flex items-center justify-center rounded-full p-1 transition-transform hover:scale-105"
          >
            <Avatar w={worker} size={44} />
          </button>
        </div>
      )}

      {/* ---- app library ---- */}
      {libraryOpen && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
          onClick={() => setLibraryOpen(false)}
        >
          <section
            aria-label="App library"
            className="lg-dark max-h-[85%] w-[560px] max-w-[92%] overflow-y-auto rounded-12 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-body-lg font-medium text-white">App library</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setLibraryOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
              >
                <X size={15} strokeWidth={1.8} />
              </button>
            </div>

            <div className="mb-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-2.5">
              <Search size={16} strokeWidth={1.8} className="text-white" />
              <span className="text-label-md text-white/80">Search apps</span>
            </div>

            <p className="mb-2 text-label-xs font-medium uppercase tracking-wide text-white/60">
              Google Workspace
            </p>
            <div className="mb-5 grid grid-cols-2 gap-2 max-sm:grid-cols-1">
              {GOOGLE_APPS.map((id) => (
                <LibraryRow key={id} id={id} isOpen={open.some((w) => w.connectorId === id)} onOpen={openApp} />
              ))}
            </div>

            <p className="mb-2 text-label-xs font-medium uppercase tracking-wide text-white/60">
              Productivity
            </p>
            <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
              {connectors
                .filter((c) => !GOOGLE_APPS.includes(c.id))
                .map((c) => (
                  <LibraryRow key={c.id} id={c.id} isOpen={open.some((w) => w.connectorId === c.id)} onOpen={openApp} />
                ))}
            </div>

            <p className="mt-5 text-center text-label-sm text-white/60">
              Adding an app gives {worker.name} a place to work — and you a window to watch.
            </p>
          </section>
        </div>
      )}

      {/* ---- workers panel ---- */}
      {workersOpen && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
          onClick={() => setWorkersOpen(false)}
        >
          <div
            className="lg-dark max-h-[85%] w-[560px] max-w-[92%] overflow-y-auto rounded-12 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-body-lg font-medium text-white">Workers</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setWorkersOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
              >
                <X size={15} strokeWidth={1.8} />
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {workers.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => switchWorker(w.id)}
                  className={`rounded-8 p-4 text-left transition-colors ${
                    w.id === workerId ? "bg-white/20" : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Avatar w={w} size={40} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-body-md font-medium text-white">{w.name}</span>
                        {w.id === workerId && (
                          <span className="rounded-full bg-[#26d489]/25 px-2 py-0.5 text-label-xs font-medium text-[#26d489]">
                            Active
                          </span>
                        )}
                      </span>
                      <span className="block text-label-sm text-white/60">
                        {w.role} · {w.routine}
                      </span>
                    </span>
                  </span>
                  <ul className="mt-3 flex flex-col gap-1.5 pl-1">
                    {w.tasks.map((t) => (
                      <li key={t.title} className="flex items-center gap-2">
                        <TaskIcon status={t.status} />
                        <span
                          className={`text-label-sm ${
                            t.status === "queued" ? "text-white/50" : "text-white/85"
                          }`}
                        >
                          {t.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
              {/* touchpoint for hiring another agent */}
              <button
                type="button"
                className="flex items-center gap-3 rounded-8 border border-dashed border-white/30 p-4 text-left transition-colors hover:bg-white/10"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-white/40">
                  <Plus size={18} className="text-white/70" />
                </span>
                <span>
                  <span className="block text-body-md font-medium text-white">Add a worker</span>
                  <span className="block text-label-sm text-white/60">
                    Hire another agent for a new vertical
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- centered chat popup ---- */}
      {chatOpen && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center"
          onClick={() => setChatOpen(false)}
        >
          <div
            className="flex h-[560px] w-[480px] max-w-[92%] flex-col rounded-11 bg-raised p-3 shadow-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* agent front and center at the top of the expanded chat */}
            <div className="relative flex flex-col items-center pb-3 pt-2">
              <GripHorizontal
                size={16}
                className="absolute left-1 top-2 text-content-tertiary"
              />
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setChatOpen(false)}
                className="absolute right-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-fill-secondary"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                aria-label="Switch worker"
                onClick={() => {
                  setChatOpen(false);
                  setWorkersOpen(true);
                }}
                className="rounded-full ring-2 ring-subtle transition-transform hover:scale-105"
              >
                <Avatar w={worker} size={48} />
              </button>
              <p className="mt-1.5 text-label-md font-medium text-content">{worker.name}</p>
              <p className="text-label-xs text-content-tertiary">{worker.routine}</p>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-3">
              <p className="ml-auto max-w-[328px] rounded-10 bg-fill-secondary px-4 py-3 text-body-md text-content">
                Where are we on the {worker.routine.toLowerCase()}?
              </p>
              <div className="flex gap-2.5">
                <Avatar w={worker} size={24} />
                <p className="max-w-[360px] text-body-md leading-7 text-content">
                  {doneCount} of {worker.tasks.length} steps done —{" "}
                  {runningTask
                    ? `I'm on “${runningTask.title.toLowerCase()}” right now.`
                    : "all wrapped up."}{" "}
                  I&apos;ll ask before anything outward-facing.
                </p>
              </div>
              <div className="rounded-8 border border-subtle bg-canvas p-3">
                <ul className="flex flex-col gap-1.5">
                  {worker.tasks.map((t) => (
                    <li key={t.title} className="flex items-center gap-2.5">
                      <TaskIcon status={t.status} dark={false} />
                      <span
                        className={`text-body-sm ${
                          t.status === "queued" ? "text-content-tertiary" : "text-content"
                        }`}
                      >
                        {t.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-subtle bg-raised p-2 pl-2.5 shadow-xs">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fill-secondary">
                <Plus size={18} strokeWidth={1.8} />
              </span>
              <input
                placeholder={`Ask ${worker.name} anything ...`}
                className="min-w-0 flex-1 bg-transparent text-body-md text-content outline-none placeholder:text-content-tertiary"
              />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-inverse text-on-fill">
                <Mic size={18} strokeWidth={1.8} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LibraryRow({
  id,
  isOpen,
  onOpen,
}: {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
}) {
  const c = connectorById(id);
  const supported = Boolean(APP_KINDS[id]) || isOpen;
  return (
    <div className="flex items-center gap-2.5 rounded-[20px] bg-white/15 p-2 backdrop-blur-xl">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-8 bg-white/90">
        <img src={c.icon} alt="" width={22} height={22} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-label-sm font-medium text-white">{c.name}</span>
        <span className="block text-label-xs text-white/50">{c.actions} actions</span>
      </span>
      {isOpen ? (
        <button
          type="button"
          onClick={() => onOpen(id)}
          className="rounded-5 bg-white px-2.5 py-1 text-label-xs font-medium text-content"
        >
          Open
        </button>
      ) : supported ? (
        <button
          type="button"
          onClick={() => onOpen(id)}
          className="rounded-5 bg-black/30 px-2.5 py-1 text-label-xs font-medium text-white"
        >
          Add
        </button>
      ) : (
        <span className="rounded-5 px-2.5 py-1 text-label-xs font-medium text-white/40">
          Soon
        </span>
      )}
    </div>
  );
}
