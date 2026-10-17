import { OFFERS, type Moment } from "@/lib/offers";
import { profileBenefit, type CustomerProfile } from "@/lib/customer-profiles";
import { tr, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check, Minus } from "lucide-react";

export function CoverBenefits({ moment, profile, lang }: { moment: Moment; profile: CustomerProfile; lang: Lang }) {
  const list = OFFERS.filter(o => o.moment === moment).map(o => ({ ...o, benefit: profileBenefit(o, profile) }));
  return (
    <section aria-label={tr("Explore my benefits", lang)} className="mt-4 border-t pt-4 text-sm">
      <p className="font-bold">{profile.name} · {tr(moment === "lunch" ? "Lunch 12:00" : "Evening 19:00", lang)}</p>
      <p className="mt-1 text-xs text-muted-foreground">{tr("Illustrative benefit · not a verified IF offer", lang)}</p>
      <ul className="mt-3 space-y-2">
        {list.map((o) => (
          <li key={o.id} className="rounded-lg border p-3">
            <div className="flex items-start justify-between gap-3"><p className="font-semibold">{lang === "fi" ? o.fi : o.en}</p><span className="shrink-0 font-bold text-primary">{o.benefit === null ? <Minus aria-hidden className="h-5 w-5" /> : o.benefit > 0 ? `−${o.benefit} %` : <Check aria-hidden className="h-5 w-5" />}</span></div>
            <p className="mt-1 text-xs text-muted-foreground">{o.partner}{!o.real ? ` · ${tr("Potential partner", lang)}` : ""}</p>
            <p className="mt-1 text-xs">{tr(o.id === "id" ? "Check eligibility at IF" : o.benefit === null ? "Not in your demo package" : "Included in demo package", lang)}</p>
          </li>
        ))}
      </ul>
      <Button asChild variant="outline" className="mt-3 h-auto min-h-11 w-full whitespace-normal"><a href={moment === "lunch" ? "https://www.if.fi/henkiloasiakkaat/vakuutukset/autovakuutus" : "https://www.if.fi/henkiloasiakkaat/vahingot/koti-ja-omaisuus/identiteettivarkaus"} target="_blank" rel="noopener noreferrer">{tr(moment === "lunch" ? "Compare motor cover at IF" : "Check eligibility at IF", lang)}<ArrowUpRight aria-hidden /></a></Button>
    </section>
  );
}
