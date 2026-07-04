"use client";

import { useState, type ReactNode } from "react";

const SIZES = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3.5 py-2 text-sm",
  lg: "px-4 py-2.5 text-base",
} as const;

/**
 * Props for the {@link Pagination} component.
 *
 * @property page      - The current page (1-based).
 * @property total     - Total number of pages.
 * @property onChange  - Called with the new page when a control is clicked.
 * @property size      - `"sm"`, `"md"` (default) or `"lg"`.
 * @property align     - `"start"` (default), `"center"` or `"end"`.
 * @property icons     - Use arrow icons instead of "Previous"/"Next" text.
 * @property className - Extra classes merged onto the <nav>.
 */
export interface PaginationProps {
  page: number;
  total: number;
  onChange?: (page: number) => void;
  size?: keyof typeof SIZES;
  align?: "start" | "center" | "end";
  icons?: boolean;
  className?: string;
}

/** Build the page list, inserting "…" gaps when there are many pages. */
function getItems(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "…")[] = [1];
  const left = Math.max(2, page - 1);
  const right = Math.min(total - 1, page + 1);
  if (left > 2) items.push("…");
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push("…");
  items.push(total);
  return items;
}

function Chevron({ left = false }: { left?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={`size-5 ${left ? "" : "rotate-180"}`}
    >
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 0 1 0 1.06L9.06 10l3.73 3.71a.75.75 0 1 1-1.06 1.06l-4.25-4.24a.75.75 0 0 1 0-1.06l4.25-4.24a.75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowLong({ left = false }: { left?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={`size-5 ${left ? "" : "rotate-180"}`}
    >
      <path
        fillRule="evenodd"
        d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Pagination
 * ----------
 * Numbered page navigation — combining Bootstrap's pagination (numbers,
 * icons, sizes, alignment, active/disabled) with Tailwind UI styling. Controlled
 * via `page` / `onChange`. Collapses long ranges with "…".
 *
 * @example
 * ```tsx
 * import Pagination from "@/components/elements/Pagination";
 *
 * const [page, setPage] = useState(1);
 * <Pagination page={page} total={10} onChange={setPage} />
 * ```
 */
export default function Pagination({
  page,
  total,
  onChange,
  size = "md",
  align = "start",
  icons = false,
  className = "",
}: PaginationProps) {
  const sizing = SIZES[size];
  const items = getItems(page, total);

  const itemClass = (active = false, disabled = false, rounded = "") =>
    `relative inline-flex items-center border ${sizing} font-medium ${
      active
        ? "z-10 border-blue-600 bg-blue-600 text-white"
        : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
    } ${disabled ? "pointer-events-none opacity-50" : ""} ${rounded}`;

  const alignWrap =
    align === "center" ? "justify-center" : align === "end" ? "justify-end" : "";

  return (
    <nav className={`flex ${alignWrap} ${className}`} aria-label="Pagination">
      <ul className="inline-flex -space-x-px rounded-md shadow-sm">
        <li>
          <button
            type="button"
            onClick={() => page > 1 && onChange?.(page - 1)}
            disabled={page <= 1}
            aria-label="Previous"
            className={itemClass(false, page <= 1, "rounded-l-md")}
          >
            {icons ? <Chevron left /> : "Previous"}
          </button>
        </li>

        {items.map((it, i) =>
          it === "…" ? (
            <li key={`gap-${i}`}>
              <span className={`${itemClass()} cursor-default hover:bg-white dark:hover:bg-zinc-900`}>
                …
              </span>
            </li>
          ) : (
            <li key={it}>
              <button
                type="button"
                onClick={() => onChange?.(it)}
                aria-current={it === page ? "page" : undefined}
                className={itemClass(it === page)}
              >
                {it}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => page < total && onChange?.(page + 1)}
            disabled={page >= total}
            aria-label="Next"
            className={itemClass(false, page >= total, "rounded-r-md")}
          >
            {icons ? <Chevron /> : "Next"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

/**
 * SimplePagination
 * ----------------
 * Just "Previous" / "Next" buttons with optional centre text — the Tailwind UI
 * card-footer pattern (e.g. "Showing 1 to 10 of 97 results").
 *
 * @property page     - Current page (used for the default label / disabling).
 * @property total    - Total pages.
 * @property onChange - Called with the new page.
 * @property label    - Centre text. Defaults to "Page X of Y".
 */
export function SimplePagination({
  page,
  total,
  onChange,
  label,
  className = "",
}: {
  page: number;
  total: number;
  onChange?: (page: number) => void;
  label?: ReactNode;
  className?: string;
}) {
  const btn =
    "relative inline-flex items-center rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800";
  return (
    <nav className={`flex items-center justify-between gap-3 ${className}`}>
      <button
        type="button"
        className={btn}
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
      >
        Previous
      </button>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {label ?? `Page ${page} of ${total}`}
      </p>
      <button
        type="button"
        className={btn}
        disabled={page >= total}
        onClick={() => onChange?.(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}

/**
 * CenteredPagination
 * ------------------
 * A full-width bar with a top border — "Previous" on the left, page numbers
 * centered (active gets a coloured top-border accent) and "Next" on the right.
 * The Tailwind UI "centered page numbers" pattern.
 */
export function CenteredPagination({
  page,
  total,
  onChange,
  className = "",
}: {
  page: number;
  total: number;
  onChange?: (page: number) => void;
  className?: string;
}) {
  const items = getItems(page, total);
  const side =
    "inline-flex items-center border-t-2 border-transparent pt-4 text-sm font-medium text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200";

  return (
    <nav
      className={`flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 ${className}`}
      aria-label="Pagination"
    >
      <div className="-mt-px flex w-0 flex-1">
        <button
          type="button"
          onClick={() => page > 1 && onChange?.(page - 1)}
          disabled={page <= 1}
          className={`${side} pr-1`}
        >
          <ArrowLong left />
          <span className="ml-3">Previous</span>
        </button>
      </div>

      <div className="hidden md:-mt-px md:flex">
        {items.map((it, i) =>
          it === "…" ? (
            <span
              key={`gap-${i}`}
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-zinc-400"
            >
              …
            </span>
          ) : (
            <button
              key={it}
              type="button"
              onClick={() => onChange?.(it)}
              aria-current={it === page ? "page" : undefined}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                it === page
                  ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
              }`}
            >
              {it}
            </button>
          ),
        )}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          type="button"
          onClick={() => page < total && onChange?.(page + 1)}
          disabled={page >= total}
          className={`${side} pl-1`}
        >
          <span className="mr-3">Next</span>
          <ArrowLong />
        </button>
      </div>
    </nav>
  );
}

/* ----------------------------- Playground demos ---------------------------- */

function Demo({
  total = 5,
  start = 2,
  size,
  align,
  icons,
}: {
  total?: number;
  start?: number;
  size?: PaginationProps["size"];
  align?: PaginationProps["align"];
  icons?: boolean;
}) {
  const [page, setPage] = useState(start);
  return (
    <Pagination
      page={page}
      total={total}
      onChange={setPage}
      size={size}
      align={align}
      icons={icons}
    />
  );
}

function SimpleDemo({ label }: { label?: ReactNode }) {
  const [page, setPage] = useState(1);
  return (
    <SimplePagination
      page={page}
      total={10}
      onChange={setPage}
      label={label}
      className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-800"
    />
  );
}

function CenteredDemo() {
  const [page, setPage] = useState(2);
  return <CenteredPagination page={page} total={10} onChange={setPage} />;
}

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Pagination") and renders each variant's demo + code.
 */
export const paginationElement = {
  name: "Pagination",
  variants: [
    {
      name: "Basic",
      description: "Numbered pages with Previous / Next, controlled via state.",
      demo: <Demo />,
      code: `import Pagination from "@/components/elements/Pagination";

const [page, setPage] = useState(1);

<Pagination page={page} total={5} onChange={setPage} />`,
    },
    {
      name: "With icons",
      description: "Arrow icons for Previous / Next — pass `icons`.",
      demo: <Demo icons />,
      code: `<Pagination page={page} total={5} onChange={setPage} icons />`,
    },
    {
      name: "Sizes",
      description: "Three sizes — pass `size`: sm, md (default) or lg.",
      demo: (
        <div className="flex flex-col gap-3">
          <Demo size="sm" icons />
          <Demo size="md" icons />
          <Demo size="lg" icons />
        </div>
      ),
      code: `<Pagination page={page} total={5} onChange={setPage} size="sm" />
<Pagination page={page} total={5} onChange={setPage} size="lg" />`,
    },
    {
      name: "Alignment",
      description: "Align the row — pass `align`: start (default), center or end.",
      demo: (
        <div className="flex flex-col gap-3">
          <Demo align="start" />
          <Demo align="center" />
          <Demo align="end" />
        </div>
      ),
      code: `<Pagination page={page} total={5} onChange={setPage} align="center" />
<Pagination page={page} total={5} onChange={setPage} align="end" />`,
    },
    {
      name: "Truncated",
      description: "Long ranges collapse with “…” around the current page.",
      demo: <Demo total={12} start={6} icons />,
      code: `<Pagination page={page} total={12} onChange={setPage} icons />`,
    },
    {
      name: "Simple",
      description:
        "Just Previous / Next with a page label — the Tailwind card-footer pattern.",
      demo: <SimpleDemo />,
      code: `import { SimplePagination } from "@/components/elements/Pagination";

const [page, setPage] = useState(1);

<SimplePagination page={page} total={10} onChange={setPage} />`,
    },
    {
      name: "With results text",
      description: "Previous / Next with a “showing X to Y of Z” summary.",
      demo: <SimpleDemo label="Showing 1 to 10 of 97 results" />,
      code: `import { SimplePagination } from "@/components/elements/Pagination";

<SimplePagination
  page={page}
  total={10}
  onChange={setPage}
  label="Showing 1 to 10 of 97 results"
/>`,
    },
    {
      name: "Centered page numbers",
      description:
        "Full-width bar — Previous left, centered numbers (active gets a top-border accent), Next right.",
      demo: <CenteredDemo />,
      code: `import { CenteredPagination } from "@/components/elements/Pagination";

const [page, setPage] = useState(1);

<CenteredPagination page={page} total={10} onChange={setPage} />`,
    },
  ],
};
