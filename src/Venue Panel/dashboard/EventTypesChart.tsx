"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { EVENT_TYPES } from "./dashboardData";

/** "Event Types" — donut chart with a wrapping color-key legend underneath. */
export function EventTypesChart() {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm">
      <h3 className="font-serif text-lg font-semibold text-ink">Event Types</h3>
      <div className="mt-4 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={EVENT_TYPES}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={2}
              strokeWidth={0}
            >
              {EVENT_TYPES.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number, n: string) => [`${v}%`, n]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {EVENT_TYPES.map((entry) => (
          <li key={entry.name} className="flex items-center gap-1.5 text-sm text-ink/70">
            <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
