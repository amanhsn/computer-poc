import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

/* Pill button system from the Chatly screens: h-32, px-10 py-6, radius 12,
   label-md medium. Brand tint swapped from Chatly blue to Zenith purple. */
export function PillButton({
  children,
  variant = "neutral",
  className = "",
}: {
  children: ReactNode;
  variant?: "brand" | "neutral" | "inverse" | "ghost";
  className?: string;
}) {
  const variants = {
    brand: "bg-accent-tint text-accent",
    neutral: "bg-fill-secondary text-content",
    inverse: "bg-inverse text-on-fill",
    ghost: "text-content hover:bg-canvas",
  } as const;
  return (
    <button
      type="button"
      className={`inline-flex h-8 items-center gap-1.5 rounded-6 px-2.5 text-label-md font-medium whitespace-nowrap ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function IconButton({
  icon: Icon,
  label,
  variant = "bordered",
  size = 32,
  className = "",
}: {
  icon: ComponentType<LucideProps>;
  label: string;
  variant?: "bordered" | "filled" | "inverse" | "glass";
  size?: number;
  className?: string;
}) {
  const variants = {
    bordered: "border border-default bg-raised rounded-6",
    filled: "bg-fill-secondary rounded-full",
    inverse: "bg-inverse text-on-fill rounded-full",
    glass: "bg-white/60 backdrop-blur-sm border border-default rounded-full",
  } as const;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex shrink-0 items-center justify-center ${variants[variant]} ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon size={size >= 32 ? 18 : 14} strokeWidth={1.8} />
    </button>
  );
}

/* Suggestion chip: #f5f5f5 pill, radius 35, px-12 py-4 */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-full bg-chip px-3 py-1 text-body-md text-content whitespace-nowrap hover:bg-fill-secondary"
    >
      {children}
    </button>
  );
}

/* Connector monogram tile — stands in for brand icons in the POC */
export function Monogram({
  letter,
  brand,
  size = 24,
  radius = 6,
}: {
  letter: string;
  brand: string;
  size?: number;
  radius?: number;
}) {
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center font-semibold text-white"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: brand,
        fontSize: Math.round(size * 0.5),
        lineHeight: 1,
      }}
    >
      {letter}
    </span>
  );
}

export function StatusPill({
  kind,
  children,
}: {
  kind: "ok" | "warn" | "danger" | "neutral" | "accent";
  children: ReactNode;
}) {
  const kinds = {
    ok: "bg-ok-surface text-ok",
    warn: "bg-warn-surface text-warn",
    danger: "bg-danger-surface text-danger",
    neutral: "bg-fill-secondary text-content-secondary",
    accent: "bg-accent-tint text-accent",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-label-sm font-medium ${kinds[kind]}`}
    >
      {children}
    </span>
  );
}
