/* eslint-disable @next/next/no-img-element */

import {
  Bookmark,
  Building2,
  CalendarHeart,
  Globe,
  Mail,
  PhoneCall,
  Star,
} from "lucide-react";
import type { Venue } from "@/data/venues";

interface VenueInformationProps {
  venue: Venue;
}

/** Hero panel: banner, overlapping logo, name, and the at-a-glance meta row. */
export function VenueInformation({ venue }: VenueInformationProps) {
  return (
    <div className="rounded-t-2xl border border-b-0 border-ink/15 bg-white">
      <div className="relative overflow-hidden rounded-t-2xl">
        {venue.bannerImage ? (
          <figure className="h-[320px] w-full overflow-hidden">
            <img
              src={venue.bannerImage}
              alt={venue.name}
              className="h-full w-full object-cover"
            />
          </figure>
        ) : (
          <figure className="flex h-[320px] w-full items-center justify-center bg-ink/5">
            <span className="max-w-[450px] text-center text-ink/60">
              Venue banner is not available.
            </span>
          </figure>
        )}

        <div className="mb-5 ml-8 flex items-start gap-4">
          <figure className="relative z-[1] -mt-20 size-40 shrink-0 overflow-hidden rounded-3xl border-8 border-white bg-white shadow-[0_0_16px_4px_rgba(19,39,67,0.12)]">
            <img
              src={venue.logoImage}
              alt={venue.name}
              className="h-full w-full object-contain p-2"
            />
          </figure>

          <div className="flex flex-col gap-2 pt-3">
            <h1 className="mb-0 flex items-center gap-2 text-4xl font-semibold leading-tight text-ink">
              <span>{venue.name}</span>
              <span className="flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-sm font-semibold text-brand">
                <Star className="size-4 fill-brand" />
                {venue.rating}
              </span>
            </h1>

            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink">
              <li className="flex items-center gap-1">
                <Bookmark strokeWidth={1.2} size={18} />
                <span className="opacity-50">|</span>
                <span>{venue.tagline}</span>
              </li>
              <li className="flex items-center gap-1">
                <Mail strokeWidth={1.2} size={18} />
                <span className="opacity-50">|</span>
                <a
                  href={`mailto:${venue.email}`}
                  className="transition-colors hover:text-brand hover:underline"
                >
                  {venue.email}
                </a>
              </li>
              <li className="flex items-center gap-1">
                <PhoneCall strokeWidth={1.2} size={18} />
                <span className="opacity-50">|</span>
                <span>{venue.contactNumber}</span>
              </li>
              <li className="flex items-center gap-1">
                <CalendarHeart strokeWidth={1.2} size={18} />
                Founded
                <span className="opacity-50">|</span>
                <span>{venue.foundedYear}</span>
              </li>
              <li className="flex items-center gap-1">
                <Building2 strokeWidth={1.2} size={18} />
                <span className="opacity-50">|</span>
                <span>{venue.capacity}</span>
              </li>
              <li className="flex items-center gap-1">
                <Globe strokeWidth={1.2} size={18} />
                <span className="opacity-50">|</span>
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand hover:underline"
                >
                  {venue.website}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
