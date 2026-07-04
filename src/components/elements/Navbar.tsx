"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

/** A navigation link in the {@link Navbar}. */
export interface NavLink {
  label: string;
  href: string;
  current?: boolean;
}

/**
 * Props for the {@link Navbar} component.
 *
 * @property brand    - The brand / app name shown next to the logo.
 * @property links    - The primary navigation links.
 * @property dark        - Shorthand for `theme="dark"`.
 * @property theme       - `"light"` (default), `"dark"` or `"brand"` (coloured).
 * @property search      - Show a search input.
 * @property action      - A quick-action element (e.g. a "+ New" button).
 * @property profile     - Show the notification bell + profile menu. Default true.
 * @property menuLeft    - Put the menu (hamburger) button on the left.
 * @property linksCenter - Centre the nav links instead of placing them by the logo.
 * @property secondary   - A second row of sub-navigation tabs below the bar.
 * @property className   - Extra classes merged onto the <nav>.
 */
export interface NavbarProps {
  brand?: string;
  links: NavLink[];
  dark?: boolean;
  theme?: "light" | "dark" | "brand";
  search?: boolean;
  action?: ReactNode;
  profile?: boolean;
  menuLeft?: boolean;
  linksCenter?: boolean;
  secondary?: NavLink[];
  className?: string;
}

function BarsIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-6">
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M6 6l12 12M18 6L6 18"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4 7h16M4 12h16M4 17h16"
        />
      )}
    </svg>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open user menu"
        aria-expanded={open}
        className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-xs font-semibold text-white"
      >
        UK
      </button>
      <div
        className={`absolute right-0 top-full mt-2 min-w-40 rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800 ${
          open ? "block" : "hidden"
        }`}
      >
        {["Your profile", "Settings", "Sign out"].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(false)}
            className="block w-full rounded px-3 py-1.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Navbar
 * ------
 * A top navigation bar — based on the Tailwind Plus navbars set. Supports a
 * light or dark bar, search, a quick-action slot, a notification bell + profile
 * menu, and a responsive mobile menu (with the toggle on either side).
 *
 * @example
 * ```tsx
 * import Navbar from "@/components/elements/Navbar";
 *
 * <Navbar
 *   brand="Acme"
 *   links={[
 *     { label: "Dashboard", href: "#", current: true },
 *     { label: "Team", href: "#" },
 *   ]}
 * />
 * ```
 */
