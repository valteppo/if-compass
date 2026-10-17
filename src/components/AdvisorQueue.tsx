import { useState } from "react";
import { Inbox, MessageSquare, Phone, Car, KeyRound, ArrowRight, CheckCircle2, History } from "lucide-react";
import { TOPIC_LABEL, type ContactRequest } from "@/lib/contact-requests";
import { advisorReview } from "@/lib/advisor";
import { tr, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function AdvisorQueue({ requests, lang, onCustomerView }: { requests: ContactRequest[]; lang: Lang; onCustomerView: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = requests.find(r => r.id === selectedId) ?? requests[0];
  const review = selected ? advisorReview(selected) : null;
  const motorLabels = { full: "Full cover", partial: "Partial cover", basic: "Motor liability" };
  const digitalLabels = { broad: "Broad", basic: "Basic", none: "No digital cover" };
  return (
    <section aria-labelledby="advisor-heading" className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-5">
        <h2 id="advisor-heading" className="flex items-center gap-2 text-xl font-extrabold"><Inbox aria-hidden className="h-5 w-5 text-primary" />{tr("Customer requests", lang)} <span className="text-muted-foreground">{requests.length}</span></h2>
        <span className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 aria-hidden className="h-4 w-4" />{tr("Customer-approved context only", lang)}</span>
      </div>
      {!selected ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Inbox aria-hidden className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-bold">{tr("No contact requests", lang)}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{tr("No customer has requested contact yet.", lang)}</p>
          <Button onClick={onCustomerView} variant="outline" className="mt-6 min-h-11">{tr("Open customer view", lang)}<ArrowRight aria-hidden /></Button>
        </div>
      ) : (
        <div className="grid gap-8 pt-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ul aria-label={tr("Customer requests", lang)} className="space-y-2">
            {requests.map(r => <li key={r.id}><Button variant="ghost" aria-pressed={selected.id === r.id} onClick={() => setSelectedId(r.id)} className={`h-auto min-h-20 w-full justify-start gap-3 whitespace-normal rounded-lg p-3 text-left ${selected.id === r.id ? "bg-accent text-accent-foreground ring-1 ring-primary/30" : "border"}`}>
              <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{r.customerName.slice(0, 1)}</span>
              <span className="min-w-0"><span className="block font-bold">{r.customerName}</span><span className="mt-1 block text-xs text-muted-foreground">{TOPIC_LABEL[r.topic][lang]}</span></span>
            </Button></li>)}
          </ul>
          <article className="min-w-0" aria-label={selected.customerName}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase text-primary">{tr("Next contact", lang)}</p><h3 className="mt-1 text-2xl font-extrabold">{selected.customerName}</h3><p className="mt-1 text-sm text-muted-foreground">{TOPIC_LABEL[selected.topic][lang]}</p></div>
              <div className="flex items-center gap-2 text-sm font-semibold">{selected.channel === "call" ? <Phone aria-hidden className="h-4 w-4 text-primary" /> : <MessageSquare aria-hidden className="h-4 w-4 text-primary" />}<span>{tr(selected.channel === "call" ? "Call tomorrow 12–13" : "Message in My IF within 1 working day", lang)}</span></div>
            </div>
            <div className="mt-6 border-y py-5">
              <h4 className="text-xs font-bold uppercase text-muted-foreground">{tr("Current cover", lang)}</h4>
              {review ? <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3"><Car aria-hidden className="h-6 w-6 text-primary" /><div><p className="text-xs text-muted-foreground">{tr("Motor insurance", lang)}</p><p className="font-bold">{tr(motorLabels[review.profile.motor], lang)}</p></div></div>
                <div className="flex items-center gap-3"><KeyRound aria-hidden className="h-6 w-6 text-primary" /><div><p className="text-xs text-muted-foreground">{tr("Digiturva · concept", lang)}</p><p className="font-bold">{tr(digitalLabels[review.profile.digital], lang)}</p></div></div>
              </div> : <p className="mt-2 text-sm">{tr("Profile unavailable — verify cover with the customer.", lang)}</p>}
            </div>
            <div className="py-5">
              <h4 className="text-xs font-bold uppercase text-primary">{tr("Conversation opening", lang)}</h4>
              <p className="mt-2 text-lg font-semibold">“{tr("You asked us to review your cover. What would you like more peace of mind with?", lang)}”</p>
              <ul className="mt-4 space-y-2 text-sm">
                {review?.motor && <li className="flex items-start gap-2"><ArrowRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{tr(review.motor === "confirm" ? "Confirm current motor cover and explain its terms." : "Compare motor cover options if the customer wants extra support.", lang)}</li>}
                {review?.digital && <li className="flex items-start gap-2"><ArrowRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{tr(review.digital === "confirm" ? "Explain the broad digital support concept; no upgrade needed in this demo." : "Explore optional digital support. Concept only, not an IF product for sale.", lang)}</li>}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">{tr("Coverage and prices must be checked from the actual policy. No automatic changes.", lang)}</p>
            </div>
            <details className="border-t py-2 text-sm"><summary className="cursor-pointer py-3 font-semibold">{tr("Shared with advisor", lang)}</summary><p className="pb-3 text-muted-foreground">{selected.context || tr("Customer chose not to share context.", lang)}</p></details>
            <details className="border-t py-2 text-sm"><summary className="cursor-pointer py-3 font-semibold">{tr("Request history", lang)}</summary><p className="flex items-center gap-2"><History aria-hidden className="h-4 w-4" />{new Intl.DateTimeFormat(lang === "fi" ? "fi-FI" : "en-GB", { day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Helsinki" }).format(selected.createdAt)} · {tr("Latest customer request", lang)}</p><p className="mt-2 pb-3 text-xs text-muted-foreground">{tr("Earlier contacts and contract changes are not connected to this demo.", lang)}</p></details>
          </article>
        </div>
      )}
    </section>
  );
}
