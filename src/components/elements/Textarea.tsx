import type { TextareaHTMLAttributes, ReactNode } from "react";

/**
 * Props for the {@link Textarea} component. Extends the native `<textarea>`.
 *
 * @property label - Optional label above the field.
 * @property hint  - Helper text below the field.
 * @property error - Error message (turns the field red).
 */
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

/**
 * Textarea
 * --------
 * A multi-line text field with an optional label, helper text and error state.
 * Custom Tailwind, no dependencies.
 *
 * @example
 * ```tsx
 * import Textarea from "@/components/elements/Textarea";
 *
 * <Textarea label="Message" rows={4} placeholder="Write something…" />
 * ```
 */
export default function Textarea({
  label,
  hint,
  error,
  className = "",
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:text-white ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-zinc-300 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700"
        }`}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : (
        hint && (
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
        )
      )}
    </div>
  );
}

/** Playground entry. */
export const textareaElement = {
  name: "Textarea",
  variants: [
    {
      name: "Basic",
      description: "A labelled multi-line field with helper text.",
      demo: (
        <div className="max-w-sm">
          <Textarea
            label="Message"
            placeholder="Write your message…"
            hint="Max 500 characters."
          />
        </div>
      ),
      code: `import Textarea from "@/components/elements/Textarea";

<Textarea label="Message" placeholder="Write your message…" hint="Max 500 characters." />`,
    },
    {
      name: "Error",
      description: "Error state — pass `error`.",
      demo: (
        <div className="max-w-sm">
          <Textarea label="Bio" error="This field is required." />
        </div>
      ),
      code: `<Textarea label="Bio" error="This field is required." />`,
    },
    {
      name: "Disabled",
      description: "The disabled state.",
      demo: (
        <div className="max-w-sm">
          <Textarea defaultValue="Can't edit this." disabled />
        </div>
      ),
      code: `<Textarea disabled defaultValue="Can't edit this." />`,
    },
  ],
};