export default function Navbar({
  brand = "Acme",
  links,
  dark = false,
  theme: themeProp,
  search = false,
  action,
  profile = true,
  menuLeft = false,
  linksCenter = false,
  secondary,
  className = "",
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = themeProp ?? (dark ? "dark" : "light");
  const onDark = theme !== "light";

  const navClass =
    theme === "dark"
      ? "bg-zinc-900"
      : theme === "brand"
        ? "bg-blue-600"
        : "bg-white border-b border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800";

  const brandColor =
    theme === "light" ? "text-zinc-900 dark:text-white" : "text-white";

  const linkClass = (current?: boolean) => {
    const base = "rounded-md px-3 py-2 text-sm font-medium transition-colors";
    if (theme === "brand") {
      return `${base} ${
        current
          ? "bg-blue-500/60 text-white"
          : "text-blue-100 hover:bg-blue-500/40 hover:text-white"
      }`;
    }
    if (theme === "dark") {
      return `${base} ${
        current
          ? "bg-white/10 text-white"
          : "text-zinc-300 hover:bg-white/5 hover:text-white"
      }`;
    }
    return `${base} ${
      current
        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
    }`;
  };

  const iconBtn =
    theme === "brand"
      ? "text-blue-100 hover:bg-blue-500/40 hover:text-white"
      : theme === "dark"
        ? "text-zinc-300 hover:bg-white/5 hover:text-white"
        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800";

  const secondaryLinkClass = (current?: boolean) => {
    const base = "shrink-0 border-b-2 px-1 py-3 text-sm font-medium transition-colors";
    if (onDark) {
      return `${base} ${
        current
          ? "border-white text-white"
          : "border-transparent text-white/70 hover:border-white/40 hover:text-white"
      }`;
    }
    return `${base} ${
      current
        ? "border-blue-500 text-zinc-900 dark:text-white"
        : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
    }`;
  };

  const linkList = links.map((l) => (
    <a
      key={l.label}
      href={l.href}
      aria-current={l.current ? "page" : undefined}
      className={linkClass(l.current)}
    >
      {l.label}
    </a>
  ));

  const hamburger = (
    <button
      type="button"
      onClick={() => setMobileOpen((o) => !o)}
      aria-label="Toggle menu"
      aria-expanded={mobileOpen}
      className={`inline-flex items-center justify-center rounded-md p-2 ${iconBtn} ${
        menuLeft ? "" : "md:hidden"
      }`}
    >
      <BarsIcon open={mobileOpen} />
    </button>
  );

  return (
    <nav className={`${navClass} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: menu (if left) + brand + links */}
          <div className="flex items-center gap-3">
            {menuLeft && hamburger}
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-linear-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
                {brand.slice(0, 1)}
              </span>
              <span className={`text-base font-semibold ${brandColor}`}>
                {brand}
              </span>
            </div>
            {!menuLeft && !linksCenter && (
              <div className="ml-4 hidden items-center gap-1 md:flex">
                {linkList}
              </div>
            )}
          </div>

          {/* Center: links (when centered) */}
          {linksCenter && !menuLeft && (
            <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
              {linkList}
            </div>
          )}

          {/* Center: search */}
          {search && !linksCenter && (
            <div className="hidden max-w-xs flex-1 md:block">
              <div className="relative">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 3.4 9.82l3.14 3.13a.75.75 0 1 0 1.06-1.06l-3.13-3.14A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Search"
                  className={`w-full rounded-md py-1.5 pl-8 pr-3 text-sm outline-none ${
                    onDark
                      ? "bg-white/10 text-white placeholder-zinc-300 focus:bg-white/15"
                      : "bg-zinc-100 text-zinc-900 placeholder-zinc-400 focus:bg-white focus:ring-1 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Right: action + bell + profile + (menu if not left) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {action}
            {profile && (
              <>
                <button
                  type="button"
                  aria-label="Notifications"
                  className={`hidden rounded-md p-2 sm:inline-flex ${iconBtn}`}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                    aria-hidden="true"
                  >
                    <path d="M10 2a6 6 0 0 0-6 6v2.586l-.707.707A1 1 0 0 0 4 13h12a1 1 0 0 0 .707-1.707L16 10.586V8a6 6 0 0 0-6-6ZM7.5 15a2.5 2.5 0 0 0 5 0h-5Z" />
                  </svg>
                </button>
                <ProfileMenu />
              </>
            )}
            {!menuLeft && hamburger}
          </div>
        </div>
      </div>

      {/* Secondary sub-navigation row */}
      {secondary && (
        <div
          className={
            theme === "brand"
              ? "border-t border-blue-500/40"
              : onDark
                ? "border-t border-white/10"
                : "border-t border-zinc-200 dark:border-zinc-800"
          }
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="-mb-px flex gap-6 overflow-x-auto">
              {secondary.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  aria-current={l.current ? "page" : undefined}
                  className={secondaryLinkClass(l.current)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`md:hidden ${
            onDark
              ? "border-t border-white/10"
              : "border-t border-zinc-200 dark:border-zinc-800"
          }`}
        >
          <div className="space-y-1 px-3 py-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                aria-current={l.current ? "page" : undefined}
                className={`block ${linkClass(l.current)}`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

const LINKS: NavLink[] = [
  { label: "Dashboard", href: "#", current: true },
  { label: "Team", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Calendar", href: "#" },
];

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Navbar") and renders each variant's demo + code.
 */
export const navbarElement = {
  name: "Navbar",
  variants: [
    {
      name: "Simple",
      description:
        "Logo, nav links, a notification bell and a profile menu. Collapses to a mobile menu on small screens.",
      demo: (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Navbar brand="Acme" links={LINKS} />
        </div>
      ),
      code: `import Navbar from "@/components/elements/Navbar";

<Navbar
  brand="Acme"
  links={[
    { label: "Dashboard", href: "#", current: true },
    { label: "Team", href: "#" },
    { label: "Projects", href: "#" },
  ]}
/>`,
    },
    {
      name: "With search",
      description: "Adds a search input in the bar — pass `search`.",
      demo: (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Navbar brand="Acme" links={LINKS} search />
        </div>
      ),
      code: `<Navbar brand="Acme" links={links} search />`,
    },
    {
      name: "With quick action",
      description:
        "Adds a quick-action element — pass any node to `action` (e.g. a button).",
      demo: (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Navbar
            brand="Acme"
            links={LINKS}
            action={
              <button
                type="button"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                + New
              </button>
            }
          />
        </div>
      ),
      code: `import Navbar from "@/components/elements/Navbar";
import Button from "@/components/elements/Button";

<Navbar
  brand="Acme"
  links={links}
  action={<Button color="primary" size="sm">+ New</Button>}
/>`,
    },
    {
      name: "Dark",
      description: "A dark bar — pass `dark`. Works with search and actions too.",
      demo: (
        <div className="overflow-hidden rounded-lg">
          <Navbar brand="Acme" links={LINKS} dark search />
        </div>
      ),
      code: `<Navbar brand="Acme" links={links} dark search />`,
    },
    {
      name: "Menu button on left",
      description:
        "Puts the menu (hamburger) button on the left — pass `menuLeft`.",
      demo: (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Navbar brand="Acme" links={LINKS} menuLeft />
        </div>
      ),
      code: `<Navbar brand="Acme" links={links} menuLeft />`,
    },
    {
      name: "Centered links",
      description: "Nav links centered in the bar — pass `linksCenter`.",
      demo: (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Navbar brand="Acme" links={LINKS} linksCenter />
        </div>
      ),
      code: `<Navbar brand="Acme" links={links} linksCenter />`,
    },
    {
      name: "Branded",
      description: "A brand-coloured bar — pass `theme=\"brand\"`.",
      demo: (
        <div className="overflow-hidden rounded-lg">
          <Navbar brand="Acme" links={LINKS} theme="brand" />
        </div>
      ),
      code: `<Navbar brand="Acme" links={links} theme="brand" />`,
    },
    {
      name: "With secondary nav",
      description:
        "A second row of sub-navigation tabs below the bar — pass `secondary`.",
      demo: (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Navbar
            brand="Acme"
            links={LINKS}
            secondary={[
              { label: "Overview", href: "#", current: true },
              { label: "Activity", href: "#" },
              { label: "Settings", href: "#" },
              { label: "Members", href: "#" },
            ]}
          />
        </div>
      ),
      code: `<Navbar
  brand="Acme"
  links={links}
  secondary={[
    { label: "Overview", href: "#", current: true },
    { label: "Activity", href: "#" },
    { label: "Settings", href: "#" },
  ]}
/>`,
    },
  ],
};
