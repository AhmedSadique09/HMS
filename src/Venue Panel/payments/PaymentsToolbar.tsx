"use client";

import { Check, ChevronDown, Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SearchInput } from "../common/SearchInput";
import { PAYMENT_STATUS_TABS, type PaymentStatus, type PaymentTransaction } from "./paymentsData";

type Props = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  transactions: PaymentTransaction[];
  activeStatus: PaymentStatus | "all";
  onStatusChange: (status: PaymentStatus | "all") => void;
};

/** Search on the left, a payment-status filter dropdown on the right. */
export function PaymentsToolbar({ searchQuery, onSearchChange, transactions, activeStatus, onStatusChange }: Props) {
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

  const activeLabel =
    activeStatus === "all" ? "All statuses" : PAYMENT_STATUS_TABS.find((tab) => tab.status === activeStatus)?.label;

  return (
    <div className="flex items-center gap-3">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search payments by customer, event, or hall..."
      />

      <div ref={menuRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-brand/40"
        >
          <Filter className="size-4 text-ink/50" />
          {activeLabel}
          <ChevronDown className={`size-4 text-ink/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 w-48 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-lg">
            <button
              type="button"
              onClick={() => {
                onStatusChange("all");
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                activeStatus === "all" ? "bg-brand/10 font-semibold text-brand" : "text-ink/70 hover:bg-ink/5"
              }`}
            >
              {activeStatus === "all" && <Check className="size-3.5" />}
              All statuses
            </button>
            {PAYMENT_STATUS_TABS.map(({ status, label }) => {
              const count = transactions.filter((t) => t.status === status).length;
              const isActive = activeStatus === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    onStatusChange(status);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition ${
                    isActive ? "bg-brand/10 font-semibold text-brand" : "text-ink/70 hover:bg-ink/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <Check className="size-3.5" />}
                    {label}
                  </span>
                  <span className="text-xs text-ink/40">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
