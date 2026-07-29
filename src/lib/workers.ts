export type TaskStatus = "done" | "running" | "queued";

export type WorkerTask = {
  title: string;
  detail: string;
  status: TaskStatus;
  /** teaching-mode hints the agent follows for this step */
  hints?: string[];
};

export type HistoryEntry = {
  title: string;
  when: string;
  connectorId: string;
};

export type AppKind =
  | "doc"
  | "sheet"
  | "gmail"
  | "figma"
  | "notebooklm"
  | "canva"
  | "cursor"
  | "terminal"
  | "github"
  | "buffer"
  | "instagram"
  | "x"
  | "imagineart"
  | "higgsfield"
  | "meet";

export type WorkerWindow = {
  id: string;
  connectorId: string;
  kind: AppKind;
  title: string;
};

export type WorkerAgent = {
  id: string;
  name: string;
  role: string;
  routine: string;
  avatar: string;
  gradient: string; // fallback ring / accents
  wallpaper: string;
  /** role/behaviour note shown at the top of the worklist */
  role_hint: string;
  tasks: WorkerTask[];
  windows: WorkerWindow[];
  history: HistoryEntry[];
};

/* connectors that have a dummy app screen and can be opened from the library */
export const APP_KINDS: Record<string, AppKind> = {
  "google-docs": "doc",
  "google-sheets": "sheet",
  gmail: "gmail",
  figma: "figma",
  notebooklm: "notebooklm",
  canva: "canva",
  cursor: "cursor",
  terminal: "terminal",
  github: "github",
  buffer: "buffer",
  instagram: "instagram",
  x: "x",
  imagineart: "imagineart",
  higgsfield: "higgsfield",
  meet: "meet",
};

export const DEFAULT_TITLES: Record<AppKind, string> = {
  doc: "Untitled document",
  sheet: "Untitled spreadsheet",
  gmail: "Inbox",
  figma: "New file",
  notebooklm: "New notebook",
  canva: "Untitled design",
  cursor: "workspace",
  terminal: "zsh — 80×24",
  github: "Pull requests",
  buffer: "Queue",
  instagram: "Feed",
  x: "Home",
  imagineart: "New generation",
  higgsfield: "New motion",
  meet: "Meeting",
};

