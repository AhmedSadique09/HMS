"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import { ArrowLeftIcon, AUTH_BTN, AuthLayout, MailIcon, PhoneIcon, UserIcon } from "./AuthLayout";
import { PasswordField } from "./PasswordField";
import { FIELD, ICON_WRAP, LABEL } from "./fieldStyles";

const IMAGE =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80";

type Role = "customer" | "vendor";

/* Venue / building glyph for the "manage a venue" role. */
function VenueIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
    </svg>
  );
}
function ChevronRightIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const ROLES: { key: Role; icon: typeof UserIcon; title: string; desc: string }[] = [
  { key: "customer", icon: UserIcon, title: "I'm Looking for a Venue", desc: "Browse and book wedding halls & marquees" },
  { key: "vendor", icon: VenueIcon, title: "I Manage a Venue", desc: "List your hall or marquee and get bookings" },
];

export function SignUp() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  const footer = (
    <>
      Already have an account?{" "}
      <Link href="/auth/signin" className="font-semibold text-[#d73853] hover:underline">
        Sign in
      </Link>
    </>
  );

  /* Step 1 — role selection */
  if (!role) {
    return (
      <AuthLayout
        title="Create an account"
        subtitle="How would you like to use Bandhan?"
        image={IMAGE}
        imageAlt="Newly-wed couple celebrating their wedding"
        footer={footer}
      >
        <div className="space-y-4">
          {ROLES.map(({ key, icon: RoleIcon, title, desc }) => (
            <button
              key={key}
              type="button"
              onClick={() => setRole(key)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-zinc-200 p-5 text-left transition hover:border-[#d73853] hover:bg-[#fff5f7] hover:shadow-sm"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#ffe9e9] text-[#d73853]">
                <RoleIcon className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-[#132743]">{title}</span>
                <span className="mt-0.5 block text-sm text-zinc-500">{desc}</span>
              </span>
              <ChevronRightIcon className="ml-auto size-5 shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-[#d73853]" />
            </button>
          ))}
        </div>
      </AuthLayout>
    );
  }

  /* Step 2 — signup form */
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Fill in your details to get started."
      image={IMAGE}
      imageAlt="Newly-wed couple celebrating their wedding"
      footer={footer}
    >
      <button
        type="button"
        onClick={() => setRole(null)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-[#d73853]"
      >
        <ArrowLeftIcon className="size-4" />
        Change account type
      </button>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem("bandhan_auth", "1");
          if (role === "vendor") {
            // Venue admins verify by OTP before onboarding; reuse the shared
            // OTP screen and tell it where to continue afterwards.
            sessionStorage.setItem("bandhan_otp_next", "/manage-venue/onboarding");
            router.push("/auth/otp");
          } else {
            router.push("/");
          }
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={LABEL}>First name</label>
            <div className="relative">
              <span className={ICON_WRAP}><UserIcon /></span>
              <input id="firstName" name="firstName" placeholder="Jane" autoComplete="given-name" required className={`${FIELD} pl-11`} />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className={LABEL}>Last name</label>
            <div className="relative">
              <span className={ICON_WRAP}><UserIcon /></span>
              <input id="lastName" name="lastName" placeholder="Doe" autoComplete="family-name" required className={`${FIELD} pl-11`} />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className={LABEL}>Email</label>
          <div className="relative">
            <span className={ICON_WRAP}><MailIcon /></span>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required className={`${FIELD} pl-11`} />
          </div>
        </div>

        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="Create a strong password"
          autoComplete="new-password"
        />

        <div>
          <label htmlFor="phone" className={LABEL}>Phone number</label>
          <div className="relative">
            <span className={ICON_WRAP}><PhoneIcon /></span>
            <input id="phone" name="phone" type="tel" placeholder="+92 300 1234567" autoComplete="tel" required className={`${FIELD} pl-11`} />
          </div>
        </div>

        <Button type="submit" fullWidth size="lg" rounded="xl" className={AUTH_BTN}>
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
