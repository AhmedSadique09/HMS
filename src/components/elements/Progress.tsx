import type { ReactNode } from "react";

/**
 * ProgressBar
 * -----------
 * A simple horizontal progress bar with an optional label and percentage.
 *
 * @property value     - Fill percentage (0–100).
 * @property label     - Optional label shown above the bar.
 * @property showValue - Show the percentage on the right.
 * @property className - Extra classes merged onto the wrapper.
 *
 * @example
 * ```tsx
 * import { ProgressBar } from "@/components/elements/Progress";
 *
 * <ProgressBar value={45} label="Uploading…" showValue />
 * ```
 */
export function ProgressBar({
  value,
  label,
  showValue = false,
  className = "",
}: {
  value: number;
  label?: ReactNode;
  showValue?: boolean;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-1 flex items-center justify-between text-sm">
          {label && (
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-zinc-500 dark:text-zinc-400">
              {Math.round(v)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

/** The state of a {@link Step}. */
export type StepStatus = "complete" | "current" | "upcoming";

/** One step in a {@link Steps} indicator. */
export interface Step {
  name: string;
  description?: string;
  status: StepStatus;
}

const Check = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
      clipRule="evenodd"
    />
  </svg>
);

function nameClass(status: StepStatus) {
  if (status === "current") return "text-blue-600 dark:text-blue-400";
  if (status === "complete") return "text-zinc-900 dark:text-white";
  return "text-zinc-500 dark:text-zinc-400";
}

function dotClass(status: StepStatus) {
  if (status === "complete") return "bg-blue-600";
  if (status === "current")
    return "bg-blue-600 ring-2 ring-blue-300 ring-offset-2 dark:ring-offset-zinc-900";
  return "bg-zinc-300 dark:bg-zinc-600";
}

function Circle({ status }: { status: StepStatus }) {
  if (status === "complete")
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
        <Check />
      </span>
    );
  if (status === "current")
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 bg-white dark:bg-zinc-900">
        <span className="size-2.5 rounded-full bg-blue-600" />
      </span>
    );
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900" />
  );
}

function NumberNode({ status, index }: { status: StepStatus; index: number }) {
  if (status === "complete")
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
        <Check />
      </span>
    );
  const ring =
    status === "current"
      ? "border-blue-600 text-blue-600"
      : "border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400";
  return (
    <span
      className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium ${ring}`}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

/**
 * Steps
 * -----
 * A step / progress indicator — the Tailwind Plus progress-bars set. Pick a
 * `variant`: `"circles"`, `"circles-text"`, `"bullets"`, `"bullets-text"`,
 * `"panels"` or `"panels-bordered"`.
 *
 * @example
 * ```tsx
 * import { Steps } from "@/components/elements/Progress";
 *
 * <Steps
 *   variant="circles"
 *   steps={[
 *     { name: "Account", status: "complete" },
 *     { name: "Profile", status: "current" },
 *     { name: "Done", status: "upcoming" },
 *   ]}
 * />
 * ```
 */
export function Steps({
  steps,
  variant = "circles",
  className = "",
}: {
  steps: Step[];
  variant?:
    | "circles"
    | "circles-text"
    | "bullets"
    | "bullets-text"
    | "panels"
    | "panels-bordered";
  className?: string;
}) {
  const last = steps.length - 1;

  if (variant === "bullets") {
    return (
      <nav aria-label="Progress" className={className}>
        <ol className="flex items-center gap-4">
          {steps.map((s, i) => (
            <li key={i}>
              <span className={`block size-2.5 rounded-full ${dotClass(s.status)}`} />
              <span className="sr-only">{s.name}</span>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  if (variant === "bullets-text") {
    return (
      <nav aria-label="Progress" className={className}>
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className={`size-2.5 rounded-full ${dotClass(s.status)}`} />
              <span className={`text-sm font-medium ${nameClass(s.status)}`}>
                {s.name}
              </span>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  if (variant === "circles") {
    return (
      <nav aria-label="Progress" className={className}>
        <ol className="flex items-center">
          {steps.map((s, i) => (
            <li
              key={i}
              className={`flex items-center ${i !== last ? "w-full" : ""}`}
            >
              <Circle status={s.status} />
              {i !== last && (
                <span
                  className={`mx-2 h-0.5 w-full ${
                    s.status === "complete"
                      ? "bg-blue-600"
                      : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  if (variant === "circles-text") {
    return (
      <nav aria-label="Progress" className={className}>
        <ol>
          {steps.map((s, i) => (
            <li key={i} className="relative flex gap-4 pb-8 last:pb-0">
              {i !== last && (
                <span
                  className={`absolute bottom-0 left-4 top-8 -ml-px w-0.5 ${
                    s.status === "complete"
                      ? "bg-blue-600"
                      : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                  aria-hidden="true"
                />
              )}
              <Circle status={s.status} />
              <div className="pt-1.5">
                <p className={`text-sm font-medium ${nameClass(s.status)}`}>
                  {s.name}
                </p>
                {s.description && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {s.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  if (variant === "panels-bordered") {
    return (
      <nav aria-label="Progress" className={className}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={i}
              className={`rounded-lg border p-4 ${
                s.status === "current"
                  ? "border-blue-600 ring-1 ring-blue-600"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <p
                className={`text-xs font-medium ${
                  s.status === "upcoming"
                    ? "text-zinc-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                Step {i + 1}
              </p>
              <p className={`mt-1 text-sm font-medium ${nameClass(s.status)}`}>
                {s.name}
              </p>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // panels
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="overflow-hidden rounded-md border border-zinc-200 md:flex dark:border-zinc-800">
        {steps.map((s, i) => (
          <li
            key={i}
            className={`relative md:flex-1 ${
              i !== 0
                ? "border-t border-zinc-200 md:border-l md:border-t-0 dark:border-zinc-800"
                : ""
            }`}
          >
            <span className="flex items-center gap-3 px-6 py-4">
              <NumberNode status={s.status} index={i} />
              <span className="flex flex-col">
                <span className={`text-sm font-medium ${nameClass(s.status)}`}>
                  {s.name}
                </span>
                {s.description && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {s.description}
                  </span>
                )}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

const STEPS: Step[] = [
  { name: "Create account", description: "Set your email and password.", status: "complete" },
  { name: "Profile", description: "Add your details.", status: "complete" },
  { name: "Business info", description: "Tell us about your work.", status: "current" },
  { name: "Theme", description: "Pick a look.", status: "upcoming" },
  { name: "Preview", description: "Review and finish.", status: "upcoming" },
];

const PANELS: Step[] = [
  { name: "Job details", description: "Vitae sed mi luctus.", status: "complete" },
  { name: "Application form", description: "Cursus semper.", status: "complete" },
  { name: "Preview", description: "Penatibus eu quis.", status: "current" },
  { name: "Confirm", description: "Iusto et officia.", status: "upcoming" },
];

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Progress") and renders each variant's demo + code.
 */
export const progressElement = {
  name: "Progress",
  variants: [
    {
      name: "Simple",
      description: "A step count with a thin progress bar.",
      demo: (
        <div className="max-w-md">
          <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
            Step 2 of 4
          </p>
          <ProgressBar value={50} />
        </div>
      ),
      code: `import { ProgressBar } from "@/components/elements/Progress";

<p className="mb-2 text-sm font-medium text-blue-600">Step 2 of 4</p>
<ProgressBar value={50} />`,
    },
    {
      name: "Panels",
      description: "Steps as a connected row of numbered panels.",
      demo: <Steps variant="panels" steps={PANELS} />,
      code: `import { Steps } from "@/components/elements/Progress";

<Steps
  variant="panels"
  steps={[
    { name: "Job details", status: "complete" },
    { name: "Application form", status: "complete" },
    { name: "Preview", status: "current" },
    { name: "Confirm", status: "upcoming" },
  ]}
/>`,
    },
    {
      name: "Bullets",
      description: "Minimal dots — one per step.",
      demo: <Steps variant="bullets" steps={STEPS} />,
      code: `<Steps variant="bullets" steps={steps} />`,
    },
    {
      name: "Panels with border",
      description: "Each step in its own bordered card; the current one is highlighted.",
      demo: <Steps variant="panels-bordered" steps={PANELS} />,
      code: `<Steps variant="panels-bordered" steps={steps} />`,
    },
    {
      name: "Circles",
      description: "Numbered/checked circles connected by lines.",
      demo: (
        <div className="max-w-lg">
          <Steps variant="circles" steps={STEPS} />
        </div>
      ),
      code: `<Steps variant="circles" steps={steps} />`,
    },
    {
      name: "Bullets and text",
      description: "A vertical list of dots with step names.",
      demo: <Steps variant="bullets-text" steps={STEPS} />,
      code: `<Steps variant="bullets-text" steps={steps} />`,
    },
    {
      name: "Circle with text",
      description: "A vertical stepper — circles with a name and description.",
      demo: <Steps variant="circles-text" steps={STEPS} />,
      code: `<Steps variant="circles-text" steps={steps} />`,
    },
    {
      name: "Progress bar",
      description: "A labelled percentage bar.",
      demo: (
        <div className="max-w-md">
          <ProgressBar value={45} label="Uploading files…" showValue />
        </div>
      ),
      code: `import { ProgressBar } from "@/components/elements/Progress";

<ProgressBar value={45} label="Uploading files…" showValue />`,
    },
  ],
};
