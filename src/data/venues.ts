/**
 * Venue directory — the single source of truth shared by the landing page
 * "Banquets & marquees" slider and the `/venues/[slug]` profile route.
 */
export interface Venue {
  /** URL segment used by `/venues/[slug]`. */
  slug: string;
  name: string;
  type: string;
  location: string;
  rating: string;
  /** Starting price, already formatted for display. */
  price: string;
  /** Card image used on the landing slider. */
  image: string;
  /** Wide hero image used at the top of the profile page. */
  bannerImage: string;
  logoImage: string;
  tagline: string;
  email: string;
  contactNumber: string;
  foundedYear: string;
  capacity: string;
  website: string;
}

export const FEATURED_VENUES: Venue[] = [
  {
    slug: "grand-palm-banquet",
    name: "Grand Palm Banquet",
    type: "Banquet",
    location: "Gulberg, Lahore",
    rating: "4.9",
    price: "Rs 350,000",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
    logoImage: "/Logo.png",
    tagline: "Where every celebration feels grand.",
    email: "bookings@grandpalmbanquet.pk",
    contactNumber: "+92 300 4567 890",
    foundedYear: "2014",
    capacity: "800 guests",
    website: "https://www.grandpalmbanquet.pk",
  },
  {
    slug: "royal-grand-marquee",
    name: "Royal Grand Marquee",
    type: "Marquee",
    location: "F-11, Islamabad",
    rating: "4.8",
    price: "Rs 280,000",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80",
    logoImage: "/Logo.png",
    tagline: "Royal settings for once-in-a-lifetime moments.",
    email: "info@royalgrandmarquee.pk",
    contactNumber: "+92 321 7788 990",
    foundedYear: "2016",
    capacity: "1,200 guests",
    website: "https://www.royalgrandmarquee.pk",
  },
  {
    slug: "emerald-hall",
    name: "Emerald Hall",
    type: "Banquet",
    location: "Clifton, Karachi",
    rating: "4.7",
    price: "Rs 300,000",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
    logoImage: "/Logo.png",
    tagline: "Timeless elegance by the sea.",
    email: "events@emeraldhall.pk",
    contactNumber: "+92 333 1122 334",
    foundedYear: "2011",
    capacity: "600 guests",
    website: "https://www.emeraldhall.pk",
  },
  {
    slug: "rose-garden-lawn",
    name: "Rose Garden Lawn",
    type: "Marquee",
    location: "Bahria, Rawalpindi",
    rating: "4.8",
    price: "Rs 260,000",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    logoImage: "/Logo.png",
    tagline: "Open-air weddings under the stars.",
    email: "hello@rosegardenlawn.pk",
    contactNumber: "+92 345 9988 776",
    foundedYear: "2018",
    capacity: "900 guests",
    website: "https://www.rosegardenlawn.pk",
  },
  {
    slug: "pearl-continental-hall",
    name: "Pearl Continental Hall",
    type: "Banquet",
    location: "Canal Road, Faisalabad",
    rating: "4.9",
    price: "Rs 400,000",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=80",
    logoImage: "/Logo.png",
    tagline: "Five-star hospitality, wedding-day precision.",
    email: "reservations@pchall.pk",
    contactNumber: "+92 301 2233 445",
    foundedYear: "2009",
    capacity: "1,500 guests",
    website: "https://www.pchall.pk",
  },
  {
    slug: "skyline-rooftop",
    name: "Skyline Rooftop",
    type: "Rooftop",
    location: "DHA, Lahore",
    rating: "4.6",
    price: "Rs 320,000",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
    logoImage: "/Logo.png",
    tagline: "City lights as your wedding backdrop.",
    email: "book@skylinerooftop.pk",
    contactNumber: "+92 302 5566 778",
    foundedYear: "2020",
    capacity: "400 guests",
    website: "https://www.skylinerooftop.pk",
  },
];

export function getVenueBySlug(slug: string): Venue | undefined {
  return FEATURED_VENUES.find((venue) => venue.slug === slug);
}
