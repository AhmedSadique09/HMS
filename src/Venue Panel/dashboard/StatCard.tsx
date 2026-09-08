import { BarChart3, Calendar, CheckCircle2, DollarSign, Eye, TrendingUp, Users, XCircle } from "lucide-react";
import type { StatDatum } from "./dashboardData";

const ICONS: Record<StatDatum["icon"], typeof Users> = {
  users: Users,
  eye: Eye,
  "trending-up": TrendingUp,
  calendar: Calendar,
  check: CheckCircle2,
  x: XCircle,
  dollar: DollarSign,
  "bar-chart": BarChart3,
};

/** One compact metric tile: muted label, bold value, tinted icon badge. */
export function StatCard({ label, value, tint, icon }: StatDatum) {
  const IconComponent = ICONS[icon];

  return (
    <div className="flex items-center justify-between rounded-xl border border-ink/10 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm text-ink/50">{label}</p>
        <p className="mt-1.5 text-2xl font-bold text-ink">{value}</p>
      </div>
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${tint}`}>
        <IconComponent className="size-5" strokeWidth={1.75} />
      </span>
    </div>
  );
}
