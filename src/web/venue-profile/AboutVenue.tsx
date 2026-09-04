import { SectionCard } from "@/components/elements/SectionCard";

export function AboutVenue() {
  return (
    <SectionCard id="about-venue" title="About Venue" bodyClassName="flex flex-col gap-4 p-4">
      <p className="mb-0 text-base leading-7 text-ink/70">
        A purpose-built wedding venue that has hosted celebrations of every size — from
        intimate nikkah ceremonies to thousand-guest baraats. The team handles the parts most
        families dread: seating plans, catering timelines, parking, and the hundred small
        decisions that surface in the final week.
      </p>

      <p className="mb-0 text-base leading-7 text-ink/70">
        Every booking is assigned a dedicated event manager who stays with the family from the
        first walkthrough to the last guest leaving. Decor, lighting, sound, and menu tastings
        are coordinated in-house, so there is one point of contact rather than six vendors
        chasing each other.
      </p>

      <p className="mb-0 text-base leading-7 text-ink/70">
        The venue has built its reputation on turning up prepared: halls dressed on time, food
        served hot, and a schedule that actually holds. Families come back for their
        siblings&apos; weddings, and most new bookings still arrive by word of mouth.
      </p>
    </SectionCard>
  );
}
