import type { ReactNode } from "react";

interface SectionCardProps {
  /** Anchor target for the sticky profile nav. Omit for sidebar cards. */
  id?: string;
  title: string;
  /** The body wrapper's padding differs per section. */
  bodyClassName?: string;
  children: ReactNode;
}

/**
 * The bordered panel every profile section sits in: a rounded card with a bold
 * heading, a rule, then the body.
 */
export function SectionCard({
  id,
  title,
  bodyClassName = "p-4",
  children,
}: SectionCardProps) {
  return (
    <div id={id} className="rounded-2xl border border-ink/15 bg-white">
      <h2 className="mb-0 px-4 py-3 text-lg font-bold text-ink">{title}</h2>
      <div className={`border-t border-ink/15 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
