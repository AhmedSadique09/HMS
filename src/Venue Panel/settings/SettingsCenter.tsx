"use client";

import { useEffect, useRef, useState } from "react";
import { DashboardShell } from "../dashboard/DashboardShell";
import { ProfileInformationCard } from "./ProfileInformationCard";
import { SecurityCard } from "./SecurityCard";

const TABS = [
  { key: "profile", label: "Profile Information" },
  { key: "security", label: "Security" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const INDICATOR_WIDTH = 24;

/** "Settings" — Profile Information and Security shown as tabs. */
export function SettingsCenter() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const tabRefs = useRef<Partial<Record<TabKey, HTMLButtonElement | null>>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const tabEl = tabRefs.current[activeTab];
    if (!tabEl) return;
    setIndicator({ left: tabEl.offsetLeft + (tabEl.offsetWidth - INDICATOR_WIDTH) / 2, width: INDICATOR_WIDTH });
  }, [activeTab]);

  return (
    <DashboardShell>
      <h1 className="font-serif text-3xl font-bold text-ink">Settings</h1>
      <p className="mt-1 text-ink/50">Manage your account profile and security</p>

      <div className="relative mt-6 flex gap-1">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            ref={(el) => {
              tabRefs.current[key] = el;
            }}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === key ? "text-brand" : "text-ink/50 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
        <span
          className="absolute bottom-0 h-0.5 rounded-full bg-brand transition-all duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      </div>

      <div className="mt-6 max-w-2xl">
        {activeTab === "profile" ? <ProfileInformationCard /> : <SecurityCard />}
      </div>
    </DashboardShell>
  );
}
