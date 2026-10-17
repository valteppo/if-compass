// Picks the single IF Compass message to show now, pacing the rest so the customer is never flooded.
export type RiskLevel = "High" | "Medium" | "Low";
export type BriefingItem = { id: string; module: "cyber" | "vehicle"; weight: number; level?: RiskLevel };
export type Phase = "morning" | "evening";

// Risks tied to this morning's drive must be handled before leaving; others can wait for a calm moment.
const TIME_CRITICAL = new Set(["ice", "night", "brake", "tires"]);
export const isTimeCritical = (id: string) => TIME_CRITICAL.has(id);

// Where a postponed item goes; "soon", "work" and "evening" return later today, "tomorrow"/"week" do not.
export type SnoozeUntil = "soon" | "work" | "evening" | "tomorrow" | "week";
export type Snooze = { until: SnoozeUntil; count: number };
const TODAY: SnoozeUntil[] = ["soon", "work", "evening"];

// High risk returns within today (the customer still sets the pace); medium/low risk gets longer horizons.
export function scheduleOptions(level: RiskLevel | undefined, phase: Phase): SnoozeUntil[] {
  if (level === "High") return phase === "morning" ? ["soon", "work", "evening"] : ["tomorrow"];
  return phase === "morning" ? ["evening", "tomorrow", "week"] : ["tomorrow", "week"];
}

// How long the app waits before the next message, per risk level (customer-chosen cadence).
export type Cadence = { High: number; Medium: number; Low: number };
export const defaultCadence: Cadence = { High: 0, Medium: 15, Low: 30 };

// Anti-backlog: a medium/low item postponed twice moves to next week instead of nagging daily.
export function snooze(
  current: Record<string, Snooze>,
  id: string,
  until: SnoozeUntil,
  level?: RiskLevel,
): Record<string, Snooze> {
  const count = (current[id]?.count ?? 0) + 1;
  const target = level !== "High" && count >= 2 ? "week" : until;
  return { ...current, [id]: { until: target, count } };
}

export type Briefing<T extends BriefingItem> = { now: T | null; waiting: T[]; prefersLater: "cyber" | "vehicle" | null };

export function buildBriefing<T extends BriefingItem>(
  items: T[],
  done: Record<string, boolean>,
  plannedIds: string[],
  phase: Phase,
  snoozed: Record<string, Snooze> = {},
): Briefing<T> {
  const open = items.filter((i) => !done[i.id]);
  // Learned priority: the module the customer has postponed most is treated as "later" content.
  const counts = { cyber: 0, vehicle: 0 };
  for (const id of plannedIds) {
    const m = items.find((i) => i.id === id)?.module;
    if (m) counts[m] += 1;
  }
  const prefersLater = counts.cyber > counts.vehicle ? "cyber" : counts.vehicle > counts.cyber ? "vehicle" : null;
  const rank = (a: T, b: T) =>
    Number(a.module === prefersLater) - Number(b.module === prefersLater) ||
    Number(!isTimeCritical(a.id)) - Number(!isTimeCritical(b.id)) ||
    b.weight - a.weight;
  const laterToday = (i: T) => { const s = snoozed[i.id]; return !!s && !TODAY.includes(s.until); };

  if (phase === "morning") {
    const fresh = open.filter((i) => !plannedIds.includes(i.id) && !snoozed[i.id]);
    // Morning shows drive risks and any high risk (e.g. a fresh breach) — still one at a time.
    const urgent = fresh.filter((i) => isTimeCritical(i.id) || i.level === "High").sort(rank);
    const now = urgent[0] ?? null;
    return { now, waiting: open.filter((i) => i !== now && !laterToday(i)).sort(rank), prefersLater };
  }
  const sorted = open.filter((i) => !laterToday(i)).sort(rank);
  return { now: sorted[0] ?? null, waiting: sorted.slice(1), prefersLater };
}
