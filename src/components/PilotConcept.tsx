import { useState } from "react";
import { HeartHandshake, ShieldCheck, TrendingUp, FlaskConical, AlertTriangle, ArrowRight } from "lucide-react";
import { pilotDefaults, pilotEconomics, type PilotInputs } from "@/lib/pilot";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import everydayImage from "@/assets/pilot-everyday.jpg";
import { tr, type Lang } from "@/lib/i18n";
import { MilaPilotJourney } from "@/components/MilaJourney";
import type { JourneyState } from "@/lib/mila-journey";

export function PilotConcept({ lang, journeyState, journeyActive }: { lang: Lang; journeyState: JourneyState; journeyActive: boolean }) {
  const [inputs, setInputs] = useState<PilotInputs>(pilotDefaults);
  const result = pilotEconomics(inputs);
  const money = (n: number) => new Intl.NumberFormat(lang === "fi" ? "fi-FI" : "en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const fields: { key: keyof PilotInputs; label: string; max: number }[] = [
    { key: "customers", label: "Customers", max: 1000000 },
    { key: "annualClaims", label: "Annual claims cost / customer (€)", max: 100000 },
    { key: "reduction", label: "Claims cost reduction (%)", max: 100 },
    { key: "contribution", label: "Incremental net contribution / customer / year (€)", max: 100000 },
    { key: "annualCost", label: "Annual operating cost (€)", max: 100000000 },
  ];
  const fi = lang === "fi";
  const criteria = fi ? [
    { icon: HeartHandshake, title: "Asiakasarvo ja elämäntapahtuma", claim: "Uusi työarki, ensilumi ja tietovuoto samana aamuna – yksi selkeä neuvo kerrallaan.", points: ["Todellinen tarve: päästä perille turvallisesti ja pitää digiarki hallussa.", "Ei riskilukuja vaan ymmärrettävä seuraava askel.", "Asiakas päättää, mitä hoidetaan nyt ja mitä myöhemmin."], demo: "Milan 07:15-viesti, lounaan jatko ja illan turvatarkistus." },
    { icon: TrendingUp, title: "Liiketoiminta-arvo Ifille", claim: "Huolenpito, joka näkyy vahinkoina, pysyvyytenä ja luvitettuna kasvuna.", points: ["Vahinkojen ehkäisy: liukkaan aamun kolari jää tapahtumatta.", "Pysyvyys: vakuutus muuttuu laskusta päivittäiseksi kumppaniksi.", "Suostumukseen perustuva käyttödata kertoo, mitkä kumppanipalvelut (renkaat, hinaus, kyberturva) ovat aidosti tarpeen."], demo: "Neuvoja saa vain asiakkaan itse aloittaman pyynnön." },
    { icon: FlaskConical, title: "Toteutettavuus ja skaalautuvuus", claim: "Rakentuu avoimen datan, Ifin järjestelmien ja kumppanien päälle.", points: ["Ilmatieteen laitos ja Fintraffic: avoimet rajapinnat jo käytössä demossa.", "Tietovuotovahti kumppanin kautta asiakkaan luvalla.", "90 päivää, 1 000 asiakasta, päätösportit ennen skaalausta."], demo: "”Näytä tämän hetken oikea data” hakee live-tiedot." },
    { icon: ShieldCheck, title: "Innovaatio ja kokemus", claim: "Varmistaa arjen laadun – ei vain korvaa, kun jotain on jo sattunut.", points: ["Liikenne ja digiturva yhdessä elämänhallinnan tukena.", "Osaa olla hiljaa kiireen keskellä; tarjoukset vasta rauhallisena hetkenä.", "Oppii asiakkaan valinnoista ja keventää seuraavaa päivää."], demo: "”Hoida myöhemmin” muuttaa illan viestiä." },
  ] : [
    { icon: HeartHandshake, title: "Customer value and life event", claim: "A new job, first snow and a data breach on the same morning – one clear piece of advice at a time.", points: ["Real need: arrive safely and keep digital life under control.", "No risk scores – an understandable next step.", "The customer decides what to handle now and what later."], demo: "Mila's 07:15 message, the lunch follow-up and the evening cover check." },
    { icon: TrendingUp, title: "Business value for If", claim: "Care that shows up as fewer claims, higher retention and consented growth.", points: ["Prevention: the icy-morning collision never happens.", "Retention: insurance moves from an annual bill to a daily companion.", "Consented usage data shows which partner services (tyres, towing, cyber) are genuinely needed."], demo: "Advisors only receive requests the customer started." },
    { icon: FlaskConical, title: "Feasibility and scalability", claim: "Built on open data, If systems and partners.", points: ["Finnish Meteorological Institute and Fintraffic open APIs already used in the demo.", "Breach monitoring via a partner, with customer consent.", "90 days, 1,000 customers, decision gates before scaling."], demo: "“Show current real data” fetches live readings." },
    { icon: ShieldCheck, title: "Innovation and experience", claim: "Insuring the quality of everyday life – not only paying out after the fact.", points: ["Traffic and digital safety combined as life management.", "Stays quiet in a rush; offers only in calmer moments.", "Learns from choices and lightens the next day."], demo: "“Handle later” reshapes the evening message." },
  ];
  return <Tabs defaultValue="overview" className="min-w-0">
    <TabsList aria-label={tr("Investment case", lang)} className="mb-6 flex h-auto w-full justify-start gap-1 border-b bg-transparent p-0 pb-2">
      {([["overview", "Overview"], ["economics", "Economics"], ["plan", "Pilot plan"]] as const).map(([value, label]) => <TabsTrigger key={value} value={value} className="h-auto min-h-11 min-w-0 flex-1 whitespace-normal px-2 text-xs sm:flex-none sm:px-5 sm:text-sm">{tr(label, lang)}</TabsTrigger>)}
    </TabsList>
    <TabsContent value="overview">
    <section className="relative isolate overflow-hidden rounded-lg">
      <img src={everydayImage} alt="" width={1536} height={768} className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="pilot-cover absolute inset-0 -z-10" />
      <div className="max-w-xl px-6 py-10 text-primary-foreground sm:px-8 sm:py-14"><p className="text-xs font-semibold">{tr("Pilot proposal · not approved IF material", lang)}</p><h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">IF Compass</h2><p className="mt-4 text-xl font-semibold">{fi ? "Pienet ja suuret päätökset – aamusta iltaan." : "Small and big decisions – from morning to night."}</p><p className="mt-3 text-sm">{fi ? "Elämän suunnannäyttäjä, joka auttaa tekemään parempia valintoja itselle ja läheisille." : "A companion for navigating life and making better choices for yourself and the people you care about."}</p></div>
    </section>
    <section className="py-7" aria-labelledby="criteria-title">
      <p className="text-xs font-bold uppercase text-primary">{fi ? "Arviointikriteerit" : "Judging criteria"}</p>
      <h2 id="criteria-title" className="mt-2 text-2xl font-extrabold">{fi ? "Miksi IF Compass kannattaa pilotoida" : "Why IF Compass deserves a pilot"}</h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2">{criteria.map((c, i) => <li key={c.title} className="rounded-lg border bg-card p-5">
        <div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><c.icon aria-hidden className="h-4 w-4" /></span><h3 className="font-bold"><span className="text-primary">{i + 1}. </span>{c.title}</h3></div>
        <p className="mt-3 text-sm font-semibold">{c.claim}</p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">{c.points.map(p => <li key={p} className="flex gap-2"><ArrowRight aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />{p}</li>)}</ul>
        <p className="mt-4 border-t pt-3 text-xs"><span className="font-bold">{fi ? "Demossa: " : "In the demo: "}</span>{c.demo}</p>
      </li>)}</ol>
    </section>
    <MilaPilotJourney state={journeyState} lang={lang} active={journeyActive} />
    <p className="mt-6 border-l-2 border-primary pl-3 text-sm font-semibold">{fi ? "90 päivän pilotti: mitataan hyödylliset yhteydenotot, hyväksytyt päätökset ja kumppanipalvelut verrokkiryhmää vasten. Pidempi seuranta vahvistaa vahinko- ja pysyvyysvaikutuksen." : "90-day pilot: measure useful contacts, accepted decisions and partner services against a control group. Longer follow-up validates claims and retention impact."}</p>
    </TabsContent>
    <TabsContent value="economics" className="pb-4">
      <p className="text-xs font-bold uppercase text-primary">{tr("Annual assumptions", lang)}</p>
      <h2 className="mt-2 text-2xl font-extrabold">{tr("Annual economics sandbox", lang)}</h2>
      <p className="mt-3 text-sm text-muted-foreground">{tr("Proposal, not an approved IF pilot. All numbers below are editable assumptions, not forecasts or verified IF data.", lang)}</p>
      <p className="mt-1 text-sm text-muted-foreground">{tr("Steady-state annual scenario, not the return on a 3-month pilot.", lang)}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{fields.map(f => <label key={f.key} className="flex flex-col justify-between gap-2 text-sm font-semibold"><span>{tr(f.label, lang)}</span><input type="number" min="0" max={f.max} step={f.key === "reduction" ? "0.5" : "1"} value={inputs[f.key]} onChange={e => setInputs(current => ({ ...current, [f.key]: Math.min(f.max, Math.max(0, Number(e.target.value))) }))} className="min-h-11 w-full rounded-md border bg-background px-3 text-foreground" /></label>)}</div>
      <div aria-live="polite" className="mt-6 grid gap-4 border-y py-5 sm:grid-cols-3">{[
        ["Claims savings / year", result.savings], ["Incremental contribution / year", result.contribution], ["Net impact / year", result.net],
      ].map(([label, value]) => <div key={label}><p className="text-xs text-muted-foreground">{tr(String(label), lang)}</p><p className="mt-1 text-2xl font-extrabold">{money(Number(value))}</p></div>)}</div>
      <p className="mt-3 text-sm font-semibold">{tr("Break-even claims reduction", lang)}: {result.breakEvenReduction === null ? tr("Not calculable", lang) : new Intl.NumberFormat(lang === "fi" ? "fi-FI" : "en-GB", { maximumFractionDigits: 1 }).format(result.breakEvenReduction) + " %"}</p>
      <p className="mt-3 text-xs text-muted-foreground">{tr("Contribution is after claims, servicing, discounts and partner costs. Count retention or cross-sell only once. Operating cost includes staff, data, support and technology; setup investment is separate.", lang)}</p>
      <p role="status" className="mt-4 flex items-start gap-2 text-sm font-bold"><AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-risk-medium" />{tr(result.net < 0 ? "These assumptions do not support scale-up yet." : "Positive scenario — evidence still required.", lang)}</p>
    </TabsContent>
    <TabsContent value="plan"><p className="text-xs font-bold uppercase text-primary">{tr("Pilot decision gates", lang)}</p><h2 className="mt-2 text-2xl font-extrabold">{tr("Test usefulness before scaling", lang)}</h2><ol className="mt-7 space-y-7 border-l-2 border-primary/30 pl-5">{[
      ["Before launch", "Agree budget, owner, data access, legal review, accessibility and success thresholds. Determine sample size from baseline claims data."],
      ["3 months · feasibility", "Tampere motor-customer proposal: test opt-in use, useful contacts, response time, cover reviews and notification fatigue. This is not proof of annual claims savings."],
      ["Longer follow-up · impact", "Compare claims and retention over a suitable season-adjusted period. Scale only with credible incremental value after all costs and no material trust or privacy harms."],
    ].map(([title, text], i) => <li key={title} className="flex gap-3"><span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-bold text-primary">{i + 1}</span><div><h4 className="font-bold">{tr(title, lang)}</h4><p className="mt-1 text-sm text-muted-foreground">{tr(text, lang)}</p></div></li>)}</ol><p className="my-5 border-l-2 border-risk-medium pl-3 text-sm">{tr("Stop or redesign if contacts feel pushy, warnings burden customers, permissions fail or unit economics remain negative.", lang)}</p>
    <details className="border-y py-2"><summary className="cursor-pointer py-3 text-sm font-bold">{tr("Open decisions", lang)}</summary><p className="pb-3 text-sm text-muted-foreground">{tr("IF budget and integration estimate · verified policy terms · partner agreements · legal classification · baseline and control-group design.", lang)}</p></details>
  </TabsContent></Tabs>;
}