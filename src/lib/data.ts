export type Connector = {
  id: string;
  name: string;
  category: "docs" | "design" | "comms" | "data" | "media";
  monogram: string;
  brand: string; // brand tint, used as fallback when no icon renders
  icon: string; // real product icon in /public/icons
  connected: boolean;
  actions: number; // granular actions exposed to the agent
};

export const connectors: Connector[] = [
  { id: "google-docs", name: "Google Docs", category: "docs", monogram: "D", brand: "#4285F4", icon: "/icons/docs.png", connected: true, actions: 24 },
  { id: "google-sheets", name: "Google Sheets", category: "data", monogram: "S", brand: "#0F9D58", icon: "/icons/sheets.png", connected: true, actions: 31 },
  { id: "figma", name: "Figma", category: "design", monogram: "F", brand: "#A259FF", icon: "/icons/figma.png", connected: true, actions: 18 },
  { id: "figjam", name: "FigJam", category: "design", monogram: "J", brand: "#FF7262", icon: "/icons/figjam.png", connected: true, actions: 9 },
  { id: "gamma", name: "Gamma", category: "docs", monogram: "G", brand: "#7C3AED", icon: "/icons/gamma.png", connected: false, actions: 12 },
  { id: "notion", name: "Notion", category: "docs", monogram: "N", brand: "#111111", icon: "/icons/notion.png", connected: false, actions: 27 },
  { id: "slack", name: "Slack", category: "comms", monogram: "S", brand: "#611F69", icon: "/icons/slack.png", connected: true, actions: 22 },
  { id: "gmail", name: "Gmail", category: "comms", monogram: "M", brand: "#EA4335", icon: "/icons/gmail.png", connected: false, actions: 19 },
  { id: "drive", name: "Google Drive", category: "data", monogram: "D", brand: "#FBBC04", icon: "/icons/drive.png", connected: true, actions: 16 },
  { id: "youtube", name: "YouTube", category: "media", monogram: "Y", brand: "#FF0000", icon: "/icons/youtube.png", connected: false, actions: 8 },
  { id: "canva", name: "Canva", category: "design", monogram: "C", brand: "#00C4CC", icon: "/icons/canva.png", connected: false, actions: 14 },
  { id: "linear", name: "Linear", category: "data", monogram: "L", brand: "#5E6AD2", icon: "/icons/linear.png", connected: false, actions: 21 },
  { id: "google-slides", name: "Google Slides", category: "docs", monogram: "S", brand: "#F4B400", icon: "/icons/slides.png", connected: false, actions: 15 },
  { id: "google-calendar", name: "Google Calendar", category: "data", monogram: "C", brand: "#4285F4", icon: "/icons/calendar.png", connected: false, actions: 11 },
  { id: "notebooklm", name: "NotebookLM", category: "docs", monogram: "N", brand: "#1A73E8", icon: "/icons/notebooklm.png", connected: true, actions: 9 },
  { id: "cursor", name: "Cursor", category: "data", monogram: "C", brand: "#0F0F0F", icon: "/icons/cursor.png", connected: true, actions: 17 },
  { id: "terminal", name: "Terminal", category: "data", monogram: "T", brand: "#1A1D20", icon: "/icons/terminal.svg", connected: true, actions: 12 },
  { id: "github", name: "GitHub", category: "data", monogram: "G", brand: "#24292F", icon: "/icons/github.png", connected: true, actions: 28 },
  { id: "buffer", name: "Buffer", category: "comms", monogram: "B", brand: "#231F20", icon: "/icons/buffer.png", connected: true, actions: 13 },
  { id: "instagram", name: "Instagram", category: "media", monogram: "I", brand: "#E1306C", icon: "/icons/instagram.png", connected: true, actions: 10 },
  { id: "x", name: "X", category: "media", monogram: "X", brand: "#0F1419", icon: "/icons/x.png", connected: true, actions: 14 },
  { id: "imagineart", name: "ImagineArt", category: "design", monogram: "I", brand: "#8A3FFC", icon: "/icons/imagineart.png", connected: true, actions: 26 },
  { id: "higgsfield", name: "Higgsfield", category: "media", monogram: "H", brand: "#101014", icon: "/icons/higgsfield.png", connected: true, actions: 11 },
  { id: "meet", name: "Google Meet", category: "comms", monogram: "M", brand: "#00897B", icon: "/icons/meet.png", connected: true, actions: 8 },
];

export type StepStatus = "done" | "running" | "queued" | "approval";

export type RoutineStep = {
  id: string;
  title: string;
  detail: string;
  connectorId: string;
  output: string;
  needsApproval: boolean;
};

export type Routine = {
  id: string;
  name: string;
  description: string;
  schedule: string;
  trigger: "schedule" | "event" | "manual";
  steps: RoutineStep[];
  lastRun: string;
  status: "active" | "paused" | "draft";
  connectorIds: string[];
};

