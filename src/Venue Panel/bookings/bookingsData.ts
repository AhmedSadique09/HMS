/** Mock data backing the venue admin "Booking Management" screen. */

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerPhoto: string;
  status: BookingStatus;
  event: string;
  date: string;
  slot: string;
  guests: number;
  hall: string;
  total: number;
  advancePaid: number;
}

export const BOOKING_STATUS_TABS: { status: BookingStatus; label: string }[] = [
  { status: "pending", label: "Pending" },
  { status: "confirmed", label: "Confirmed" },
  { status: "completed", label: "Completed" },
  { status: "cancelled", label: "Cancelled" },
];

export const BOOKINGS: Booking[] = [
  {
    id: "bk-1",
    customerName: "Sana Malik",
    customerPhone: "+923009876543",
    customerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    status: "pending",
    event: "Mehndi",
    date: "2025-08-11",
    slot: "Morning",
    guests: 200,
    hall: "Crystal Suite",
    total: 640000,
    advancePaid: 0,
  },
  {
    id: "bk-2",
    customerName: "Zara Hussain",
    customerPhone: "+923451234567",
    customerPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    status: "pending",
    event: "Engagement",
    date: "2025-08-16",
    slot: "Afternoon",
    guests: 300,
    hall: "Rose Garden",
    total: 540000,
    advancePaid: 54000,
  },
  {
    id: "bk-3",
    customerName: "Ayesha Tariq",
    customerPhone: "+923211239876",
    customerPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    status: "pending",
    event: "Nikah",
    date: "2025-09-05",
    slot: "Evening",
    guests: 400,
    hall: "Grand Ballroom",
    total: 900000,
    advancePaid: 100000,
  },
  {
    id: "bk-4",
    customerName: "Ahmed Raza",
    customerPhone: "+923004567890",
    customerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    status: "confirmed",
    event: "Barat",
    date: "2025-08-20",
    slot: "Evening",
    guests: 500,
    hall: "Emerald Hall",
    total: 1750000,
    advancePaid: 875000,
  },
  {
    id: "bk-5",
    customerName: "Omar Farooq",
    customerPhone: "+923337654321",
    customerPhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    status: "confirmed",
    event: "Corporate Event",
    date: "2025-09-01",
    slot: "Morning",
    guests: 400,
    hall: "Rose Garden",
    total: 480000,
    advancePaid: 240000,
  },
  {
    id: "bk-6",
    customerName: "Hamza Sheikh",
    customerPhone: "+923219988776",
    customerPhoto: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    status: "completed",
    event: "Walima",
    date: "2025-07-15",
    slot: "Evening",
    guests: 800,
    hall: "Crystal Suite",
    total: 2400000,
    advancePaid: 2400000,
  },
  {
    id: "bk-7",
    customerName: "Bilal Ahmed",
    customerPhone: "+923451122334",
    customerPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    status: "completed",
    event: "Birthday Party",
    date: "2025-06-10",
    slot: "Afternoon",
    guests: 150,
    hall: "Rose Garden",
    total: 220000,
    advancePaid: 220000,
  },
  {
    id: "bk-8",
    customerName: "Fatima Noor",
    customerPhone: "+923006677889",
    customerPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    status: "cancelled",
    event: "Mehndi",
    date: "2025-08-05",
    slot: "Morning",
    guests: 250,
    hall: "Grand Ballroom",
    total: 420000,
    advancePaid: 42000,
  },
];
