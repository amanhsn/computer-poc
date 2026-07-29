"use client";

import { useState, type ReactNode } from "react";
import { Plus, Mic, ArrowUp, ChevronDown } from "lucide-react";

/* Double-shell prompt box from the Figma "Prompt-with-Todo" component:
   grey #f7f7f7 outer shell (radius 24) that also docks the todo/progress
   tray, wrapping the white inner card (radius 24). */
export function PromptBox({
  tray,
  placeholder = "Ask anything ...",
}: {
  tray?: ReactNode;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-11 border border-subtle bg-canvas shadow-xs">
        {tray}
        <div className="flex flex-col gap-2 rounded-11 border border-subtle bg-raised p-3">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="h-8 w-full bg-transparent px-1 text-body-md text-content outline-none placeholder:text-content-tertiary"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Attach"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-fill-secondary"
            >
              <Plus size={18} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="flex h-8 items-center gap-1 rounded-full px-2.5 text-label-md font-medium text-content"
            >
              Ultra
              <ChevronDown size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              aria-label={value ? "Send" : "Voice input"}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-inverse text-on-fill"
            >
              {value ? (
                <ArrowUp size={18} strokeWidth={1.8} />
              ) : (
                <Mic size={18} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Disclaimer() {
  return (
    <p className="bg-gradient-to-b from-white/50 to-white px-4 pb-2 pt-3 text-center text-body-xs text-content-tertiary backdrop-blur-sm">
      Computer can make mistakes. Check important info.
    </p>
  );
}
