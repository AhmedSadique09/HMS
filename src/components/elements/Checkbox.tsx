import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Props for the {@link Checkbox} component. Extends the native checkbox.
 *
 * @property label       - Text beside the box.
 * @property description - Secondary text under the label.
 */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
}

/**
 * Checkbox
 * --------
 * A custom-styled checkbox (no browser default, no dependencies) — built with a
 * hidden native input and a Tailwind `peer` box + tick.
 *
 * @example
 * ```tsx
 * import Checkbox from "@/components/elements/Checkbox";
 *
 * <Checkbox label="Accept terms" defaultChecked />
 * ```
 */
export default function Checkbox({
  label,
  description,
  className = "",
  id,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={`flex items-start gap-2.5 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${className}`}
    >
      <span className="relative mt-0.5 inline-flex">
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          className="peer size-4 appearance-none rounded border border-zinc-300 bg-white transition checked:border-blue-600 checked:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:border-zinc-600 dark:bg-zinc-900"
          {...props}
        />
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="white"
          strokeWidth={2}
          className="pointer-events-none absolute inset-0 hidden size-4 peer-checked:block"
        >
          <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {(label || description) && (
        <span className="text-sm leading-snug">
          {label && (
            <span className="font-medium text-zinc-800 dark:text-zinc-100">
              {label}
            </span>
          )}
          {description && (
            <span className="block text-zinc-500 dark:text-zinc-400">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}

/** Playground entry. */
export const checkboxElement = {
  name: "Checkbox",
  variants: [
    {
      name: "Basic",
      description: "A single checkbox with a label.",
      demo: (
        <div className="space-y-2">
          <Checkbox label="Subscribe to the newsletter" defaultChecked />
          <Checkbox label="Remember me" />
        </div>
      ),
      code: `import Checkbox from "@/components/elements/Checkbox";

<Checkbox label="Subscribe to the newsletter" defaultChecked />`,
    },
    {
      name: "With description",
      description: "A label plus a secondary line.",
      demo: (
        <Checkbox
          label="Comments"
          description="Get notified when someone replies."
          defaultChecked
        />
      ),
      code: `<Checkbox
  label="Comments"
  description="Get notified when someone replies."
/>`,
    },
    {
      name: "Disabled",
      description: "Disabled, checked and unchecked.",
      demo: (
        <div className="space-y-2">
          <Checkbox label="Disabled checked" defaultChecked disabled />
          <Checkbox label="Disabled" disabled />
        </div>
      ),
      code: `<Checkbox label="Disabled checked" defaultChecked disabled />`,
    },
  ],
};
