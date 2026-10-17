import type { Choices } from "@/lib/story-engine";
import type { Snooze } from "@/lib/briefing";

export type DayMoment = "morning" | "lunch" | "evening";
export type JourneyState = { choices: Choices; done: Record<string, boolean>; snoozed: Record<string, Snooze> };
export type JourneyEvent = { type: "choose"; id: string; choice: Choices[string] };
export function journeyChoices(choices: Choices, event: JourneyEvent): Choices {
  return { ...choices, [event.id]: event.choice };
}
export const MILA_JOURNEY_VERSION = 1;
export const DAY_TIMES: Record<DayMoment, string> = { morning: "07:15", lunch: "12:00", evening: "19:00" };
export const EMOTIONAL_CONTEXT = {
  morning: { emotion: "Clarity before leaving", cognitiveLoadBudget: "minimal", commercialOffers: false },
  lunch: { emotion: "Room to breathe", cognitiveLoadBudget: "moderate", commercialOffers: "gentle_care" },
  evening: { emotion: "Care at your pace", cognitiveLoadBudget: "exploratory", commercialOffers: "optional_support" },
} as const;
export type JourneyMessage = { id: "ice" | "leak" | null; title: string; body: string; context: string; urgency: "before_departure" | "today" | "scheduled" | "none"; action?: string };
export const MILA_LIFE_CONTEXT = "Mila lives in Espoo. A new job, a school run and a changed commute make this first snowy morning matter.";
export function breachDue(s: JourneyState, moment: DayMoment): boolean {
  if (s.done["leak"]) return false;
  const until = s.snoozed["leak"]?.until;
  if (until === "tomorrow" || until === "week") return false;
  if (until === "evening") return moment === "evening";
  if (until === "work" || until === "soon") return moment !== "morning";
  return true;
}
/** Fixed scenario evidence, never inferred account activity or measured customer emotions. */
export function milaMessage(s: JourneyState, moment: DayMoment): JourneyMessage {
  const road = s.choices["ice"];
  const roadChosen = s.done["ice"] || road === "skip" || road === "later";
  if (moment === "morning" && !roadChosen) return {
    id: "ice", title: "A little more time for an important morning",
    body: "Snow and freezing temperatures can reduce grip. Check road conditions and your tyres before leaving. If the journey is unsafe, choose another way or postpone it.",
    context: "Your first week in a new job. One decision before the school run.",
    urgency: "before_departure", action: "Plan my journey",
  };
  const context = moment === "morning" ? "Your travel choice is noted. Now you choose when to look at online safety."
    : moment === "lunch" ? road === "skip" ? "You chose not to drive. A little room to breathe."
      : roadChosen ? "Your travel plan is noted. Check tyre grip before the next drive if you are unsure."
      : "Your morning travel task is still open. Check conditions before your next drive."
    : "A quiet moment, with the next step in your hands.";
  if (breachDue(s, moment)) return {
    id: "leak", title: "LinkedIn: choose a moment to protect your account",
    body: "This demo includes a LinkedIn breach signal. It does not tell us whether your account is being used. Check your password and any reuse today; suspicious activity calls for immediate action.",
    context, urgency: "today", action: "See the password steps",
  };
  if (!s.done["leak"]) return {
    id: null, title: "Your reminder is planned — no extra task now",
    body: s.snoozed["leak"]?.until === "tomorrow" ? "You chose tomorrow evening for your password task. It remains open, not completed."
      : s.snoozed["leak"]?.until === "week" ? "Your password task is scheduled for next week. If you suspect account misuse, act immediately."
      : "You chose 19:00 for your password task. You can still open the steps whenever you have a moment.",
    context, urgency: "scheduled",
  };
  return { id: null, title: "One useful step taken, at your pace", body: "You practised the password steps. Real account changes must be made in the service itself. Other safety topics remain available when you want them.", context, urgency: "none" };
}