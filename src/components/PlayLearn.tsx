import { Button } from "@/components/ui/button";
import { tr, type Lang } from "@/lib/i18n";
import { useId, useState } from "react";
import { Car, Check, Clock, Gamepad2, Snowflake, TrafficCone, X } from "lucide-react";
import { departure, exposedAccounts, gameOrder, stoppingDistance, type Surface } from "@/lib/play";
import { KeyRound, ShieldCheck } from "lucide-react";

const card = "rounded-2xl border bg-card p-6 shadow-card md:p-8";

const quizzes = [
  {
    id: "quiz-cruise",
    module: "vehicle" as const,
    q: "Road turns icy on the highway.",
    a: ["Keep cruise control on", "Turn cruise control off"],
    right: 1,
    learned: "Cruise control off on ice — you keep control of the speed.",
  },
  {
    id: "quiz-skid",
    module: "vehicle" as const,
    q: "The car starts to slide.",
    a: ["Look and steer where you want to go", "Brake hard and look at the obstacle"],
    right: 0,
    learned: "Look where you want to go — your hands follow your eyes.",
  },
  {
    id: "quiz-phish",
    module: "cyber" as const,
    q: "SMS: “Your bank account is locked, tap here”.",
    a: ["Tap the link quickly", "Open the bank app yourself"],
    right: 1,
    learned: "Open the app yourself — never trust a link in an urgent message.",
  },
];

export type QuizWin = { id: string; module: "cyber" | "vehicle"; title: string; learned: string };

