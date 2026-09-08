import type { PaymentStatus, PaymentTransaction } from "./paymentsData";
import { PaymentRowActions } from "./PaymentRowActions";

const STATUS_BADGE: Record<PaymentStatus, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  refunded: "bg-rose-100 text-rose-700",
};

function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

/** Table of individual payment transactions — advances, remainders, full payments, refunds. */
export function PaymentsTable({ transactions }: { transactions: PaymentTransaction[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white shadow-sm">
      <table className="w-full min-w-215 text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-zinc-100 text-xs font-medium uppercase tracking-wide text-zinc-500">
            <th className="px-5 py-3 font-medium">Customer</th>
            <th className="px-3 py-3 font-medium">Event / Hall</th>
            <th className="px-3 py-3 font-medium">Date</th>
            <th className="px-3 py-3 font-medium">Type</th>
            <th className="px-3 py-3 font-medium">Method</th>
            <th className="px-3 py-3 font-medium">Amount</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-ink/10 last:border-b-0">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={transaction.customerPhoto}
                    alt={transaction.customerName}
                    className="size-9 shrink-0 rounded-full object-cover"
                  />
                  <p className="truncate font-semibold text-ink">{transaction.customerName}</p>
                </div>
              </td>
              <td className="px-3 py-3 text-ink/70">
                {transaction.event}
                <span className="block text-xs text-ink/40">{transaction.hall}</span>
              </td>
              <td className="px-3 py-3 text-ink/70">{transaction.date}</td>
              <td className="px-3 py-3 text-ink/70">{transaction.type}</td>
              <td className="px-3 py-3 text-ink/70">{transaction.method}</td>
              <td className="px-3 py-3 font-medium text-ink">{formatPkr(transaction.amount)}</td>
              <td className="px-3 py-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_BADGE[transaction.status]}`}
                >
                  {transaction.status}
                </span>
              </td>
              <td className="px-5 py-3 text-right">
                <PaymentRowActions status={transaction.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
