"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { BrandOutlineButton } from "@/components/elements/BrandButton";
import { FancyboxGallery } from "@/components/elements/FancyboxGallery";
import { SectionCard } from "@/components/elements/SectionCard";

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