export const workers: WorkerAgent[] = [
  {
    id: "nova",
    name: "Nova",
    role: "Main agent",
    routine: "Weekly research digest",
    avatar: "/avatars/nova.png",
    gradient: "linear-gradient(135deg,#be95ff,#6929c4)",
    wallpaper: "/wallpaper-hero.jpg",
    role_hint: "Research analyst. Reads sources, never publishes without asking.",
    tasks: [
      {
        title: "Refresh The Campaign Sheet",
        detail: "Pulling last week's spend into Campaign Budget · Q3",
        status: "done",
        hints: [
          "Use the next unfilled week column in the Q3 sheet until the quarter is complete.",
          "Recompute cost-per-lead after every spend update.",
        ],
      },
      {
        title: "Digest Sources In NotebookLM",
        detail: "12 sources summarized, audio overview queued",
        status: "running",
        hints: [
          "Select all sources before asking for the synthesis.",
          "Keep the citation numbers — every claim in the brief must trace to a source.",
        ],
      },
      {
        title: "Write The Weekly Brief",
        detail: "Insights doc with 3 recommendations",
        status: "queued",
        hints: [
          "Open the existing Weekly Insights doc as the base format.",
          "Lead with what moved, then why, then exactly three recommendations.",
        ],
      },
      {
        title: "Send To The Team",
        detail: "Will ask before sharing",
        status: "queued",
        hints: ["Always ask before sharing outside the workspace."],
      },
    ],
    windows: [
      { id: "nova-sheet", connectorId: "google-sheets", kind: "sheet", title: "Campaign Budget · Q3" },
      { id: "nova-nblm", connectorId: "notebooklm", kind: "notebooklm", title: "Q3 Research — 12 sources" },
      { id: "nova-doc", connectorId: "google-docs", kind: "doc", title: "Weekly Insights — Jul 28" },
    ],
    history: [
      { title: "Reconciled Q2 spend variance", when: "Yesterday, 4:12 PM", connectorId: "google-sheets" },
      { title: "Summarized 8 competitor teardowns", when: "Yesterday, 11:03 AM", connectorId: "notebooklm" },
      { title: "Drafted the July board update", when: "Mon, 9:20 AM", connectorId: "google-docs" },
      { title: "Cleaned duplicate rows in the CRM export", when: "Fri, 2:48 PM", connectorId: "google-sheets" },
    ],
  },
  {
    id: "muse",
    name: "Muse",
    role: "Designer",
    routine: "Brand refresh pass",
    avatar: "/avatars/muse.png",
    gradient: "linear-gradient(135deg,#ffd9c2,#f43f5e)",
    wallpaper: "/wallpaper-hero.jpg",
    role_hint: "Designer. Iterates on brand direction, asks before publishing.",
    tasks: [
      {
        title: "Read The Creative Brief",
        detail: "Direction locked: warm dawn palette",
        status: "done",
        hints: ["Treat the brief's palette as fixed unless the brief itself changes."],
      },
      {
        title: "Refresh Hero Frames In Figma",
        detail: "Hero A carried the lift — iterating",
        status: "running",
        hints: [
          "Duplicate the winning frame before editing so the original stays intact.",
          "Keep every frame on the design system's tokens — no loose hex values.",
        ],
      },
      {
        title: "Rebuild Banner Pack In Canva",
        detail: "6 sizes from the winning frame",
        status: "queued",
        hints: [
          "Export the six standard sizes from the approved hero frame only.",
          "Resize from the largest artboard down to keep type legible.",
        ],
      },
      {
        title: "Hand Off To Marketing",
        detail: "Will ask before publishing",
        status: "queued",
        hints: ["Never publish to a live channel — hand off for review instead."],
      },
    ],
    windows: [
      { id: "muse-figma", connectorId: "figma", kind: "figma", title: "Q3 Campaign Concepts" },
      { id: "muse-doc", connectorId: "google-docs", kind: "doc", title: "Creative Brief — Dawn" },
      { id: "muse-canva", connectorId: "canva", kind: "canva", title: "Launch banner pack" },
    ],
    history: [
      { title: "Shipped the Q3 hero frame set", when: "Yesterday, 5:40 PM", connectorId: "figma" },
      { title: "Rebuilt the pitch deck template", when: "Yesterday, 1:15 PM", connectorId: "canva" },
      { title: "Extracted tokens from the brand kit", when: "Mon, 3:02 PM", connectorId: "figma" },
      { title: "Wrote the visual direction memo", when: "Fri, 10:30 AM", connectorId: "google-docs" },
    ],
  },
  {
    id: "forge",
    name: "Forge",
    role: "Developer",
    routine: "Ship the checkout fix",
    avatar: "/avatars/forge.png",
    gradient: "linear-gradient(135deg,#6fdc8c,#0e6027)",
    wallpaper: "/wallpaper-hero.jpg",
    role_hint: "Engineer. Writes tests first, never merges without approval.",
    tasks: [
      {
        title: "Reproduce The Bug",
        detail: "Race condition in checkout.ts confirmed",
        status: "done",
        hints: ["Write a failing test before touching implementation code."],
      },
      {
        title: "Patch In Cursor",
        detail: "Mutex around the session write",
        status: "done",
        hints: [
          "Scope the lock to the session id, never a global lock.",
          "Add an idempotency key so a retry cannot double-charge.",
        ],
      },
      {
        title: "Run The Test Suite",
        detail: "142 passing, 3 to go",
        status: "running",
        hints: ["The full suite must pass — do not push on a partial run."],
      },
      {
        title: "Open The Pull Request",
        detail: "PR #482 — will ask before merging",
        status: "queued",
        hints: [
          "Summarize the root cause in the PR body, not just the fix.",
          "Never merge to main — a human approves every merge.",
        ],
      },
    ],
    windows: [
      { id: "forge-cursor", connectorId: "cursor", kind: "cursor", title: "checkout.ts — imagine-computer" },
      { id: "forge-term", connectorId: "terminal", kind: "terminal", title: "imagine-computer — zsh" },
      { id: "forge-gh", connectorId: "github", kind: "github", title: "PR #482 — Fix checkout race" },
    ],
    history: [
      { title: "Merged PR #479 — retry backoff", when: "Yesterday, 6:02 PM", connectorId: "github" },
      { title: "Cut the 2.4.1 release", when: "Yesterday, 2:20 PM", connectorId: "terminal" },
      { title: "Refactored the session store", when: "Mon, 4:45 PM", connectorId: "cursor" },
      { title: "Fixed a flaky checkout test", when: "Mon, 10:08 AM", connectorId: "cursor" },
    ],
  },
  {
    id: "buzz",
    name: "Buzz",
    role: "Social marketer",
    routine: "Launch week rollout",
    avatar: "/avatars/buzz.png",
    gradient: "linear-gradient(135deg,#fddc69,#b28600)",
    wallpaper: "/wallpaper-hero.jpg",
    role_hint: "Social marketer. Drafts freely, posts only with approval.",
    tasks: [
      {
        title: "Draft Launch Posts",
        detail: "9 posts across X and Instagram",
        status: "done",
        hints: ["Write per channel — never reuse the same copy across platforms."],
      },
      {
        title: "Schedule The Week In Buffer",
        detail: "Tue–Fri, peak hours per channel",
        status: "running",
        hints: [
          "Use each channel's own peak window rather than one shared time.",
          "Leave the 4:00 PM slot open for reactive posts.",
        ],
      },
      {
        title: "Prep The Launch Thread",
        detail: "Will ask before posting to X",
        status: "queued",
        hints: ["Hold the thread as a draft — posting needs sign-off."],
      },
      {
        title: "Monitor Replies",
        detail: "Flag anything that needs a human",
        status: "queued",
        hints: ["Escalate anything about pricing, outages, or press. Never reply on those."],
      },
    ],
    windows: [
      { id: "buzz-buffer", connectorId: "buffer", kind: "buffer", title: "Queue — Launch week" },
      { id: "buzz-ig", connectorId: "instagram", kind: "instagram", title: "@imagine.art" },
      { id: "buzz-x", connectorId: "x", kind: "x", title: "Home — @imagineart" },
    ],
    history: [
      { title: "Scheduled 14 posts for launch week", when: "Yesterday, 5:11 PM", connectorId: "buffer" },
      { title: "Replied to 22 comments", when: "Yesterday, 12:40 PM", connectorId: "instagram" },
      { title: "Published the teaser thread", when: "Mon, 9:05 AM", connectorId: "x" },
      { title: "Pulled last week's engagement report", when: "Fri, 4:30 PM", connectorId: "buffer" },
    ],
  },
  {
    id: "iris",
    name: "Iris",
    role: "Creative",
    routine: "Dawn campaign film",
    avatar: "/avatars/atlas.png",
    gradient: "linear-gradient(135deg,#8ec5ff,#1e4fd6)",
    wallpaper: "/wallpaper-hero.jpg",
    role_hint: "Creative. Generates and edits, presents takes for review.",
    tasks: [
      {
        title: "Generate Styleframes",
        detail: "4 dawn-palette frames in ImagineArt",
        status: "done",
        hints: ["Stay inside the dawn palette from the brief on every generation."],
      },
      {
        title: "Animate The Hero Shot",
        detail: "Camera push-in via Higgsfield",
        status: "running",
        hints: [
          "Use the upscaled styleframe as the input image, not the draft.",
          "One camera move per take — do not stack motions.",
        ],
      },
      {
        title: "Cut A 15s Teaser",
        detail: "From the best motion takes",
        status: "queued",
        hints: ["Cut only from approved takes; keep it under 15 seconds."],
      },
      {
        title: "Review With The Team",
        detail: "Meet at 2 PM — will present takes",
        status: "queued",
        hints: ["Present alternatives, do not pick the final cut alone."],
      },
    ],
    windows: [
      { id: "iris-imagine", connectorId: "imagineart", kind: "imagineart", title: "Dawn styleframes" },
      { id: "iris-higgs", connectorId: "higgsfield", kind: "higgsfield", title: "Hero shot — motion" },
      { id: "iris-meet", connectorId: "meet", kind: "meet", title: "Creative standup" },
    ],
    history: [
      { title: "Upscaled 6 dawn styleframes", when: "Yesterday, 7:22 PM", connectorId: "imagineart" },
      { title: "Rendered 3 orbit takes", when: "Yesterday, 3:50 PM", connectorId: "higgsfield" },
      { title: "Presented the concept reel", when: "Mon, 2:00 PM", connectorId: "meet" },
      { title: "Generated the product hero set", when: "Fri, 11:15 AM", connectorId: "imagineart" },
    ],
  },
];
