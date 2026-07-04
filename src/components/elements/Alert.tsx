import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * The eight contextual alert colours, mirroring Bootstrap's variants.
 */
export type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

/**
 * Tailwind classes per variant — background tint, text colour and border,
 * following Bootstrap's colour convention (primary = blue, success = green,
 * danger = red, …). Each has a dark-mode counterpart.
 */
const VARIANTS: Record<AlertVariant, string> = {
  primary:
    "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30",
  secondary:
    "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-500/10 dark:text-zinc-300 dark:border-zinc-500/30",
  success:
    "bg-green-50 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30",
  danger:
    "bg-red-50 text-red-800 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/30",
  warning:
    "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
  info: "bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/30",
  light:
    "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-white/5 dark:text-zinc-300 dark:border-zinc-700",
  dark: "bg-zinc-800 text-zinc-100 border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-300",
};

/**
 * Props for the {@link Alert} component.
 *
 * @property variant   - One of the eight contextual colours. Defaults to
 *                       `"primary"`.
 * @property icon      - Optional leading icon (e.g. an SVG). When set, the alert
 *                       lays out the icon and message side by side.
 * @property children  - The alert message (any JSX, including {@link AlertLink}).
 * @property className - Extra classes merged onto the alert.
 */
export interface AlertProps {
  variant?: AlertVariant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Alert
 * -----
 * A static contextual feedback message — the Tailwind equivalent of Bootstrap's
 * `.alert`. Pass one of eight `variant` colours.
 *
 * @example
 * ```tsx
 * import Alert, { AlertLink } from "@/components/elements/Alert";
 *
 * <Alert variant="success">
 *   Saved! <AlertLink href="/items">View items</AlertLink>.
 * </Alert>
 * ```
 */
export default function Alert({
  variant = "primary",
  icon,
  children,
  className = "",
}: AlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-lg border px-4 py-3 text-sm ${VARIANTS[variant]} ${className}`}
    >
      {icon ? (
        <div className="flex items-center gap-2.5">
          <span className="shrink-0">{icon}</span>
          <div>{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

/**
 * AlertLink
 * ---------
 * A link styled to sit inside an {@link Alert} — the Tailwind equivalent of
 * Bootstrap's `.alert-link`. It inherits the alert's text colour and adds
 * weight + underline so it stands out.
 */
export function AlertLink({
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`font-semibold underline underline-offset-2 transition-opacity hover:opacity-80 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

/** Wraps a Bootstrap-Icons path in a sized, currentColor SVG. */
function alertIcon(path: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const ICON_PATHS = {
  info: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
  check:
    "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z",
  cross:
    "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z",
  triangle:
    "M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
} as const;

/**
 * Default contextual icon per variant, mirroring how Bootstrap pairs each alert
 * colour with a matching icon (success → check, danger → cross, warning →
 * triangle, info/primary → info circle). Reusable: `icon={alertIcons.success}`.
 */
export const alertIcons: Record<AlertVariant, ReactNode> = {
  primary: alertIcon(ICON_PATHS.info),
  secondary: alertIcon(ICON_PATHS.info),
  success: alertIcon(ICON_PATHS.check),
  danger: alertIcon(ICON_PATHS.cross),
  warning: alertIcon(ICON_PATHS.triangle),
  info: alertIcon(ICON_PATHS.info),
  light: alertIcon(ICON_PATHS.info),
  dark: alertIcon(ICON_PATHS.info),
};

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Alert") and renders the demo + code below it.
 */
export const alertElement = {
  name: "Alert",
  variants: [
    {
      name: "Contextual",
      description:
        "Eight contextual colours following Bootstrap's convention — primary, secondary, success, danger, warning, info, light, dark.",
      demo: (
        <div className="flex flex-col gap-3">
          {(
            [
              "primary",
              "secondary",
              "success",
              "danger",
              "warning",
              "info",
              "light",
              "dark",
            ] as AlertVariant[]
          ).map((v) => (
            <Alert key={v} variant={v}>
              A simple {v} alert with{" "}
              <AlertLink href="#">an example link</AlertLink>. Give it a click
              if you like.
            </Alert>
          ))}
        </div>
      ),
      code: `import Alert, { AlertLink } from "@/components/elements/Alert";

<Alert variant="primary">
  A simple primary alert with <AlertLink href="#">an example link</AlertLink>.
</Alert>
<Alert variant="success">
  A simple success alert with <AlertLink href="#">an example link</AlertLink>.
</Alert>
<Alert variant="danger">
  A simple danger alert with <AlertLink href="#">an example link</AlertLink>.
</Alert>
// also: secondary, warning, info, light, dark`,
    },
    {
      name: "With icon",
      description:
        "Each colour pairs with its matching icon (success → check, danger → cross, warning → triangle, info → info circle) via the exported `alertIcons` map.",
      demo: (
        <div className="flex flex-col gap-3">
          {(
            [
              "primary",
              "secondary",
              "success",
              "danger",
              "warning",
              "info",
              "light",
              "dark",
            ] as AlertVariant[]
          ).map((v) => (
            <Alert key={v} variant={v} icon={alertIcons[v]}>
              An example {v} alert with an icon
            </Alert>
          ))}
        </div>
      ),
      code: `import Alert, { alertIcons } from "@/components/elements/Alert";

// alertIcons maps each variant to its matching icon
<Alert variant="success" icon={alertIcons.success}>
  An example success alert with an icon
</Alert>
<Alert variant="danger" icon={alertIcons.danger}>
  An example danger alert with an icon
</Alert>
<Alert variant="warning" icon={alertIcons.warning}>
  An example warning alert with an icon
</Alert>`,
    },
  ],
};
