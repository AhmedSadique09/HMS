import type { Metadata } from "next";
import { MessagingCenter } from "@/Venue Panel/messages/MessagingCenter";

export const metadata: Metadata = {
  title: "Messages",
  description: "Chat with couples and vendors about their bookings.",
  robots: { index: false, follow: false },
};

export default function ManageVenueMessagesPage() {
  return <MessagingCenter />;
}
