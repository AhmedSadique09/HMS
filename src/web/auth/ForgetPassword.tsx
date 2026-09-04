"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import { AUTH_BTN, AuthLayout, MailIcon } from "./AuthLayout";
import { BackToSignIn } from "./BackToSignIn";
import { FIELD, ICON_WRAP, LABEL } from "./fieldStyles";

const IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80";

export function ForgetPassword() {
  const router = useRouter();

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a verification code."
      image={IMAGE}
      imageAlt="Beautifully decorated wedding reception table"
      footer={<BackToSignIn />}
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/auth/otp");
        }}
      >
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
