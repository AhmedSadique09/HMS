"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import Button, { ButtonGroup, type ButtonColor } from "@/components/elements/Button";

/**
 * One entry in a {@link Dropdown} menu.
 *
 * - `divider: true` renders a separator line.
 * - `header: true` renders `label` as a non-clickable section header.
 * - otherwise it's a menu item (link if `href`, button if `onClick`).
 *
 * @property label    - The item text.
 * @property href     - Render as a link to this URL.
 * @property onClick  - Click handler (rendered as a button).
 * @property active   - Highlight as the current item.
 * @property disabled - Non-interactive, faded.
 * @property divider  - Render a separator instead of an item.
 * @property header   - Render `label` as a section header.
 */
export interface DropdownItem {
  label?: ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  divider?: boolean;
  header?: boolean;
}

/**
 * Props for the {@link Dropdown} component.
 *
 * @property label     - The trigger button text.
 * @property items     - The menu entries (ignored if `children` is given).
 * @property children  - Custom menu content (e.g. a form), instead of `items`.
 * @property color     - Trigger colour (Bootstrap convention). Default `"primary"`.
 * @property variant   - `"solid"` or `"outline"` trigger.
 * @property size      - `"sm"`, `"md"` (default) or `"lg"`.
 * @property align     - Menu alignment: `"start"` (default), `"center"` or `"end"`.
 * @property direction - `"down"` (default), `"up"`, `"end"` or `"start"`.
 * @property split     - Split button — a separate caret toggle.
 */
export interface DropdownProps {
  label: ReactNode;
  items?: DropdownItem[];
  children?: ReactNode;
  color?: ButtonColor;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  direction?: "down" | "up" | "end" | "start";
  split?: boolean;
}

