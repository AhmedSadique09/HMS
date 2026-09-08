"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { REVENUE_BY_MONTH } from "./dashboardData";

/** "Monthly Revenue" — smooth pink area chart, values in PKR millions. */
export function RevenueChart() {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm">
      <h3 className="font-serif text-lg font-semibold text-ink">Monthly Revenue</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_BY_MONTH} margin={{ left: -12, right: 12, top: 8 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d73853" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#d73853" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#13274312" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#13274399", fontSize: 12 }} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#13274399", fontSize: 12 }}
              tickFormatter={(v: number) => `${v.toFixed(1)}M`}
            />
            <Tooltip
              formatter={(v: number) => [`PKR ${v.toFixed(1)}M`, "Revenue"]}
              contentStyle={{ borderRadius: 12, border: "1px solid #13274315" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#d73853"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