export const weeklyDesignBrief: Routine = {
  id: "weekly-design-brief",
  name: "Weekly design brief",
  description:
    "Pull the latest campaign numbers, write the insights doc, map it on a whiteboard, and refresh the Figma concepts — every Monday before standup.",
  schedule: "Mondays · 8:30 AM",
  trigger: "schedule",
  status: "active",
  lastRun: "Today, 8:30 AM",
  connectorIds: ["google-sheets", "google-docs", "figjam", "figma", "slack"],
  steps: [
    {
      id: "s1",
      title: "Refresh the campaign sheet",
      detail: "Pull last week's spend and conversion numbers into “Campaign Budget · Q3”, recompute cost-per-lead.",
      connectorId: "google-sheets",
      output: "Campaign Budget · Q3.xlsx",
      needsApproval: false,
    },
    {
      id: "s2",
      title: "Write the insights doc",
      detail: "Summarize what moved and why into “Weekly Insights”, with three recommendations.",
      connectorId: "google-docs",
      output: "Weekly Insights — Jul 28.doc",
      needsApproval: false,
    },
    {
      id: "s3",
      title: "Map insights on the whiteboard",
      detail: "Turn the recommendations into a FigJam flow the team can react to.",
      connectorId: "figjam",
      output: "Sprint 32 — insight map",
      needsApproval: false,
    },
    {
      id: "s4",
      title: "Refresh design concepts",
      detail: "Update the hero frames in “Q3 Campaign Concepts” to reflect the winning direction.",
      connectorId: "figma",
      output: "Q3 Campaign Concepts · 3 frames",
      needsApproval: true,
    },
    {
      id: "s5",
      title: "Post the summary to #design",
      detail: "Share links to the doc, board, and frames with a two-line summary.",
      connectorId: "slack",
      output: "#design · summary message",
      needsApproval: true,
    },
  ],
};

export const routines: Routine[] = [
  weeklyDesignBrief,
  {
    id: "content-repurpose",
    name: "Blog → everywhere",
    description: "When a post publishes, draft the deck, the thread, and the newsletter blurb.",
    schedule: "When a new post publishes",
    trigger: "event",
    status: "active",
    lastRun: "Fri, 4:12 PM",
    connectorIds: ["notion", "gamma", "slack"],
    steps: [],
  },
  {
    id: "asset-handoff",
    name: "Asset handoff pack",
    description: "Collect final frames, export at 1x/2x, file them in Drive, and notify the channel.",
    schedule: "Manual",
    trigger: "manual",
    status: "paused",
    lastRun: "Jul 21",
    connectorIds: ["figma", "drive", "slack"],
    steps: [],
  },
];

export type Template = {
  id: string;
  name: string;
  description: string;
  connectorIds: string[];
  category: "Creative" | "Content" | "Ops";
  popular?: boolean;
};

export const templates: Template[] = [
  {
    id: "t1",
    name: "Sheet → Doc → Board → Figma",
    description: "Numbers become an insights doc, a whiteboard map, and refreshed design frames.",
    connectorIds: ["google-sheets", "google-docs", "figjam", "figma"],
    category: "Creative",
    popular: true,
  },
  {
    id: "t2",
    name: "Product sheet → campaign kit",
    description: "One product sheet becomes ad visuals, a landing draft, and a launch deck.",
    connectorIds: ["google-sheets", "canva", "gamma"],
    category: "Creative",
    popular: true,
  },
  {
    id: "t3",
    name: "Moodboard → styleframes",
    description: "A FigJam moodboard becomes structured Figma styleframes with tokens applied.",
    connectorIds: ["figjam", "figma"],
    category: "Creative",
  },
  {
    id: "t4",
    name: "Meeting → action board",
    description: "Meeting notes become tickets, owners, and a priority board.",
    connectorIds: ["google-docs", "linear", "slack"],
    category: "Ops",
  },
  {
    id: "t5",
    name: "Video → clip plan",
    description: "A long video becomes a timestamped clip plan with hooks and captions.",
    connectorIds: ["youtube", "google-docs"],
    category: "Content",
  },
  {
    id: "t6",
    name: "Weekly channel digest",
    description: "Summarize what mattered in your channels into one Monday brief.",
    connectorIds: ["slack", "gmail", "google-docs"],
    category: "Ops",
  },
];

export type Run = {
  id: string;
  routineName: string;
  started: string;
  duration: string;
  status: "succeeded" | "needs-approval" | "failed" | "running";
  stepsDone: number;
  stepsTotal: number;
};

export const runs: Run[] = [
  { id: "r1", routineName: "Weekly design brief", started: "Today, 8:30 AM", duration: "4m 12s", status: "needs-approval", stepsDone: 3, stepsTotal: 5 },
  { id: "r2", routineName: "Blog → everywhere", started: "Fri, 4:12 PM", duration: "2m 40s", status: "succeeded", stepsDone: 3, stepsTotal: 3 },
  { id: "r3", routineName: "Weekly design brief", started: "Mon Jul 21, 8:30 AM", duration: "3m 58s", status: "succeeded", stepsDone: 5, stepsTotal: 5 },
  { id: "r4", routineName: "Asset handoff pack", started: "Mon Jul 21, 2:04 PM", duration: "1m 22s", status: "failed", stepsDone: 1, stepsTotal: 4 },
  { id: "r5", routineName: "Blog → everywhere", started: "Thu Jul 17, 11:03 AM", duration: "2m 51s", status: "succeeded", stepsDone: 3, stepsTotal: 3 },
];

export function connectorById(id: string): Connector {
  const c = connectors.find((c) => c.id === id);
  if (!c) throw new Error(`unknown connector: ${id}`);
  return c;
}
