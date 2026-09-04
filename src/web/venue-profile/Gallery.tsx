"use client";

/* eslint-disable @next/next/no-img-element */

import { FancyboxGallery } from "@/components/elements/FancyboxGallery";
import { SectionCard } from "@/components/elements/SectionCard";

interface GalleryImage {
  src: string;
  caption: string;
}

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
