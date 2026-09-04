import { SectionCard } from "@/components/elements/SectionCard";

const LANGUAGES = ["English", "Urdu", "Punjabi", "Pashto", "Sindhi"] as const;

/* Brand glyphs — lucide dropped its brand icon set, so these stay inline. */
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    path: "M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.4.5.7.2 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.3.6.5 1.3.5 2.4.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.8-.5 2.4-.2.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.6.3-1.3.5-2.4.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.4-.5-.7-.2-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.3-.6-.5-1.3-.5-2.4C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.5-2.4.2-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.6-.3 1.3-.5 2.4-.5C8.9 2 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.5-3.3a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.6h.1a4.2 4.2 0 0 1 3.8-2.1c4 0 4.8 2.6 4.8 6.1V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    path: "M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5a2.5 2.5 0 0 0-1.8 1.8C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 1.5.5 8.8.5 8.8.5s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12ZM9.8 15.3V8.7l6 3.3-6 3.3Z",
  },
] as const;

/** Sidebar card. */
export function LanguagesSocial() {
  return (
    <SectionCard id="languages-social" title="Languages Social">
      <div className="mb-4 flex flex-col">
        <span className="mb-1 text-base text-ink">Languages</span>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((language) => (
            <span
              key={language}
              className="rounded-md bg-brand/10 px-2.5 py-1 text-sm font-medium text-brand"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="mb-1 text-base text-ink">Social Links</span>
        <ul className="flex gap-3">
          {SOCIAL_LINKS.map(({ label, href, path }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                  <path d={path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}
