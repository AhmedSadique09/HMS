import type { ComponentType } from "react";
import { VenueOnboarding } from "./onboarding/VenueOnboarding";

type ManageVenueScreen = {
  Screen: ComponentType;
  title: string;
  description: string;
};

/**
 * Venue-admin screens, keyed by URL segment — mirrors the auth module's
 * screens.ts so /manage-venue/[slug] can stay a single route file.
 *
 * Account creation and OTP verification reuse the shared /auth/signup and
 * /auth/otp screens (see src/web/auth) instead of duplicating them here —
 * only onboarding is specific to the venue-admin flow.
 */
export const MANAGE_VENUE_SCREENS: Record<string, ManageVenueScreen> = {
  onboarding: {
    Screen: VenueOnboarding,
    title: "Set up your venue",
    description: "Add your venue information, type, and hall details to finish setting up.",
  },
};

export const MANAGE_VENUE_SLUGS = Object.keys(MANAGE_VENUE_SCREENS);
