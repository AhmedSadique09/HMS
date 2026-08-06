/* eslint-disable @next/next/no-img-element */

import { Mail, MapPin, PhoneCall } from "lucide-react";
import { BrandButton } from "./buttons";
import { SectionCard } from "./SectionCard";

/* ------------------------------------------------------------------ */
/* Introduction                                                        */
/* ------------------------------------------------------------------ */

export function AboutVenue() {
  return (
    <SectionCard id="about-venue" title="About Venue" bodyClassName="flex flex-col gap-4 p-4">
      <p className="mb-0 text-base leading-7 text-ink/70">
        A purpose-built wedding venue that has hosted celebrations of every size — from
        intimate nikkah ceremonies to thousand-guest baraats. The team handles the parts most
        families dread: seating plans, catering timelines, parking, and the hundred small
        decisions that surface in the final week.
      </p>

      <p className="mb-0 text-base leading-7 text-ink/70">
        Every booking is assigned a dedicated event manager who stays with the family from the
        first walkthrough to the last guest leaving. Decor, lighting, sound, and menu tastings
        are coordinated in-house, so there is one point of contact rather than six vendors
        chasing each other.
      </p>

      <p className="mb-0 text-base leading-7 text-ink/70">
        The venue has built its reputation on turning up prepared: halls dressed on time, food
        served hot, and a schedule that actually holds. Families come back for their
        siblings&apos; weddings, and most new bookings still arrive by word of mouth.
      </p>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* About Founder                                                       */
/* ------------------------------------------------------------------ */

export function AboutFounder() {
  return (
    <SectionCard title="About Founder" bodyClassName="flex flex-col gap-4 p-4">
      <p className="mb-0 text-base leading-7 text-ink/70">
        Sara Ahmed founded the venue after a decade of running weddings for other people and
        watching the same avoidable failures repeat: overbooked halls, vendors who vanish on
        the day, and families paying twice for work nobody coordinated.
      </p>

      <p className="mb-0 text-base leading-7 text-ink/70">
        Her rule is simple — one team, one schedule, one price agreed up front. That approach
        shaped how the venue hires, how it quotes, and why it still turns down bookings it
        cannot staff properly.
      </p>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* Specialization                                                      */
/* ------------------------------------------------------------------ */

const SPECIALIZATIONS = [
  "Barat & Walima",
  "Mehndi Nights",
  "Nikkah Ceremonies",
  "Corporate Events",
  "Engagement Parties",
  "Outdoor Receptions",
] as const;

export function Specialization() {
  return (
    <SectionCard id="specialization" title="Specialization">
      <ul className="flex flex-wrap gap-2">
        {SPECIALIZATIONS.map((specialization) => (
          <li key={specialization}>
            <span className="inline-flex min-h-[28px] cursor-pointer items-center rounded-md bg-ink/5 px-4 text-sm text-ink/70 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              {specialization}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Certificates, awards & documents                                    */
/* ------------------------------------------------------------------ */

const CERTIFICATES = [
  {
    title: "Registered Event Venue Licence",
    description:
      "Municipal licence covering guest capacity, fire safety clearance, and food-handling standards. Renewed annually and audited on site.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80",
    isoDate: "2017-01-26",
    displayDate: "January 26, 2017",
  },
  {
    title: "Hospitality Excellence Award",
    description:
      "Awarded for consistent service delivery and guest satisfaction across a full wedding season, judged on independent guest feedback.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    isoDate: "2021-11-14",
    displayDate: "November 14, 2021",
  },
  {
    title: "Food Safety & Hygiene Certification",
    description:
      "Kitchen and catering operations certified against national food-safety standards, covering storage, preparation, and service temperature control.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
    isoDate: "2023-03-09",
    displayDate: "March 9, 2023",
  },
] as const;

export function VenueCertificatesAwardsDocuments() {
  return (
    <SectionCard
      id="venue-certificates-awards-documents"
      title="Venue Certificates Awards Documents"
    >
      <div className="flex flex-col gap-4">
        {CERTIFICATES.map((certificate, index) => (
          <div
            key={certificate.title}
            className={`flex items-center gap-4 ${
              index < CERTIFICATES.length - 1 ? "border-b border-ink/15 pb-4" : ""
            }`}
          >
            <figure className="mb-0 h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-ink/15 bg-ink/5">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="h-full w-full object-cover"
              />
            </figure>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <h3 className="mb-0 text-base font-semibold text-ink">{certificate.title}</h3>
                <time className="shrink-0 text-sm text-ink/70" dateTime={certificate.isoDate}>
                  {certificate.displayDate}
                </time>
              </div>
              <p className="mb-0 text-sm text-ink/60">{certificate.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar: founder information                                        */
/* ------------------------------------------------------------------ */

const FOUNDER_INFORMATION = {
  name: "Sara Ahmed",
  designation: "Founder & Managing Director",
  background: "Hospitality & Event Management",
  experience: "14 years",
  weddingsHosted: "1,200+",
  profilePicture:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
} as const;

export function FounderInformation() {
  return (
    <SectionCard
      id="founder-information"
      title="Founder Information"
      bodyClassName="grid grid-cols-2 gap-4 p-4"
    >
      <div className="col-span-2 flex items-center gap-4">
        <figure className="mb-0 size-20 shrink-0 overflow-hidden rounded-2xl bg-ink/5">
          <img
            src={FOUNDER_INFORMATION.profilePicture}
            alt={FOUNDER_INFORMATION.name}
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="flex flex-col">
          <span className="font-bold text-ink">{FOUNDER_INFORMATION.name}</span>
          <strong className="text-sm font-semibold text-brand">
            {FOUNDER_INFORMATION.designation}
          </strong>
        </div>
      </div>

      <div className="col-span-2 flex flex-col">
        <span className="text-sm text-ink/60">Background</span>
        <strong className="text-base font-semibold text-ink">
          {FOUNDER_INFORMATION.background}
        </strong>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-ink/60">Experience</span>
        <strong className="text-base font-semibold text-ink">
          {FOUNDER_INFORMATION.experience}
        </strong>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-ink/60">Weddings Hosted</span>
        <strong className="text-base font-semibold text-ink">
          {FOUNDER_INFORMATION.weddingsHosted}
        </strong>
      </div>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar: languages & social                                         */
/* ------------------------------------------------------------------ */

const LANGUAGES = ["English", "Urdu", "Punjabi", "Pashto", "Sindhi"] as const;

/* Brand glyphs — lucide dropped its brand icon set, so these stay inline. */
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    path: "M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.4.5.7.2 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.3.6.5 1.3.5 2.4.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.8-.5 2.4-.2.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.6.3-1.3.5-2.4.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.4-.5-.7-.2-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.3-.6-.5-1.3-.5-2.4C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.5-2.4.2-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.6-.3 1.3-.5 2.4-.5C8.9 2 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.5-3.3a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.6h.1a4.2 4.2 0 0 1 3.8-2.1c4 0 4.8 2.6 4.8 6.1V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    path: "M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5a2.5 2.5 0 0 0-1.8 1.8C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 1.5.5 8.8.5 8.8.5s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12ZM9.8 15.3V8.7l6 3.3-6 3.3Z",
  },
] as const;

export function LanguagesSocial() {
  return (
    <SectionCard id="languages-social" title="Languages Social">
      <div className="mb-4 flex flex-col">
        <span className="mb-1 text-base text-ink">Languages</span>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((language) => (
            <span
              key={language}
              className="rounded-md bg-brand/10 px-2.5 py-1 text-sm font-medium text-brand"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="mb-1 text-base text-ink">Social Links</span>
        <ul className="flex gap-3">
          {SOCIAL_LINKS.map(({ label, href, path }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                  <path d={path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}
