"use client";

import { useState, type ReactNode } from "react";

/**
 * One item in a {@link VerticalNav}.
 *
 * @property label   - The link text.
 * @property href    - Link target (renders an anchor). Omit for a button.
 * @property onClick - Click handler.
 * @property icon    - Optional leading icon.
 * @property count   - Optional trailing count badge.
 * @property initial - A letter avatar (for team/section items).
 * @property current - Seed the initially-active item.
 */
export interface VerticalNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  count?: number | string;
  initial?: string;
  current?: boolean;
}

/** A titled group of items in a {@link VerticalNav}. */
export interface VerticalNavSection {
  title?: string;
  items: VerticalNavItem[];
}

/**
 * Props for the {@link VerticalNav} component. Pass `items` for a simple list
 * or `sections` for titled groups (e.g. "Your teams").
 */
export interface VerticalNavProps {
  items?: VerticalNavItem[];
  sections?: VerticalNavSection[];
  className?: string;
}

/**
 * VerticalNav
 * -----------
 * A sidebar navigation list — based on the Tailwind Plus vertical navigation
 * set. Supports icons, count badges, letter-avatar items and titled sections,
 * with an blue active accent. Tracks the active item on click.
 *
 * @example
 * ```tsx
 * import VerticalNav from "@/components/elements/VerticalNav";
 *
 * <VerticalNav
 *   items={[
 *     { label: "Dashboard", icon: <HomeIcon />, current: true },
 *     { label: "Team", icon: <UsersIcon />, count: 3 },
 *   ]}
 * />
 * ```
 */
