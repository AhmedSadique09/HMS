import type { Metadata } from "next";
import { PaymentsCenter } from "@/Venue Panel/payments/PaymentsCenter";

export const metadata: Metadata = {
  title: "Payments",
  description: "Track advances, remaining balances, and refunds across your bookings.",
  robots: { index: false, follow: false },
};

export default function ManageVenuePaymentsPage() {
  return <PaymentsCenter />;
}
