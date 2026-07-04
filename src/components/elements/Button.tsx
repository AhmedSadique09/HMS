import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Bootstrap's eight contextual button colours.
 */
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

/**
 * Per-colour classes following Bootstrap's convention (primary = blue,
 * secondary = gray, success = green, danger = red, warning = yellow,
 * info = cyan, light, dark). `solid` is the filled button; `outline` is the
 * bordered btn-outline-* style. Written out so Tailwind sees every class.
 */
const COLORS: Record<
  ButtonColor,
  { solid: string; outline: string; link: string }
> = {
  primary: {
    solid: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 focus-visible:outline-blue-600",
    link: "text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400",
  },
  secondary: {
    solid: "bg-gray-500 text-white hover:bg-gray-600 focus-visible:outline-gray-500",
    outline:
      "border border-gray-500 text-gray-600 hover:bg-gray-500 hover:text-white dark:text-gray-300 focus-visible:outline-gray-500",
    link: "text-gray-600 hover:text-gray-800 hover:underline dark:text-gray-300",
  },
  success: {
    solid: "bg-green-600 text-white hover:bg-green-700 focus-visible:outline-green-600",
    outline:
      "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:text-green-400 focus-visible:outline-green-600",
    link: "text-green-600 hover:text-green-700 hover:underline dark:text-green-400",
  },
  danger: {
    solid: "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
    outline:
      "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white dark:text-red-400 focus-visible:outline-red-600",
    link: "text-red-600 hover:text-red-700 hover:underline dark:text-red-400",
  },
  warning: {
    solid:
      "bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus-visible:outline-yellow-400",
    outline:
      "border border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-gray-900 dark:text-yellow-400 focus-visible:outline-yellow-400",
    link: "text-yellow-600 hover:text-yellow-700 hover:underline dark:text-yellow-400",
  },
  info: {
    solid: "bg-cyan-500 text-gray-900 hover:bg-cyan-600 focus-visible:outline-cyan-500",
    outline:
      "border border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-gray-900 dark:text-cyan-400 focus-visible:outline-cyan-500",
    link: "text-cyan-600 hover:text-cyan-700 hover:underline dark:text-cyan-400",
  },
  light: {
    solid:
      "bg-gray-100 text-gray-900 ring-1 ring-gray-300 hover:bg-gray-200 focus-visible:outline-gray-300",
    outline:
      "border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white focus-visible:outline-gray-300",
    link: "text-gray-500 hover:text-gray-700 hover:underline dark:text-gray-300",
  },
  dark: {
    solid: "bg-gray-800 text-white hover:bg-gray-900 focus-visible:outline-gray-800",
    outline:
      "border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white dark:border-gray-300 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900 focus-visible:outline-gray-700",
    link: "text-gray-800 hover:text-black hover:underline dark:text-gray-200",
  },
};

const SIZES = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3.5 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
} as const;

/** Square padding for icon-only buttons. */
const ICON_SIZES = {
  sm: "p-1.5 text-xs",
  md: "p-2 text-sm",
  lg: "p-2.5 text-base",
} as const;

/** Border-radius options. */
const ROUNDED = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

/** Spinner shown while `loading`. */
function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/**
 * Props for the {@link Button} component. Extends the native `<button>`, so
 * `onClick`, `type`, `disabled`, etc. all work.
 *
 * @property color     - One of Bootstrap's eight colours. Defaults to `"primary"`.
 * @property variant   - `"solid"` (filled), `"outline"` or `"link"` (looks like
 *                       a link). Defaults to `"solid"`.
 * @property size      - `"sm"`, `"md"` (default) or `"lg"`.
 * @property loading   - Show a spinner and disable the button.
 * @property fullWidth - Stretch to the full width of the container (block).
 * @property iconOnly  - Square padding — for an icon or single number. Combine
 *                       with `rounded="full"` for a circular button.
 * @property rounded   - Border radius: `"none"`, `"sm"`, `"md"` (default),
 *                       `"lg"`, `"xl"`, `"2xl"` or `"full"` (pill / circle).
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  variant?: "solid" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  rounded?: keyof typeof ROUNDED;
}

/**
 * Button
 * ------
 * A button styled with Tailwind but using Bootstrap's colour convention.
 *
 * @example
 * ```tsx
 * import Button from "@/components/elements/Button";
 *
 * <Button color="primary" onClick={save}>Save</Button>
 * <Button color="danger" variant="outline">Delete</Button>
 * <Button color="success" size="lg">Continue</Button>
 * ```
 */
