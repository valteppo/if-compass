import { describe, expect, it } from "vitest";
import { OFFERS, benefitFor, offersAt } from "@/lib/offers";

const tires = OFFERS.find((o) => o.id === "tires")!;
describe("cover-tier benefits", () => {
  it("full cover gets the full discount", () => expect(benefitFor(tires, "full")).toBe(10));
  it("partial cover gets half", () => expect(benefitFor(tires, "partial")).toBe(5));
  it("basic cover gets no partner discount", () => expect(benefitFor(tires, "basic")).toBeNull());
  it("keeps discounts low: at most 20 %", () => expect(Math.max(...OFFERS.map((o) => o.discount))).toBeLessThanOrEqual(20));
  it("vehicle benefits arrive at lunch", () => expect(offersAt("lunch", "full").every((o) => o.module === "vehicle")).toBe(true));
});
