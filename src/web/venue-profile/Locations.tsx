import { Mail, MapPin, PhoneCall } from "lucide-react";
import { BrandButton } from "@/components/elements/BrandButton";
import { SectionCard } from "@/components/elements/SectionCard";

const OFFICE_LOCATIONS = [
  {
    title: "Main Hall",
    city: "Lahore",
    address: "12-A Main Boulevard, Gulberg III, Lahore",
    postalCode: "54660",
    phone: "+92 300 4567 890",
    email: "bookings@venue.pk",
  },
  {
    title: "Banquet Annexe",
    city: "Islamabad",
    address: "Plot 22, Service Road, F-11 Markaz, Islamabad",
    postalCode: "44000",
    phone: "+92 321 7788 990",
    email: "islamabad@venue.pk",
  },
  {
    title: "Garden Lawn",
    city: "Rawalpindi",
    address: "Sector C, Bahria Town Phase 4, Rawalpindi",
    postalCode: "46000",
    phone: "+92 345 9988 776",
    email: "lawn@venue.pk",
  },
] as const;

export function Locations() {
  return (
    <SectionCard id="locations" title="Locations">
      <ul className="flex flex-col gap-4 text-sm text-ink">
        {OFFICE_LOCATIONS.map((location, index) => (
          <li
            key={location.title}
            className={`flex flex-col gap-4 ${
              index < OFFICE_LOCATIONS.length - 1 ? "mb-4 border-b border-ink/15 pb-4" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <MapPin className="size-5" strokeWidth={1.5} />
              </span>

              <div className="flex flex-col gap-2">
                <strong className="text-base font-semibold leading-none text-ink">
                  {location.title}
                </strong>
                <span className="text-sm font-normal leading-none text-ink/50">
                  {location.city}
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col flex-wrap gap-2 pl-16 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin
                    width={20}
                    height={20}
                    strokeWidth={1.2}
                    className="shrink-0 text-ink/50"
                  />
                  <address className="not-italic">
                    {location.address}
                    <span> - </span>
                    <span>{location.postalCode}</span>
                  </address>
                </span>

                <span className="flex items-center gap-2">
                  <Mail width={18} height={18} strokeWidth={1.2} className="shrink-0 text-ink/50" />
                  <a
                    href={`mailto:${location.email}`}
                    className="transition-colors hover:text-brand hover:underline"
                  >
                    {location.email}
                  </a>
                </span>

                <span className="flex items-center gap-2">
                  <PhoneCall
                    width={18}
                    height={18}
                    strokeWidth={1.2}
                    className="shrink-0 text-ink/50"
                  />
                  <span>{location.phone}</span>
                </span>
              </div>

              <BrandButton>Get Directions</BrandButton>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
