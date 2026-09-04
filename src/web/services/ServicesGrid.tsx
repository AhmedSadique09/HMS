import { Icon } from "@/web/common/Primitives";

const SERVICE_ICONS = {
  venue: "M4 21V6.5L12 3l8 3.5V21|M3 21h18|M9.5 21v-4.5h5V21|M8.5 10h.01|M15.5 10h.01",
  camera:
    "M14.5 4h-5L8 6.5H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-3L14.5 4Z|M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
  makeup: "M9.5 3h5l-1 5h-3l-1-5Z|M10 8h4v11a2 2 0 0 1-4 0V8Z",
  lights:
    "M12 2.5V6|M5 21h14|M7 10a5 5 0 0 1 10 0c0 2.5-2 4.3-2 6.5H9C9 14.3 7 12.5 7 10Z|M4 5l1.5 1.5|M20 5l-1.5 1.5",
  catering:
    "M5 3v7a2 2 0 0 0 4 0V3|M7 10v11|M17 3c-1.2 1.8-1.8 3.7-1.8 6v3.5h3.6V9c0-2.3-.6-4.2-1.8-6Z|M17 12.5V21",
  henna: "M12 20.3S3.5 15.5 3.5 9.6A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.6c0 5.9-8.5 10.7-8.5 10.7Z",
  car: "M3.5 17v-4l2-5h13l2 5v4|M5.5 13h13|M6.5 17a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z|M20.5 17a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  music: "M9 18V5l10-2v13|M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z|M19 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
};

const SERVICES = [
  {
    title: "Wedding Venues",
    icon: SERVICE_ICONS.venue,
    description: "Banquet halls, marquees, lawns and farmhouses across every major city.",
  },
  {
    title: "Photographers",
    icon: SERVICE_ICONS.camera,
    description: "Cinematic wedding films and timeless photo coverage for every function.",
  },
  {
    title: "Bridal Makeup",
    icon: SERVICE_ICONS.makeup,
    description: "Salon packages and on-site artists for Mehndi, Barat and Walima.",
  },
  {
    title: "Decor & Staging",
    icon: SERVICE_ICONS.lights,
    description: "Floral setups, stage design and lighting tuned to your theme.",
  },
  {
    title: "Catering",
    icon: SERVICE_ICONS.catering,
    description: "Desi, continental and live BBQ menus costed per head, upfront.",
  },
  {
    title: "Henna Artists",
    icon: SERVICE_ICONS.henna,
    description: "Intricate bridal mehndi plus family sittings on the same booking.",
  },
  {
    title: "Car Rental",
    icon: SERVICE_ICONS.car,
    description: "Decorated wedding cars and coaches to move guests between venues.",
  },
  {
    title: "Music & Choreography",
    icon: SERVICE_ICONS.music,
    description: "Singers, bands, DJs and dholki choreographers for every night.",
  },
];

/**
 * Service catalogue — one white slab whose hairline gaps let the grey page
 * show through, so the eight tiles read as a single divided table.
 */
export function ServicesGrid() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-h2 font-medium leading-tight text-[#132743]">
            Every Vendor. Every Function. One Trusted Platform.
          </h2>
        </div>

        <div className="overflow-hidden rounded-[32px] bg-white">
          <div className="grid grid-cols-1 gap-px bg-gray-100 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <div key={service.title} className="flex flex-col items-start bg-white p-10">
                <span className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#fff2f4] text-[#d73853]">
                  <Icon path={service.icon} className="size-8" />
                </span>
                <h3 className="mb-3 text-lg font-semibold text-[#132743]">{service.title}</h3>
                <p className="text-[15px] leading-[1.4] text-zinc-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
