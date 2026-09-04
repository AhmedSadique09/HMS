"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/elements/Icon";

/* Brand tokens (match the landing page) ----------------------------- */
/* heading navy #132743 · accent pink #d73853                          */

/* Ported from the edvisori design system's GetStartedIcon — a filled stepped
   glyph on a 22x22 box, so it cannot ride the stroked Icon helper above.     */
function GetStartedIcon({ className = "size-4 shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M11.3818 21.291C11.054 21.6188 10.6766 21.693 10.2495 21.5137C9.82235 21.3343 9.6088 21.0141 9.6088 20.553V12.4103C9.6088 12.2906 9.57035 12.1922 9.49346 12.1153C9.41657 12.0384 9.31824 12 9.19846 12H1.0558C0.594684 12 0.274462 11.7864 0.0951283 11.3593C-0.084205 10.9322 -0.00998253 10.5548 0.317795 10.227L9.92646 0.617999C10.1129 0.431777 10.3354 0.282223 10.5938 0.169334C10.852 0.056445 11.126 0 11.4158 0H19.5231C20.0922 0 20.5821 0.205333 20.9928 0.615999C21.4035 1.02667 21.6088 1.51656 21.6088 2.08567V10.193C21.6088 10.4828 21.5524 10.7568 21.4395 11.015C21.3266 11.2734 21.177 11.4959 20.9908 11.6823L11.3818 21.291ZM16.4465 6.58967V13.8693L19.9335 10.382V2.08567C19.9335 1.96589 19.895 1.86755 19.8181 1.79067C19.7412 1.71378 19.6429 1.67533 19.5231 1.67533H11.2268L7.73946 5.16233H15.0191C15.4236 5.16233 15.7626 5.29911 16.0361 5.57267C16.3097 5.84622 16.4465 6.18522 16.4465 6.58967ZM11.2841 11.752V19.0317L14.7711 15.5443V7.248C14.7711 7.12822 14.7327 7.02989 14.6558 6.953C14.5789 6.87611 14.4806 6.83767 14.3608 6.83767H6.06446L2.57713 10.3247H9.8568C10.261 10.3247 10.6 10.4614 10.8738 10.735C11.1474 11.0088 11.2841 11.3478 11.2841 11.752Z" />
    </svg>
  );
}

const ICONS = {
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9|M13.7 21a2 2 0 0 1-3.4 0",
  user: "M20 21a8 8 0 1 0-16 0|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  chevron: "M6 9l6 6 6-6",
  pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z|M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  dots: "M12 5h.01|M12 12h.01|M12 19h.01",
  calendar: "M8 2v4|M16 2v4|M3.5 9.5h17|M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z",
  wallet: "M3 7.5h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11v3.5|M16.5 13.5h.5",
  chat: "M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z",
};

/* Notification type → icon + tint (semantic color per event type) ------ */
const NOTIF_STYLES: Record<string, { icon: string; tile: string }> = {
  booking: { icon: ICONS.calendar, tile: "bg-[#d73853]/10 text-[#d73853]" },
  review: { icon: ICONS.star, tile: "bg-amber-100 text-amber-600" },
  payment: { icon: ICONS.wallet, tile: "bg-emerald-100 text-emerald-600" },
  message: { icon: ICONS.chat, tile: "bg-blue-100 text-blue-600" },
  reminder: { icon: ICONS.bell, tile: "bg-violet-100 text-violet-600" },
};

