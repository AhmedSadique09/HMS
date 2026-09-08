"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OnboardingStepper } from "./OnboardingStepper";
import { StepHallDetails } from "./StepHallDetails";
import { StepVenueInformation } from "./StepVenueInformation";
import { StepVenueType } from "./StepVenueType";
import { createEmptyHall, EMPTY_ONBOARDING_DATA, type OnboardingData } from "./onboardingData";

const STEP_COPY = [
  { title: "Tell us about your venue", subtitle: "Basic details couples will see on your profile." },
  { title: "What do you offer?", subtitle: "Choose the type of space you manage." },
  { title: "Add your halls", subtitle: "Set pricing, facilities, and menus for each hall or marquee." },
] as const;

/**
 * The 3-step venue onboarding wizard shown right after OTP verification.
 * Owns the whole draft in local state and only routes to the dashboard once
 * the final step is submitted.
 */
export function VenueOnboarding() {
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
      router.push("/manage-venue/dashboard");
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <main className="min-h-dvh bg-[#f7f5f1] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-ink">
            Bandhan<span className="text-brand">.</span>
          </Link>
          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Set Up Your Venue</p>
            <h1 className="mt-1 text-2xl font-bold text-ink">Let&apos;s complete your profile</h1>
          </div>
        </div>

        <OnboardingStepper current={step} onStepClick={setStep} />

        <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm sm:p-10">
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

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-xl border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink/70 transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="rounded-xl border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastStep ? "Complete Onboarding" : "Next"}
          </button>
        </div>
      </div>
    </main>
  );
}
