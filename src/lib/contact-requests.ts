// Demo-only "warm handoff": a customer asks IF to get in touch, and the request
// appears in the advisor queue with only the context the customer chose to share.
import type { CustomerProfile } from "@/lib/customer-profiles";

export type Channel = "call" | "message";
export type Topic = "motor" | "digital" | "both";

export interface ContactRequest {
  id: string;
  customerId: string;
  customerName: string;
  channel: Channel;
  topic: Topic;
  slot: string; // human-readable time window
  context: string; // customer-approved situation summary (no raw data)
  createdAt: number;
}

export const ADVISOR = { name: "Tiina", team: { en: "IF Tampere team", fi: "Ifin Tampereen tiimi" } };

export const CHANNEL_OPTIONS: { id: Channel; slot: string; en: string; fi: string }[] = [
  { id: "call", slot: "tomorrow 12–13", en: "Call me tomorrow at lunch (12–13)", fi: "Soita huomenna lounaalla (klo 12–13)" },
  { id: "message", slot: "within 1 working day", en: "Send a message and a ready offer to My IF", fi: "Viesti ja valmis ehdotus Omat sivut -palveluun" },
];

// Suggest the area where an upgrade could add the most calm; full + broad gets a general review.
export function suggestedTopic(profile: CustomerProfile): Topic {
  const motorRoom = profile.motor !== "full";
  const digitalRoom = profile.digital !== "broad";
  if (motorRoom && !digitalRoom) return "motor";
  if (digitalRoom && !motorRoom) return "digital";
  return "both";
}

export function addRequest(list: ContactRequest[], req: Omit<ContactRequest, "id" | "createdAt">, now = Date.now()): ContactRequest[] {
  // One open request per customer: a new one replaces the old so advisors never get duplicates.
  return [{ ...req, id: `${req.customerId}-${now}`, createdAt: now }, ...list.filter((r) => r.customerId !== req.customerId)];
}

export const TOPIC_LABEL: Record<Topic, { en: string; fi: string }> = {
  motor: { en: "Motor cover (e.g. glass, roadside)", fi: "Autoturva (esim. lasi, tiepalvelu)" },
  digital: { en: "Digital safety & identity", fi: "Digiturva ja identiteetti" },
  both: { en: "Motor + digital review", fi: "Auto- ja digiturvan läpikäynti" },
};
