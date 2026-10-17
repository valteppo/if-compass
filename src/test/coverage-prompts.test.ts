import { describe, expect, it } from "vitest";
import { coveragePrompts } from "@/lib/coverage-prompts";
import { CUSTOMER_PROFILES } from "@/lib/customer-profiles";

const [mila, riku, valtteri] = CUSTOMER_PROFILES;
if (!mila || !riku || !valtteri) throw new Error("Missing demo profiles");

const icy = { temperature: -2, roadRisk: "High" as const, tireTreadMm: 3.1, breaches: ["LinkedIn"] };
const calm = { temperature: 14, roadRisk: "Low" as const, tireTreadMm: 6.5, breaches: [] };

describe("situation-aware coverage prompts", () => {
  it("stays silent in calm conditions", () => {
    expect(coveragePrompts(calm, mila)).toEqual([]);
  });
  it("gives full-cover customers reassurance, not an upgrade push", () => {
    const weather = coveragePrompts(icy, mila).find((p) => p.id === "weather");
    expect(weather?.covered).toBeTruthy();
    expect(weather?.upgrade).toBeNull();
  });
  it("offers narrower-cover customers a gentle optional upgrade", () => {
    const weather = coveragePrompts(icy, riku).find((p) => p.id === "weather");
    expect(weather?.covered).toBeNull();
    expect(weather?.upgrade?.fi).toContain("Jos haluat");
  });
  it("never frames narrower cover as missing something essential", () => {
    for (const p of CUSTOMER_PROFILES) {
      for (const prompt of coveragePrompts(icy, p)) {
        const text = `${prompt.covered?.fi ?? ""} ${prompt.upgrade?.fi ?? ""}`;
        expect(text).not.toMatch(/puuttuu|lacking|missing/i);
      }
    }
  });
  it("confirms broad digital cover in a breach and suggests it to others", () => {
    expect(coveragePrompts(icy, mila).find((p) => p.id === "breach")?.upgrade).toBeNull();
    expect(coveragePrompts(icy, riku).find((p) => p.id === "breach")?.upgrade).toBeTruthy();
    expect(coveragePrompts(icy, valtteri).find((p) => p.id === "breach")?.covered).toBeTruthy();
  });
  it("flags worn tires regardless of cover tier", () => {
    for (const p of CUSTOMER_PROFILES) {
      expect(coveragePrompts(icy, p).some((x) => x.id === "tires")).toBe(true);
    }
  });
});
