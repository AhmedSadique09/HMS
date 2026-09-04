"use client";

import { useState } from "react";
import { BrandOutlineButton } from "@/components/elements/BrandButton";
import { SectionCard } from "@/components/elements/SectionCard";

const SEMINARS = [
  {
    title: "Planning a 1,000-Guest Barat Without Chaos",
    description:
      "A walkthrough of guest flow, seating, and catering timelines for large functions — and the three scheduling mistakes that cause most delays.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    ],
  },
  {
    title: "Decor Budgets: Where the Money Actually Goes",
    description:
      "An honest breakdown of floral, staging, and lighting costs, with guidance on what is worth paying for and what guests never notice.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
    ],
  },
  {
    title: "Choosing Between a Hall, a Lawn, and a Marquee",
    description:
      "How weather, guest count, and season should drive the venue format — plus the contingency plans every family should ask about before booking.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    ],
  },
] as const;

const INITIAL_SEMINARS = 2;

function getYoutubeEmbedId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1) || null;
    if (parsed.hostname.includes("youtube.com")) return parsed.searchParams.get("v");
  } catch {
    return null;
  }
  return null;
}

export function SeminarsExpertInsights() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_SEMINARS);
  const visibleSeminars = SEMINARS.slice(0, visibleCount);
  const hasMore = visibleCount < SEMINARS.length;

  return (
    <SectionCard id="seminars-expert-insights" title="Seminars Expert Insights">
      {visibleSeminars.map((seminar, index) => {
        const videoIds = seminar.youtubeLinks
          .map(getYoutubeEmbedId)
          .filter((id): id is string => Boolean(id));

        return (
          <div
            key={seminar.title}
            className={`flex w-full min-w-0 flex-col gap-5 ${
              index < visibleSeminars.length - 1 ? "mb-4 border-b border-ink/15 pb-4" : ""
            }`}
          >
            <div className="flex flex-col gap-3">
              <h3 className="mb-0 text-base font-bold text-ink">{seminar.title}</h3>
              <p className="mb-0 text-sm text-ink/60">{seminar.description}</p>
            </div>

            <div className="scrollbar-hide w-0 min-w-full overflow-x-auto overflow-y-hidden">
              <div className="flex w-max gap-4">
                {videoIds.map((videoId, videoIndex) => (
                  <div
                    key={`${seminar.title}-${videoId}-${videoIndex}`}
                    className="h-[188px] w-80 shrink-0 rounded-xl border border-ink/15 bg-ink/5 p-2"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      title={`${seminar.title} ${videoIndex + 1}`}
                      className="h-full w-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {hasMore && (
        <div className="mt-4 flex justify-center">
          <BrandOutlineButton onClick={() => setVisibleCount(SEMINARS.length)}>
            Load More
          </BrandOutlineButton>
        </div>
      )}
    </SectionCard>
  );
}
