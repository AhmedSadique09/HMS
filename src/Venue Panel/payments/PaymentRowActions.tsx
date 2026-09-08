"use client";

import { CheckCircle2, Download, Eye, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PaymentStatus } from "./paymentsData";

/** One transaction row's actions, collapsed behind a three-dot menu. */
export function PaymentRowActions({ status }: { status: PaymentStatus }) {
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
    { label: "View Invoice", icon: Eye, className: "text-ink/70 hover:bg-ink/5" },
    { label: "Download Receipt", icon: Download, className: "text-ink/70 hover:bg-ink/5" },
    ...(status === "pending"
      ? [{ label: "Mark as Paid", icon: CheckCircle2, className: "text-brand hover:bg-brand/5" }]
      : []),
  ];

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Payment actions"
        aria-expanded={isOpen}
        className="flex size-8 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5"
      >
        <MoreVertical className="size-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-44 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-lg">
          {items.map(({ label, icon: ItemIcon, className }) => (
            <button
              key={label}
              type="button"
              onClick={() => setIsOpen(false)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition ${className}`}
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
