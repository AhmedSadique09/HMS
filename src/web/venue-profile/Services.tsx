"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionCard } from "@/components/elements/SectionCard";

const SERVICES = [
  {
    id: "hall-booking",
    name: "Hall & Lawn Booking",
    price: "Rs 280,000",
    description:
      "Exclusive use of the hall or lawn for your event slot, including staging, seating, air conditioning, backup power, and dedicated parking with valet support.",
  },
  {
    id: "catering",
    name: "In-House Catering",
    price: "Rs 1,800 / head",
    description:
      "Desi and continental menus prepared in our own kitchen, with a tasting session before you confirm. Live counters, dessert bars, and dietary substitutions available on request.",
  },
  {
    id: "decor",
    name: "Decor & Staging",
    price: "Rs 150,000",
    description:
      "Floral installations, stage design, table settings, and entrance decor built to your theme. Our design team shares a mock-up before anything is ordered.",
  },
  {
    id: "lighting-sound",
    name: "Lighting & Sound",
    price: "Rs 90,000",
    description:
      "Professional sound system, wireless mics, ambient and architectural lighting, plus a technician on site for the full duration of the event.",
  },
  {
    id: "photography",
    name: "Photography & Cinematography",
    price: "Rs 200,000",
    description:
      "Two photographers and a cinematographer covering the full function, with a same-day highlights reel and edited album delivered within three weeks.",
  },
  {
    id: "event-management",
    name: "Complete Event Management",
    price: "Rs 350,000",
    description:
      "End-to-end coordination: vendor scheduling, guest flow, run-of-show, and a dedicated manager who runs the day so the family does not have to.",
  },
] as const;

/** Accordion — one panel open at a time, first row open on load. */
export function Services() {
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);

  return (
    <SectionCard id="services" title="Services" bodyClassName="px-4">
      <div className="w-full">
        {SERVICES.map((service, index) => {
          const isOpen = openId === service.id;

          return (
            <div
              key={service.id}
              className={index < SERVICES.length - 1 ? "border-b border-ink/15" : ""}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : service.id)}
                aria-expanded={isOpen}
                aria-controls={`service-panel-${service.id}`}
                className="flex w-full items-center gap-4 py-4 text-left"
              >
                <span className="grow text-base font-bold leading-tight text-ink">
                  {service.name}
                </span>
                <strong className="shrink-0 text-sm text-brand">From {service.price}</strong>
                <ChevronDown
                  className={`size-5 shrink-0 text-ink/50 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={`service-panel-${service.id}`}
                hidden={!isOpen}
                className="pb-4 text-sm text-ink/60"
              >
                <p className="mb-0">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
