import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Lock,
  Smartphone,
  Car,
  Moon,
  Snowflake,
  Gauge,
  Wrench,
  CircleDot,
  Compass,
  Check,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Loader2,
  Thermometer,
  TrafficCone,
  Siren,
  Radio,
  X,
  Database,
  Heart,
  TrendingDown,
  TrendingUp,
  Users,
  Info,
  Sun,
  CloudSnow,
  ShieldAlert,
  Leaf,
  Scale,
  Clock,
  Coins,
  Eye,
  Network,
  Map,
  Ban,
  HeartHandshake,
  Target,
  RefreshCw,
  FileCheck,
  Home,
  Plane,
  Baby,
  Building2,
} from "lucide-react";
import { ExtraSections } from "@/components/ExtraSections";
import { Innovation } from "@/components/HumanLayer";
import { LearningLayer } from "@/components/LearningLayer";
import { PlayLearn } from "@/components/PlayLearn";
import { DemoControls } from "@/components/DemoControls";
import { PilotConcept } from "@/components/PilotConcept";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { reminderFor, lessonFor, recordLearning, type LearningEntry } from "@/lib/learning";
import { buildBriefing, defaultCadence, scheduleOptions, snooze, type Cadence, type Phase, type Snooze, type SnoozeUntil } from "@/lib/briefing";
import { CoverBenefits } from "@/components/CoverBenefits";
import { CoveragePrompts } from "@/components/CoveragePrompts";
import { ContactAdvisor } from "@/components/ContactAdvisor";
import { AdvisorQueue } from "@/components/AdvisorQueue";
import { addRequest, type ContactRequest } from "@/lib/contact-requests";
import { ClipboardList } from "lucide-react";
import { CustomerInsurance, ContextInsurance } from "@/components/CustomerInsurance";
import { getCustomer, CUSTOMER_PROFILES, storyKey } from "@/lib/customer-profiles";

type CustomerStory = { done: Record<string, boolean>; learning: LearningEntry[]; snoozed: Record<string, Snooze>; choices?: Choices; moment?: DayMoment };

const snoozeLabel = (u: SnoozeUntil, fi: boolean) =>
  ({
    soon: fi ? "Muistuta 15 min päästä" : "Remind me in 15 min",
    work: fi ? "Kun olen töissä (09:00)" : "When I'm at work (09:00)",
    evening: fi ? "Tänä iltana klo 19:00" : "Tonight at 19:00",
    tomorrow: fi ? "Huomenna illalla" : "Tomorrow evening",
    week: fi ? "Viikon päästä" : "In a week",
  })[u];

// Real-life alternatives that also resolve the risk, so the app offers choices instead of one command.
const ALTERNATIVES: Record<string, [string, string][]> = {
  ice: [["Lähden 20 min myöhemmin, hiekoituksen jälkeen", "I'll leave 20 min later, after gritting"], ["En aja tänään", "I'm not driving today"]],
  night: [["Pidän tauon matkalla", "I'll take a break on the way"]],
  brake: [["Ajan tänään rauhallisemmin ja pidän välimatkaa", "I'll drive calmer and keep distance today"]],
  tires: [["En aja tänään, tarkistan renkaat ensin", "Not driving until tires are checked"]],
  leak: [["Vaihdan sen työkoneelta aamupäivällä", "I'll change it from my work computer this morning"]],
};
import { t, tr, type Lang } from "@/lib/i18n";

import { defaultDemoSettings } from "@/lib/demo-settings";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AccessibilityGuide, OfficialSupport } from "@/components/AccessibleSupport";

import { followUp, choiceFrom, type Choices, type Choice } from "@/lib/story-engine";
import { DataAnchor } from "@/components/DataAnchor";
import { MilaJourneyMessage } from "@/components/MilaJourney";
import { journeyChoices, type DayMoment } from "@/lib/mila-journey";

