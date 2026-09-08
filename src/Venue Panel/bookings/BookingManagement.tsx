"use client";

import { useState } from "react";
import { DashboardShell } from "../dashboard/DashboardShell";
import { BookingsTable } from "./BookingsTable";
import { BookingsToolbar } from "./BookingsToolbar";
import { BOOKINGS, type BookingStatus } from "./bookingsData";

/** "Booking Management" — searchable, status-filterable list of bookings. */
export function BookingManagement() {
  const [activeStatus, setActiveStatus] = useState<BookingStatus>("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredBookings = BOOKINGS.filter((booking) => {
    if (booking.status !== activeStatus) return false;
    if (!query) return true;
    return (
      booking.customerName.toLowerCase().includes(query) ||
      booking.event.toLowerCase().includes(query) ||
      booking.hall.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardShell>
      <h1 className="font-serif text-3xl font-bold text-ink">Booking Management</h1>
      <p className="mt-1 text-ink/50">Manage all your venue bookings</p>

      <div className="mt-6">
        <BookingsToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          bookings={BOOKINGS}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
        />
      </div>

      <div className="mt-6">
        {filteredBookings.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ink/15 py-12 text-center text-sm text-ink/40">
            {query ? `No ${activeStatus} bookings match "${searchQuery}".` : `No ${activeStatus} bookings right now.`}
          </p>
        ) : (
          <BookingsTable bookings={filteredBookings} />
        )}
      </div>
    </DashboardShell>
  );
}
