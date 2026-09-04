import { Icon, ICONS, StepTag } from "@/web/common/Primitives";

const PILLARS = [
  {
    title: "Goal",
    icon: ICONS.target,
    description:
      "To make wedding planning in Pakistan simple, transparent and stress-free for every family — whatever the city, whatever the budget.",
  },
  {
    title: "Mission",
    icon: ICONS.flag,
    description:
      "To connect couples with verified vendors through honest pricing, real reviews and bookings that stay protected from first quote to final payment.",
  },
  {
    title: "Vision",
    icon: ICONS.eye,
    description:
      "To become the country's most trusted wedding platform — where every celebration begins and every good vendor gets found.",
  },
];

/**
 * Opening statement — a light card holding the positioning headline, a
 * supporting paragraph, and the three brand pillars.
 */
export function AboutIntro() {
  return (
    <section className="m-4 rounded-3xl bg-[#f1f5f9] py-20 sm:m-6 lg:m-10">
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6">
        <div className="mb-10 grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <StepTag icon={ICONS.heart}>About us</StepTag>
          </div>

          <h2 className="text-h2 font-semibold leading-[1.25] text-[#132743]">
            Reimagining How Pakistan Plans Its Weddings
          </h2>

          <p className="text-base leading-relaxed text-zinc-600">
            Bandhan brings venues, photographers, decorators, caterers and every other wedding
            vendor onto one trusted platform — so couples can discover, compare and book each part
            of their big day in a single place, without the endless phone calls.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col items-start gap-4 rounded-3xl bg-white p-10 shadow-lg"
            >
              <span className="flex size-16 items-center justify-center rounded-2xl bg-[#fff2f4] text-[#d73853]">
                <Icon path={pillar.icon} className="size-8" />
              </span>
              <h3 className="text-lg font-semibold leading-tight text-[#132743]">{pillar.title}</h3>
              <p className="text-base font-normal leading-snug text-zinc-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
