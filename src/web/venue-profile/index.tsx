import type { Venue } from "@/data/venues";
import { AboutFounder } from "./AboutFounder";
import { AboutVenue } from "./AboutVenue";
import { FounderInformation } from "./FounderInformation";
import { Gallery } from "./Gallery";
import { LanguagesSocial } from "./LanguagesSocial";
import { Locations } from "./Locations";
import { Reviews } from "./Reviews";
import { SeminarsExpertInsights } from "./SeminarsExpertInsights";
import { Services } from "./Services";
import { Specialization } from "./Specialization";
import { SuccessStories } from "./SuccessStories";
import { VenueCertificatesAwardsDocuments } from "./VenueCertificatesAwardsDocuments";
import { VenueInformation } from "./VenueInformation";
import { VenueProfileNav } from "./VenueProfileNav";

/**
 * Every section of the venue profile, in order — the main column followed by
 * the sticky sidebar. Each section is its own file in this folder, so the route
 * only has to call this one component.
 */
export function VenueProfileSections({ venue }: { venue: Venue }) {
  return (
    <main className="mx-auto w-full max-w-8xl px-4 py-8 sm:px-6">
      <VenueInformation venue={venue} />

      <VenueProfileNav />

      <div className="mt-6 flex gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <AboutVenue />
          <AboutFounder />
          <Specialization />
          <Locations />
          <Services />
          <VenueCertificatesAwardsDocuments />
          <Gallery />
          <SeminarsExpertInsights />
          <Reviews />
          <SuccessStories />
        </div>

        <aside className="sticky top-[140px] hidden w-[380px] shrink-0 flex-col gap-4 self-start lg:flex">
          <FounderInformation />
          <LanguagesSocial />
        </aside>
      </div>
    </main>
  );
}

export { AboutFounder } from "./AboutFounder";
export { AboutVenue } from "./AboutVenue";
export { FounderInformation } from "./FounderInformation";
export { Gallery } from "./Gallery";
export { LanguagesSocial } from "./LanguagesSocial";
export { Locations } from "./Locations";
export { Reviews } from "./Reviews";
export { SeminarsExpertInsights } from "./SeminarsExpertInsights";
export { Services } from "./Services";
export { Specialization } from "./Specialization";
export { SuccessStories } from "./SuccessStories";
export { VenueCertificatesAwardsDocuments } from "./VenueCertificatesAwardsDocuments";
export { VenueInformation } from "./VenueInformation";
export { VenueProfileNav } from "./VenueProfileNav";
