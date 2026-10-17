import { Button } from "@/components/ui/button";
import { tr, type Lang } from "@/lib/i18n";
import { AlertTriangle, Check, Briefcase } from "lucide-react";

const findings = [
  {
    risk: "Engagement fades after week two",
    fix: "Short 5-second choices, streak-free progress and only one alert at a time keep it light. KPI: 30-day active rate.",
    status: "Addressed in demo",
  },
  {
    risk: "Unclear money story — cross-sell looks small",
    fix: "Lead with avoided claims (loss prevention); add-ons only appear after a customer action.",
    status: "Addressed in demo",
  },
  {
    risk: "Liability if advice is wrong or late",
    fix: "Advice is always framed as guidance, shows its data source, and falls back safely when feeds fail.",
    status: "Addressed in demo",
  },
  {
    risk: "Accessibility and EU Accessibility Act (2025)",
    fix: "Screen-reader labels, live announcements, icons beside colours, big touch targets, calm focus mode.",
    status: "Addressed in demo",
  },
  {
    risk: "Integration cost with IF core systems",
    fix: "Pilot reads only open data plus opt-in telematics; claims and CRM links via existing APIs.",
    status: "Needs IF IT estimate",
  },
  {
    risk: "No proof the numbers are real",
    fix: "Run a 3-month pilot with ~1,000 Tampere car customers; measure claim frequency against a control group.",
    status: "Needs pilot",
  },
  {
    risk: "AI Act / GDPR review",
    fix: "No sensitive profiling, opt-in per data source; formal DPIA and AI Act classification still required.",
    status: "Needs legal review",
  },
];

export function InvestorReview({ lang }: { lang: Lang }) {
  return (
    <section
      aria-labelledby="ceo-heading"
      className="rounded-2xl border bg-card p-6 shadow-card md:p-8"
    >
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
        <Briefcase className="h-4 w-4" />
        {tr("CEO investment review", lang)}
      </p>
      <h2 id="ceo-heading" className="mt-1 text-2xl font-extrabold">
        {tr("Would I fund this? Yes — as a pilot.", lang)}
      </h2>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {findings.map((f) => {
          const open = !f.status.startsWith("Addressed");
          return (
            <li key={tr(f.risk, lang)} className="rounded-xl border p-4">
              <p className="flex items-start gap-2 text-sm font-bold">
                {open ? (
                  <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-risk-medium" />
                ) : (
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-risk-low" />
                )}
                {tr(f.risk, lang)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{tr(f.fix, lang)}</p>
              <span
                className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ${open ? "bg-risk-medium/10 text-risk-medium ring-risk-medium/30" : "bg-risk-low/10 text-risk-low ring-risk-low/30"}`}
              >
                {tr(f.status, lang)}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm font-semibold">
        {tr(
          "Ask: a 3-month Tampere pilot. Go/no-go metric: measurable drop in winter claim frequency.",
          lang,
        )}
      </p>
    </section>
  );
}
