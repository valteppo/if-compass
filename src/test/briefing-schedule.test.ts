import { describe, expect, it } from "vitest";
import { buildBriefing, scheduleOptions, snooze } from "@/lib/briefing";

const items = [
  { id: "leak", module: "cyber" as const, weight: 30, level: "High" as const },
  { id: "service", module: "vehicle" as const, weight: 5, level: "Low" as const },
];

describe("risk-level scheduling", () => {
  it("shows a high-risk breach already in the morning", () => {
    expect(buildBriefing(items, {}, [], "morning").now?.id).toBe("leak");
  });
  it("gives high risk only one firm postpone option, medium/low three in the morning", () => {
    expect(scheduleOptions("High", "evening")).toEqual(["tomorrow"]);
    expect(scheduleOptions("Low", "morning")).toEqual(["evening", "tomorrow", "week"]);
  });
  it("ignoring in the evening moves the item to tomorrow, out of tonight", () => {
    const s = snooze({}, "leak", "tomorrow", "High");
    expect(buildBriefing(items, {}, [], "evening", s).now?.id).toBe("service");
  });
  it("moves a low-risk item to next week after two postponements", () => {
    const twice = snooze(snooze({}, "service", "tomorrow", "Low"), "service", "tomorrow", "Low");
    expect(twice["service"]?.until).toBe("week");
  });
  it("lets a high-risk item be postponed 15 min, to work or to the evening in the morning", () => {
    expect(scheduleOptions("High", "morning")).toEqual(["soon", "work", "evening"]);
  });
  it("brings a high-risk item postponed 15 min back in the evening", () => {
    const s = snooze({}, "leak", "soon", "High");
    expect(buildBriefing(items, {}, [], "evening", s).now?.id).toBe("leak");
  });
});
