"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

/**
 * One slide in a {@link Carousel}.
 *
 * @property src     - Image URL. Omit to show a gradient placeholder.
 * @property alt     - Image alt text.
 * @property caption - Optional overlay caption (title + text), shown on md+.
 * @property content - Custom slide content; overrides the image/placeholder.
 */
export interface CarouselSlide {
  src?: string;
  alt?: string;
  caption?: { title: string; text?: string };
  content?: ReactNode;
}

/**
 * Props for the {@link Carousel} component.
 *
 * @property slides     - The slides to show.
 * @property indicators - Show the dot indicators. Default `true`.
 * @property controls   - Show the prev/next arrows. Default `true`.
 * @property fade       - Crossfade between slides instead of sliding.
 * @property autoplay   - Auto-advance the slides (pauses on hover).
 * @property interval   - Autoplay delay in ms. Default `4000`.
 * @property touch      - Allow touch/swipe to change slides. Default `true`.
 * @property className  - Extra classes merged onto the carousel.
 */
export interface CarouselProps {
  slides: CarouselSlide[];
  indicators?: boolean;
  controls?: boolean;
  fade?: boolean;
  autoplay?: boolean;
  interval?: number;
  touch?: boolean;
  className?: string;
}

const GRADIENTS = [
  "from-blue-500 to-purple-600",
  "from-rose-500 to-orange-500",
  "from-emerald-500 to-teal-600",
  "from-sky-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
];

