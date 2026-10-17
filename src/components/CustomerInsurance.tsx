import { useState } from "react";
import { Car, ShieldCheck, Shield, Check, Minus, ArrowUpRight, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CUSTOMER_PROFILES, supportFor, type CustomerProfile } from "@/lib/customer-profiles";
import { tr, type Lang } from "@/lib/i18n";

const motorLabels = { full: "Full cover", partial: "Partial cover", basic: "Motor liability" };
const digitalLabels = { broad: "Broad", basic: "Basic", none: "No digital cover" };

function SupportStrip({ profile, module, lang }: { profile: CustomerProfile; module: "vehicle" | "cyber"; lang: Lang }) {
  const labels = module === "vehicle" ? ["Safety guidance", "Roadside support", "Partner benefits"] : ["Safety guidance", "Digital advice", "Recovery assistance"];
  const available = supportFor(profile, module);
  return <ul className="mt-3 grid grid-cols-3 gap-2">
    {labels.map((label, i) => <li key={label} className={`flex min-w-0 flex-col items-center gap-1 border-t-4 pt-2 text-center text-xs ${available[i] ? "border-primary text-foreground" : "border-border text-muted-foreground"}`}>
      {available[i] ? <Check aria-hidden className="h-4 w-4 text-primary" /> : <Minus aria-hidden className="h-4 w-4" />}
      <span>{tr(label, lang)}</span><span className="sr-only">{tr(available[i] ? "Available in demo" : "Not in this demo cover", lang)}</span>
    </li>)}
  </ul>;
}

export function CustomerInsurance({ profile, onSelect, lang }: { profile: CustomerProfile; onSelect: (id: string) => void; lang: Lang }) {
  const [open, setOpen] = useState(false);
  return <section aria-label={tr("My insurance", lang)} className="border-y border-border py-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="font-bold">{tr("My insurance", lang)}</h2>

    </div>
    <Button variant="ghost" className="mt-3 h-auto w-full justify-start gap-3 whitespace-normal py-3 text-left" onClick={() => setOpen(true)} aria-label={tr("Insurance details", lang)}>
      <Car aria-hidden className="h-6 w-6 shrink-0 text-primary" />
      <span className="min-w-0 flex-1"><span className="block text-xs text-muted-foreground">{tr("Motor insurance", lang)}</span><span className="block font-bold">{tr(motorLabels[profile.motor], lang)}</span></span>
      <KeyRound aria-hidden className="h-6 w-6 shrink-0 text-primary" />
      <span className="min-w-0 flex-1"><span className="block text-xs text-muted-foreground">{tr("Digiturva · concept", lang)}</span><span className="block font-bold">{tr(digitalLabels[profile.digital], lang)}</span></span>
      <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0" />
    </Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent closeLabel={lang === "fi" ? "Sulje" : "Close"} className="max-h-[85dvh] overflow-y-auto">
        <DialogTitle>{profile.name} · {tr("My insurance", lang)}</DialogTitle>
        <DialogDescription>{tr("Illustrative policies and benefits, not a coverage decision. Digiturva is a product idea, not an existing IF product.", lang)}</DialogDescription>
        <div className="border-b pb-4"><h3 className="flex items-center gap-2 font-bold"><Car aria-hidden className="h-5 w-5" />{tr(motorLabels[profile.motor], lang)}</h3><SupportStrip profile={profile} module="vehicle" lang={lang} /></div>
        <div><h3 className="flex items-center gap-2 font-bold"><Shield aria-hidden className="h-5 w-5" />{tr("Digiturva · concept", lang)} · {tr(digitalLabels[profile.digital], lang)}</h3><SupportStrip profile={profile} module="cyber" lang={lang} /></div>
        <p className="text-sm text-muted-foreground">{tr("Broad concept: digital advice, recovery assistance and partner benefits. Basic concept: advice and smaller partner benefits. Neither guarantees security or reimbursement.", lang)}</p>
        <p className="text-xs text-muted-foreground">{tr("Actual coverage depends on your policy, exclusions and excess. Motor liability is not cover for damage to your own car. Identity-theft cover must be checked separately, not inferred from motor cover.", lang)}</p>
        <Button asChild variant="outline"><a href="https://www.if.fi/henkiloasiakkaat/vakuutukset/autovakuutus" target="_blank" rel="noopener noreferrer">{tr("Compare motor cover at IF", lang)}<ArrowUpRight aria-hidden /></a></Button>
      </DialogContent>
    </Dialog>
  </section>;
}

export function ContextInsurance({ profile, module, lang }: { profile: CustomerProfile; module: "cyber" | "vehicle"; lang: Lang }) {
  return <details className="mt-4 border-y py-1 text-sm">
    <summary className="flex min-h-11 cursor-pointer items-center gap-2"><ShieldCheck aria-hidden className="h-5 w-5 shrink-0 text-primary" /><span className="flex-1 font-semibold">{tr("Your support for this situation", lang)}</span><span className="text-xs text-muted-foreground">{tr(module === "vehicle" ? motorLabels[profile.motor] : digitalLabels[profile.digital], lang)}{module === "cyber" ? " · " + tr("Digiturva · concept", lang) : ""}</span></summary>
    <SupportStrip profile={profile} module={module} lang={lang} />
    <p className="my-3 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck aria-hidden className="h-4 w-4 shrink-0" />{tr("Insurance affects support, not risk urgency.", lang)}</p>
  </details>;
}