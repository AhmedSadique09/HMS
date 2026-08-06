import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { InnerBanner } from "@/components/common/InnerBanner";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { RealCouples } from "@/components/about/RealCouples";
import { StayConnected } from "@/components/about/StayConnected";

export const metadata: Metadata = {
  title: "Wedding Services in Pakistan | Bandhan",
  description:
    "Book venues, photographers, bridal makeup, decor, catering, henna artists, cars and music — every wedding service on one trusted platform, with upfront pricing.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <InnerBanner
        title="Services"
        description="Every Vendor. Every Function. One Trusted Platform."
        image="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=2000&q=80"
        showSearch
      />

      <main className="grow">
        <ServicesGrid />
        <RealCouples />
        <StayConnected />
      </main>

      <Footer />
    </div>
  );
}
