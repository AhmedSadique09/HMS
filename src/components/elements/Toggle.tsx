"use client";

import { useState, type ReactNode } from "react";

/**
 * Props for the {@link Toggle} component.
 *
 * @property defaultPressed - Initial pressed state (uncontrolled).
 * @property pressed        - Controlled pressed state.
 * @property onPressedChange - Called with the new pressed state.
 * @property variant        - `"default"` (subtle) or `"outline"`.
 * @property disabled       - Disable the toggle.
 * @property children       - Toggle content (icon and/or text).
 */
export interface ToggleProps {
  defaultPressed?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline";
  disabled?: boolean;
  "aria-label"?: string;
  children: ReactNode;
}

/**
 * Toggle
 * ------
 * A two-state button (on / off) — like a bold/italic formatting toggle. Custom
 * Tailwind, no dependencies.
 *
 * @example
 * ```tsx
 * import { Toggle } from "@/components/elements/Toggle";
 *
 * <Toggle aria-label="Bold">B</Toggle>
 * ```
 */
export function Toggle({
  defaultPressed = false,
  pressed: pressedProp,
  onPressedChange,
  variant = "default",
  disabled = false,
  children,
  ...props
}: ToggleProps) {
  const [internal, setInternal] = useState(defaultPressed);
  const pressed = pressedProp ?? internal;

  const toggle = () => {
    const next = !pressed;
    if (pressedProp === undefined) setInternal(next);
    onPressedChange?.(next);
  };

  const base =
    "inline-flex min-w-9 items-center justify-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";
  const styles =
    variant === "outline"
      ? pressed
        ? "border border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/15 dark:text-blue-300"
        : "border border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      : pressed
        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800";

  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={toggle}
      disabled={disabled}
      className={`${base} ${styles}`}
      {...props}
    >
      {children}
    </button>
  );
}

/** One item in a {@link ToggleGroup}. */
export interface ToggleGroupItem {
  value: string;
  label: ReactNode;
  "aria-label"?: string;
}

/**
 * ToggleGroup
 * -----------
 * A joined set of toggles — single or multiple selection. Custom Tailwind.
 *
 * @property items        - The toggle options.
 * @property type         - `"single"` (default) or `"multiple"`.
 * @property defaultValue - Initial value(s).
 * @property className    - Extra classes.
 */
export function ToggleGroup({
  items,
  type = "single",
  defaultValue,
  className = "",
}: {
  items: ToggleGroupItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}) {
  const [value, setValue] = useState<string[]>(
    defaultValue === undefined
      ? []
      : Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue],
  );

  const isOn = (v: string) => value.includes(v);
  const onClick = (v: string) => {
    if (type === "multiple") {
      setValue((prev) =>
        prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
      );
    } else {
      setValue((prev) => (prev[0] === v ? [] : [v]));
    }
  };

  return (
    <div
      className={`inline-flex -space-x-px rounded-md shadow-sm ${className}`}
      role="group"
    >
      {items.map((it) => {
        const on = isOn(it.value);
        return (
          <button
            key={it.value}
            type="button"
            aria-pressed={on}
            aria-label={it["aria-label"]}
            onClick={() => onClick(it.value)}
            className={`relative inline-flex min-w-9 items-center justify-center border px-3 py-2 text-sm font-medium transition-colors first:rounded-l-md last:rounded-r-md ${
              on
                ? "z-10 border-blue-600 bg-blue-600 text-white"
                : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

/** Playground entry. */
export const toggleElement = {
  name: "Toggle",
  variants: [
    {
      name: "Single toggle",
      description: "A two-state button — default and outline styles.",
      demo: (
        <div className="flex items-center gap-3">
          <Toggle aria-label="Bold" defaultPressed>
            <span className="font-bold">B</span>
          </Toggle>
          <Toggle aria-label="Italic">
            <span className="italic">I</span>
          </Toggle>
          <Toggle aria-label="Underline" variant="outline">
            <span className="underline">U</span>
          </Toggle>
        </div>
      ),
      code: `import { Toggle } from "@/components/elements/Toggle";

<Toggle aria-label="Bold" defaultPressed>B</Toggle>
<Toggle aria-label="Italic">I</Toggle>
<Toggle aria-label="Underline" variant="outline">U</Toggle>`,
    },
    {
      name: "Toggle group (single)",
      description: "Pick one — a joined segmented control.",
      demo: (
        <ToggleGroup
          type="single"
          defaultValue="center"
          items={[
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ]}
        />
      ),
      code: `import { ToggleGroup } from "@/components/elements/Toggle";

<ToggleGroup
  type="single"
  defaultValue="center"
  items={[
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ]}
/>`,
    },
    {
      name: "Toggle group (multiple)",
      description: "Pick several — toggle each independently.",
      demo: (
        <ToggleGroup
          type="multiple"
          defaultValue={["bold"]}
          items={[
            { value: "bold", label: <span className="font-bold">B</span> },
            { value: "italic", label: <span className="italic">I</span> },
            { value: "underline", label: <span className="underline">U</span> },
          ]}
        />
      ),
      code: `<ToggleGroup
  type="multiple"
  defaultValue={["bold"]}
  items={[
    { value: "bold", label: "B" },
    { value: "italic", label: "I" },
    { value: "underline", label: "U" },
  ]}
/>`,
    },
  ],
};
