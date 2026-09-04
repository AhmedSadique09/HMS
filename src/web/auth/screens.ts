import type { ComponentType } from "react";
import { ForgetPassword } from "./ForgetPassword";
import { Otp } from "./Otp";
import { ResetPassword } from "./ResetPassword";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

type AuthScreen = {
  Screen: ComponentType;
  title: string;
  description: string;
};

/**
 * Every auth screen, keyed by its URL segment. The single /auth/[slug] route
 * reads this map, so adding a screen means adding one entry here plus its
 * component file — no new route folder.
 */
export const AUTH_SCREENS: Record<string, AuthScreen> = {
  signin: {
    Screen: SignIn,
    title: "Sign in to Bandhan",
    description:
      "Sign in to your Bandhan account to manage venues, bookings and payments in one place.",
  },
  signup: {
    Screen: SignUp,
    title: "Create your Bandhan account",
    description:
      "Join Bandhan to browse verified wedding venues and vendors, or list your own venue and take bookings.",
  },
  forgetpassword: {
    Screen: ForgetPassword,
    title: "Forgot your password?",
    description:
      "Enter your email and we'll send you a verification code to reset your Bandhan password.",
  },
  otp: {
    Screen: Otp,
    title: "Verify your email",
    description: "Enter the 6-digit code we sent to your email to continue.",
  },
  resetpassword: {
    Screen: ResetPassword,
    title: "Set a new password",
    description: "Choose a new password for your Bandhan account.",
  },
};

export const AUTH_SLUGS = Object.keys(AUTH_SCREENS);
