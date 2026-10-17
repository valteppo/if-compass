// Situation-aware coverage prompts, shown only at calm moments (lunch/evening).
// Tone: never "you lack essential cover" — full cover gets reassurance, narrower cover gets a gentle option.
import type { CustomerProfile } from "@/lib/customer-profiles";

export type CoverageSituation = {
  temperature: number;
  roadRisk: "Low" | "Medium" | "High";
  tireTreadMm: number;
  breaches: string[];
};

export type CoveragePrompt = {
  id: string;
  module: "cyber" | "vehicle";
  // What the customer's current cover concept already helps with in this situation.
  covered: { fi: string; en: string } | null;
  // A gentle, optional upgrade idea — only when the current cover is narrower.
  upgrade: { fi: string; en: string } | null;
};

const WORN_TIRE_MM = 4; // Finnish winter-tire recommendation threshold used in the demo.

export function coveragePrompts(s: CoverageSituation, p: CustomerProfile): CoveragePrompt[] {
  const out: CoveragePrompt[] = [];

  if (s.roadRisk !== "Low" || s.temperature < 1) {
    out.push({
      id: "weather",
      module: "vehicle",
      covered:
        p.motor === "full"
          ? {
              fi: "Täyskaskosi kattaa myös tuulilasin ja oman auton vauriot liukkaalla — voit ajaa rauhallisin mielin.",
              en: "Your full cover also includes windscreen and own-car damage on icy roads — drive with peace of mind.",
            }
          : p.motor === "partial"
            ? {
                fi: "Osakaskosi turvaa monissa talvitilanteissa, mutta oman auton kolhut ja tuulilasi eivät aina kuulu siihen.",
                en: "Your partial cover helps in many winter situations, but own-car dents and the windscreen are not always included.",
              }
            : null,
      upgrade:
        p.motor === "full"
          ? null
          : {
              fi: "Jos haluat pientä ekstrahoivaa talveen: täyskasko kattaisi myös tuulilasin ja oman auton vauriot. Päivitys onnistuu verkossa muutamassa minuutissa.",
              en: "If you'd like a little extra care for winter: full cover would also include the windscreen and own-car damage. Upgrading online takes a few minutes.",
            },
    });
  }

  if (s.tireTreadMm < WORN_TIRE_MM) {
    out.push({
      id: "tires",
      module: "vehicle",
      covered: null,
      upgrade: {
        fi: "Renkaidesi urasyvyys alittaa suositukset. Kaskotaso ei vaikuta rengasetuihin — mutta kumppaniedut voivat helpottaa vaihtoa.",
        en: "Your tire tread is below recommendations. Cover tier doesn't affect tire benefits — but partner benefits can make the swap easier.",
      },
    });
  }

  if (s.breaches.length > 0) {
    out.push({
      id: "breach",
      module: "cyber",
      covered:
        p.digital === "broad"
          ? {
              fi: "Laajan Digiturva-konseptisi ansiosta sinulla olisi tuki ja neuvonta tällaisessa tietovuototilanteessa — vuoto ei todennäköisesti hetkauttaisi sinua.",
              en: "With your broad Digiturva concept you'd have support and advice in a breach like this — it likely wouldn't shake you.",
            }
          : p.digital === "basic"
            ? {
                fi: "Perus-Digiturva-konseptisi antaa neuvontaa vuototilanteessa, mutta ei vielä henkilökohtaista selvitysapua.",
                en: "Your basic Digiturva concept provides advice in a breach, but not yet personal recovery assistance.",
              }
            : null,
      upgrade:
        p.digital === "broad"
          ? null
          : {
              fi: "Jos haluat huolettomampaa digiarkea: laajempi Digiturva-konsepti toisi henkilökohtaista apua tietovuotojen selvittelyyn.",
              en: "For more carefree digital life: a broader Digiturva concept would add personal help in sorting out breaches.",
            },
    });
  }

  return out;
}
