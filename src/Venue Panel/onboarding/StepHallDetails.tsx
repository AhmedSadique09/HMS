"use client";

import { Trash2 } from "lucide-react";
import { FACILITIES, MENU_ITEMS, type Hall } from "./onboardingData";

const FIELD =
  "w-full rounded-xl border border-ink/15 bg-ink/[0.02] px-3.5 py-2.5 text-sm text-ink placeholder-ink/35 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10";
const LABEL = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/50";

type Props = {
  halls: Hall[];
  onChange: (halls: Hall[]) => void;
};

function Chip({
  label,
  isSelected,
  onToggle,
}: {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        isSelected
          ? "border-brand bg-brand text-white"
          : "border-ink/15 text-ink/60 hover:border-brand/40 hover:text-brand"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Onboarding step 3 — fills in the full details for every hall/marquee added
 * back in step 2: capacity, price, booking type, facilities, and (when
 * custom menus are allowed) menu items. Halls are added/removed in step 2.
 */
export function StepHallDetails({ halls, onChange }: Props) {
  const updateHall = (id: string, patch: Partial<Hall>) =>
    onChange(halls.map((hall) => (hall.id === id ? { ...hall, ...patch } : hall)));

  const toggleListValue = (hall: Hall, key: "facilities" | "menuItems", item: string) => {
    const list = hall[key];
    const next = list.includes(item) ? list.filter((v) => v !== item) : [...list, item];
    updateHall(hall.id, { [key]: next } as Partial<Hall>);
  };

  const removeHall = (id: string) => onChange(halls.filter((hall) => hall.id !== id));

  return (
    <div className="space-y-6">
      {halls.map((hall, index) => (
        <div key={hall.id} className="rounded-2xl border border-ink/15 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-base font-semibold text-ink">Hall {index + 1}</h4>
            {halls.length > 1 && (
              <button
                type="button"
                onClick={() => removeHall(hall.id)}
                aria-label="Remove this hall"
                className="text-ink/40 transition hover:text-brand"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className={LABEL} htmlFor={`hallName-${hall.id}`}>Hall name</label>
              <input
                id={`hallName-${hall.id}`}
                className={FIELD}
                value={hall.hallName}
                onChange={(e) => updateHall(hall.id, { hallName: e.target.value })}
                placeholder="Crystal Suite"
              />
            </div>
            <div>
              <label className={LABEL} htmlFor={`capacity-${hall.id}`}>Capacity (guests)</label>
              <input
                id={`capacity-${hall.id}`}
                type="number"
                min={0}
                className={FIELD}
                value={hall.capacity}
                onChange={(e) => updateHall(hall.id, { capacity: e.target.value })}
                placeholder="500"
              />
            </div>
            <div>
              <label className={LABEL} htmlFor={`price-${hall.id}`}>Price per head (PKR)</label>
              <input
                id={`price-${hall.id}`}
                type="number"
                min={0}
                className={FIELD}
                value={hall.pricePerHead}
                onChange={(e) => updateHall(hall.id, { pricePerHead: e.target.value })}
                placeholder="3500"
              />
            </div>
          </div>

          <div className="mt-4">
            <span className={LABEL}>Booking type</span>
            <div className="flex flex-wrap gap-3">
              {(
                [
                  { value: "custom-menu", label: "Allow custom menu" },
                  { value: "hall-only", label: "Hall only (no catering)" },
                ] as const
              ).map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 text-sm text-ink/70"
                >
                  <input
                    type="radio"
                    name={`bookingType-${hall.id}`}
                    checked={hall.bookingType === option.value}
                    onChange={() => updateHall(hall.id, { bookingType: option.value })}
                    className="accent-(--color-brand)"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <span className={LABEL}>Facilities</span>
            <div className="flex flex-wrap gap-2">
              {FACILITIES.map((facility) => (
                <Chip
                  key={facility}
                  label={facility}
                  isSelected={hall.facilities.includes(facility)}
                  onToggle={() => toggleListValue(hall, "facilities", facility)}
                />
              ))}
            </div>
          </div>

          {hall.bookingType === "custom-menu" && (
            <div className="mt-4">
              <span className={LABEL}>Menu items</span>
              <div className="flex flex-wrap gap-2">
                {MENU_ITEMS.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    isSelected={hall.menuItems.includes(item)}
                    onToggle={() => toggleListValue(hall, "menuItems", item)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
