import { BookingRowActions } from "./BookingRowActions";
import type { Booking, BookingStatus } from "./bookingsData";

const STATUS_BADGE: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-rose-100 text-rose-700",
};

function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

/** Table view of the booking list — same data and actions as the cards, denser layout. */
export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-zinc-100 text-xs font-medium uppercase tracking-wide text-zinc-500">
            <th className="px-5 py-3 font-medium">Customer</th>
            <th className="px-3 py-3 font-medium">Event</th>
            <th className="px-3 py-3 font-medium">Date &amp; Slot</th>
            <th className="px-3 py-3 font-medium">Guests</th>
            <th className="px-3 py-3 font-medium">Hall</th>
            <th className="px-3 py-3 font-medium">Total</th>
            <th className="px-3 py-3 font-medium">Advance</th>
            <th className="px-3 py-3 font-medium">Remaining</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const remaining = booking.total - booking.advancePaid;

            return (
              <tr key={booking.id} className="border-b border-ink/10 last:border-b-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={booking.customerPhoto}
                      alt={booking.customerName}
                      className="size-9 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{booking.customerName}</p>
                      <p className="truncate text-xs text-ink/50">{booking.customerPhone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-ink/70">{booking.event}</td>
                <td className="px-3 py-3 text-ink/70">
                  {booking.date}
                  <span className="block text-xs text-ink/40">{booking.slot}</span>
                </td>
                <td className="px-3 py-3 text-ink/70">{booking.guests}</td>
                <td className="px-3 py-3 text-ink/70">{booking.hall}</td>
                <td className="px-3 py-3 font-medium text-ink">{formatPkr(booking.total)}</td>
                <td className="px-3 py-3 text-emerald-700">{formatPkr(booking.advancePaid)}</td>
                <td className="px-3 py-3 text-amber-700">{formatPkr(remaining)}</td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_BADGE[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <BookingRowActions status={booking.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
