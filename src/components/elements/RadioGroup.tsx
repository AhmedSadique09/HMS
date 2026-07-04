import type { ReactNode } from "react";

/** One option in a {@link RadioGroup}. */
export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

/**
 * Props for the {@link RadioGroup} component.
 *
 * @property name         - Shared input name (groups the radios).
 * @property options      - The choices.
 * @property defaultValue - Initially selected value.
 * @property onChange      - Called with the selected value.
 * @property className    - Extra classes.
 */
export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * RadioGroup
 * ----------
 * A custom-styled set of radio buttons (no browser default, no dependencies).
 *
 * @example
 * ```tsx
 * import RadioGroup from "@/components/elements/RadioGroup";
 *
 * <RadioGroup
 *   name="plan"
 *   defaultValue="pro"
 *   options={[
 *     { value: "free", label: "Free" },
 *     { value: "pro", label: "Pro" },
 *   ]}
 * />
 * ```
 */
export default function RadioGroup({
  name,
  options,
  defaultValue,
  onChange,
  className = "",
}: RadioGroupProps) {
  return (
    <div className={`space-y-2 ${className}`} role="radiogroup">
      {options.map((o) => (
        <label
          key={o.value}
          className={`flex items-start gap-2.5 ${
            o.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          }`}
        >
          <span className="relative mt-0.5 inline-flex">
            <input
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={defaultValue === o.value}
              disabled={o.disabled}
              onChange={(e) => onChange?.(e.target.value)}
              className="peer size-4 appearance-none rounded-full border border-zinc-300 bg-white transition checked:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:border-zinc-600 dark:bg-zinc-900"
            />
            <span className="pointer-events-none absolute left-1/2 top-1/2 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 peer-checked:block" />
          </span>
          <span className="text-sm leading-snug">
            <span className="font-medium text-zinc-800 dark:text-zinc-100">
              {o.label}
            </span>
            {o.description && (
              <span className="block text-zinc-500 dark:text-zinc-400">
                {o.description}
              </span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}

/** Playground entry. */
export const radioGroupElement = {
  name: "Radio group",
  variants: [
    {
      name: "Basic",
      description: "A simple set of choices.",
      demo: (
        <RadioGroup
          name="rg-basic"
          defaultValue="b"
          options={[
            { value: "a", label: "Option one" },
            { value: "b", label: "Option two" },
            { value: "c", label: "Option three" },
          ]}
        />
      ),
      code: `import RadioGroup from "@/components/elements/RadioGroup";

<RadioGroup
  name="plan"
  defaultValue="b"
  options={[
    { value: "a", label: "Option one" },
    { value: "b", label: "Option two" },
  ]}
/>`,
    },
    {
      name: "With descriptions",
      description: "Each option can have a secondary line.",
      demo: (
        <RadioGroup
          name="rg-desc"
          defaultValue="pro"
          options={[
            { value: "free", label: "Free", description: "Up to 3 projects." },
            { value: "pro", label: "Pro", description: "Unlimited projects." },
            {
              value: "ent",
              label: "Enterprise",
              description: "Custom limits & SSO.",
            },
          ]}
        />
      ),
      code: `<RadioGroup
  name="plan"
  defaultValue="pro"
  options={[
    { value: "free", label: "Free", description: "Up to 3 projects." },
    { value: "pro", label: "Pro", description: "Unlimited projects." },
  ]}
/>`,
    },
    {
      name: "With disabled",
      description: "An option can be disabled.",
      demo: (
        <RadioGroup
          name="rg-dis"
          defaultValue="a"
          options={[
            { value: "a", label: "Available" },
            { value: "b", label: "Sold out", disabled: true },
          ]}
        />
      ),
      code: `<RadioGroup
  name="x"
  options={[
    { value: "a", label: "Available" },
    { value: "b", label: "Sold out", disabled: true },
  ]}
/>`,
    },
  ],
};
