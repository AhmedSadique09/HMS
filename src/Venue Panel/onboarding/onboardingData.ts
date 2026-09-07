/**
 * Shared types and option lists for the venue-admin onboarding wizard
 * (Venue Information -> Venue Type -> Hall Details).
 */

export type VenueType = "Hall" | "Marquee" | "Both";

export const VENUE_TYPES: { value: VenueType; description: string }[] = [
  { value: "Hall", description: "An indoor banquet hall" },
  { value: "Marquee", description: "An outdoor marquee / lawn" },
  { value: "Both", description: "You offer both hall and marquee spaces" },
];

export type BookingType = "custom-menu" | "hall-only";

export const FACILITIES = [
  "AC",
  "Bridal Room",
  "DJ Service",
  "Generator",
  "Parking",
  "Photography Service",
  "Decoration Service",
  "Parking Area",
] as const;

export const MENU_ITEMS = [
  "Biryani",
  "Pulao",
  "Qorma",
  "Naan",
  "BBQ",
  "Ice Cream",
  "Salad",
  "Soft Drinks",
] as const;

export interface VenueInformationData {
  coverImage: File | null;
  profileImage: File | null;
  venueName: string;
  description: string;
  state: string;
  city: string;
  area: string;
  googleMapLink: string;
  phone: string;
  whatsapp: string;
}

export interface Hall {
  id: string;
  hallName: string;
  capacity: string;
  pricePerHead: string;
  bookingType: BookingType;
  facilities: string[];
  menuItems: string[];
}

export interface OnboardingData {
  venueInformation: VenueInformationData;
  venueType: VenueType | null;
  halls: Hall[];
}

export const EMPTY_VENUE_INFORMATION: VenueInformationData = {
  coverImage: null,
  profileImage: null,
  venueName: "",
  description: "",
  state: "",
  city: "",
  area: "",
  googleMapLink: "",
  phone: "",
  whatsapp: "",
};

export function createEmptyHall(): Hall {
  return {
    id: crypto.randomUUID(),
    hallName: "",
    capacity: "",
    pricePerHead: "",
    bookingType: "custom-menu",
    facilities: [],
    menuItems: [],
  };
}

export const EMPTY_ONBOARDING_DATA: OnboardingData = {
  venueInformation: EMPTY_VENUE_INFORMATION,
  venueType: null,
  halls: [],
};
