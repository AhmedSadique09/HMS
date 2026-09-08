const STEPS = ["Venue Info", "Venue Type", "Hall Details"] as const;

type Props = {
  /** 0-indexed active step. */
  current: number;
  /** Steps are clickable at any time, matching a jump-to-any-step wizard. */
  onStepClick?: (index: number) => void;
};

/**
 * Top progress stepper for the 3-step venue onboarding wizard — a labelled
 * dot for each step connected by a line, with a brand-colored fill that
 * animates to the active step.
 */
export function OnboardingStepper({ current, onStepClick }: Props) {
  const progressPercent = (current / (STEPS.length - 1)) * 100;

  return (
    <div>
      <div className="flex justify-between">
        {STEPS.map((label, index) => {
          const isActive = index === current;
          const isComplete = index < current;

          return (
            <span
              key={label}
              className={`flex-1 text-center text-sm transition-colors ${
                isActive ? "font-semibold text-ink" : isComplete ? "text-ink/50" : "text-ink/30"
              }`}
            >
              {label}
            </span>
          );
        })}
      </div>

      <div className="relative mt-3 flex justify-between">
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink/10" />
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-brand transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />

        {STEPS.map((label, index) => {
          const isActive = index === current;
          const isComplete = index < current;

          return (
            <button
              key={label}
              type="button"
              onClick={() => onStepClick?.(index)}
              aria-label={`Go to ${label}`}
              aria-current={isActive}
              className="relative z-10 flex flex-1 justify-center"
            >
              <span
                className={`size-4 rounded-full border-2 bg-white transition-all duration-300 ${
                  isActive ? "border-brand ring-4 ring-brand/15" : isComplete ? "border-brand bg-brand" : "border-ink/15"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
