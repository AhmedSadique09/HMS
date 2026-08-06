import type { ReactNode } from "react";

/* Brand tokens (match Header / Footer / landing page) ---------------- */
/* heading navy #132743 · accent pink #d73853 · card surface #f1f5f9   */

/** Stroked glyph. Multiple sub-paths are separated by "|". */
export function Icon({ path, className = "size-6" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={className}>
      {path.split("|").map((d, i) => (
        <path key={i} d={d} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/** Filled glyph — for marks where an outline would read as the wrong logo. */
export function SolidIcon({ path, className = "size-6" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d={path} />
    </svg>
  );
}

export const ICONS = {
  sparkle:
    "M12 3l1.7 4.8 4.8 1.7-4.8 1.7L12 16l-1.7-4.8L5.5 9.5l4.8-1.7L12 3Z|M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z",
  target:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z|M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z|M12 13.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z",
  flag: "M5 22V3|M5 3.5h12l-2 4 2 4H5",
  eye: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z|M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z|m21 21-4.3-4.3",
  sliders: "M4 21v-6|M4 11V3|M12 21v-9|M12 8V3|M20 21v-4|M20 13V3|M1.5 15h5|M9.5 8h5|M17.5 17h5",
  shield: "M12 21.5C7.5 20 4.5 17.5 4.5 12.5V5.8L12 2.5l7.5 3.3v6.7c0 5-3 7.5-7.5 9Z|m9 12 2.2 2.2 4.3-4.5",
  confetti: "M5.5 11.5 2 22l10.5-3.5|M12 5.5 18.5 12|M15 3h.01|M21 9h.01|M20.5 3.5l-1 1|M9.5 8.5l1-1",
  checklist: "M9.5 6h11|M9.5 12h11|M9.5 18h11|m3 6 1.4 1.4L7.4 4.6|m3 12 1.4 1.4L7.4 10.6|m3 18 1.4 1.4L7.4 16.6",
  building:
    "M4 21V6.5L12 3l8 3.5V21|M3 21h18|M9.5 21v-4.5h5V21|M8.5 9h.01|M12 9h.01|M15.5 9h.01|M8.5 12.5h.01|M15.5 12.5h.01",
  badge:
    "m12 2.5 2.4 1.9 3 .1.9 2.9 2.4 1.8-1 2.9 1 2.9-2.4 1.8-.9 2.9-3 .1-2.4 1.9-2.4-1.9-3-.1-.9-2.9L2.7 15.5l1-2.9-1-2.9 2.4-1.8.9-2.9 3-.1L12 2.5Z|m9.2 12.2 2 2 3.6-3.9",
  star: "m12 3.5 2.7 5.5 6 .9-4.35 4.2 1.03 6L12 17.27 6.62 20.1l1.03-6L3.3 9.9l6-.9L12 3.5Z",
  receipt:
    "M5 21V4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5V21l-2.3-1.6-2.35 1.6L12 19.4 9.65 21 7.3 19.4 5 21Z|M9 8h6|M9 12h6",
  lock: "M6 10.5h12a1.5 1.5 0 0 1 1.5 1.5v7.5A1.5 1.5 0 0 1 18 21H6a1.5 1.5 0 0 1-1.5-1.5V12A1.5 1.5 0 0 1 6 10.5Z|M8 10.5V7a4 4 0 1 1 8 0v3.5",
  trending: "m3 16 5.5-5.5 3.5 3.5L21 5|M15 5h6v6",
  arrow: "M5 12h13|m12.5 5.5 6.5 6.5-6.5 6.5",
  heart: "M12 20.3S3.5 15.5 3.5 9.6A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.6c0 5.9-8.5 10.7-8.5 10.7Z",
};

/** Filled marks — store badges and the pull-quote glyph. */
export const SOLID_ICONS = {
  play: "M8 5v14l11-7L8 5Z",
  apple:
    "M16 2c.1 1-.3 2-1 2.7-.7.8-1.8 1.4-2.8 1.3-.1-1 .4-2 1-2.7C13.9 2.5 15 2 16 2Zm3.2 15.3c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.3 3.1-4 3.1-1.4 0-1.8-.9-3.7-.9s-2.4.9-3.7.9c-1.7 0-3-1.6-4-3C-.6 18-.9 13.5 1 11c1-1.4 2.5-2.2 4-2.2 1.6 0 2.6 1 3.9 1s2.1-1 4-1c1.3 0 2.7.7 3.7 2-3.3 1.8-2.8 6.5 2.6 6.5Z",
  quote:
    "M9.6 5.5 10.4 7C8.8 7.6 8 8.6 7.8 10.2H10v6.3H5V12c0-3.1 1.8-5.4 4.6-6.5Zm9 0 .8 1.5c-1.6.6-2.4 1.6-2.6 3.2H19v6.3h-5V12c0-3.1 1.8-5.4 4.6-6.5Z",
};

/**
 * Small pill label that sits above every section heading — accent icon plus
 * a short caption.
 */
export function StepTag({
  icon,
  children,
  className = "bg-white",
}: {
  icon: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#132743] ${className}`}
    >
      <Icon path={icon} className="size-5 shrink-0 text-[#d73853]" />
      <span>{children}</span>
    </span>
  );
}
