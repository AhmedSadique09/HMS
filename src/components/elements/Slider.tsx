"use client";

import { useState, type ReactNode } from "react";

/**
 * Props for the {@link Slider} component.
 *
 * @property min, max, step - Range bounds and increment.
 * @property defaultValue   - Initial value.
 * @property onChange       - Called with the new value.
 * @property label          - Optional label.
 * @property showValue      - Show the current value. Default true.
 * @property disabled       - Disable the slider.
 * @property className      - Extra classes on the wrapper.
 */
export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  label?: ReactNode;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Slider
 * ------
 * A range input with a custom track + thumb and a filled portion — custom
 * Tailwind, no dependencies.
 *
 * @example
 * ```tsx
 * import Slider from "@/components/elements/Slider";
 *
 * <Slider label="Volume" defaultValue={60} />
 * ```
 */
export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  onChange,
  label,
  showValue = true,
  disabled = false,
  className = "",
}: SliderProps) {
  const [val, setVal] = useState(defaultValue ?? min);
  const pct = ((val - min) / (max - min)) * 100;

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          {label && (
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              {label}
            </span>
          )}
          {showValue && (
            <span className="tabular-nums text-zinc-500 dark:text-zinc-400">
              {val}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        disabled={disabled}
        onChange={(e) => {
          const v = Number(e.target.value);
          setVal(v);
          onChange?.(v);
        }}
        className="slider w-full"
        style={{
          background: `linear-gradient(to right, rgb(37 99 235) ${pct}%, rgb(228 228 231) ${pct}%)`,
        }}
      />
    </div>
  );
}

/** Playground entry. */
export const sliderElement = {
  name: "Slider",
  variants: [
    {
      name: "Basic",
      description: "A simple slider with a value readout.",
      demo: (
        <div className="max-w-sm">
          <Slider defaultValue={40} />
        </div>
      ),
      code: `import Slider from "@/components/elements/Slider";

<Slider defaultValue={40} />`,
    },
    {
      name: "With label",
      description: "A labelled slider.",
      demo: (
        <div className="max-w-sm">
          <Slider label="Volume" defaultValue={70} />
        </div>
      ),
      code: `<Slider label="Volume" defaultValue={70} />`,
    },
    {
      name: "Min / max / step",
      description: "Custom range and increment — e.g. 0–10 in steps of 2.",
      demo: (
        <div className="max-w-sm">
          <Slider label="Rating" min={0} max={10} step={2} defaultValue={6} />
        </div>
      ),
      code: `<Slider label="Rating" min={0} max={10} step={2} defaultValue={6} />`,
    },
    {
      name: "Disabled",
      description: "The disabled state.",
      demo: (
        <div className="max-w-sm">
          <Slider label="Locked" defaultValue={50} disabled />
        </div>
      ),
      code: `<Slider label="Locked" defaultValue={50} disabled />`,
    },
  ],
};
