import { describe, expect, it } from "vitest";
import { recordLearning, safetyScore, type LearningEntry } from "@/lib/learning";

const entry: LearningEntry = { id: "2fa", title: "Enable 2FA", module: "cyber", learned: "Add a second login check", completedAt: 1 };

describe("Learning progress", () => {
  it("increases Safety Score after a good decision", () => {
    expect(safetyScore(recordLearning([], entry))).toBeGreaterThan(safetyScore([]));
  });
  it("does not reward the same decision twice", () => {
    const first = recordLearning([], entry);
    expect(safetyScore(recordLearning(first, entry))).toBe(safetyScore(first));
  });
  it("keeps learned decisions in completion order", () => {
    const second = { ...entry, id: "ice", completedAt: 2 };
    expect(recordLearning(recordLearning([], entry), second).map((item) => item.id)).toEqual(["2fa", "ice"]);
  });
  it("rewards a plan to act later less than a completed action", () => {
    const planned = recordLearning([], { ...entry, kind: "planned" });
    expect(safetyScore(planned)).toBe(43);
    expect(safetyScore(recordLearning(planned, entry))).toBe(48);
  });
});
