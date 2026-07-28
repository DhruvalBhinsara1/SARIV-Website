import { cn } from "@/lib/utils";

type BadgeColor = "primary" | "muted" | "success" | "error" | "warning" | "info";

// Adapted from a TailAdmin-style badge component, restyled to SARIV's tokens.
const COLOR_STYLES: Record<BadgeColor, string> = {
  primary: "bg-primary text-surface",
  muted: "bg-surface-elevated text-secondary",
  success: "bg-success/10 text-success",
  error: "bg-error/10 text-error",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
};

export function Badge({
  color = "muted",
  children,
  className,
}: {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide",
        COLOR_STYLES[color],
        className
      )}
    >
      {children}
    </span>
  );
}
