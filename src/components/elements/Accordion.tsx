"use client";

import { useState, type ReactNode } from "react";

/**
 * A single panel inside an {@link Accordion}.
 *
 * @property id      - Optional stable key. Falls back to the array index.
 * @property title   - Header content shown on the clickable button.
 * @property content - Body content revealed when the panel is open.
 */
export interface AccordionItem {
  id?: string | number;
  title: ReactNode;
  content: ReactNode;
}

/**
 * Props for the {@link Accordion} component.
 *
 * @property items         - The list of panels to render.
 * @property allowMultiple - If `true`, more than one panel can stay open at
 *                           once (Bootstrap "panels stay open"). Defaults to
 *                           `false`, where opening one closes the others.
 * @property variant       - `"default"` draws a bordered, rounded card.
 *                           `"flush"` removes the side borders and rounding so
 *                           the accordion sits edge-to-edge (Bootstrap
 *                           `.accordion-flush`).
 * @property defaultOpen   - Index (or array of indexes) open on first render.
 * @property className     - Extra classes merged onto the outer wrapper.
 */
export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  variant?: "default" | "flush";
  defaultOpen?: number | number[];
  className?: string;
}

/**
 * Accordion
 * ---------
 * A reusable, accessible collapsible panel group — the Tailwind equivalent of
 * the Bootstrap `.accordion` component.
 *
 * Features:
 * - Single-open (default) or multi-open via `allowMultiple`.
 * - Keyboard + screen-reader friendly (`aria-expanded`, `aria-controls`).
 * - Smooth height/opacity transition, dark-mode ready.
 *
 * @example
 * ```tsx
 * import Accordion from "@/components/elements/Accordion";
 *
 * <Accordion
 *   defaultOpen={0}
 *   items={[
 *     { title: "What is this?", content: "A reusable accordion." },
 *     { title: "Can I open many?", content: "Yes — pass allowMultiple." },
 *   ]}
 * />
 * ```
 *
 * @example Allow several panels open at once
 * ```tsx
 * <Accordion allowMultiple defaultOpen={[0, 2]} items={items} />
 * ```
 */
export default function Accordion({
  items,
  allowMultiple = false,
  variant = "default",
  defaultOpen,
  className = "",
}: AccordionProps) {
  const initial = new Set<number>(
    defaultOpen === undefined
      ? []
      : Array.isArray(defaultOpen)
        ? defaultOpen
        : [defaultOpen],
  );

  const [open, setOpen] = useState<Set<number>>(initial);

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const wrapperVariant =
    variant === "flush"
      ? "border-y border-zinc-200 dark:border-zinc-800"
      : "overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800";

  return (
    <div
      className={`divide-y divide-zinc-200 dark:divide-zinc-800 ${wrapperVariant} ${className}`}
    >
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const key = item.id ?? index;
        const panelId = `accordion-panel-${key}`;
        const buttonId = `accordion-button-${key}`;

        return (
          <div
            key={key}
            className={
              variant === "flush" ? "" : "bg-white dark:bg-zinc-900"
            }
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <span>{item.title}</span>
                <svg
                  className={`size-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-200 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Playground entry for this element, colocated with the component so every
 * accordion variant lives in one file. The `/elements` page shows one sidebar
 * item ("Accordion") and renders each variant's `demo` + `code` on one page.
 */
export const accordionElement = {
  name: "Accordion",
  variants: [
  {
    name: "Flush",
    description:
      "Edge-to-edge accordion with no side borders or rounding — the Tailwind equivalent of Bootstrap's .accordion-flush. Single-open.",
    demo: (
      <Accordion
        variant="flush"
        items={[
          {
            title: "Accordion Item #1",
            content:
              "Placeholder content for this accordion, which is intended to demonstrate the flush style. This is the first item's accordion body.",
          },
          {
            title: "Accordion Item #2",
            content:
              "Placeholder content for this accordion, which is intended to demonstrate the flush style. This is the second item's accordion body. Let's imagine this being filled with some actual content.",
          },
          {
            title: "Accordion Item #3",
            content:
              "Placeholder content for this accordion, which is intended to demonstrate the flush style. This is the third item's accordion body. Nothing more exciting happening here, but just filling up the space.",
          },
        ]}
      />
    ),
    code: `import Accordion from "@/components/elements/Accordion";

<Accordion
  variant="flush"
  items={[
    { title: "Accordion Item #1", content: "First item's body." },
    { title: "Accordion Item #2", content: "Second item's body." },
    { title: "Accordion Item #3", content: "Third item's body." },
  ]}
/>`,
  },
  {
    name: "Always Open",
    description:
      "Multiple panels can stay open at once — the Tailwind equivalent of Bootstrap's 'panels stay open'. First panel open by default.",
    demo: (
      <Accordion
        allowMultiple
        defaultOpen={0}
        items={[
          {
            title: "Accordion Item #1",
            content: (
              <>
                <strong>This is the first item&apos;s accordion body.</strong>{" "}
                It is shown by default. You can keep several panels open at the
                same time because there is no single-open parent.
              </>
            ),
          },
          {
            title: "Accordion Item #2",
            content: (
              <>
                <strong>This is the second item&apos;s accordion body.</strong>{" "}
                It is hidden by default. Opening it does not close the others.
              </>
            ),
          },
          {
            title: "Accordion Item #3",
            content: (
              <>
                <strong>This is the third item&apos;s accordion body.</strong>{" "}
                Just about any HTML can go inside an accordion body.
              </>
            ),
          },
        ]}
      />
    ),
    code: `import Accordion from "@/components/elements/Accordion";

<Accordion
  allowMultiple
  defaultOpen={0}
  items={[
    { title: "Accordion Item #1", content: <strong>First body.</strong> },
    { title: "Accordion Item #2", content: <strong>Second body.</strong> },
    { title: "Accordion Item #3", content: <strong>Third body.</strong> },
  ]}
/>`,
  },
  ],
};
