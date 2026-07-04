import type { InputHTMLAttributes, ReactNode } from "react";

const SIZES = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-3.5 py-2.5 text-base",
} as const;

/**
 * Props for the {@link Input} component. Extends the native `<input>`.
 *
 * @property label      - Optional label above the field.
 * @property hint       - Helper text below the field.
 * @property error      - Error message (turns the field red).
 * @property icon       - Optional leading icon.
 * @property inputSize  - `"sm"`, `"md"` (default) or `"lg"`.
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  icon?: ReactNode;
  inputSize?: keyof typeof SIZES;
}

/**
 * Input
 * -----
 * A text field with an optional label, leading icon, helper text and error
 * state. Custom Tailwind, no dependencies.
 *
 * @example
 * ```tsx
 * import Input from "@/components/elements/Input";
 *
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * ```
 */
export default function Input({
  label,
  hint,
  error,
  icon,
  inputSize = "md",
  className = "",
  id,
  ...props
}: InputProps) {
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
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full rounded-md border bg-white text-zinc-900 placeholder-zinc-400 outline-none transition focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:text-white ${
            SIZES[inputSize]
          } ${icon ? "pl-9" : ""} ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-zinc-300 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700"
          }`}
          {...props}
        />
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

const SearchIcon = (
  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 1 0 3.4 9.82l3.14 3.13a.75.75 0 1 0 1.06-1.06l-3.13-3.14A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
      clipRule="evenodd"
    />
  </svg>
);

/** Playground entry. */
export const inputElement = {
  name: "Input",
  variants: [
    {
      name: "Basic",
      description: "A labelled text field with helper text.",
      demo: (
        <div className="max-w-xs">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            hint="We'll never share your email."
          />
        </div>
      ),
      code: `import Input from "@/components/elements/Input";

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  hint="We'll never share your email."
/>`,
    },
    {
      name: "With icon",
      description: "A leading icon — pass `icon`.",
      demo: (
        <div className="max-w-xs">
          <Input icon={SearchIcon} placeholder="Search…" />
        </div>
      ),
      code: `<Input icon={<SearchIcon />} placeholder="Search…" />`,
    },
    {
      name: "Error",
      description: "Error state — pass `error`.",
      demo: (
        <div className="max-w-xs">
          <Input
            label="Username"
            defaultValue="ab"
            error="Must be at least 3 characters."
          />
        </div>
      ),
      code: `<Input label="Username" error="Must be at least 3 characters." />`,
    },
    {
      name: "Sizes & disabled",
      description: "Three sizes plus the disabled state.",
      demo: (
        <div className="flex max-w-xs flex-col gap-2">
          <Input inputSize="sm" placeholder="Small" />
          <Input inputSize="md" placeholder="Medium" />
          <Input inputSize="lg" placeholder="Large" />
          <Input placeholder="Disabled" disabled />
        </div>
      ),
      code: `<Input inputSize="sm" placeholder="Small" />
<Input inputSize="lg" placeholder="Large" />
<Input placeholder="Disabled" disabled />`,
    },
  ],
};
