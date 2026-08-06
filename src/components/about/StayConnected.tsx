import type { ReactNode } from "react";
import { Icon, ICONS, SOLID_ICONS, SolidIcon } from "./AboutPrimitives";

const STORE_LINKS = [
  { id: "app-store", href: "#", label: "App Store", icon: SOLID_ICONS.apple },
  { id: "play-store", href: "#", label: "Play Store", icon: SOLID_ICONS.play },
];

/** Bordered row inside the dark panel — label, caption, and an action slot. */
function ActionRow({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 rounded-2xl border border-[#62748e] p-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="flex w-full flex-col gap-1">
        <h3 className="text-lg font-medium leading-[1.25] text-white">{title}</h3>
        <span className="block text-base font-normal leading-[1.35] text-[#cad5e2]">{caption}</span>
      </div>
      {children}
    </div>
  );
}

/**
 * Closing call to action — dark gradient panel pairing the pitch with a
 * sign-up button and the mobile app download links.
 */
export function StayConnected() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center justify-center gap-16 rounded-3xl bg-[linear-gradient(180deg,#2a4a72_0%,#132743_100%)] p-8 sm:p-12 md:grid-cols-2 lg:p-16">
          <div>
            <h2 className="mb-8 text-h2 font-semibold leading-tight text-white lg:pr-[15%]">
              Ready to Plan Your Big Day?
            </h2>
            <p className="text-lg leading-snug text-white">
              From venues to vendors, Bandhan brings every part of your wedding onto one trusted
              platform — verified vendors, upfront pricing, and bookings confirmed in minutes.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <ActionRow title="Get Started" caption="Create your wedding board">
              <button
                type="button"
                className="flex shrink-0 items-center justify-center gap-3 rounded-lg bg-[#d73853] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#c02f48]"
              >
                <span>Get Started</span>
                <Icon path={ICONS.arrow} className="size-5" />
              </button>
            </ActionRow>

            <ActionRow title="Get the App" caption="Download it now!">
              <ul className="flex shrink-0 items-center gap-2" aria-label="Download the Bandhan app">
                {STORE_LINKS.map((store) => (
                  <li key={store.id}>
                    <a
                      href={store.href}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white transition-colors hover:bg-white/15"
                    >
                      <SolidIcon path={store.icon} className="size-5" />
                      <span className="whitespace-nowrap text-sm font-semibold">{store.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </ActionRow>
          </div>
        </div>
      </div>
    </section>
  );
}
