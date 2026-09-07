"use client";

import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { label: "View", icon: Eye, className: "text-ink/70" },
  { label: "Edit", icon: Pencil, className: "text-ink/70" },
  { label: "Delete", icon: Trash2, className: "text-rose-600" },
] as const;

/** One venue row's View/Edit/Delete actions, collapsed behind a three-dot menu. */
export function VenueRowActions() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Venue actions"
        aria-expanded={isOpen}
        className="flex size-8 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5"
      >
        <MoreVertical className="size-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-36 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-lg">
          {ITEMS.map(({ label, icon: ItemIcon, className }) => (
            <button
              key={label}
              type="button"
              onClick={() => setIsOpen(false)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-ink/5 ${className}`}
            >
              <ItemIcon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
