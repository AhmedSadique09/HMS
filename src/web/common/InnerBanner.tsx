const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80";

/** Compact city + service lookup shown on listing-style inner pages. */
function BannerSearch() {
  return (
    <form
      className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl bg-white/90 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-sm sm:flex-row"
      role="search"
    >
      <input
        type="search"
        aria-label="What are you looking for?"
        placeholder="Venue, photographer, caterer…"
        className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-base text-[#132743] placeholder:text-zinc-400 focus:outline-none"
      />
      <span className="hidden w-px self-stretch bg-zinc-200 sm:block" aria-hidden="true" />
      <input
        type="search"
        aria-label="City"
        placeholder="City"
        className="min-w-0 rounded-xl bg-transparent px-4 py-3 text-base text-[#132743] placeholder:text-zinc-400 focus:outline-none sm:w-44"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-[#d73853] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#c02f48]"
      >
        Search
      </button>
    </form>
  );
}

/**
 * Inner-page hero — full-bleed photograph behind a centred title, a one-line
 * positioning statement, and an optional search row.
 */
export function InnerBanner({
  title,
  description,
  image = DEFAULT_IMAGE,
  showSearch = false,
}: {
  title: string;
  description: string;
  image?: string;
  showSearch?: boolean;
}) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat pt-40 pb-24"
      style={{ backgroundImage: `url('${image}')` }}
    >
      {/* Wash keeps the navy type legible over any part of the photo. */}
      <div className="absolute inset-0 bg-white/75" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-8xl px-4 sm:px-6">
        <div className="flex flex-col gap-16 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-h1 font-bold leading-[1.2] text-[#132743]">{title}</h1>
            <p className="text-lg leading-snug text-[#132743]">{description}</p>
          </div>

          {showSearch && <BannerSearch />}
        </div>
      </div>
    </section>
  );
}
