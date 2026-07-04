"use client";

import { useState, useRef, useEffect, Fragment, type ReactNode } from "react";
import { ListGroup, ListGroupItem } from "@/components/elements/ListGroup";

/**
 * A section watched by {@link ScrollSpy}.
 *
 * @property id       - Unique id, used to link the nav item to the content.
 * @property label    - The nav label / section heading.
 * @property content  - The section body.
 * @property children - Optional sub-sections (for the nested nav).
 */
export interface SpySection {
  id: string;
  label: string;
  content: ReactNode;
  children?: { id: string; label: string; content: ReactNode }[];
}

/**
 * Props for the {@link ScrollSpy} component.
 *
 * @property sections - The sections to render and track.
 * @property variant  - `"simple"` (anchors), `"nested"` or `"list-group"`.
 * @property height   - Height of the scroll area (Tailwind class). Default `h-72`.
 * @property className - Extra classes merged onto the wrapper.
 */
export interface ScrollSpyProps {
  sections: SpySection[];
  variant?: "simple" | "nested" | "list-group";
  height?: string;
  className?: string;
}

/**
 * ScrollSpy
 * ---------
 * Highlights the nav item for the section currently in view as you scroll — the
 * Tailwind equivalent of Bootstrap's scrollspy. Clicking a nav item smoothly
 * scrolls to its section. Choose a simple-anchor, nested or list-group nav.
 *
 * @example
 * ```tsx
 * import ScrollSpy from "@/components/elements/ScrollSpy";
 *
 * <ScrollSpy
 *   sections={[
 *     { id: "intro", label: "Introduction", content: <p>…</p> },
 *     { id: "usage", label: "Usage", content: <p>…</p> },
 *   ]}
 * />
 * ```
 */
