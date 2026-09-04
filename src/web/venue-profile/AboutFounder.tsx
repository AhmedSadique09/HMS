import { SectionCard } from "@/components/elements/SectionCard";

export function AboutFounder() {
  return (
    <SectionCard title="About Founder" bodyClassName="flex flex-col gap-4 p-4">
      <p className="mb-0 text-base leading-7 text-ink/70">
        Sara Ahmed founded the venue after a decade of running weddings for other people and
        watching the same avoidable failures repeat: overbooked halls, vendors who vanish on
        the day, and families paying twice for work nobody coordinated.
      </p>

      <p className="mb-0 text-base leading-7 text-ink/70">
        Her rule is simple — one team, one schedule, one price agreed up front. That approach
        shaped how the venue hires, how it quotes, and why it still turns down bookings it
        cannot staff properly.
      </p>
    </SectionCard>
  );
}
