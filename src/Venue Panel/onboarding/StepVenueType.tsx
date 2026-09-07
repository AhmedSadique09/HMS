import { Check, Plus, Trash2 } from "lucide-react";
import { BrandOutlineButton } from "@/components/elements/BrandButton";
import { createEmptyHall, VENUE_TYPES, type Hall, type VenueType } from "./onboardingData";

type Props = {
  value: VenueType | null;
  onChange: (next: VenueType) => void;
  halls: Hall[];
  onHallsChange: (halls: Hall[]) => void;
};

const UNIT_LABEL: Record<VenueType, string> = {
  Hall: "hall",
  Marquee: "marquee",
  Both: "hall or marquee",
};

/**
 * Onboarding step 2 — pick Hall, Marquee, or Both, then add every individual
 * hall/marquee the venue has (just a name each here; full details come in
 * step 3). This is where "one venue, multiple halls" actually gets set up.
 */
export function StepVenueType({ value, onChange, halls, onHallsChange }: Props) {
  const addHall = () => onHallsChange([...halls, createEmptyHall()]);

  const renameHall = (id: string, hallName: string) =>
    onHallsChange(halls.map((hall) => (hall.id === id ? { ...hall, hallName } : hall)));

  const removeHall = (id: string) => onHallsChange(halls.filter((hall) => hall.id !== id));

  return (
    <div>
      <h3 className="text-lg font-semibold text-ink">What type of venue do you manage?</h3>
      <p className="mt-1 text-sm text-ink/50">
        You can add as many halls or marquees as your venue has.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {VENUE_TYPES.map(({ value: type, description }) => {
          const isSelected = value === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              aria-pressed={isSelected}
              className={`relative flex flex-col items-start gap-1 rounded-2xl border p-5 text-left transition ${
                isSelected
                  ? "border-brand bg-brand/5 shadow-sm"
                  : "border-ink/15 hover:border-brand/40 hover:bg-brand/3"
              }`}
            >
              {isSelected && (
                <span className="absolute right-4 top-4 flex size-5 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="size-3" />
                </span>
              )}
              <span className="text-base font-semibold text-ink">{type}</span>
              <span className="text-sm text-ink/50">{description}</span>
            </button>
          );
        })}
      </div>

      {value && (
        <div className="mt-8 border-t border-ink/10 pt-6">
          <h4 className="text-sm font-semibold text-ink">Your {UNIT_LABEL[value]}s</h4>
          <p className="mt-1 text-sm text-ink/50">
            Name each one now — you&apos;ll fill in capacity, pricing, and facilities next.
          </p>

          <div className="mt-4 space-y-3">
            {halls.map((hall, index) => (
              <div key={hall.id} className="flex items-center gap-3">
                <input
                  value={hall.hallName}
                  onChange={(e) => renameHall(hall.id, e.target.value)}
                  placeholder={`${value === "Marquee" ? "Marquee" : "Hall"} ${index + 1} name`}
                  className="w-full rounded-xl border border-ink/15 bg-ink/2 px-4 py-2.5 text-sm text-ink placeholder-ink/35 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
                />
                {halls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHall(hall.id)}
                    aria-label="Remove this hall"
                    className="shrink-0 text-ink/40 transition hover:text-brand"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <BrandOutlineButton onClick={addHall} className="mt-4 w-full justify-center border-dashed">
            <Plus className="size-4" />
            Add another {UNIT_LABEL[value]}
          </BrandOutlineButton>
        </div>
      )}
    </div>
  );
}
