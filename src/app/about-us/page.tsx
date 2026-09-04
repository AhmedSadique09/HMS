import type { Metadata } from "next";
import Footer from "@/components/includes/Footer";
import Header from "@/components/includes/Header";
import { AboutSections } from "@/web/about";

export const metadata: Metadata = {
  title: "About Bandhan — Pakistan's Wedding Planning Platform",
  description:
    "Bandhan connects couples with verified wedding venues, photographers, decorators and caterers across Pakistan — honest pricing, real reviews, and bookings protected end to end.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AboutSections />
      <Footer />
    </div>
  );
}
