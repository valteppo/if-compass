// Browser-safe story engine: the customer's morning decision shapes the lunch and evening messages,
// and real data readings are reduced to a few calm, human signals.

export type Choice = "act" | "later" | "skip" | "postponed";
export type Choices = Record<string, Choice>;
export type Moment = "lunch" | "evening";
export type Text = { fi: string; en: string };
export type FollowUp = { title: Text; body: Text };

const VEHICLE_IDS = ["ice", "tires", "brake", "night", "service"];
const CYBER_IDS = ["leak", "weak", "2fa"];

/** Map which button the customer pressed (main / alternative index / snooze) to a decision. */
export function choiceFrom(kind: "main" | "alt" | "snooze", altIndex = 0): Choice {
  if (kind === "main") return "act";
  if (kind === "snooze") return "postponed";
  return altIndex === 0 ? "later" : "skip";
}

export function vehicleChoice(choices: Choices): Choice | null {
  for (const id of VEHICLE_IDS) if (choices[id]) return choices[id];
  return null;
}

export function cyberHandled(choices: Choices): boolean {
  return CYBER_IDS.some((id) => choices[id] && choices[id] !== "postponed");
}

/** One follow-up that reacts to the morning; never more than one, never a sales pitch. */
export function followUp(choices: Choices, moment: Moment, hasBreach: boolean): FollowUp | null {
  const car = vehicleChoice(choices);
  const cyberPending = hasBreach && !cyberHandled(choices);
  if (moment === "lunch") {
    if (car === "skip")
      return {
        title: { fi: "Hyvä päätös jäädä pois tieltä", en: "Good call staying off the road" },
        body: cyberPending
          ? { fi: "Aamun liukkaus jäi taakse. Jos sinulla on 2 minuuttia, aamulta siirretty salasana-asia sopii lounastaukoon.", en: "The icy morning is behind you. If you have 2 minutes, the password task you moved fits a lunch break." }
          : { fi: "Auto odottaa rauhassa. Renkaiden tarkistus sopii viikonloppuun ennen seuraavaa pidempää ajoa.", en: "The car can wait. A tyre check fits the weekend before your next longer drive." },
      };
    if (car === "act" || car === "later")
      return {
        title: { fi: "Selvisit aamun liukkaalta tieltä", en: "You made it through the icy morning" },
        body: { fi: "Tuntuiko pito heikolta? Rengasliikkeen pikatarkastus vie noin 10 minuuttia — vain jos se sopii päivääsi.", en: "Did the grip feel weak? A quick tyre check takes about 10 minutes — only if it fits your day." },
      };
    if (car === "postponed")
      return {
        title: { fi: "Aamun asia odottaa vielä", en: "This morning's task is still waiting" },
        body: { fi: "Siirsit ajoasian. Keli lauhtuu iltapäivällä — paluumatkalla kannattaa varata vähän lisäaikaa.", en: "You postponed the drive task. Roads ease in the afternoon — allow a little extra time on the way home." },
      };
    return null;
  }
  if (cyberPending)
    return {
      title: { fi: "Rauhallinen hetki tietoturvalle", en: "A calm moment for online safety" },
      body: car === "skip"
        ? { fi: "Etäpäivä säästi matka-ajan. Salasanan vaihto vie 2 minuuttia ja sulkee aamun tietovuodon oven.", en: "Your remote day saved travel time. A 2-minute password change closes this morning's breach." }
        : { fi: "Päivä on takana. Salasanan vaihto vie 2 minuuttia ja sulkee aamun tietovuodon oven.", en: "The day is done. A 2-minute password change closes this morning's breach." },
    };
  if (car)
    return {
      title: { fi: "Päivä hoidettu", en: "Your day is sorted" },
      body: { fi: "Teit tänään turvallisia valintoja. Huomisen aamun keli tarkistetaan puolestasi klo 06:30.", en: "You made safe choices today. Tomorrow's roads are checked for you at 06:30." },
    };
  return null;
}

/* ---------- Real data: Ilmatieteen laitos (FMI) + Fintraffic Digitraffic ---------- */
export type Reading = { airC: number | null; roadC: number | null; snowCm: number | null; rainMmH: number | null; observedAt: string | null };
export type RoadLevel = "High" | "Medium" | "Low";

/** Pull the latest value per parameter from FMI's simple WFS XML (no DOM needed on the server). */
export function parseFmi(xml: string): Record<string, number> {
  const out: Record<string, number> = {};
  const re = /<BsWfs:ParameterName>([^<]+)<\/BsWfs:ParameterName>\s*<BsWfs:ParameterValue>([^<]+)<\/BsWfs:ParameterValue>/g;
  for (const m of xml.matchAll(re)) {
    const v = Number(m[2]);
    if (m[1] && Number.isFinite(v)) out[m[1]] = v;
  }
  return out;
}

export function sensor(json: { sensorValues?: { name: string; value: number }[] }, name: string): number | null {
  const s = json.sensorValues?.find((x) => x.name === name);
  return s && Number.isFinite(s.value) ? s.value : null;
}

/** Road risk from real readings: freezing road surface with moisture or snow is high risk. */
export function roadLevel(r: Reading): RoadLevel {
  const road = r.roadC ?? r.airC;
  if (road === null) return "Low";
  const wet = (r.rainMmH ?? 0) > 0 || (r.snowCm ?? 0) > 0;
  if (road <= 0 && wet) return "High";
  if (road <= 2) return "Medium";
  return "Low";
}
