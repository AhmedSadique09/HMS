import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Props for the {@link Switch} component. Extends the native checkbox.
 *
 * @property label - Optional text beside the switch.
 */
export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
}

/**
 * Switch
 * ------
 * A custom toggle switch (no dependencies) — a hidden native checkbox with a
 * Tailwind `peer` track + knob.
 *
 * @example
 * ```tsx
 * import Switch from "@/components/elements/Switch";
 *
 * <Switch label="Email notifications" defaultChecked />
 * ```
 */
export default function Switch({
  label,
  className = "",
  disabled,
  id,
  ...props
}: SwitchProps) {
  return (
    <label
      className={`inline-flex items-center gap-3 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${className}`}
    >
      <span className="relative inline-flex">
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span className="h-6 w-11 rounded-full bg-zinc-300 transition-colors peer-checked:bg-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 dark:bg-zinc-700" />
        <span className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
      {label && (
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          {label}
        </span>
      )}
    </label>
  );
}

/** Playground entry. */
export const switchElement = {
  name: "Switch",
  variants: [
    {
      name: "Basic",
      description: "A toggle with a label. Click it.",
      demo: (
        <div className="space-y-3">
          <Switch label="Email notifications" defaultChecked />
          <Switch label="Push notifications" />
        </div>
      ),
      code: `import Switch from "@/components/elements/Switch";

<Switch label="Email notifications" defaultChecked />`,
    },
    {
      name: "Without label",
      description: "Just the toggle.",
      demo: (
        <div className="flex items-center gap-4">
          <Switch defaultChecked />
          <Switch />
        </div>
      ),
      code: `<Switch defaultChecked />`,
    },
    {
      name: "Disabled",
      description: "Disabled, on and off.",
      demo: (
        <div className="space-y-3">
          <Switch label="Disabled on" defaultChecked disabled />
          <Switch label="Disabled off" disabled />
        </div>
      ),
      code: `<Switch label="Disabled on" defaultChecked disabled />`,
    },
  ],
};
