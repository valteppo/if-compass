import { describe, it, expect } from "vitest";
import { followUp, choiceFrom, roadLevel, parseFmi } from "@/lib/story-engine";

describe("story engine", () => {
  it("remote day at lunch offers the postponed password task, not a tyre shop", () => {
    const f = followUp({ ice: "skip" }, "lunch", true);
    expect(f?.body.en).toContain("password");
    expect(f?.body.en).not.toContain("tyre check takes");
  });
  it("driving in the morning leads to an optional tyre check at lunch", () => {
    expect(followUp({ ice: "act" }, "lunch", true)?.body.en).toContain("tyre check");
  });
  it("evening raises the breach only if it is still unhandled", () => {
    expect(followUp({ ice: "act" }, "evening", true)?.body.en).toContain("password");
    expect(followUp({ ice: "act", leak: "act" }, "evening", true)?.body.en).not.toContain("password");
  });
  it("buttons map to decisions", () => {
    expect(choiceFrom("alt", 1)).toBe("skip");
    expect(choiceFrom("snooze")).toBe("postponed");
  });
  it("freezing wet road is high risk, mild dry road low", () => {
    expect(roadLevel({ airC: -1, roadC: -0.5, snowCm: 2, rainMmH: 0, observedAt: null })).toBe("High");
    expect(roadLevel({ airC: 10, roadC: 10, snowCm: null, rainMmH: 0, observedAt: null })).toBe("Low");
  });
  it("parses FMI values", () => {
    const xml = "<BsWfs:ParameterName>t2m</BsWfs:ParameterName>\n<BsWfs:ParameterValue>-1.2</BsWfs:ParameterValue>";
    expect(parseFmi(xml)["t2m"]).toBe(-1.2);
  });
});
