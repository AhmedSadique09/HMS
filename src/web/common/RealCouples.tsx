import { ICONS, SOLID_ICONS, SolidIcon, StepTag } from "./Primitives";

type Review = { name: string; role: string; quote: string };

const REVIEWS: Review[] = [
  {
    name: "Fatima Waseem",
    role: "Bride, Lahore",
    quote:
      "I couldn't have planned my wedding without Bandhan. Every little question was answered right up to the big day — I'd choose them a thousand times over.",
  },
  {
    name: "Ayesha & Hamza",
    role: "Couple, Karachi",
    quote:
      "From our Mehndi to the Rukhsati, every moment felt curated for us. Bandhan turned a chaotic season into pure celebration.",
  },
  {
    name: "Zainab Ali",
    role: "Bride, Islamabad",
    quote:
      "Elegant, calm and endlessly creative. Bandhan understood the balance between tradition and our modern taste — the Nikkah setup was a dream.",
  },
  {
    name: "Pearl Orchards",
    role: "Venue Partner",
    quote:
      "Enquiries used to arrive by phone at midnight. Now every booking, date and payment lands in one dashboard — our calendar has never been fuller.",
  },
];

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&q=80",
];

const PARTNERS = [
  "Pearl Orchards",
  "North Marriage Garden",
  "Fordress Event Complex",
  "The Sizzling Catering",
  "Deenar Sari House",
  "Sajjad Shabbir Photography",
];

/**
 * Social proof — a summary column beside a bordered panel of four quotes laid
 * out in a checkerboard, closed off by a strip of partner names.
 */
export function RealCouples() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="mb-10 lg:mb-20 lg:pr-[15%]">
            <StepTag icon={ICONS.heart} className="mb-4 bg-gray-100">
              Successful weddings
            </StepTag>

            <h2 className="text-h2 font-semibold leading-tight text-[#132743]">
              Real Couples Real Celebrations!
            </h2>

            <div className="mt-4 flex w-full items-center">
              {AVATARS.map((src, index) => (
                <figure
                  key={src}
                  className={`w-full max-w-[64px] overflow-hidden rounded-full border border-white ${
                    index === 0 ? "" : "-ml-6"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" decoding="async" className="block h-auto w-full" />
                </figure>
              ))}
            </div>

            <p className="mt-10 mb-8 text-lg leading-snug text-zinc-600">
              Join the 30,000+ families across Pakistan who planned their big day with Bandhan.
            </p>

            <button
              type="button"
              className="rounded-lg bg-[#d73853] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#c02f48]"
            >
              Read all stories
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {REVIEWS.map((review, index) => (
                <div
                  key={review.name}
                  className={`flex min-h-[364px] w-full flex-col items-center justify-center p-4 ${
                    index === 1 || index === 2 ? "bg-[#e2e8f0]" : "bg-white"
                  }`}
                >
                  <div className="mx-auto flex max-w-[276px] flex-col gap-6">
                    <div className="flex flex-col">
                      <h3 className="mb-1 text-lg font-semibold leading-[1.25] text-[#132743]">
                        {review.name}
                      </h3>
                      <span className="text-base font-medium leading-[1.35] text-[#62748e]">
                        {review.role}
                      </span>
                    </div>
                    <p className="relative m-0 pl-8 text-base font-normal leading-[1.35] text-[#132743]">
                      <SolidIcon
                        path={SOLID_ICONS.quote}
                        className="absolute left-0 top-[3px] size-5 text-[#d73853]"
                      />
                      {review.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full border-t border-[#e2e8f0] p-6">
              <span className="mb-6 block w-full text-center text-xs font-medium uppercase leading-[1.35] text-[#132743]">
                Successful partnerships
              </span>
              <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {PARTNERS.map((partner) => (
                  <span
                    key={partner}
                    className="text-sm font-semibold tracking-tight text-[#62748e] transition-colors hover:text-[#132743]"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
