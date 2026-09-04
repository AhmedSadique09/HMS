import { Fragment } from "react";
import { Icon, ICONS, StepTag } from "@/web/common/Primitives";

/** Square tile. The title breaks after its first word to keep the grid even. */
function OfferCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex size-48 flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-2">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-white bg-[#fff2f4] text-[#d73853] shadow-sm">
        <Icon path={icon} className="size-6" />
      </span>

      <h3 className="mt-4 text-base font-semibold leading-tight text-[#132743]">
        {title.split(" ").map((word, i) => (
          <Fragment key={word}>
            {word}
            {i === 0 ? <br /> : " "}
          </Fragment>
        ))}
      </h3>
    </div>
  );
}

/* Tiles are dealt into a 1 / 2 / 3 staircase, bottom-aligned. */
const OFFER_COLUMNS = [
  [{ icon: ICONS.building, title: "Venue Booking" }],
  [
    { icon: ICONS.badge, title: "Verified Vendors" },
    { icon: ICONS.star, title: "Real Reviews" },
  ],
  [
    { icon: ICONS.receipt, title: "Instant Quotes" },
    { icon: ICONS.lock, title: "Secure Payments" },
    { icon: ICONS.trending, title: "Budget Tracker" },
  ],
];

/**
 * Capability section — a copy block on the left, and on the right a staircase
 * of square tiles that steps up towards the edge of the page.
 */
export function WhatWeOffer() {
  return (
    <section className="w-full overflow-hidden bg-gray-100 py-20">
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-16 lg:flex-row lg:gap-8">
          <div className="w-full max-w-[560px] lg:w-1/2">
            <StepTag icon={ICONS.checklist} className="mb-4 bg-white">
              What we offer
            </StepTag>

            <h2 className="mb-6 text-h2 font-semibold leading-snug text-[#132743]">
              Everything You Need to Plan <br className="hidden lg:block" /> the Whole Wedding
            </h2>

            <p className="max-w-[540px] text-lg leading-relaxed text-zinc-600">
              From the first venue visit to the last dance — vendors, quotes, payments and
              checklists in one intelligent platform built for Pakistani weddings.
            </p>
          </div>

          <div className="flex w-full items-end justify-center gap-4 sm:gap-6 lg:w-1/2 lg:justify-end">
            {OFFER_COLUMNS.map((column) => (
              <div key={column[0].title} className="flex flex-col gap-6">
                {column.map((card) => (
                  <OfferCard key={card.title} icon={card.icon} title={card.title} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
