import type { Metadata } from "next";
import Footer from "@/components/includes/Footer";
import Header from "@/components/includes/Header";
import { ServicesSections } from "@/web/services";

export const metadata: Metadata = {
  title: "Wedding Services in Pakistan | Bandhan",
  description:
    "Book venues, photographers, bridal makeup, decor, catering, henna artists, cars and music — every wedding service on one trusted platform, with upfront pricing.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ServicesSections />
      <Footer />
    </div>
  );
}
