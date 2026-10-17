import type { Tier, Offer } from "@/lib/offers";

export type DigitalCover = "broad" | "basic" | "none";
export type CustomerProfile = { id: string; name: string; motor: Tier; digital: DigitalCover };
export const CUSTOMER_PROFILES: CustomerProfile[] = [
  { id: "mila", name: "Mila", motor: "full", digital: "broad" },
  { id: "riku", name: "Riku", motor: "basic", digital: "none" },
  { id: "valtteri", name: "Valtteri", motor: "partial", digital: "basic" },
];
export const getCustomer = (id: string) => CUSTOMER_PROFILES.find((p) => p.id === id) ?? CUSTOMER_PROFILES[0];
export const storyKey = (profileId: string, scenarioId: string) => `${profileId}:${scenarioId}`;
// Concept service eligibility is separate from risk detection and from actual policy terms.
export function supportFor(profile: CustomerProfile, module: "cyber" | "vehicle") {
  return module === "cyber"
    ? [true, profile.digital !== "none", profile.digital === "broad"]
    : [true, profile.motor !== "basic", profile.motor === "full"];
}
export function profileBenefit(offer: Offer, profile: CustomerProfile): number | null {
  if (offer.module === "cyber") {
    // Motor insurance does not imply legal-expenses or identity-theft insurance.
    if (offer.id === "id") return null;
    return profile.digital === "none" ? null : profile.digital === "broad" ? offer.discount : Math.floor(offer.discount / 2);
  }
  if (profile.motor === "basic") return null;
  if (profile.motor === "full") return offer.discount;
  return offer.id === "tow" ? null : Math.floor(offer.discount / 2);
}