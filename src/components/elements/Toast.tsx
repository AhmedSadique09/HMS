"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import Button from "@/components/elements/Button";

/** A toast's contextual type. */
export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "default";

/** A toast's data. */
export interface ToastData {
  id: number;
  type?: ToastType;
  title: ReactNode;
  description?: ReactNode;
  action?: { label: string; onClick: () => void };
  duration?: number;
  /** Solid coloured background instead of the white card (rich colours). */
  solid?: boolean;
}

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
    <path fillRule="evenodd" d={d} clipRule="evenodd" />
  </svg>
);

const TYPE: Record<ToastType, { color: string; icon: ReactNode }> = {
  success: {
    color: "text-green-500",
    icon: (
      <Icon d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" />
    ),
  },
  error: {
    color: "text-red-500",
    icon: (
      <Icon d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" />
    ),
  },
  warning: {
    color: "text-amber-500",
    icon: (
      <Icon d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    ),
  },
  info: {
    color: "text-blue-500",
    icon: (
      <Icon d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" />
    ),
  },
  loading: {
    color: "text-zinc-400",
    icon: (
      <span className="block size-5 animate-spin rounded-full border-2 border-current border-r-transparent" />
    ),
  },
  default: { color: "text-zinc-400", icon: null },
};

/** Solid (rich colour) backgrounds per type. */
const SOLID: Record<ToastType, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-amber-500 text-white",
  info: "bg-blue-600 text-white",
  loading: "bg-zinc-800 text-white dark:bg-zinc-700",
  default: "bg-zinc-800 text-white dark:bg-zinc-700",
};

/** A single toast card. */
function Toast({
  type = "default",
  title,
  description,
  action,
  solid = false,
  onClose,
}: Omit<ToastData, "id" | "duration"> & { onClose: () => void }) {
  const conf = TYPE[type];
  const skin = solid
    ? SOLID[type]
    : "border border-zinc-200 bg-white ring-1 ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:ring-white/10";
  const titleCls = solid ? "text-white" : "text-zinc-900 dark:text-white";
  const descCls = solid ? "text-white/80" : "text-zinc-500 dark:text-zinc-400";
  const actionCls = solid
    ? "text-white underline hover:text-white/90"
    : "text-blue-600 hover:text-blue-500 dark:text-blue-400";
  const closeCls = solid
    ? "text-white/70 hover:text-white"
    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200";

  return (
    <div
      className={`pointer-events-auto flex w-72 items-start gap-3 rounded-xl p-3.5 shadow-lg animate-[toast-in_0.2s_ease-out] ${skin}`}
    >
      {conf.icon && (
        <span className={`mt-0.5 shrink-0 ${solid ? "text-white" : conf.color}`}>
          {conf.icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${titleCls}`}>{title}</p>
        {description && <p className={`mt-0.5 text-sm ${descCls}`}>{description}</p>}
        {action && (
          <button
            type="button"
            onClick={() => {
              action.onClick();
              onClose();
            }}
            className={`mt-2 text-sm font-medium ${actionCls}`}
          >
            {action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className={`shrink-0 transition-colors ${closeCls}`}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    </div>
  );
}

/**
 * useToasts
 * ---------
 * A tiny toast store. Returns the live `toasts` list plus `toast()` to push one
 * (auto-dismisses after `duration`, default 3500ms) and `dismiss()` to remove.
 *
 * @example
 * ```tsx
 * const { toasts, toast, dismiss } = useToasts();
 * toast({ type: "success", title: "Saved!" });
 * <ToastViewport toasts={toasts} onDismiss={dismiss} />
 * ```
 */
export function useToasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback(
    (id: number) => setToasts((t) => t.filter((x) => x.id !== id)),
    [],
  );

  const toast = useCallback(
    (data: Omit<ToastData, "id">) => {
      const id = (idRef.current += 1);
      setToasts((t) => [...t, { ...data, id }]);
      // Loading toasts and duration === Infinity stay until updated/dismissed.
      if (data.type !== "loading" && data.duration !== Infinity) {
        setTimeout(() => dismiss(id), data.duration ?? 3500);
      }
      return id;
    },
    [dismiss],
  );

  const update = useCallback(
    (id: number, patch: Partial<Omit<ToastData, "id">>, duration?: number) => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, ...patch } : x)));
      if (duration !== undefined && duration !== Infinity) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss],
  );

  /** Show a loading toast, then resolve it to success / error. */
  const promise = useCallback(
    async <T,>(
      p: Promise<T>,
      msgs: { loading: ReactNode; success: ReactNode; error: ReactNode },
    ) => {
      const id = toast({ type: "loading", title: msgs.loading, duration: Infinity });
      try {
        const result = await p;
        update(id, { type: "success", title: msgs.success }, 3500);
        return result;
      } catch {
        update(id, { type: "error", title: msgs.error }, 3500);
      }
    },
    [toast, update],
  );

  return { toasts, toast, dismiss, update, promise };
}

/**
 * ToastViewport
 * -------------
 * Renders the stacked toasts. Defaults to the bottom-right of the screen; pass
 * `className` to reposition (e.g. for a contained demo).
 */
export function ToastViewport({
  toasts,
  onDismiss,
  className = "fixed bottom-4 right-4 z-50",
}: {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none flex flex-col gap-2 ${className}`}>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          type={t.type}
          title={t.title}
          description={t.description}
          action={t.action}
          solid={t.solid}
          onClose={() => onDismiss(t.id)}
        />
      ))}
    </div>
  );
}

