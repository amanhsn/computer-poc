/* Dummy app screens for the desktop experience — recognizable, not pixel-
   perfect clones. Each renders inside AppWindow chrome. */
/* eslint-disable @next/next/no-img-element */

import { Search, Menu, Star, Square, MousePointer2, Type, Hand } from "lucide-react";
import { connectorById } from "@/lib/data";
import type { WorkerWindow } from "@/lib/workers";
import {
  NotebookLMApp,
  CanvaApp,
  CursorApp,
  TerminalApp,
  GitHubApp,
  BufferApp,
  InstagramApp,
  XApp,
  ImagineArtApp,
  HiggsfieldApp,
  MeetApp,
} from "./app-screens";

export function AppWindow({
  win,
  onMinimize,
  onClose,
  onMaximize,
  chromeless = false,
}: {
  win: WorkerWindow;
  onMinimize?: () => void;
  onClose?: () => void;
  onMaximize?: () => void;
  chromeless?: boolean;
}) {
  const c = connectorById(win.connectorId);
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-6 bg-raised shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-subtle bg-[#f1f1f3]/95 px-3">
        {!chromeless && (
          <span className="group mr-1 flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Close window"
              onClick={onClose}
              className="h-3 w-3 rounded-full bg-[#ff5f57] transition-transform hover:scale-110"
            />
            <button
              type="button"
              aria-label="Minimize to overview"
              onClick={onMinimize}
              className="h-3 w-3 rounded-full bg-[#febc2e] transition-transform hover:scale-110"
            />
            <button
              type="button"
              aria-label="Maximize window"
              onClick={onMaximize}
              className="h-3 w-3 rounded-full bg-[#28c840] transition-transform hover:scale-110"
            />
          </span>
        )}
        <img src={c.icon} alt="" width={14} height={14} className="rounded-[3px]" />
        <span className="truncate text-label-sm font-medium text-content-secondary">
          {win.title}
        </span>
      </div>
      <div className="min-h-0 flex-1">
        {win.kind === "doc" && <DocApp title={win.title} />}
        {win.kind === "sheet" && <SheetApp />}
        {win.kind === "gmail" && <GmailApp />}
        {win.kind === "figma" && <FigmaApp />}
        {win.kind === "notebooklm" && <NotebookLMApp />}
        {win.kind === "canva" && <CanvaApp />}
        {win.kind === "cursor" && <CursorApp />}
        {win.kind === "terminal" && <TerminalApp />}
        {win.kind === "github" && <GitHubApp />}
        {win.kind === "buffer" && <BufferApp />}
        {win.kind === "instagram" && <InstagramApp />}
        {win.kind === "x" && <XApp />}
        {win.kind === "imagineart" && <ImagineArtApp />}
        {win.kind === "higgsfield" && <HiggsfieldApp />}
        {win.kind === "meet" && <MeetApp />}
      </div>
    </div>
  );
}

