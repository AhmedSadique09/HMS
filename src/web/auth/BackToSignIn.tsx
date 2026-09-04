import Link from "next/link";
import { ArrowLeftIcon } from "./AuthLayout";

/** Footer link shared by the forgot-password, OTP and reset-password screens. */
export function BackToSignIn() {
  return (
    <Link
      href="/auth/signin"
      className="inline-flex items-center gap-1.5 font-semibold text-[#d73853] hover:underline"
    >
      <ArrowLeftIcon className="size-4" />
      Back to sign in
    </Link>
  );
}
