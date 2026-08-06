import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { InnerBanner } from "@/components/common/InnerBanner";
import { AboutIntro } from "@/components/about/AboutIntro";
import { HowWeWork } from "@/components/about/HowWeWork";
import { WhatWeOffer } from "@/components/about/WhatWeOffer";
import { RealCouples } from "@/components/about/RealCouples";
import { StayConnected } from "@/components/about/StayConnected";

export const metadata: Metadata = {
  title: "About Bandhan — Pakistan's Wedding Planning Platform",
  description:
    "Bandhan connects couples with verified wedding venues, photographers, decorators and caterers across Pakistan — honest pricing, real reviews, and bookings protected end to end.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <InnerBanner title="About Bandhan" description="Making Every Pakistani Wedding Effortless" />

      <main className="grow">
        <AboutIntro />
        <HowWeWork />
        <WhatWeOffer />
        <RealCouples />
        <StayConnected />
      </main>

      <Footer />
    </div>
  );
}
