import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/elements/Icon";

/* Brand tokens (match Header + landing page) ------------------------ */
/* heading navy #132743 · accent pink #d73853 · card surface #f1f5f9   */

const ICONS = {
  pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z|M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  waves: "M2 10v4|M6 6.5v11|M10 3.5v17|M14 8v8|M18 5.5v13|M22 10v4",
  chevron: "m9 18 6-6-6-6",
};

/* Filled orbit glyph used as the list bullet on every footer link. */
function LinkBullet({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14.6392 27.3333C13.2665 27.3333 11.9721 27.073 10.7558 26.5526C9.53961 26.0319 8.48095 25.321 7.57984 24.4199C6.67873 23.5188 5.96784 22.4601 5.44717 21.2439C4.92673 20.0277 4.6665 18.7332 4.6665 17.3606C4.6665 14.9748 5.41128 12.8671 6.90084 11.0376C8.39017 9.2078 10.3097 8.04625 12.6595 7.55292C12.9262 7.49358 13.1595 7.54758 13.3595 7.71492C13.5597 7.88203 13.6827 8.10092 13.7285 8.37158C13.7527 8.62069 13.6816 8.84636 13.5152 9.04858C13.3487 9.2508 13.1433 9.38247 12.8988 9.44358C11.0322 9.8578 9.50261 10.8037 8.31017 12.2812C7.1175 13.7586 6.52117 15.4517 6.52117 17.3606C6.52117 19.6241 7.30828 21.543 8.8825 23.1173C10.4567 24.6915 12.3756 25.4786 14.6392 25.4786C16.5776 25.4786 18.2918 24.8807 19.7818 23.6849C21.2718 22.4891 22.2166 20.9508 22.6162 19.0699C22.6753 18.8272 22.8002 18.623 22.9908 18.4572C23.1815 18.2915 23.4002 18.2241 23.6468 18.2552C23.9102 18.2988 24.1229 18.4197 24.2852 18.6179C24.4476 18.8161 24.5001 19.046 24.4425 19.3076C23.9678 21.6562 22.8137 23.581 20.9802 25.0819C19.1466 26.5828 17.0329 27.3333 14.6392 27.3333ZM22.7182 2.87158C24.4928 2.87158 26.0039 3.49347 27.2515 4.73725C28.4991 5.98103 29.1228 7.49136 29.1228 9.26825C29.1228 11.0449 28.4983 12.5589 27.2492 13.8102C26.0001 15.0616 24.4872 15.6872 22.7105 15.6872C20.9336 15.6872 19.4223 15.0612 18.1765 13.8092C16.9305 12.5572 16.3075 11.0409 16.3075 9.26025C16.3075 7.48558 16.9307 5.97714 18.1772 4.73491C19.4238 3.49269 20.9375 2.87158 22.7182 2.87158ZM22.7068 13.8322C23.9626 13.8322 25.0367 13.386 25.9292 12.4936C26.8218 11.6009 27.2682 10.5267 27.2682 9.27092C27.2682 8.01514 26.8218 6.94092 25.9292 6.04825C25.0367 5.15558 23.9626 4.70925 22.7068 4.70925C21.4508 4.70925 20.3794 5.15558 19.4925 6.04825C18.6056 6.94092 18.1622 8.01514 18.1622 9.27092C18.1622 10.5267 18.6056 11.6009 19.4925 12.4936C20.3794 13.386 21.4508 13.8322 22.7068 13.8322Z"
        fill="currentColor"
      />
    </svg>
  );
}

type FooterLink = { label: string; href: string };

const COMPANY_LINKS: FooterLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blog", href: "#" },
];

const BANDHAN_LINKS: FooterLink[] = [
  { label: "Venues", href: "#" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "#" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Terms and Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

type SocialLink = { id: string; href: string; label: string; iconSrc: string; iconClassName?: string };

const SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", href: "#", label: "Bandhan on LinkedIn", iconSrc: "/social/linkedin.svg" },
  {
    id: "youtube",
    href: "#",
    label: "Bandhan on YouTube",
    iconSrc: "/social/youtube.svg",
    iconClassName: "h-auto w-[34px]",
  },
  { id: "instagram", href: "#", label: "Bandhan on Instagram", iconSrc: "/social/instagram.svg" },
  { id: "facebook", href: "#", label: "Bandhan on Facebook", iconSrc: "/social/facebook.svg" },
];

/* One right-hand column: heading, bulleted links, then a contact block. */
function LinkColumn({ title, links, children }: { title: string; links: FooterLink[]; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-2xl font-semibold leading-snug text-[#132743]">{title}</h3>
      <ul className="flex flex-col space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="flex items-center gap-2 text-base font-medium leading-snug text-[#132743] transition-colors hover:text-[#d73853]"
            >
              <LinkBullet className="size-6 text-[#d73853]" />
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

/* "Visit us" / "Call us" block — accent icon, heading, plain detail text. */
function ContactBlock({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="flex items-center gap-2 text-2xl font-medium leading-snug text-[#132743]">
        <Icon path={icon} className="size-8 shrink-0 text-[#d73853]" />
        <span>{title}</span>
      </h4>
      <p className="text-base font-normal leading-snug text-[#132743]">{children}</p>
    </div>
  );
}

/**
 * Landing page footer — light rounded card with an oversized headline on the
 * left, two link columns plus contact details on the right, and a bottom bar
 * carrying the copyright, legal links, and social icons.
 */
export default function Footer() {
  return (
    <footer className="flex flex-col gap-10 p-4 sm:p-6 lg:p-10">
      <div className="rounded-3xl bg-[#f1f5f9]">
        <div className="mx-auto grid w-full max-w-8xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:gap-16">
          {/* Left — logo, invitation line, oversized headline */}
          <div className="flex flex-col gap-10">
            <Link
              href="/"
              aria-label="Bandhan — go to home"
              className="block w-fit rounded-md outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#d73853]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Logo.png" alt="Bandhan" className="h-14 w-auto object-contain" />
            </Link>

            <span className="text-2xl leading-none text-[#132743]">Let&rsquo;s plan your big day!</span>

            <h2 className="text-4xl font-semibold leading-[1.15] text-[#132743] lg:text-5xl">
              <span className="block">Where every</span>
              great wedding begins
            </h2>
          </div>

          {/* Right — link columns with contact details */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <LinkColumn title="Company" links={COMPANY_LINKS}>
              <ContactBlock icon={ICONS.pin} title="Visit us">
                <span className="block">45-C Main Boulevard, Gulberg III.</span>
                Office #12, Lahore, 54660
              </ContactBlock>
            </LinkColumn>

            <LinkColumn title="Bandhan" links={BANDHAN_LINKS}>
              <ContactBlock icon={ICONS.waves} title="Call us">
                +92 42 111-226-334 | 0300-1122334
              </ContactBlock>
            </LinkColumn>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright + legal links, social icons */}
      <div className="mx-auto flex w-full max-w-8xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <p className="text-sm font-normal leading-snug text-[#132743]">
            &copy; {new Date().getFullYear()} Bandhan. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap items-center justify-center gap-4">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label} className="flex items-center gap-4">
                  <Icon path={ICONS.chevron} className="size-4 shrink-0 text-[#d73853]" />
                  <a
                    href={link.href}
                    className="text-base font-medium leading-snug text-[#132743] transition-colors hover:text-[#d73853]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav aria-label="Bandhan social media">
          <ul className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  title={social.label}
                  className="block rounded-md outline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[#d73853]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={social.iconSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={social.iconClassName ?? "size-6"}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
