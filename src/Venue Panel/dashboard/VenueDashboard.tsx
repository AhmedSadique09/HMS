import { BookingTrendsChart } from "./BookingTrendsChart";
import { DashboardShell } from "./DashboardShell";
import { EventTypesChart } from "./EventTypesChart";
import { NotificationsPanel } from "./NotificationsPanel";
import { RecentBookingsTable } from "./RecentBookingsTable";
import { RevenueChart } from "./RevenueChart";
import { STATS } from "./dashboardData";
import { StatCard } from "./StatCard";

/**
 * The venue admin lands here once onboarding is complete — stat tiles,
 * revenue/event/booking charts, notifications, and a recent-bookings table.
 */
export function VenueDashboard() {
  return (
    <DashboardShell>
      <h1 className="font-serif text-3xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-ink/50">Welcome back — here&apos;s what&apos;s happening today</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <RevenueChart />
        <EventTypesChart />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BookingTrendsChart />
        <NotificationsPanel />
      </div>

      <div className="mt-6">
        <RecentBookingsTable />
      </div>
    </DashboardShell>
  );
}
