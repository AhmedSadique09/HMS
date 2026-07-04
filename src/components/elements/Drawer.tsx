"use client";

import { useEffect, useState, type ReactNode } from "react";
import Button, { CloseButton } from "@/components/elements/Button";

const SIDES = {
  right: "right-0 top-0 h-full w-80 max-w-[90vw] translate-x-0",
  left: "left-0 top-0 h-full w-80 max-w-[90vw] translate-x-0",
  top: "left-0 top-0 w-full h-72 max-h-[90vh]",
  bottom: "left-0 bottom-0 w-full h-72 max-h-[90vh]",
} as const;

const HIDDEN = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
} as const;

/**
 * Props for the {@link Drawer} component.
 *
 * @property open     - Whether the drawer is shown (controlled).
 * @property onClose  - Called when the drawer requests to close.
 * @property side     - `"right"` (default), `"left"`, `"top"` or `"bottom"`.
 * @property title    - Optional header title (with a close button).
 * @property footer   - Optional footer content.
 * @property children - The drawer body.
 */
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: keyof typeof SIDES;
  title?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * Drawer
 * ------
 * A slide-over panel from any edge — the Tailwind equivalent of a sheet /
 * off-canvas. Controlled via `open` / `onClose`; closes on Escape and backdrop
 * click and locks body scroll. Custom, no dependencies.
 *
 * @example
 * ```tsx
 * import Drawer from "@/components/elements/Drawer";
 *
 * const [open, setOpen] = useState(false);
 * <Drawer open={open} onClose={() => setOpen(false)} title="Filters">…</Drawer>
 * ```
 */
export default function Drawer({
  open,
  onClose,
  side = "right",
  title,
  footer,
  children,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className={`absolute flex flex-col bg-white shadow-xl transition-transform duration-300 ease-out dark:bg-zinc-900 ${
          SIDES[side]
        } ${open ? "translate-x-0 translate-y-0" : HIDDEN[side]}`}
      >
        {title && (
          <header className="flex items-center justify-between border-b border-zinc-200 px-5 py-3 dark:border-zinc-800">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h3>
            <CloseButton onClick={onClose} />
          </header>
        )}
        <div className="flex-1 overflow-y-auto px-5 py-4 text-sm text-zinc-600 dark:text-zinc-300">
          {children}
        </div>
        {footer && (
          <footer className="flex justify-end gap-2 border-t border-zinc-200 px-5 py-3 dark:border-zinc-800">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

function Launcher({
  side,
  trigger,
}: {
  side?: DrawerProps["side"];
  trigger: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <Drawer
        open={open}
        onClose={close}
        side={side}
        title="Panel title"
        footer={
          <>
            <Button color="secondary" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button color="primary" onClick={close}>
              Apply
            </Button>
          </>
        }
      >
        <p>
          This is a slide-over drawer. Put filters, a form, a cart, or any
          content here. It slides in from the {side ?? "right"} edge.
        </p>
      </Drawer>
    </>
  );
}

/** Playground entry. */
export const drawerElement = {
  name: "Drawer",
  variants: [
    {
      name: "Right (default)",
      description: "Slides in from the right — great for filters and details.",
      demo: <Launcher trigger="Open right drawer" />,
      code: `import Drawer from "@/components/elements/Drawer";
import Button from "@/components/elements/Button";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Drawer open={open} onClose={() => setOpen(false)} title="Filters">
  Drawer content…
</Drawer>`,
    },
    {
      name: "Left",
      description: "Slides in from the left — e.g. a mobile nav.",
      demo: <Launcher side="left" trigger="Open left drawer" />,
      code: `<Drawer open={open} onClose={close} side="left" title="Menu">…</Drawer>`,
    },
    {
      name: "Bottom",
      description: "Slides up from the bottom — common on mobile.",
      demo: <Launcher side="bottom" trigger="Open bottom drawer" />,
      code: `<Drawer open={open} onClose={close} side="bottom" title="Details">…</Drawer>`,
    },
  ],
};
