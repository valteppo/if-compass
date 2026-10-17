import { createServerFn } from "@tanstack/react-start";
import { parseFmi, sensor, roadLevel, type Reading } from "@/lib/story-engine";

// Public open data only: FMI observations for Espoo and Fintraffic road weather station kt51 Espoo Karhusaari (Länsiväylä).
export const getLiveConditions = createServerFn({ method: "GET" }).handler(async () => {
  const reading: Reading = { airC: null, roadC: null, snowCm: null, rainMmH: null, observedAt: null };
  const sources: string[] = [];
  try {
    const res = await fetch(
      "https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::simple&place=espoo&parameters=t2m,snow_aws,r_1h&maxlocations=1",
    );
    if (res.ok) {
      const v = parseFmi(await res.text());
      reading.airC = v["t2m"] ?? null;
      reading.snowCm = v["snow_aws"] !== undefined && v["snow_aws"] >= 0 ? v["snow_aws"] : null;
      sources.push("fmi");
    }
  } catch { /* source unavailable; keep other data */ }
  try {
    const res = await fetch("https://tie.digitraffic.fi/api/weather/v1/stations/1047/data", {
      headers: { "Digitraffic-User": "IF-Risk-Compass-demo", "Accept-Encoding": "gzip" },
    });
    if (res.ok) {
      const j = (await res.json()) as { dataUpdatedTime?: string; sensorValues?: { name: string; value: number }[] };
      reading.roadC = sensor(j, "TIE_1");
      reading.rainMmH = sensor(j, "SADE_INTENSITEETTI");
      reading.airC ??= sensor(j, "ILMA");
      reading.observedAt = j.dataUpdatedTime ?? null;
      sources.push("digitraffic");
    }
  } catch { /* source unavailable */ }
  return { reading, level: roadLevel(reading), sources };
});
