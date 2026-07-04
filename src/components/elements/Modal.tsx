"use client";

import { useEffect, useState, type ReactNode } from "react";
import Button, { CloseButton } from "@/components/elements/Button";

const SIZES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

/**
 * Props for the {@link Modal} component.
 *
 * @property open           - Whether the modal is shown (controlled).
 * @property onClose        - Called when the modal requests to close.
 * @property title          - Optional header title (also shows a close button).
 * @property footer         - Optional footer content (usually action buttons).
 * @property size           - `"sm"`, `"md"` (default), `"lg"` or `"xl"`.
 * @property centered       - Vertically centre the modal.
 * @property staticBackdrop - Don't close when the backdrop is clicked.
 * @property fullscreen     - Cover the whole viewport.
 * @property children       - The modal body.
 */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  size?: keyof typeof SIZES;
  centered?: boolean;
  staticBackdrop?: boolean;
  fullscreen?: boolean;
  children: ReactNode;
}

/**
 * Modal
 * -----
 * A dialog overlay — combining Bootstrap's modal options (sizes, centered,
 * static backdrop, scrolling, fullscreen) with Tailwind UI styling. Controlled
 * via `open` / `onClose`. Closes on Escape and backdrop click (unless
 * `staticBackdrop`), and locks body scroll while open.
 *
 * @example
 * ```tsx
 * import Modal from "@/components/elements/Modal";
 * import Button from "@/components/elements/Button";
 *
 * const [open, setOpen] = useState(false);
 *
 * <Button onClick={() => setOpen(true)}>Open</Button>
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Modal title"
 *   footer={<Button onClick={() => setOpen(false)}>Close</Button>}
 * >
 *   Modal body text goes here.
 * </Modal>
 * ```
 */
export default function Modal({
  open,
  onClose,
  title,
  footer,
  size = "md",
  centered = false,
  staticBackdrop = false,
  fullscreen = false,
  children,
}: ModalProps) {
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

  const panelSize = fullscreen
    ? "h-dvh w-screen max-w-none rounded-none"
    : `${SIZES[size]} max-h-[calc(100dvh-2rem)] rounded-xl`;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => !staticBackdrop && onClose()}
      />

      {/* Panel wrapper */}
      <div
        className={`relative flex min-h-full justify-center ${
          fullscreen ? "p-0" : "p-4"
        } ${centered ? "items-center" : "items-start sm:pt-16"}`}
      >
        <div
          role="dialog"
          aria-modal="true"
          className={`relative flex w-full flex-col bg-white shadow-xl transition-transform duration-200 dark:bg-zinc-900 ${panelSize} ${
            open ? "scale-100" : "scale-95"
          }`}
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
    </div>
  );
}

/* ----------------------------- Playground demos ---------------------------- */

function Launcher({
  trigger,
  title = "Modal title",
  children,
  footer,
  ...rest
}: {
  trigger: string;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
} & Omit<ModalProps, "open" | "onClose" | "children" | "title">) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <Modal
        open={open}
        onClose={close}
        title={title}
        footer={
          footer ?? (
            <>
              <Button color="secondary" variant="outline" onClick={close}>
                Close
              </Button>
              <Button color="primary" onClick={close}>
                Save changes
              </Button>
            </>
          )
        }
        {...rest}
      >
        {children ?? (
          <p>
            This is the modal body. Put any content here — text, forms, images,
            and so on.
          </p>
        )}
      </Modal>
    </>
  );
}

function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)}>
        Delete account
      </Button>
      <Modal
        open={open}
        onClose={close}
        size="sm"
        centered
        footer={
          <>
            <Button color="secondary" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button color="danger" onClick={close}>
              Delete
            </Button>
          </>
        }
      >
        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Delete account
            </h3>
            <p className="mt-1">
              Are you sure? This action cannot be undone and all your data will
              be permanently removed.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

const LONG = Array.from({ length: 12 }, (_, i) => (
  <p key={i} className="mb-3">
    Paragraph {i + 1}. This is some placeholder content to demonstrate a modal
    with a lot of body text. When the content is taller than the screen, the
    body scrolls while the header and footer stay in place.
  </p>
));

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Modal") and renders each variant's demo + code.
 */
export const modalElement = {
  name: "Modal",
  variants: [
    {
      name: "Basic",
      description: "A title, body and footer actions with a close button.",
      demo: <Launcher trigger="Open modal" />,
      code: `import Modal from "@/components/elements/Modal";
import Button from "@/components/elements/Button";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Modal title"
  footer={
    <>
      <Button color="secondary" variant="outline" onClick={() => setOpen(false)}>Close</Button>
      <Button color="primary" onClick={() => setOpen(false)}>Save changes</Button>
    </>
  }
>
  Modal body text goes here.
</Modal>`,
    },
    {
      name: "Centered",
      description: "Vertically centre the modal — pass `centered`.",
      demo: <Launcher trigger="Centered modal" centered />,
      code: `<Modal open={open} onClose={close} centered title="Centered">…</Modal>`,
    },
    {
      name: "Static backdrop",
      description:
        "Clicking the backdrop won't close it — pass `staticBackdrop`. (Use the Close button.)",
      demo: <Launcher trigger="Static backdrop" staticBackdrop />,
      code: `<Modal open={open} onClose={close} staticBackdrop title="Static">…</Modal>`,
    },
    {
      name: "Scrolling long content",
      description: "When the body is taller than the screen, it scrolls.",
      demo: (
        <Launcher trigger="Long content" title="Terms of service">
          {LONG}
        </Launcher>
      ),
      code: `<Modal open={open} onClose={close} title="Terms of service">
  {/* lots of content — the body scrolls automatically */}
</Modal>`,
    },
    {
      name: "Sizes",
      description: "Four widths — pass `size`: sm, md (default), lg or xl.",
      demo: (
        <div className="flex flex-wrap gap-2">
          <Launcher trigger="Small" size="sm" title="Small modal" />
          <Launcher trigger="Large" size="lg" title="Large modal" />
          <Launcher trigger="Extra large" size="xl" title="Extra large modal" />
        </div>
      ),
      code: `<Modal open={open} onClose={close} size="sm" title="Small">…</Modal>
<Modal open={open} onClose={close} size="lg" title="Large">…</Modal>
<Modal open={open} onClose={close} size="xl" title="Extra large">…</Modal>`,
    },
    {
      name: "Fullscreen",
      description: "Cover the whole viewport — pass `fullscreen`.",
      demo: <Launcher trigger="Fullscreen" fullscreen title="Fullscreen modal" />,
      code: `<Modal open={open} onClose={close} fullscreen title="Fullscreen">…</Modal>`,
    },
    {
      name: "Alert dialog",
      description:
        "A Tailwind-style confirmation dialog — icon, message and destructive action.",
      demo: <AlertDialogDemo />,
      code: `<Modal open={open} onClose={close} size="sm" centered
  footer={
    <>
      <Button color="secondary" variant="outline" onClick={close}>Cancel</Button>
      <Button color="danger" onClick={close}>Delete</Button>
    </>
  }
>
  <div className="flex gap-4">
    <div className="...icon..."> {/* warning icon */} </div>
    <div>
      <h3 className="font-semibold">Delete account</h3>
      <p className="mt-1">Are you sure? This cannot be undone.</p>
    </div>
  </div>
</Modal>`,
    },
  ],
};
