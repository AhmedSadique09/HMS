"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import { AUTH_BTN, AuthLayout } from "./AuthLayout";
import { BackToSignIn } from "./BackToSignIn";
import { PasswordField } from "./PasswordField";

const IMAGE =
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80";

export function ResetPassword() {
  const router = useRouter();

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      image={IMAGE}
      imageAlt="Grand wedding venue set up for a celebration"
      footer={<BackToSignIn />}
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/auth/signin");
        }}
      >
        <PasswordField
          id="new-password"
          name="newPassword"
          label="New password"
          placeholder="Enter new password"
          autoComplete="new-password"
        />

        <PasswordField
          id="confirm-password"
          name="confirmPassword"
          label="Confirm password"
          placeholder="Re-enter new password"
          autoComplete="new-password"
        />

        <Button type="submit" fullWidth size="lg" rounded="xl" className={AUTH_BTN}>
          Reset password
        </Button>
      </form>
    </AuthLayout>
  );
}
