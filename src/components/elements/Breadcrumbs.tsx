import type { ReactNode } from "react";

/**
 * One crumb in a {@link Breadcrumbs} trail.
 *
 * @property name    - Label (used as sr-only text when shown as the home icon).
 * @property href    - Link target. Omit (or set `current`) for the active page.
 * @property current - Marks the active page — rendered as plain text, not a link.
 */
export interface Crumb {
  name: string;
  href?: string;
  current?: boolean;
}

/**
 * Props for the {@link Breadcrumbs} component.
 *
 * @property items     - The trail, in order. The last item is usually current.
 * @property separator - `"chevron"` (›) or `"slash"` (/). Ignored for the
 *                       `contained`/`full` variants, which use an angled divider.
 * @property home      - Render the first crumb as a leading home icon.
 * @property variant   - `"simple"` (inline), `"contained"` (rounded bar) or
 *                       `"full"` (full-width bar with a bottom border).
 * @property className - Extra classes merged onto the <nav>.
 */
export interface BreadcrumbsProps {
  items: Crumb[];
  separator?: "chevron" | "slash";
  home?: boolean;
  variant?: "simple" | "contained" | "full";
  className?: string;
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 shrink-0">
      <path d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7z" />
    </svg>
  );
}

/** The separator drawn before every non-first crumb. */
function Separator({
  variant,
  separator,
}: {
  variant: "simple" | "contained" | "full";
  separator: "chevron" | "slash";
}) {
  if (variant !== "simple") {
    // Angled full-height divider for contained / full-width bars.
    return (
      <svg
        viewBox="0 0 24 44"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden="true"
        className="h-full w-6 shrink-0 text-gray-300 dark:text-gray-600"
      >
        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
      </svg>
    );
  }
  if (separator === "slash") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="size-5 shrink-0 text-gray-300 dark:text-gray-600"
      >
        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
    >
      <path d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" />
    </svg>
  );
}

/**
 * Breadcrumbs
 * -----------
 * A navigation trail — based on the Tailwind Plus breadcrumbs set. Supports
 * chevron or slash separators, an optional leading home icon, and inline,
 * contained or full-width-bar layouts.
 *
 * @example
 * ```tsx
 * import Breadcrumbs from "@/components/elements/Breadcrumbs";
 *
 * <Breadcrumbs
 *   home
 *   items={[
 *     { name: "Home", href: "/" },
 *     { name: "Projects", href: "/projects" },
 *     { name: "Nitro", current: true },
 *   ]}
 * />
 * ```
 */
export default function Breadcrumbs({
  items,
  separator = "chevron",
  home = false,
  variant = "simple",
  className = "",
}: BreadcrumbsProps) {
  const navClass =
    variant === "full"
      ? "flex border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-900"
      : "flex";

  const olClass =
    variant === "contained"
      ? "flex space-x-4 rounded-md bg-white px-6 shadow-sm dark:bg-gray-800 dark:shadow-none dark:inset-ring dark:inset-ring-white/10"
      : variant === "full"
        ? "mx-auto flex w-full max-w-(--breakpoint-xl) space-x-4 px-4 sm:px-6 lg:px-8"
        : "flex items-center space-x-4";

  return (
    <nav aria-label="Breadcrumb" className={`${navClass} ${className}`}>
      <ol role="list" className={olClass}>
        {items.map((item, i) => {
          const isFirst = i === 0;
          const asHome = home && isFirst;
          const isCurrent = item.current || !item.href;
          const liClass = variant === "simple" ? undefined : "flex";

          let crumb: ReactNode;
          if (asHome) {
            crumb = (
              <a
                href={item.href}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <HomeIcon />
                <span className="sr-only">{item.name}</span>
              </a>
            );
          } else if (isCurrent) {
            crumb = (
              <span
                aria-current="page"
                className={`text-sm font-medium text-gray-700 dark:text-gray-200 ${
                  isFirst ? "" : "ml-4"
                }`}
              >
                {item.name}
              </span>
            );
          } else {
            crumb = (
              <a
                href={item.href}
                className={`text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ${
                  isFirst ? "" : "ml-4"
                }`}
              >
                {item.name}
              </a>
            );
          }

          return (
            <li key={item.name} className={liClass}>
              <div className="flex items-center">
                {!isFirst && (
                  <Separator variant={variant} separator={separator} />
                )}
                {crumb}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const SAMPLE: Crumb[] = [
  { name: "Home", href: "#" },
  { name: "Projects", href: "#" },
  { name: "Project Nitro", current: true },
];

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Breadcrumbs") and renders each variant's demo + code.
 */
export const breadcrumbsElement = {
  name: "Breadcrumbs",
  variants: [
    {
      name: "Simple with chevrons",
      description:
        "Inline trail with chevron separators and a leading home icon.",
      demo: <Breadcrumbs home items={SAMPLE} />,
      code: `import Breadcrumbs from "@/components/elements/Breadcrumbs";

<Breadcrumbs
  home
  items={[
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Project Nitro", current: true },
  ]}
/>`,
    },
    {
      name: "Simple with slashes",
      description: "Same inline trail, using slash separators instead.",
      demo: <Breadcrumbs home separator="slash" items={SAMPLE} />,
      code: `import Breadcrumbs from "@/components/elements/Breadcrumbs";

<Breadcrumbs
  home
  separator="slash"
  items={[
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Project Nitro", current: true },
  ]}
/>`,
    },
    {
      name: "Contained",
      description:
        "Breadcrumbs inside a rounded, shadowed bar with angled dividers.",
      demo: <Breadcrumbs home variant="contained" items={SAMPLE} />,
      code: `import Breadcrumbs from "@/components/elements/Breadcrumbs";

<Breadcrumbs
  home
  variant="contained"
  items={[
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Project Nitro", current: true },
  ]}
/>`,
    },
    {
      name: "Full-width bar",
      description:
        "A full-width bar with a bottom border and angled dividers — sits at the top of a page.",
      demo: (
        <div className="-mx-6 -my-6">
          <Breadcrumbs home variant="full" items={SAMPLE} />
        </div>
      ),
      code: `import Breadcrumbs from "@/components/elements/Breadcrumbs";

<Breadcrumbs
  home
  variant="full"
  items={[
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Project Nitro", current: true },
  ]}
/>`,
    },
  ],
};
