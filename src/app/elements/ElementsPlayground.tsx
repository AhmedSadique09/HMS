"use client";

import { useState, type ReactNode } from "react";
import { accordionElement } from "@/components/elements/Accordion";
import { alertElement } from "@/components/elements/Alert";
import { badgeElement } from "@/components/elements/Badge";
import { breadcrumbsElement } from "@/components/elements/Breadcrumbs";
import { buttonElement } from "@/components/elements/Button";
import { cardElement } from "@/components/elements/Card";
import { carouselElement } from "@/components/elements/Carousel";
import { collapseElement } from "@/components/elements/Collapse";
import { dropdownElement } from "@/components/elements/Dropdown";
import { listGroupElement } from "@/components/elements/ListGroup";
import { modalElement } from "@/components/elements/Modal";
import { navbarElement } from "@/components/elements/Navbar";
import { paginationElement } from "@/components/elements/Pagination";
import { tabsElement } from "@/components/elements/Tabs";
import { verticalNavElement } from "@/components/elements/VerticalNav";
import { sidebarElement } from "@/components/elements/Sidebar";
import { progressElement } from "@/components/elements/Progress";
import { placeholderElement } from "@/components/elements/Placeholder";
import { popoverElement } from "@/components/elements/Popover";
import { scrollSpyElement } from "@/components/elements/ScrollSpy";
import { spinnerElement } from "@/components/elements/Spinner";
import { toastElement } from "@/components/elements/Toast";
import { inputElement } from "@/components/elements/Input";
import { textareaElement } from "@/components/elements/Textarea";
import { checkboxElement } from "@/components/elements/Checkbox";
import { radioGroupElement } from "@/components/elements/RadioGroup";
import { switchElement } from "@/components/elements/Switch";
import { selectElement } from "@/components/elements/Select";
import { separatorElement } from "@/components/elements/Separator";
import { avatarElement } from "@/components/elements/Avatar";
import { tooltipElement } from "@/components/elements/Tooltip";
import { tableElement } from "@/components/elements/Table";
import { drawerElement } from "@/components/elements/Drawer";
import { sliderElement } from "@/components/elements/Slider";
import { toggleElement } from "@/components/elements/Toggle";
import { emptyStateElement } from "@/components/elements/EmptyState";
import { fileUploadElement } from "@/components/elements/FileUpload";

/**
 * Registry of elements shown in the playground. Each element has a `name` (one
 * sidebar item) and a list of `variants`. Add a new element by importing its
 * `xxxElement` above and pushing it here.
 */
const ELEMENTS = [
  accordionElement,
  alertElement,
  badgeElement,
  breadcrumbsElement,
  buttonElement,
  cardElement,
  carouselElement,
  collapseElement,
  dropdownElement,
  listGroupElement,
  modalElement,
  navbarElement,
  paginationElement,
  tabsElement,
  verticalNavElement,
  sidebarElement,
  progressElement,
  placeholderElement,
  popoverElement,
  scrollSpyElement,
  spinnerElement,
  toastElement,
  inputElement,
  textareaElement,
  selectElement,
  checkboxElement,
  radioGroupElement,
  switchElement,
  separatorElement,
  avatarElement,
  tooltipElement,
  tableElement,
  drawerElement,
  sliderElement,
  toggleElement,
  emptyStateElement,
  fileUploadElement,
];

/**
 * Accent palettes cycled per variant so each card has its own colour.
 */
const ACCENTS = [
  {
    bar: "from-sky-400 to-blue-600",
    dot: "bg-blue-500",
    pill: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
  },
  {
    bar: "from-emerald-500 to-teal-500",
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  },
  {
    bar: "from-rose-500 to-orange-500",
    dot: "bg-rose-500",
    pill: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
  },
  {
    bar: "from-sky-500 to-blue-500",
    dot: "bg-sky-500",
    pill: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  },
];

/**
 * VariantBlock
 * ------------
 * One variant card: an accent bar, heading + description, the live demo, then
 * its code in a window-style block with a per-variant Copy button.
 */
