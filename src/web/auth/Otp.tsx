"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";
import { AUTH_BTN, AuthLayout } from "./AuthLayout";
import { BackToSignIn } from "./BackToSignIn";

const IMAGE =
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80";

const LENGTH = 6;

export function Otp() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (i: number, value: string) => {
    const v = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH).split("");
    if (pasted.length) {
      const next = Array(LENGTH).fill("");
      pasted.forEach((d, idx) => (next[idx] = d));
      setDigits(next);
      inputs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
    }
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We sent a 6-digit code to your email. Enter it below."
      image={IMAGE}
      imageAlt="Traditional mehndi ceremony with intricate henna"
      footer={<BackToSignIn />}
    >
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          // Shared by the forgot-password flow and venue-admin signup — the
          // caller leaves a hint of where to continue after verification,
          // defaulting to the password-reset step.
          const next = sessionStorage.getItem("bandhan_otp_next") ?? "/auth/resetpassword";
          sessionStorage.removeItem("bandhan_otp_next");
          router.push(next);
        }}
      >
        <div className="flex justify-between gap-2 sm:gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              aria-label={`Digit ${i + 1}`}
              className="size-12 rounded-xl border border-zinc-200 bg-zinc-50 text-center text-xl font-semibold text-[#132743] outline-none transition focus:border-[#d73853] focus:bg-white focus:ring-4 focus:ring-[#d73853]/10 sm:size-14"
            />
          ))}
        </div>

        <Button type="submit" fullWidth size="lg" rounded="xl" className={AUTH_BTN}>
          Verify
        </Button>

        <p className="text-center text-sm text-zinc-500">
          Didn&apos;t receive the code?{" "}
          <button type="button" className="font-semibold text-[#d73853] hover:underline">
            Resend
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
