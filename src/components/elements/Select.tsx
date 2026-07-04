import type { SelectHTMLAttributes, ReactNode } from "react";

const SIZES = {
  sm: "py-1.5 pl-2.5 pr-8 text-xs",
  md: "py-2 pl-3 pr-9 text-sm",
  lg: "py-2.5 pl-3.5 pr-10 text-base",
} as const;

/** One option in a {@link Select}. */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Props for the {@link Select} component. Extends the native `<select>`.
 *
 * @property label       - Optional label above the field.
 * @property hint        - Helper text below.
 * @property error       - Error message (turns the field red).
 * @property options     - The choices.
 * @property placeholder - A disabled first option.
 * @property selectSize  - `"sm"`, `"md"` (default) or `"lg"`.
 */
export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  selectSize?: keyof typeof SIZES;
}

/**
 * Select
 * ------
 * A styled native `<select>` (no dependencies) — custom border, focus ring and
 * chevron via `appearance-none`.
 *
 * @example
 * ```tsx
 * import Select from "@/components/elements/Select";
 *
 * <Select label="Country" options={[{ value: "pk", label: "Pakistan" }]} />
 * ```
 */
export default function Select({
  label,
  hint,
  error,
  options,
  placeholder,
  selectSize = "md",
  className = "",
  id,
  defaultValue,
  ...props
}: SelectProps) {
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
      <div className="relative">
        <select
          id={id}
          defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
          className={`w-full appearance-none rounded-md border bg-white text-zinc-900 outline-none transition focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:text-white ${
            SIZES[selectSize]
          } ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-zinc-300 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700"
          }`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
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

const COUNTRIES: SelectOption[] = [
  { value: "pk", label: "Pakistan" },
  { value: "in", label: "India" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
];

/** Playground entry. */
export const selectElement = {
  name: "Select",
  variants: [
    {
      name: "Basic",
      description: "A labelled select with a placeholder.",
      demo: (
        <div className="max-w-xs">
          <Select
            label="Country"
            placeholder="Choose a country…"
            options={COUNTRIES}
          />
        </div>
      ),
      code: `import Select from "@/components/elements/Select";

<Select
  label="Country"
  placeholder="Choose a country…"
  options={[
    { value: "pk", label: "Pakistan" },
    { value: "us", label: "United States" },
  ]}
/>`,
    },
    {
      name: "Error",
      description: "Error state — pass `error`.",
      demo: (
        <div className="max-w-xs">
          <Select
            label="Country"
            placeholder="Choose…"
            options={COUNTRIES}
            error="Please select a country."
          />
        </div>
      ),
      code: `<Select label="Country" options={countries} error="Please select a country." />`,
    },
    {
      name: "Sizes & disabled",
      description: "Three sizes plus the disabled state.",
      demo: (
        <div className="flex max-w-xs flex-col gap-2">
          <Select selectSize="sm" options={COUNTRIES} defaultValue="pk" />
          <Select selectSize="md" options={COUNTRIES} defaultValue="pk" />
          <Select selectSize="lg" options={COUNTRIES} defaultValue="pk" />
          <Select options={COUNTRIES} defaultValue="pk" disabled />
        </div>
      ),
      code: `<Select selectSize="sm" options={countries} />
<Select options={countries} disabled />`,
    },
  ],
};
