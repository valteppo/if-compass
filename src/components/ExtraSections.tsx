import { Button } from "@/components/ui/button";
import { tr, type Lang } from "@/lib/i18n";
import { useState } from "react";
import {
  Link2,
  Brain,
  Handshake,
  Users,
  Wrench,
  GraduationCap,
  Snowflake,
  Mail,
} from "lucide-react";

type Item = { id: string; title: string; module: "cyber" | "vehicle"; weight: number };

const card = "rounded-2xl border bg-card p-6 shadow-card md:p-8";
const eyebrow = "flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary";

export function ExtraSections({
  insights,
  done,
  cold,
  lang,
}: {
  lang: Lang;
  insights: Item[];
  done: Record<string, boolean>;
  cold: boolean;
}) {
  const [segment, setSegment] = useState("young");
  const open = insights.filter((i) => !done[i.id]);

  const segments: Record<string, { label: string; cyber: string; vehicle: string; offer: string }> =
    {
      young: {
        label: "Young driver",
        cyber: "Short in-app nudges about social media scams and reused passwords.",
        vehicle: "Night and speed coaching first; winter driving course suggested.",
        offer: "Young driver kasko with telematics discount",
      },
      family: {
        label: "Family",
        cyber: "Shared family 2FA checklist and child account protection.",
        vehicle: "School-run route alerts on icy mornings, child seat reminders.",
        offer: "Family car + home bundle",
      },
      senior: {
        label: "Senior",
        cyber: "Phone-call scam warnings in plain language, larger text, call-back from IF.",
        vehicle: "Daylight route planning and annual service reminders.",
        offer: "Roadside assistance with personal help line",
      },
      tech: {
        label: "Tech-savvy",
        cyber: "Detailed breach data, passkey setup, security key support.",
        vehicle: "Full telematics dashboard and EV charging route risk.",
        offer: "Identity protection with advanced monitoring",
      },
    };
  const seg = segments[segment] ?? segments["young"];

  if (!seg) return null;
  return (
    <>
      {/* Cross-module synergy */}
      <section className={card}>
        <p className={eyebrow}>
          <Link2 className="h-4 w-4" />
          {tr("Cross-module synergy", lang)}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold">{tr("One signal, two protections", lang)}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {tr(
            'Modules share only anonymous context signals (like "severe weather in region"), never personal data such as your location history or account details.',
            lang,
          )}
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            {
              icon: Snowflake,
              sig: "Severe winter weather",
              on: cold,
              eff: "Raises driving risk and warns about fake 'roadside help' and delivery-delay phishing emails that spike in storms.",
            },
            {
              icon: Mail,
              sig: "New breach detected",
              on: insights.some((i) => i.id === "leak"),
              eff: "Vehicle module warns about fake parking and toll payment SMS that use leaked contact data.",
            },
            {
              icon: Wrench,
              sig: "Service overdue",
              on: insights.some((i) => i.id === "service"),
              eff: "Cyber module flags fake 'car recall' emails asking you to log in.",
            },
          ].map((s) => (
            <div
              key={tr(s.sig, lang)}
              className={`rounded-xl p-4 ring-1 ${s.on ? "bg-accent/60 ring-primary/30" : "bg-muted/40 ring-border"}`}
            >
              <div className="flex items-center gap-2">
                <s.icon className="h-4 w-4 text-primary" />
                <p className="text-sm font-bold">{tr(s.sig, lang)}</p>
              </div>
              <p className="mt-1 text-[11px] font-semibold uppercase text-muted-foreground">
                {s.on ? tr("Active now", lang) : tr("Not active in this scenario", lang)}
              </p>
              <p className="mt-2 text-sm">{tr(s.eff, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coaching engine (internal explanation) */}
      <section className={card}>
        <p className={eyebrow}>
          <Brain className="h-4 w-4" />
          {tr("Habit & coaching engine", lang)}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold">
          {tr("One supportive coach, no escalating warnings", lang)}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {tr(
            'When Mila can\'t act right away, she picks a low-friction alternative ("Remind me at 19:00"). Plans earn a little progress, completed actions earn more, and both appear on her Learning Timeline. The tone never becomes firmer — ignored advice is never punished. Open items now:',
            lang,
          )}
          <span className="font-bold text-foreground">{open.length}</span>.
        </p>
      </section>

      {/* Partner ecosystem */}
      <section className={card}>
        <p className={eyebrow}>
          <Handshake className="h-4 w-4" />
          {tr("Service ecosystem", lang)}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold">{tr("Partners that finish the job", lang)}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Wrench,
              name: "Auto repair shops",
              d: "Book tire change or service directly from a vehicle insight. IF-partner discount.",
            },
            {
              icon: Snowflake,
              name: "Tire hotels",
              d: "Seasonal tire swap reminders tied to the first frost forecast.",
            },
            {
              icon: GraduationCap,
              name: "Cyber education",
              d: "15-minute phishing and password courses after a breach is found.",
            },
            {
              icon: Users,
              name: "Driving schools",
              d: "Winter and slippery-road training for drivers with high-risk patterns.",
            },
          ].map((p) => (
            <div key={tr(p.name, lang)} className="rounded-xl bg-muted/40 p-4 ring-1 ring-border">
              <p.icon className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-bold">{tr(p.name, lang)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tr(p.d, lang)}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {tr(
            "Partners are examples. Only the action the customer chooses is shared, with consent.",
            lang,
          )}
        </p>
      </section>

      {/* Segmentation */}
      <section className={card}>
        <p className={eyebrow}>
          <Users className="h-4 w-4" />
          {tr("Customer segments", lang)}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold">{tr("Same risks, different advice", lang)}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(segments).map(([id, s]) => (
            <Button
              variant="ghost"
              key={id}
              onClick={() => setSegment(id)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ${segment === id ? "bg-primary text-primary-foreground ring-primary" : "ring-border hover:bg-muted"}`}
            >
              {tr(s.label, lang)}
            </Button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {tr("Cybersecurity", lang)}
            </p>
            <p className="mt-1 text-sm">{tr(seg.cyber, lang)}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {tr("Vehicle", lang)}
            </p>
            <p className="mt-1 text-sm">{tr(seg.vehicle, lang)}</p>
          </div>
          <div className="rounded-xl bg-accent/60 p-4 ring-1 ring-primary/30">
            <p className="text-xs font-bold uppercase text-primary">
              {tr("Suggested IF offer", lang)}
            </p>
            <p className="mt-1 text-sm font-semibold">{tr(seg.offer, lang)}</p>
          </div>
        </div>
      </section>
    </>
  );
}
