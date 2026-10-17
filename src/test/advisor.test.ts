import { describe, expect, it } from "vitest";
import { advisorReview } from "@/lib/advisor";
import type { ContactRequest } from "@/lib/contact-requests";

const request: ContactRequest = { id: "r1", customerId: "riku", customerName: "Riku", channel: "call", topic: "motor", slot: "tomorrow 12–13", context: "", createdAt: 1 };

describe("advisor discussion boundaries", () => {
  it("limits suggestions to the customer's chosen topic", () => {
    expect(advisorReview(request)?.motor).toBe("compare");
    expect(advisorReview(request)?.digital).toBeNull();
    expect(advisorReview({ ...request, topic: "digital" })?.motor).toBeNull();
  });
  it("confirms broad existing cover rather than pushing an upgrade", () => {
    expect(advisorReview({ ...request, customerId: "mila", topic: "both" })).toMatchObject({ motor: "confirm", digital: "confirm" });
  });
  it("does not derive sales topics from shared risk context", () => {
    expect(advisorReview({ ...request, context: "data breach, worn tires" })).toEqual(advisorReview(request));
  });
  it("does not substitute another customer's cover for unknown profiles", () => {
    expect(advisorReview({ ...request, customerId: "unknown" })).toBeNull();
  });
});