function VariantBlock({
  name,
  description,
  demo,
  code,
  accentIndex,
}: {
  name: string;
  description: string;
  demo: ReactNode;
  code: string;
  accentIndex: number;
}) {
  const [copied, setCopied] = useState(false);
  const accent = ACCENTS[accentIndex % ACCENTS.length];

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/60 bg-linear-to-b from-white/70 to-white/40 shadow-xl shadow-blue-900/10 inset-ring-1 inset-ring-white/40 backdrop-blur-xl dark:border-white/10 dark:from-zinc-900/55 dark:to-zinc-900/30 dark:inset-ring-white/10">
      {/* Accent bar */}
      <div className={`h-1.5 bg-linear-to-r ${accent.bar}`} />

      <div className="p-6">
        {/* Heading */}
        <div className="flex items-center gap-2.5">
          <span className={`size-2.5 rounded-full ${accent.dot}`} />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {name}
          </h2>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>

        {/* Live demo */}
        <div className="mt-5 rounded-xl border border-white/50 bg-white/40 p-6 dark:border-white/10 dark:bg-white/5">
          <span
            className={`mb-4 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${accent.pill}`}
          >
            Preview
          </span>
          {demo}
        </div>

        {/* Code window */}
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/85 shadow-inner backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/3 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-[#ff5f56]" />
              <span className="size-3 rounded-full bg-[#ffbd2e]" />
              <span className="size-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-xs font-medium text-zinc-400">
                usage.tsx
              </span>
            </div>
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-zinc-100">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

/**
 * ElementsPlayground
 * ------------------
 * The `/elements` page. A glass sidebar lists every component; clicking one
 * shows all of its variants (live demo + code) stacked on a single page.
 */
export default function ElementsPlayground() {
  const [activeName, setActiveName] = useState(ELEMENTS[0].name);
  const active = ELEMENTS.find((e) => e.name === activeName) ?? ELEMENTS[0];

  return (
    <div className="relative min-h-screen w-full">
      {/* Base + decorative gradient blobs behind the glass */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-zinc-100 dark:bg-zinc-950"
      >
        <div className="absolute -left-24 -top-24 size-96 rounded-full bg-blue-400/60 blur-3xl dark:bg-blue-600/30" />
        <div className="absolute right-0 top-1/4 size-96 rounded-full bg-blue-500/50 blur-3xl dark:bg-blue-700/30" />
        <div className="absolute bottom-0 left-1/3 size-96 rounded-full bg-pink-400/50 blur-3xl dark:bg-pink-600/25" />
        <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-600/20" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-white/40 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/40">
          {/* Brand */}
          <div className="flex items-center gap-3 px-5 pb-4 pt-5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/30">
              UI
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
                Elements
              </p>
              <p className="text-xs text-zinc-400">
                {ELEMENTS.length} components
              </p>
            </div>
          </div>

          <p className="px-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Components
          </p>

          {/* List */}
          <nav className="scrollbar-hide flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-4">
            {ELEMENTS.map((el) => {
              const on = el.name === active.name;
              return (
                <button
                  key={el.name}
                  type="button"
                  onClick={() => setActiveName(el.name)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                    on
                      ? "bg-white/50 text-blue-700 shadow-sm inset-ring-1 inset-ring-white/60 backdrop-blur-md dark:bg-white/10 dark:text-white dark:inset-ring-white/15"
                      : "text-zinc-600 hover:bg-zinc-100/80 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <span>{el.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      on
                        ? "bg-blue-500/20 text-blue-700 dark:bg-white/15 dark:text-white"
                        : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {el.variants.length}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main panel */}
        <main className="flex-1 overflow-x-auto p-10">
          <header className="mb-10">
            <h1 className="bg-linear-to-r from-zinc-900 to-zinc-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-zinc-400">
              {active.name}
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {active.variants.length} variant
              {active.variants.length === 1 ? "" : "s"} — live preview with
              copy-paste code.
            </p>
          </header>

          <div className="flex max-w-4xl flex-col gap-8">
            {active.variants.map((v, i) => (
              <VariantBlock
                key={v.name}
                name={v.name}
                description={v.description}
                demo={v.demo}
                code={v.code}
                accentIndex={i}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
