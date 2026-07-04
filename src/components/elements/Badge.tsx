import type { ReactNode } from "react";

/**
 * Badge colours — Bootstrap naming convention, Tailwind palette values.
 */
export type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

/**
 * Per-colour classes. `flat` is the tinted (bg-50) style; `border` is the
 * outline style (no fill, stronger ring). Both carry dark-mode counterparts.
 * `dot` is the status-dot fill. Written out in full so Tailwind sees every
 * class name. Names follow Bootstrap; the values are Tailwind colours.
 */
const COLORS: Record<BadgeColor, { flat: string; border: string; dot: string }> =
  {
    primary: {
      flat: "bg-blue-50 text-blue-700 inset-ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:inset-ring-blue-400/30",
      border:
        "text-blue-700 inset-ring-blue-700/20 dark:text-blue-400 dark:inset-ring-blue-400/30",
      dot: "fill-blue-500",
    },
    secondary: {
      flat: "bg-gray-50 text-gray-600 inset-ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:inset-ring-gray-400/20",
      border:
        "text-gray-600 inset-ring-gray-500/10 dark:text-gray-400 dark:inset-ring-gray-400/20",
      dot: "fill-gray-400",
    },
    success: {
      flat: "bg-green-50 text-green-700 inset-ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:inset-ring-green-500/20",
      border:
        "text-green-700 inset-ring-green-600/30 dark:text-green-400 dark:inset-ring-green-500/30",
      dot: "fill-green-500",
    },
    danger: {
      flat: "bg-red-50 text-red-700 inset-ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:inset-ring-red-400/20",
      border:
        "text-red-700 inset-ring-red-600/20 dark:text-red-400 dark:inset-ring-red-400/30",
      dot: "fill-red-500",
    },
    warning: {
      flat: "bg-yellow-50 text-yellow-800 inset-ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:inset-ring-yellow-400/20",
      border:
        "text-yellow-800 inset-ring-yellow-600/30 dark:text-yellow-500 dark:inset-ring-yellow-400/30",
      dot: "fill-yellow-500",
    },
    info: {
      flat: "bg-cyan-50 text-cyan-700 inset-ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:inset-ring-cyan-400/30",
      border:
        "text-cyan-700 inset-ring-cyan-600/30 dark:text-cyan-300 dark:inset-ring-cyan-400/30",
      dot: "fill-cyan-500",
    },
    light: {
      flat: "bg-zinc-50 text-zinc-600 inset-ring-zinc-300/60 dark:bg-white/5 dark:text-zinc-300 dark:inset-ring-zinc-700",
      border:
        "text-zinc-600 inset-ring-zinc-300/60 dark:text-zinc-300 dark:inset-ring-zinc-700",
      dot: "fill-zinc-400",
    },
    dark: {
      flat: "bg-zinc-800 text-zinc-100 inset-ring-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:inset-ring-zinc-300",
      border:
        "text-zinc-800 inset-ring-zinc-400/40 dark:text-zinc-200 dark:inset-ring-zinc-600",
      dot: "fill-zinc-500",
    },
  };

/**
 * Props for the {@link Badge} component.
 *
 * @property color     - One of eight Bootstrap-named colours. Default `"primary"`.
 * @property variant   - `"flat"` (tinted fill) or `"border"` (outline only).
 * @property size      - `"md"` (default) or `"sm"`.
 * @property pill      - Fully rounded (rounded-full) instead of rounded-md.
 * @property dot       - Show a small leading status dot.
 * @property onRemove  - When provided, renders a trailing ✕ remove button.
 * @property children  - The badge label.
 * @property className - Extra classes merged onto the badge.
 */
