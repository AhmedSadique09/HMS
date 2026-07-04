"use client";

import { useState, type ReactNode } from "react";

/**
 * One tab in a {@link Tabs} group.
 *
 * @property label    - The tab label (also used in the mobile select).
 * @property icon     - Optional leading icon.
 * @property count    - Optional trailing count badge.
 * @property disabled - Non-selectable.
 * @property content  - Optional panel content shown when the tab is active.
 */
export interface Tab {
  label: string;
  icon?: ReactNode;
  count?: number | string;
  disabled?: boolean;
  content?: ReactNode;
}

/**
 * Props for the {@link Tabs} component.
 *
 * @property tabs         - The tabs to render.
 * @property variant      - `"underline"` (default), `"pills"`, `"pills-brand"`
 *                          or `"segmented"`.
 * @property fullWidth    - Stretch tabs to fill the width (justified).
 * @property defaultIndex - The initially active tab. Default `0`.
 * @property onChange     - Called with the new index when a tab is selected.
 * @property className    - Extra classes merged onto the wrapper.
 */
export interface TabsProps {
  tabs: Tab[];
  variant?: "underline" | "pills" | "pills-brand" | "segmented";
  fullWidth?: boolean;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

/**
 * Tabs
 * ----
 * Tabbed navigation — based on the Tailwind Plus tabs set. Supports underline,
 * pill, brand-pill and segmented styles, optional icons and counts, a
 * full-width layout, and a select-menu fallback on small screens.
 *
 * @example
 * ```tsx
 * import Tabs from "@/components/elements/Tabs";
 *
 * <Tabs
 *   tabs={[
 *     { label: "Overview", content: <p>…</p> },
 *     { label: "Activity", count: 3, content: <p>…</p> },
 *   ]}
 * />
 * ```
 */
export default function Tabs({
  tabs,
  variant = "underline",
  fullWidth = false,
  defaultIndex = 0,
  onChange,
  className = "",
}: TabsProps) {
  const [active, setActive] = useState(defaultIndex);

  const select = (i: number) => {
    setActive(i);
    onChange?.(i);
  };

  const isUnderline = variant === "underline";
  const isSeg = variant === "segmented";

  const wrapper = isUnderline
    ? "border-b border-zinc-200 dark:border-zinc-800"
    : isSeg
      ? "inline-flex rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800"
      : "";

  const navClass = isUnderline
    ? `-mb-px flex gap-6 ${fullWidth ? "w-full" : ""}`
    : isSeg
      ? "flex gap-1"
      : `flex gap-2 ${fullWidth ? "w-full" : ""}`;

  const tabClass = (i: number) => {
    const on = i === active;
    const disabled = tabs[i].disabled;
    const flex = fullWidth ? "flex-1 justify-center" : "";
    const dis = disabled ? "pointer-events-none opacity-50" : "";
    const base = `inline-flex items-center text-sm font-medium transition-colors ${flex} ${dis}`;

    if (isUnderline) {
      return `${base} border-b-2 px-1 py-3 ${
        on
          ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
          : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
      }`;
    }
    if (isSeg) {
      return `${base} rounded-md px-3 py-1.5 ${
        on
          ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
      }`;
    }
    // pills / pills-brand
    return `${base} rounded-md px-3 py-2 ${
      on
        ? variant === "pills-brand"
          ? "bg-blue-600 text-white"
          : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
    }`;
  };

  const countClass = (i: number) =>
    `ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
      i === active
        ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300"
        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
    }`;

  return (
    <div className={className}>
      {/* Mobile: select menu */}
      <div className="sm:hidden">
        <select
          value={active}
          onChange={(e) => select(Number(e.target.value))}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        >
          {tabs.map((t, i) => (
            <option key={t.label} value={i} disabled={t.disabled}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: tab bar */}
      <div className={`hidden sm:block ${isSeg ? "" : ""}`}>
        <div className={wrapper}>
          <nav className={navClass} aria-label="Tabs">
            {tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => select(i)}
                disabled={t.disabled}
                aria-current={i === active ? "page" : undefined}
                className={tabClass(i)}
              >
                {t.icon && <span className="mr-2 inline-flex">{t.icon}</span>}
                {t.label}
                {t.count != null && (
                  <span className={countClass(i)}>{t.count}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Active panel */}
      {tabs[active]?.content && (
        <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          {tabs[active].content}
        </div>
      )}
    </div>
  );
}

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
    <path d={d} />
  </svg>
);

const USER =
  "M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z";
const CHART =
  "M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z";
const COG =
  "M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.347 7.89a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z";

const SIMPLE: Tab[] = [
  { label: "Overview", content: <p>The Overview panel content.</p> },
  { label: "Activity", content: <p>The Activity panel content.</p> },
  { label: "Settings", content: <p>The Settings panel content.</p> },
  { label: "Members", disabled: true, content: <p>Members.</p> },
];

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Tabs") and renders each variant's demo + code.
 */
export const tabsElement = {
  name: "Tabs",
  variants: [
    {
      name: "Underline",
      description:
        "The default — an underline accent under the active tab. One item is disabled.",
      demo: <Tabs tabs={SIMPLE} />,
      code: `import Tabs from "@/components/elements/Tabs";

<Tabs
  tabs={[
    { label: "Overview", content: <p>…</p> },
    { label: "Activity", content: <p>…</p> },
    { label: "Settings", content: <p>…</p> },
    { label: "Members", disabled: true },
  ]}
/>`,
    },
    {
      name: "With icons",
      description: "Underline tabs with a leading icon on each.",
      demo: (
        <Tabs
          tabs={[
            { label: "Profile", icon: <Icon d={USER} />, content: <p>Profile.</p> },
            { label: "Stats", icon: <Icon d={CHART} />, content: <p>Stats.</p> },
            { label: "Settings", icon: <Icon d={COG} />, content: <p>Settings.</p> },
          ]}
        />
      ),
      code: `<Tabs
  tabs={[
    { label: "Profile", icon: <UserIcon /> },
    { label: "Stats", icon: <ChartIcon /> },
    { label: "Settings", icon: <CogIcon /> },
  ]}
/>`,
    },
    {
      name: "With badges",
      description: "A count badge on each tab — pass `count`.",
      demo: (
        <Tabs
          tabs={[
            { label: "Open", count: 12, content: <p>Open items.</p> },
            { label: "Closed", count: 4, content: <p>Closed items.</p> },
            { label: "Archived", count: 0, content: <p>Archived items.</p> },
          ]}
        />
      ),
      code: `<Tabs
  tabs={[
    { label: "Open", count: 12 },
    { label: "Closed", count: 4 },
    { label: "Archived", count: 0 },
  ]}
/>`,
    },
    {
      name: "Pills",
      description: "Rounded pill tabs with a subtle active background.",
      demo: <Tabs variant="pills" tabs={SIMPLE} />,
      code: `<Tabs variant="pills" tabs={tabs} />`,
    },
    {
      name: "Pills (brand)",
      description: "Pill tabs with a brand-coloured active state.",
      demo: <Tabs variant="pills-brand" tabs={SIMPLE} />,
      code: `<Tabs variant="pills-brand" tabs={tabs} />`,
    },
    {
      name: "Segmented",
      description: "A segmented control in a grey track — pass `variant=\"segmented\"`.",
      demo: <Tabs variant="segmented" tabs={SIMPLE.slice(0, 3)} />,
      code: `<Tabs variant="segmented" tabs={tabs} />`,
    },
    {
      name: "Full width",
      description: "Tabs stretch to fill the width — pass `fullWidth`.",
      demo: <Tabs fullWidth tabs={SIMPLE.slice(0, 3)} />,
      code: `<Tabs fullWidth tabs={tabs} />`,
    },
  ],
};
