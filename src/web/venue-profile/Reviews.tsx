"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { BrandOutlineButton } from "@/components/elements/BrandButton";
import { SectionCard } from "@/components/elements/SectionCard";
import { StarRating } from "@/components/elements/StarRating";

const REVIEWS = [
  {
    name: "Raelynn Cobb",
    source: "Walima, March 2024",
    isoDate: "2024-03-18",
    displayDate: "March 18, 2024",
    rating: 5,
    comment:
      "They ran the whole evening without a single hiccup. Food came out hot, the stage looked exactly like the mock-up, and nobody in my family had to chase a vendor.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Hassan Javed",
    source: "Barat, January 2024",
    isoDate: "2024-01-07",
    displayDate: "January 7, 2024",
    rating: 4.5,
    comment:
      "Parking was the thing I was most worried about with 700 guests, and their valet team handled it better than I expected. Would book again.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Mariam Siddiqui",
    source: "Mehndi, November 2023",
    isoDate: "2023-11-22",
    displayDate: "November 22, 2023",
    rating: 5,
    comment:
      "The decor team actually listened. We changed the colour scheme twice and they never made it feel like a problem.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Bilal Ahmed",
    source: "Nikkah, September 2023",
    isoDate: "2023-09-15",
    displayDate: "September 15, 2023",
    rating: 4,
    comment:
      "Great hall and genuinely good catering. Sound system took a while to sort out at the start, but the technician stayed on it.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sana Rauf",
    source: "Engagement, July 2023",
    isoDate: "2023-07-02",
    displayDate: "July 2, 2023",
    rating: 5,
    comment:
      "Booked on short notice and they still made it feel planned for months. The event manager was reachable every single day.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Owais Malik",
    source: "Corporate dinner, May 2023",
    isoDate: "2023-05-19",
    displayDate: "May 19, 2023",
    rating: 4.5,
    comment:
      "Used them for a company event rather than a wedding. Same professionalism — clean setup, on-time service, sensible pricing.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
] as const;

const INITIAL_REVIEWS = 4;

export function Reviews() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_REVIEWS);
  const visibleReviews = REVIEWS.slice(0, visibleCount);
  const hasMore = visibleCount < REVIEWS.length;

  return (
    <SectionCard id="reviews" title="Reviews" bodyClassName="px-4">
      {visibleReviews.map((review) => (
        <div key={review.name} className="flex gap-4 border-b border-ink/15 py-4">
          <figure className="mb-0 size-12 shrink-0 overflow-hidden rounded-lg bg-ink/5">
            <img src={review.avatar} alt={review.name} className="h-full w-full object-cover" />
          </figure>

          <div className="flex grow flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col items-start gap-1">
                <h3 className="mb-0 text-base font-bold text-ink">{review.name}</h3>
                <div className="flex items-center gap-2 text-sm text-ink/60">
                  <span>{review.source}</span>
                  <span>|</span>
                  <time dateTime={review.isoDate} className="font-semibold">
                    {review.displayDate}
                  </time>
                </div>
              </div>

              <StarRating rating={review.rating} />
            </div>

            <p className="mb-0 text-sm text-ink/70">{review.comment}</p>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="flex justify-center py-4">
          <BrandOutlineButton onClick={() => setVisibleCount(REVIEWS.length)}>
            Load More
          </BrandOutlineButton>
        </div>
      )}
    </SectionCard>
  );
}
