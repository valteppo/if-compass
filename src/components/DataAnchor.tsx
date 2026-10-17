import { useState } from "react";
import { Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLiveConditions } from "@/lib/live-data.functions";
import type { Lang } from "@/lib/i18n";

type Live = Awaited<ReturnType<typeof getLiveConditions>>;

/** Small trust anchor under the Compass message: where the signal came from, plus an optional live check. */
export function DataAnchor({ lang, module }: { lang: Lang; module: "cyber" | "vehicle" }) {
  const fi = lang === "fi";
  const [live, setLive] = useState<Live | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const load = async () => {
    setState("loading");
    try { setLive(await getLiveConditions()); setState("idle"); } catch { setState("error"); }
  };
  const lvl = live ? { High: fi ? "korkea" : "high", Medium: fi ? "kohtalainen" : "medium", Low: fi ? "matala" : "low" }[live.level] : "";
  const fmt = (v: number | null, u: string) => (v === null ? "–" : `${v.toFixed(1)} ${u}`);
  return (
    <div className="mt-4 rounded-xl border border-border/60 p-3 text-xs text-muted-foreground">
      <p className="flex items-center gap-2 font-semibold">
        <Radio aria-hidden className="h-3.5 w-3.5 text-primary" />
        {module === "vehicle"
          ? fi ? "Lähteet: Ilmatieteen laitos (Espoo) · Fintraffic Digitraffic (kt51 Karhusaari)" : "Sources: Finnish Meteorological Institute (Espoo) · Fintraffic Digitraffic (road 51 Karhusaari)"
          : fi ? "Tietovuotosignaali: keksitty demodata · HIBP ei ole kytketty" : "Breach signal: fictional demo data · HIBP is not connected"}
      </p>
      <p className="mt-1">{fi ? "Viestin arvot ovat kiinnitettyä demodataa. Oikean datan tarkistus ei muuta tarinaa eikä takaa reitin turvallisuutta." : "Message values are fixed demo data. A live check does not change the story or establish route safety."}</p>
      {module === "vehicle" && (
        <div className="mt-2">
          {!live && (
            <Button variant="outline" size="sm" className="min-h-10" onClick={load} disabled={state === "loading"}>
              {state === "loading" ? (fi ? "Haetaan…" : "Loading…") : fi ? "Näytä tämän hetken oikea data" : "Show real data right now"}
            </Button>
          )}
          {state === "error" && <p role="alert" className="mt-1">{fi ? "Oikeaa dataa ei saatu nyt. Tarina toimii silti." : "Live data unavailable right now. The story still works."}</p>}
          {live && (
            <p role="status" className="mt-1 text-foreground">
              {fi ? "Nyt Espoossa" : "Now in Espoo"}: {fi ? "ilma" : "air"} {fmt(live.reading.airC, "°C")}, {fi ? "tienpinta" : "road surface"} {fmt(live.reading.roadC, "°C")}, {fi ? "sade" : "rain"} {fmt(live.reading.rainMmH, "mm/h")} → {fi ? "tieriski" : "road risk"} <strong>{lvl}</strong>
              {live.reading.observedAt && <> · {new Date(live.reading.observedAt).toLocaleTimeString(fi ? "fi-FI" : "en-GB", { hour: "2-digit", minute: "2-digit" })}</>}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
