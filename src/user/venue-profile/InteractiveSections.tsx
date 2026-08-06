"use client";

/* eslint-disable @next/next/no-img-element */

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { BrandOutlineButton } from "./buttons";
import { FancyboxGallery } from "./FancyboxGallery";
import { SectionCard } from "./SectionCard";
import { StarRating } from "./StarRating";

interface GalleryImage {
  src: string;
  caption: string;
}

/* ------------------------------------------------------------------ */
/* Services — accordion                                                */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    id: "hall-booking",
    name: "Hall & Lawn Booking",
    price: "Rs 280,000",
    description:
      "Exclusive use of the hall or lawn for your event slot, including staging, seating, air conditioning, backup power, and dedicated parking with valet support.",
  },
  {
    id: "catering",
    name: "In-House Catering",
    price: "Rs 1,800 / head",
    description:
      "Desi and continental menus prepared in our own kitchen, with a tasting session before you confirm. Live counters, dessert bars, and dietary substitutions available on request.",
  },
  {
    id: "decor",
    name: "Decor & Staging",
    price: "Rs 150,000",
    description:
      "Floral installations, stage design, table settings, and entrance decor built to your theme. Our design team shares a mock-up before anything is ordered.",
  },
  {
    id: "lighting-sound",
    name: "Lighting & Sound",
    price: "Rs 90,000",
    description:
      "Professional sound system, wireless mics, ambient and architectural lighting, plus a technician on site for the full duration of the event.",
  },
  {
    id: "photography",
    name: "Photography & Cinematography",
    price: "Rs 200,000",
    description:
      "Two photographers and a cinematographer covering the full function, with a same-day highlights reel and edited album delivered within three weeks.",
  },
  {
    id: "event-management",
    name: "Complete Event Management",
    price: "Rs 350,000",
    description:
      "End-to-end coordination: vendor scheduling, guest flow, run-of-show, and a dedicated manager who runs the day so the family does not have to.",
  },
] as const;

