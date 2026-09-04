import { Icon, ICONS, StepTag } from "@/web/common/Primitives";

const STEPS = [
  {
    tagLine: "Discover Vendors",
    icon: ICONS.search,
    description:
      "Browse verified venues, photographers, decorators and caterers across every major city in Pakistan. Filter by city, date, guest count and budget.",
  },
  {
    tagLine: "Compare & Shortlist",
    icon: ICONS.sliders,
    description:
      "See real packages, real photos and real reviews side by side. Save your favourites and share the shortlist with the whole family before deciding.",
  },
  {
    tagLine: "Book with Confidence",
    icon: ICONS.shield,
    description:
      "Lock your date with a secure payment and a written confirmation. Pricing is agreed upfront, so there are no hidden charges later.",
  },
  {
    tagLine: "Celebrate Stress-Free",
    icon: ICONS.confetti,
    description:
      "Track every booking, payment and timeline from one dashboard — from the Dholki right through to the Rukhsati.",
  },
];

/**
 * Process section — alternating cards joined by a vertical ribbon so the four
 * steps read as one continuous path down the page.
 */
export function HowWeWork() {
  return (
    <section className="py-28">
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6">
        <div className="mx-auto mb-28 max-w-[650px] text-center">
          <StepTag icon={ICONS.sparkle} className="mb-4 bg-[#f1f5f9]">
            How we work
          </StepTag>
          <h2 className="text-h2 font-semibold leading-snug text-[#132743]">
            We bring vendors and couples together — verified, priced upfront, and booked in minutes.
          </h2>
        </div>

        <div className="flex w-full flex-col gap-20">
          {STEPS.map((step, index) => {
            const isLast = index === STEPS.length - 1;
            // Even index sits left, odd sits right; the connector flips with it.
            const alignment =
              index % 2 === 0 ? "mr-auto" : "ml-auto before:right-auto before:left-[54px]";
            const connector = isLast ? "before:hidden" : "";

            return (
              <div
                key={step.tagLine}
                className={`relative w-full max-w-3xl rounded-3xl bg-[#f1f5f9] p-6 before:absolute before:top-full before:right-[90px] before:h-full before:w-[16px] before:bg-[#f1f5f9] before:content-[''] ${alignment} ${connector}`}
              >
                <span className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2">
                  <Icon path={step.icon} className="size-6 shrink-0 text-[#d73853]" />
                  <span className="text-lg font-semibold leading-none text-[#132743]">
                    {step.tagLine}
                  </span>
                </span>
                <p className="mt-14 text-lg leading-snug text-[#132743]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
