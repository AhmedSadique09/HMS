"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import AuthLayout, { AUTH_BTN, LockIcon, ArrowLeftIcon } from "../AuthLayout";

const IMAGE =
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80";

const FIELD =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pl-11 pr-12 text-[15px] text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-[#d73853] focus:bg-white focus:ring-4 focus:ring-[#d73853]/10";
const LABEL = "mb-1.5 block text-sm font-medium text-zinc-700";
const ICON_WRAP = "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400";
const EYE_BTN =
  "absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition hover:text-[#d73853]";

const EyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
    <path d="M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 10 8 10 8a13.2 13.2 0 0 1-1.7 2.7M6.6 6.6A13.3 13.3 0 0 0 2 12s3 8 10 8a9 9 0 0 0 5.4-1.6" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    <path d="m2 2 20 20" />
  </svg>
);
const Eye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
    <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      image={IMAGE}
      imageAlt="Grand wedding venue set up for a celebration"
      footer={
        <Link href="/auth/signin" className="inline-flex items-center gap-1.5 font-semibold text-[#d73853] hover:underline">
          <ArrowLeftIcon className="size-4" />
          Back to sign in
        </Link>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/auth/signin");
        }}
      >
        {/* New password */}
        <div>
          <label htmlFor="new-password" className={LABEL}>New password</label>
          <div className="relative">
            <span className={ICON_WRAP}><LockIcon /></span>
            <input
              id="new-password"
              name="newPassword"
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              autoComplete="new-password"
              required
              className={FIELD}
            />
            <button type="button" onClick={() => setShowNew((s) => !s)} aria-label={showNew ? "Hide password" : "Show password"} className={EYE_BTN}>
              {showNew ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Confirm password */}
        <div>
          <label htmlFor="confirm-password" className={LABEL}>Confirm password</label>
          <div className="relative">
            <span className={ICON_WRAP}><LockIcon /></span>
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
              autoComplete="new-password"
              required
              className={FIELD}
            />
            <button type="button" onClick={() => setShowConfirm((s) => !s)} aria-label={showConfirm ? "Hide password" : "Show password"} className={EYE_BTN}>
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <Button type="submit" fullWidth size="lg" rounded="xl" className={AUTH_BTN}>
          Reset password
        </Button>
      </form>
    </AuthLayout>
  );
}