const STORE = "if-risk-compass-demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IF Compass — Arjen turvakumppani | If-konsepti" },
      {
        name: "description",
        content:
          "IF Compass -konsepti: rauhalliset turvallisuusviestit, oppiminen ja asiakkaan valitsema yhteys If-neuvojaan.",
      },
      { property: "og:title", content: "IF Compass" },
      { property: "og:description", content: "Arjen turvakumppani: turvallisuusviestit, oppiminen ja asiakkaan valitsema huolenpito." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LINKS = {
  linkedin: "https://www.linkedin.com/psettings/change-password",
  identity: "https://www.if.fi/henkiloasiakkaat/vahingot/koti-ja-omaisuus/identiteettivarkaus",
  claim: "https://www.if.fi/henkiloasiakkaat/vahingot",
  roadside: "https://www.if.fi/henkiloasiakkaat/vahingot/ajoneuvo/hinaus",
  kasko: "https://www.if.fi/henkiloasiakkaat/vakuutukset/autovakuutus",
};

/* ---------- Scenarios (mock feeds) ---------- */
type Scenario = {
  id: string;
  name: string;
  icon: typeof Sun;
  blurb: string;
  cyber: { breaches: string[]; passwordStrength: "Weak" | "Strong"; twoFactorAuth: boolean };
  vehicle: {
    weather: { temperature: number; condition: string; roadRisk: "Low" | "Medium" | "High" };
    traffic: { trafficLevel: "Light" | "Moderate" | "Heavy"; accidentsNearby: number };
    driving: { nightDrivingPercentage: number; hardBrakes: number; speedingIncidents: number };
    tireTreadMm: number;
    serviceDueKm: number;
  };
};

const scenarios: Scenario[] = [
  {
    id: "winter",
    name: "Snow + risky driving",
    icon: CloudSnow,
    blurb: "Typical Finnish November morning",
    cyber: { breaches: ["LinkedIn"], passwordStrength: "Weak", twoFactorAuth: false },
    vehicle: {
      weather: { temperature: -2, condition: "Snow", roadRisk: "High" },
      traffic: { trafficLevel: "Heavy", accidentsNearby: 1 },
      driving: { nightDrivingPercentage: 28, hardBrakes: 3, speedingIncidents: 1 },
      tireTreadMm: 3.1,
      serviceDueKm: 1200,
    },
  },
  {
    id: "calm",
    name: "Sunny + safe driving",
    icon: Sun,
    blurb: "Everything looks good",
    cyber: { breaches: [], passwordStrength: "Strong", twoFactorAuth: true },
    vehicle: {
      weather: { temperature: 14, condition: "Clear", roadRisk: "Low" },
      traffic: { trafficLevel: "Light", accidentsNearby: 0 },
      driving: { nightDrivingPercentage: 6, hardBrakes: 0, speedingIncidents: 0 },
      tireTreadMm: 6.5,
      serviceDueKm: 8400,
    },
  },
  {
    id: "breaches",
    name: "Multiple breaches",
    icon: ShieldAlert,
    blurb: "Identity under pressure",
    cyber: {
      breaches: ["LinkedIn", "Adobe", "Online pharmacy"],
      passwordStrength: "Weak",
      twoFactorAuth: false,
    },
    vehicle: {
      weather: { temperature: 8, condition: "Cloudy", roadRisk: "Low" },
      traffic: { trafficLevel: "Moderate", accidentsNearby: 0 },
      driving: { nightDrivingPercentage: 10, hardBrakes: 1, speedingIncidents: 0 },
      tireTreadMm: 5.8,
      serviceDueKm: 5200,
    },
  },
  {
    id: "storm",
    name: "Black ice + night",
    icon: Snowflake,
    blurb: "Severe road conditions",
    cyber: { breaches: [], passwordStrength: "Strong", twoFactorAuth: false },
    vehicle: {
      weather: { temperature: -9, condition: "Freezing rain", roadRisk: "High" },
      traffic: { trafficLevel: "Heavy", accidentsNearby: 3 },
      driving: { nightDrivingPercentage: 41, hardBrakes: 6, speedingIncidents: 2 },
      tireTreadMm: 3.4,
      serviceDueKm: 600,
    },
  },
];

/* ---------- Insight model ---------- */
type Level = "Low" | "Medium" | "High";
const levelStyle: Record<Level, string> = {
  Low: "bg-risk-low/12 text-risk-low ring-risk-low/30",
  Medium: "bg-risk-medium/15 text-risk-medium ring-risk-medium/30",
  High: "bg-risk-high/12 text-risk-high ring-risk-high/30",
};
const levelFrom = (s: number): Level => (s >= 60 ? "High" : s >= 30 ? "Medium" : "Low");

type Flow = {
  title: string;
  steps: string[];
  result: string;
  link: { label: string; href: string };
};
type Insight = {
  id: string;
  module: "cyber" | "vehicle";
  icon: typeof Lock;
  title: string;
  detail: string;
  why: string;
  benefit: string;
  source: string;
  value: string[];
  action: string;
  weight: number;
  level: Level;
  flow: Flow;
  outcome: string;
};

function cyberInsights(s: Scenario): Insight[] {
  const c = s.cyber;
  const out: Insight[] = [];
  if (c.breaches.length)
    out.push({
      id: "leak",
      module: "cyber",
      icon: KeyRound,
      level: "High",
      weight: 16 + 8 * c.breaches.length,
      title:
        c.breaches.length > 1
          ? `${c.breaches.length} breaches detected`
          : `Breach detected: ${c.breaches[0]}`,
      detail: `Your email found in: ${c.breaches.join(", ")}.`,
      why: "Attackers try leaked passwords on other services.",
      benefit: "Change it now so nobody can get into your accounts.",
      source: "Breach data · HIBP-style mock",
      value: ["Fewer identity theft claims", "Builds trust in IF"],
      action: "Fix now",
      outcome: "Leaked passwords replaced. Breach monitoring is on.",
      flow: {
        title: "Securing your accounts",
        steps: [
          "Verifying breach records",
          "Revoking active sessions",
          "Generating strong new passwords",
          "Routing to LinkedIn password change",
        ],
        result: "Passwords changed and old sessions signed out.",
        link: { label: "Change password on LinkedIn", href: LINKS.linkedin },
      },
    });
  if (c.passwordStrength === "Weak")
    out.push({
      id: "weak",
      module: "cyber",
      icon: Lock,
      level: "Medium",
      weight: 18,
      title: "Password strength: Weak",
      detail: "Your email, streaming and shop accounts share a similar password.",
      why: "One leak can unlock all three.",
      benefit: "One strong password per account, so a single leak stays a small problem.",
      source: "Password check · k-anonymity mock",
      value: ["More customers protected online"],
      action: "Improve security",
      outcome: "3 reused passwords replaced with unique ones.",
      flow: {
        title: "Strengthening your passwords",
        steps: [
          "Scanning saved accounts",
          "Flagging 3 reused passwords",
          "Creating unique replacements",
        ],
        result: "3 passwords replaced.",
        link: { label: "IF Identity insurance", href: LINKS.identity },
      },
    });
  if (!c.twoFactorAuth)
    out.push({
      id: "2fa",
      module: "cyber",
      icon: Smartphone,
      level: "High",
      weight: 22,
      title: "Two-factor authentication: Off",
      detail: "Your main email has no second login step.",
      why: "Email resets every other account. 2FA blocks most automated takeover attempts.",
      benefit: "Turn on 2FA to protect your identity, even if a password leaks.",
      source: "Account status · IdP-style mock",
      value: ["Fewer identity claims", "More customers taking up cyber protection"],
      action: "Enable 2FA",
      outcome: "2FA is on for your email. Backup codes are saved.",
      flow: {
        title: "Turning on 2FA",
        steps: ["Connecting authenticator app", "Verifying 6-digit code", "Saving backup codes"],
        result: "2FA is on.",
        link: { label: "IF Identity insurance", href: LINKS.identity },
      },
    });
  return out;
}

function vehicleInsights(s: Scenario): Insight[] {
  const v = s.vehicle;
  const out: Insight[] = [];
  if (v.weather.roadRisk === "High")
    out.push({
      id: "ice",
      module: "vehicle",
      icon: Snowflake,
      level: "High",
      weight: 24,
      title: `${v.weather.condition} and icy roads on your route`,
      detail: `${v.weather.temperature} °C. Road risk is High on the Tampere ring road.`,
      why: "Braking distance on ice can be up to 10× longer.",
      benefit: "Avoid icy roads to keep your family safe on the way to school and work.",
      source: "Weather · OpenWeather-style mock · Road data · Digitraffic-style mock",
      value: ["Fewer accident claims"],
      action: "Avoid icy roads",
      outcome: "Switched to gritted main roads: +4 min, much lower risk.",
      flow: {
        title: "Finding a safer route",
        steps: [
          "Reading live road weather",
          "Checking gritted roads",
          "Comparing 3 alternative routes",
        ],
        result: "Safer route saved for tomorrow morning.",
        link: { label: "IF Roadside assistance", href: LINKS.roadside },
      },
    });
  if (v.driving.nightDrivingPercentage >= 20)
    out.push({
      id: "night",
      module: "vehicle",
      icon: Moon,
      level: "Medium",
      weight: 14,
      title: `Night driving ${v.driving.nightDrivingPercentage}%`,
      detail: "A large share of your kilometres were driven between 22:00 and 05:00.",
      why: "Visibility and tiredness raise accident risk at night.",
      benefit: "Rest reminders help you arrive safely, not just on time.",
      source: "Telematics · OBD-style mock",
      value: ["Fewer accident claims", "Customers stay longer with IF"],
      action: "Get tips",
      outcome: "Rest reminders are on for drives over 2 hours.",
      flow: {
        title: "Night driving plan",
        steps: ["Analysing your night trips", "Building a rest-stop plan"],
        result: "Rest reminders set.",
        link: { label: "IF Car insurance", href: LINKS.kasko },
      },
    });
  if (v.driving.hardBrakes + v.driving.speedingIncidents >= 3)
    out.push({
      id: "brake",
      module: "vehicle",
      icon: Gauge,
      level: "Medium",
      weight: 12,
      title: `${v.driving.hardBrakes} hard brakes · ${v.driving.speedingIncidents} speeding`,
      detail: "Mostly in heavy traffic on Hervannan valtaväylä.",
      why: "Usually a sign of short following distance.",
      benefit: "Calmer driving means less stress, less fuel and fewer close calls.",
      source: "Telematics · OBD-style mock · Traffic · Google Traffic-style mock",
      value: ["Fewer collision claims"],
      action: "View trips",
      outcome: "Coaching tips added to your next 5 trips.",
      flow: {
        title: "Reviewing your trips",
        steps: ["Loading telematics", "Marking events on your trips"],
        result: "Coaching tips added.",
        link: { label: "Report a claim (vahinkoilmoitus)", href: LINKS.claim },
      },
    });
  if (v.tireTreadMm < 4)
    out.push({
      id: "tires",
      module: "vehicle",
      icon: CircleDot,
      level: "High",
      weight: 14,
      title: `Tire tread ${v.tireTreadMm} mm`,
      detail: "Close to the 3 mm winter legal minimum.",
      why: "Worn tires lose grip on snow and slush.",
      benefit: "Fresh tires give you grip when it matters most.",
      source: "Tire sensor · TPMS-style mock",
      value: ["Fewer accident claims", "Partner workshop sales"],
      action: "Check tires",
      outcome: "Tire check booked for Sat 10:00.",
      flow: {
        title: "Checking your tires",
        steps: [
          `Reading tread sensor: ${v.tireTreadMm} mm`,
          "Comparing with winter minimum (3 mm)",
          "Finding a partner workshop near you",
        ],
        result: "Tire check booked.",
        link: { label: "IF Roadside assistance", href: LINKS.roadside },
      },
    });
  if (v.serviceDueKm < 2000)
    out.push({
      id: "service",
      module: "vehicle",
      icon: Wrench,
      level: "Medium",
      weight: 6,
      title: `Service due in ${v.serviceDueKm} km`,
      detail: "Brakes and lights get checked during the service.",
      why: "A well-kept car breaks down less often.",
      benefit: "No surprise breakdowns on cold mornings.",
      source: "Vehicle data · OEM API-style mock",
      value: ["Fewer roadside call-outs"],
      action: "Book maintenance",
      outcome: "Service booked for Tue 08:30.",
      flow: {
        title: "Booking a service",
        steps: ["Checking service interval", "Finding free slots"],
        result: "Service booked.",
        link: { label: "IF Roadside assistance", href: LINKS.roadside },
      },
    });
  return out;
}

type Rec = { id: string; title: string; href: string; cta: string; reasons: string[] };
function recommendations(s: Scenario): { cyber: Rec; vehicle: Rec[] } {
  const c = s.cyber,
    v = s.vehicle;
  const idR: string[] = [];
  if (c.breaches.length)
    idR.push(
      `Your email appears in ${c.breaches.length} known breach${c.breaches.length > 1 ? "es" : ""}`,
    );
  if (!c.twoFactorAuth) idR.push("2FA is off on your main email");
  if (c.passwordStrength === "Weak") idR.push("Weak or reused passwords found");
  const rsR: string[] = [];
  if (v.driving.nightDrivingPercentage >= 20)
    rsR.push(`High share of night driving (${v.driving.nightDrivingPercentage}%)`);
  if (v.weather.roadRisk === "High")
    rsR.push(`Icy conditions (${v.weather.temperature} °C, ${v.weather.condition.toLowerCase()})`);
  if (v.serviceDueKm < 2000) rsR.push("Service is overdue soon, so breakdowns are more likely");
  const kR: string[] = [];
  if (v.traffic.trafficLevel === "Heavy") kR.push("Your commute runs in heavy traffic");
  if (v.traffic.accidentsNearby > 0)
    kR.push(
      `${v.traffic.accidentsNearby} accident${v.traffic.accidentsNearby > 1 ? "s" : ""} reported on your route today`,
    );
  if (v.driving.hardBrakes >= 3) kR.push(`${v.driving.hardBrakes} hard-braking events this week`);
  return {
    cyber: {
      id: "identity",
      title: "IF Identity insurance",
      href: LINKS.identity,
      cta: "Identity protection",
      reasons: idR,
    },
    vehicle: [
      {
        id: "roadside",
        title: "IF Roadside assistance",
        href: LINKS.roadside,
        cta: "Roadside assistance",
        reasons: rsR,
      },
      { id: "kasko", title: "IF Kasko", href: LINKS.kasko, cta: "Kasko", reasons: kR },
    ],
  };
}

const score = (base: number, list: Insight[], done: Record<string, boolean>) =>
  Math.min(100, base + list.filter((i) => !done[i.id]).reduce((a, i) => a + i.weight, 0));

/* ---------- UI pieces ---------- */
function RiskGauge({ score: s, label, lang }: { score: number; label: string; lang: Lang }) {
  const level = levelFrom(s);
  const color =
    level === "High"
      ? "var(--risk-high)"
      : level === "Medium"
        ? "var(--risk-medium)"
        : "var(--risk-low)";
  const c = 2 * Math.PI * 34;
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={s}
      aria-valuetext={tr(`${s} out of 100, ${level} risk`, lang)}
      className="relative h-24 w-24 shrink-0"
    >
      <svg aria-hidden viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--muted)" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - s / 100)}
          style={{ transition: "stroke-dashoffset .8s ease, stroke .4s" }}
        />
      </svg>
      <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold">{s}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {tr("risk", lang)}
        </span>
      </div>
    </div>
  );
}

