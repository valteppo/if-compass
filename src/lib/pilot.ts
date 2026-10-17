export type PilotInputs = { customers: number; annualClaims: number; reduction: number; contribution: number; annualCost: number };

// Illustrative annual steady-state assumptions, not measured IF results or pilot ROI.
export const pilotDefaults: PilotInputs = { customers: 1000, annualClaims: 200, reduction: 3, contribution: 5, annualCost: 30000 };
export function pilotEconomics(input: PilotInputs) {
  const customers = Math.max(0, input.customers);
  const claims = customers * Math.max(0, input.annualClaims);
  const savings = claims * Math.min(100, Math.max(0, input.reduction)) / 100;
  const contribution = customers * Math.max(0, input.contribution);
  const cost = Math.max(0, input.annualCost);
  return { savings, contribution, cost, net: savings + contribution - cost, breakEvenReduction: claims > 0 ? Math.max(0, (cost - contribution) / claims * 100) : null };
}