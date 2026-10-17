import { describe, it, expect } from "vitest";
import { addRequest, suggestedTopic } from "@/lib/contact-requests";
import { getCustomer } from "@/lib/customer-profiles";

const base = { customerId: "mila", customerName: "Mila", channel: "call" as const, topic: "both" as const, slot: "x", context: "c" };

describe("contact requests", () => {
  it("keeps one open request per customer", () => {
    let list = addRequest([], base, 1);
    list = addRequest(list, { ...base, channel: "message" }, 2);
    expect(list).toHaveLength(1);
    expect(list[0]?.channel).toBe("message");
  });
  it("keeps requests from different customers", () => {
    const list = addRequest(addRequest([], base, 1), { ...base, customerId: "riku", customerName: "Riku" }, 2);
    expect(list.map((r) => r.customerId)).toEqual(["riku", "mila"]);
  });
  it("suggests the topic with room for extra care", () => {
    expect(suggestedTopic(getCustomer("valtteri")!)).toBe("both");
    expect(suggestedTopic({ id: "x", name: "X", motor: "full", digital: "none" })).toBe("digital");
    expect(suggestedTopic({ id: "x", name: "X", motor: "partial", digital: "broad" })).toBe("motor");
  });
});
