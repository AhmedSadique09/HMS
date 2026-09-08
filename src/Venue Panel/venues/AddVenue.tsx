"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "../dashboard/DashboardShell";
import { OnboardingStepper } from "../onboarding/OnboardingStepper";
import { StepHallDetails } from "../onboarding/StepHallDetails";
import { StepVenueInformation } from "../onboarding/StepVenueInformation";
import { StepVenueType } from "../onboarding/StepVenueType";
import { createEmptyHall, EMPTY_ONBOARDING_DATA, type OnboardingData } from "../onboarding/onboardingData";

const STEP_COPY = [
  { title: "Tell us about this venue", subtitle: "Basic details couples will see on its profile." },
  { title: "What does it offer?", subtitle: "Choose the type of space you're adding." },
  { title: "Add its halls", subtitle: "Set pricing, facilities, and menus for each hall or marquee." },
] as const;

/**
 * "Add Venue" — the same 3-step form as onboarding, reused here so an admin
 * can list another hall/marquee under their account without leaving the panel.
 */
export function AddVenue() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(EMPTY_ONBOARDING_DATA);

  const isLastStep = step === STEP_COPY.length - 1;

  const canContinue =
    step === 0
      ? data.venueInformation.venueName.trim().length > 0
      : step === 1
        ? data.venueType !== null
        : data.halls.length > 0;

  const handleContinue = () => {
    if (step === 1 && data.halls.length === 0) {
      setData({ ...data, halls: [createEmptyHall()] });
    }
    if (isLastStep) {
      router.push("/manage-venue/venues");
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <DashboardShell>
      <h1 className="font-serif text-3xl font-bold text-ink">Add Venue</h1>
      <p className="mt-1 text-ink/50">List a new hall or marquee under your account</p>

      <div className="mt-6">
        <OnboardingStepper current={step} onStepClick={setStep} />
      </div>

      <div className="mt-6 rounded-xl border border-ink/10 bg-white p-6 shadow-sm sm:p-10">
        <div>
          <h2 className="text-xl font-bold text-ink">{STEP_COPY[step].title}</h2>
          <p className="mt-1 text-sm text-ink/50">{STEP_COPY[step].subtitle}</p>
        </div>

        <div className="mt-8">
          {step === 0 && (
            <StepVenueInformation
              value={data.venueInformation}
              onChange={(venueInformation) => setData({ ...data, venueInformation })}
            />
          )}
          {step === 1 && (
            <StepVenueType
              value={data.venueType}
              onChange={(venueType) =>
                setData({
                  ...data,
                  venueType,
                  halls: data.halls.length > 0 ? data.halls : [createEmptyHall()],
                })
              }
              halls={data.halls}
              onHallsChange={(halls) => setData({ ...data, halls })}
            />
          )}
          {step === 2 && (
            <StepHallDetails halls={data.halls} onChange={(halls) => setData({ ...data, halls })} />
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => (step === 0 ? router.push("/manage-venue/venues") : setStep((s) => s - 1))}
          className="rounded-xl border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink/70 transition hover:bg-ink/5"
        >
          {step === 0 ? "Cancel" : "Previous"}
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          className="rounded-xl border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLastStep ? "Save Venue" : "Next"}
        </button>
      </div>
    </DashboardShell>
  );
}
