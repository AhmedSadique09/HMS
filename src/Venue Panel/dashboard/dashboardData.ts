/** Mock data backing the venue admin dashboard — stats, charts, notifications, bookings. */

export interface StatDatum {
  label: string;
  value: string;
  tint: string;
  icon: "users" | "eye" | "trending-up" | "calendar" | "check" | "x" | "dollar" | "bar-chart";
}

export const STATS: StatDatum[] = [
  { label: "Total Users", value: "1,248", tint: "bg-blue-100 text-blue-600", icon: "users" },
  { label: "Profile Visits", value: "8,342", tint: "bg-purple-100 text-purple-600", icon: "eye" },
  { label: "Today's Visitors", value: "127", tint: "bg-emerald-100 text-emerald-600", icon: "trending-up" },
  { label: "Upcoming Events", value: "23", tint: "bg-orange-100 text-orange-600", icon: "calendar" },
  { label: "Completed Events", value: "189", tint: "bg-emerald-100 text-emerald-600", icon: "check" },
  { label: "Cancelled", value: "12", tint: "bg-rose-100 text-rose-600", icon: "x" },
  { label: "Monthly Revenue", value: "PKR 6.1M", tint: "bg-ink/10 text-ink/70", icon: "dollar" },
  { label: "Yearly Revenue", value: "PKR 52M", tint: "bg-blue-100 text-blue-600", icon: "bar-chart" },
];

export const REVENUE_BY_MONTH = [
  { month: "Jan", revenue: 2.1 },
  { month: "Feb", revenue: 1.7 },
  { month: "Mar", revenue: 2.8 },
  { month: "Apr", revenue: 2.6 },
  { month: "May", revenue: 4.0 },
  { month: "Jun", revenue: 5.2 },
  { month: "Jul", revenue: 4.9 },
  { month: "Aug", revenue: 6.1 },
  { month: "Sep", revenue: 5.3 },
  { month: "Oct", revenue: 4.8 },
  { month: "Nov", revenue: 5.9 },
  { month: "Dec", revenue: 7.0 },
];

export const EVENT_TYPES = [
  { name: "Barat", value: 32, color: "#d98aa0" },
  { name: "Walima", value: 26, color: "#7a1030" },
  { name: "Mehndi", value: 18, color: "#c9a227" },
  { name: "Engagement", value: 12, color: "#b97a52" },
  { name: "Nikah", value: 8, color: "#a11d3c" },
  { name: "Birthday", value: 4, color: "#4f83a3" },
];

export const BOOKING_TRENDS = [
  { month: "Jan", bookings: 12 },
  { month: "Feb", bookings: 8 },
  { month: "Mar", bookings: 18 },
  { month: "Apr", bookings: 15 },
  { month: "May", bookings: 22 },
  { month: "Jun", bookings: 32 },
  { month: "Jul", bookings: 25 },
  { month: "Aug", bookings: 31 },
  { month: "Sep", bookings: 27 },
  { month: "Oct", bookings: 25 },
  { month: "Nov", bookings: 30 },
  { month: "Dec", bookings: 38 },
];

export interface NotificationDatum {
  id: string;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
}

export const NOTIFICATIONS: NotificationDatum[] = [
  {
    id: "n1",
    title: "Booking Confirmed",
    description: "Your booking at Pearl Continental Banquets on Aug...",
    time: "2 hours ago",
    isUnread: true,
  },
  {
    id: "n2",
    title: "Payment Reminder",
    description: "Remaining payment of PKR 1,400,000 is due for your...",
    time: "1 day ago",
    isUnread: true,
  },
  {
    id: "n3",
    title: "New Booking Request",
    description: "Sana Malik has requested to book Crystal Suite on...",
    time: "3 hours ago",
    isUnread: true,
  },
  {
    id: "n4",
    title: "Booking Cancelled",
    description: "Your booking at Mövenpick Banquet Suite on Jul 28 h...",
    time: "3 days ago",
    isUnread: false,
  },
];

export type BookingStatus = "confirmed" | "pending" | "completed";

export interface BookingDatum {
  customer: string;
  event: string;
  date: string;
  guests: number;
  status: BookingStatus;
}

export const RECENT_BOOKINGS: BookingDatum[] = [
  { customer: "Ahmed Raza", event: "Barat", date: "2025-08-20", guests: 500, status: "confirmed" },
  { customer: "Sana Malik", event: "Mehndi", date: "2025-08-11", guests: 200, status: "pending" },
  { customer: "Hamza Sheikh", event: "Walima", date: "2025-07-15", guests: 800, status: "completed" },
  { customer: "Zara Hussain", event: "Engagement", date: "2025-08-16", guests: 300, status: "pending" },
  { customer: "Omar Farooq", event: "Corporate Event", date: "2025-09-01", guests: 400, status: "confirmed" },
];
