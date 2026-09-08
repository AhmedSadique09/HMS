import type { Metadata } from "next";
import { SettingsCenter } from "@/Venue Panel/settings/SettingsCenter";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your venue admin profile and account security.",
  robots: { index: false, follow: false },
};

export default function ManageVenueSettingsPage() {
  return <SettingsCenter />;
}
