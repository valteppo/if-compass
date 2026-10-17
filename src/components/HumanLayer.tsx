import { tr, type Lang } from "@/lib/i18n";
import {
  Heart,
  CloudSnow,
  Route,
  ShieldAlert,
  Database,
  TrendingDown,
  Repeat,
  UserPlus,
  Sparkles,
  LifeBuoy,
  Lightbulb,
  Puzzle,
  BookOpen,
  Check,
} from "lucide-react";

const card = "rounded-2xl border bg-card p-6 shadow-card md:p-8";
const eyebrow = "flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary";
const tag = "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold";

export function Innovation({ lang }: { lang: Lang }) {
  return (
    <section className={card}>
      <p className={eyebrow}>
        <Lightbulb className="h-4 w-4" />
        {tr("What makes it new", lang)}
      </p>
      <h2 className="mt-1 text-2xl font-extrabold">{tr("Innovation & experience", lang)}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            Route,
            tr("Proactive prevention", lang),
            tr("Warns before the risk happens, not after the claim.", lang),
          ],
          [
            Heart,
            tr("Human storytelling", lang),
            tr("Speaks to real moments: school runs, scams, winter mornings.", lang),
          ],
          [
            Database,
            tr("Open data", lang),
            tr("FMI, Digitraffic and HIBP turn public data into personal safety.", lang),
          ],
          [
            Puzzle,
            tr("Modular", lang),
            tr("New modules like home or travel plug in the same way.", lang),
          ],
        ].map(([Icon, n, d]) => {
          const I = Icon as typeof Heart;
          return (
            <div
              key={tr(n as string, lang)}
              className="rounded-xl bg-muted/40 p-4 ring-1 ring-border"
            >
              <I className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-bold">{tr(n as string, lang)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tr(d as string, lang)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
