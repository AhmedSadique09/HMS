import Link from "next/link";
import type { ReactNode } from "react";

/* Brand primary button styling (pink CTA) for auth screens. */
export const AUTH_BTN =
  "!bg-[#d73853] hover:!bg-[#c02f48] !text-white !border-transparent";

/* ---- Small inline SVG field icons (24px, 1.75 stroke) ---- */
type IconProps = { className?: string };
const base = "size-5";

export function UserIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
export function MailIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}
export function PhoneIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}
export function LockIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
export function StarIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="m12 2 2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
    </svg>
  );
}
export function ArrowLeftIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

/**
 * AuthLayout — split screen: high-def wedding image on the left, form on the right.
 */
export function AuthLayout({
  title,
  subtitle,
  image,
  imageAlt,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      {/* Left — image panel */}
      <div className="relative hidden overflow-hidden lg:block">
        <div
          role="img"
          aria-label={imageAlt}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#132743]/90 via-[#132743]/35 to-[#132743]/55" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" className="w-fit text-2xl font-bold tracking-tight">
            Bandhan<span className="text-[#ff8fa3]">.</span>
          </Link>

          <div>
            <h2 className="max-w-md text-4xl font-bold leading-[1.15] tracking-tight drop-shadow-sm">
              Plan your dream wedding, beautifully.
            </h2>
            <p className="mt-4 max-w-sm text-white/85">
              Book trusted venues, photographers, and every wedding service — all in one place.
            </p>

            {/* Glass testimonial card */}
            <figure className="mt-8 max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex gap-1 text-[#ff8fa3]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="size-4" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-white/90">
                &ldquo;Bandhan made planning our wedding effortless — every vendor in one place, and
                the whole family loved it.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs font-medium text-white/70">
                Ayesha &amp; Hamza · Married 2025
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 inline-block text-2xl font-bold tracking-tight text-[#132743] lg:hidden">
            Bandhan<span className="text-[#d73853]">.</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-[#132743]">{title}</h1>
          <p className="mt-2 text-zinc-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-zinc-500">{footer}</div>}
        </div>
      </div>
    </main>
  );
}
