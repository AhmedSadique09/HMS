"use client";

import { Check, FileText, MessageCircle, MoreVertical, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { BookingStatus } from "./bookingsData";

/** One row's actions, collapsed behind a three-dot menu. */
export function BookingRowActions({ status }: { status: BookingStatus }) {
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

  const items = [
    ...(status === "pending"
      ? [
          { label: "Accept", icon: Check, className: "text-brand" },
          { label: "Reject", icon: X, className: "text-rose-600" },
        ]
      : []),
    { label: "Call", icon: Phone, className: "text-ink/70" },
    { label: "Message", icon: MessageCircle, className: "text-ink/70" },
    { label: "Invoice", icon: FileText, className: "text-ink/70" },
  ];

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Booking actions"
        aria-expanded={isOpen}
        className="flex size-8 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5"
      >
        <MoreVertical className="size-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-40 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-lg">
          {items.map(({ label, icon: ItemIcon, className }) => (
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
