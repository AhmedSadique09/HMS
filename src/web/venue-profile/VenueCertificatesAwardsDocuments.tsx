/* eslint-disable @next/next/no-img-element */

import { SectionCard } from "@/components/elements/SectionCard";

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
