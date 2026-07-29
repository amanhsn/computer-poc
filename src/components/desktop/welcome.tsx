"use client";

/* First-run welcome sequence.
   Beat 1  glass Imagine mark breathes in
   Beat 2  mark lifts away as "Welcome" is written on, left to right
   Beat 3  three staged setup lines under a hairline meter
   Beat 4  glass Continue button rises; click reveals the desktop
   Backdrop is the wallpaper alone, blurred — never the live apps. */

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const STAGES = [
  "Setting up your computer",
  "Connecting your tools",
  "Waking your workers",
];

/* beat timings (ms from mount) */
const T = {
  markIn: 120,
  markOut: 1500,
  write: 1700,
  writeDur: 2100,
  stage: 3500,
  stageEvery: 1150,
  cta: 3500 + 1150 * 3 - 200,
};
const OUT_MS = 1000;

export function Welcome({ wallpaper }: { wallpaper: string }) {
  const [gone, setGone] = useState(true); // start hidden; effect decides
  const [beat, setBeat] = useState(0); // 0 none · 1 mark · 2 write · 3 loading
  const [stage, setStage] = useState(-1);
  const [ctaIn, setCtaIn] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("ic-welcomed")) return;
    setGone(false);

    /* ?slow=4 stretches the sequence for design review */
    const slow = Number(new URLSearchParams(location.search).get("slow")) || 1;
    const at = (ms: number, fn: () => void) =>
      timers.current.push(setTimeout(fn, ms * slow));

    at(T.markIn, () => setBeat(1));
    at(T.write, () => setBeat(2));
    at(T.stage - 300, () => setBeat(3));
    STAGES.forEach((_, i) => at(T.stage + i * T.stageEvery, () => setStage(i)));
    at(T.cta, () => setCtaIn(true));

    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const enter = () => {
    timers.current.forEach(clearTimeout);
    sessionStorage.setItem("ic-welcomed", "1");
    setLeaving(true);
    setTimeout(() => setGone(true), OUT_MS);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!gone && (e.key === "Enter" || e.key === "Escape")) enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gone]);

  if (gone) return null;

  const progress = stage < 0 ? 0 : ((stage + 1) / STAGES.length) * 100;

  return (
    <div
      className="absolute inset-0 z-[100] overflow-hidden"
      style={{
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(1.06)" : "scale(1)",
        filter: leaving ? "blur(14px)" : "blur(0px)",
        transition: `opacity ${OUT_MS}ms cubic-bezier(.4,0,.2,1), transform ${OUT_MS}ms cubic-bezier(.4,0,.2,1), filter ${OUT_MS}ms cubic-bezier(.4,0,.2,1)`,
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {/* backdrop: the wallpaper alone, blurred — apps never show through */}
      <div
        aria-hidden
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(22px) saturate(0.6) brightness(1.02)",
        }}
      />
      {/* neutral scrim keeps the greeting legible without the green cast */}
      <div aria-hidden className="absolute inset-0 bg-[#1b1d20]/45" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(70% 65% at 50% 45%, transparent, rgba(20,22,25,0.35))" }}
      />

      {/* stage */}
      <div className="relative flex h-full flex-col items-center justify-center px-10">
        {/* Beat 1 — glass Imagine mark */}
        <div
          className="absolute"
          style={{
            opacity: beat === 1 ? 1 : 0,
            transform:
              beat === 0
                ? "scale(.86) translateY(0)"
                : beat === 1
                  ? "scale(1) translateY(0)"
                  : "scale(1.08) translateY(-38px)",
            filter: beat === 1 ? "blur(0px)" : "blur(14px)",
            transition:
              "opacity 900ms cubic-bezier(.22,1,.36,1), transform 1200ms cubic-bezier(.22,1,.36,1), filter 900ms cubic-bezier(.22,1,.36,1)",
          }}
        >
          <GlassMark />
        </div>

        {/* Beat 2 — handwritten Welcome */}
        <div
          className="relative"
          style={{
            opacity: beat >= 2 ? 1 : 0,
            transform: beat >= 2 ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 700ms ease-out, transform 900ms cubic-bezier(.22,1,.36,1)",
          }}
        >
          <Handwriting active={beat >= 2} />
        </div>

        {/* Beat 3 — staged setup */}
        <div
          className="absolute bottom-[24%] flex flex-col items-center gap-4"
          style={{
            opacity: beat >= 3 && !ctaIn ? 1 : 0,
            transition: "opacity 600ms ease-out",
          }}
        >
          <div className="relative h-5 w-72">
            {STAGES.map((s, i) => (
              <p
                key={s}
                className="absolute inset-x-0 text-center text-label-md tracking-wide text-white/75"
                style={{
                  opacity: stage === i ? 1 : 0,
                  transform:
                    stage === i
                      ? "translateY(0)"
                      : stage > i
                        ? "translateY(-10px)"
                        : "translateY(10px)",
                  filter: stage === i ? "blur(0px)" : "blur(4px)",
                  transition:
                    "opacity 550ms ease-out, transform 650ms cubic-bezier(.22,1,.36,1), filter 550ms ease-out",
                }}
              >
                {s}
              </p>
            ))}
          </div>
          <div className="h-[2px] w-44 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-white/90"
              style={{
                width: `${progress}%`,
                transition: "width 900ms cubic-bezier(.4,0,.2,1)",
                boxShadow: "0 0 12px rgba(255,255,255,0.5)",
              }}
            />
          </div>
        </div>

        {/* Beat 4 — glass Continue */}
        <div
          className="absolute bottom-[22%]"
          style={{
            opacity: ctaIn ? 1 : 0,
            transform: ctaIn ? "translateY(0) scale(1)" : "translateY(18px) scale(.96)",
            filter: ctaIn ? "blur(0px)" : "blur(8px)",
            transition:
              "opacity 700ms ease-out, transform 900ms cubic-bezier(.22,1,.36,1), filter 700ms ease-out",
            pointerEvents: ctaIn ? "auto" : "none",
          }}
        >
          <button
            type="button"
            onClick={enter}
            className="group relative flex h-12 items-center gap-2.5 overflow-hidden rounded-full px-7 text-label-lg font-medium text-white"
            style={{
              background: "rgba(255,255,255,0.16)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              backdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(255,255,255,0.1), 0 10px 32px rgba(0,0,0,0.28)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
            <span className="relative">Continue</span>
            <ArrowRight
              size={17}
              strokeWidth={2}
              className="relative transition-transform duration-500 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- the Imagine mark, set in a glass plate ---------- */
function GlassMark() {
  return (
    <span
      className="relative flex items-center justify-center rounded-[36px] p-[18px]"
      style={{
        background: "rgba(255,255,255,0.15)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        backdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.42)",
        boxShadow:
          "inset 0 1.5px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.12), 0 28px 64px rgba(0,0,0,0.4)",
      }}
    >
      {/* specular sweep across the plate */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[36px]"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.07) 36%, transparent 58%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/imagine-logo.png"
        alt="Imagine"
        width={90}
        height={90}
        className="relative block h-[90px] w-[90px] rounded-[20px]"
        style={{ boxShadow: "0 10px 28px rgba(20,10,50,0.45)" }}
      />
    </span>
  );
}

/* ---------- "Welcome" written on, left to right ---------- */
function Handwriting({ active }: { active: boolean }) {
  const ease = "cubic-bezier(.55,.06,.3,1)";
  return (
    <div className="relative">
      {/* clip-path sweeps the ink on; slight angle reads as a pen stroke */}
      <div
        className="overflow-visible"
        style={{
          clipPath: active ? "inset(-25% -6% -25% 0)" : "inset(-25% 100% -25% 0)",
          animation: active ? `welcome-write ${T.writeDur}ms ${ease} forwards` : "none",
        }}
      >
        <p
          className="select-none whitespace-nowrap text-[clamp(64px,8vw,124px)] leading-[1.35] text-white"
          style={{
            fontFamily: "var(--font-script)",
            padding: "0 0.14em",
            filter: "drop-shadow(0 3px 26px rgba(0,0,0,0.4))",
          }}
        >
          Welcome
        </p>
      </div>

      {/* pen light riding the ink edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.14) 42%, transparent 70%)",
          animation: active ? `welcome-pen ${T.writeDur}ms ${ease} forwards` : "none",
        }}
      />

      <style>{`
        @keyframes welcome-write {
          from { clip-path: inset(-25% 100% -25% 0); }
          to   { clip-path: inset(-25% -6% -25% 0); }
        }
        @keyframes welcome-pen {
          0%   { left: 0%;   opacity: 0; }
          10%  { opacity: 0.9; }
          85%  { opacity: 0.9; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
