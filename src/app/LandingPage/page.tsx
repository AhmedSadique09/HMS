"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
/* This page's glyphs are filled paths, so the solid renderer is the match. */
import { SolidIcon as Icon } from "@/components/elements/Icon";
import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";
import { FEATURED_VENUES } from "@/data/venues";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/* ================================================================== */
/* Shared helpers                                                      */
/* ================================================================== */

const ICONS = {
  rings:
    "M9 7a5 5 0 1 0 3.5 8.5A5 5 0 1 0 15 7a5 5 0 0 0-3 1 5 5 0 0 0-3-1Zm0 2c.35 0 .69.05 1 .14A5 5 0 0 0 9 12a5 5 0 0 0 1 2.86A3 3 0 1 1 9 9Zm6 0a3 3 0 1 1-1 5.86A5 5 0 0 0 15 12a5 5 0 0 0-1-2.86c.31-.09.65-.14 1-.14Z",
  pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z",
  smile:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM7.5 14h9a4.5 4.5 0 0 1-9 0Z",
  crown:
    "M3 7l4 4 5-6 5 6 4-4-2 12H5L3 7Zm2.6 10h12.8l.5-3H5.1l.5 3Z",
  lock: "M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Z",
  heart:
    "M12 21s-7.5-4.7-10-9.3C.7 9 1.6 5.6 4.6 4.6 6.6 4 8.7 4.7 10 6.3L12 8.6l2-2.3c1.3-1.6 3.4-2.3 5.4-1.7 3 1 3.9 4.4 2.6 7.1C19.5 16.3 12 21 12 21Z",
  chat: "M4 4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3v3l4-3h7a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Z",
  search:
    "M11 4a7 7 0 1 0 4.2 12.6l4.1 4.1a1 1 0 0 0 1.4-1.4l-4.1-4.1A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z",
  arrowRight: "M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5Z",
  arrowLeft: "M11 5 4 12l7 7 1.4-1.4L7.8 13H20v-2H7.8l4.6-4.6L11 5Z",
  play: "M8 5v14l11-7L8 5Z",
  apple:
    "M16 2c.1 1-.3 2-1 2.7-.7.8-1.8 1.4-2.8 1.3-.1-1 .4-2 1-2.7C13.9 2.5 15 2 16 2Zm3.2 15.3c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.3 3.1-4 3.1-1.4 0-1.8-.9-3.7-.9s-2.4.9-3.7.9c-1.7 0-3-1.6-4-3C-.6 18-.9 13.5 1 11c1-1.4 2.5-2.2 4-2.2 1.6 0 2.6 1 3.9 1s2.1-1 4-1c1.3 0 2.7.7 3.7 2-3.3 1.8-2.8 6.5 2.6 6.5Z",
  camera:
    "M9 3 7.2 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3H9Zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z",
  brush: "M7 14a3 3 0 0 0-3 3c0 1.3-.5 2-1 2.5 1 .7 2.3 1 3.5 1a3.5 3.5 0 0 0 3.5-3.5A3 3 0 0 0 7 14Zm2.4-2.6 8-8a2 2 0 0 1 3 3l-8 8-3-3Z",
  sofa: "M4 9V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a3 3 0 0 0-2 3v1H6v-1a3 3 0 0 0-2-3Zm-2 4a2 2 0 0 1 4 0v3h12v-3a2 2 0 0 1 4 0v5h-2v2h-2v-2H6v2H4v-2H2v-5Z",
  utensils:
    "M8 2v7a2 2 0 0 1-2 2v11H4V11a2 2 0 0 1-2-2V2h2v6h1V2h1v6h1V2h1Zm8 0c-1.66 0-3 2.24-3 5 0 2.4 1.02 4.4 2.4 4.9L15 22h2l-.4-10.1C17.98 11.4 19 9.4 19 7c0-2.76-1.34-5-3-5Z",
  car: "M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11a2 2 0 0 1 2 2v4h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3v-4a2 2 0 0 1 2-2Zm2.1 0h9.8l-1-3H8.1l-1 3Z",
  envelope:
    "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm2.4-.2 6.6 4.7 6.6-4.7A.98.98 0 0 0 18 5H6c-.22 0-.43.07-.6.2Z",
  tag: "M2 11.6V4a2 2 0 0 1 2-2h7.6a2 2 0 0 1 1.4.6l8.4 8.4a2 2 0 0 1 0 2.8l-7.6 7.6a2 2 0 0 1-2.8 0L2.6 13a2 2 0 0 1-.6-1.4ZM7 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
};

