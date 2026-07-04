const COLORS = {
  gray: "bg-zinc-200 dark:bg-zinc-700",
  primary: "bg-blue-200 dark:bg-blue-500/30",
  success: "bg-green-200 dark:bg-green-500/30",
  danger: "bg-red-200 dark:bg-red-500/30",
  info: "bg-cyan-200 dark:bg-cyan-500/30",
} as const;

const ROUNDED = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
} as const;

/**
 * Props for the {@link Placeholder} component.
 *
 * @property className - Size it with width/height utilities (e.g. `h-4 w-3/4`).
 * @property rounded   - Corner radius. Default `"md"`.
 * @property animation - `"pulse"` (default), `"wave"` (shimmer) or `"none"`.
 * @property color     - Tint: gray (default), primary, success, danger, info.
 */
export interface PlaceholderProps {
  className?: string;
  rounded?: keyof typeof ROUNDED;
  animation?: "pulse" | "wave" | "none";
  color?: keyof typeof COLORS;
}

/**
 * Placeholder
 * -----------
 * A skeleton loading block — the Tailwind equivalent of Bootstrap's
 * placeholders. Size it with width/height classes; choose a pulse or wave
 * animation. Compose several to build skeleton cards and list rows.
 *
 * @example
 * ```tsx
 * import Placeholder from "@/components/elements/Placeholder";
 *
 * <Placeholder className="h-4 w-3/4" />
 * <Placeholder className="size-12" rounded="full" animation="wave" />
 * ```
 */
export default function Placeholder({
  className = "",
  rounded = "md",
  animation = "pulse",
  color = "gray",
}: PlaceholderProps) {
  const r = ROUNDED[rounded];
  const bg = COLORS[color];

  if (animation === "wave") {
    return (
      <span className={`relative block overflow-hidden ${bg} ${r} ${className}`}>
        <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent dark:via-white/10" />
      </span>
    );
  }

  return (
    <span
      className={`block ${bg} ${r} ${animation === "pulse" ? "animate-pulse" : ""} ${className}`}
    />
  );
}

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Placeholder") and renders each variant's demo + code.
 */
export const placeholderElement = {
  name: "Placeholder",
  variants: [
    {
      name: "Text lines",
      description: "A paragraph skeleton — stacked lines of varying width.",
      demo: (
        <div className="max-w-sm space-y-2.5">
          <Placeholder className="h-4 w-3/4" />
          <Placeholder className="h-3 w-full" />
          <Placeholder className="h-3 w-full" />
          <Placeholder className="h-3 w-5/6" />
        </div>
      ),
      code: `import Placeholder from "@/components/elements/Placeholder";

<div className="space-y-2.5">
  <Placeholder className="h-4 w-3/4" />
  <Placeholder className="h-3 w-full" />
  <Placeholder className="h-3 w-5/6" />
</div>`,
    },
    {
      name: "Card",
      description: "A skeleton card — image, lines and a button.",
      demo: (
        <div className="max-w-sm rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <Placeholder className="mb-4 h-40 w-full" rounded="lg" />
          <Placeholder className="mb-2 h-4 w-3/4" />
          <Placeholder className="mb-2 h-3 w-full" />
          <Placeholder className="mb-4 h-3 w-5/6" />
          <Placeholder className="h-9 w-28" />
        </div>
      ),
      code: `<div className="rounded-xl border p-4">
  <Placeholder className="mb-4 h-40 w-full" rounded="lg" />
  <Placeholder className="mb-2 h-4 w-3/4" />
  <Placeholder className="mb-2 h-3 w-full" />
  <Placeholder className="h-9 w-28" />
</div>`,
    },
    {
      name: "Avatar with text",
      description: "A list-row skeleton — circular avatar plus two lines.",
      demo: (
        <div className="flex max-w-sm items-center gap-3">
          <Placeholder className="size-12" rounded="full" />
          <div className="flex-1 space-y-2">
            <Placeholder className="h-3 w-1/3" />
            <Placeholder className="h-3 w-2/3" />
          </div>
        </div>
      ),
      code: `<div className="flex items-center gap-3">
  <Placeholder className="size-12" rounded="full" />
  <div className="flex-1 space-y-2">
    <Placeholder className="h-3 w-1/3" />
    <Placeholder className="h-3 w-2/3" />
  </div>
</div>`,
    },
    {
      name: "Sizes",
      description: "Control the height with utility classes.",
      demo: (
        <div className="max-w-sm space-y-3">
          <Placeholder className="h-2 w-full" />
          <Placeholder className="h-3 w-full" />
          <Placeholder className="h-4 w-full" />
          <Placeholder className="h-6 w-full" />
        </div>
      ),
      code: `<Placeholder className="h-2 w-full" />
<Placeholder className="h-4 w-full" />
<Placeholder className="h-6 w-full" />`,
    },
    {
      name: "Animations",
      description: "Choose `pulse` (default), `wave` (shimmer) or `none`.",
      demo: (
        <div className="max-w-sm space-y-4">
          <div>
            <p className="mb-1 text-xs font-medium text-zinc-400">pulse</p>
            <Placeholder className="h-4 w-full" animation="pulse" />
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-zinc-400">wave</p>
            <Placeholder className="h-4 w-full" animation="wave" />
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-zinc-400">none</p>
            <Placeholder className="h-4 w-full" animation="none" />
          </div>
        </div>
      ),
      code: `<Placeholder className="h-4 w-full" animation="pulse" />
<Placeholder className="h-4 w-full" animation="wave" />
<Placeholder className="h-4 w-full" animation="none" />`,
    },
    {
      name: "Colors",
      description: "Tint the placeholder — pass `color` (Bootstrap convention).",
      demo: (
        <div className="max-w-sm space-y-2.5">
          <Placeholder className="h-4 w-full" color="gray" />
          <Placeholder className="h-4 w-full" color="primary" />
          <Placeholder className="h-4 w-full" color="success" />
          <Placeholder className="h-4 w-full" color="danger" />
          <Placeholder className="h-4 w-full" color="info" />
        </div>
      ),
      code: `<Placeholder className="h-4 w-full" color="primary" />
<Placeholder className="h-4 w-full" color="success" />
<Placeholder className="h-4 w-full" color="danger" />`,
    },
  ],
};
