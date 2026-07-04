"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import Button from "@/components/elements/Button";

const PANEL_POS = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
} as const;

const ARROW_POS = {
  top: "left-1/2 top-full -translate-x-1/2 border-t-white dark:border-t-zinc-800",
  bottom:
    "left-1/2 bottom-full -translate-x-1/2 border-b-white dark:border-b-zinc-800",
  left: "top-1/2 left-full -translate-y-1/2 border-l-white dark:border-l-zinc-800",
  right:
    "top-1/2 right-full -translate-y-1/2 border-r-white dark:border-r-zinc-800",
} as const;

/**
 * Props for the {@link Popover} component.
 *
 * @property children  - The trigger element.
 * @property content   - The popover body.
 * @property title     - Optional popover header.
 * @property placement - `"top"` (default), `"right"`, `"bottom"` or `"left"`.
 * @property trigger   - `"click"` (default) or `"hover"`.
 * @property className - Extra classes merged onto the wrapper.
 */
export interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  title?: ReactNode;
  placement?: keyof typeof PANEL_POS;
  trigger?: "click" | "hover";
  className?: string;
}

/**
 * Popover
 * -------
 * A small overlay anchored to a trigger — the Tailwind equivalent of Bootstrap's
 * popovers. Opens on click (closes on outside-click / Escape) or on hover.
 * Supports four placements, an optional title and an arrow.
 *
 * @example
 * ```tsx
 * import Popover from "@/components/elements/Popover";
 * import Button from "@/components/elements/Button";
 *
 * <Popover title="Popover title" content="And here's some content.">
 *   <Button>Click me</Button>
 * </Popover>
 * ```
 */
export default function Popover({
  children,
  content,
  title,
  placement = "top",
  trigger = "click",
  className = "",
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open || trigger !== "click") return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, trigger]);

  const hoverProps =
    trigger === "hover"
      ? {
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        }
      : {};

  return (
    <span ref={ref} className={`relative inline-block ${className}`} {...hoverProps}>
      <span
        onClick={trigger === "click" ? () => setOpen((o) => !o) : undefined}
        className="inline-block"
      >
        {children}
      </span>

      {open && (
        <div
          role="tooltip"
          className={`absolute z-30 w-64 ${PANEL_POS[placement]}`}
        >
          <div className="relative rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            {title && (
              <div className="border-b border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-white">
                {title}
              </div>
            )}
            <div className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300">
              {content}
            </div>
            <span
              className={`absolute size-0 border-8 border-transparent ${ARROW_POS[placement]}`}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </span>
  );
}

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Popover") and renders each variant's demo + code.
 */
export const popoverElement = {
  name: "Popover",
  variants: [
    {
      name: "Basic",
      description:
        "Click the trigger to toggle. Closes on outside-click or Escape.",
      demo: (
        <Popover
          title="Popover title"
          content="And here's some amazing content. It's very engaging, right?"
        >
          <Button color="primary">Click to toggle popover</Button>
        </Popover>
      ),
      code: `import Popover from "@/components/elements/Popover";
import Button from "@/components/elements/Button";

<Popover
  title="Popover title"
  content="And here's some amazing content."
>
  <Button color="primary">Click to toggle popover</Button>
</Popover>`,
    },
    {
      name: "Placements",
      description: "Open on any side — pass `placement`: top, right, bottom or left.",
      demo: (
        <div className="flex flex-wrap items-center justify-center gap-4 px-8 py-16">
          {(["top", "right", "bottom", "left"] as const).map((p) => (
            <Popover
              key={p}
              placement={p}
              title={`On ${p}`}
              content={`This popover opens on the ${p}.`}
            >
              <Button color="secondary" variant="outline">
                {p}
              </Button>
            </Popover>
          ))}
        </div>
      ),
      code: `<Popover placement="top" content="…"><Button>Top</Button></Popover>
<Popover placement="right" content="…"><Button>Right</Button></Popover>
<Popover placement="bottom" content="…"><Button>Bottom</Button></Popover>
<Popover placement="left" content="…"><Button>Left</Button></Popover>`,
    },
    {
      name: "On hover",
      description: "Open while hovering the trigger — pass `trigger=\"hover\"`.",
      demo: (
        <Popover
          trigger="hover"
          content="Hover the button to reveal this popover."
        >
          <Button color="primary" variant="outline">
            Hover over me
          </Button>
        </Popover>
      ),
      code: `<Popover trigger="hover" content="…">
  <Button variant="outline">Hover over me</Button>
</Popover>`,
    },
    {
      name: "Rich content",
      description: "The content can be any JSX — text, links, even buttons.",
      demo: (
        <Popover
          title="Invite a teammate"
          content={
            <div className="space-y-2">
              <p>Share this workspace with a colleague.</p>
              <Button color="primary" size="sm" fullWidth>
                Send invite
              </Button>
            </div>
          }
        >
          <Button color="success">Open menu</Button>
        </Popover>
      ),
      code: `<Popover
  title="Invite a teammate"
  content={
    <div className="space-y-2">
      <p>Share this workspace with a colleague.</p>
      <Button color="primary" size="sm" fullWidth>Send invite</Button>
    </div>
  }
>
  <Button color="success">Open menu</Button>
</Popover>`,
    },
  ],
};
