"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import AuthLayout, { AUTH_BTN, MailIcon, ArrowLeftIcon } from "../AuthLayout";

const IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80";

const FIELD =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-[15px] text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-[#d73853] focus:bg-white focus:ring-4 focus:ring-[#d73853]/10";
const LABEL = "mb-1.5 block text-sm font-medium text-zinc-700";
const ICON_WRAP = "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400";

export default function ForgetPasswordPage() {
  const router = useRouter();

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a verification code."
      image={IMAGE}
      imageAlt="Beautifully decorated wedding reception table"
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
          router.push("/auth/otp");
        }}
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className={LABEL}>Email</label>
          <div className="relative">
            <span className={ICON_WRAP}><MailIcon /></span>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required className={`${FIELD} pl-11`} />
          </div>
        </div>

        <Button type="submit" fullWidth size="lg" rounded="xl" className={AUTH_BTN}>
          Send code
        </Button>
      </form>
    </AuthLayout>
  );
}
