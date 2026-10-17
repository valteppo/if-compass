import { coveragePrompts, type CoverageSituation } from "@/lib/coverage-prompts";
import type { CustomerProfile } from "@/lib/customer-profiles";
import { tr, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CloudSun, ShieldCheck, Sparkles } from "lucide-react";

// Calm-moment prompts that connect the current situation to the customer's cover.
export function CoveragePrompts({ situation, profile, lang }: { situation: CoverageSituation; profile: CustomerProfile; lang: Lang }) {
  const prompts = coveragePrompts(situation, profile);
  if (prompts.length === 0) return null;
  return (
    <section aria-label={tr("Your cover in these conditions", lang)} className="mt-4 rounded-xl border bg-card p-4 text-sm">
      <p className="flex items-center gap-2 font-bold">
        <CloudSun aria-hidden className="h-5 w-5 text-primary" />
        {tr("Your cover in these conditions", lang)}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {tr("Illustrative examples — check your actual policy terms at IF.", lang)}
      </p>
      <ul className="mt-3 space-y-3">
        {prompts.map((pr) => (
          <li key={pr.id} className="rounded-lg border p-3">
            {pr.covered && (
              <p className="flex items-start gap-2">
                <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{lang === "fi" ? pr.covered.fi : pr.covered.en}</span>
              </p>
            )}
            {pr.upgrade && (
              <p className={`flex items-start gap-2 ${pr.covered ? "mt-2" : ""}`}>
                <Sparkles aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{lang === "fi" ? pr.upgrade.fi : pr.upgrade.en}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
      <Button asChild variant="outline" className="mt-3 h-auto min-h-11 w-full whitespace-normal">
        <a href="https://www.if.fi/henkiloasiakkaat/vakuutukset" target="_blank" rel="noopener noreferrer">
          {tr("Review my cover at IF", lang)}
          <ArrowUpRight aria-hidden />
        </a>
      </Button>
    </section>
  );
}
