export type TaskStatus = "done" | "running" | "queued";

export type WorkerTask = {
  title: string;
  detail: string;
  status: TaskStatus;
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
  tasks: WorkerTask[];
  windows: WorkerWindow[];
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
    tasks: [
      { title: "Refresh the campaign sheet", detail: "Pulling last week's spend into Campaign Budget · Q3", status: "done" },
      { title: "Digest sources in NotebookLM", detail: "12 sources summarized, audio overview queued", status: "running" },
      { title: "Write the weekly brief", detail: "Insights doc with 3 recommendations", status: "queued" },
      { title: "Send to the team", detail: "Will ask before sharing", status: "queued" },
    ],
    windows: [
      { id: "nova-sheet", connectorId: "google-sheets", kind: "sheet", title: "Campaign Budget · Q3" },
      { id: "nova-nblm", connectorId: "notebooklm", kind: "notebooklm", title: "Q3 Research — 12 sources" },
      { id: "nova-doc", connectorId: "google-docs", kind: "doc", title: "Weekly Insights — Jul 28" },
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
    tasks: [
      { title: "Read the creative brief", detail: "Direction locked: warm dawn palette", status: "done" },
      { title: "Refresh hero frames in Figma", detail: "Hero A carried the lift — iterating", status: "running" },
      { title: "Rebuild banner pack in Canva", detail: "6 sizes from the winning frame", status: "queued" },
      { title: "Hand off to marketing", detail: "Will ask before publishing", status: "queued" },
    ],
    windows: [
      { id: "muse-figma", connectorId: "figma", kind: "figma", title: "Q3 Campaign Concepts" },
      { id: "muse-doc", connectorId: "google-docs", kind: "doc", title: "Creative Brief — Dawn" },
      { id: "muse-canva", connectorId: "canva", kind: "canva", title: "Launch banner pack" },
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
    tasks: [
      { title: "Reproduce the bug", detail: "Race condition in checkout.ts confirmed", status: "done" },
      { title: "Patch in Cursor", detail: "Mutex around the session write", status: "done" },
      { title: "Run the test suite", detail: "142 passing, 3 to go", status: "running" },
      { title: "Open the pull request", detail: "PR #482 — will ask before merging", status: "queued" },
    ],
    windows: [
      { id: "forge-cursor", connectorId: "cursor", kind: "cursor", title: "checkout.ts — imagine-computer" },
      { id: "forge-term", connectorId: "terminal", kind: "terminal", title: "imagine-computer — zsh" },
      { id: "forge-gh", connectorId: "github", kind: "github", title: "PR #482 — Fix checkout race" },
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
    tasks: [
      { title: "Draft launch posts", detail: "9 posts across X and Instagram", status: "done" },
      { title: "Schedule the week in Buffer", detail: "Tue–Fri, peak hours per channel", status: "running" },
      { title: "Prep the launch thread", detail: "Will ask before posting to X", status: "queued" },
      { title: "Monitor replies", detail: "Flag anything that needs a human", status: "queued" },
    ],
    windows: [
      { id: "buzz-buffer", connectorId: "buffer", kind: "buffer", title: "Queue — Launch week" },
      { id: "buzz-ig", connectorId: "instagram", kind: "instagram", title: "@imagine.art" },
      { id: "buzz-x", connectorId: "x", kind: "x", title: "Home — @imagineart" },
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
    tasks: [
      { title: "Generate styleframes", detail: "4 dawn-palette frames in ImagineArt", status: "done" },
      { title: "Animate the hero shot", detail: "Camera push-in via Higgsfield", status: "running" },
      { title: "Cut a 15s teaser", detail: "From the best motion takes", status: "queued" },
      { title: "Review with the team", detail: "Meet at 2 PM — will present takes", status: "queued" },
    ],
    windows: [
      { id: "iris-imagine", connectorId: "imagineart", kind: "imagineart", title: "Dawn styleframes" },
      { id: "iris-higgs", connectorId: "higgsfield", kind: "higgsfield", title: "Hero shot — motion" },
      { id: "iris-meet", connectorId: "meet", kind: "meet", title: "Creative standup" },
    ],
  },
];
