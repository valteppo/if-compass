import { describe, expect, it } from "vitest";
import { breachDue, DAY_TIMES, EMOTIONAL_CONTEXT, journeyChoices, milaMessage, type JourneyState } from "@/lib/mila-journey";

const empty: JourneyState = { choices: {}, done: {}, snoozed: {} };
describe("shared Mila day", () => {
  it("prioritises travel before departure at 07:15 without commercial offers", () => {
    expect(DAY_TIMES.morning).toBe("07:15");
    expect(milaMessage(empty, "morning").id).toBe("ice");
    expect(milaMessage(empty, "morning").urgency).toBe("before_departure");
    expect(EMOTIONAL_CONTEXT.morning.commercialOffers).toBe(false);
  });
  it("reminds about a breach at 19:00, not at lunch when postponed to evening", () => {
    const state: JourneyState = { ...empty, choices: { ice: "skip", leak: "postponed" }, snoozed: { leak: { until: "evening", count: 1 } } };
    expect(breachDue(state, "lunch")).toBe(false);
    expect(milaMessage(state, "lunch").urgency).toBe("scheduled");
    expect(milaMessage(state, "evening").id).toBe("leak");
    expect(state.done["leak"]).toBeUndefined();
  });
  it("permits tomorrow evening rather than repeating a postponed task tonight", () => {
    const state: JourneyState = { ...empty, snoozed: { leak: { until: "tomorrow", count: 2 } } };
    expect(breachDue(state, "evening")).toBe(false);
    expect(milaMessage(state, "evening").id).toBeNull();
  });
  it("does not treat an intent to act as password completion", () => {
    expect(milaMessage({ ...empty, choices: { ice: "skip", leak: "act" } }, "evening").id).toBe("leak");
    expect(milaMessage({ ...empty, done: { leak: true } }, "evening").id).toBeNull();
  });
  it("records decisions immutably and produces the same pilot and customer projection", () => {
    const choices = journeyChoices(empty.choices, { type: "choose", id: "ice", choice: "skip" });
    expect(empty.choices).toEqual({});
    expect(choices["ice"]).toBe("skip");
    const state = { ...empty, choices };
    expect(milaMessage(state, "lunch").id).toBe("leak");
    expect(milaMessage(state, "lunch").urgency).toBe("today");
  });
});