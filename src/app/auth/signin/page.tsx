"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import AuthLayout, { AUTH_BTN, MailIcon, LockIcon } from "../AuthLayout";

const IMAGE =
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80";

const FIELD =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-[15px] text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-[#d73853] focus:bg-white focus:ring-4 focus:ring-[#d73853]/10";
const LABEL = "mb-1.5 block text-sm font-medium text-zinc-700";
const ICON_WRAP = "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400";
const EYE_BTN =
  "absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition hover:text-[#d73853]";

export default function SignInPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue planning your big day."
      image={IMAGE}
      imageAlt="Elegant wedding ceremony with floral decor"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-[#d73853] hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem("bandhan_auth", "1");
          router.push("/");
        }}
      >
        {/* Email address */}
        <div>
          <label htmlFor="email" className={LABEL}>Email address</label>
          <div className="relative">
            <span className={ICON_WRAP}><MailIcon /></span>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required className={`${FIELD} pl-11`} />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className={LABEL}>Password</label>
          <div className="relative">
            <span className={ICON_WRAP}><LockIcon /></span>
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className={`${FIELD} pl-11 pr-12`}
            />
            <button type="button" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Hide password" : "Show password"} className={EYE_BTN}>
              {showPw ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
                  <path d="M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 10 8 10 8a13.2 13.2 0 0 1-1.7 2.7M6.6 6.6A13.3 13.3 0 0 0 2 12s3 8 10 8a9 9 0 0 0 5.4-1.6" />
                  <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                  <path d="m2 2 20 20" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
                  <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600">
            <input type="checkbox" name="remember" className="size-4 rounded border-zinc-300 accent-[#d73853]" />
            Remember me
          </label>
          <Link href="/auth/forgetpassword" className="text-sm font-semibold text-[#d73853] hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" rounded="xl" className={AUTH_BTN}>
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
}