// Icon shape carries the level too, so colour is never the only signal.
const levelIcon = { High: AlertTriangle, Medium: Info, Low: ShieldCheck } as const;

function LevelBadge({ level, lang }: { level: Level; lang: Lang }) {
  const I = levelIcon[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${levelStyle[level]}`}
    >
      <I aria-hidden className="h-3.5 w-3.5" /> {tr(level, lang)} {tr("risk", lang)}
    </span>
  );
}

function InsightRow({
  i,
  done,
  planned,
  onAct,
  onLater,
  lang,
}: {
  lang: Lang;
  i: Insight;
  done: boolean;
  planned: boolean;
  onAct: () => void;
  onLater: () => void;
}) {
  const Icon = i.icon;
  const lesson = lessonFor(i.id, i.why);
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${done ? "border-risk-low/30 bg-risk-low/5" : "bg-card"}`}
    >
      <div className="flex flex-wrap gap-4">
        <div
          aria-hidden
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${done ? "bg-risk-low/15 text-risk-low" : levelStyle[i.level]}`}
        >
          {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1 basis-40">
          <p className="flex flex-wrap items-center gap-2 font-semibold">
            {done ? tr("Resolved: ", lang) : ""}
            {tr(i.title, lang)}
            {!done && (
              <span className="sr-only">
                , {tr(i.level, lang)}
                {tr("risk", lang)}
              </span>
            )}
            {!done && i.level === "High" && (
              <AlertTriangle aria-hidden className="h-4 w-4 text-risk-high" />
            )}
          </p>
          {done && (
            <p role="status" className="mt-1 text-sm font-semibold text-risk-low">
              {tr(lesson.reinforcement, lang)}
            </p>
          )}
          {!done && planned && (
            <p
              role="status"
              className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <Check className="h-4 w-4" />
              {tr("Planned:", lang)} {tr(reminderFor(i.id), lang)}
            </p>
          )}
          <details className="mt-1 text-sm">
            <summary className="flex min-h-11 cursor-pointer items-center gap-1.5 font-bold text-primary">
              <Sparkles aria-hidden className="h-3.5 w-3.5" />
              {done ? tr("What you learned", lang) : tr("Why? (10 s)", lang)}
            </summary>
            <p className="text-foreground/80">{tr(done ? i.outcome : i.detail, lang)}</p>
            <p className="mt-1 text-muted-foreground">{tr(lesson.explanation, lang)}</p>
          </details>
        </div>
        <div className="flex basis-full flex-wrap gap-2 sm:basis-auto sm:flex-col">
          <Button
            onClick={onAct}
            disabled={done}
            variant={done ? "ghost" : "default"}
            className="min-h-11 max-w-full whitespace-normal text-sm font-bold"
          >
            {done ? tr(`−${i.weight} risk`, lang) : tr(i.action, lang)}
          </Button>
          {!done && !planned && (
            <Button
              onClick={onLater}
              variant="outline"
              className="min-h-11 max-w-full whitespace-normal text-sm"
            >
              {tr("Later", lang)}
            </Button>
          )}
        </div>
      </div>
      <p className="mt-2 flex items-center gap-1 pl-14 text-[11px] text-muted-foreground">
        <Database aria-hidden className="h-3 w-3" />
        {tr(i.source, lang)}
      </p>
    </div>
  );
}

function RecCard({ r, lang }: { r: Rec; lang: Lang }) {
  const relevant = r.reasons.length > 0;
  return (
    <div className={`rounded-xl p-4 ${relevant ? "bg-accent/60" : "border border-dashed"}`}>
      <div className="flex items-start gap-3">
        <ShieldCheck
          className={`mt-0.5 h-5 w-5 shrink-0 ${relevant ? "text-primary" : "text-muted-foreground"}`}
        />
        <div className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {relevant
              ? tr("You've done your part · optional extra peace of mind", lang)
              : tr("Not needed right now", lang)}
          </p>
          <p className="font-bold">{tr(r.title, lang)}</p>
          {relevant ? (
            <>
              <p className="mt-1 text-xs text-muted-foreground">
                {tr(
                  "For the risks outside your control, this can help. No pressure — explore it only if it feels useful.",
                  lang,
                )}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-accent-foreground">
                <Info className="h-3 w-3" />
                {tr("Why it might fit you:", lang)}
              </p>
              <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                {r.reasons.map((x) => (
                  <li key={tr(x, lang)}>• {tr(x, lang)}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              {tr("Your current data shows no reason to recommend this product.", lang)}
            </p>
          )}
        </div>
        {relevant && (
          <Button
            asChild
            variant="link"
            size="sm"
            className="min-h-11 max-w-full self-center whitespace-normal"
          >
            <a href={r.href} target="_blank" rel="noopener noreferrer">
              {tr("Explore if helpful", lang)}
              <ArrowRight className="inline h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

function FlowModal({
  insight,
  before,
  after,
  onClose,
  onDone,
  lang,
}: {
  lang: Lang;
  insight: Insight;
  before: number;
  after: number;
  onClose: () => void;
  onDone: () => void;
}) {
  const flow = insight.flow;
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step > flow.steps.length) return;
    const t = setTimeout(() => {
      if (step === flow.steps.length) onDone();
      setStep((s) => s + 1);
    }, 700);
    return () => clearTimeout(t);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps
  const finished = step > flow.steps.length;
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        closeLabel={tr("Close", lang)}
        className="max-h-[90dvh] w-[calc(100vw-2rem)] max-w-md overflow-y-auto rounded-2xl bg-card p-6 shadow-card"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          (document.getElementById("focus-heading") ?? document.getElementById("main"))?.focus();
        }}
      >
        <DialogTitle className="pr-10">{tr(flow.title, lang)}</DialogTitle>
        <DialogDescription>
          {lang === "fi"
            ? "Demoharjoitus – ei muuta oikeita tilejä tai tee varauksia."
            : "Demo exercise — no real accounts or bookings are changed."}
        </DialogDescription>
        <ul aria-live="polite" className="mt-4 space-y-2.5">
          {flow.steps.map((s, k) => (
            <li
              key={s}
              className={`flex items-center gap-3 text-sm ${k < step ? "" : "text-muted-foreground"}`}
            >
              {k < step ? (
                <Check className="h-4 w-4 text-risk-low" />
              ) : k === step ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <span className="h-4 w-4 rounded-full border" />
              )}
              {tr(s, lang)}
            </li>
          ))}
        </ul>
        {finished && (
          <div className="mt-5 space-y-3">
            <div className="rounded-xl bg-risk-low/10 p-4 text-sm">
              <p className="flex items-center gap-2 font-bold text-risk-low">
                <ShieldCheck className="h-4 w-4" /> {tr(flow.result, lang)}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className={`rounded-lg px-2 py-1 text-xs font-bold ring-1 ${levelStyle[levelFrom(before)]}`}
                >
                  {before}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span
                  className={`rounded-lg px-2 py-1 text-xs font-bold ring-1 ${levelStyle[levelFrom(after)]}`}
                >
                  {after}
                </span>
                <span className="text-xs text-muted-foreground">
                  {tr("risk score ·", lang)} {tr(levelFrom(before), lang)} →{" "}
                  {tr(levelFrom(after), lang)}
                </span>
              </div>
              <p className="mt-2 text-xs italic text-accent-foreground">
                {tr(insight.benefit, lang)}
              </p>
              <p role="status" className="mt-3 text-sm font-semibold text-risk-low">
                {tr(lessonFor(insight.id, insight.why).reinforcement, lang)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {tr(
                  "Demo action completed — no real accounts, routes or bookings were changed.",
                  lang,
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={onClose} size="sm">
                {tr("Continue my progress", lang)}
                <ArrowRight />
              </Button>
              <Button asChild variant="link" size="sm" className="h-auto whitespace-normal">
                <a href={flow.link.href} target="_blank" rel="noopener noreferrer">
                  {tr("Optional:", lang)} {tr(flow.link.label, lang)} <ExternalLink />
                </a>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Page ---------- */
function Index() {
  const [scenarioId, setScenarioId] = useState("winter");
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];
  if (!scenario) throw new Error("Demo scenario missing");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [learning, setLearning] = useState<LearningEntry[]>([]);
  const [active, setActive] = useState<Insight | null>(null);
  const [jitter, setJitter] = useState(0);
  const [tick, setTick] = useState(0);
  const [consents, setConsents] = useState<Record<string, boolean>>({
    location: true,
    driving: true,
    breach: true,
    weather: true,
  });
  const [failure, setFailure] = useState<string | null>(null);
  const [view, setView] = useState<"customer" | "business">("customer");
  const [focus, setFocus] = useState<boolean>(defaultDemoSettings.focus);
  const [lang, setLang] = useState<Lang>(defaultDemoSettings.lang);
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<Phase>("morning");
  const [snoozed, setSnoozed] = useState<Record<string, Snooze>>({});
  const [peek, setPeek] = useState(false);
  const [choices, setChoices] = useState<Choices>({});
  const decide = (id: string, c: Choice) => setChoices((cur) => journeyChoices(cur, { type: "choose", id, choice: c }));
  const [lunch, setLunch] = useState(false);
  const [profileId, setProfileId] = useState("mila");
  const [stories, setStories] = useState<Record<string, CustomerStory>>({});
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [pilotOpen, setPilotOpen] = useState(false);
  const profile = getCustomer(profileId);
  if (!profile) throw new Error("Demo customer missing");
  const [cadence, setCadence] = useState<Cadence>(defaultCadence);
  useEffect(() => setPeek(false), [phase]);
  // Calm pacing: after handling a message, wait before revealing the next one.
  const [resting, setResting] = useState(false);
  useEffect(() => {
    if (!resting) return;
    const id = setTimeout(() => setResting(false), 6000);
    return () => clearTimeout(id);
  }, [resting]);

  useEffect(() => {
    const t = setInterval(() => {
      setTick((n) => n + 1);
      setJitter((j) => Math.max(-1, Math.min(1, j + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // Restore demo progress after hydration so a page refresh keeps Mila's choices.
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE) ?? "null");
      if (s && scenarios.some((x) => x.id === s.scenarioId)) {
        setScenarioId(s.scenarioId);
        if (CUSTOMER_PROFILES.some(p => p.id === s.profileId)) setProfileId(s.profileId);
        if (s.stories) setStories(s.stories);
        setDone(s.done ?? {});
        setSnoozed(s.snoozed ?? {});
        setChoices(s.choices ?? {});
        setLunch(s.moment === "lunch");
        setPhase(s.moment === "evening" ? "evening" : "morning");
        setLearning(s.learning ?? []);
        if (s.consents) setConsents(s.consents);
        if (s.view === "customer" || s.view === "business") setView(s.view);
        if (Array.isArray(s.requests)) setRequests(s.requests);
        if (s.lang === "fi" || s.lang === "en") setLang(s.lang);
        if (typeof s.focus === "boolean") setFocus(s.focus);
      }
    } catch {
      /* ignore broken saved data */
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(
          STORE,
          JSON.stringify({ scenarioId, profileId, stories, done, learning, consents, view, lang, focus, snoozed, requests, choices, moment: lunch ? "lunch" : phase }),
        );
      } catch {
        /* Demo remains usable when browser storage is unavailable. */
      }
    }
  }, [loaded, scenarioId, profileId, stories, done, learning, consents, view, lang, focus, snoozed, requests, choices, lunch, phase]);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const cyber = useMemo(() => cyberInsights(scenario), [scenario]);
  const vehicle = useMemo(() => vehicleInsights(scenario), [scenario]);
  const recs = useMemo(() => recommendations(scenario), [scenario]);
  const all = [...cyber, ...vehicle];

  const cyberScore = score(8, cyber, done);
  const vehScore = score(10, vehicle, done);
  const overall = Math.round((cyberScore + vehScore) / 2);
  const startOverall = Math.round((score(8, cyber, {}) + score(10, vehicle, {})) / 2);
  const resolved = all.filter((i) => done[i.id]);

  const switchStory = (customerId: string, nextScenario: string) => {
    if (customerId === profileId && nextScenario === scenarioId) return;
    setStories(current => ({ ...current, [storyKey(profileId, scenarioId)]: { done, learning, snoozed, choices, moment: lunch ? "lunch" : phase } }));
    const saved = stories[storyKey(customerId, nextScenario)];
    setProfileId(customerId);
    setScenarioId(nextScenario);
    setDone(saved?.done ?? {});
    setLearning(saved?.learning ?? []);
    setSnoozed(saved?.snoozed ?? {});
    setChoices(saved?.choices ?? {});
    setActive(null);
    setResting(false);
    setPeek(false);
    setLunch(saved?.moment === "lunch");
    setPhase(saved?.moment === "evening" ? "evening" : "morning");
  };
  const pick = (id: string) => switchStory(profileId, id);
  const reset = () => {
    setProfileId("mila");
    setScenarioId("winter");
    setStories({});
    setDone({});
    setLearning([]);
    setSnoozed({});
    setChoices({});
    setActive(null);
    setResting(false);
    setPeek(false);
    setLunch(false);
    setPhase("morning");
    setConsents({ location: true, driving: true, breach: true, weather: true });
    setFocus(defaultDemoSettings.focus);
    setLang(defaultDemoSettings.lang);
    setView(defaultDemoSettings.view);
    setRequests([]);
    localStorage.removeItem(STORE);
  };
  const complete = (insight: Insight) => {
    setResting(true);
    setDone((current) => ({ ...current, [insight.id]: true }));
    setLearning((current) =>
      recordLearning(current, {
        id: insight.id,
        title: insight.action,
        module: insight.module,
        learned: lessonFor(insight.id, insight.why).explanation,
        completedAt: Date.now(),
      }),
    );
  };
  const postpone = (insight: Insight, until: SnoozeUntil) => {
    setSnoozed((current) => snooze(current, insight.id, until, insight.level));
    plan(insight);
  };
  const plan = (insight: Insight) => {
    setResting(true);
    setLearning((current) =>
      recordLearning(current, {
        id: insight.id,
        title: reminderFor(insight.id),
        module: insight.module,
        learned: "Chose a calm moment to act instead of rushing.",
        completedAt: Date.now(),
        kind: "planned",
      }),
    );
  };
  const planned = (id: string) => learning.some((e) => e.id === id && e.kind === "planned");
  const earned = (m: "cyber" | "vehicle") => all.some((i) => i.module === m && done[i.id]);
  const before = active ? (active.module === "cyber" ? cyberScore : vehScore) : 0;
  const after = active ? Math.max(0, before - active.weight) : 0;

  const v = scenario.vehicle;
  const live = [
    {
      icon: Thermometer,
      label: "Weather",
      value: `${v.weather.temperature + jitter} °C · ${tr(v.weather.condition, lang)}`,
      level: v.weather.temperature < 1 ? ("High" as Level) : ("Low" as Level),
      src: "OpenWeather-style",
    },
    {
      icon: Snowflake,
      label: "Road risk",
      value: done["ice"] ? tr("Safer route", lang) : v.weather.roadRisk,
      level: done["ice"] ? ("Low" as Level) : v.weather.roadRisk,
      src: "Digitraffic-style",
    },
    {
      icon: TrafficCone,
      label: "Traffic",
      value: v.traffic.trafficLevel,
      level: (v.traffic.trafficLevel === "Heavy" ? "Medium" : "Low") as Level,
      src: "Google Traffic-style",
    },
    {
      icon: Siren,
      label: "Accidents nearby",
      value: String(v.traffic.accidentsNearby),
      level: (v.traffic.accidentsNearby > 1
        ? "High"
        : v.traffic.accidentsNearby
          ? "Medium"
          : "Low") as Level,
      src: "Fintraffic-style",
    },
  ];

  const plannedIds = learning.filter((e) => e.kind === "planned").map((e) => e.id);
  const briefing = buildBriefing(all, done, plannedIds, phase, snoozed);
  const next = briefing.now ?? (peek ? (briefing.waiting[0] ?? null) : null);
  const fi = lang === "fi";
  const moment: DayMoment = lunch ? "lunch" : phase;
  const isMilaJourney = profileId === "mila" && scenarioId === "winter";
  const journeyState = { choices, done, snoozed };
  const milaSaved = stories[storyKey("mila", "winter")];
  const pilotState = isMilaJourney ? journeyState : { choices: milaSaved?.choices ?? {}, done: milaSaved?.done ?? {}, snoozed: milaSaved?.snoozed ?? {} };
  const contactContext = [
    scenario.vehicle.weather.temperature < 1 ? (fi ? "liukas keli" : "slippery roads") : null,
    scenario.vehicle.tireTreadMm < 4 ? (fi ? "kuluneet renkaat" : "worn tyres") : null,
    scenario.cyber.breaches.length ? (fi ? "tietovuoto-ilmoitus" : "data breach alert") : null,
  ].filter(Boolean).join(", ") || (fi ? "rauhallinen päivä" : "a calm day");
  const pageControls = <DemoControls lang={lang} setLang={setLang} view={view} setView={setView} focus={focus} setFocus={setFocus} profileId={profile.id} onCustomer={(id) => switchStory(id, scenarioId)} scenarios={scenarios} scenarioId={scenarioId} onScenario={pick} phase={phase} lunch={lunch} onTime={(time) => { setLunch(time === "lunch"); setPhase(time === "evening" ? "evening" : "morning"); setResting(false); setPeek(false); }} onPilot={() => setPilotOpen(true)} onReset={reset} />;

  return (
    <div className="min-h-dvh font-sans">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-foreground"
      >
        {t("skip", lang)}
      </a>

      <main
        tabIndex={-1}
        id="main"
        className="demo-layout mx-auto px-5 py-8 sm:px-8 sm:py-12"
      >
        {view === "customer" && (
          <section
            aria-labelledby="focus-heading"
            className="compass-message"
          >
            <h1
              tabIndex={-1}
              id="focus-heading"
              className="flex items-center gap-2 text-sm font-bold text-primary"
            >
              <Compass aria-hidden className="h-4 w-4" />
              {fi
                ? `IF Compass · ${moment === "morning" ? "Aamuviesti klo 07:15" : moment === "lunch" ? "Lounasviesti klo 12:00" : "Iltaviesti klo 19:00"}`
                : `IF Compass · ${moment === "morning" ? "Morning message 07:15" : moment === "lunch" ? "Lunch message 12:00" : "Evening message 19:00"}`}
            </h1>
            {isMilaJourney ? <MilaJourneyMessage state={journeyState} moment={moment} lang={lang}
              onAction={(id) => { const insight = all.find(i => i.id === id); if (insight) { decide(id, "act"); setActive(insight); } }}
              onRoadChoice={(choice) => { const insight = all.find(i => i.id === "ice"); if (insight) { decide("ice", choice); if (choice === "later") plan(insight); else complete(insight); } }}
              onPostpone={(until) => { const insight = all.find(i => i.id === "leak"); if (insight) { decide("leak", "postponed"); postpone(insight, until); } }}
            /> : <>
            <div aria-live="polite">
              {resting ? (
                <p role="status" className="mt-4 flex items-center gap-2 text-lg font-bold text-risk-low">
                  <Check className="h-5 w-5" />
                  {(() => {
                    const lvl = briefing.now?.level ?? briefing.waiting[0]?.level ?? "Low";
                    const m = cadence[lvl];
                    const when = m === 0 ? (fi ? "pian" : "shortly") : m === 600 ? (fi ? "illan koosteessa" : "in the evening summary") : fi ? `noin ${m} min päästä` : `in about ${m} min`;
                    return fi ? `Hoidettu. Hengähdä hetki — seuraava viesti ${when}.` : `Done. Take a breath — next message ${when}.`;
                  })()}
                </p>
              ) : next ? (
                <div className="mt-4">
                  <p className="text-base font-semibold">
                    {tr(phase === "morning" ? `Good morning, ${profile.name}. One thing needs your attention.` : `Good evening, ${profile.name}. A moment for your safety.`, lang)}
                  </p>
                  <div className="mt-3">
                    <LevelBadge lang={lang} level={next.level} />
                  </div>
                  <div aria-hidden className="my-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary"><next.icon className="h-8 w-8" /></div>
                  <h2 className="mt-3 text-3xl font-extrabold leading-tight">{tr(next.title, lang)}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tr(lessonFor(next.id, next.why).explanation, lang)}
                  </p>
                  <ContextInsurance profile={profile} module={next.module} lang={lang} />
                  <DataAnchor lang={lang} module={next.module} />
                  <div className="mt-6 grid gap-3">
                    <Button
                      size="lg"
                      className="min-h-12 whitespace-normal text-base font-bold"
                      onClick={() => { decide(next.id, choiceFrom("main")); setActive(next); }}
                    >
                      {tr(next.action, lang)}
                    </Button>
                    {(ALTERNATIVES[next.id] ?? []).map(([fiText, enText], i) => (
                      <Button
                        key={enText}
                        size="lg"
                        variant="secondary"
                        className="min-h-12 whitespace-normal"
                        onClick={() => { decide(next.id, choiceFrom("alt", i)); complete(next); }}
                      >
                        {fi ? fiText : enText}
                      </Button>
                    ))}
                    {next.level === "High" && (
                      <p className="text-sm font-semibold">
                        {fi
                          ? "Suosittelemme hoitamaan tämän tänään, mutta sinä päätät tahdin."
                          : "We recommend handling this today, but you set the pace."}
                      </p>
                    )}
                    <div className="grid gap-2 sm:grid-cols-3">
                      {scheduleOptions(next.level, phase).map((u) => (
                        <Button
                          key={u}
                          size="lg"
                          variant="outline"
                          className="min-h-12 whitespace-normal"
                          onClick={() => { decide(next.id, choiceFrom("snooze")); postpone(next, u); }}
                        >
                          {snoozeLabel(u, fi)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p role="status" className="mt-4 flex items-center gap-2 text-lg font-bold text-risk-low">
                  <Leaf className="h-5 w-5" />
                  {phase === "morning" && briefing.waiting.length
                    ? fi
                      ? "Aamu on hoidettu. Turvallista matkaa — sovellus pysyy nyt hiljaa."
                      : "Your morning is sorted. Safe travels — the app stays quiet now."
                    : t("allClear", lang)}
                </p>
              )}
            </div>
            {phase === "morning" && briefing.waiting.length > 0 && (
              <p className="mt-4 rounded-xl bg-muted/50 p-3 text-sm text-muted-foreground">
                {fi
                  ? `${briefing.waiting.length} muuta huomiota odottaa iltaan klo 19:00. Ei hätää aamukiireessä.`
                  : `${briefing.waiting.length} other notes wait until 19:00. No rush this morning.`}
              </p>
            )}
            {briefing.prefersLater && (
              <p className="mt-2 text-xs text-muted-foreground">
                {briefing.prefersLater === "cyber"
                  ? fi
                    ? "Opin, että hoidat tietoturva-asiat mieluiten myöhemmin. Aamuisin nostan esiin vain ajomatkan."
                    : "I've learned you prefer handling online security later. Mornings focus on your drive."
                  : fi
                    ? "Opin, että siirrät auton asioita usein myöhemmäksi. Muistutan niistä rauhallisena hetkenä."
                    : "I've learned you often postpone car tasks. I'll remind you at a calm moment."}
              </p>
            )}
            {!next && !resting && briefing.waiting.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="outline" className="min-h-11" onClick={() => setPeek(true)}>
                  {fi ? "Minulla on hetki — katso seuraava heti" : "I have a moment — see the next one now"}
                </Button>
              </div>
            )}
            {(lunch || phase === "evening") && (() => {
              const f = followUp(choices, lunch ? "lunch" : "evening", scenario.cyber.breaches.length > 0);
              return f ? (
                <div role="status" className="mt-5 rounded-2xl bg-accent/60 p-4">
                  <p className="text-xs font-bold text-primary">{fi ? (lunch ? "Lounasviesti klo 12:00 · aamun valintasi perusteella" : "Iltaviesti · päiväsi perusteella") : (lunch ? "Lunch message 12:00 · based on your morning choice" : "Evening message · based on your day")}</p>
                  <p className="mt-1 text-lg font-bold">{fi ? f.title.fi : f.title.en}</p>
                  <p className="mt-1 text-sm">{fi ? f.body.fi : f.body.en}</p>
                </div>
              ) : null;
            })()}
            </>}
            {(lunch || phase === "evening") && (
              <>
                <CoveragePrompts
                  situation={{
                    temperature: scenario.vehicle.weather.temperature,
                    roadRisk: scenario.vehicle.weather.roadRisk,
                    tireTreadMm: scenario.vehicle.tireTreadMm,
                    breaches: scenario.cyber.breaches,
                  }}
                  profile={profile}
                  lang={lang}
                />
                <CoverBenefits moment={lunch ? "lunch" : "evening"} profile={profile} lang={lang} />
                <ContactAdvisor
                  key={profile.id}
                  profile={profile}
                  lang={lang}
                  context={contactContext}
                  existing={requests.find((r) => r.customerId === profile.id)}
                  onSend={(r) =>
                    setRequests((list) => addRequest(list, { ...r, customerId: profile.id, customerName: profile.name }))
                  }
                />
              </>
            )}
            <details className="mt-3 rounded-xl bg-muted/40 p-3 text-sm">
              <summary className="min-h-11 cursor-pointer py-2 font-semibold">
                {fi ? "Oma ilmoitustahti" : "My message pace"}
              </summary>
              <p className="mb-2 text-muted-foreground">
                {fi
                  ? "Valitse, kuinka pian seuraava viesti saa tulla. Voit aina katsoa odottavat heti."
                  : "Choose how soon the next message may arrive. You can always view waiting ones right away."}
              </p>
              {(["High", "Medium", "Low"] as const).map((lvl) => (
                <label key={lvl} className="mt-2 flex items-center justify-between gap-2">
                  <span>{fi ? { High: "Korkea riski", Medium: "Keskitaso", Low: "Matala riski" }[lvl] : `${lvl} risk`}</span>
                  <select
                    className="min-h-11 rounded-lg border bg-background px-2"
                    value={cadence[lvl]}
                    onChange={(e) => setCadence((c) => ({ ...c, [lvl]: Number(e.target.value) }))}
                  >
                    {[0, 5, 15, 30, 600].map((m) => (
                      <option key={m} value={m}>
                        {m === 0 ? (fi ? "Heti" : "Right away") : m === 600 ? (fi ? "Illan koosteessa" : "Evening summary") : `${m} min`}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </details>
          </section>
        )}
        {pageControls}
        <div className="customer-secondary space-y-8">
        <AccessibilityGuide lang={lang} />
        {view === "customer" && <CustomerInsurance profile={profile} onSelect={(id) => switchStory(id, scenarioId)} lang={lang} />}
        {view === "customer" && <p role="status" aria-live="polite" className="sr-only">
          {lang === "fi"
            ? `Harjoituksia tehty ${resolved.length}. Kokonaisriski ${overall} sadasta.`
            : `${resolved.length} exercises completed. Overall risk ${overall} out of 100.`}
        </p>}
        {view === "customer" && !focus && <div className="mx-auto max-w-xl bg-primary p-4 text-primary-foreground">
            {view === "customer" && (
            <div
              role="meter"
              aria-label={t("overall", lang)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={overall}
              aria-valuetext={tr(`${overall} out of 100, ${levelFrom(overall)}`, lang)}
              className="flex items-center gap-4 rounded-2xl bg-primary-foreground/10 p-5 ring-1 ring-primary-foreground/20 backdrop-blur"
            >
              <Compass aria-hidden className="h-10 w-10" />
              <div>
                <p className="text-xs uppercase tracking-wider opacity-70">{t("overall", lang)}</p>
                <p className="text-3xl font-extrabold">
                  {overall}
                  <span className="text-base opacity-70">/100</span>
                </p>
                <p className="text-sm font-semibold">
                  {tr(levelFrom(overall), lang)}
                  {overall < startOverall && (
                    <span className="ml-2 opacity-80">
                      ↓ {startOverall - overall}
                      {tr("today", lang)}
                    </span>
                  )}
                </p>
              </div>
            </div>
            )}
        </div>}
        {view === "customer" && !focus && (
          <>
            <div className="grid gap-8">
              <section className="border-t py-6 md:py-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-primary">
                      <Lock className="h-5 w-5" />
                      <span className="text-sm font-bold uppercase tracking-wider">
                        {tr("Cybersecurity Risk Advisor", lang)}
                      </span>
                    </div>
                    <h2 className="mt-2 text-2xl font-extrabold">
                      {tr("Your digital safety", lang)}
                    </h2>
                    <div className="mt-3">
                      <LevelBadge lang={lang} level={levelFrom(cyberScore)} />
                    </div>
                  </div>
                  <RiskGauge lang={lang} score={cyberScore} label={tr("Digital risk", lang)} />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Radio className="h-3.5 w-3.5 animate-pulse text-risk-high" />
                  {tr("Live sources: breach feeds · password check · 2FA status", lang)}
                </div>
                <div className="mt-4 space-y-3">
                  {cyber.length === 0 && (
                    <p className="flex items-center gap-2 rounded-xl bg-risk-low/10 p-4 text-sm font-semibold text-risk-low">
                      <Leaf className="h-4 w-4" />
                      {tr("No cyber risks found. Your identity looks well protected.", lang)}
                    </p>
                  )}
                  {cyber.map((i) => (
                    <InsightRow
                      lang={lang}
                      key={i.id}
                      i={i}
                      done={!!done[i.id]}
                      planned={planned(i.id)}
                      onAct={() => setActive(i)}
                      onLater={() => plan(i)}
                    />
                  ))}
                </div>
                {earned("cyber") && (
                  <div className="mt-6">
                    <RecCard lang={lang} r={recs.cyber} />
                  </div>
                )}
              </section>

              <section className="border-t py-6 md:py-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-primary">
                      <Car className="h-5 w-5" />
                      <span className="text-sm font-bold uppercase tracking-wider">
                        {tr("Vehicle Usage Risk Advisor", lang)}
                      </span>
                    </div>
                    <h2 className="mt-2 text-2xl font-extrabold">Toyota Corolla · ABC-123</h2>
                    <div className="mt-3">
                      <LevelBadge lang={lang} level={levelFrom(vehScore)} />
                    </div>
                  </div>
                  <RiskGauge lang={lang} score={vehScore} label={tr("Driving risk", lang)} />
                </div>
                <div
                  aria-label={tr("Live road conditions", lang)}
                  className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4"
                >
                  {live.map((l) => (
                    <div
                      key={tr(l.label, lang)}
                      className={`rounded-xl p-3 ring-1 ${levelStyle[l.level]}`}
                    >
                      <l.icon className="h-4 w-4" />
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                        {tr(l.label, lang)}
                      </p>
                      <p key={tick} className="text-sm font-extrabold text-foreground">
                        {tr(l.value, lang)}
                      </p>
                      <p className="mt-0.5 text-[9px] text-foreground">
                        {l.src}
                        {tr("mock", lang)}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Radio className="h-3 w-3 animate-pulse text-risk-high" />
                  {tr("Live · updates every 5 s", lang)}
                </p>

                <div className="mt-4 rounded-xl border bg-muted/50 p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold">{tr("This week's driving", lang)}</span>
                    <span className="text-muted-foreground">
                      {tr("Night", lang)} {v.driving.nightDrivingPercentage}% ·{" "}
                      {v.driving.hardBrakes} {tr("hard brakes ·", lang)}{" "}
                      {v.driving.speedingIncidents} {tr("speeding", lang)}
                    </span>
                  </div>
                  <div className="flex h-20 items-end gap-2">
                    {[
                      tr("Mon", lang),
                      tr("Tue", lang),
                      tr("Wed", lang),
                      tr("Thu", lang),
                      tr("Fri", lang),
                      tr("Sat", lang),
                      tr("Sun", lang),
                    ].map((d, k) => {
                      const night = Math.round(
                        (v.driving.nightDrivingPercentage / 100) * (20 + ((k * 13) % 25)),
                      );
                      const day = 20 + ((k * 17) % 30);
                      return (
                        <div key={tr(d, lang)} className="flex flex-1 flex-col items-center gap-1">
                          <div
                            className="flex w-full flex-col justify-end overflow-hidden rounded-md"
                            style={{ height: 60 }}
                          >
                            <div
                              className="bg-risk-medium transition-all"
                              style={{ height: `${night}%` }}
                            />
                            <div
                              className="bg-primary transition-all"
                              style={{ height: `${day}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{tr(d, lang)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {vehicle.length === 0 && (
                    <p className="flex items-center gap-2 rounded-xl bg-risk-low/10 p-4 text-sm font-semibold text-risk-low">
                      <Leaf className="h-4 w-4" />
                      {tr("Safe roads and smooth driving. Enjoy the ride.", lang)}
                    </p>
                  )}
                  {vehicle.map((i) => (
                    <InsightRow
                      lang={lang}
                      key={i.id}
                      i={i}
                      done={!!done[i.id]}
                      planned={planned(i.id)}
                      onAct={() => setActive(i)}
                      onLater={() => plan(i)}
                    />
                  ))}
                </div>
                {earned("vehicle") && (
                  <div className="mt-6 space-y-3">
                    {recs.vehicle.map((r) => (
                      <RecCard lang={lang} key={r.id} r={r} />
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Customer outcome */}
            <section className="border-t py-6 md:py-8">
              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                {tr("Your progress today", lang)}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">{tr("What changed for you", lang)}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">{tr("Before", lang)}</p>
                  <p
                    className={`mt-1 rounded-lg px-3 py-1 text-xl font-extrabold ring-1 ${levelStyle[levelFrom(startOverall)]}`}
                  >
                    {startOverall}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">{tr("Now", lang)}</p>
                  <p
                    className={`mt-1 rounded-lg px-3 py-1 text-xl font-extrabold ring-1 ${levelStyle[levelFrom(overall)]}`}
                  >
                    {overall}
                  </p>
                </div>
                <p className="flex items-center gap-1 text-sm font-bold text-risk-low">
                  <TrendingDown className="h-4 w-4" />
                  {startOverall - overall} {tr("points lower", lang)}
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {resolved.length === 0 && (
                  <li className="text-sm text-muted-foreground">
                    {tr("Take an action above to see your risk improve.", lang)}
                  </li>
                )}
                {resolved.map((i) => (
                  <li key={i.id} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-risk-low" />
                    <span>
                      <b>{tr(i.outcome, lang)}</b>{" "}
                      <span className="text-muted-foreground">— {tr(i.benefit, lang)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <LearningLayer lang={lang} entries={learning} />

            <PlayLearn
              lang={lang}
              scenarioId={scenarioId}
              title={t("play", lang)}
              onWin={(w) =>
                setLearning((c) => recordLearning(c, { ...w, completedAt: Date.now() }))
              }
            />

          </>
        )}

        {view === "business" && (
          <AdvisorQueue requests={requests} lang={lang} onCustomerView={() => setView("customer")} />
        )}

        {view === "customer" && !focus && (
          <>
            {/* 4 · Transparency + 8 · ethics */}
            <details className="rounded-2xl border bg-card p-4 shadow-card md:p-6">
              <summary className="min-h-11 cursor-pointer text-sm font-semibold">
                {lang === "fi" ? "Tietosuoja ja omat tietosi" : "Privacy & your data"}
              </summary>
              <section className="mt-4">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                    <Eye className="h-4 w-4" />
                    {tr("Customer trust & transparency", lang)}
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold">
                    {tr("What we use, and why", lang)}
                  </h2>
                  <div className="mt-4 space-y-2.5">
                    {[
                      {
                        id: "location",
                        name: "Location & routes",
                        why: "To warn about icy roads and accidents on your way",
                        benefit: "Safer commute",
                      },
                      {
                        id: "driving",
                        name: "Driving style (telematics)",
                        why: "To spot tiring night driving and harsh braking",
                        benefit: "Gentler, cheaper driving",
                      },
                      {
                        id: "breach",
                        name: "Breach monitoring of your email",
                        why: "To catch leaked passwords before criminals use them",
                        benefit: "Identity stays yours",
                      },
                      {
                        id: "weather",
                        name: "Weather & road data",
                        why: "To time warnings to real conditions",
                        benefit: "Right advice at the right time",
                      },
                    ].map((c) => (
                      <div key={c.id} className="flex items-center gap-3 rounded-xl border p-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold">{tr(c.name, lang)}</p>
                          <p className="text-xs text-muted-foreground">
                            {tr(c.why, lang)} →{" "}
                            <span className="italic">{tr(c.benefit, lang)}</span>
                          </p>
                        </div>
                        <Switch
                          checked={!!consents[c.id]}
                          onCheckedChange={(checked) =>
                            setConsents((current) => ({ ...current, [c.id]: checked }))
                          }
                          aria-label={tr(`Use ${c.name}`, lang)}
                          className="min-h-11 min-w-11"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {tr(
                      "Every toggle is opt-in and reversible. Turn something off and the related insights disappear — no questions asked.",
                      lang,
                    )}
                  </p>
                </div>
              </section>
            </details>

          </>
        )}

        {view === "customer" && <OfficialSupport lang={lang} />}
        </div>
      </main>
      <Dialog open={pilotOpen} onOpenChange={setPilotOpen}>
        <DialogContent onCloseAutoFocus={(event) => { event.preventDefault(); document.querySelector<HTMLButtonElement>("[data-pilot-trigger]")?.focus(); }} closeLabel={fi ? "Sulje" : "Close"} className="max-h-[92dvh] w-[calc(100vw-2rem)] max-w-5xl overflow-y-auto p-5 sm:p-8">
          <DialogTitle className="pr-10">IF Compass · {fi ? "Pilotti & konsepti" : "Pilot & concept"}</DialogTitle>
          <DialogDescription className="sr-only">
            {fi
              ? "Esittelijän aineisto: pilottisuunnitelma, liiketoimintamalli, vastuullisuus ja tiekartta. Ei näy asiakkaille."
              : "Presenter material: pilot plan, business model, responsibility and roadmap. Never shown to customers."}
          </DialogDescription>
          <div className="space-y-6">
          <PilotConcept lang={lang} journeyState={pilotState} journeyActive={isMilaJourney} />
          <details className="border-y py-3"><summary className="cursor-pointer font-bold">{tr("Story, safeguards and expansion ideas", lang)}</summary><div className="mt-4 space-y-6">
          <div className="border-t py-6 md:py-8">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
              <Ban className="h-4 w-4" />
              {tr("Ethical boundaries", lang)}
            </p>
            <h2 className="mt-1 text-2xl font-extrabold">{tr("What we will never do", lang)}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                tr("No mental health prediction or inference", lang),
                tr("No financial hardship inference", lang),
                tr(
                  "No profiling based on sensitive data (health, religion, ethnicity, politics)",
                  lang,
                ),
                tr("No selling or sharing of personal data to third parties", lang),
                tr("No hidden scoring — every score can be explained and questioned", lang),
                tr(
                  "No surveillance feel: insights are about safety, never about monitoring the customer",
                  lang,
                ),
              ].map((t) => (
                <li key={tr(t, lang)} className="flex items-start gap-2 rounded-xl border p-3">
                  <Ban className="mt-0.5 h-4 w-4 shrink-0 text-risk-high" />
                  {tr(t, lang)}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              {tr(
                "These boundaries are hard rules in the system design, not marketing promises.",
                lang,
              )}
            </p>
          </div>

          <>
            <ExtraSections
              lang={lang}
              insights={all}
              done={done}
              cold={scenario.vehicle.weather.temperature < 1}
            />
            <Innovation lang={lang} />

            {/* 6 · Scalability roadmap */}
            <section className="border-t py-6 md:py-8">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                <Map className="h-4 w-4" />
                {tr("Scalability roadmap", lang)}
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">
                {tr("New modules plug in — no rebuild", lang)}
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                {[
                  { icon: Lock, name: "Cybersecurity", when: "Live in this demo", on: true },
                  { icon: Car, name: "Vehicle", when: "Live in this demo", on: true },
                  {
                    icon: Home,
                    name: "Home",
                    when: "Q1 2027 · water leak & fire sensors",
                    on: false,
                  },
                  {
                    icon: Plane,
                    name: "Travel",
                    when: "Q2 2027 · destination risk & cover gaps",
                    on: false,
                  },
                  {
                    icon: Baby,
                    name: "Family",
                    when: "Q3 2027 · young drivers & child safety",
                    on: false,
                  },
                  {
                    icon: Building2,
                    name: "SME",
                    when: "2028 · small business cyber & property",
                    on: false,
                  },
                ].map((m) => (
                  <div
                    key={tr(m.name, lang)}
                    className={`rounded-xl p-4 text-center ring-1 ${m.on ? "bg-accent/60 ring-primary/30" : "bg-muted/50 ring-border"}`}
                  >
                    <m.icon
                      className={`mx-auto h-6 w-6 ${m.on ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <p className="mt-2 text-sm font-bold">{tr(m.name, lang)}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{tr(m.when, lang)}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {tr(
                  "Each module reuses the same engine: data sources → explainable insight → customer action → IF service. Adding a module means adding data connectors and rules, not a new system.",
                  lang,
                )}
              </p>
            </section>
          </>
          </div></details>

          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        {tr("IF Compass · Demo concept · All live data is simulated mock data", lang)}
      </footer>

      {active && (
        <FlowModal
          lang={lang}
          key={active.id}
          insight={active}
          before={before}
          after={after}
          onClose={() => setActive(null)}
          onDone={() => complete(active)}
        />
      )}
    </div>
  );
}
