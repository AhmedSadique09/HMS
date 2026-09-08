"use client";

import { Calendar, Home, LayoutDashboard, MessageSquare, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { NotificationBell } from "./NotificationBell";
import { ProfileMenu } from "./ProfileMenu";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/manage-venue/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/manage-venue/bookings", icon: Calendar },
  { label: "Venues / Halls", href: "/manage-venue/venues", icon: Home },
  { label: "Messages", href: "/manage-venue/messages", icon: MessageSquare },
  { label: "Payments", href: "/manage-venue/payments", icon: Wallet },
] as const;

type DashboardShellProps = {
  children: ReactNode;
  /** Fills the exact viewport height with no page scroll — the section itself scrolls internally (used by Messages). */
  fullHeight?: boolean;
};

/** Sidebar + topbar frame the venue-admin dashboard renders inside. */
export function DashboardShell({ children, fullHeight = false }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className={`flex bg-[#f7f5f1] ${fullHeight ? "h-dvh overflow-hidden" : "min-h-dvh"}`}>
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-ink/10 bg-white px-5 py-6 lg:flex">
        <Link href="/" className="mb-8 text-2xl font-bold tracking-tight text-ink">
          Bandhan<span className="text-brand">.</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, href, icon: ItemIcon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "bg-brand/10 text-brand" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                <ItemIcon className="size-4.5" strokeWidth={1.75} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className={`flex min-w-0 flex-1 flex-col ${fullHeight ? "min-h-0" : ""}`}>
        <header className="flex shrink-0 items-center justify-between border-b border-ink/10 bg-white px-6 py-4">
          <span className="text-sm font-medium text-ink/50 lg:hidden">Bandhan Venue Panel</span>

          <div className="ml-auto flex items-center gap-4">
            <NotificationBell />
            <ProfileMenu />
          </div>
        </header>

        <main className={fullHeight ? "flex min-h-0 flex-1 flex-col" : "px-4 py-8 sm:px-6"}>
          <div className={fullHeight ? "flex h-full min-h-0 w-full flex-col" : "mx-auto max-w-8xl"}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
