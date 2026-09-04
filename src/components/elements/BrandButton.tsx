import type { ButtonHTMLAttributes } from "react";

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** Filled brand button — the rose call-to-action used across the landing page. */
export function BrandButton({
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`${BASE} bg-brand text-white hover:bg-brand/90 ${className}`}
      {...rest}
    />
  );
}

/** Outlined brand button — matches the landing page's slider arrow treatment. */
export function BrandOutlineButton({
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`${BASE} border border-brand/40 text-brand hover:bg-brand hover:text-white ${className}`}
      {...rest}
    />
  );
}
