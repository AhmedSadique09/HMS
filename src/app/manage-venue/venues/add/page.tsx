import type { Metadata } from "next";
import { AddVenue } from "@/Venue Panel/venues/AddVenue";

export const metadata: Metadata = {
  title: "Add venue",
  description: "List a new hall or marquee under your account.",
  robots: { index: false, follow: false },
};

export default function ManageVenueAddVenuePage() {
  return <AddVenue />;
}
