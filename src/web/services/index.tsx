import { RealCouples } from "@/web/common/RealCouples";
import { StayConnected } from "@/web/common/StayConnected";
import { ServicesBanner } from "./ServicesBanner";
import { ServicesGrid } from "./ServicesGrid";

/**
 * Every section of the Services page, in order. Each section is its own file in
 * this folder — the route only has to call this one component.
 */
export function ServicesSections() {
  return (
    <>
      <ServicesBanner />

      <main className="grow">
        <ServicesGrid />
        <RealCouples />
        <StayConnected />
      </main>
    </>
  );
}

export { ServicesBanner } from "./ServicesBanner";
export { ServicesGrid } from "./ServicesGrid";
