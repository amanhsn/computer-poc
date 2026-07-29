/* Dummy screens for the vertical-showcase apps — grounded in researched UI
   specs (layouts, palettes, verbatim labels). Recognizable, not pixel clones. */
/* eslint-disable @next/next/no-img-element */

import {
  Plus,
  Play,
  Search,
  Home,
  Compass,
  Clapperboard,
  MessageCircle,
  Heart,
  Bell,
  Bookmark,
  Repeat2,
  BarChart2,
  MicOff,
  Video,
  Captions,
  Hand,
  MonitorUp,
  MoreVertical,
  Phone,
  Check,
  GitPullRequest,
  GitMerge,
  FileCode2,
  FolderClosed,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ArrowUp,
  Infinity as InfinityIcon,
  AudioLines,
  Film,
  Network,
  FileText,
  StickyNote,
  Type,
  Shapes,
  CloudUpload,
  LayoutTemplate,
  Users,
  Info,
  BadgeCheck,
  ImageIcon,
} from "lucide-react";

/* ---------------- NotebookLM ---------------- */
const NBLM_SOURCES = ["Q3 spend export.csv", "Creative test results", "Channel benchmarks", "Interview notes"];

export function NotebookLMApp() {
  return (
    <div className="flex h-full flex-col bg-[#f8fafd]">
      <div className="flex items-center gap-2 px-4 py-2">
        <img src="/icons/notebooklm.png" alt="" width={18} height={18} />
        <span className="text-body-sm font-medium text-[#1f1f1f]">Q3 Research</span>
        <span className="ml-auto rounded-full bg-[#c2e7ff] px-3 py-1 text-label-xs font-medium text-[#001d35]">
          Share
        </span>
      </div>
      <div className="flex min-h-0 flex-1 gap-2 px-2 pb-2">
        {/* Sources */}
        <div className="w-44 shrink-0 rounded-8 border border-[#e0e3e7] bg-white p-3">
          <p className="text-label-sm font-medium text-[#444746]">Sources</p>
          <div className="mt-2 flex gap-1.5">
            <span className="flex-1 rounded-full border border-[#dadce0] py-1 text-center text-label-xs font-medium text-[#0b57d0]">
              + Add
            </span>
            <span className="flex-1 rounded-full border border-[#dadce0] py-1 text-center text-label-xs text-[#444746]">
              Discover
            </span>
          </div>
          <p className="mt-2.5 text-label-xs text-[#5e5e5e]">Select all sources</p>
          <ul className="mt-1.5 flex flex-col gap-1.5">
            {NBLM_SOURCES.map((s, i) => (
              <li key={s} className="flex items-center gap-1.5 text-label-xs text-[#444746]">
                <FileText size={11} className={i === 0 ? "text-[#188038]" : "text-[#ea4335]"} />
                <span className="min-w-0 flex-1 truncate">{s}</span>
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-[#0b57d0]">
                  <Check size={9} strokeWidth={3} className="text-white" />
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Chat */}
        <div className="flex min-w-0 flex-1 flex-col rounded-8 border border-[#e0e3e7] bg-white p-3">
          <p className="text-label-sm font-medium text-[#444746]">Chat</p>
          <div className="mt-2 flex-1">
            <p className="text-label-sm font-semibold text-[#1f1f1f]">Q3 creative performance</p>
            <p className="mt-1 text-label-sm leading-5 text-[#444746]">
              Across 12 sources: short-form creative drove the CPL drop
              <span className="mx-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#e8eaed] align-middle text-[9px]">1</span>
              , concentrated in Meta and TikTok
              <span className="mx-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#e8eaed] align-middle text-[9px]">2</span>
              . Benchmarks suggest ~15% headroom before saturation
              <span className="mx-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#e8eaed] align-middle text-[9px]">3</span>
              .
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#dadce0] px-3 py-1.5">
            <span className="flex-1 text-label-sm text-[#5e5e5e]">Start typing...</span>
            <span className="rounded-full bg-[#f0f4f9] px-2 py-0.5 text-label-xs text-[#444746]">
              12 sources
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0b57d0]">
              <ArrowUp size={12} className="text-white" />
            </span>
          </div>
        </div>
        {/* Studio */}
        <div className="w-44 shrink-0 rounded-8 border border-[#e0e3e7] bg-white p-3">
          <p className="text-label-sm font-medium text-[#444746]">Studio</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {[
              { icon: AudioLines, label: "Audio Overview", color: "#0b57d0" },
              { icon: Film, label: "Video Overview", color: "#ea4335" },
              { icon: Network, label: "Mind Map", color: "#34a853" },
              { icon: FileText, label: "Reports", color: "#f9ab00" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="rounded-5 border border-[#dadce0] bg-[#f8f9fa] p-1.5">
                <Icon size={12} style={{ color }} />
                <p className="mt-1 text-[9px] leading-3 text-[#444746]">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-5 border border-[#dadce0] p-1.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0b57d0]">
              <Play size={10} className="ml-0.5 text-white" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-medium text-[#1f1f1f]">
                Deep Dive conversation
              </span>
              <span className="block text-[9px] text-[#5e5e5e]">2 hosts · 12 min</span>
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-label-xs text-[#444746]">
            <StickyNote size={12} /> Add note
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Canva ---------------- */
export function CanvaApp() {
  return (
    <div className="flex h-full flex-col bg-[#ebecf0]">
      <div className="flex items-center gap-3 border-b border-[#e4e6eb] bg-white px-3 py-2">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold italic text-white"
          style={{ background: "linear-gradient(45deg,#00C4CC,#7D2AE8)" }}
        >
          C
        </span>
        <span className="text-label-xs text-[#5e6b7a]">File</span>
        <span className="text-label-xs text-[#5e6b7a]">Resize</span>
        <span className="text-label-xs text-[#5e6b7a]">Editing ⌄</span>
        <span className="mx-auto text-label-xs font-medium text-[#0e1318]">Launch banner pack</span>
        <span className="rounded-5 bg-[#f2f3f5] px-2.5 py-1 text-label-xs font-medium text-[#0e1318]">
          Present
        </span>
        <span className="rounded-5 bg-[#8b3dff] px-3 py-1 text-label-xs font-semibold text-white">
          Share
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex w-16 shrink-0 flex-col items-center gap-3 border-r border-[#e4e6eb] bg-white py-3 text-[9px] text-[#5e6b7a]">
          {[
            { icon: LayoutTemplate, label: "Design", active: true },
            { icon: Shapes, label: "Elements" },
            { icon: Type, label: "Text" },
            { icon: Sparkles, label: "Brand" },
            { icon: CloudUpload, label: "Uploads" },
          ].map(({ icon: Icon, label, active }) => (
            <span
              key={label}
              className={`flex flex-col items-center gap-0.5 ${active ? "font-semibold text-[#8b3dff]" : ""}`}
            >
              <Icon size={16} strokeWidth={1.8} />
              {label}
            </span>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-2 p-4">
          <div className="relative h-44 w-[440px] max-w-full overflow-hidden rounded-2 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            <img src="/photos/p4.jpg" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/45 to-transparent px-8 text-white">
              <p className="text-label-xs uppercase tracking-[0.2em] text-white/80">
                Imagine · Launch week
              </p>
              <p className="mt-1 text-heading-xs font-semibold">Meet your computer.</p>
              <span className="mt-3 w-fit rounded-full bg-white px-3 py-1 text-label-xs font-medium text-[#7d2ae8]">
                Try it free
              </span>
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-label-xs text-[#5e6b7a] shadow-xs">
            + Add page
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#e4e6eb] bg-white px-3 py-1.5 text-label-xs text-[#5e6b7a]">
        <span>Notes</span>
        <span>52% · Page 1 / 1</span>
      </div>
    </div>
  );
}

/* ---------------- Cursor ---------------- */
/* pre-tokenized lines: [text, color] segments — Anysphere palette */
type Seg = [string, string?];
const KW = "#82D2CE";
const FN = "#EFB080";
const STR = "#E394DC";
const CURSOR_CODE: [string, Seg[]][] = [
  ["1", [["export async function ", KW], ["commitCheckout", FN], ["(session: "], ["Session", FN], [") {"]]],
  ["2", [["  "], ["const ", KW], ["lock = "], ["await ", KW], ["acquireLock", FN], ["(session.id);"]]],
  ["3", [["  "], ["try", KW], [" {"]]],
  ["4", [["    "], ["const ", KW], ["cart = "], ["await ", KW], ["loadCart", FN], ["(session.id);"]]],
  ["5", [["    "], ["await ", KW], ["chargeCard", FN], ["(cart.total, "], ['"usd"', STR], [");"]]],
  ["6", [["    "], ["await ", KW], ["persistOrder", FN], ["(cart, { key: session.id });"]]],
  ["7", [["  } "], ["finally", KW], [" {"]]],
  ["8", [["    "], ["await ", KW], ["lock."], ["release", FN], ["();"]]],
  ["9", [["  }"]]],
  ["10", [["}"]]],
];

export function CursorApp() {
  return (
    <div className="flex h-full flex-col bg-[#141414] text-[#f0f0f0]">
      <div className="flex min-h-0 flex-1">
        <div className="w-40 shrink-0 border-r border-white/[0.08] p-2 text-label-xs text-[#f0f0f0]/70">
          <p className="px-1 py-1 text-[10px] font-medium uppercase tracking-wide text-[#f0f0f0]/40">
            Explorer
          </p>
          <div className="flex items-center gap-1 px-1 py-0.5">
            <ChevronDown size={11} /> <FolderClosed size={11} /> imagine-computer
          </div>
          {["src", "api"].map((f) => (
            <div key={f} className="flex items-center gap-1 px-3 py-0.5 text-[#f0f0f0]/50">
              <ChevronRight size={11} /> {f}
            </div>
          ))}
          <div className="flex items-center gap-1 rounded-2 bg-white/10 px-3 py-0.5 text-white">
            <FileCode2 size={11} className="text-[#82D2CE]" /> checkout.ts
          </div>
          <div className="flex items-center gap-1 px-3 py-0.5 text-[#f0f0f0]/50">
            <FileCode2 size={11} /> checkout.test.ts
          </div>
        </div>
        <div className="min-w-0 flex-1 bg-[#181818]">
          <div className="flex border-b border-white/[0.08] bg-[#141414] text-label-xs">
            <span className="border-r border-white/[0.08] bg-[#181818] px-3 py-1.5 text-[#f0f0f0]">
              checkout.ts
            </span>
            <span className="px-3 py-1.5 text-[#f0f0f0]/40">checkout.test.ts</span>
          </div>
          <pre className="overflow-hidden p-3 font-mono text-[11px] leading-[18px]">
            {CURSOR_CODE.map(([n, segs]) => (
              <div key={n} className={n === "2" || n === "8" ? "bg-[#82D2CE]/[0.07]" : ""}>
                <span className="mr-3 inline-block w-4 text-right text-white/25">{n}</span>
                {segs.map(([text, color], i) => (
                  <span key={i} style={color ? { color } : undefined}>
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </pre>
        </div>
        <div className="flex w-48 shrink-0 flex-col border-l border-white/[0.08] text-label-xs">
          <div className="flex items-center justify-between px-2.5 py-1.5 text-[#f0f0f0]/70">
            <span className="font-medium text-[#f0f0f0]">Agent</span>
            <span>New Chat</span>
          </div>
          <div className="flex-1 space-y-2 p-2.5">
            <p className="rounded-3 bg-[#1f1f1f] p-2 text-[#f0f0f0]/80">
              Fix the checkout race condition
            </p>
            <div className="rounded-3 border border-white/[0.08] bg-[#1f1f1f] p-2">
              <p className="flex items-center gap-1 text-[#f0f0f0]/80">
                checkout.ts <span className="text-[#26d489]">+6</span>
                <span className="text-[#f47067]">−2</span>
              </p>
              <div className="mt-1.5 flex gap-1.5">
                <span className="rounded-2 bg-white/10 px-2 py-0.5">Accept</span>
                <span className="rounded-2 px-2 py-0.5 text-[#f0f0f0]/50">Reject</span>
              </div>
            </div>
          </div>
          <div className="m-2 rounded-4 bg-[#1f1f1f] p-2">
            <p className="text-[#f0f0f0]/40">Plan, search, build anything</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
                <InfinityIcon size={10} /> Agent ⌄
              </span>
              <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">Auto ⌄</span>
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#f0f0f0] text-[#141414]">
                <ArrowUp size={11} strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-white/[0.08] px-3 py-1 text-[10px] text-[#f0f0f0]/50">
        <span>main*</span>
        <span>✓ Prettier</span>
        <span className="ml-auto">TypeScript · Cursor Tab</span>
      </div>
    </div>
  );
}

/* ---------------- Terminal ---------------- */
export function TerminalApp() {
  return (
    <div className="h-full bg-[#1e1e20]/95 p-3 font-mono text-[12px] leading-[19px] text-[#e6e6e6]">
      <p className="text-[#9a9a9e]">Last login: Tue Jul 29 09:41:32 on ttys000</p>
      <p className="mt-1">
        syed@Syeds-MacBook-Pro imagine-computer % <span className="text-[#e6e6e6]">pnpm test checkout</span>
      </p>
      <p className="text-[#9a9a9e]">&gt; vitest run src/api/checkout.test.ts</p>
      <p>
        <span className="text-[#28c840]">✓</span> holds the session lock during charge{" "}
        <span className="text-[#9a9a9e]">14ms</span>
      </p>
      <p>
        <span className="text-[#28c840]">✓</span> is idempotent on retry{" "}
        <span className="text-[#9a9a9e]">9ms</span>
      </p>
      <p>
        <span className="text-[#28c840]">✓</span> releases the lock on failure{" "}
        <span className="text-[#9a9a9e]">11ms</span>
      </p>
      <p className="text-[#9a9a9e]">Test Files 1 passed · Tests 142 passed, 3 running</p>
      <p className="mt-1">
        syed@Syeds-MacBook-Pro imagine-computer %{" "}
        <span className="inline-block h-4 w-2 bg-[#8c8c8c] align-middle" />
      </p>
    </div>
  );
}

/* ---------------- GitHub ---------------- */
export function GitHubApp() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 bg-[#0d1117] px-4 py-2">
        <img src="/icons/github.png" alt="" width={18} height={18} className="rounded-full bg-white" />
        <span className="text-label-xs text-white">imagineart / imagine-computer</span>
        <span className="ml-auto text-label-xs text-white/60">Watch 42 · Star 1.2k</span>
      </div>
      <div className="border-b border-[#d0d7de] bg-[#f6f8fa] px-4 pt-3">
        <h2 className="text-body-md font-normal text-[#1f2328]">
          Fix checkout race condition <span className="text-[#59636e]">#482</span>
        </h2>
        <div className="mt-1.5 flex items-center gap-2 pb-2">
          <span className="flex items-center gap-1 rounded-full bg-[#1f883d] px-2.5 py-1 text-label-xs font-medium text-white">
            <GitPullRequest size={11} /> Open
          </span>
          <span className="text-label-xs text-[#59636e]">
            forge-agent wants to merge 2 commits into{" "}
            <code className="rounded bg-[#ddf4ff] px-1 font-mono text-[#0969da]">main</code> from{" "}
            <code className="rounded bg-[#ddf4ff] px-1 font-mono text-[#0969da]">fix/checkout-race</code>
          </span>
        </div>
        <div className="flex gap-4 text-label-xs text-[#59636e]">
          <span className="border-b-[3px] border-[#fd8c73] pb-1.5 font-medium text-[#1f2328]">
            Conversation
          </span>
          <span className="pb-1.5">
            Commits <span className="rounded-full bg-[#eff1f3] px-1.5">2</span>
          </span>
          <span className="pb-1.5">
            Checks <span className="rounded-full bg-[#eff1f3] px-1.5">3</span>
          </span>
          <span className="pb-1.5">
            Files changed <span className="rounded-full bg-[#eff1f3] px-1.5">2</span>
          </span>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden p-4">
        <div className="rounded-6 border border-[#d0d7de]">
          <div className="flex items-center gap-2 border-b border-[#d0d7de] bg-[#f6f8fa] px-3 py-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1a7f37]">
              <Check size={12} strokeWidth={3} className="text-white" />
            </span>
            <span className="text-label-sm font-semibold text-[#1f2328]">All checks have passed</span>
            <span className="text-label-xs text-[#59636e]">3 successful checks</span>
          </div>
          {["build · Turbopack", "test · vitest (145)", "lint · eslint"].map((c) => (
            <div key={c} className="flex items-center gap-2 border-b border-[#d0d7de] px-3 py-1.5 last:border-0">
              <Check size={13} strokeWidth={3} className="text-[#1a7f37]" />
              <span className="text-label-xs text-[#59636e]">{c}</span>
              <span className="ml-auto text-label-xs text-[#0969da]">Details</span>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 text-label-sm font-semibold text-[#1f2328]">
          <Check size={14} strokeWidth={3} className="text-[#1a7f37]" />
          This branch has no conflicts with the base branch
        </p>
        <button
          type="button"
          className="mt-2.5 flex items-center gap-1.5 rounded-5 bg-[#1f883d] px-3 py-1.5 text-label-sm font-medium text-white"
        >
          <GitMerge size={14} /> Merge pull request ▾
        </button>
        <p className="mt-1.5 text-label-xs text-[#59636e]">
          Waiting on your approval — Forge won&apos;t merge without you.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Buffer ---------------- */
const BUFFER_POSTS = [
  { time: "9:00 AM", channel: "x", text: "Your tools, run for you. Launch week starts now — thread below 🧵" },
  { time: "12:30 PM", channel: "instagram", text: "Meet your computer. New film in bio — dawn palette, all agents." },
];

export function BufferApp() {
  return (
    <div className="flex h-full bg-white">
      <div className="w-44 shrink-0 border-r border-[#e0e0e0] bg-[#fafafa] p-3">
        <p className="text-label-xs font-medium text-[#636363]">All Channels</p>
        <ul className="mt-2 flex flex-col gap-1">
          {[
            { icon: "/icons/instagram.png", handle: "@imagine.art", count: 4, active: true },
            { icon: "/icons/x.png", handle: "@imagineart", count: 5 },
          ].map((c) => (
            <li
              key={c.handle}
              className={`flex items-center gap-2 rounded-5 px-2 py-1.5 ${c.active ? "bg-[#f0f3ff]" : ""}`}
            >
              <span className="relative">
                <span
                  className="block h-6 w-6 rounded-full"
                  style={{ background: "linear-gradient(135deg,#be95ff,#6929c4)" }}
                />
                <img
                  src={c.icon}
                  alt=""
                  width={12}
                  height={12}
                  className="absolute -bottom-0.5 -right-0.5 rounded-sm bg-white p-px"
                />
              </span>
              <span className="min-w-0 flex-1 truncate text-label-xs font-medium text-[#3d3d3d]">
                {c.handle}
              </span>
              <span className="text-label-xs text-[#636363]">{c.count}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-label-xs text-[#636363]">Manage Channels</p>
      </div>
      <div className="min-w-0 flex-1 p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-label-sm text-[#636363]">
            <span className="border-b-2 border-[#2c4bff] pb-1 font-medium text-[#231f20]">Queue</span>
            <span>Drafts</span>
            <span>Approvals</span>
            <span>Sent</span>
          </div>
          <button
            type="button"
            className="rounded-full bg-[#2c4bff] px-3.5 py-1.5 text-label-xs font-semibold text-white"
          >
            + New Post
          </button>
        </div>
        <p className="mt-4 text-label-xs font-semibold text-[#636363]">Today</p>
        <div className="mt-2 flex flex-col gap-2">
          {BUFFER_POSTS.map((p) => (
            <div key={p.time} className="flex items-start gap-3 rounded-6 border border-[#e0e0e0] p-3">
              <span className="text-label-xs font-medium text-[#3d3d3d]">{p.time}</span>
              <p className="min-w-0 flex-1 truncate text-label-sm text-[#231f20]">{p.text}</p>
              <img src={`/icons/${p.channel}.png`} alt="" width={14} height={14} />
            </div>
          ))}
          <div className="flex items-center gap-3 rounded-6 border border-dashed border-[#d0d0d0] p-3 text-label-xs text-[#636363]">
            <span>4:00 PM</span>
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Instagram ---------------- */
const IG_PHOTOS = ["p1", "p2", "p3", "p5", "p6", "p9"];

export function InstagramApp() {
  return (
    <div className="flex h-full bg-white">
      <div className="w-44 shrink-0 border-r border-[#dbdbdb] p-4">
        <p className="font-[cursive] text-body-lg font-semibold italic text-[#262626]">Instagram</p>
        <ul className="mt-4 flex flex-col gap-3 text-label-sm text-[#262626]">
          <li className="flex items-center gap-3 font-semibold"><Home size={18} /> Home</li>
          <li className="flex items-center gap-3"><Search size={18} /> Search</li>
          <li className="flex items-center gap-3"><Compass size={18} /> Explore</li>
          <li className="flex items-center gap-3"><Clapperboard size={18} /> Reels</li>
          <li className="flex items-center gap-3"><MessageCircle size={18} /> Messages</li>
          <li className="flex items-center gap-3"><Heart size={18} /> Notifications</li>
          <li className="flex items-center gap-3"><Plus size={18} /> Create</li>
        </ul>
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center gap-6 p-5 pb-3">
          <span
            className="h-16 w-16 shrink-0 rounded-full p-[3px]"
            style={{ background: "linear-gradient(45deg,#feda75,#d62976,#962fbf)" }}
          >
            <img src="/photos/p6.jpg" alt="" className="h-full w-full rounded-full border-2 border-white object-cover" />
          </span>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-body-md text-[#262626]">imagine.art</span>
              <span className="rounded-6 bg-[#0095f6] px-4 py-1 text-label-xs font-semibold text-white">
                Follow
              </span>
            </div>
            <div className="mt-2 flex gap-5 text-label-sm text-[#262626]">
              <span><b>412</b> posts</span>
              <span><b>2.1M</b> followers</span>
              <span><b>12</b> following</span>
            </div>
            <p className="mt-1 text-label-xs text-[#737373]">Your tools, run for you · launch week 🌄</p>
          </div>
        </div>
        <div className="mx-5 flex justify-center gap-8 border-t border-[#dbdbdb] text-[10px] font-semibold tracking-[0.1em] text-[#737373]">
          <span className="-mt-px border-t border-[#262626] pt-2 text-[#262626]">POSTS</span>
          <span className="pt-2">REELS</span>
          <span className="pt-2">TAGGED</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1 px-5">
          {IG_PHOTOS.map((p) => (
            <img key={p} src={`/photos/${p}.jpg`} alt="" className="aspect-square w-full object-cover" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- X ---------------- */
export function XApp() {
  return (
    <div className="flex h-full bg-black text-[#e7e9ea]">
      <div className="w-40 shrink-0 border-r border-[#2f3336] p-3">
        <img src="/icons/x.png" alt="" width={20} height={20} className="invert" />
        <ul className="mt-4 flex flex-col gap-3 text-label-sm">
          <li className="flex items-center gap-3 font-bold"><Home size={17} /> Home</li>
          <li className="flex items-center gap-3 text-[#71767b]"><Search size={17} /> Explore</li>
          <li className="flex items-center gap-3 text-[#71767b]"><Bell size={17} /> Notifications</li>
          <li className="flex items-center gap-3 text-[#71767b]"><MessageCircle size={17} /> Messages</li>
          <li className="flex items-center gap-3 text-[#71767b]"><Bookmark size={17} /> Bookmarks</li>
        </ul>
        <button
          type="button"
          className="mt-4 w-full rounded-full bg-[#eff3f4] py-1.5 text-label-sm font-bold text-[#0f1419]"
        >
          Post
        </button>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex border-b border-[#2f3336] text-label-sm">
          <span className="relative flex-1 pb-2 pt-3 text-center font-semibold">
            For you
            <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1d9bf0]" />
          </span>
          <span className="flex-1 pb-2 pt-3 text-center text-[#71767b]">Following</span>
        </div>
        <div className="flex gap-2.5 border-b border-[#2f3336] p-3">
          <img src="/photos/p6.jpg" alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
          <span className="pt-1.5 text-label-sm text-[#71767b]">What&apos;s happening?</span>
        </div>
        <div className="border-b border-[#2f3336] p-3">
          <div className="flex gap-2.5">
            <img src="/photos/p6.jpg" alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 text-label-sm">
                <b>Imagine</b>
                <BadgeCheck size={13} className="fill-[#1d9bf0] text-black" />
                <span className="text-[#71767b]">@imagineart · 2m</span>
              </p>
              <p className="mt-0.5 text-label-sm leading-5">
                Your tools, run for you. Launch week starts now — five agents, one computer. 🧵
              </p>
              <img
                src="/photos/p2.jpg"
                alt=""
                className="mt-2 h-28 w-full rounded-8 border border-[#2f3336] object-cover"
              />
              <div className="mt-2 flex max-w-[260px] justify-between text-[#71767b]">
                <span className="flex items-center gap-1 text-label-xs"><MessageCircle size={13} /> 48</span>
                <span className="flex items-center gap-1 text-label-xs"><Repeat2 size={14} /> 212</span>
                <span className="flex items-center gap-1 text-label-xs"><Heart size={13} /> 1.4K</span>
                <span className="flex items-center gap-1 text-label-xs"><BarChart2 size={13} /> 89K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ImagineArt ---------------- */
const IA_PHOTOS = ["p4", "p5", "p1", "p10"];

export function ImagineArtApp() {
  return (
    <div className="flex h-full bg-[#0d0d11] text-[#f5f5f7]">
      <div className="flex w-44 shrink-0 flex-col border-r border-[#2a2a33] bg-[#17171c] p-3">
        <div className="flex items-center gap-2">
          <img src="/icons/imagineart.png" alt="" width={16} height={16} className="rounded" />
          <span className="text-label-sm font-medium">ImagineArt</span>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-5 border border-[#2a2a33] bg-[#1f1f26] p-1.5">
          <img src="/photos/p4.jpg" alt="" className="h-6 w-6 rounded object-cover" />
          <span className="text-label-xs">Flux Dev</span>
          <ChevronDown size={11} className="ml-auto text-[#9ca0aa]" />
        </div>
        <p className="mt-3 text-label-xs text-[#9ca0aa]">Aspect Ratio</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["1:1", "16:9", "9:16", "4:5"].map((r, i) => (
            <span
              key={r}
              className={`rounded-3 px-2 py-0.5 text-label-xs ${
                i === 3 ? "border border-[#7c3aed] bg-[#7c3aed]/20 text-white" : "bg-[#1f1f26] text-[#9ca0aa]"
              }`}
            >
              {r}
            </span>
          ))}
        </div>
        <p className="mt-3 text-label-xs text-[#9ca0aa]">Number of Images</p>
        <p className="mt-1 text-label-xs">4</p>
        <button
          type="button"
          className="mt-auto w-full rounded-6 bg-[#7c3aed] py-2 text-label-sm font-semibold text-white"
        >
          Create
        </button>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <div className="flex items-center gap-2 rounded-full bg-[#1f1f26] px-3 py-2">
          <Sparkles size={13} className="text-[#a855f7]" />
          <span className="truncate text-label-sm text-[#9ca0aa]">
            dawn light over rolling hills, soft mist, warm palette, cinematic still
          </span>
        </div>
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2">
          {IA_PHOTOS.map((p, i) => (
            <div key={p} className="relative overflow-hidden rounded-6">
              <img src={`/photos/${p}.jpg`} alt="" className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-label-xs">
                  Upscaled
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Higgsfield ---------------- */
const HF_PRESETS = ["GENERAL", "DOLLY IN", "CRASH ZOOM IN", "FPV DRONE", "360 ORBIT", "WHIP PAN"];

export function HiggsfieldApp() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0a] text-white">
      <div className="flex items-center gap-2 px-4 py-2">
        <img src="/icons/higgsfield.png" alt="" width={16} height={16} className="rounded" />
        <span className="text-label-sm font-semibold">Higgsfield</span>
        <span className="ml-auto rounded-full bg-[#ff2e8b] px-2 py-0.5 text-label-xs font-bold">30% OFF</span>
      </div>
      <div className="flex flex-wrap gap-1.5 px-4 pb-2">
        {HF_PRESETS.map((p, i) => (
          <span
            key={p}
            className={`rounded-4 px-2 py-1 text-[9px] font-semibold tracking-wide ${
              i === 1 ? "bg-[#d6ff3f] text-black" : "border border-[#3a3a3a] bg-[#2a2b2a] text-white/80"
            }`}
          >
            {p}
          </span>
        ))}
      </div>
      <div className="relative mx-4 min-h-0 flex-1 overflow-hidden rounded-8">
        <img src="/photos/p3.jpg" alt="" className="h-full w-full object-cover" />
        <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          <Play size={20} className="ml-0.5" />
        </span>
        <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-label-xs">
          Hero shot · take 3 · 00:06
        </span>
      </div>
      <div className="mx-4 my-3 flex items-center gap-2 rounded-8 bg-[#1e1f1e] p-2">
        <span className="flex rounded-5 bg-[#2a2b2a] p-0.5 text-[9px]">
          <span className="rounded-4 px-1.5 py-0.5 text-white/60"><ImageIcon size={10} /></span>
          <span className="rounded-4 bg-white/15 px-1.5 py-0.5"><Video size={10} /></span>
        </span>
        {["Cinema Studio 3.5", "Auto", "1080p", "8s"].map((c) => (
          <span key={c} className="rounded-4 border border-[#3a3a3a] bg-[#2a2b2a] px-1.5 py-0.5 text-[9px] text-white/80">
            {c}
          </span>
        ))}
        <span className="min-w-0 flex-1 truncate text-label-xs text-white/50">
          slow push-in on the ridge line…
        </span>
        <button
          type="button"
          className="rounded-5 bg-[#d6ff3f] px-3 py-1.5 text-label-xs font-bold text-black"
        >
          GENERATE <span className="font-normal">✦ 80</span>
        </button>
      </div>
    </div>
  );
}

/* ---------------- Google Meet ---------------- */
const MEET_PEEPS = [
  { name: "Aman", img: "/photos/p7.jpg", presenting: false },
  { name: "Iris", img: "/avatars/atlas.png", presenting: true },
  { name: "Muse", img: "/avatars/muse.png", presenting: false },
  { name: "Nova", img: "/avatars/nova.png", presenting: false },
];

export function MeetApp() {
  return (
    <div className="flex h-full flex-col bg-[#202124]">
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 p-3">
        {MEET_PEEPS.map((p, i) => (
          <div
            key={p.name}
            className="relative flex items-center justify-center overflow-hidden rounded-6 bg-[#3c4043]"
          >
            {i === 0 ? (
              <img src={p.img} alt="" className="h-full w-full object-cover" />
            ) : (
              <img src={p.img} alt="" className="h-16 w-16 rounded-full" />
            )}
            <span className="absolute bottom-1.5 left-2 text-label-xs text-white/90">{p.name}</span>
            {p.presenting && (
              <span className="absolute right-2 top-2 rounded-2 bg-[#8ab4f8] px-1.5 py-0.5 text-[9px] font-medium text-[#202124]">
                Presenting
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center px-4 pb-3">
        <span className="text-label-xs text-white">2:04 PM  |  dawn-standup</span>
        <div className="mx-auto flex items-center gap-2">
          {[MicOff, Video, Captions, Hand, MonitorUp, MoreVertical].map((Icon, i) => (
            <span
              key={i}
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                i === 0 ? "bg-[#ea4335]" : "bg-[#3c4043]"
              } text-white`}
            >
              <Icon size={15} />
            </span>
          ))}
          <span className="flex h-9 w-12 items-center justify-center rounded-full bg-[#ea4335] text-white">
            <Phone size={15} className="rotate-[135deg]" />
          </span>
        </div>
        <span className="flex items-center gap-2.5 text-white/70">
          <Info size={15} />
          <Users size={15} />
          <MessageCircle size={15} />
        </span>
      </div>
    </div>
  );
}
