import { describe, expect, it } from "vitest";
import { buildBriefing } from "@/lib/briefing";

const items = [
  { id: "leak", module: "cyber" as const, weight: 30 },
  { id: "ice", module: "vehicle" as const, weight: 20 },
  { id: "service", module: "vehicle" as const, weight: 5 },
];

describe("morning briefing", () => {
  it("shows only the time-critical road risk in the morning, even if a cyber risk weighs more", () => {
    const b = buildBriefing(items, {}, [], "morning");
    expect(b.now?.id).toBe("ice");
    expect(b.waiting.map((i) => i.id)).toContain("leak");
  });
  it("shows nothing urgent in the morning once the road risk is handled", () => {
    expect(buildBriefing(items, { ice: true }, [], "morning").now).toBeNull();
  });
  it("brings postponed items back in the evening, one at a time", () => {
    const b = buildBriefing(items, { ice: true }, ["leak"], "evening");
    expect(b.now?.id).toBe("service");
    expect(b.prefersLater).toBe("cyber");
  });
});
