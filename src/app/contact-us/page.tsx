import type { Metadata } from "next";
import Footer from "@/components/includes/Footer";
import Header from "@/components/includes/Header";
import { ContactSections } from "@/web/contact";

export const metadata: Metadata = {
  title: "Contact Bandhan — Talk to Our Wedding Team",
  description:
    "Planning a wedding or listing your business? Reach the Bandhan team in Lahore, Karachi, Islamabad or Faisalabad — we reply within one working day.",
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ContactSections />
      <Footer />
    </div>
  );
}
