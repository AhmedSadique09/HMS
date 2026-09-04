import { InnerBanner } from "@/web/common/InnerBanner";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=80";

/** Inner-page hero for Contact us. */
export function ContactBanner() {
  return (
    <InnerBanner
      title="Contact Us"
      description="We're Here to Help — Every Step of the Way"
      image={BANNER_IMAGE}
    />
  );
}
