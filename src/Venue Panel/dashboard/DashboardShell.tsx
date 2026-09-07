"use client";

import { Bell, Calendar, Home, LayoutDashboard, Star, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ProfileMenu } from "./ProfileMenu";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/manage-venue/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/manage-venue/bookings", icon: Calendar },
  { label: "Venues / Halls", href: "/manage-venue/venues", icon: Home },
  { label: "Reviews", href: "/manage-venue/reviews", icon: Star },
  { label: "Payments", href: "/manage-venue/payments", icon: Wallet },
] as const;

/** Sidebar + topbar frame the venue-admin dashboard renders inside. */
export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-dvh bg-[#f7f5f1]">
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

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-4">
          <span className="text-sm font-medium text-ink/50 lg:hidden">Bandhan Venue Panel</span>

          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex size-9 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5"
            >
              <Bell className="size-5" strokeWidth={1.75} />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-brand" />
            </button>
            <ProfileMenu />
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-8xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
