import type { Metadata } from "next";
import { VenueManagement } from "@/Venue Panel/venues/VenueManagement";

export const metadata: Metadata = {
  title: "Venues / Halls",
  description: "Manage the halls and marquees listed under your venue.",
  robots: { index: false, follow: false },
};

export default function ManageVenueVenuesPage() {
  return <VenueManagement />;
}
