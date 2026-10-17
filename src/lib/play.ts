// Illustrative physics and timing for the learning-by-playing widgets. Demo estimates, not engineering data.
export type Surface = "dry" | "wet" | "ice";
const friction: Record<Surface, number> = { dry: 0.8, wet: 0.5, ice: 0.25 };

/** Total stopping distance in metres: 1 s reaction time + braking. Worn tread lowers grip (8 mm = full grip). */
export function stoppingDistance(speedKmh: number, treadMm: number, surface: Surface): number {
  const v = speedKmh / 3.6;
  const grip = friction[surface] * (0.6 + 0.4 * Math.min(Math.max(treadMm, 0), 8) / 8);
  return Math.round(v + (v * v) / (2 * grip * 9.81));
}

/** Departure sandbox: minutes after 07:00. The gritter passes at 07:40; rush hour peaks 07:30–08:00. */
export function departure(minutesAfter7: number) {
  const iced = minutesAfter7 < 40;
  const rush = minutesAfter7 >= 30 && minutesAfter7 <= 60;
  const travel = 18 + (rush ? 12 : 0) + (iced ? 6 : 0);
  const risk = (iced ? 50 : 15) + (rush ? 25 : 5);
  return { iced, rush, travel, risk };
}

/** Password chain reaction: how many of 5 demo accounts one leaked password opens. */
export function exposedAccounts(reused: boolean, twoFactor: boolean): number {
  if (twoFactor) return 0;
  return reused ? 5 : 1;
}

export type Game = "brake" | "depart" | "password" | "quiz";
/** Order games so the one matching today's scenario comes first. */
export function gameOrder(scenarioId: string): Game[] {
  if (scenarioId === "breaches") return ["password", "quiz", "brake", "depart"];
  if (scenarioId === "storm") return ["brake", "depart", "quiz", "password"];
  if (scenarioId === "calm") return ["password", "quiz", "depart", "brake"];
  return ["depart", "brake", "password", "quiz"];
}
