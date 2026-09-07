import type { Metadata } from "next";
import { VenueDashboard } from "@/Venue Panel/dashboard/VenueDashboard";

export const metadata: Metadata = {
  title: "Venue dashboard",
  description: "Manage your venue's bookings, revenue, and reviews.",
  robots: { index: false, follow: false },
};

export default function ManageVenueDashboardPage() {
  return <VenueDashboard />;
}
