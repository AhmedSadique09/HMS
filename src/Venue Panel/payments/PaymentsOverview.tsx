import { CheckCircle2, Clock, Undo2, Wallet } from "lucide-react";
import { PAYMENT_TRANSACTIONS } from "./paymentsData";

function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

function sumByStatus(status: "paid" | "pending" | "refunded") {
  return PAYMENT_TRANSACTIONS.filter((t) => t.status === status).reduce((sum, t) => sum + t.amount, 0);
}

/** Revenue summary tiles at the top of the Payments screen. */
export function PaymentsOverview() {
  const received = sumByStatus("paid");
  const pending = sumByStatus("pending");
  const refunded = sumByStatus("refunded");
  const totalRevenue = received + pending;

  const stats = [
    { label: "Total Revenue", value: formatPkr(totalRevenue), icon: Wallet, tint: "bg-blue-100 text-blue-600" },
    { label: "Received", value: formatPkr(received), icon: CheckCircle2, tint: "bg-emerald-100 text-emerald-600" },
    { label: "Pending", value: formatPkr(pending), icon: Clock, tint: "bg-amber-100 text-amber-600" },
    { label: "Refunded", value: formatPkr(refunded), icon: Undo2, tint: "bg-rose-100 text-rose-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value, icon: StatIcon, tint }) => (
        <div key={label} className="flex items-center justify-between rounded-xl border border-ink/10 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-ink/50">{label}</p>
            <p className="mt-1.5 text-2xl font-bold text-ink">{value}</p>
          </div>
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${tint}`}>
            <StatIcon className="size-5" strokeWidth={1.75} />
          </span>
        </div>
      ))}
    </div>
  );
}
