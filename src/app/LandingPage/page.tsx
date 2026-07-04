"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import Button from "@/components/elements/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/* Brand tokens (exact from shadiyana.pk) --------------------------- */
/* pink #d73853 · magenta band #d7385e · heading navy #132743        */
const BTN_PRIMARY =
  "!bg-[#d73853] hover:!bg-[#c02f48] !text-white !border-transparent";
const BTN_OUTLINE =
  "!border-[#d73853] !text-[#d73853] hover:!bg-[#d73853] hover:!text-white";

/* Inline SVG glyph helper (decorative, not a reusable UI component).  */
function Icon({ path, className = "size-6" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d={path} />
    </svg>
  );
}

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
};

/* App-store download badge (Google Play / App Store). */
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

/* ================================================================== */
/* Hero — "Plan your Shadi in 3 minutes"                               */
/* ================================================================== */
const POPULAR_SEARCHES = ["Wedding Venues Lahore", "Wedding Venues Islamabad", "Makeup Artists Lahore"];

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

function Hero() {
  const [activeTab, setActiveTab] = useState<"service" | "name">("service");
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);

  return (
/* ================================================================== */
/* Plan Shadi of your dreams                                        */
/* ================================================================== */

    <section className="relative z-20 bg-[#ffe9e9] py-15">
      {/* Decorative corner motifs (placeholders for proprietary hero art) */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 size-28 rounded-tr-[3rem] bg-[#d73853]/20" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1 hidden items-end md:flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/coupledance.png" alt="" className="h-60 w-auto object-contain" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="mb-6 text-center text-[20px] font-semibold leading-tight text-[#132743] sm:text-[30px]">
          Plan the <span className="text-[#d73853]">Shadi</span> of your dreams
        </h1>

        {/* Search card */}
        <div className="mx-auto w-full max-w-6xl rounded-3xl bg-white px-6 py-6 shadow-md sm:px-8">
          {/* Tabs */}
          <div className="mb-5 flex gap-6">
            <button
              onClick={() => setActiveTab("service")}
              className="relative cursor-pointer pb-2 text-[15px]"
              style={{
                color: activeTab === "service" ? "#1e2d5a" : "#9ca3af",
                fontWeight: activeTab === "service" ? 700 : 400,
              }}
            >
              Service &amp; City
              {activeTab === "service" && (
                <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full" style={{ background: "#e0436a" }} />
              )}
            </button>
            <button
              onClick={() => setActiveTab("name")}
              className="relative cursor-pointer pb-2 text-[15px]"
              style={{
                color: activeTab === "name" ? "#1e2d5a" : "#9ca3af",
                fontWeight: activeTab === "name" ? 700 : 400,
              }}
            >
              Search By Name
              {activeTab === "name" && (
                <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full" style={{ background: "#e0436a" }} />
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex items-center rounded-full border border-gray-200" style={{ height: "52px" }}>
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
                className="flex h-10 cursor-pointer items-center gap-2 rounded-full px-5 text-[14px] text-white"
                style={{ background: "#e8718e" }}
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
  );
}

/* ================================================================== */
/* Find every wedding service                                          */
/* ================================================================== */
const SERVICES = [
  { name: "Wedding Venues", icon: ICONS.pin, tint: "bg-[#ffc778]/30", ring: "from-amber-300 to-orange-400" },
  { name: "Photographers", icon: ICONS.camera, tint: "bg-[#ffe7d3]", ring: "from-rose-300 to-rose-500" },
  { name: "Bridal Makeup", icon: ICONS.brush, tint: "bg-[#ff1b20]/15", ring: "from-fuchsia-300 to-pink-500" },
  { name: "Decor", icon: ICONS.sofa, tint: "bg-[#ffdac6]", ring: "from-emerald-300 to-teal-500" },
  { name: "Catering", icon: ICONS.utensils, tint: "bg-[#ffd3ba]", ring: "from-amber-300 to-orange-500" },
  { name: "Henna Artists", icon: ICONS.heart, tint: "bg-[#ffdac6]", ring: "from-lime-300 to-emerald-500" },
  { name: "Car Rental", icon: ICONS.car, tint: "bg-[#ffe7d3]", ring: "from-sky-300 to-blue-500" },
  { name: "Wedding Stationery", icon: ICONS.envelope, tint: "bg-[#ffc778]/30", ring: "from-violet-300 to-purple-500" },
];

function ServicesRow() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 className="text-center text-2xl font-semibold text-[#132743] sm:text-3xl">
        Find every wedding service
      </h2>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        {SERVICES.map((s) => (
          <a
            key={s.name}
            href="#"
            className={`flex items-center gap-3 rounded-full py-2 pl-2 pr-5 transition hover:-translate-y-0.5 hover:shadow-md ${s.tint}`}
          >
            <span className={`flex size-11 items-center justify-center rounded-full bg-linear-to-br text-white ${s.ring}`}>
              <Icon path={s.icon} className="size-5" />
            </span>
            <span className="text-sm font-semibold text-[#132743]">{s.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* Popular Deals                                                       */
/* ================================================================== */
const DEALS = [
  { vendor: "Pearl Orchards", offer: "10% Off", note: "on food/menu for members", tint: "from-rose-700 to-rose-900" },
  { vendor: "Sajjad Shabbir Photography", offer: "Flat 20% Discount", note: "on all packages", tint: "from-slate-700 to-slate-900" },
  { vendor: "The Sizzling Catering", offer: "20% Discount", note: "on bulk orders", tint: "from-amber-700 to-orange-900" },
  { vendor: "North Marriage Garden-Hall", offer: "20% Discount", note: "on hall booking", tint: "from-emerald-700 to-teal-900" },
  { vendor: "Fordress Event Complex", offer: "10–15% Off", note: "Jan–Feb bookings", tint: "from-fuchsia-700 to-purple-900" },
  { vendor: "Deenar Sari House", offer: "10% Discount", note: "on bridal wear", tint: "from-pink-700 to-rose-900" },
];

function PopularDeals() {
  return (
    <section className="bg-[#f7f7f7] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-[#132743] sm:text-3xl">Popular Deals</h2>
        <div className="scrollbar-hide mt-9 flex snap-x gap-4 overflow-x-auto pb-2">
          {DEALS.map((d) => (
            <a
              key={d.vendor}
              href="#"
              className={`relative flex h-40 w-64 shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br p-4 text-white shadow-lg ${d.tint}`}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative flex items-start justify-between">
                <span className="max-w-[9rem] text-xs font-semibold uppercase tracking-wide text-white/85">
                  {d.vendor}
                </span>
                <span className="rounded-full bg-[#d73853] px-2 py-0.5 text-[11px] font-bold">
                  {d.offer}
                </span>
              </div>
              <div className="relative">
                <p className="text-xl font-bold">{d.offer}</p>
                <p className="text-xs text-white/80">{d.note}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Why Shadiyana?                                                      */
/* ================================================================== */
const STATS = [
  { icon: ICONS.smile, value: "50k+", label: "Happy Users" },
  { icon: ICONS.crown, value: "12k+", label: "Verified Vendors" },
  { icon: ICONS.lock, value: "100%", label: "Secure Payment" },
  { icon: ICONS.rings, value: "30k+", label: "Weddings Planned" },
];

function WhyShadiyana() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 className="text-center text-2xl font-semibold text-[#132743] sm:text-3xl">Why Shadiyana?</h2>
      <div className="mt-9 rounded-3xl bg-[#d73853]/[0.06] px-6 py-10">
        <div className="grid grid-cols-2 items-center gap-8 lg:grid-cols-4 lg:divide-x lg:divide-rose-200">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-white text-[#d73853] shadow-sm">
                <Icon path={s.icon} className="size-6" />
              </span>
              <p className="mt-3 text-3xl font-bold text-[#132743]">{s.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Get the Shadiyana app                                               */
/* ================================================================== */
function AppSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-[#ffe9e9] px-6 py-10 sm:px-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-[#132743] sm:text-3xl">
            Get the <span className="text-[#d73853]">Shadiyana</span> app
          </h2>
          <p className="mt-3 max-w-md text-zinc-600">
            Search, compare and book wedding services faster in one app.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <StoreBadge icon={ICONS.play} top="GET IT ON" bottom="Google Play" />
            <StoreBadge icon={ICONS.apple} top="Download on the" bottom="App Store" />
          </div>
        </div>
        {/* phone mockup */}
        <div className="flex justify-center" aria-hidden="true">
          <div className="relative h-64 w-36 rounded-[2rem] border-8 border-[#132743] bg-white shadow-2xl">
            <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-[#132743]" />
            <div className="mt-6 grid grid-cols-2 gap-1.5 p-2">
              {["from-rose-300 to-rose-500", "from-amber-300 to-orange-500", "from-fuchsia-300 to-pink-500", "from-emerald-300 to-teal-500", "from-sky-300 to-blue-500", "from-violet-300 to-purple-500"].map((g, i) => (
                <div key={i} className={`h-16 rounded-lg bg-linear-to-br ${g}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Testimonial                                                         */
/* ================================================================== */
function TestimonialSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid items-center gap-8 lg:grid-cols-[0.7fr_1fr]">
        <div className="flex justify-center">
          <div className="flex h-44 w-64 items-center justify-center rounded-3xl bg-[#ffe9e9]">
            <span className="flex size-20 items-center justify-center rounded-2xl bg-white text-[#d73853] shadow-md">
              <Icon path={ICONS.chat} className="size-10" />
            </span>
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold text-[#132743]">Fatima Waseem</p>
          <p className="mt-3 max-w-xl text-zinc-600">
            &ldquo;I couldn&apos;t have planned my wedding without Shadiyana. The team was so
            cooperative with every little question, right up to the big day. I loved them —
            I&apos;d choose Shadiyana as my planner a thousand times over.&rdquo;
            <span className="ml-1 text-[#d73853]">
              <Icon path={ICONS.heart} className="inline size-4" />{" "}
              <Icon path={ICONS.heart} className="inline size-4" />
            </span>
          </p>
          <div className="mt-6 flex gap-2">
            <Button variant="outline" iconOnly rounded="full" aria-label="Previous" className={BTN_OUTLINE}>
              <Icon path={ICONS.arrowLeft} className="size-4" />
            </Button>
            <Button variant="outline" iconOnly rounded="full" aria-label="Next" className={BTN_OUTLINE}>
              <Icon path={ICONS.arrowRight} className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Blogs                                                               */
/* ================================================================== */
const BLOGS = [
  { title: "Best Dholki Songs in 2026: A Complete List for Your Mehndi Night", date: "June 24, 2026", tint: "from-rose-400 to-rose-700" },
  { title: "Heartfelt Wedding Anniversary Wishes for Couples", date: "June 15, 2026", tint: "from-amber-400 to-orange-700" },
  { title: "50+ Best Wedding Wishes in Pakistan (2026): Nikkah Duas & More", date: "June 12, 2026", tint: "from-fuchsia-400 to-purple-700" },
];

function BlogsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-[#132743] sm:text-2xl">
          Love, Lights &amp; Planning – Dive into Our Blogs
        </h2>
        <a href="#" className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#d73853] hover:underline">
          View All <Icon path={ICONS.arrowRight} className="size-4" />
        </a>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BLOGS.map((b) => (
          <a
            key={b.title}
            href="#"
            className="group overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`h-44 bg-linear-to-br ${b.tint}`} aria-hidden="true" />
            <div className="p-5">
              <h3 className="font-semibold text-[#132743] group-hover:text-[#d73853]">{b.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{b.date}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* Vendor CTA band                                                     */
/* ================================================================== */
function VendorBand() {
  return (
    <section className="bg-[#d7385e]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="max-w-lg text-4xl font-bold leading-tight text-white sm:text-5xl">
          Find the talent needed to arrange your wedding
        </h2>
        <div className="mt-8">
          <Button variant="outline" size="lg" rounded="full" className="!border-white !text-white hover:!bg-white hover:!text-[#d7385e]">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* City services                                                       */
/* ================================================================== */
const CITY_SERVICES = [
  "Wedding Services in Lahore",
  "Wedding Services in Islamabad",
  "Wedding Services in Karachi",
  "Wedding Services in Rawalpindi",
];
const SERVICE_LINKS = (city: string) => [
  `Wedding Venues in ${city}`,
  `Photographers in ${city}`,
  `Makeup Artists in ${city}`,
  `Caterers in ${city}`,
  `Decor in ${city}`,
  `Henna Artists in ${city}`,
];

function CityServices() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {CITY_SERVICES.map((heading) => {
          const city = heading.replace("Wedding Services in ", "");
          return (
            <div key={heading}>
              <h3 className="font-bold text-[#132743]">{heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {SERVICE_LINKS(city).map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 transition hover:text-[#d73853]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================== */
/* Page                                                                */
/* ================================================================== */
export default function ShadiyanaLanding() {
  return (
    <main className={`${inter.variable} min-h-screen bg-white font-[family-name:var(--font-inter)]`}>
      <Header />
      <Hero />
      <ServicesRow />
      <PopularDeals />
      <WhyShadiyana />
      <AppSection />
      <TestimonialSection />
      <BlogsSection />
      <VendorBand />
      <CityServices />
      <Footer />
    </main>
  );
}
