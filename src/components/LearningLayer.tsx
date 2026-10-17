import { Button } from "@/components/ui/button";
import { tr, type Lang } from "@/lib/i18n";
import { BookOpen, Check, ShieldCheck, Sparkles } from "lucide-react";
import { safetyScore, type LearningEntry } from "@/lib/learning";

export function LearningLayer({ entries, lang }: { lang: Lang; entries: LearningEntry[] }) {
  const score = safetyScore(entries);
  return (
    <section aria-labelledby="learning-heading" className="border-y bg-card px-6 py-6 md:px-8">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold uppercase text-primary">
            <BookOpen className="h-4 w-4" />
            {tr("Learning & Development", lang)}
          </p>
          <h2 id="learning-heading" className="mt-1 text-2xl font-extrabold">
            {tr("Safer decisions, one step at a time", lang)}
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-risk-low" />
            <div>
              <p className="text-sm font-semibold">{tr("Safety Score", lang)}</p>
              <p
                aria-label={tr("Safety Score", lang)}
                className="text-3xl font-extrabold text-risk-low"
              >
                {score}
                <span className="text-sm font-medium text-muted-foreground"> / 100</span>
              </p>
            </div>
          </div>
          <progress
            aria-label={tr("Safety progress", lang)}
            value={score}
            max={100}
            className="mt-3 h-2 w-full overflow-hidden rounded-full accent-risk-low"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {entries.length} {tr("positive decisions · +", lang)}
            {score - 40} {tr("progress points", lang)}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {tr(
              "Demo progress measure, not a guarantee of safety or an insurance rating. Resets with each scenario.",
              lang,
            )}
          </p>
        </div>
        <div>
          <h3 className="flex items-center gap-2 font-bold">
            <Sparkles className="h-4 w-4 text-primary" />
            {tr("Learning Timeline", lang)}
          </h3>
          {entries.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              {tr("Your next safer decision starts a new chapter.", lang)}
            </p>
          ) : (
            <ol aria-label={tr("Learning Timeline", lang)} className="mt-4 space-y-4 border-l pl-4">
              {entries.map((entry, index) => (
                <li key={entry.id} className="relative">
                  <p className="text-xs font-semibold text-muted-foreground">
                    {tr("Step", lang)} {index + 1} ·{" "}
                    {entry.module === "cyber"
                      ? tr("Digital safety", lang)
                      : tr("Driving safety", lang)}{" "}
                    ·{" "}
                    <time dateTime={new Date(entry.completedAt).toISOString()}>
                      {new Date(entry.completedAt).toLocaleTimeString(
                        lang === "fi" ? "fi-FI" : "en-GB",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </time>
                  </p>
                  <p className="mt-1 flex items-start gap-2 text-sm font-bold">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-risk-low" />
                    {tr(entry.title, lang)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{tr(entry.learned, lang)}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
