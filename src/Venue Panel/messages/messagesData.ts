/** Mock data backing the venue admin's Messages screen. */

export type MessageSender = "admin" | "customer";
export type MessageStatus = "sent" | "delivered" | "read";

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  time: string;
  status?: MessageStatus;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerPhoto: string;
  isOnline: boolean;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    customerName: "Sana Malik",
    customerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    isOnline: true,
    lastMessageTime: "10:42 AM",
    unreadCount: 2,
    messages: [
      { id: "m1", sender: "customer", text: "Hi! Is Crystal Suite available on Aug 11 for Mehndi?", time: "10:20 AM", status: "read" },
      { id: "m2", sender: "admin", text: "Yes, that date is open. It's PKR 3,500 per head for up to 200 guests.", time: "10:25 AM", status: "read" },
      { id: "m3", sender: "customer", text: "Great, can you hold it while I confirm with my family?", time: "10:38 AM" },
      { id: "m4", sender: "customer", text: "Also, do you provide bridal room and DJ service?", time: "10:42 AM" },
    ],
  },
  {
    id: "conv-2",
    customerName: "Zara Hussain",
    customerPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    isOnline: false,
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      { id: "m1", sender: "customer", text: "Thank you for confirming our Engagement booking!", time: "Yesterday, 6:10 PM" },
      { id: "m2", sender: "admin", text: "You're most welcome! We'll send the advance-payment invoice shortly.", time: "Yesterday, 6:15 PM", status: "delivered" },
    ],
  },
  {
    id: "conv-3",
    customerName: "Ahmed Raza",
    customerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    isOnline: true,
    lastMessageTime: "Mon",
    unreadCount: 1,
    messages: [
      { id: "m1", sender: "admin", text: "Your Barat booking for Aug 20 is confirmed. Advance received, thank you!", time: "Mon, 2:05 PM", status: "read" },
      { id: "m2", sender: "customer", text: "Perfect. Can we add valet parking for the guests?", time: "Mon, 2:30 PM" },
    ],
  },
  {
    id: "conv-4",
    customerName: "Omar Farooq",
    customerPhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    isOnline: false,
    lastMessageTime: "Sep 1",
    unreadCount: 0,
    messages: [
      { id: "m1", sender: "customer", text: "Can we get a walkthrough of Rose Garden before the corporate event?", time: "Sep 1, 11:00 AM" },
      { id: "m2", sender: "admin", text: "Of course — how about this Thursday at 4 PM?", time: "Sep 1, 11:20 AM", status: "sent" },
    ],
  },
  {
    id: "conv-5",
    customerName: "Fatima Noor",
    customerPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    isOnline: false,
    lastMessageTime: "Aug 5",
    unreadCount: 0,
    messages: [
      { id: "m1", sender: "customer", text: "I need to cancel my Mehndi booking, apologies for the short notice.", time: "Aug 5, 9:00 AM" },
      { id: "m2", sender: "admin", text: "No problem, we've processed the cancellation. Refund will follow our policy.", time: "Aug 5, 9:30 AM", status: "read" },
    ],
  },
];
