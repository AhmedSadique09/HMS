/* eslint-disable @next/next/no-img-element */

import { SectionCard } from "@/components/elements/SectionCard";

const FOUNDER_INFORMATION = {
  name: "Sara Ahmed",
  designation: "Founder & Managing Director",
  background: "Hospitality & Event Management",
  experience: "14 years",
  weddingsHosted: "1,200+",
  profilePicture:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
} as const;

/** Sidebar card. */
export function FounderInformation() {
  return (
    <SectionCard
      id="founder-information"
      title="Founder Information"
      bodyClassName="grid grid-cols-2 gap-4 p-4"
    >
      <div className="col-span-2 flex items-center gap-4">
        <figure className="mb-0 size-20 shrink-0 overflow-hidden rounded-2xl bg-ink/5">
          <img
            src={FOUNDER_INFORMATION.profilePicture}
            alt={FOUNDER_INFORMATION.name}
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="flex flex-col">
          <span className="font-bold text-ink">{FOUNDER_INFORMATION.name}</span>
          <strong className="text-sm font-semibold text-brand">
            {FOUNDER_INFORMATION.designation}
          </strong>
        </div>
      </div>

      <div className="col-span-2 flex flex-col">
        <span className="text-sm text-ink/60">Background</span>
        <strong className="text-base font-semibold text-ink">
          {FOUNDER_INFORMATION.background}
        </strong>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-ink/60">Experience</span>
        <strong className="text-base font-semibold text-ink">
          {FOUNDER_INFORMATION.experience}
        </strong>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-ink/60">Weddings Hosted</span>
        <strong className="text-base font-semibold text-ink">
          {FOUNDER_INFORMATION.weddingsHosted}
        </strong>
      </div>
    </SectionCard>
  );
}
