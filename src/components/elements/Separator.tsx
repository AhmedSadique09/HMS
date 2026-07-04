import type { ReactNode } from "react";

/**
 * Props for the {@link Separator} component.
 *
 * @property orientation - `"horizontal"` (default) or `"vertical"`.
 * @property children    - Optional centered label (horizontal only).
 * @property className   - Extra classes merged onto the separator.
 */
export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  children?: ReactNode;
  className?: string;
}

/**
 * Separator
 * ---------
 * A thin dividing line — horizontal or vertical, with an optional centered
 * label (e.g. "OR"). Pure Tailwind, no dependencies.
 *
 * @example
 * ```tsx
 * import Separator from "@/components/elements/Separator";
 *
 * <Separator />
 * <Separator>OR</Separator>
 * <Separator orientation="vertical" />
 * ```
 */
export default function Separator({
  orientation = "horizontal",
  children,
  className = "",
}: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`w-px self-stretch bg-zinc-200 dark:bg-zinc-700 ${className}`}
      />
    );
  }

  if (children) {
    return (
      <div className={`flex items-center gap-3 ${className}`} role="separator">
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          {children}
        </span>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      className={`h-px w-full bg-zinc-200 dark:bg-zinc-700 ${className}`}
    />
  );
}

/** Playground entry. */
export const separatorElement = {
  name: "Separator",
  variants: [
    {
      name: "Horizontal",
      description: "A full-width dividing line.",
      demo: (
        <div className="max-w-sm">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Above</p>
          <Separator className="my-3" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Below</p>
        </div>
      ),
      code: `import Separator from "@/components/elements/Separator";

<Separator />`,
    },
    {
      name: "With label",
      description: "A divider with centered text — pass children.",
      demo: (
        <div className="max-w-sm">
          <Separator>OR</Separator>
        </div>
      ),
      code: `<Separator>OR</Separator>`,
    },
    {
      name: "Vertical",
      description: "A vertical divider between inline items.",
      demo: (
        <div className="flex h-8 items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>API</span>
          <Separator orientation="vertical" />
          <span>Support</span>
        </div>
      ),
      code: `<div className="flex h-8 items-center gap-3">
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>API</span>
</div>`,
    },
  ],
};
