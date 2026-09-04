import { ContactBanner } from "./ContactBanner";
import { GetInTouch } from "./GetInTouch";
import { OurLocations } from "./OurLocations";

/**
 * Every section of the Contact us page, in order. Each section is its own file
 * in this folder — the route only has to call this one component.
 */
export function ContactSections() {
  return (
    <>
      <ContactBanner />

      <main className="grow">
        <GetInTouch />
        <OurLocations />
      </main>
    </>
  );
}

export { ContactBanner } from "./ContactBanner";
export { ContactForm } from "./ContactForm";
export { ContactWidget } from "./ContactWidget";
export { GetInTouch } from "./GetInTouch";
export { OurLocations } from "./OurLocations";
