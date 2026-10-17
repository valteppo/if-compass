import { Compass, Snowflake, KeyRound, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tr, type Lang } from "@/lib/i18n";
import { DAY_TIMES, EMOTIONAL_CONTEXT, MILA_LIFE_CONTEXT, milaMessage, type DayMoment, type JourneyState } from "@/lib/mila-journey";
import { DataAnchor } from "@/components/DataAnchor";

export function MilaJourneyMessage({ state, moment, lang, onAction, onRoadChoice, onPostpone }: {
  state: JourneyState; moment: DayMoment; lang: Lang;
  onAction: (id: "ice" | "leak") => void;
  onRoadChoice: (choice: "later" | "skip") => void;
  onPostpone: (until: "evening" | "tomorrow") => void;
}) {
  const message = milaMessage(state, moment);
  const Icon = message.id === "ice" ? Snowflake : message.id === "leak" ? KeyRound : Check;
  return <div aria-live="polite" className="mt-5">
    <p className="text-sm font-semibold text-muted-foreground">{tr(message.context, lang)}</p>
    <Icon aria-hidden className="my-5 h-10 w-10 text-primary" />
    <h2 className="text-3xl font-extrabold leading-tight">{tr(message.title, lang)}</h2>
    <p className="mt-3 max-w-xl text-base">{tr(message.body, lang)}</p>
    <p className="mt-3 text-sm font-bold text-primary">{tr(message.urgency === "before_departure" ? "Before leaving" : message.urgency === "today" ? "Important today · you choose the moment" : "At your pace", lang)}</p>
    {message.id && <div className="mt-6 grid gap-3">
      <Button size="lg" className="h-auto min-h-12 whitespace-normal" onClick={() => { if (message.id) onAction(message.id); }}>{tr(message.action ?? "See the password steps", lang)}<ArrowRight aria-hidden /></Button>
      {message.id === "ice" ? <>
        <Button variant="secondary" size="lg" className="h-auto min-h-12 whitespace-normal" onClick={() => onRoadChoice("later")}>{tr("I'll reassess conditions before leaving later", lang)}</Button>
        <Button variant="outline" size="lg" className="h-auto min-h-12 whitespace-normal" onClick={() => onRoadChoice("skip")}>{tr("I'm not driving today", lang)}</Button>
      </> : <Button variant="outline" size="lg" className="h-auto min-h-12 whitespace-normal" onClick={() => onPostpone(moment === "evening" ? "tomorrow" : "evening")}>{tr(moment === "evening" ? "Remind me tomorrow evening" : "Handle later · remind me at 19:00", lang)}</Button>}
    </div>}
    {message.urgency === "scheduled" && <Button variant="outline" className="mt-5 h-auto min-h-11 whitespace-normal" onClick={() => onAction("leak")}>{tr("I have time now · open password steps", lang)}</Button>}
    {moment === "morning" && message.id === "ice" && !state.done["leak"] && <details className="mt-5 border-t pt-3">
      <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold">{tr("Also noted: LinkedIn breach signal", lang)}</summary>
      <p className="mt-2 text-sm text-muted-foreground">{tr("The breach signal is not proof of account takeover. You choose a handling time; suspected misuse needs immediate attention.", lang)}</p>
      <div className="mt-3 flex flex-wrap gap-2"><Button variant="outline" className="h-auto min-h-11 whitespace-normal" onClick={() => onAction("leak")}>{tr("See the password steps", lang)}</Button><Button variant="outline" className="h-auto min-h-11 whitespace-normal" onClick={() => onPostpone("evening")}>{tr("Handle later · remind me at 19:00", lang)}</Button></div>
      {state.snoozed["leak"] && <p role="status" className="mt-2 text-sm text-primary">{tr("Reminder saved for 19:00. The task is still open.", lang)}</p>}
    </details>}
    <DataAnchor lang={lang} module={message.id === "ice" ? "vehicle" : "cyber"} />
  </div>;
}

export function MilaPilotJourney({ state, lang, active = true }: { state: JourneyState; lang: Lang; active?: boolean }) {
  return <section className="border-y py-6">
    <p className="flex items-center gap-2 text-xs font-bold uppercase text-primary"><Compass aria-hidden className="h-4 w-4" />{tr("Mila · one day, one shared story", lang)}</p>
    <h2 className="mt-2 text-2xl font-extrabold">{tr("An important morning. Care through the day.", lang)}</h2>
    <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{tr(MILA_LIFE_CONTEXT, lang)}</p>
    <p className="mt-2 text-xs font-semibold">{tr(active ? "Reflects Mila's saved choices in the snowy-morning demo." : "Mila's saved snowy-morning story · separate from the currently selected customer or scenario.", lang)}</p>
    <ol className="mt-6 grid gap-6 md:grid-cols-3">{(["morning", "lunch", "evening"] as const).map(moment => {
      const message = milaMessage(state, moment);
      return <li key={moment} className="min-w-0 border-l-2 border-primary/30 pl-4"><p className="text-xl font-extrabold text-primary">{DAY_TIMES[moment]}</p><p className="mt-1 text-xs font-bold text-muted-foreground">{tr(EMOTIONAL_CONTEXT[moment].emotion, lang)}</p><h3 className="mt-3 font-bold">{tr(message.title, lang)}</h3><p className="mt-2 text-sm">{tr(message.body, lang)}</p><p className="mt-3 text-xs text-muted-foreground">{tr(message.context, lang)}</p></li>;
    })}</ol>
    <p className="mt-5 text-xs text-muted-foreground">{tr("Emotional arc is a design intention, not a measured feeling. Test usefulness, trust and opt-in cover reviews; validate retention and claims against a control group. No guaranteed NPS or savings uplift.", lang)}</p>
  </section>;
}