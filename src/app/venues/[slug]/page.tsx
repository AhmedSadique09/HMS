import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { VenueInformation } from "@/user/venue-profile/VenueInformation";
import { VenueProfileNav } from "@/user/venue-profile/VenueProfileNav";
import {
  Consultants,
  Gallery,
  Reviews,
  SeminarsExpertInsights,
  Services,
  SuccessStories,
} from "@/user/venue-profile/InteractiveSections";
import {
  AboutFounder,
  AboutVenue,
  FounderInformation,
  LanguagesSocial,
  Locations,
  Specialization,
  VenueCertificatesAwardsDocuments,
} from "@/user/venue-profile/StaticSections";
import { FEATURED_VENUES, getVenueBySlug } from "@/data/venues";

interface VenuePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FEATURED_VENUES.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({ params }: VenuePageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  if (!venue) return { title: "Venue not found" };

  return {
    title: `${venue.name} — ${venue.location} | Bandhan`,
    description: venue.tagline,
  };
}

export default async function VenueProfilePage({ params }: VenuePageProps) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  if (!venue) notFound();

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />

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
            <Consultants />
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

      <Footer />
    </div>
  );
}