function StoppingDistance({ lang }: { lang: Lang }) {
  const [tread, setTread] = useState(3);
  const [surface, setSurface] = useState<Surface>("ice");
  const id = useId();
  const mine = stoppingDistance(50, tread, surface);
  const fresh = stoppingDistance(50, 8, surface);
  const max = stoppingDistance(50, 1.6, "ice");
  const bars = [
    { label: "Fresh tires · 8 mm", d: fresh, tone: "bg-risk-low" },
    {
      label: `Your tires · ${tread} mm`,
      d: mine,
      tone: mine - fresh > 8 ? "bg-risk-high" : "bg-risk-medium",
    },
  ];
  return (
    <div className="rounded-xl border p-4">
      <p className="flex items-center gap-2 font-bold">
        <Car className="h-4 w-4 text-primary" />
        {tr("What IF I brake on…", lang)}
      </p>
      <div role="group" aria-label={tr("Road surface", lang)} className="mt-3 flex gap-2">
        {(["dry", "wet", "ice"] as const).map((s) => (
          <Button
            variant="ghost"
            key={tr(s, lang)}
            aria-pressed={surface === s}
            onClick={() => setSurface(s)}
            className={`min-h-11 flex-1 rounded-lg text-sm font-semibold capitalize ring-1 ${surface === s ? "bg-primary text-primary-foreground ring-primary" : "ring-border hover:bg-muted"}`}
          >
            {s === "ice" && <Snowflake className="mr-1 inline h-3.5 w-3.5" />}
            {tr(s, lang)}
          </Button>
        ))}
      </div>
      <label htmlFor={id} className="mt-4 block text-sm font-semibold">
        {tr("Tire tread:", lang)} {tread} mm
      </label>
      <input
        id={id}
        type="range"
        min={1.6}
        max={8}
        step={0.2}
        value={tread}
        onChange={(e) => setTread(Number(e.target.value))}
        aria-valuetext={tr(`${tread} millimetres`, lang)}
        className="mt-1 h-11 w-full accent-primary"
      />
      <div className="mt-2 space-y-3" aria-live="polite">
        {bars.map((b) => (
          <div key={tr(b.label, lang)}>
            <div className="flex justify-between text-xs font-semibold">
              <span>{tr(b.label, lang)}</span>
              <span>{b.d} m</span>
            </div>
            <div className="mt-1 h-4 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ${b.tone}`}
                style={{ width: `${(b.d / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
        <p className="text-sm font-bold">
          {mine > fresh
            ? tr(
                `+${mine - fresh} m — about ${Math.round((mine - fresh) / 4.5)} car lengths longer.`,
                lang,
              )
            : tr("Same as new tires.", lang)}
        </p>
      </div>
    </div>
  );
}

function DepartureSandbox({ lang }: { lang: Lang }) {
  const [m, setM] = useState(15);
  const id = useId();
  const d = departure(m);
  const time = `0${7 + Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
  const tone =
    d.risk >= 60 ? "text-risk-high" : d.risk >= 35 ? "text-risk-medium" : "text-risk-low";
  return (
    <div className="rounded-xl border p-4">
      <p className="flex items-center gap-2 font-bold">
        <Clock className="h-4 w-4 text-primary" />
        {tr("What if I leave at…", lang)}
      </p>
      <label htmlFor={id} className="mt-3 block text-3xl font-extrabold">
        {time}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={90}
        step={5}
        value={m}
        onChange={(e) => setM(Number(e.target.value))}
        aria-valuetext={tr(`Leave at ${time}`, lang)}
        className="mt-1 h-11 w-full accent-primary"
      />
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>07:00</span>
        <span>{tr("Gritter 07:40", lang)}</span>
        <span>08:30</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center" aria-live="polite">
        <div className="rounded-lg bg-muted/50 p-2">
          <Snowflake className="mx-auto h-4 w-4" />
          <p className="mt-1 text-sm font-bold">{d.iced ? tr("Icy", lang) : tr("Gritted", lang)}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <TrafficCone className="mx-auto h-4 w-4" />
          <p className="mt-1 text-sm font-bold">{d.rush ? tr("Rush", lang) : tr("Light", lang)}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <Clock className="mx-auto h-4 w-4" />
          <p className="mt-1 text-sm font-bold">{d.travel} min</p>
        </div>
      </div>
      <p className={`mt-3 text-sm font-bold ${tone}`}>
        {tr("Trip risk", lang)} {d.risk}/100
      </p>
    </div>
  );
}

function Quiz({ onWin, lang }: { lang: Lang; onWin: (w: QuizWin) => void }) {
  const [k, setK] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const q = quizzes[k] ?? quizzes[0];
  if (!q) return null;
  const ok = pick === q.right;
  const choose = (n: number) => {
    setPick(n);
    if (n === q.right)
      onWin({
        id: q.id,
        module: q.module,
        title: `Quick choice: ${q.a[q.right]}`,
        learned: q.learned,
      });
  };
  return (
    <div className="rounded-xl border p-4">
      <p className="flex items-center gap-2 font-bold">
        <Gamepad2 className="h-4 w-4 text-primary" />
        {tr("What IF I had 5 seconds?", lang)} {k + 1}/{quizzes.length}
      </p>
      <p className="mt-3 text-base font-semibold">{tr(q.q, lang)}</p>
      <div className="mt-3 grid gap-2">
        {q.a.map((a, n) => (
          <Button
            variant="ghost"
            key={tr(a, lang)}
            disabled={pick !== null}
            onClick={() => choose(n)}
            className={`flex min-h-11 items-center gap-2 rounded-lg px-3 text-left text-sm font-semibold ring-1 ${pick === n ? (n === q.right ? "bg-risk-low/15 ring-risk-low" : "bg-risk-high/10 ring-risk-high") : "ring-border hover:bg-muted"}`}
          >
            {pick === n &&
              (n === q.right ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />)}
            {tr(a, lang)}
          </Button>
        ))}
      </div>
      {pick !== null && (
        <div role="status" className="mt-3">
          <p className={`text-sm font-bold ${ok ? "text-risk-low" : "text-foreground"}`}>
            {ok ? `${tr("Nice work!", lang)} +8` : tr("Close. Here's the trick:", lang)}{" "}
            {tr(q.learned, lang)}
          </p>
          {k < quizzes.length - 1 && (
            <Button
              variant="ghost"
              onClick={() => {
                setK(k + 1);
                setPick(null);
              }}
              className="mt-2 min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              {tr("Next", lang)}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function PasswordChain({ onWin, lang }: { lang: Lang; onWin: (w: QuizWin) => void }) {
  const [reused, setReused] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const n = exposedAccounts(reused, twoFactor);
  const accounts = ["Email", "Bank", "Shop", "Social", "Cloud"];
  const safe = n <= 1;
  const toggle = (r: boolean, f: boolean) => {
    setReused(r);
    setTwoFactor(f);
    if (exposedAccounts(r, f) === 0)
      onWin({ id: "game-password", module: "cyber", title: "Contained the leak", learned: "Unique passwords and two-factor login keep one leak in one place." });
  };
  return (
    <div className="rounded-xl border p-4">
      <p className="flex items-center gap-2 font-bold">
        <KeyRound className="h-4 w-4 text-primary" />
        {tr("What IF one password leaks?", lang)}
      </p>
      <div className="mt-3 grid gap-2">
        <Button variant="ghost" aria-pressed={!reused} onClick={() => toggle(!reused, twoFactor)}
          className={`min-h-11 rounded-lg text-sm font-semibold ring-1 ${!reused ? "bg-primary text-primary-foreground ring-primary" : "ring-border hover:bg-muted"}`}>
          {tr(reused ? "Same password everywhere" : "Unique passwords", lang)}
        </Button>
        <Button variant="ghost" aria-pressed={twoFactor} onClick={() => toggle(reused, !twoFactor)}
          className={`min-h-11 rounded-lg text-sm font-semibold ring-1 ${twoFactor ? "bg-primary text-primary-foreground ring-primary" : "ring-border hover:bg-muted"}`}>
          <ShieldCheck className="mr-1 h-4 w-4" />
          {tr("Two-factor login on", lang)}
        </Button>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-hidden="true">
        {accounts.map((a, i) => (
          <li key={a} className={`rounded-md px-2 py-1 text-xs font-semibold ${i < n ? "bg-risk-high/15 text-risk-high" : "bg-risk-low/15 text-risk-low"}`}>{a}</li>
        ))}
      </ul>
      <p aria-live="polite" className={`mt-3 text-sm font-bold ${safe ? "text-risk-low" : "text-risk-high"}`}>
        {n} / 5 {tr("accounts an attacker could open", lang)} —{" "}
        {tr(safe ? "One leak opens only one door." : "One leak spreads to your other accounts.", lang)}
      </p>
    </div>
  );
}

export function PlayLearn({
  title,
  onWin,
  lang,
  scenarioId = "winter",
}: {
  lang: Lang;
  scenarioId?: string;
  title: string;
  onWin: (w: QuizWin) => void;
}) {
  return (
    <section aria-labelledby="play-heading" className={card}>
      <p className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
        {lang === "fi" ? "Valinnainen" : "Optional"}
      </p>
      <h2 id="play-heading" className="mt-2 flex items-center gap-2 text-2xl font-extrabold">
        <Gamepad2 className="h-6 w-6 text-primary" />
        {tr("What IF…? game", lang)}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {tr("Try a different choice and see what happens. Optional — games never affect your insurance price.", lang)}
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {gameOrder(scenarioId).map((g, i) => (
          <div key={g} className={i === 0 ? "md:col-span-2" : undefined}>
            {i === 0 && (
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
                {tr("Picked for today's situation", lang)}
              </p>
            )}
            {g === "brake" && <StoppingDistance lang={lang} />}
            {g === "depart" && <DepartureSandbox lang={lang} />}
            {g === "password" && <PasswordChain lang={lang} onWin={onWin} />}
            {g === "quiz" && <Quiz lang={lang} onWin={onWin} />}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{tr("Demo estimates.", lang)}</p>
    </section>
  );
}
