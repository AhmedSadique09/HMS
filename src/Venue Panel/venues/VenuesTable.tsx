import { MapPin, Star } from "lucide-react";
import type { VenueListing } from "./venuesData";
import { VenueRowActions } from "./VenueRowActions";

function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

/** Table view of the venue admin's halls/marquees — photo, ratings, and actions. */
export function VenuesTable({ venues }: { venues: VenueListing[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
      <table className="w-full min-w-215 text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-zinc-100 text-xs font-medium uppercase tracking-wide text-zinc-500">
            <th className="px-5 py-3 font-medium">Venue</th>
            <th className="px-3 py-3 font-medium">Rating</th>
            <th className="px-3 py-3 font-medium">Location</th>
            <th className="px-3 py-3 font-medium">Price / Head</th>
            <th className="px-3 py-3 font-medium">Capacity</th>
            <th className="px-3 py-3 font-medium">Open Dates</th>
            <th className="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id} className="border-b border-ink/10 last:border-b-0">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={venue.photo}
                    alt={venue.name}
                    className="size-11 shrink-0 rounded-xl object-cover"
                  />
                  <p className="truncate font-semibold text-ink">{venue.name}</p>
                </div>
              </td>
              <td className="px-3 py-3">
                <span className="flex items-center gap-1 text-ink/70">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-ink">{venue.rating}</span>
                  <span className="text-xs text-ink/40">({venue.reviewCount})</span>
                </span>
              </td>
              <td className="px-3 py-3 text-ink/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0 text-ink/35" />
                  {venue.location}
                </span>
              </td>
              <td className="px-3 py-3 font-medium text-ink">{formatPkr(venue.pricePerHead)}</td>
              <td className="px-3 py-3 text-ink/70">{venue.capacity.toLocaleString("en-PK")}</td>
              <td className="px-3 py-3 text-ink/70">{venue.openDates}</td>
              <td className="px-5 py-3 text-right">
                <VenueRowActions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