export function Services() {
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);

  return (
    <SectionCard id="services" title="Services" bodyClassName="px-4">
      <div className="w-full">
        {SERVICES.map((service, index) => {
          const isOpen = openId === service.id;

          return (
            <div
              key={service.id}
              className={index < SERVICES.length - 1 ? "border-b border-ink/15" : ""}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : service.id)}
                aria-expanded={isOpen}
                aria-controls={`service-panel-${service.id}`}
                className="flex w-full items-center gap-4 py-4 text-left"
              >
                <span className="grow text-base font-bold leading-tight text-ink">
                  {service.name}
                </span>
                <strong className="shrink-0 text-sm text-brand">From {service.price}</strong>
                <ChevronDown
                  className={`size-5 shrink-0 text-ink/50 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={`service-panel-${service.id}`}
                hidden={!isOpen}
                className="pb-4 text-sm text-ink/60"
              >
                <p className="mb-0">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* Consultants — horizontal card rail                                  */
/* ------------------------------------------------------------------ */

const TEAM = [
  {
    name: "Hamza Iqbal",
    role: "Lead Event Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Ayesha Malik",
    role: "Decor & Styling Head",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Bilal Raza",
    role: "Catering Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Nimra Shah",
    role: "Guest Relations",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Usman Tariq",
    role: "Production & Sound",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Zara Khan",
    role: "Bookings Coordinator",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
] as const;

const RAIL_SCROLL_STEP = 320;

export function Consultants() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: "left" | "right") => {
    railRef.current?.scrollBy({
      left: direction === "left" ? -RAIL_SCROLL_STEP : RAIL_SCROLL_STEP,
      behavior: "smooth",
    });
  };

  return (
    <div id="consultants" className="rounded-2xl border border-ink/15 bg-white">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <h2 className="mb-0 text-lg font-bold text-ink">Consultants</h2>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous consultants"
            onClick={() => scrollRail("left")}
            className="flex size-9 items-center justify-center rounded-full border border-brand/40 text-brand transition-colors hover:bg-brand hover:text-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next consultants"
            onClick={() => scrollRail("right")}
            className="flex size-9 items-center justify-center rounded-full border border-brand/40 text-brand transition-colors hover:bg-brand hover:text-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="border-t border-ink/15 p-4">
        <div
          ref={railRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
        >
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="group w-64 shrink-0 snap-start overflow-hidden rounded-xl border border-ink/15"
            >
              <figure className="mb-0 h-40 w-full overflow-hidden bg-ink/5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>

              <div className="flex flex-col gap-0.5 p-3">
                <h3 className="mb-0 text-base font-semibold text-ink">{member.name}</h3>
                <span className="text-sm text-ink/60">{member.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

const GALLERY_FANCYBOX_GROUP = "gallery";

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    caption: "Main hall dressed for a walima",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    caption: "Evening reception setup",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    caption: "Stage and floral backdrop",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    caption: "Open-air lawn seating",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    caption: "Mehndi night lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    caption: "Live catering counters",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    caption: "Bridal entrance walkway",
  },
  {
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    caption: "Valet and guest arrival",
  },
];

export function Gallery() {
  return (
    <SectionCard id="gallery" title="Gallery">
      <FancyboxGallery className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {GALLERY_IMAGES.map((image) => (
          <a
            key={image.src}
            href={image.src}
            data-fancybox={GALLERY_FANCYBOX_GROUP}
            data-caption={image.caption}
            className="block w-full cursor-pointer overflow-hidden rounded-xl border border-ink/15 bg-ink/5 p-2 transition-opacity hover:opacity-90"
          >
            <span className="block aspect-4/3 overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.caption}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </span>
          </a>
        ))}
      </FancyboxGallery>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* Seminars & expert insights — YouTube rails                          */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Success stories                                                     */
/* ------------------------------------------------------------------ */

const SUCCESS_STORIES = [
  {
    title: "A 900-Guest Barat Pulled Off in Three Weeks",
    description:
      "The family booked late after another venue cancelled on them. We rebuilt the run-of-show from scratch, brought in a second catering line, and got everyone seated and served inside forty minutes.",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "An Outdoor Mehndi That Survived the Rain",
    description:
      "Monsoon arrived two days early. The contingency marquee went up overnight, the lighting rig was re-hung indoors, and the couple never saw the scramble.",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Two Functions, One Weekend, One Team",
    description:
      "Mehndi on Friday, walima on Sunday, same family and the same crew. Full teardown and re-dress in under thirty hours, with a completely different theme each night.",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    ],
  },
] as const;

const STORIES_FANCYBOX_GROUP = "success-stories";

const INITIAL_STORIES = 2;

export function SuccessStories() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_STORIES);

  const visibleStories = SUCCESS_STORIES.slice(0, visibleCount);
  const hasMore = visibleCount < SUCCESS_STORIES.length;

  return (
    <SectionCard id="success-stories" title="Success Stories">
      <FancyboxGallery className="flex w-full min-w-0 flex-col gap-4">
        {visibleStories.map((story, storyIndex) => (
          <div
            key={story.title}
            className={`flex w-full min-w-0 flex-col gap-4 ${
              storyIndex < visibleStories.length - 1 ? "border-b border-ink/15 pb-4" : ""
            }`}
          >
            <div className="flex flex-col gap-2">
              <h3 className="mb-0 text-base font-bold text-ink">{story.title}</h3>
              <p className="mb-0 text-sm text-ink/60">{story.description}</p>
            </div>

            <div className="scrollbar-hide w-0 min-w-full overflow-x-auto overflow-y-hidden">
              <div className="flex w-max gap-4">
                {story.images.map((imageUrl, imageIndex) => {
                  const caption = `${story.title} (${imageIndex + 1})`;

                  return (
                    <a
                      key={caption}
                      href={imageUrl}
                      data-fancybox={STORIES_FANCYBOX_GROUP}
                      data-caption={caption}
                      className="block w-80 shrink-0 overflow-hidden rounded-xl border border-ink/15 bg-ink/5 p-2"
                    >
                      <span className="block aspect-video overflow-hidden rounded-lg">
                        <img
                          src={imageUrl}
                          alt={caption}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </FancyboxGallery>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <BrandOutlineButton onClick={() => setVisibleCount(SUCCESS_STORIES.length)}>
            Load More
          </BrandOutlineButton>
        </div>
      )}
    </SectionCard>
  );
}
