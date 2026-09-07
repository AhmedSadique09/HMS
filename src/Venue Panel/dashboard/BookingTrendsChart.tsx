"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BOOKING_TRENDS } from "./dashboardData";

/** "Booking Trends" — pink monthly bar chart. */
export function BookingTrendsChart() {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <h3 className="font-serif text-lg font-semibold text-ink">Booking Trends</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={BOOKING_TRENDS} margin={{ left: -12, right: 12, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#13274312" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#13274399", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#13274399", fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #13274315" }} />
            <Bar dataKey="bookings" fill="#d98aa0" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
