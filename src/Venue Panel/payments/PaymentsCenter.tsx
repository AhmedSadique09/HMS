"use client";

import { useState } from "react";
import { DashboardShell } from "../dashboard/DashboardShell";
import { PAYMENT_TRANSACTIONS, type PaymentStatus } from "./paymentsData";
import { PaymentsOverview } from "./PaymentsOverview";
import { PaymentsTable } from "./PaymentsTable";
import { PaymentsToolbar } from "./PaymentsToolbar";

/** "Payments" — revenue overview plus a searchable, filterable transaction table. */
export function PaymentsCenter() {
  const [activeStatus, setActiveStatus] = useState<PaymentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredTransactions = PAYMENT_TRANSACTIONS.filter((transaction) => {
    if (activeStatus !== "all" && transaction.status !== activeStatus) return false;
    if (!query) return true;
    return (
      transaction.customerName.toLowerCase().includes(query) ||
      transaction.event.toLowerCase().includes(query) ||
      transaction.hall.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardShell>
      <h1 className="font-serif text-3xl font-bold text-ink">Payments</h1>
      <p className="mt-1 text-ink/50">Track advances, remaining balances, and refunds across your bookings</p>

      <div className="mt-6">
        <PaymentsOverview />
      </div>

      <div className="mt-6">
        <PaymentsToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          transactions={PAYMENT_TRANSACTIONS}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
        />
      </div>

      <div className="mt-4">
        {filteredTransactions.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ink/15 py-12 text-center text-sm text-ink/40">
            No payments match your search.
          </p>
        ) : (
          <PaymentsTable transactions={filteredTransactions} />
        )}
      </div>
    </DashboardShell>
  );
}
