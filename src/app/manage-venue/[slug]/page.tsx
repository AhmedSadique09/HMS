import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MANAGE_VENUE_SCREENS, MANAGE_VENUE_SLUGS } from "@/Venue Panel/screens";

interface ManageVenuePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MANAGE_VENUE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ManageVenuePageProps): Promise<Metadata> {
  const { slug } = await params;
  const screen = MANAGE_VENUE_SCREENS[slug];

  if (!screen) return { title: "Page not found" };

  return {
    title: screen.title,
    description: screen.description,
    robots: { index: false, follow: false },
  };
}

export default async function ManageVenuePage({ params }: ManageVenuePageProps) {
  const { slug } = await params;
  const screen = MANAGE_VENUE_SCREENS[slug];

  if (!screen) notFound();

  const { Screen } = screen;
  return <Screen />;
}
