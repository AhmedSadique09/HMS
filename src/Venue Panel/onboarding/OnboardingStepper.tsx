import { Check } from "lucide-react";

const STEPS = ["Venue Information", "Venue Type", "Hall Details"] as const;

/**
 * Top progress stepper for the 3-step venue onboarding wizard. `current` is
 * 0-indexed; steps before it are marked complete, the current one is
 * highlighted in brand pink, and later steps stay muted.
 */
export function OnboardingStepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {STEPS.map((label, index) => {
        const isComplete = index < current;
        const isActive = index === current;

        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-3">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isComplete
                    ? "bg-brand text-white"
                    : isActive
                      ? "bg-brand/10 text-brand ring-2 ring-brand"
                      : "bg-ink/5 text-ink/40"
                }`}
              >
                {isComplete ? <Check className="size-4" /> : index + 1}
              </span>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  isActive ? "text-ink" : isComplete ? "text-ink/70" : "text-ink/40"
                }`}
              >
                {label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <span className={`h-px flex-1 ${isComplete ? "bg-brand" : "bg-ink/10"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
