import { InnerBanner } from "@/web/common/InnerBanner";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=2000&q=80";

/** Inner-page hero for Services — carries the search row. */
export function ServicesBanner() {
  return (
    <InnerBanner
      title="Services"
      description="Every Vendor. Every Function. One Trusted Platform."
      image={BANNER_IMAGE}
      showSearch
    />
  );
}
