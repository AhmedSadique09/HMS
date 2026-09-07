import { RECENT_BOOKINGS, type BookingStatus } from "./dashboardData";

const STATUS_STYLES: Record<BookingStatus, string> = {
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
};

/** "Recent Bookings" — customer / event / date / guests / status table. */
export function RecentBookingsTable() {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <h3 className="font-serif text-lg font-semibold text-ink">Recent Bookings</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="text-xs font-medium uppercase tracking-wide text-ink/40">
              <th className="pb-3 pr-4 font-medium">Customer</th>
              <th className="pb-3 pr-4 font-medium">Event</th>
              <th className="pb-3 pr-4 font-medium">Date</th>
              <th className="pb-3 pr-4 font-medium">Guests</th>
              <th className="pb-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_BOOKINGS.map((booking) => (
              <tr key={`${booking.customer}-${booking.date}`} className="border-t border-ink/10">
                <td className="py-3 pr-4 font-semibold text-ink">{booking.customer}</td>
                <td className="py-3 pr-4 text-ink/70">{booking.event}</td>
                <td className="py-3 pr-4 text-ink/70">{booking.date}</td>
                <td className="py-3 pr-4 text-ink/70">{booking.guests}</td>
                <td className="py-3 text-right">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
