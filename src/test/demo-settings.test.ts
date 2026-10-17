import { describe, expect, it } from "vitest";
import { defaultDemoSettings } from "../lib/demo-settings";

describe("inclusive demo defaults", () => {
  it("starts in calm focus", () => expect(defaultDemoSettings.focus).toBe(true));
  it("starts in Finnish", () => expect(defaultDemoSettings.lang).toBe("fi"));
  it("starts in the customer view", () => expect(defaultDemoSettings.view).toBe("customer"));
});