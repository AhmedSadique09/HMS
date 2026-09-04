"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import { AUTH_BTN, AuthLayout, MailIcon } from "./AuthLayout";
import { PasswordField } from "./PasswordField";
import { FIELD, ICON_WRAP, LABEL } from "./fieldStyles";

const IMAGE =
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80";

export function SignIn() {
  const router = useRouter();

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
        <div>
          <label htmlFor="email" className={LABEL}>Email address</label>
          <div className="relative">
            <span className={ICON_WRAP}><MailIcon /></span>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required className={`${FIELD} pl-11`} />
          </div>
        </div>

        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
        />

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
