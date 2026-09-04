import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/includes/Footer";
import Header from "@/components/includes/Header";
import { VenueProfileSections } from "@/web/venue-profile";
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
      <VenueProfileSections venue={venue} />
      <Footer />
    </div>
  );
}