export default function Button({
  color = "primary",
  variant = "solid",
  size = "md",
  loading = false,
  fullWidth = false,
  iconOnly = false,
  rounded = "md",
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const colorClass = COLORS[color][variant];
  const sizing = iconOnly ? ICON_SIZES[size] : SIZES[size];
  const shape = ROUNDED[rounded];

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-65 ${shape} ${
        fullWidth ? "w-full" : ""
      } ${sizing} ${colorClass} ${className}`}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

/**
 * ButtonGroup
 * -----------
 * Joins a row of {@link Button}s into a single segmented control — the Tailwind
 * equivalent of Bootstrap's `.btn-group`. Inner corners are squared off and the
 * borders are collapsed so the buttons read as one unit.
 *
 * @example
 * ```tsx
 * import Button, { ButtonGroup } from "@/components/elements/Button";
 *
 * <ButtonGroup>
 *   <Button color="secondary" variant="outline">Left</Button>
 *   <Button color="secondary" variant="outline">Middle</Button>
 *   <Button color="secondary" variant="outline">Right</Button>
 * </ButtonGroup>
 * ```
 */
export function ButtonGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex -space-x-px [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button]:rounded-none [&>button]:focus-visible:z-10 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * CloseButton
 * -----------
 * A standalone ✕ button — the Tailwind equivalent of Bootstrap's `.btn-close`.
 * Used to dismiss alerts, modals, toasts, etc. Extends the native `<button>`,
 * so `onClick` and `disabled` work.
 *
 * @example
 * ```tsx
 * import { CloseButton } from "@/components/elements/Button";
 *
 * <CloseButton onClick={dismiss} />
 * <CloseButton disabled />
 * ```
 */
export function CloseButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label="Close"
      className={`inline-flex size-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 ${className}`}
      {...props}
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
    </button>
  );
}

/** Small plus icon used in the icon demos. */
const PlusIcon = (
  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
    <path d="M10 5a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 10 5Z" />
  </svg>
);

const BUTTON_COLORS: ButtonColor[] = [
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
 * item ("Button") and renders each variant's demo + code.
 */
export const buttonElement = {
  name: "Button",
  variants: [
    {
      name: "Solid",
      description:
        "Filled buttons in Bootstrap's eight contextual colours (btn-*).",
      demo: (
        <div className="flex flex-wrap gap-2">
          {BUTTON_COLORS.map((c) => (
            <Button key={c} color={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </Button>
          ))}
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

<Button color="primary">Primary</Button>
<Button color="success">Success</Button>
<Button color="danger">Danger</Button>
// also: secondary, warning, info, light, dark`,
    },
    {
      name: "Outline",
      description:
        "Bordered buttons that fill on hover — Bootstrap's btn-outline-*.",
      demo: (
        <div className="flex flex-wrap gap-2">
          {BUTTON_COLORS.map((c) => (
            <Button key={c} color={c} variant="outline">
              {c[0].toUpperCase() + c.slice(1)}
            </Button>
          ))}
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

<Button color="primary" variant="outline">Primary</Button>
<Button color="danger" variant="outline">Danger</Button>
// also: secondary, success, warning, info, light, dark`,
    },
    {
      name: "Sizes",
      description: "Three sizes — sm, md (default) and lg (btn-sm / btn-lg).",
      demo: (
        <div className="flex flex-wrap items-center gap-2">
          <Button color="primary" size="sm">
            Small
          </Button>
          <Button color="primary" size="md">
            Medium
          </Button>
          <Button color="primary" size="lg">
            Large
          </Button>
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

<Button color="primary" size="sm">Small</Button>
<Button color="primary" size="md">Medium</Button>
<Button color="primary" size="lg">Large</Button>`,
    },
    {
      name: "Disabled",
      description: "Disabled state — pass the native `disabled` attribute.",
      demo: (
        <div className="flex flex-wrap gap-2">
          <Button color="primary" disabled>
            Primary
          </Button>
          <Button color="success" disabled>
            Success
          </Button>
          <Button color="danger" variant="outline" disabled>
            Danger
          </Button>
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

<Button color="primary" disabled>Primary</Button>
<Button color="danger" variant="outline" disabled>Danger</Button>`,
    },
    {
      name: "With icon",
      description:
        "Put an icon in the children for a leading icon, or pass `iconOnly` for a square icon button.",
      demo: (
        <div className="flex flex-wrap items-center gap-2">
          <Button color="primary">
            {PlusIcon}
            New item
          </Button>
          <Button color="success" variant="outline">
            {PlusIcon}
            Add
          </Button>
          <Button color="dark" iconOnly aria-label="Add">
            {PlusIcon}
          </Button>
          <Button color="secondary" variant="outline" iconOnly aria-label="Add">
            {PlusIcon}
          </Button>
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

const icon = <svg viewBox="0 0 20 20" className="size-4">...</svg>;

<Button color="primary">{icon} New item</Button>
<Button color="dark" iconOnly aria-label="Add">{icon}</Button>`,
    },
    {
      name: "Loading",
      description:
        "Pass `loading` to show a spinner and disable the button (Bootstrap's spinner button).",
      demo: (
        <div className="flex flex-wrap items-center gap-2">
          <Button color="primary" loading>
            Saving…
          </Button>
          <Button color="success" loading>
            Please wait
          </Button>
          <Button color="danger" variant="outline" loading>
            Deleting…
          </Button>
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

<Button color="primary" loading>Saving…</Button>
<Button color="danger" variant="outline" loading>Deleting…</Button>`,
    },
    {
      name: "Full width",
      description:
        "Pass `fullWidth` to stretch the button to its container (Bootstrap's d-grid block button).",
      demo: (
        <div className="flex max-w-sm flex-col gap-2">
          <Button color="primary" fullWidth>
            Sign in
          </Button>
          <Button color="secondary" variant="outline" fullWidth>
            Create account
          </Button>
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

<Button color="primary" fullWidth>Sign in</Button>
<Button color="secondary" variant="outline" fullWidth>Create account</Button>`,
    },
    {
      name: "Link",
      description:
        "Looks like a link, behaves like a button — Bootstrap's btn-link. Pass `variant=\"link\"`.",
      demo: (
        <div className="flex flex-wrap items-center gap-3">
          <Button color="primary" variant="link">
            Primary link
          </Button>
          <Button color="danger" variant="link">
            Danger link
          </Button>
          <Button color="secondary" variant="link">
            Secondary link
          </Button>
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

<Button color="primary" variant="link">Primary link</Button>
<Button color="danger" variant="link" onClick={undo}>Undo</Button>`,
    },
    {
      name: "Button group",
      description:
        "Join buttons into one segmented control with ButtonGroup — Bootstrap's btn-group.",
      demo: (
        <div className="flex flex-col gap-3">
          <ButtonGroup>
            <Button color="secondary" variant="outline">
              Left
            </Button>
            <Button color="secondary" variant="outline">
              Middle
            </Button>
            <Button color="secondary" variant="outline">
              Right
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="primary">Day</Button>
            <Button color="primary">Week</Button>
            <Button color="primary">Month</Button>
          </ButtonGroup>
        </div>
      ),
      code: `import Button, { ButtonGroup } from "@/components/elements/Button";

<ButtonGroup>
  <Button color="secondary" variant="outline">Left</Button>
  <Button color="secondary" variant="outline">Middle</Button>
  <Button color="secondary" variant="outline">Right</Button>
</ButtonGroup>`,
    },
    {
      name: "Rounded",
      description:
        "Every border-radius — pass `rounded`: none, sm, md (default), lg, xl, 2xl or full (pill).",
      demo: (
        <div className="flex flex-wrap items-center gap-2">
          {(["none", "sm", "md", "lg", "xl", "2xl", "full"] as const).map(
            (r) => (
              <Button key={r} color="primary" rounded={r}>
                {r}
              </Button>
            ),
          )}
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

<Button color="primary" rounded="none">none</Button>
<Button color="primary" rounded="md">md</Button>
<Button color="primary" rounded="lg">lg</Button>
<Button color="primary" rounded="full">full</Button>`,
    },
    {
      name: "Icon-only & number",
      description:
        "Round icon-only or number buttons — combine `iconOnly` + `rounded=\"full\"` (great for pagination, steppers or counters).",
      demo: (
        <div className="flex flex-wrap items-center gap-2">
          <Button color="primary" iconOnly rounded="full" aria-label="Add">
            {PlusIcon}
          </Button>
          <Button
            color="secondary"
            variant="outline"
            iconOnly
            rounded="full"
            aria-label="Add"
          >
            {PlusIcon}
          </Button>
          <span className="mx-1 h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
          {["1", "2", "3"].map((n) => (
            <Button
              key={n}
              color="primary"
              variant="outline"
              iconOnly
              rounded="full"
              aria-label={`Page ${n}`}
            >
              {n}
            </Button>
          ))}
          <Button color="primary" iconOnly rounded="full" aria-label="Page 4">
            4
          </Button>
        </div>
      ),
      code: `import Button from "@/components/elements/Button";

// round icon button
<Button color="primary" iconOnly rounded="full" aria-label="Add">{icon}</Button>

// round number button (pagination / counter)
<Button color="primary" variant="outline" iconOnly rounded="full">1</Button>
<Button color="primary" iconOnly rounded="full">2</Button>`,
    },
    {
      name: "Close button",
      description:
        "A standalone ✕ dismiss button (Bootstrap's btn-close) — active and disabled states.",
      demo: (
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <CloseButton />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CloseButton disabled />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Disabled
            </span>
          </div>
        </div>
      ),
      code: `import { CloseButton } from "@/components/elements/Button";

// active
<CloseButton onClick={dismiss} />

// disabled
<CloseButton disabled />`,
    },
  ],
};
