import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Textarea from "@/components/elements/Textarea";
import Separator from "@/components/elements/Separator";

/* Brand token (exact from shadiyana.pk) ---------------------------- */
const BTN_PRIMARY =
  "!bg-[#d73853] hover:!bg-[#c02f48] !text-white !border-transparent";

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
  linkedin:
    "M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9V9Z",
  instagram:
    "M12 2c-2.7 0-3 0-4.1.1-1 0-1.8.2-2.4.5-.7.2-1.2.6-1.8 1.1C3.2 4.3 2.8 4.8 2.6 5.5c-.3.6-.4 1.4-.5 2.4C2 9 2 9.3 2 12s0 3 .1 4.1c0 1 .2 1.8.5 2.4.2.7.6 1.2 1.1 1.8.6.5 1.1.9 1.8 1.1.6.3 1.4.4 2.4.5C9 22 9.3 22 12 22s3 0 4.1-.1c1 0 1.8-.2 2.4-.5.7-.2 1.2-.6 1.8-1.1.5-.6.9-1.1 1.1-1.8.3-.6.4-1.4.5-2.4.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c0-1-.2-1.8-.5-2.4a4.9 4.9 0 0 0-1.1-1.8 4.9 4.9 0 0 0-1.8-1.1c-.6-.3-1.4-.4-2.4-.5C15 2 14.7 2 12 2Zm0 5.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm4.8-3.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  tiktok:
    "M16 2c.3 2.3 1.8 4 4 4.3v3c-1.5 0-2.9-.5-4-1.3V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a3 3 0 1 0 2 2.8V2h3Z",
};

const FOOTER_COLUMNS = [
  { title: "Company", links: ["About Us", "Contact Us", "Careers", "Blog", "Events"] },
  { title: "Services", links: ["Wedding Venues", "Photographers", "Bridal Makeup", "Decor", "Henna Artists", "Catering", "Singer/Band", "Choreographers"] },
  { title: "Resources", links: ["Sign up", "Sign In", "Privacy Policy", "Terms and Conditions"] },
];
const FOOTER_SOCIALS = [ICONS.x, ICONS.facebook, ICONS.linkedin, ICONS.instagram, ICONS.tiktok];

/**
 * App-store download badge (Google Play / App Store).
 */
function StoreBadge({ icon, top, bottom }: { icon: string; top: string; bottom: string }) {
  return (
    <a href="#" className="inline-flex items-center gap-2.5 rounded-xl bg-black px-4 py-2 text-white transition hover:bg-zinc-800">
      <Icon path={icon} className="size-6" />
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-white/70">{top}</span>
        <span className="block text-sm font-semibold">{bottom}</span>
      </span>
    </a>
  );
}

/**
 * Landing page footer: newsletter + suggestions, link columns, app download,
 * and social links.
 */
export default function Footer() {
  return (
    <footer className="bg-[#f7f7f7]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Newsletter */}
          <div className="col-span-2">
            <div className="flex max-w-sm items-center gap-2 rounded-full bg-white p-1.5 shadow-sm">
              <Input aria-label="Email" placeholder="Enter your email" className="flex-1" />
              <Button rounded="full" size="sm" className={BTN_PRIMARY}>
                Stay Updated
              </Button>
            </div>
            <p className="mt-6 font-semibold text-[#132743]">Got any suggestions for us?</p>
            <div className="mt-3 max-w-sm">
              <Textarea aria-label="Suggestions" placeholder="Type here…" rows={3} />
              <Button rounded="full" size="sm" className={`mt-3 ${BTN_PRIMARY}`}>
                Submit
              </Button>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-[#d73853]">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-[#132743]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Download app */}
          <div>
            <p className="font-semibold text-[#d73853]">Download App</p>
            <div className="mt-4 flex flex-col gap-2">
              <StoreBadge icon={ICONS.play} top="GET IT ON" bottom="Google Play" />
              <StoreBadge icon={ICONS.apple} top="Download on the" bottom="App Store" />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
          <p>© Shadiyana 2026. All Rights Reserved.</p>
          <div className="flex gap-2">
            {FOOTER_SOCIALS.map((path, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="flex size-9 items-center justify-center rounded-full bg-white text-[#132743] shadow-sm transition hover:bg-[#d73853] hover:text-white"
              >
                <Icon path={path} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