function Caret({ up = false }: { up?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={`size-4 ${up ? "rotate-180" : ""}`}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Dropdown
 * --------
 * A toggleable menu — the Tailwind equivalent of Bootstrap's dropdowns.
 * Supports split buttons, item headers/dividers/active/disabled states, four
 * directions, menu alignment and sizes. Closes on outside click or Escape.
 *
 * @example
 * ```tsx
 * import Dropdown from "@/components/elements/Dropdown";
 *
 * <Dropdown
 *   label="Actions"
 *   items={[
 *     { label: "Edit", onClick: edit },
 *     { divider: true },
 *     { label: "Delete", onClick: remove },
 *   ]}
 * />
 * ```
 */
export default function Dropdown({
  label,
  items = [],
  children,
  color = "primary",
  variant = "solid",
  size = "md",
  align = "start",
  direction = "down",
  split = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const horiz =
    align === "end"
      ? "right-0"
      : align === "center"
        ? "left-1/2 -translate-x-1/2"
        : "left-0";
  const menuPosition =
    direction === "up"
      ? `bottom-full mb-1 ${horiz}`
      : direction === "end"
        ? "left-full top-0 ml-1"
        : direction === "start"
          ? "right-full top-0 mr-1"
          : `top-full mt-1 ${horiz}`;

  const toggle = () => setOpen((o) => !o);

  const menu = (
    <div
      role="menu"
      className={`absolute z-20 min-w-48 rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800 ${menuPosition} ${
        open ? "block" : "hidden"
      }`}
    >
      {children}
      {!children &&
        items.map((item, i) => {
        if (item.divider) {
          return (
            <div
              key={i}
              className="my-1 h-px bg-zinc-200 dark:bg-zinc-700"
              role="separator"
            />
          );
        }
        if (item.header) {
          return (
            <div
              key={i}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400"
            >
              {item.label}
            </div>
          );
        }
        const itemClass = `block w-full rounded px-3 py-1.5 text-left text-sm transition-colors ${
          item.active
            ? "bg-blue-600 text-white"
            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
        } ${item.disabled ? "pointer-events-none opacity-50" : ""}`;

        const handle = () => {
          item.onClick?.();
          setOpen(false);
        };

        return item.href ? (
          <a key={i} href={item.href} className={itemClass} role="menuitem">
            {item.label}
          </a>
        ) : (
          <button
            key={i}
            type="button"
            onClick={handle}
            disabled={item.disabled}
            className={itemClass}
            role="menuitem"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div ref={ref} className="relative inline-block">
      {split ? (
        <ButtonGroup>
          <Button color={color} variant={variant} size={size}>
            {label}
          </Button>
          <Button
            color={color}
            variant={variant}
            size={size}
            onClick={toggle}
            aria-expanded={open}
            aria-label="Toggle dropdown"
          >
            <Caret up={direction === "up"} />
          </Button>
        </ButtonGroup>
      ) : (
        <Button
          color={color}
          variant={variant}
          size={size}
          onClick={toggle}
          aria-expanded={open}
        >
          {label}
          <Caret up={direction === "up"} />
        </Button>
      )}
      {menu}
    </div>
  );
}

const ACTIONS: DropdownItem[] = [
  { label: "Action", onClick: () => {} },
  { label: "Another action", onClick: () => {} },
  { label: "Something else here", onClick: () => {} },
];

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Dropdown") and renders each variant's demo + code.
 */
export const dropdownElement = {
  name: "Dropdown",
  variants: [
    {
      name: "Basic",
      description: "A single button that toggles a menu of items.",
      demo: <Dropdown label="Dropdown button" items={ACTIONS} />,
      code: `import Dropdown from "@/components/elements/Dropdown";

<Dropdown
  label="Dropdown button"
  items={[
    { label: "Action", onClick: doAction },
    { label: "Another action", href: "/page" },
    { label: "Something else here" },
  ]}
/>`,
    },
    {
      name: "Split button",
      description:
        "The label and the caret are separate buttons — pass `split`.",
      demo: <Dropdown split label="Action" items={ACTIONS} />,
      code: `import Dropdown from "@/components/elements/Dropdown";

<Dropdown split label="Action" items={items} />`,
    },
    {
      name: "Menu items",
      description:
        "Headers, dividers, an active item and a disabled item inside the menu.",
      demo: (
        <Dropdown
          label="Menu"
          items={[
            { header: true, label: "Section" },
            { label: "Active item", active: true },
            { label: "Normal item" },
            { label: "Disabled item", disabled: true },
            { divider: true },
            { label: "Separated link", href: "#" },
          ]}
        />
      ),
      code: `<Dropdown
  label="Menu"
  items={[
    { header: true, label: "Section" },
    { label: "Active item", active: true },
    { label: "Normal item" },
    { label: "Disabled item", disabled: true },
    { divider: true },
    { label: "Separated link", href: "#" },
  ]}
/>`,
    },
    {
      name: "Directions",
      description:
        "Open up, right (end) or left (start) — pass `direction`.",
      demo: (
        <div className="flex flex-wrap gap-3 py-16">
          <Dropdown direction="up" label="Dropup" items={ACTIONS} />
          <Dropdown direction="end" label="Dropend" items={ACTIONS} />
          <Dropdown direction="start" label="Dropstart" items={ACTIONS} />
        </div>
      ),
      code: `<Dropdown direction="up" label="Dropup" items={items} />
<Dropdown direction="end" label="Dropend" items={items} />
<Dropdown direction="start" label="Dropstart" items={items} />`,
    },
    {
      name: "Menu alignment",
      description: "Align the menu to the end of the trigger — pass `align=\"end\"`.",
      demo: (
        <div className="flex justify-end">
          <Dropdown align="end" label="End-aligned" items={ACTIONS} />
        </div>
      ),
      code: `<Dropdown align="end" label="End-aligned" items={items} />`,
    },
    {
      name: "Sizes & colors",
      description: "Trigger sizes (sm/lg) and any Bootstrap colour or outline.",
      demo: (
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown size="sm" color="secondary" label="Small" items={ACTIONS} />
          <Dropdown color="success" label="Success" items={ACTIONS} />
          <Dropdown
            size="lg"
            color="danger"
            variant="outline"
            label="Large outline"
            items={ACTIONS}
          />
        </div>
      ),
      code: `<Dropdown size="sm" color="secondary" label="Small" items={items} />
<Dropdown color="success" label="Success" items={items} />
<Dropdown size="lg" color="danger" variant="outline" label="Large" items={items} />`,
    },
    {
      name: "Centered",
      description:
        "Center the menu under the trigger — pass `align=\"center\"` (works with `direction=\"up\"` too).",
      demo: (
        <div className="flex justify-center py-2">
          <Dropdown align="center" label="Centered menu" items={ACTIONS} />
        </div>
      ),
      code: `import Dropdown from "@/components/elements/Dropdown";

<Dropdown align="center" label="Centered menu" items={items} />`,
    },
    {
      name: "With a form",
      description:
        "Put custom content — like a sign-in form — inside the menu by passing `children` instead of `items`.",
      demo: (
        <Dropdown label="Sign in" align="end">
          <form
            className="w-64 space-y-3 p-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-zinc-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-zinc-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
              <input
                type="checkbox"
                className="rounded border-zinc-300 dark:border-zinc-600"
              />
              Remember me
            </label>
            <Button color="primary" size="sm" fullWidth type="submit">
              Sign in
            </Button>
          </form>
        </Dropdown>
      ),
      code: `import Dropdown from "@/components/elements/Dropdown";
import Button from "@/components/elements/Button";

<Dropdown label="Sign in" align="end">
  <form className="w-64 space-y-3 p-3" onSubmit={handleSubmit}>
    <input type="email" placeholder="you@example.com" className="..." />
    <input type="password" placeholder="••••••••" className="..." />
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" /> Remember me
    </label>
    <Button color="primary" size="sm" fullWidth type="submit">Sign in</Button>
  </form>
</Dropdown>`,
    },
  ],
};
