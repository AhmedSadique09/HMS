const COLORS = {
  primary: "text-blue-600",
  secondary: "text-gray-500",
  success: "text-green-600",
  danger: "text-red-600",
  warning: "text-yellow-500",
  info: "text-cyan-500",
  light: "text-zinc-300",
  dark: "text-zinc-800 dark:text-zinc-200",
} as const;

const BORDER_SIZES = {
  sm: "size-4 border-2",
  md: "size-8 border-4",
  lg: "size-12 border-4",
} as const;

const GROW_SIZES = {
  sm: "size-4",
  md: "size-8",
  lg: "size-12",
} as const;

/**
 * Props for the {@link Spinner} component.
 *
 * @property variant   - `"border"` (rotating ring, default) or `"grow"` (pulsing).
 * @property color     - Bootstrap colour. Omit to inherit the parent text colour.
 * @property size      - `"sm"`, `"md"` (default) or `"lg"`.
 * @property label     - Screen-reader text. Default "Loading…".
 * @property className - Extra classes merged onto the spinner.
 */
export interface SpinnerProps {
  variant?: "border" | "grow";
  color?: keyof typeof COLORS;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

/**
 * Spinner
 * -------
 * A loading indicator — the Tailwind equivalent of Bootstrap's spinners. A
 * rotating `border` ring or a pulsing `grow` circle, in any contextual colour
 * and size. Omit `color` to inherit the parent's text colour (handy inside
 * coloured buttons).
 *
 * @example
 * ```tsx
 * import Spinner from "@/components/elements/Spinner";
 *
 * <Spinner color="primary" />
 * <Spinner variant="grow" color="success" />
 * ```
 */
export default function Spinner({
  variant = "border",
  color,
  size = "md",
  label = "Loading…",
  className = "",
}: SpinnerProps) {
  const colorCls = color ? COLORS[color] : "";

  if (variant === "grow") {
    return (
      <span
        role="status"
        className={`inline-block rounded-full bg-current animate-[spinner-grow_0.9s_linear_infinite] ${GROW_SIZES[size]} ${colorCls} ${className}`}
      >
        <span className="sr-only">{label}</span>
      </span>
    );
  }

  return (
    <span
      role="status"
      className={`inline-block animate-spin rounded-full border-current border-r-transparent ${BORDER_SIZES[size]} ${colorCls} ${className}`}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}

const COLOR_KEYS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark",
] as const;

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Spinner") and renders each variant's demo + code.
 */
export const spinnerElement = {
  name: "Spinner",
  variants: [
    {
      name: "Border",
      description: "The classic rotating border ring, in each contextual colour.",
      demo: (
        <div className="flex flex-wrap items-center gap-4">
          {COLOR_KEYS.map((c) => (
            <Spinner key={c} color={c} />
          ))}
        </div>
      ),
      code: `import Spinner from "@/components/elements/Spinner";

<Spinner color="primary" />
<Spinner color="success" />
<Spinner color="danger" />`,
    },
    {
      name: "Growing",
      description: "A pulsing, growing circle — pass `variant=\"grow\"`.",
      demo: (
        <div className="flex flex-wrap items-center gap-4">
          {COLOR_KEYS.map((c) => (
            <Spinner key={c} variant="grow" color={c} />
          ))}
        </div>
      ),
      code: `<Spinner variant="grow" color="primary" />
<Spinner variant="grow" color="success" />`,
    },
    {
      name: "Sizes",
      description: "Three sizes — pass `size`: sm, md (default) or lg.",
      demo: (
        <div className="flex items-center gap-6">
          <Spinner color="primary" size="sm" />
          <Spinner color="primary" size="md" />
          <Spinner color="primary" size="lg" />
          <Spinner variant="grow" color="primary" size="sm" />
          <Spinner variant="grow" color="primary" size="md" />
          <Spinner variant="grow" color="primary" size="lg" />
        </div>
      ),
      code: `<Spinner color="primary" size="sm" />
<Spinner color="primary" size="lg" />
<Spinner variant="grow" color="primary" size="lg" />`,
    },
    {
      name: "In buttons",
      description:
        "Drop a small spinner inside a button. Omit `color` so it inherits the button's text colour.",
      demo: (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3.5 py-2 text-sm font-medium text-white opacity-80"
          >
            <Spinner size="sm" />
            Loading…
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-3.5 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
          >
            <Spinner variant="grow" size="sm" />
            Saving…
          </button>
        </div>
      ),
      code: `import Spinner from "@/components/elements/Spinner";

<button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3.5 py-2 text-white" disabled>
  <Spinner size="sm" /> Loading…
</button>`,
    },
  ],
};