/* ---------------- Google Docs ---------------- */
function DocApp({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col bg-[#f8f9fa]">
      <div className="flex items-center gap-2 px-4 pt-2">
        <img src="/icons/docs.png" alt="" width={22} height={22} />
        <div>
          <p className="text-body-sm font-medium text-content">{title.split(" — ")[0]}</p>
          <p className="text-label-xs text-content-tertiary">
            File&ensp;Edit&ensp;View&ensp;Insert&ensp;Format&ensp;Tools&ensp;Extensions&ensp;Help
          </p>
        </div>
      </div>
      <div className="mx-4 mt-2 flex h-8 items-center gap-3 rounded-full bg-[#edf2fa] px-4 text-label-xs text-content-secondary">
        <span>100%</span><span>Normal text</span><span>Arial</span><span>11</span>
        <span className="font-bold">B</span><span className="italic">I</span><span className="underline">U</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden px-10 py-4">
        <div className="mx-auto h-full max-w-[560px] rounded-2 bg-white px-10 py-8 shadow-xs">
          <h2 className="text-heading-xs font-semibold text-content">Weekly Insights</h2>
          <p className="mt-1 text-label-xs text-content-tertiary">Generated from Campaign Budget · Q3</p>
          <p className="mt-4 text-body-sm leading-6 text-content-secondary">
            Cost-per-lead dropped 18% after the creative refresh; short-form
            placements outperformed static by 2.3×. Spend is pacing 4% under
            budget with two weeks left in the flight.
          </p>
          <p className="mt-3 text-body-sm leading-6 text-content-secondary">
            Recommended next steps: shift 15% of static budget into short-form,
            iterate the Hero A direction, and refresh landing visuals to match
            the winning creative.
          </p>
          <span className="mt-3 inline-block h-4 w-0.5 animate-pulse bg-content" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Google Sheets ---------------- */
const SHEET_ROWS = [
  ["Meta — short form", "12,400", "3,120", "1.9%", "$4.02"],
  ["Meta — static", "8,150", "1,240", "0.9%", "$6.57"],
  ["YouTube pre-roll", "22,900", "2,010", "1.1%", "$5.44"],
  ["TikTok spark ads", "18,300", "4,480", "2.6%", "$3.11"],
  ["Search — brand", "3,900", "1,860", "4.8%", "$2.09"],
  ["Search — generic", "7,700", "1,090", "1.4%", "$7.06"],
];

function SheetApp() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 px-4 pt-2">
        <img src="/icons/sheets.png" alt="" width={22} height={22} />
        <div>
          <p className="text-body-sm font-medium text-content">Campaign Budget · Q3</p>
          <p className="text-label-xs text-content-tertiary">
            File&ensp;Edit&ensp;View&ensp;Insert&ensp;Format&ensp;Data&ensp;Tools&ensp;Help
          </p>
        </div>
      </div>
      <div className="mx-4 mt-2 flex h-7 items-center gap-2 rounded-2 border border-subtle px-2 text-label-xs text-content-tertiary">
        <span className="font-medium text-content-secondary">C4</span>
        <span className="text-content-tertiary">fx</span>
        <span>=B4*0.18</span>
      </div>
      <div className="mt-2 min-h-0 flex-1 overflow-hidden">
        <table className="w-full border-collapse text-label-sm">
          <thead>
            <tr className="bg-[#e6f4ea] text-content">
              {["", "Channel", "Impressions", "Leads", "CVR", "CPL"].map((h, i) => (
                <th key={i} className="border border-[#dadce0] px-2 py-1 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SHEET_ROWS.map((row, r) => (
              <tr key={r}>
                <td className="w-8 border border-[#dadce0] bg-[#f8f9fa] px-2 py-1 text-center text-content-tertiary">
                  {r + 1}
                </td>
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`border border-[#dadce0] px-2 py-1 tabular-nums ${
                      r === 3 && i === 4 ? "bg-[#e8f0fe] outline outline-2 outline-[#1a73e8]" : ""
                    } ${i === 0 ? "text-content" : "text-content-secondary"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Gmail ---------------- */
const MAILS = [
  ["Delta Enterprises", "Weekly news — safety tips before you fly", "8:02 AM", true],
  ["Figma", "Aman, your file was updated by Nova", "7:48 AM", true],
  ["Stripe", "Your July invoice is available", "7:15 AM", false],
  ["Epsilon Solutions", "Industry trends and best practices", "Jul 28", false],
  ["Tech Savvy", "Are you ready this year? Popular gadgets review", "Jul 28", false],
  ["Foodie Finds", "Our complete list of recipe ideas", "Jul 27", false],
] as const;

function GmailApp() {
  return (
    <div className="flex h-full bg-white">
      <div className="w-40 shrink-0 border-r border-subtle bg-[#f8fafd] p-3">
        <span className="flex h-9 w-fit items-center gap-2 rounded-8 bg-[#c2e7ff] px-4 text-label-sm font-medium text-content">
          Compose
        </span>
        <ul className="mt-3 flex flex-col gap-0.5 text-label-sm text-content-secondary">
          <li className="flex justify-between rounded-full bg-[#d3e3fd] px-3 py-1 font-medium text-content">
            <span>Inbox</span><span>14</span>
          </li>
          <li className="px-3 py-1">Starred</li>
          <li className="px-3 py-1">Sent</li>
          <li className="px-3 py-1">Drafts</li>
        </ul>
      </div>
      <div className="min-w-0 flex-1">
        <div className="m-3 flex h-9 items-center gap-2 rounded-full bg-[#eaf1fb] px-4">
          <Search size={14} className="text-content-secondary" />
          <span className="text-label-sm text-content-tertiary">Search mail</span>
        </div>
        <ul>
          {MAILS.map(([from, subject, time, unread], i) => (
            <li
              key={i}
              className={`flex items-center gap-3 border-b border-subtle px-4 py-2 text-label-sm ${
                unread ? "bg-white font-medium text-content" : "bg-[#f7f9fc] text-content-secondary"
              }`}
            >
              <Square size={12} className="shrink-0 text-content-tertiary" />
              <Star size={12} className="shrink-0 text-content-tertiary" />
              <span className="w-28 shrink-0 truncate">{from}</span>
              <span className="min-w-0 flex-1 truncate">{subject}</span>
              <span className="shrink-0 text-label-xs text-content-tertiary">{time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- Figma ---------------- */
function FigmaApp() {
  return (
    <div className="flex h-full bg-[#1e1e1e] text-white">
      <div className="w-36 shrink-0 border-r border-white/10 p-3">
        <div className="flex items-center gap-2">
          <Menu size={12} className="text-white/60" />
          <img src="/icons/figma.png" alt="" width={14} height={14} />
        </div>
        <p className="mt-3 text-label-xs font-medium text-white/50">LAYERS</p>
        <ul className="mt-1 flex flex-col gap-1 text-label-sm text-white/80">
          <li className="rounded-2 bg-white/10 px-2 py-0.5"># Hero A</li>
          <li className="px-2 py-0.5"># Hero B</li>
          <li className="px-2 py-0.5"># Hero C</li>
          <li className="px-2 py-0.5">◇ CTA / primary</li>
        </ul>
      </div>
      <div className="relative min-w-0 flex-1 overflow-hidden bg-[#2c2c2c]">
        <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-3 rounded-6 bg-[#1e1e1e] px-3 py-1.5">
          <MousePointer2 size={13} className="text-[#0d99ff]" />
          <Square size={13} className="text-white/60" />
          <Type size={13} className="text-white/60" />
          <Hand size={13} className="text-white/60" />
        </div>
        <div className="flex h-full items-center justify-center gap-6 p-8 pt-14">
          {[
            { f: "Hero A", img: "/photos/p4.jpg" },
            { f: "Hero B", img: "/photos/p1.jpg" },
            { f: "Hero C", img: "/photos/p2.jpg" },
          ].map(({ f, img }, i) => (
            <div key={f} className="flex flex-col gap-1">
              <span className="text-label-xs text-white/50">{f}</span>
              <div
                className={`relative h-40 w-32 overflow-hidden rounded-3 ${
                  i === 0 ? "outline outline-2 outline-[#0d99ff]" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <div className="h-1.5 w-16 rounded-full bg-white/80" />
                  <div className="mt-1 h-1.5 w-10 rounded-full bg-white/50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
