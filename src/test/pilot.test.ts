import { describe, expect, it } from "vitest";
import { pilotDefaults, pilotEconomics } from "@/lib/pilot";

describe("annual pilot economics assumptions", () => {
  it("calculates claims savings without treating premiums as profit", () => {
    const result = pilotEconomics(pilotDefaults);
    expect(result.savings).toBe(6000);
    expect(result.contribution).toBe(5000);
    expect(result.net).toBe(-19000);
  });
  it("finds the required reduction for break-even", () => {
    expect(pilotEconomics(pilotDefaults).breakEvenReduction).toBe(12.5);
  });
  it("keeps revenue hypotheses optional", () => {
    expect(pilotEconomics({ ...pilotDefaults, contribution: 0 }).net).toBe(-24000);
  });
  it("does not imply measurable claims savings with no customers", () => {
    expect(pilotEconomics({ ...pilotDefaults, customers: 0 })).toMatchObject({ savings: 0, contribution: 0, net: -30000, breakEvenReduction: null });
  });
});