/* Insight-menu icons (copied from the Renesis reference header) ------- */
const ICON_ABOUT = (
  <svg viewBox="0 0 40 40" fill="none" className="size-6" aria-hidden="true">
    <path
      d="M21.4 33.95H10.2C7.4 33.95 6 32.55 6 29.75V18.55C6 15.75 7.4 14.35 10.2 14.35M21.4 33.95C18.6 33.95 17.2 32.55 17.2 29.75M21.4 33.95H29.8C32.6 33.95 34 32.55 34 29.75V10.15C34 7.35 32.6 5.95 29.8 5.95H21.4C18.6 5.95 17.2 7.35 17.2 10.15M10.2 14.35H17.2M10.2 14.35V11.55C10.2 10.01 11.46 8.75 13 8.75H17.354C17.242 9.17 17.2 9.63 17.2 10.15M17.2 14.35V29.75M17.2 14.35V10.15M17.2 29.75V10.15M22.8 14.35V21.35M28.4 14.35V21.35M11.6 21.35V26.95M27 26.95H24.2C23.43 26.95 22.8 27.58 22.8 28.35V33.95H28.4V28.35C28.4 27.58 27.77 26.95 27 26.95Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const ICON_CONTACT = (
  <svg viewBox="0 0 40 40" fill="none" className="size-6" aria-hidden="true">
    <path
      d="M10.2 7.8H29.8C32.6 7.8 34 9.2 34 12V28C34 30.8 32.6 32.2 29.8 32.2H10.2C7.4 32.2 6 30.8 6 28V12C6 9.2 7.4 7.8 10.2 7.8ZM9.5 13.5L18.4 19.7C19.36 20.37 20.64 20.37 21.6 19.7L30.5 13.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Notifications ------------------------------------------------------- */
type Notification = { title: string; desc: string; time: string; type: string; unread?: boolean };
const NOTIFICATIONS: Notification[] = [
  { type: "booking", unread: true, title: "New booking request from Ayesha Khan", desc: "Requested a quote for Banquet Hall booking.", time: "Apr 8, 03:59 PM" },
  { type: "booking", unread: true, title: "Your Marquee booking is confirmed", desc: "Grand Marquee, Lahore has confirmed your date.", time: "Apr 8, 03:38 PM" },
  { type: "review", unread: true, title: "New review from Hassan Raza", desc: "Left a 5-star review on your photography service.", time: "Apr 8, 02:15 PM" },
  { type: "payment", title: "Payment received", desc: "Advance payment for Walima catering received.", time: "Apr 7, 06:40 PM" },
  { type: "booking", title: "New booking request from Fatima Noor", desc: "Requested bridal makeup for 12 May.", time: "Apr 7, 01:22 PM" },
  { type: "message", title: "Vendor message", desc: "Royal Decorators sent you a new message.", time: "Apr 6, 11:05 AM" },
  { type: "reminder", title: "Event reminder", desc: "Mehndi event scheduled for tomorrow evening.", time: "Apr 6, 09:00 AM" },
];
const NOTIF_PER_PAGE = 3;

/* Nav items — each can carry an optional dropdown list ---------------- */
type DropItem = { label: string; href: string; icon?: ReactNode; tagline?: string; image?: string };
type AreaGroup = { title: string; cities: string[]; capital?: boolean };

const NAV_ITEMS: {
  label: string;
  href: string;
  dropdown: DropItem[];
  areas?: AreaGroup[];
  viewAll?: { label: string; href: string };
}[] = [
  {
    label: "Venues",
    href: "#",
    dropdown: [
      {
        label: "Banquet Hall",
        href: "#",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=160&h=160&fit=crop&q=80",
        tagline: "Elegant indoor celebrations.",
      },
      {
        label: "Marquee",
        href: "#",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=160&h=160&fit=crop&q=80",
        tagline: "Grand open-air gatherings.",
      },
      {
        label: "Farm House",
        href: "#",
        image: "/venues/FarmHouse.png",
        tagline: "Scenic outdoor weddings.",
      },
      {
        label: "Rooftop",
        href: "#",
        image: "/venues/Rooftop.png",
        tagline: "Sophisticated skyline events.",
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      {
        label: "Photographers",
        href: "#",
        image: "/venues/Weedingcuuple.png",
        tagline: "Timeless moments captured.",
      },
      {
        label: "Bridal Makeup",
        href: "#",
        image: "/venues/bridal%20makeup.png",
        tagline: "Flawless bridal looks.",
      },
      {
        label: "Decoration",
        href: "#",
        image: "/venues/Decorators.png",
        tagline: "Stunning event styling.",
      },
      {
        label: "Henna Artist",
        href: "#",
        image: "/venues/mhendiartist.png",
        tagline: "Intricate mehndi artistry.",
      },
      {
        label: "Catering",
        href: "#",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=160&h=160&fit=crop&q=80",
        tagline: "Exquisite wedding cuisine.",
      },
      {
        label: "Wedding Invitations",
        href: "#",
        image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=160&h=160&fit=crop&q=80",
        tagline: "Elegant custom stationery.",
      },
      {
        label: "Car Rental",
        href: "#",
        image: "/venues/carrental.png",
        tagline: "Luxury wedding rides.",
      },
      {
        label: "Corporate Events",
        href: "#",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=160&h=160&fit=crop&q=80",
        tagline: "Seamless corporate functions.",
      },
      {
        label: "Singer / Bands",
        href: "#",
        image: "/venues/musicians.png",
        tagline: "Live musical performances.",
      },
      {
        label: "Choreographers",
        href: "#",
        image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=160&h=160&fit=crop&q=80",
        tagline: "Choreographed dance sets.",
      },
      {
        label: "Lighting & Ambiance",
        href: "#",
        image: "/venues/lightning.png",
        tagline: "Immersive lighting design.",
      },
    ],
  },
  {
    label: "Events",
    href: "#",
    dropdown: [
      {
        label: "Barat",
        href: "#",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=160&h=160&fit=crop&q=80",
        tagline: "Grand groom procession.",
      },
      {
        label: "Mehndi & Mayo",
        href: "#",
        image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=160&h=160&fit=crop&q=80",
        tagline: "Colorful pre-wedding festivities.",
      },
      {
        label: "Walima",
        href: "#",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=160&h=160&fit=crop&q=80",
        tagline: "Elegant reception feast.",
      },
      {
        label: "Bridal Shower",
        href: "#",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=160&h=160&fit=crop&q=80",
        tagline: "Intimate bridal celebrations.",
      },
      {
        label: "Engagement",
        href: "#",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=160&h=160&fit=crop&q=80",
        tagline: "Ring ceremony moments.",
      },
      {
        label: "Nikkah",
        href: "#",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=160&h=160&fit=crop&q=80",
        tagline: "Sacred marriage ceremony.",
      },
      {
        label: "Qawali Night",
        href: "#",
        image: "/venues/musicians.png",
        tagline: "Soulful musical evenings.",
      },
    ],
    viewAll: { label: "View all events", href: "#" },
  },
  {
    label: "Areas",
    href: "#",
    dropdown: [],
    areas: [
      { title: "Punjab", cities: ["Lahore", "Rawalpindi", "Faisalabad", "Multan", "Gujranwala", "Sialkot"] },
      { title: "Sindh", cities: ["Karachi", "Hyderabad", "Sukkur", "Larkana"] },
      { title: "Balochistan", cities: ["Quetta", "Gwadar", "Turbat"] },
      { title: "Khyber Pakhtunkhwa", cities: ["Peshawar", "Abbottabad", "Mardan", "Swat"] },
      { title: "Azad Kashmir", cities: ["Muzaffarabad", "Mirpur", "Rawalakot"] },
      { title: "Gilgit-Baltistan", cities: ["Gilgit", "Skardu", "Hunza"] },
      { title: "Islamabad Capital Territory", cities: ["Islamabad", "Bahria Town", "DHA Islamabad"], capital: true },
    ],
    viewAll: { label: "All areas in Pakistan", href: "#" },
  },
  {
    label: "Insights",
    href: "#",
    dropdown: [
      { label: "About Us", href: "/about-us", icon: ICON_ABOUT, tagline: "Trusted planning, joyful weddings." },
      { label: "Contact Us", href: "/contact-us", icon: ICON_CONTACT, tagline: "Talk to our wedding team." },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifPage, setNotifPage] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const totalPages = Math.ceil(NOTIFICATIONS.length / NOTIF_PER_PAGE);
  const pageItems = NOTIFICATIONS.slice(notifPage * NOTIF_PER_PAGE, notifPage * NOTIF_PER_PAGE + NOTIF_PER_PAGE);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("pageshow", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pageshow", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isNotifOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotifOpen]);

  useEffect(() => {
    const read = () => setIsLoggedIn(localStorage.getItem("bandhan_auth") === "1");
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 w-full border-b border-[#132743]/10 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 shadow-[0_8px_20px_5px_rgba(0,0,0,0.15)] backdrop-blur-lg"
          : "bg-white/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-7 lg:py-4">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-10 lg:gap-28">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Bandhan — go to home"
            className="flex items-center gap-2 rounded-md outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#d73853]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Logo.png" alt="Bandhan" className="h-14 w-auto object-contain" />
          </Link>

          {/* Nav links (text only) */}
          <nav className="hidden items-center gap-8 text-base font-normal text-[#132743] lg:flex">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 transition-colors group-hover:text-[#d73853]"
                >
                  {item.label}
                  <Icon
                    path={ICONS.chevron}
                    className="size-4 transition-transform duration-300 group-hover:rotate-180"
                  />
                </Link>

                {/* White dropdown box (opens on hover) */}
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {item.areas ? (
                    /* Areas mega-menu — provinces + separate capital territory */
                    <div className="w-190 rounded-2xl border border-zinc-100 bg-white p-5 shadow-xl">
                      <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                        {item.areas
                          .filter((g) => !g.capital)
                          .map((group) => (
                            <div key={group.title}>
                              <div className="mb-2.5 flex items-center gap-1.5">
                                <Icon path={ICONS.pin} className="size-4 text-[#d73853]" />
                                <h3 className="text-sm font-semibold text-[#132743]">{group.title}</h3>
                              </div>
                              <ul className="space-y-2">
                                {group.cities.map((c) => (
                                  <li key={c}>
                                    <a href="#" className="text-sm text-zinc-500 transition-colors hover:text-[#d73853]">
                                      {c}
                                    </a>
                                  </li>
                                ))}
                                <li>
                                  <a href="#" className="text-sm font-medium text-[#d73853] hover:underline">
                                    View All
                                  </a>
                                </li>
                              </ul>
                            </div>
                          ))}
                      </div>

                      {/* Capital territory — shown separately */}
                      {item.areas
                        .filter((g) => g.capital)
                        .map((group) => (
                          <div
                            key={group.title}
                            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl bg-[#fff2f2] px-4 py-3"
                          >
                            <div className="flex items-center gap-1.5">
                              <Icon path={ICONS.pin} className="size-4 text-[#d73853]" />
                              <h3 className="text-sm font-semibold text-[#132743]">{group.title}</h3>
                            </div>
                            {group.cities.map((c) => (
                              <a key={c} href="#" className="text-sm text-zinc-600 transition-colors hover:text-[#d73853]">
                                {c}
                              </a>
                            ))}
                          </div>
                        ))}

                      {item.viewAll && (
                        <a
                          href={item.viewAll.href}
                          className="mt-4 flex items-center gap-1.5 border-t border-zinc-100 pt-3 text-sm font-semibold text-[#132743] transition-all hover:gap-2.5 hover:text-[#d73853]"
                        >
                          {item.viewAll.label}
                          <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" className="size-2.5">
                            <path
                              d="M4.99 0.75L8.75 4.75M8.75 4.75L4.99 8.75M8.75 4.75L0.75 4.75"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  ) : item.dropdown.length > 0 ? (
                    /* Rich card menu (icon + title + arrow + tagline) */
                    <div
                      className={`rounded-2xl border border-zinc-100 bg-white p-3 shadow-xl ${
                        item.dropdown.length > 6 ? "w-155" : "min-w-82.5"
                      }`}
                    >
                      <div className={item.dropdown.length > 6 ? "grid grid-cols-2 gap-1" : ""}>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="group/item flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-zinc-50"
                        >
                          <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-[#d73853] shadow-sm ring-1 ring-zinc-100 transition-colors duration-200 group-hover/item:bg-[#d73853] group-hover/item:text-white">
                            {sub.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={sub.image} alt={sub.label} className="size-full object-cover" />
                            ) : (
                              sub.icon
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex w-full items-center gap-1.5 transition-all group-hover/item:justify-between">
                              <span className="text-base font-semibold text-[#132743]">{sub.label}</span>
                              <svg
                                viewBox="0 0 10 10"
                                fill="none"
                                aria-hidden="true"
                                className="size-2.5 text-zinc-400 transition-all duration-300 group-hover/item:-rotate-45 group-hover/item:text-[#d73853]"
                              >
                                <path
                                  d="M4.99 0.75L8.75 4.75M8.75 4.75L4.99 8.75M8.75 4.75L0.75 4.75"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            {sub.tagline && (
                              <span className="mt-0.5 block text-sm text-zinc-500">{sub.tagline}</span>
                            )}
                          </span>
                        </Link>
                      ))}
                      </div>
                      {item.viewAll && (
                        <a
                          href={item.viewAll.href}
                          className="mt-1.5 flex items-center justify-center gap-1.5 border-t border-zinc-100 pt-3 text-sm font-semibold text-[#d73853] transition-all hover:gap-2.5"
                        >
                          {item.viewAll.label}
                          <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" className="size-2.5">
                            <path
                              d="M4.99 0.75L8.75 4.75M8.75 4.75L4.99 8.75M8.75 4.75L0.75 4.75"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  ) : (
                    /* Empty placeholder */
                    <div className="min-w-56 rounded-xl border border-zinc-100 bg-white p-2 shadow-lg">
                      <p className="px-3 py-2 text-sm text-zinc-400">Coming soon</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Get Started CTA (logged-out) or bell + profile (logged-in) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isLoggedIn && (
            <Link
              href="/auth/signup"
              className="flex items-center gap-2.5 rounded-lg bg-[#d73853] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c02f48]"
            >
              <span>Get Started</span>
              <GetStartedIcon />
            </Link>
          )}
          {isLoggedIn && (
            <>
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setIsNotifOpen((o) => !o)}
              className={`relative flex size-10 items-center justify-center rounded-lg transition-all hover:bg-zinc-100 hover:text-[#d73853] ${
                isNotifOpen ? "bg-zinc-100 text-[#d73853]" : "text-[#132743]"
              }`}
            >
              <Icon path={ICONS.bell} className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 size-2 rounded-full bg-[#d73853] ring-2 ring-white" />
              )}
            </button>

            {/* Notifications panel */}
            {isNotifOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-96 overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-2xl shadow-zinc-900/10">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#132743]">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-[#d73853] px-2 py-0.5 text-[11px] font-bold leading-none text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="Options"
                    className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-[#132743]"
                  >
                    <Icon path={ICONS.dots} className="size-5" />
                  </button>
                </div>

                {/* List */}
                <div className="scrollbar-modern max-h-96 overflow-y-auto p-2">
                  {pageItems.map((n) => {
                    const s = NOTIF_STYLES[n.type] ?? NOTIF_STYLES.reminder;
                    return (
                      <button
                        key={n.title + n.time}
                        type="button"
                        className={`flex w-full gap-3 rounded-xl p-3 text-left transition-colors hover:bg-zinc-50 ${
                          n.unread ? "bg-[#f6f8ff]" : ""
                        }`}
                      >
                        <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${s.tile}`}>
                          <Icon path={s.icon} className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-start gap-2">
                            <span className="flex-1 text-sm font-semibold leading-snug text-[#132743]">{n.title}</span>
                            {n.unread && <span className="mt-1 size-2 shrink-0 rounded-full bg-[#d73853]" />}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-zinc-500">{n.desc}</span>
                          <span className="mt-1.5 block text-[11px] font-medium text-zinc-400">{n.time}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Pagination footer */}
                <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setNotifPage((p) => Math.max(0, p - 1))}
                    disabled={notifPage === 0}
                    className="flex items-center gap-1 font-medium text-[#132743] transition-colors hover:text-[#d73853] disabled:cursor-not-allowed disabled:text-zinc-300"
                  >
                    <Icon path="M15 6l-6 6 6 6" className="size-4" />
                    Previous
                  </button>
                  <span className="text-xs font-medium text-zinc-500">
                    {notifPage + 1} / {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotifPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={notifPage >= totalPages - 1}
                    className="flex items-center gap-1 font-medium text-[#132743] transition-colors hover:text-[#d73853] disabled:cursor-not-allowed disabled:text-zinc-300"
                  >
                    Next
                    <Icon path="M9 6l6 6-6 6" className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="Profile"
            className="size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-200 transition-all hover:ring-2 hover:ring-[#d73853]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/80" alt="Profile" className="size-full object-cover" />
          </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
