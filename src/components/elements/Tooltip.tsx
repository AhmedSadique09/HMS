import type { ReactNode } from "react";

const PANEL_POS = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
} as const;

const ARROW_POS = {
  top: "left-1/2 top-full -translate-x-1/2 border-t-zinc-900",
  bottom: "left-1/2 bottom-full -translate-x-1/2 border-b-zinc-900",
  left: "top-1/2 left-full -translate-y-1/2 border-l-zinc-900",
  right: "top-1/2 right-full -translate-y-1/2 border-r-zinc-900",
} as const;

/**
 * Props for the {@link Tooltip} component.
 *
 * @property children  - The element the tooltip describes (the trigger).
 * @property content   - The tooltip text.
 * @property placement - `"top"` (default), `"right"`, `"bottom"` or `"left"`.
 * @property className - Extra classes merged onto the wrapper.
 */
export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: keyof typeof PANEL_POS;
  className?: string;
}

/**
 * Tooltip
 * -------
 * A small label shown on hover/focus — pure CSS (group-hover / focus-within),
 * no JS, no dependencies.
 *
 * @example
 * ```tsx
 * import Tooltip from "@/components/elements/Tooltip";
 *
 * <Tooltip content="Copy to clipboard">
 *   <button>Copy</button>
 * </Tooltip>
 * ```
 */
export default function Tooltip({
  children,
  content,
  placement = "top",
  className = "",
}: TooltipProps) {
  return (
    <span className={`group relative inline-flex ${className}`} tabIndex={0}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-30 w-max max-w-xs rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 ${PANEL_POS[placement]}`}
      >
        {content}
        <span
          aria-hidden="true"
          className={`absolute size-0 border-4 border-transparent ${ARROW_POS[placement]}`}
        />
      </span>
    </span>
  );
}

/** Playground entry. */
export const tooltipElement = {
  name: "Tooltip",
  variants: [
    {
      name: "Basic",
      description: "Hover (or focus) the trigger to reveal the tooltip.",
      demo: (
        <Tooltip content="Copy to clipboard">
          <button
            type="button"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Hover me
          </button>
        </Tooltip>
      ),
      code: `import Tooltip from "@/components/elements/Tooltip";

<Tooltip content="Copy to clipboard">
  <button>Hover me</button>
</Tooltip>`,
    },
    {
      name: "Placements",
      description: "Open on any side — pass `placement`.",
      demo: (
        <div className="flex flex-wrap items-center justify-center gap-4 px-6 py-12">
          {(["top", "right", "bottom", "left"] as const).map((p) => (
            <Tooltip key={p} placement={p} content={`On ${p}`}>
              <button
                type="button"
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {p}
              </button>
            </Tooltip>
          ))}
        </div>
      ),
      code: `<Tooltip placement="top" content="On top"><button>Top</button></Tooltip>
<Tooltip placement="right" content="On right"><button>Right</button></Tooltip>`,
    },
  ],
};