export interface BadgeProps {
  color?: BadgeColor;
  variant?: "flat" | "border";
  size?: "sm" | "md";
  pill?: boolean;
  dot?: boolean;
  onRemove?: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * Badge
 * -----
 * A small inline label. Bootstrap colour naming (primary, secondary, success,
 * danger, warning, info, light, dark) with Tailwind palette values. Supports
 * flat and outline styles, an optional status dot, and a remove button.
 *
 * @example
 * ```tsx
 * import Badge from "@/components/elements/Badge";
 *
 * <Badge color="success">Active</Badge>
 * <Badge color="primary" pill dot>Online</Badge>
 * <Badge color="danger" onRemove={() => remove(id)}>Tag</Badge>
 * ```
 */
export default function Badge({
  color = "primary",
  variant = "flat",
  size = "md",
  pill = false,
  dot = false,
  onRemove,
  children,
  className = "",
}: BadgeProps) {
  const shape = pill ? "rounded-full" : "rounded-md";
  const sizing = size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-xs";
  const colorClass =
    variant === "border" ? COLORS[color].border : COLORS[color].flat;

  return (
    <span
      className={`inline-flex items-center gap-x-1.5 font-medium inset-ring ${shape} ${sizing} ${colorClass} ${className}`}
    >
      {dot && (
        <svg
          viewBox="0 0 6 6"
          aria-hidden="true"
          className={`size-1.5 ${COLORS[color].dot}`}
        >
          <circle cx={3} cy={3} r={3} />
        </svg>
      )}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="group relative -mr-0.5 ml-0.5 size-3.5 rounded-sm hover:bg-black/10 dark:hover:bg-white/15"
        >
          <span className="sr-only">Remove</span>
          <svg
            viewBox="0 0 14 14"
            className="size-3.5 stroke-current opacity-60 group-hover:opacity-100"
          >
            <path d="M4 4l6 6m0-6l-6 6" strokeWidth={1.5} />
          </svg>
        </button>
      )}
    </span>
  );
}

const BADGE_COLORS: BadgeColor[] = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Badge") and renders each variant's demo + code.
 */
export const badgeElement = {
  name: "Badge",
  variants: [
    {
      name: "Flat",
      description:
        "Rounded badges in eight Bootstrap-named colours (Tailwind values).",
      demo: (
        <div className="flex flex-wrap gap-2">
          {BADGE_COLORS.map((c) => (
            <Badge key={c} color={c}>
              {c}
            </Badge>
          ))}
        </div>
      ),
      code: `import Badge from "@/components/elements/Badge";

<Badge color="primary">Badge</Badge>
<Badge color="success">Badge</Badge>
<Badge color="danger">Badge</Badge>
// also: secondary, warning, info, light, dark`,
    },
    {
      name: "Pill",
      description: "Fully rounded badges — pass the `pill` prop.",
      demo: (
        <div className="flex flex-wrap gap-2">
          {BADGE_COLORS.map((c) => (
            <Badge key={c} color={c} pill>
              {c}
            </Badge>
          ))}
        </div>
      ),
      code: `<Badge color="success" pill>Badge</Badge>
<Badge color="primary" pill>Badge</Badge>`,
    },
    {
      name: "With dot",
      description: "A leading status dot — pass the `dot` prop.",
      demo: (
        <div className="flex flex-wrap gap-2">
          {BADGE_COLORS.map((c) => (
            <Badge key={c} color={c} pill dot>
              Status
            </Badge>
          ))}
        </div>
      ),
      code: `<Badge color="success" pill dot>Active</Badge>
<Badge color="secondary" pill dot>Offline</Badge>
<Badge color="danger" pill dot>Error</Badge>`,
    },
    {
      name: "With remove button",
      description: "A trailing ✕ button — pass an `onRemove` handler.",
      demo: (
        <div className="flex flex-wrap gap-2">
          {BADGE_COLORS.map((c) => (
            <Badge key={c} color={c} onRemove={() => {}}>
              Tag
            </Badge>
          ))}
        </div>
      ),
      code: `<Badge color="primary" onRemove={() => remove(id)}>Designer</Badge>
<Badge color="info" pill onRemove={() => remove(id)}>Filter</Badge>`,
    },
    {
      name: "With border",
      description:
        "Outline style — no fill, just a ring. Pass `variant=\"border\"`.",
      demo: (
        <div className="flex flex-wrap gap-2">
          {BADGE_COLORS.map((c) => (
            <Badge key={c} color={c} variant="border">
              {c}
            </Badge>
          ))}
        </div>
      ),
      code: `<Badge color="secondary" variant="border">Badge</Badge>
<Badge color="success" variant="border" pill dot>Active</Badge>`,
    },
    {
      name: "Small",
      description: "Compact badges — pass `size=\"sm\"`.",
      demo: (
        <div className="flex flex-wrap items-center gap-2">
          {BADGE_COLORS.map((c) => (
            <Badge key={c} color={c} size="sm">
              {c}
            </Badge>
          ))}
          {BADGE_COLORS.map((c) => (
            <Badge key={`${c}-pill`} color={c} size="sm" pill>
              {c}
            </Badge>
          ))}
        </div>
      ),
      code: `<Badge color="primary" size="sm">Badge</Badge>
<Badge color="success" size="sm" pill>Badge</Badge>`,
    },
  ],
};
