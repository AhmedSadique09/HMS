"use client";

import { useState } from "react";
import { SearchInput } from "../common/SearchInput";
import { DashboardShell } from "../dashboard/DashboardShell";
import { VENUE_LISTINGS } from "./venuesData";
import { VenuesTable } from "./VenuesTable";

/** "Venues / Halls" — searchable table of every hall/marquee this venue admin manages. */
export function VenueManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredVenues = query
    ? VENUE_LISTINGS.filter(
        (venue) =>
          venue.name.toLowerCase().includes(query) || venue.location.toLowerCase().includes(query),
      )
    : VENUE_LISTINGS;

  return (
    <DashboardShell>
      <h1 className="font-serif text-3xl font-bold text-ink">Venues / Halls</h1>
      <p className="mt-1 text-ink/50">Manage the halls and marquees listed under your venue</p>

      <div className="mt-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search venues by name or location..."
        />
      </div>

      <div className="mt-4">
        {filteredVenues.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink/15 py-12 text-center text-sm text-ink/40">
            No venues match &quot;{searchQuery}&quot;.
          </p>
        ) : (
          <VenuesTable venues={filteredVenues} />
        )}
      </div>
    </DashboardShell>
  );
}
