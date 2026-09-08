/**
 * Mock demo credentials shown on the sign-up page so people can explore the
 * app without registering. There's no real backend — sign-in only checks the
 * email against `vendor.email` to decide whether to land on the customer
 * homepage or the venue admin dashboard.
 */
export const DEMO_CREDENTIALS = {
  customer: { email: "customer@bandhan.pk", password: "Customer@123" },
  vendor: { email: "venue@bandhan.pk", password: "Venue@123" },
} as const;