export default function ScrollSpy({
  sections,
  variant = "simple",
  height = "h-72",
  className = "",
}: ScrollSpyProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const scrollRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    const ids = sections.flatMap((s) => [
      s.id,
      ...(s.children?.map((x) => x.id) ?? []),
    ]);
    const handler = () => {
      const top = c.scrollTop + 16;
      let cur = ids[0];
      for (const id of ids) {
        const el = refs.current[id];
        if (el && el.offsetTop <= top) cur = id;
      }
      setActive(cur);
    };
    handler();
    c.addEventListener("scroll", handler);
    return () => c.removeEventListener("scroll", handler);
  }, [sections]);

  const goTo = (id: string) => {
    const el = refs.current[id];
    const c = scrollRef.current;
    if (el && c) c.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
  };

  const linkClass = (on: boolean) =>
    `block border-l-2 py-1 pl-3 text-sm ${
      on
        ? "border-blue-600 font-medium text-blue-600 dark:border-blue-400 dark:text-blue-400"
        : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
    }`;

  const Section = ({
    id,
    label,
    content,
  }: {
    id: string;
    label: string;
    content: ReactNode;
  }) => (
    <section
      ref={(n) => {
        refs.current[id] = n;
      }}
    >
      <h3 className="font-semibold text-zinc-900 dark:text-white">{label}</h3>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {content}
      </div>
    </section>
  );

  let nav: ReactNode;
  if (variant === "list-group") {
    nav = (
      <ListGroup>
        {sections.map((s) => (
          <ListGroupItem
            key={s.id}
            action
            active={active === s.id}
            onClick={() => goTo(s.id)}
          >
            {s.label}
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  } else if (variant === "nested") {
    nav = (
      <nav className="space-y-1">
        {sections.map((s) => (
          <div key={s.id}>
            <button
              type="button"
              onClick={() => goTo(s.id)}
              className={`w-full text-left ${linkClass(active === s.id)}`}
            >
              {s.label}
            </button>
            {s.children && (
              <div className="ml-3 mt-1 space-y-1">
                {s.children.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => goTo(c.id)}
                    className={`w-full text-left ${linkClass(active === c.id)}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  } else {
    nav = (
      <nav className="space-y-1">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.id)}
            className={`w-full text-left ${linkClass(active === s.id)}`}
          >
            {s.label}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <div className={`flex gap-6 ${className}`}>
      <div className="w-40 shrink-0">{nav}</div>
      <div
        ref={scrollRef}
        className={`relative flex-1 space-y-6 overflow-y-auto rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 ${height}`}
      >
        {sections.map((s) => (
          <Fragment key={s.id}>
            <Section id={s.id} label={s.label} content={s.content} />
            {s.children?.map((c) => (
              <Section key={c.id} id={c.id} label={c.label} content={c.content} />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

const LOREM =
  "Some placeholder content shown to demonstrate scrollspy. As you scroll this panel, the matching item in the navigation on the left is highlighted automatically. Keep scrolling to see the next section become active.";

const FLAT: SpySection[] = [
  { id: "ss-intro", label: "Introduction", content: <p>{LOREM}</p> },
  { id: "ss-usage", label: "Usage", content: <p>{LOREM}</p> },
  { id: "ss-options", label: "Options", content: <p>{LOREM}</p> },
  { id: "ss-events", label: "Events", content: <p>{LOREM}</p> },
  { id: "ss-methods", label: "Methods", content: <p>{LOREM}</p> },
];

const NESTED: SpySection[] = [
  {
    id: "ns-first",
    label: "Item 1",
    content: <p>{LOREM}</p>,
    children: [
      { id: "ns-first-1", label: "Item 1-1", content: <p>{LOREM}</p> },
      { id: "ns-first-2", label: "Item 1-2", content: <p>{LOREM}</p> },
    ],
  },
  {
    id: "ns-second",
    label: "Item 2",
    content: <p>{LOREM}</p>,
    children: [
      { id: "ns-second-1", label: "Item 2-1", content: <p>{LOREM}</p> },
      { id: "ns-second-2", label: "Item 2-2", content: <p>{LOREM}</p> },
    ],
  },
];

const GROUP: SpySection[] = [
  { id: "lg-home", label: "Home", content: <p>{LOREM}</p> },
  { id: "lg-profile", label: "Profile", content: <p>{LOREM}</p> },
  { id: "lg-messages", label: "Messages", content: <p>{LOREM}</p> },
  { id: "lg-settings", label: "Settings", content: <p>{LOREM}</p> },
];

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Scrollspy") and renders each variant's demo + code.
 */
export const scrollSpyElement = {
  name: "Scrollspy",
  variants: [
    {
      name: "Simple anchors",
      description:
        "Scroll the panel — the matching anchor on the left highlights automatically.",
      demo: <ScrollSpy sections={FLAT} />,
      code: `import ScrollSpy from "@/components/elements/ScrollSpy";

<ScrollSpy
  sections={[
    { id: "intro", label: "Introduction", content: <p>…</p> },
    { id: "usage", label: "Usage", content: <p>…</p> },
    { id: "options", label: "Options", content: <p>…</p> },
  ]}
/>`,
    },
    {
      name: "Nested nav",
      description: "Sections with sub-sections — give items `children`.",
      demo: <ScrollSpy variant="nested" sections={NESTED} />,
      code: `<ScrollSpy
  variant="nested"
  sections={[
    {
      id: "first", label: "Item 1", content: <p>…</p>,
      children: [
        { id: "first-1", label: "Item 1-1", content: <p>…</p> },
        { id: "first-2", label: "Item 1-2", content: <p>…</p> },
      ],
    },
  ]}
/>`,
    },
    {
      name: "List group",
      description: "The nav rendered as a list group — pass `variant=\"list-group\"`.",
      demo: <ScrollSpy variant="list-group" sections={GROUP} />,
      code: `<ScrollSpy
  variant="list-group"
  sections={[
    { id: "home", label: "Home", content: <p>…</p> },
    { id: "profile", label: "Profile", content: <p>…</p> },
    { id: "messages", label: "Messages", content: <p>…</p> },
  ]}
/>`,
    },
  ],
};