function SlideMedia({ slide, index }: { slide: CarouselSlide; index: number }) {
  if (slide.content) return <>{slide.content}</>;
  if (slide.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={slide.src}
        alt={slide.alt ?? ""}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-linear-to-br text-2xl font-semibold text-white/90 ${
        GRADIENTS[index % GRADIENTS.length]
      }`}
    >
      Slide {index + 1}
    </div>
  );
}

function Caption({ caption }: { caption: NonNullable<CarouselSlide["caption"]> }) {
  return (
    <div className="absolute inset-x-0 bottom-0 hidden bg-linear-to-t from-black/70 to-transparent p-4 pt-12 text-center text-white md:block">
      <h5 className="text-lg font-semibold">{caption.title}</h5>
      {caption.text && (
        <p className="mt-1 text-sm text-white/80">{caption.text}</p>
      )}
    </div>
  );
}

/**
 * Carousel
 * --------
 * A slideshow — the Tailwind equivalent of Bootstrap's `.carousel`. Supports
 * indicators, prev/next controls, captions, crossfade, autoplay and optional
 * touch swiping.
 *
 * @example
 * ```tsx
 * import Carousel from "@/components/elements/Carousel";
 *
 * <Carousel
 *   autoplay
 *   slides={[
 *     { src: "/1.jpg", alt: "One", caption: { title: "First" } },
 *     { src: "/2.jpg", alt: "Two" },
 *   ]}
 * />
 * ```
 */
export default function Carousel({
  slides,
  indicators = true,
  controls = true,
  fade = false,
  autoplay = false,
  interval = 4000,
  touch = true,
  className = "",
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const count = slides.length;

  const go = (i: number) => setIndex((i + count) % count);

  useEffect(() => {
    if (!autoplay || paused || count <= 1) return;
    const id = setInterval(() => setIndex((c) => (c + 1) % count), interval);
    return () => clearInterval(id);
  }, [autoplay, paused, interval, count]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!touch) return;
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch || startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) go(index - 1);
    else if (dx < -40) go(index + 1);
    startX.current = null;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-zinc-900 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative aspect-video">
        {fade
          ? slides.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  i === index ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <SlideMedia slide={s} index={i} />
                {s.caption && <Caption caption={s.caption} />}
              </div>
            ))
          : (
              <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {slides.map((s, i) => (
                  <div key={i} className="relative h-full w-full shrink-0">
                    <SlideMedia slide={s} index={i} />
                    {s.caption && <Caption caption={s.caption} />}
                  </div>
                ))}
              </div>
            )}
      </div>

      {controls && count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 0 1 0 1.06L9.06 10l3.73 3.71a.75.75 0 1 1-1.06 1.06l-4.25-4.24a.75.75 0 0 1 0-1.06l4.25-4.24a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 0 1 0-1.06L10.94 10 7.21 6.29a.75.75 0 1 1 1.06-1.06l4.25 4.24a.75.75 0 0 1 0 1.06l-4.25 4.24a.75.75 0 0 1-1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </>
      )}

      {indicators && count > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === index || undefined}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const SAMPLE: CarouselSlide[] = [{}, {}, {}];

const CAPTIONED: CarouselSlide[] = [
  {
    caption: {
      title: "First slide label",
      text: "Some representative placeholder content for the first slide.",
    },
  },
  {
    caption: {
      title: "Second slide label",
      text: "Some representative placeholder content for the second slide.",
    },
  },
  {
    caption: {
      title: "Third slide label",
      text: "Some representative placeholder content for the third slide.",
    },
  },
];

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Carousel") and renders each variant's demo + code.
 */
export const carouselElement = {
  name: "Carousel",
  variants: [
    {
      name: "Indicators",
      description:
        "Slides with prev/next controls and dot indicators (Bootstrap's indicators carousel).",
      demo: (
        <div className="mx-auto max-w-xl">
          <Carousel slides={SAMPLE} />
        </div>
      ),
      code: `import Carousel from "@/components/elements/Carousel";

<Carousel
  slides={[
    { src: "/1.jpg", alt: "One" },
    { src: "/2.jpg", alt: "Two" },
    { src: "/3.jpg", alt: "Three" },
  ]}
/>`,
    },
    {
      name: "Captions",
      description: "Each slide has an overlay caption (shown on md+ screens).",
      demo: (
        <div className="mx-auto max-w-xl">
          <Carousel slides={CAPTIONED} />
        </div>
      ),
      code: `import Carousel from "@/components/elements/Carousel";

<Carousel
  slides={[
    { src: "/1.jpg", caption: { title: "First slide label", text: "Some content." } },
    { src: "/2.jpg", caption: { title: "Second slide label", text: "Some content." } },
  ]}
/>`,
    },
    {
      name: "Crossfade",
      description: "Fades between slides instead of sliding — pass `fade`.",
      demo: (
        <div className="mx-auto max-w-xl">
          <Carousel fade slides={SAMPLE} />
        </div>
      ),
      code: `import Carousel from "@/components/elements/Carousel";

<Carousel fade slides={slides} />`,
    },
    {
      name: "Autoplay",
      description:
        "Auto-advances every few seconds and pauses on hover — pass `autoplay`.",
      demo: (
        <div className="mx-auto max-w-xl">
          <Carousel autoplay interval={3000} slides={SAMPLE} />
        </div>
      ),
      code: `import Carousel from "@/components/elements/Carousel";

<Carousel autoplay interval={3000} slides={slides} />`,
    },
    {
      name: "Autoplay without controls",
      description:
        "Autoplays with only indicators — no prev/next arrows. Pass `controls={false}`.",
      demo: (
        <div className="mx-auto max-w-xl">
          <Carousel autoplay controls={false} slides={SAMPLE} />
        </div>
      ),
      code: `import Carousel from "@/components/elements/Carousel";

<Carousel autoplay controls={false} slides={slides} />`,
    },
    {
      name: "Disable touch swiping",
      description:
        "Same carousel, but swipe gestures are turned off — pass `touch={false}`.",
      demo: (
        <div className="mx-auto max-w-xl">
          <Carousel touch={false} slides={SAMPLE} />
        </div>
      ),
      code: `import Carousel from "@/components/elements/Carousel";

<Carousel touch={false} slides={slides} />`,
    },
  ],
};