/* ----------------------------- Playground demos ---------------------------- */

function Frame({
  fire,
  position = "absolute bottom-3 right-3 z-10",
}: {
  fire: (ctl: ReturnType<typeof useToasts>) => ReactNode;
  position?: string;
}) {
  const ctl = useToasts();
  return (
    <div className="relative h-56 overflow-hidden rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex flex-wrap gap-2">{fire(ctl)}</div>
      <ToastViewport
        toasts={ctl.toasts}
        onDismiss={ctl.dismiss}
        className={position}
      />
    </div>
  );
}

function TypesDemo() {
  return (
    <Frame
      fire={({ toast }) => (
        <>
          <Button
            size="sm"
            color="success"
            onClick={() => toast({ type: "success", title: "Changes saved" })}
          >
            Success
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => toast({ type: "error", title: "Something went wrong" })}
          >
            Error
          </Button>
          <Button
            size="sm"
            color="warning"
            onClick={() => toast({ type: "warning", title: "Check your input" })}
          >
            Warning
          </Button>
          <Button
            size="sm"
            color="info"
            onClick={() => toast({ type: "info", title: "Update available" })}
          >
            Info
          </Button>
        </>
      )}
    />
  );
}

function DescriptionDemo() {
  return (
    <Frame
      fire={({ toast }) => (
        <Button
          size="sm"
          color="primary"
          onClick={() =>
            toast({
              type: "success",
              title: "Payment received",
              description: "$420.00 from Acme Inc. has cleared.",
            })
          }
        >
          Show toast
        </Button>
      )}
    />
  );
}

function ActionDemo() {
  return (
    <Frame
      fire={({ toast }) => (
        <Button
          size="sm"
          color="secondary"
          variant="outline"
          onClick={() =>
            toast({
              title: "Conversation archived",
              action: { label: "Undo", onClick: () => {} },
              duration: 6000,
            })
          }
        >
          Archive
        </Button>
      )}
    />
  );
}

function LoadingDemo() {
  return (
    <Frame
      fire={({ promise }) => (
        <Button
          size="sm"
          color="primary"
          onClick={() =>
            promise(new Promise((res) => setTimeout(res, 2000)), {
              loading: "Saving changes…",
              success: "Changes saved",
              error: "Could not save",
            })
          }
        >
          Save (promise)
        </Button>
      )}
    />
  );
}

function RichColorsDemo() {
  return (
    <Frame
      fire={({ toast }) => (
        <>
          <Button
            size="sm"
            color="success"
            onClick={() =>
              toast({ type: "success", solid: true, title: "Changes saved" })
            }
          >
            Success
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() =>
              toast({ type: "error", solid: true, title: "Something went wrong" })
            }
          >
            Error
          </Button>
          <Button
            size="sm"
            color="info"
            onClick={() => toast({ type: "info", solid: true, title: "Heads up!" })}
          >
            Info
          </Button>
        </>
      )}
    />
  );
}

function PositionsDemo() {
  return (
    <Frame
      position="absolute left-1/2 top-3 z-10 -translate-x-1/2"
      fire={({ toast }) => (
        <Button
          size="sm"
          color="primary"
          onClick={() => toast({ type: "info", title: "Top-center toast" })}
        >
          Show at top-center
        </Button>
      )}
    />
  );
}

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Toast") and renders each variant's demo + code.
 */
export const toastElement = {
  name: "Toast",
  variants: [
    {
      name: "Types",
      description:
        "Modern stacked toasts with auto-dismiss. Click to fire each type — they stack and slide in.",
      demo: <TypesDemo />,
      code: `import { useToasts, ToastViewport } from "@/components/elements/Toast";

function App() {
  const { toasts, toast, dismiss } = useToasts();
  return (
    <>
      <button onClick={() => toast({ type: "success", title: "Changes saved" })}>
        Save
      </button>
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </>
  );
}`,
    },
    {
      name: "With description",
      description: "A title plus a secondary description line.",
      demo: <DescriptionDemo />,
      code: `toast({
  type: "success",
  title: "Payment received",
  description: "$420.00 from Acme Inc. has cleared.",
});`,
    },
    {
      name: "With action",
      description: "An inline action button (e.g. Undo) and a longer duration.",
      demo: <ActionDemo />,
      code: `toast({
  title: "Conversation archived",
  action: { label: "Undo", onClick: restore },
  duration: 6000,
});`,
    },
    {
      name: "Loading / promise",
      description:
        "Show a loading toast that resolves to success or error — use `promise()`.",
      demo: <LoadingDemo />,
      code: `const { promise } = useToasts();

promise(saveChanges(), {
  loading: "Saving changes…",
  success: "Changes saved",
  error: "Could not save",
});`,
    },
    {
      name: "Rich colors",
      description:
        "Solid coloured backgrounds instead of the white card — pass `solid`.",
      demo: <RichColorsDemo />,
      code: `toast({ type: "success", solid: true, title: "Changes saved" });
toast({ type: "error", solid: true, title: "Something went wrong" });`,
    },
    {
      name: "Positions",
      description:
        "Place the viewport anywhere — pass `className` to ToastViewport (e.g. top-center).",
      demo: <PositionsDemo />,
      code: `<ToastViewport
  toasts={toasts}
  onDismiss={dismiss}
  className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
/>`,
    },
  ],
};
