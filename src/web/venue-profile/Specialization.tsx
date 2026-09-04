import { SectionCard } from "@/components/elements/SectionCard";

const SPECIALIZATIONS = [
  "Barat & Walima",
  "Mehndi Nights",
  "Nikkah Ceremonies",
  "Corporate Events",
  "Engagement Parties",
  "Outdoor Receptions",
] as const;

export function Specialization() {
  return (
    <SectionCard id="specialization" title="Specialization">
      <ul className="flex flex-wrap gap-2">
        {SPECIALIZATIONS.map((specialization) => (
          <li key={specialization}>
            <span className="inline-flex min-h-[28px] cursor-pointer items-center rounded-md bg-ink/5 px-4 text-sm text-ink/70 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              {specialization}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
