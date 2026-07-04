"use client";

import { useState, type ReactNode } from "react";

/** One item in a {@link Sidebar}. */
export interface SidebarItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  count?: number | string;
  initial?: string;
  current?: boolean;
  /** Sub-items — turns this into an expandable disclosure. */
  children?: SidebarItem[];
}

/** A titled group of items in a {@link Sidebar}. */
export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

/**
 * Props for the {@link Sidebar} component. Pass `items` for a simple list or
 * `sections` for titled groups.
 *
 * @property brand    - Brand / app name shown next to the logo.
 * @property items    - A single list of nav items.
 * @property sections - Titled groups of nav items.
 * @property theme    - `"light"` (default), `"dark"` or `"brand"` (blue).
 * @property user     - Optional profile shown pinned to the bottom.
 * @property className - Extra classes merged onto the aside.
 */
export interface SidebarProps {
  brand?: string;
  items?: SidebarItem[];
  sections?: SidebarSection[];
  theme?: "light" | "dark" | "brand";
  user?: { name: string; role?: string; initial?: string };
  className?: string;
}

const THEME = {
  light: {
    container:
      "bg-white border-r border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800",
    brand: "text-zinc-900 dark:text-white",
    title: "text-zinc-400",
    border: "border-zinc-200 dark:border-zinc-800",
    name: "text-zinc-900 dark:text-white",
    role: "text-zinc-500 dark:text-zinc-400",
  },
  dark: {
    container: "bg-zinc-900",
    brand: "text-white",
    title: "text-zinc-400",
    border: "border-white/10",
    name: "text-white",
    role: "text-zinc-400",
  },
  brand: {
    container: "bg-blue-600",
    brand: "text-white",
    title: "text-blue-200",
    border: "border-blue-500/40",
    name: "text-white",
    role: "text-blue-200",
  },
} as const;

type Theme = keyof typeof THEME;

function linkClass(theme: Theme, on: boolean) {
  const base =
    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium";
  if (theme === "dark") {
    return `${base} ${
      on
        ? "bg-zinc-800 text-white"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`;
  }
  if (theme === "brand") {
    return `${base} ${
      on
        ? "bg-blue-700 text-white"
        : "text-blue-100 hover:bg-blue-500 hover:text-white"
    }`;
  }
  return `${base} ${
    on
      ? "bg-zinc-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400"
      : "text-zinc-700 hover:bg-zinc-50 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-blue-400"
  }`;
}

function iconClass(theme: Theme, on: boolean) {
  const base = "inline-flex size-5 shrink-0";
  if (theme === "dark") {
    return `${base} ${on ? "text-white" : "text-zinc-400 group-hover:text-white"}`;
  }
  if (theme === "brand") {
    return `${base} ${on ? "text-white" : "text-blue-200 group-hover:text-white"}`;
  }
  return `${base} ${
    on
      ? "text-blue-600 dark:text-blue-400"
      : "text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
  }`;
}

function countClass(theme: Theme, on: boolean) {
  const base = "ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  if (theme === "light") {
    return `${base} ${
      on
        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"
        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
    }`;
  }
  return `${base} ${on ? "bg-white/20 text-white" : "bg-white/10 text-zinc-200"}`;
}

function initialClass(theme: Theme, on: boolean) {
  const base =
    "flex size-6 shrink-0 items-center justify-center rounded-md border text-[10px] font-medium";
  if (theme === "light") {
    return `${base} bg-white dark:bg-zinc-900 ${
      on
        ? "border-blue-600 text-blue-600"
        : "border-zinc-200 text-zinc-400 group-hover:border-blue-600 group-hover:text-blue-600 dark:border-zinc-700"
    }`;
  }
  return `${base} bg-transparent ${
    on
      ? "border-white text-white"
      : "border-white/30 text-zinc-200 group-hover:border-white group-hover:text-white"
  }`;
}

function DisclosureChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={`size-4 shrink-0 opacity-60 transition-transform ${
        open ? "rotate-90" : ""
      }`}
    >
      <path
        fillRule="evenodd"
        d="M7.21 5.23a.75.75 0 0 1 1.06.02l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.08-1.04L10.94 10 7.23 6.29a.75.75 0 0 1-.02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Sidebar
 * -------
 * A full sidebar navigation column — based on the Tailwind Plus sidebar
 * navigation set. Has a logo header, themed nav (light / dark / brand), titled
 * sections, count badges, letter-avatar team items and an optional user profile
 * pinned to the bottom.
 *
 * @example
 * ```tsx
 * import Sidebar from "@/components/elements/Sidebar";
 *
 * <Sidebar
 *   brand="Acme"
 *   theme="dark"
 *   items={[{ label: "Dashboard", icon: <HomeIcon />, current: true }]}
 *   user={{ name: "Usman Khan", role: "Admin", initial: "UK" }}
 * />
 * ```
 */
export default function Sidebar({
  brand = "Acme",
  items,
  sections,
  theme = "light",
  user,
  className = "",
}: SidebarProps) {
  const groups: SidebarSection[] = sections ?? (items ? [{ items }] : []);
  const t = THEME[theme];

  const initialKey = (() => {
    for (let g = 0; g < groups.length; g++) {
      for (let i = 0; i < groups[g].items.length; i++) {
        const it = groups[g].items[i];
        if (it.current) return `${g}-${i}`;
        const ci = it.children?.findIndex((c) => c.current) ?? -1;
        if (ci >= 0) return `${g}-${i}-${ci}`;
      }
    }
    return "0-0";
  })();
  const [active, setActive] = useState(initialKey);

  const initialExpanded = new Set<string>();
  groups.forEach((g, gi) =>
    g.items.forEach((it, ii) => {
      if (it.children?.some((c) => c.current)) initialExpanded.add(`${gi}-${ii}`);
    }),
  );
  const [expanded, setExpanded] = useState<Set<string>>(initialExpanded);

  const renderItem = (item: SidebarItem, key: string): ReactNode => {
    const on = active === key;
    const inner = (
      <>
        {item.icon && <span className={iconClass(theme, on)}>{item.icon}</span>}
        {item.initial && (
          <span className={initialClass(theme, on)}>{item.initial}</span>
        )}
        <span className="flex-1 truncate">{item.label}</span>
        {item.count != null && (
          <span className={countClass(theme, on)}>{item.count}</span>
        )}
      </>
    );

    if (item.children && item.children.length) {
      const open = expanded.has(key);
      const toggle = () =>
        setExpanded((prev) => {
          const next = new Set(prev);
          if (next.has(key)) next.delete(key);
          else next.add(key);
          return next;
        });
      return (
        <li key={key}>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            className={`w-full text-left ${linkClass(theme, false)}`}
          >
            {item.icon && (
              <span className={iconClass(theme, false)}>{item.icon}</span>
            )}
            <span className="flex-1 truncate">{item.label}</span>
            <DisclosureChevron open={open} />
          </button>
          {open && (
            <ul className="mt-1 flex flex-col gap-1 pl-8">
              {item.children.map((child, ci) =>
                renderItem(child, `${key}-${ci}`),
              )}
            </ul>
          )}
        </li>
      );
    }

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
            className={linkClass(theme, on)}
          >
            {inner}
          </a>
        ) : (
          <button
            type="button"
            onClick={handle}
            aria-current={on ? "page" : undefined}
            className={`w-full text-left ${linkClass(theme, on)}`}
          >
            {inner}
          </button>
        )}
      </li>
    );
  };

  return (
    <aside className={`flex h-full w-64 flex-col ${t.container} ${className}`}>
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-2 px-4">
        <span className="flex size-8 items-center justify-center rounded-md bg-linear-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
          {brand.slice(0, 1)}
        </span>
        <span className={`text-base font-semibold ${t.brand}`}>{brand}</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-3 py-2">
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.title && (
              <p className={`mb-1 px-3 text-xs font-semibold uppercase tracking-wider ${t.title}`}>
                {group.title}
              </p>
            )}
            <ul className="flex flex-col gap-1">
              {group.items.map((item, ii) => renderItem(item, `${gi}-${ii}`))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User profile */}
      {user && (
        <div className={`flex items-center gap-3 border-t px-4 py-3 ${t.border}`}>
          <span className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-xs font-semibold text-white">
            {user.initial ?? user.name.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className={`truncate text-sm font-medium ${t.name}`}>
              {user.name}
            </p>
            {user.role && (
              <p className={`truncate text-xs ${t.role}`}>{user.role}</p>
            )}
          </div>
        </div>
      )}
    </aside>
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

const NAV: SidebarItem[] = [
  { label: "Dashboard", icon: <Icon d={HOME} />, current: true },
  { label: "Team", icon: <Icon d={USERS} />, count: 3 },
  { label: "Projects", icon: <Icon d={FOLDER} /> },
  { label: "Calendar", icon: <Icon d={CALENDAR} /> },
  { label: "Reports", icon: <Icon d={CHART} /> },
];

const USER = { name: "Usman Khan", role: "Admin", initial: "UK" };

/** Wrap a sidebar at a fixed height so the demo reads like a real layout. */
const Frame = ({ children }: { children: ReactNode }) => (
  <div className="h-104 w-64 overflow-hidden rounded-xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800">
    {children}
  </div>
);

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Sidebar nav") and renders each variant's demo + code.
 */
export const sidebarElement = {
  name: "Sidebar nav",
  variants: [
    {
      name: "Light",
      description: "A light sidebar with a logo, icon links and a user profile.",
      demo: (
        <Frame>
          <Sidebar brand="Acme" items={NAV} user={USER} />
        </Frame>
      ),
      code: `import Sidebar from "@/components/elements/Sidebar";

<Sidebar
  brand="Acme"
  items={[
    { label: "Dashboard", icon: <HomeIcon />, current: true },
    { label: "Team", icon: <UsersIcon />, count: 3 },
    { label: "Projects", icon: <FolderIcon /> },
  ]}
  user={{ name: "Usman Khan", role: "Admin", initial: "UK" }}
/>`,
    },
    {
      name: "Dark",
      description: "A dark sidebar — pass `theme=\"dark\"`.",
      demo: (
        <Frame>
          <Sidebar brand="Acme" theme="dark" items={NAV} user={USER} />
        </Frame>
      ),
      code: `<Sidebar brand="Acme" theme="dark" items={items} user={user} />`,
    },
    {
      name: "Brand",
      description: "A brand-coloured (blue) sidebar — pass `theme=\"brand\"`.",
      demo: (
        <Frame>
          <Sidebar brand="Acme" theme="brand" items={NAV} user={USER} />
        </Frame>
      ),
      code: `<Sidebar brand="Acme" theme="brand" items={items} user={user} />`,
    },
    {
      name: "With sections",
      description:
        "A main nav plus a “Your teams” section with letter avatars — pass `sections`.",
      demo: (
        <Frame>
          <Sidebar
            brand="Acme"
            user={USER}
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
        </Frame>
      ),
      code: `<Sidebar
  brand="Acme"
  user={{ name: "Usman Khan", role: "Admin" }}
  sections={[
    { items: [{ label: "Dashboard", icon: <HomeIcon />, current: true }] },
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
    {
      name: "With expandable sections",
      description:
        "Nav items with collapsible sub-items — give an item `children`. Click to expand.",
      demo: (
        <Frame>
          <Sidebar
            brand="Acme"
            user={USER}
            items={[
              { label: "Dashboard", icon: <Icon d={HOME} />, current: true },
              {
                label: "Team",
                icon: <Icon d={USERS} />,
                children: [
                  { label: "Members" },
                  { label: "Invitations" },
                  { label: "Roles" },
                ],
              },
              {
                label: "Projects",
                icon: <Icon d={FOLDER} />,
                children: [
                  { label: "GraphQL API" },
                  { label: "iOS App" },
                  { label: "Marketing site" },
                ],
              },
              { label: "Calendar", icon: <Icon d={CALENDAR} /> },
            ]}
          />
        </Frame>
      ),
      code: `import Sidebar from "@/components/elements/Sidebar";

<Sidebar
  brand="Acme"
  items={[
    { label: "Dashboard", icon: <HomeIcon />, current: true },
    {
      label: "Team",
      icon: <UsersIcon />,
      children: [
        { label: "Members" },
        { label: "Invitations" },
        { label: "Roles" },
      ],
    },
    {
      label: "Projects",
      icon: <FolderIcon />,
      children: [
        { label: "GraphQL API" },
        { label: "iOS App" },
      ],
    },
  ]}
/>`,
    },
  ],
};
