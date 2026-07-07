/* Theme tokens (from project palette) ----------------------------- */
/* primary #d6334a · dark surface #0f1115 · muted #64748b · light #f8fafc */

function Icon({ path, className = "size-6" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d={path} />
    </svg>
  );
}

const ICONS = {
  play: "M8 5v14l11-7L8 5Z",
  apple:
    "M16 2c.1 1-.3 2-1 2.7-.7.8-1.8 1.4-2.8 1.3-.1-1 .4-2 1-2.7C13.9 2.5 15 2 16 2Zm3.2 15.3c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.3 3.1-4 3.1-1.4 0-1.8-.9-3.7-.9s-2.4.9-3.7.9c-1.7 0-3-1.6-4-3C-.6 18-.9 13.5 1 11c1-1.4 2.5-2.2 4-2.2 1.6 0 2.6 1 3.9 1s2.1-1 4-1c1.3 0 2.7.7 3.7 2-3.3 1.8-2.8 6.5 2.6 6.5Z",
  x: "M18 2h3l-7 8 8 12h-6l-5-7-5 7H2l8-9L2 2h6l4 6 6-6Zm-1 18h1L7 4H6l11 16Z",
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
};

const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: ["Wedding Venues", "Photographers", "Bridal Makeup", "Decor", "Henna Artists", "Catering", "Singer/Band", "Choreographers"],
  },
  { title: "Company", links: ["About Us", "Contact Us", "Blog", "Events"] },
  { title: "Resources", links: ["Privacy Policy", "Terms and Conditions"] },
];

/* Dark app-store button (single-line label). */
function StoreButton({ icon, label }: { icon: string; label: string }) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#1a1d22] px-5 py-2.5 text-white transition-colors hover:bg-[#23262c]"
    >
      <Icon path={icon} className="size-5" />
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );
}

/**
 * Landing page footer — dark surface with a newsletter + feedback card,
 * link columns, app-store buttons, and social links.
 */
export default function Footer() {
  return (
    <footer className="bg-[#0f1115] text-[#f8fafc]">
      <div className="mx-auto max-w-8xl px-4 pb-6 pt-16 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:gap-16">
          {/* Newsletter + feedback card */}
          <div className="rounded-3xl border border-white/10 bg-white/3 p-6 md:p-8">
            <h3 className="text-xl font-bold text-white">Stay ahead of the curve</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
              Join 10,000+ couples planning their dream wedding with Bandhan insights.
            </p>

            {/* Email + subscribe */}
            <form className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-[#1a1d22] p-1.5">
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-[#64748b] focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[#d6334a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c02b41]"
              >
                Subscribe
              </button>
            </form>

            {/* Feedback */}
            <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">Feedback</p>
            <textarea
              aria-label="Feedback"
              rows={4}
              placeholder="How can we make Bandhan better for you?"
              className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-[#1a1d22] p-4 text-sm text-white placeholder:text-[#64748b] focus:border-[#d6334a] focus:outline-none"
            />
            <button
              type="button"
              className="mt-4 w-full rounded-2xl border border-white/10 bg-[#1a1d22] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#23262c]"
            >
              Send Suggestion
            </button>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="lg:min-w-40">
              <p className="text-xs font-bold uppercase tracking-widest text-[#d6334a]">{col.title}</p>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#cbd5e1] transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <span className="text-xl font-bold text-white">
              Bandhan<span className="text-[#d6334a]">.</span>
            </span>
            <p className="text-sm text-[#64748b]">© 2026. Designed for the modern celebration.</p>
          </div>

          <div className="flex items-center gap-4">
            <StoreButton icon={ICONS.play} label="Play Store" />
            <StoreButton icon={ICONS.apple} label="App Store" />
            <div className="ml-1 flex items-center gap-3">
              <a href="#" aria-label="X (Twitter)" className="text-[#94a3b8] transition-colors hover:text-white">
                <Icon path={ICONS.x} className="size-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-[#94a3b8] transition-colors hover:text-white">
                <Icon path={ICONS.facebook} className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
