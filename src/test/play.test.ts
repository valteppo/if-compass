import { describe, expect, it } from "vitest";
import { departure, stoppingDistance } from "@/lib/play";

describe("Learning by playing", () => {
  it("worn tires need a longer stop on ice than fresh tires", () => {
    expect(stoppingDistance(50, 3, "ice")).toBeGreaterThan(stoppingDistance(50, 8, "ice"));
  });
  it("ice needs a longer stop than dry road", () => {
    expect(stoppingDistance(50, 8, "ice")).toBeGreaterThan(stoppingDistance(50, 8, "dry"));
  });
  it("leaving after the gritter at 07:40 avoids ice", () => {
    expect(departure(39).iced).toBe(true);
    expect(departure(40).iced).toBe(false);
  });
  it("leaving at 08:10 is lower risk than leaving at 07:30", () => {
    expect(departure(70).risk).toBeLessThan(departure(30).risk);
  });
});

import { exposedAccounts, gameOrder } from "@/lib/play";
describe("What IF games", () => {
  it("a reused password opens all 5 accounts, a unique one only 1", () => {
    expect(exposedAccounts(true, false)).toBe(5);
    expect(exposedAccounts(false, false)).toBe(1);
  });
  it("two-factor login keeps every account closed", () => {
    expect(exposedAccounts(true, true)).toBe(0);
  });
  it("the breach scenario starts with the password game", () => {
    expect(gameOrder("breaches")[0]).toBe("password");
  });
});
