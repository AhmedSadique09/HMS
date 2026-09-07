import type { Metadata } from "next";
import { BookingManagement } from "@/Venue Panel/bookings/BookingManagement";

export const metadata: Metadata = {
  title: "Booking management",
  description: "Manage all your venue bookings — pending, confirmed, completed, and cancelled.",
  robots: { index: false, follow: false },
};

export default function ManageVenueBookingsPage() {
  return <BookingManagement />;
}
