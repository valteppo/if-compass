// Partner benefits tied to the customer's IF cover; shown only at calm moments (lunch 12:00, evening 19:00).
export type Tier = "full" | "partial" | "basic";
export type Moment = "lunch" | "evening";
export type Offer = {
  id: string;
  partner: string;
  real: boolean; // true = existing IF partner, false = potential partner idea
  fi: string;
  en: string;
  discount: number; // % for full cover; partial gets less, basic none
  moment: Moment;
  module: "cyber" | "vehicle";
};

export const OFFERS: Offer[] = [
  { id: "tires", partner: "Vianor", real: true, fi: "Renkaanvaihto ja rengashotelli", en: "Tire change & tire hotel", discount: 10, moment: "lunch", module: "vehicle" },
  { id: "tow", partner: "Viking Hinaus", real: true, fi: "Tiepalvelu 24/7, ei omavastuuta", en: "24/7 roadside help, no excess", discount: 0, moment: "lunch", module: "vehicle" },
  { id: "course", partner: "Ajoharjoittelukeskus (potentiaali)", real: false, fi: "Liukkaan kelin ajokurssi", en: "Slippery-road driving course", discount: 15, moment: "evening", module: "vehicle" },
  { id: "pw", partner: "Salasanamanageri-kumppani (potentiaali)", real: false, fi: "Salasanojen hallinta, 6 kk", en: "Password manager, 6 months", discount: 20, moment: "evening", module: "cyber" },
  { id: "id", partner: "If Laaja oikeusturva", real: true, fi: "Identiteettivarkausturva (enint. 2 000 €)", en: "Identity-theft cover (up to €2,000)", discount: 0, moment: "evening", module: "cyber" },
];

// Full cover = full benefit; partial cover = half the discount (rounded down); basic = included services only.
export function benefitFor(o: Offer, tier: Tier): number | null {
  if (tier === "full") return o.discount;
  if (tier === "partial") return o.id === "tow" ? null : Math.floor(o.discount / 2);
  return null;
}

export function offersAt(moment: Moment, tier: Tier) {
  return OFFERS.filter((o) => o.moment === moment).map((o) => ({ ...o, benefit: benefitFor(o, tier) }));
}