export default function VerticalNav({
  items,
  sections,
  className = "",
}: VerticalNavProps) {
  const groups: VerticalNavSection[] = sections ?? (items ? [{ items }] : []);

  const initialKey = (() => {
    for (let g = 0; g < groups.length; g++) {
      const i = groups[g].items.findIndex((it) => it.current);
      if (i >= 0) return `${g}-${i}`;
    }
    return "0-0";
  })();
  const [active, setActive] = useState(initialKey);

  return (
    <nav className={`flex flex-col gap-4 ${className}`}>
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.title && (
            <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {group.title}
            </p>
          )}
          <ul className="flex flex-col gap-1">
            {group.items.map((item, ii) => {
              const key = `${gi}-${ii}`;
              const on = active === key;
              const cls = `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                on
                  ? "bg-zinc-100 text-blue-600 dark:bg-zinc-800 dark:text-blue-400"
                  : "text-zinc-700 hover:bg-zinc-50 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
              }`;

              const inner = (
                <>
                  {item.icon && (
                    <span
                      className={`inline-flex size-5 shrink-0 ${
                        on
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                  )}
                  {item.initial && (
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-md border bg-white text-[10px] font-medium dark:bg-zinc-900 ${
                        on
                          ? "border-blue-600 text-blue-600"
                          : "border-zinc-200 text-zinc-400 group-hover:border-blue-600 group-hover:text-blue-600 dark:border-zinc-700"
                      }`}
                    >
                      {item.initial}
                    </span>
                  )}
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.count != null && (
                    <span
                      className={`ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        on
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </>
              );

              const handle = () => {
                setActive(key);
                item.onClick?.();
              };

              return (
                <li key={key}>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={handle}
                      aria-current={on ? "page" : undefined}
                      className={cls}
                    >
                      {inner}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handle}
                      aria-current={on ? "page" : undefined}
                      className={`w-full text-left ${cls}`}
                    >
                      {inner}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
    <path d={d} />
  </svg>
);

const HOME =
  "M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7z";
const USERS =
  "M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z";
const FOLDER =
  "M3.75 3A1.75 1.75 0 0 0 2 4.75v3.26a3.235 3.235 0 0 1 1.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0 0 16.25 5h-4.836a.25.25 0 0 1-.177-.073L9.823 3.513A1.75 1.75 0 0 0 8.586 3H3.75ZM3.75 9A1.75 1.75 0 0 0 2 10.75v4.5C2 16.216 2.784 17 3.75 17h12.5A1.75 1.75 0 0 0 18 15.25v-4.5A1.75 1.75 0 0 0 16.25 9H3.75Z";
const CALENDAR =
  "M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2ZM3.5 8.5v6.75c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V8.5h-13Z";
const CHART =
  "M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z";

const SIMPLE: VerticalNavItem[] = [
  { label: "Dashboard", current: true },
  { label: "Team" },
  { label: "Projects" },
  { label: "Calendar" },
  { label: "Reports" },
];

const WITH_ICONS: VerticalNavItem[] = [
  { label: "Dashboard", icon: <Icon d={HOME} />, current: true },
  { label: "Team", icon: <Icon d={USERS} /> },
  { label: "Projects", icon: <Icon d={FOLDER} /> },
  { label: "Calendar", icon: <Icon d={CALENDAR} /> },
  { label: "Reports", icon: <Icon d={CHART} /> },
];

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Vertical nav") and renders each variant's demo + code.
 */
export const verticalNavElement = {
  name: "Vertical nav",
  variants: [
    {
      name: "Simple",
      description: "A plain list of links with an active item.",
      demo: (
        <div className="max-w-xs">
          <VerticalNav items={SIMPLE} />
        </div>
      ),
      code: `import VerticalNav from "@/components/elements/VerticalNav";

<VerticalNav
  items={[
    { label: "Dashboard", current: true },
    { label: "Team" },
    { label: "Projects" },
  ]}
/>`,
    },
    {
      name: "With icons",
      description: "Each link has a leading icon.",
      demo: (
        <div className="max-w-xs">
          <VerticalNav items={WITH_ICONS} />
        </div>
      ),
      code: `<VerticalNav
  items={[
    { label: "Dashboard", icon: <HomeIcon />, current: true },
    { label: "Team", icon: <UsersIcon /> },
    { label: "Projects", icon: <FolderIcon /> },
  ]}
/>`,
    },
    {
      name: "With badges",
      description: "A trailing count badge on each link — pass `count`.",
      demo: (
        <div className="max-w-xs">
          <VerticalNav
            items={[
              { label: "Inbox", count: 12, current: true },
              { label: "Sent" },
              { label: "Drafts", count: 4 },
              { label: "Spam", count: 99 },
            ]}
          />
        </div>
      ),
      code: `<VerticalNav
  items={[
    { label: "Inbox", count: 12, current: true },
    { label: "Drafts", count: 4 },
    { label: "Spam", count: 99 },
  ]}
/>`,
    },
    {
      name: "With icons & badges",
      description: "Icons and count badges together.",
      demo: (
        <div className="max-w-xs">
          <VerticalNav
            items={[
              { label: "Dashboard", icon: <Icon d={HOME} />, current: true },
              { label: "Team", icon: <Icon d={USERS} />, count: 3 },
              { label: "Projects", icon: <Icon d={FOLDER} />, count: 12 },
              { label: "Calendar", icon: <Icon d={CALENDAR} /> },
            ]}
          />
        </div>
      ),
      code: `<VerticalNav
  items={[
    { label: "Dashboard", icon: <HomeIcon />, current: true },
    { label: "Team", icon: <UsersIcon />, count: 3 },
    { label: "Projects", icon: <FolderIcon />, count: 12 },
  ]}
/>`,
    },
    {
      name: "With sections",
      description:
        "Titled groups — e.g. a main nav plus a “Your teams” section with letter avatars.",
      demo: (
        <div className="max-w-xs">
          <VerticalNav
            sections={[
              {
                items: [
                  { label: "Dashboard", icon: <Icon d={HOME} />, current: true },
                  { label: "Projects", icon: <Icon d={FOLDER} /> },
                  { label: "Calendar", icon: <Icon d={CALENDAR} /> },
                ],
              },
              {
                title: "Your teams",
                items: [
                  { label: "Heroicons", initial: "H" },
                  { label: "Tailwind Labs", initial: "T" },
                  { label: "Workcation", initial: "W" },
                ],
              },
            ]}
          />
        </div>
      ),
      code: `<VerticalNav
  sections={[
    {
      items: [
        { label: "Dashboard", icon: <HomeIcon />, current: true },
        { label: "Projects", icon: <FolderIcon /> },
      ],
    },
    {
      title: "Your teams",
      items: [
        { label: "Heroicons", initial: "H" },
        { label: "Tailwind Labs", initial: "T" },
      ],
    },
  ]}
/>`,
    },
  ],
};
