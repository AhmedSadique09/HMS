/** Mock data backing the venue admin's Payments screen — derived from booking amounts. */

export type PaymentType = "Advance" | "Remaining" | "Full Payment" | "Refund";
export type PaymentMethod = "Bank Transfer" | "JazzCash" | "EasyPaisa" | "Card" | "Cash";
export type PaymentStatus = "paid" | "pending" | "refunded";

export interface PaymentTransaction {
  id: string;
  customerName: string;
  customerPhoto: string;
  event: string;
  hall: string;
  date: string;
  amount: number;
  type: PaymentType;
  method: PaymentMethod;
  status: PaymentStatus;
}

export const PAYMENT_STATUS_TABS: { status: PaymentStatus; label: string }[] = [
  { status: "paid", label: "Paid" },
  { status: "pending", label: "Pending" },
  { status: "refunded", label: "Refunded" },
];

export const PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: "pay-1",
    customerName: "Zara Hussain",
    customerPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    event: "Engagement",
    hall: "Rose Garden",
    date: "2025-08-16",
    amount: 54000,
    type: "Advance",
    method: "EasyPaisa",
    status: "paid",
  },
  {
    id: "pay-2",
    customerName: "Zara Hussain",
    customerPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    event: "Engagement",
    hall: "Rose Garden",
    date: "2025-08-16",
    amount: 486000,
    type: "Remaining",
    method: "Bank Transfer",
    status: "pending",
  },
  {
    id: "pay-3",
    customerName: "Ahmed Raza",
    customerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    event: "Barat",
    hall: "Emerald Hall",
    date: "2025-08-20",
    amount: 875000,
    type: "Advance",
    method: "Bank Transfer",
    status: "paid",
  },
  {
    id: "pay-4",
    customerName: "Ahmed Raza",
    customerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    event: "Barat",
    hall: "Emerald Hall",
    date: "2025-08-20",
    amount: 875000,
    type: "Remaining",
    method: "Bank Transfer",
    status: "pending",
  },
  {
    id: "pay-5",
    customerName: "Omar Farooq",
    customerPhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    event: "Corporate Event",
    hall: "Rose Garden",
    date: "2025-09-01",
    amount: 240000,
    type: "Advance",
    method: "JazzCash",
    status: "paid",
  },
  {
    id: "pay-6",
    customerName: "Omar Farooq",
    customerPhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    event: "Corporate Event",
    hall: "Rose Garden",
    date: "2025-09-01",
    amount: 240000,
    type: "Remaining",
    method: "JazzCash",
    status: "pending",
  },
  {
    id: "pay-7",
    customerName: "Hamza Sheikh",
    customerPhoto: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    event: "Walima",
    hall: "Crystal Suite",
    date: "2025-07-15",
    amount: 2400000,
    type: "Full Payment",
    method: "Bank Transfer",
    status: "paid",
  },
  {
    id: "pay-8",
    customerName: "Bilal Ahmed",
    customerPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    event: "Birthday Party",
    hall: "Rose Garden",
    date: "2025-06-10",
    amount: 220000,
    type: "Full Payment",
    method: "Card",
    status: "paid",
  },
  {
    id: "pay-9",
    customerName: "Ayesha Tariq",
    customerPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    event: "Nikah",
    hall: "Grand Ballroom",
    date: "2025-09-05",
    amount: 100000,
    type: "Advance",
    method: "EasyPaisa",
    status: "paid",
  },
  {
    id: "pay-10",
    customerName: "Ayesha Tariq",
    customerPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    event: "Nikah",
    hall: "Grand Ballroom",
    date: "2025-09-05",
    amount: 800000,
    type: "Remaining",
    method: "Bank Transfer",
    status: "pending",
  },
  {
    id: "pay-11",
    customerName: "Fatima Noor",
    customerPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    event: "Mehndi",
    hall: "Grand Ballroom",
    date: "2025-08-05",
    amount: 42000,
    type: "Refund",
    method: "EasyPaisa",
    status: "refunded",
  },
];
