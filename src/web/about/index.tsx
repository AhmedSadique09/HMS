import { RealCouples } from "@/web/common/RealCouples";
import { StayConnected } from "@/web/common/StayConnected";
import { AboutBanner } from "./AboutBanner";
import { AboutIntro } from "./AboutIntro";
import { HowWeWork } from "./HowWeWork";
import { WhatWeOffer } from "./WhatWeOffer";

/**
 * Every section of the About us page, in order. Each section is its own file in
 * this folder — the route only has to call this one component.
 */
export function AboutSections() {
  return (
    <>
      <AboutBanner />

      <main className="grow">
        <AboutIntro />
        <HowWeWork />
        <WhatWeOffer />
        <RealCouples />
        <StayConnected />
      </main>
    </>
  );
}

export { AboutBanner } from "./AboutBanner";
export { AboutIntro } from "./AboutIntro";
export { HowWeWork } from "./HowWeWork";
export { WhatWeOffer } from "./WhatWeOffer";
