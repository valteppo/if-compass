import { CUSTOMER_PROFILES } from "@/lib/customer-profiles";
import type { ContactRequest } from "@/lib/contact-requests";

// Only the topic chosen in a contact request determines discussion areas.
export function advisorReview(request: ContactRequest) {
  const profile = CUSTOMER_PROFILES.find((p) => p.id === request.customerId);
  if (!profile) return null;
  return {
    profile,
    motor: request.topic !== "digital" ? (profile.motor === "full" ? "confirm" : "compare") : null,
    digital: request.topic !== "motor" ? (profile.digital === "broad" ? "confirm" : "compare") : null,
  } as const;
}