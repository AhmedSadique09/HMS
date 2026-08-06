"use client";

import {
  Award,
  CircleUserRound,
  ContactRound,
  FileBadge,
  Film,
  Gem,
  Image as ImageIcon,
  MapPin,
  ScrollText,
  SwatchBook,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const ICON_PROPS = { strokeWidth: 1, width: 18, height: 18 } as const;

const NAV_ITEMS = [
  { id: "about-venue", label: "Introduction", icon: <CircleUserRound {...ICON_PROPS} /> },
  { id: "specialization", label: "Specialization", icon: <Gem {...ICON_PROPS} /> },
  { id: "locations", label: "Locations", icon: <MapPin {...ICON_PROPS} /> },
  { id: "services", label: "Services", icon: <SwatchBook {...ICON_PROPS} /> },
  { id: "consultants", label: "Consultants", icon: <ContactRound {...ICON_PROPS} /> },
  {
    id: "venue-certificates-awards-documents",
    label: "Certificates",
    icon: <FileBadge {...ICON_PROPS} />,
  },
  { id: "gallery", label: "Gallery", icon: <ImageIcon {...ICON_PROPS} /> },
  { id: "seminars-expert-insights", label: "Videos", icon: <Film {...ICON_PROPS} /> },
  { id: "reviews", label: "Reviews", icon: <Award {...ICON_PROPS} /> },
  { id: "success-stories", label: "Success Stories", icon: <ScrollText {...ICON_PROPS} /> },
] as const;

type NavItemId = (typeof NAV_ITEMS)[number]["id"];

/** Clearance for the sticky site header (~72px) plus a little breathing room. */
const STICKY_OFFSET = 88;
const ACTIVE_SECTION_OFFSET = 100;

/** Tab strip that scroll-spies the profile sections below it. */
export function VenueProfileNav() {
  const [activeLink, setActiveLink] = useState<NavItemId>("about-venue");

  const scrollToSectionId = useCallback((id: NavItemId) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  useEffect(() => {
    const updateActiveLink = () => {
      const currentScroll = window.scrollY + ACTIVE_SECTION_OFFSET;
      let nextActiveId: NavItemId = NAV_ITEMS[0].id;

      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= currentScroll) {
          nextActiveId = item.id;
        }
      }

      setActiveLink((previous) => (previous === nextActiveId ? previous : nextActiveId));
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });

    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && NAV_ITEMS.some((item) => item.id === initialHash)) {
      const initialSectionId = initialHash as NavItemId;
      setActiveLink(initialSectionId);
      setTimeout(() => scrollToSectionId(initialSectionId), 0);
    }

    return () => window.removeEventListener("scroll", updateActiveLink);
  }, [scrollToSectionId]);

  return (
    <nav
      aria-label="Venue profile sections"
      className="w-full min-w-0 rounded-b-2xl border border-t-0 border-ink/15 bg-white pl-8 pt-3 text-sm"
    >
      <ul className="scrollbar-hide -mb-px flex gap-4 overflow-x-auto pr-4">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => {
                setActiveLink(item.id);
                scrollToSectionId(item.id);
              }}
              aria-current={activeLink === item.id ? "page" : undefined}
              className={`flex gap-1 whitespace-nowrap border-b-2 pb-4 transition-all duration-300 ${
                activeLink === item.id
                  ? "border-brand text-brand"
                  : "border-transparent text-ink/60 hover:text-brand"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
