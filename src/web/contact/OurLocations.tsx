"use client";

import { useState } from "react";
import { Icon } from "@/web/common/Primitives";

const LOCAL_ICONS = {
  chevron: "m9 18 6-6-6-6",
  pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z|M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  mail: "M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-9Z|m3.5 7.5 8.5 5.5 8.5-5.5",
  waves: "M2 10v4|M6 6.5v11|M10 3.5v17|M14 8v8|M18 5.5v13|M22 10v4",
};

/**
 * `dot` positions the marker over public/pakistan-map.svg — the percentages
 * come from projecting each city's real coordinates onto that map's viewBox.
 * `card` picks the side the detail panel opens on so it stays in frame.
 */
const LOCATIONS = [
  {
    id: "lahore",
    city: "Lahore",
    office: "Bandhan Headquarters",
    address: "45-C Main Boulevard, Gulberg III",
    email: "hello@bandhan.pk",
    phone: "+92 42 111-226-334",
    dot: { top: "41.83%", left: "69.28%" },
    card: "left" as const,
  },
  {
    id: "karachi",
    city: "Karachi",
    office: "Bandhan Karachi Office",
    address: "12th Commercial Street, DHA Phase 4",
    email: "karachi@bandhan.pk",
    phone: "+92 21 111-226-334",
    dot: { top: "92.70%", left: "31.49%" },
    card: "above" as const,
  },
  {
    id: "islamabad",
    city: "Islamabad",
    office: "Bandhan Islamabad Office",
    address: "Kohsar Market, F-6/3",
    email: "islamabad@bandhan.pk",
    phone: "+92 51 111-226-334",
    dot: { top: "25.63%", left: "62.63%" },
    card: "left" as const,
  },
  {
    id: "faisalabad",
    city: "Faisalabad",
    office: "Bandhan Faisalabad Office",
    address: "Kohinoor City, Jaranwala Road",
    email: "faisalabad@bandhan.pk",
    phone: "+92 41 111-226-334",
    dot: { top: "42.81%", left: "62.78%" },
    card: "left" as const,
  },
];

type Location = (typeof LOCATIONS)[number];

const CARD_ANCHOR: Record<Location["card"], string> = {
  left: "-translate-x-[calc(100%+18px)] -translate-y-1/2",
  above: "-translate-x-1/2 -translate-y-[calc(100%+18px)]",
};

/** One labelled detail inside the office card. */
function DetailBlock({
  icon,
  label,
  value,
  className = "",
}: {
  icon: string;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#62748e]">
        <Icon path={icon} className="size-4 shrink-0" />
        {label}
      </span>
      <p className="m-0 text-sm font-medium leading-snug text-[#132743]">{value}</p>
    </div>
  );
}

/** Detail panel for the selected office. */
function OfficeCard({ location }: { location: Location }) {
  return (
    <div className="flex w-full flex-col gap-5 rounded-2xl bg-white p-6 shadow-[0px_8px_24px_0px_rgba(2,6,24,0.1)]">
      <div className="flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center text-[#d73853]">
          <Icon path={LOCAL_ICONS.pin} className="size-5" />
        </span>
        <strong className="text-sm font-semibold leading-tight text-[#132743]">
          {location.office}
        </strong>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DetailBlock
          icon={LOCAL_ICONS.pin}
          label="Street address"
          value={location.address}
          className="sm:col-span-2"
        />
        <DetailBlock icon={LOCAL_ICONS.mail} label="General inquiry" value={location.email} />
        <DetailBlock icon={LOCAL_ICONS.waves} label="Call us" value={location.phone} />
      </div>
    </div>
  );
}

/**
 * Office directory — a city list on the left drives a marker on the dotted
 * Pakistan map, which opens the matching office card.
 */
export function OurLocations() {
  const [activeId, setActiveId] = useState(LOCATIONS[0].id);
  const active = LOCATIONS.find((loc) => loc.id === activeId) ?? LOCATIONS[0];

  return (
    <section className="m-4 rounded-3xl bg-[#eef1f6] py-20 sm:m-6 lg:m-10">
      <div className="mx-auto flex w-full max-w-8xl flex-col items-stretch gap-6 px-4 sm:px-6 lg:flex-row">
        <div className="flex w-full shrink-0 flex-col justify-start lg:w-80">
          <h2 className="mb-6 text-h2 font-semibold leading-snug text-[#132743]">
            Our Presence<span className="block">Across Pakistan</span>
          </h2>

          <ul className="m-0 flex w-full list-none flex-col gap-2 p-0">
            {LOCATIONS.map((loc) => {
              const isActive = loc.id === activeId;
              return (
                <li key={loc.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(loc.id)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-0 px-4 py-3.5 text-base font-semibold transition-all duration-200 hover:bg-white hover:text-[#132743] ${
                      isActive
                        ? "bg-white text-[#132743] shadow-[0px_2px_8px_0px_rgba(2,6,24,0.08)]"
                        : "bg-transparent text-[#62748e]"
                    }`}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center text-[#d73853]">
                      <Icon path={LOCAL_ICONS.pin} className="size-5" />
                    </span>
                    <span className="grow text-left">{loc.city}</span>
                    <Icon
                      path={LOCAL_ICONS.chevron}
                      className={`size-5 shrink-0 transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-40"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grow">
          <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pakistan-map.svg"
              alt=""
              aria-hidden="true"
              className="block h-auto w-full select-none"
            />

            {LOCATIONS.map((loc) => {
              const isActive = loc.id === activeId;
              return (
                <button
                  key={loc.id}
                  type="button"
                  aria-label={`Show ${loc.city} office`}
                  onClick={() => setActiveId(loc.id)}
                  style={{ top: loc.dot.top, left: loc.dot.left }}
                  className="absolute flex size-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
                >
                  {isActive && (
                    <span className="absolute size-5 animate-ping rounded-full bg-[#d73853]/40" />
                  )}
                  <span
                    className={`relative rounded-full transition-all duration-200 ${
                      isActive
                        ? "size-3.5 bg-[#d73853] ring-2 ring-white"
                        : "size-2.5 bg-[#8095b0] hover:bg-[#d73853]"
                    }`}
                  />
                </button>
              );
            })}

            {/* Desktop: the card floats beside the active marker. */}
            <div
              key={activeId}
              style={{ top: active.dot.top, left: active.dot.left }}
              className={`absolute z-20 hidden w-80 lg:block ${CARD_ANCHOR[active.card]}`}
            >
              <OfficeCard location={active} />
            </div>
          </div>

          {/* Mobile and tablet: the card stacks under the map. */}
          <div className="mt-6 lg:hidden">
            <OfficeCard location={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
