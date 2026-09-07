/** Mock data backing the venue admin's "Venues / Halls" table. */

export interface VenueListing {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  location: string;
  pricePerHead: number;
  capacity: number;
  openDates: number;
}

export const VENUE_LISTINGS: VenueListing[] = [
  {
    id: "hl-1",
    name: "Pearl Continental Banquets",
    photo: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
    reviewCount: 148,
    location: "Gulberg III, Lahore",
    pricePerHead: 3500,
    capacity: 1500,
    openDates: 3,
  },
  {
    id: "hl-2",
    name: "Crystal Suite",
    photo: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=300&q=80",
    rating: 4.7,
    reviewCount: 92,
    location: "DHA Phase 5, Lahore",
    pricePerHead: 4200,
    capacity: 800,
    openDates: 5,
  },
  {
    id: "hl-3",
    name: "Rose Garden",
    photo: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=300&q=80",
    rating: 4.5,
    reviewCount: 64,
    location: "Bahria Town, Islamabad",
    pricePerHead: 2800,
    capacity: 500,
    openDates: 2,
  },
  {
    id: "hl-4",
    name: "Grand Ballroom",
    photo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=300&q=80",
    rating: 4.8,
    reviewCount: 210,
    location: "F-11 Markaz, Islamabad",
    pricePerHead: 5000,
    capacity: 1200,
    openDates: 4,
  },
  {
    id: "hl-5",
    name: "Emerald Hall",
    photo: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=300&q=80",
    rating: 4.6,
    reviewCount: 77,
    location: "Gulberg III, Lahore",
    pricePerHead: 3900,
    capacity: 900,
    openDates: 6,
  },
];
