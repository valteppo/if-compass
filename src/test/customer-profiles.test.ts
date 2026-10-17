import { describe, expect, it } from "vitest";
import { CUSTOMER_PROFILES, profileBenefit, storyKey, supportFor } from "@/lib/customer-profiles";
import { OFFERS } from "@/lib/offers";
import { buildBriefing } from "@/lib/briefing";

describe("customer insurance profiles", () => {
  const [mila, riku, valtteri] = CUSTOMER_PROFILES;
  if (!mila || !riku || !valtteri) throw new Error("Missing demo profiles");
  it("assigns the agreed customer names and cover breadth", () => {
    expect(CUSTOMER_PROFILES.map(p => [p.name, p.motor, p.digital])).toEqual([
      ["Mila", "full", "broad"], ["Riku", "basic", "none"], ["Valtteri", "partial", "basic"],
    ]);
  });
  it("keeps safety guidance for all customers", () => {
    expect(CUSTOMER_PROFILES.map(p => supportFor(p, "cyber")[0])).toEqual([true, true, true]);
    expect(CUSTOMER_PROFILES.map(p => supportFor(p, "vehicle")[0])).toEqual([true, true, true]);
  });
  it("gives broad digital cover more support than basic and none", () => {
    expect(supportFor(mila, "cyber")).toEqual([true, true, true]);
    expect(supportFor(valtteri, "cyber")).toEqual([true, true, false]);
    expect(supportFor(riku, "cyber")).toEqual([true, false, false]);
  });
  it("uses digital rather than motor cover for password benefits", () => {
    const password = OFFERS.find(o => o.id === "pw");
    if (!password) throw new Error("Missing offer");
    expect(profileBenefit(password, mila)).toBe(20);
    expect(profileBenefit(password, valtteri)).toBe(10);
    expect(profileBenefit(password, riku)).toBeNull();
    expect(profileBenefit(password, { ...mila, digital: "none" })).toBeNull();
  });
  it("never infers actual identity-theft cover from motor insurance", () => {
    const identity = OFFERS.find(o => o.id === "id");
    if (!identity) throw new Error("Missing identity service");
    expect(CUSTOMER_PROFILES.map(p => profileBenefit(identity, p))).toEqual([null, null, null]);
  });
  it("isolates progress by customer and scenario", () => {
    expect(new Set([storyKey("mila", "winter"), storyKey("riku", "winter"), storyKey("mila", "breaches")]).size).toBe(3);
  });
  it("does not lower urgent warnings for customers with broader cover", () => {
    const items = [{ id: "leak", module: "cyber" as const, weight: 30, level: "High" as const }];
    expect(CUSTOMER_PROFILES.map(() => buildBriefing(items, {}, [], "morning").now?.id)).toEqual(["leak", "leak", "leak"]);
  });
});