/* ================================================================== */
/* Data                                                                */
/* ================================================================== */

/* Full-bleed hero background (wedding scene). */
/* Hero background slideshow */
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=80",
];
const HERO_SLIDE_MS = 5000;

/* Featured banquets & marquees — cards link through to /venues/[slug].
   Records live in @/data/venues so the slider and the profile page stay in sync. */

/* Service options (same set as the header Services menu) */
const SERVICE_MENU = [
  { label: "Photographers", image: "/venues/Weedingcuuple.png", tagline: "Timeless moments captured." },
  { label: "Bridal Makeup", image: "/venues/bridal%20makeup.png", tagline: "Flawless bridal looks." },
  { label: "Decoration", image: "/venues/Decorators.png", tagline: "Stunning event styling." },
  { label: "Henna Artist", image: "/venues/mhendiartist.png", tagline: "Intricate mehndi artistry." },
  { label: "Catering", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=120&h=120&fit=crop&q=80", tagline: "Exquisite wedding cuisine." },
  { label: "Wedding Invitations", image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=120&h=120&fit=crop&q=80", tagline: "Elegant custom stationery." },
  { label: "Car Rental", image: "/venues/carrental.png", tagline: "Luxury wedding rides." },
  { label: "Corporate Events", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=120&h=120&fit=crop&q=80", tagline: "Seamless corporate functions." },
  { label: "Singer / Bands", image: "/venues/musicians.png", tagline: "Live musical performances." },
  { label: "Choreographers", image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=120&h=120&fit=crop&q=80", tagline: "Choreographed dance sets." },
  { label: "Lighting & Ambiance", image: "/venues/lightning.png", tagline: "Immersive lighting design." },
];

/* City menu — region (with landmark image) → its cities (hover to reveal) */
const CITY_MENU = [
  {
    region: "Islamabad",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Ali_Mujtaba_WLM2017_FAISAL_MOSQUE_019.jpg/330px-Ali_Mujtaba_WLM2017_FAISAL_MOSQUE_019.jpg",
    cities: ["Islamabad", "Bahria Town", "DHA Islamabad"],
  },
  {
    region: "Punjab",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Badshahi_Mosque_front_picture.jpg/330px-Badshahi_Mosque_front_picture.jpg",
    cities: ["Lahore", "Rawalpindi", "Faisalabad", "Multan", "Gujranwala", "Sialkot"],
  },
  {
    region: "Sindh",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PK_Karachi_asv2020-02_img52_Mazar-e-Quaid.jpg/330px-PK_Karachi_asv2020-02_img52_Mazar-e-Quaid.jpg",
    cities: ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
  },
  {
    region: "Balochistan",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Quaid_e_Azam_Residency_Ziarat.jpg/330px-Quaid_e_Azam_Residency_Ziarat.jpg",
    cities: ["Quetta", "Gwadar", "Turbat"],
  },
  {
    region: "Khyber Pakhtunkhwa",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Islamia_College_Peshawar_%28Public_Sector_University%29%2C_Khyber_Pakhtunkhwa%2C_Pakistan_cropped.jpg/330px-Islamia_College_Peshawar_%28Public_Sector_University%29%2C_Khyber_Pakhtunkhwa%2C_Pakistan_cropped.jpg",
    cities: ["Peshawar", "Abbottabad", "Mardan", "Swat"],
  },
  {
    region: "Gilgit-Baltistan",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Hunza_Valley_HDR.jpg/330px-Hunza_Valley_HDR.jpg",
    cities: ["Gilgit", "Skardu", "Hunza"],
  },
  {
    region: "Azad Kashmir",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Neelum_Valley%2C_Azad_Jammu_%26_Kashmir%2C_Pakistan.jpg/330px-Neelum_Valley%2C_Azad_Jammu_%26_Kashmir%2C_Pakistan.jpg",
    cities: ["Muzaffarabad", "Mirpur", "Rawalakot"],
  },
];

/* Bento grid — span/large/size drive each tile's footprint and emphasis. */
const SERVICES = [
  { name: "Wedding Venues", subtitle: "Halls, lawns & marquees", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80", span: "col-span-2 row-span-2", large: true, size: "text-2xl md:text-3xl", href: "#" },
  { name: "Photographers", subtitle: "", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80", span: "md:col-span-2", large: false, size: "text-xl", href: "#" },
  { name: "Bridal Makeup", subtitle: "", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80", span: "", large: false, size: "text-lg", href: "#" },
  { name: "Decor", subtitle: "", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", span: "", large: false, size: "text-lg", href: "#" },
  { name: "Catering", subtitle: "", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80", span: "", large: false, size: "text-lg", href: "#" },
  { name: "Henna Artists", subtitle: "", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80", span: "", large: false, size: "text-lg", href: "#" },
  { name: "Car Rental", subtitle: "", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80", span: "md:col-span-2", large: false, size: "text-xl", href: "#" },
  { name: "Wedding Stationery", subtitle: "Invites & cards", image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1600&q=80", span: "col-span-2 md:col-span-4", large: false, size: "text-xl", href: "#" },
];

const DEALS = [
  { vendor: "Pearl Orchards", offer: "10% Off", note: "on food/menu for members", tint: "from-rose-700 to-rose-900" },
  { vendor: "Sajjad Shabbir Photography", offer: "Flat 20% Discount", note: "on all packages", tint: "from-slate-700 to-slate-900" },
  { vendor: "The Sizzling Catering", offer: "20% Discount", note: "on bulk orders", tint: "from-amber-700 to-orange-900" },
  { vendor: "North Marriage Garden-Hall", offer: "20% Discount", note: "on hall booking", tint: "from-emerald-700 to-teal-900" },
  { vendor: "Fordress Event Complex", offer: "10–15% Off", note: "Jan–Feb bookings", tint: "from-fuchsia-700 to-purple-900" },
  { vendor: "Deenar Sari House", offer: "10% Discount", note: "on bridal wear", tint: "from-pink-700 to-rose-900" },
];

const STATS = [
  { icon: ICONS.smile, value: "50k+", label: "Happy Users" },
  { icon: ICONS.crown, value: "12k+", label: "Verified Vendors" },
  { icon: ICONS.lock, value: "100%", label: "Secure Payment" },
  { icon: ICONS.rings, value: "30k+", label: "Weddings Planned" },
];

const TESTIMONIALS = [
  {
    name: "Fatima Waseem",
    quote:
      "I couldn't have planned my wedding without Bandhan. The team was so cooperative with every little question, right up to the big day. I loved them — I'd choose Bandhan as my planner a thousand times over.",
  },
  {
    name: "Ayesha & Hamza",
    quote:
      "From our Mehndi to the Rukhsati, every moment felt curated for us. Bandhan turned a chaotic season into pure celebration — our families are still talking about it.",
  },
  {
    name: "Zainab Ali",
    quote:
      "Elegant, calm, and endlessly creative. Bandhan understood the balance between tradition and our modern taste — the Nikkah setup was something out of a dream.",
  },
];

const BLOGS = [
  {
    tag: "Tradition",
    tagClass: "bg-[#d73853] text-white",
    title: "Best Dholki Songs in 2026: A Complete List for Your Mehndi Night",
    date: "June 24, 2026",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    alt: "Traditional Pakistani Mehndi ceremony with crimson drapes and golden lights",
  },
  {
    tag: "Inspiration",
    tagClass: "bg-[#132743] text-white",
    title: "Heartfelt Wedding Anniversary Wishes for Couples",
    date: "June 15, 2026",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    alt: "Outdoor wedding anniversary table with amber glassware at golden hour",
  },
  {
    tag: "Guide",
    tagClass: "bg-[#d7385e] text-white",
    title: "50+ Best Wedding Wishes in Pakistan (2026): Nikkah Duas & More",
    date: "June 12, 2026",
    img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    alt: "Serene Nikkah ceremony with lavender florals under a translucent canopy",
  },
];

/* ================================================================== */
/* Landing page                                                        */
/* ================================================================== */
export default function LandingPage() {
  /* Hero background slideshow — pauses when the tab is hidden or motion is reduced */
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      if (document.hidden) return;
      setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, HERO_SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  /* Hero search state */
  const [activeTab, setActiveTab] = useState<"service" | "name">("service");
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);

  /* Popular Deals slider */
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollByCard = (dir: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    // Scroll by roughly one card + gap so a full card snaps into view.
    const firstCard = track.querySelector<HTMLElement>("[data-deal-card]");
    const step = firstCard ? firstCard.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  /* Featured venues slider */
  const venuesRef = useRef<HTMLDivElement>(null);
  const scrollVenues = (dir: "left" | "right") => {
    const track = venuesRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>("[data-venue-card]");
    const step = firstCard ? firstCard.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  /* Testimonial carousel */
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const testimonial = TESTIMONIALS[testimonialIdx];
  const prevTestimonial = () =>
    setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);

  /* Decorative QR-code module pattern (deterministic placeholder) */
  const QR_N = 21;
  const qrModules: { r: number; c: number }[] = [];
  for (let r = 0; r < QR_N; r++) {
    for (let c = 0; c < QR_N; c++) {
      const inFinder =
        (r < 7 && c < 7) || (r < 7 && c >= QR_N - 7) || (r >= QR_N - 7 && c < 7);
      if (inFinder) continue;
      if ((r * 3 + c * 5 + r * c * 2) % 3 === 0) qrModules.push({ r, c });
    }
  }
  const qrFinders = [
    { x: 0, y: 0 },
    { x: QR_N - 7, y: 0 },
    { x: 0, y: QR_N - 7 },
  ];

  return (
    <main className={`${inter.variable} min-h-screen bg-white font-(family-name:--font-inter)`}>
      <Header />

      {/* ============================================================ */}
      {/* Hero — Plan the Shadi of your dreams                          */}
      {/* ============================================================ */}
      <section className="relative z-30 flex min-h-[72dvh] items-start justify-center">
        {/* Full-bleed background — cross-fading slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img}
              aria-hidden
              className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                i === heroIdx ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}
          {/* Brand-tinted overlay for text contrast */}
          <div className="absolute inset-0 bg-linear-to-b from-[#132743]/75 via-[#132743]/45 to-[#132743]/90" />
        </div>

        <div className="relative z-20 w-full max-w-5xl px-4 pb-20 pt-14 text-center sm:px-6 sm:pt-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#ff8fa3] sm:text-sm">
            Bandhan Weddings
          </p>
          <h1 className="mx-auto mb-9 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-6xl">
            Plan the <span className="italic text-[#ff8fa3]">Shadi</span> of your dreams
          </h1>

          {/* Glass search panel */}
          <div className="mx-auto w-full max-w-4xl rounded-4xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            {/* Tabs */}
            <div className="mb-4 flex justify-center gap-8">
              <button
                onClick={() => setActiveTab("service")}
                className="relative cursor-pointer pb-2 text-[15px]"
                style={{
                  color: activeTab === "service" ? "#ffffff" : "rgba(255,255,255,0.6)",
                  fontWeight: activeTab === "service" ? 700 : 400,
                }}
              >
                Service &amp; City
                {activeTab === "service" && (
                  <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full" style={{ background: "#ff8fa3" }} />
                )}
              </button>
              <button
                onClick={() => setActiveTab("name")}
                className="relative cursor-pointer pb-2 text-[15px]"
                style={{
                  color: activeTab === "name" ? "#ffffff" : "rgba(255,255,255,0.6)",
                  fontWeight: activeTab === "name" ? 700 : 400,
                }}
              >
                Search By Name
                {activeTab === "name" && (
                  <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full" style={{ background: "#ff8fa3" }} />
                )}
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative flex items-center rounded-full border border-white/40 bg-white" style={{ height: "56px" }}>
              {activeTab === "service" ? (
                <>
                  {/* Select Service (opens services popup) */}
                  <div className="relative flex h-full flex-1 items-center">
                    <button
                      type="button"
                      onClick={() => setIsServiceOpen((o) => !o)}
                      className="flex h-full w-full items-center justify-between px-5 text-left"
                    >
                      <span className={`text-[14px] ${selectedService ? "font-medium text-[#132743]" : "text-gray-400"}`}>
                        {selectedService ?? "Select Service"}
                      </span>
                    </button>

                    {isServiceOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsServiceOpen(false)} />
                        <div className="absolute left-0 top-full z-50 mt-3 w-155 rounded-2xl border border-zinc-100 bg-white p-3 shadow-xl">
                          <div className="grid grid-cols-2 gap-1">
                            {SERVICE_MENU.map((s) => (
                              <button
                                key={s.label}
                                type="button"
                                onClick={() => {
                                  setSelectedService(s.label);
                                  setIsServiceOpen(false);
                                }}
                                className="group/item flex items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-zinc-50"
                              >
                                <span className="size-14 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={s.image} alt={s.label} className="size-full object-cover" />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="flex w-full items-center gap-1.5 transition-all group-hover/item:justify-between">
                                    <span className="text-base font-semibold text-[#132743]">{s.label}</span>
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
                                  <span className="mt-0.5 block text-sm text-zinc-500">{s.tagline}</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="h-6 w-px bg-gray-200" />

                  {/* Select City (region → cities hover popup) */}
                  <div className="relative flex h-full flex-1 items-center">
                    <button
                      type="button"
                      onClick={() => setIsCityOpen((o) => !o)}
                      className="flex h-full w-full items-center px-5 text-left"
                    >
                      <span className={`text-[14px] ${selectedCity ? "font-medium text-[#132743]" : "text-gray-400"}`}>
                        {selectedCity ?? "Select City"}
                      </span>
                    </button>

                    {isCityOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsCityOpen(false)} />
                        <div
                          onMouseLeave={() => setHoveredRegion(null)}
                          className="absolute left-0 top-full z-50 mt-3 flex rounded-2xl border border-zinc-100 bg-white shadow-xl"
                        >
                          {/* Left: regions with landmark image */}
                          <div className="w-72 p-2">
                            {CITY_MENU.map((r, i) => (
                              <button
                                key={r.region}
                                type="button"
                                onMouseEnter={() => setHoveredRegion(i)}
                                className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors ${
                                  hoveredRegion === i ? "bg-zinc-50" : "hover:bg-zinc-50"
                                }`}
                              >
                                <span className="size-9 shrink-0 overflow-hidden rounded-full bg-zinc-100 ring-1 ring-zinc-100">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={r.image} alt={r.region} className="size-full object-cover" />
                                </span>
                                <span className="flex-1 text-sm font-medium text-[#132743]">{r.region}</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4 text-zinc-300">
                                  <path d="m9 6 6 6-6 6" />
                                </svg>
                              </button>
                            ))}
                          </div>

                          {/* Right: cities of the hovered region — only while hovering a region */}
                          {hoveredRegion !== null && (
                            <div className="w-56 border-l border-zinc-100 p-3">
                              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                {CITY_MENU[hoveredRegion].region}
                              </p>
                              <div className="space-y-1">
                                {CITY_MENU[hoveredRegion].cities.map((c) => (
                                  <button
                                    key={c}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCity(c);
                                      setIsCityOpen(false);
                                    }}
                                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[#132743] transition-colors hover:bg-zinc-50 hover:text-[#d73853]"
                                  >
                                    {c}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-1 items-center px-5">
                  <span className="text-[14px] text-gray-400">Search by business name</span>
                </div>
              )}

              {/* Search Button */}
              <div className="pr-1.5">
                <button
                  className="flex h-11 cursor-pointer items-center gap-2 rounded-full px-6 text-[14px] font-medium text-white transition hover:brightness-110"
                  style={{ background: "#d73853" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-3.75"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Featured venues — Airbnb-style slider                        */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#d73853]">
              Featured
            </span>
            <h2 className="text-3xl font-bold text-[#132743] md:text-5xl">Banquets &amp; marquees</h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button
              type="button"
              aria-label="Previous venues"
              onClick={() => scrollVenues("left")}
              className="flex size-11 items-center justify-center rounded-full border border-[#d73853]/40 text-[#d73853] transition-all hover:bg-[#d73853] hover:text-white"
            >
              <Icon path={ICONS.arrowLeft} className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next venues"
              onClick={() => scrollVenues("right")}
              className="flex size-11 items-center justify-center rounded-full border border-[#d73853]/40 text-[#d73853] transition-all hover:bg-[#d73853] hover:text-white"
            >
              <Icon path={ICONS.arrowRight} className="size-5" />
            </button>
          </div>
        </div>

        <div ref={venuesRef} className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2">
          {FEATURED_VENUES.map((v) => (
            <Link
              key={v.slug}
              href={`/venues/${v.slug}`}
              data-venue-card
              className="group w-72 shrink-0 snap-start sm:w-80"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <div
                  role="img"
                  aria-label={v.name}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${v.image}')` }}
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#132743] backdrop-blur">
                  {v.type}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[#132743]">{v.name}</h3>
                  <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#132743]">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#d73853]">
                      <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
                    </svg>
                    {v.rating}
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-zinc-500">
                  <Icon path={ICONS.pin} className="size-4" />
                  {v.location}
                </p>
                <p className="mt-1.5 text-sm text-zinc-700">
                  <span className="font-semibold text-[#132743]">{v.price}</span> / event
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* Find every wedding service — bento grid                      */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-col items-end justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-[#132743] md:text-5xl">Find every wedding service</h2>
          </div>
        </div>

        <div className="grid auto-rows-[200px] grid-flow-dense grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4">
          {SERVICES.map((s) => (
            <a
              key={s.name}
              href={s.href}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5 ${s.span}`}
            >
              {/* Full-bleed image with hover zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${s.image}')` }}
              />
              {/* Overlay — brand gradient on the feature tile, dark veil elsewhere */}
              <div
                className={`absolute inset-0 ${
                  s.large
                    ? "bg-linear-to-t from-[#d73853]/85 via-[#132743]/25 to-transparent"
                    : "bg-black/35 transition-colors group-hover:bg-black/20"
                }`}
              />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className={`font-bold text-white drop-shadow-sm ${s.size}`}>{s.name}</h3>
                {s.subtitle && <p className="mt-1 text-sm text-white/80">{s.subtitle}</p>}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* Popular Deals — slider                                       */}
      {/* ============================================================ */}
      <section className="border-t border-[#132743]/10 bg-[#f7f7f7] py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          {/* Header: eyebrow + title + chevron controls */}
          <div className="mb-12 flex items-center justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#d73853]">
                Limited Time
              </span>
              <h2 className="text-3xl font-bold text-[#132743] md:text-5xl">Popular Deals</h2>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                aria-label="Previous deals"
                onClick={() => scrollByCard("left")}
                className="flex size-12 items-center justify-center rounded-full border border-[#d73853]/40 text-[#d73853] transition-all hover:bg-[#d73853] hover:text-white"
              >
                <Icon path={ICONS.arrowLeft} className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next deals"
                onClick={() => scrollByCard("right")}
                className="flex size-12 items-center justify-center rounded-full border border-[#d73853]/40 text-[#d73853] transition-all hover:bg-[#d73853] hover:text-white"
              >
                <Icon path={ICONS.arrowRight} className="size-5" />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div
            ref={trackRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3"
          >
            {DEALS.map((d) => (
              <div
                key={d.vendor}
                data-deal-card
                className={`group relative flex h-80 w-[86%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br p-8 text-white shadow-xl ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)] ${d.tint}`}
              >
                {/* readability veil */}
                <div className="absolute inset-0 bg-black/25" />
                {/* watermark tag icon */}
                <Icon
                  path={ICONS.tag}
                  className="pointer-events-none absolute -bottom-4 -right-4 size-30 rotate-12 text-white/10 transition-transform group-hover:scale-125"
                />

                <div className="relative flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                    {d.vendor}
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-md">
                    Deal
                  </span>
                </div>

                <div className="relative">
                  <h4 className="mb-2 text-[40px] font-extrabold leading-tight drop-shadow-sm">{d.offer}</h4>
                  <p className="mb-6 text-sm text-white/80">{d.note}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:underline">
                    Grab deal
                    <Icon path={ICONS.arrowRight} className="size-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Why Bandhan?                                                 */}
      {/* ============================================================ */}
      <section className="mx-auto mb-24 max-w-8xl px-4 py-14 text-center sm:px-6">
        <h2 className="mb-10 text-3xl font-bold tracking-tight text-[#132743] md:text-5xl">Why Bandhan?</h2>
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-4xl border border-[#f3d9df] bg-white/60 p-8 shadow-[0_8px_32px_rgba(215,56,83,0.06)] backdrop-blur md:flex-row md:items-center md:gap-0 md:p-12">
          <div className="absolute -left-24 -top-24 -z-10 size-64 rounded-full bg-[#fde5ec] blur-3xl" />
          <div className="absolute -bottom-24 -right-24 -z-10 size-64 rounded-full bg-[#fbd0dc]/60 blur-3xl" />
          {STATS.map((s, i) => (
            <Fragment key={s.label}>
              <div className="flex flex-col items-center justify-center p-6 transition-transform duration-300 hover:scale-105 md:flex-1">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#ffe9e9] text-[#d73853]">
                  <Icon path={s.icon} className="size-6" />
                </div>
                <span className="text-4xl font-bold text-[#d73853] md:text-5xl">{s.value}</span>
                <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#5c4148]">
                  {s.label}
                </span>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden h-32 w-px self-center bg-linear-to-b from-transparent via-[#f3d9df] to-transparent md:block" />
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* Get the Bandhan app                                          */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-8xl px-4 py-8 sm:px-6">
        {/* Class values mirror the source DOM; its custom breakpoints
            (tablet / laptop / largeDesktop) are mapped to this project's md / lg / xl. */}
        <div className="relative mx-auto flex w-[90%] max-w-250 items-center justify-between overflow-hidden rounded-2xl bg-[#ffe9e9] px-8 py-6 md:w-[80%] md:overflow-visible xl:px-10 xl:pr-16 xl:py-8">
          {/* Phone — absolute, rotated, centred vertically so it bleeds above and below */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-40%] right-[-10%] rotate-[-15deg] md:bottom-auto md:right-auto md:left-[52%] md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <div className="aspect-9/19 w-44 rounded-[36px] border-[6px] border-[#132743] bg-[#132743] shadow-2xl lg:w-48">
              <div className="flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-white">
                {/* app header */}
                <div className="bg-[#132743] px-3 pb-3 pt-4 text-white">
                  <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/30" />
                  <p className="text-[10px] font-semibold">My wedding</p>
                  <div className="mt-1.5 flex items-center gap-1 rounded-full bg-white/15 px-2 py-1">
                    <div className="size-2 rounded-full bg-white/50" />
                    <div className="h-1 w-16 rounded-full bg-white/30" />
                  </div>
                </div>
                {/* category tiles */}
                <div className="grid grid-cols-4 gap-1.5 px-3 pt-3">
                  {["#fbd0dc", "#fde5ec", "#fce9d4", "#f3d9df", "#ffe1e6", "#fde7d6", "#f6dbe0", "#e9d9f3"].map((c, i) => (
                    <div key={i} className="aspect-square rounded-lg" style={{ background: c }} />
                  ))}
                </div>
                {/* deals */}
                <p className="mt-3 px-3 text-[8px] font-semibold text-[#132743]">Exclusive Deals</p>
                <div className="mt-1 grid grid-cols-2 gap-1.5 px-3">
                  <div className="flex h-12 items-end rounded-lg bg-linear-to-br from-rose-500 to-rose-800 p-1.5">
                    <span className="text-[8px] font-bold text-white">10% Off</span>
                  </div>
                  <div className="flex h-12 items-end rounded-lg bg-linear-to-br from-slate-600 to-slate-900 p-1.5">
                    <span className="text-[8px] font-bold text-white">20% Off</span>
                  </div>
                </div>
                {/* recently viewed */}
                <p className="mt-3 px-3 text-[8px] font-semibold text-[#132743]">Recently Viewed</p>
                <div className="mt-1 grid grid-cols-2 gap-1.5 px-3 pb-3">
                  <div className="h-10 rounded-lg bg-[#f3d9df]" />
                  <div className="h-10 rounded-lg bg-[#fde5ec]" />
                </div>
              </div>
            </div>
          </div>

          {/* Copy + badges */}
          <div className="relative z-10 flex flex-col gap-4">
            <p className="text-2xl font-bold text-[#132743] xl:text-3xl">
              Get the <span className="text-[#d73853]">Bandhan</span> app
            </p>
            <p className="max-w-xs text-sm text-zinc-600 md:text-xs xl:text-sm">
              Search, compare and book wedding services faster in one app.
            </p>
            <div className="flex flex-col gap-2 md:flex-row md:gap-2">
              <a href="#" className="inline-flex items-center gap-2.5 rounded-xl bg-black px-4 py-2 text-white transition hover:bg-zinc-800">
                <Icon path={ICONS.play} className="size-6" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] text-white/70">GET IT ON</span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </a>
              <a href="#" className="inline-flex items-center gap-2.5 rounded-xl bg-black px-4 py-2 text-white transition hover:bg-zinc-800">
                <Icon path={ICONS.apple} className="size-6" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] text-white/70">Download on the</span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </a>
            </div>
          </div>

          {/* Scan QR — hidden until laptop */}
          <div className="relative z-10 hidden flex-row items-center gap-5 lg:flex">
            <p className="text-sm text-[#132743]">Scan the QR to get the app</p>
            <svg
              viewBox={`0 0 ${QR_N} ${QR_N}`}
              className="size-28 shrink-0 rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/5"
              aria-hidden="true"
              shapeRendering="crispEdges"
            >
              <rect width={QR_N} height={QR_N} fill="#fff" />
              {qrModules.map((m) => (
                <rect key={`${m.r}-${m.c}`} x={m.c} y={m.r} width={1} height={1} fill="#0f1115" />
              ))}
              {qrFinders.map((f) => (
                <Fragment key={`${f.x}-${f.y}`}>
                  <rect x={f.x} y={f.y} width={7} height={7} fill="#0f1115" />
                  <rect x={f.x + 1} y={f.y + 1} width={5} height={5} fill="#fff" />
                  <rect x={f.x + 2} y={f.y + 2} width={3} height={3} fill="#0f1115" />
                </Fragment>
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Review — testimonial carousel                                */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Visual */}
          <div className="relative flex h-80 items-center justify-center md:h-105">
            <div className="absolute size-64 rotate-6 animate-pulse rounded-4xl bg-[#ffe9e9] opacity-70 md:size-80" />
            <div className="absolute size-64 -rotate-3 rounded-4xl bg-[#fbd0dc] opacity-70 md:size-80" />
            <div className="relative z-10 flex size-24 items-center justify-center rounded-3xl bg-white text-[#d73853] shadow-xl transition-transform duration-500 hover:scale-105 md:size-32">
              <Icon path={ICONS.chat} className="size-12 md:size-16" />
            </div>
          </div>

          {/* Copy */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-[#132743] md:text-4xl">{testimonial.name}</h3>
              <div className="h-1 w-12 rounded-full bg-[#d73853]" />
            </div>
            <blockquote className="text-lg italic leading-relaxed text-zinc-600 md:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
              <span className="mt-4 flex gap-1 not-italic text-[#d73853]">
                <Icon path={ICONS.heart} className="size-4" />
                <Icon path={ICONS.heart} className="size-4" />
              </span>
            </blockquote>
            <div className="flex gap-4 pt-2">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="flex size-12 items-center justify-center rounded-full border border-[#d73853] text-[#d73853] transition-all hover:bg-[#d73853] hover:text-white active:scale-90"
              >
                <Icon path={ICONS.arrowLeft} className="size-5" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="flex size-12 items-center justify-center rounded-full border border-[#d73853] text-[#d73853] transition-all hover:bg-[#d73853] hover:text-white active:scale-90"
              >
                <Icon path={ICONS.arrowRight} className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Blogs                                                        */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-8xl space-y-8 px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-2xl text-3xl font-bold text-[#132743] md:text-5xl">
            Love, Lights &amp; Planning – Dive into Our Blogs
          </h2>
          <a
            href="#"
            className="group hidden shrink-0 items-center gap-2 font-semibold text-[#d73853] hover:underline sm:flex"
          >
            <span>View All</span>
            <Icon path={ICONS.arrowRight} className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {BLOGS.map((b) => (
            <a
              key={b.title}
              href="#"
              className="group overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <div
                  role="img"
                  aria-label={b.alt}
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${b.img}')` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />
                <div className="absolute left-4 top-4">
                  <span
                    className={`${b.tagClass} rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md`}
                  >
                    {b.tag}
                  </span>
                </div>
              </div>
              <div className="space-y-3 p-6">
                <h4 className="line-clamp-2 text-xl font-semibold text-[#132743] transition-colors group-hover:text-[#d73853]">
                  {b.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <span>{b.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
