import { useState } from "react";
import { CalendarClock, CheckCircle2, Headset, MessageSquare, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ADVISOR, CHANNEL_OPTIONS, TOPIC_LABEL, suggestedTopic, type Channel, type ContactRequest, type Topic } from "@/lib/contact-requests";
import type { CustomerProfile } from "@/lib/customer-profiles";
import type { Lang } from "@/lib/i18n";

type Props = {
  profile: CustomerProfile;
  lang: Lang;
  context: string;
  existing?: ContactRequest | undefined;
  onSend: (r: { channel: Channel; topic: Topic; slot: string; context: string }) => void;
};

// Customer side of the warm handoff: one calm invitation, two choices, a human confirmation.
export function ContactAdvisor({ profile, lang, context, existing, onSend }: Props) {
  const fi = lang === "fi";
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState<Channel>("call");
  const [topic, setTopic] = useState<Topic>(suggestedTopic(profile));
  const [share, setShare] = useState(true);

  const confirmation = (r: { channel: Channel }) =>
    r.channel === "call"
      ? fi
        ? `${ADVISOR.name} (${ADVISOR.team.fi}) soittaa sinulle huomenna klo 12–13. Ei ostopakkoa.`
        : `${ADVISOR.name} (${ADVISOR.team.en}) will call you tomorrow 12–13. No obligation.`
      : fi
        ? `${ADVISOR.name} lähettää viestin Omat sivut -palveluun 1 arkipäivän sisällä. Ei ostopakkoa.`
        : `${ADVISOR.name} will message you in My IF within 1 working day. No obligation.`;

  return (
    <section className="mt-4 rounded-xl border border-primary/30 bg-accent/40 p-4 text-sm">
      {existing ? (
        <div role="status" className="flex items-start gap-3">
          <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="font-bold">{fi ? "Pyyntö vastaanotettu" : "Request received"}</p>
            <p className="mt-1">{confirmation(existing)}</p>
            <Button variant="link" className="h-auto min-h-11 px-0" onClick={() => setOpen(true)}>
              {fi ? "Muuta pyyntöä" : "Change request"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Headset className="h-5 w-5" />
          </div>
          <p className="min-w-0 flex-1 font-semibold">
            {fi ? "Haluatko käydä turvasi läpi If-asiantuntijan kanssa?" : "Want to go through your cover with an IF advisor?"}
          </p>
          <Button className="min-h-11 w-full sm:w-auto" onClick={() => setOpen(true)}>
            {fi ? "Pyydä yhteydenottoa" : "Ask IF to contact me"}
          </Button>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle>{fi ? "Yhteydenotto Ifiltä" : "Contact from IF"}</DialogTitle>
          <DialogDescription>
            {fi ? "Kaksi valintaa, ja asiantuntija on valmistautunut tilanteeseesi." : "Two choices, and the advisor arrives prepared."}
          </DialogDescription>

          <fieldset className="mt-2">
            <legend className="text-sm font-bold">{fi ? "Miten?" : "How?"}</legend>
            <div className="mt-2 grid gap-2">
              {CHANNEL_OPTIONS.map((o) => (
                <label key={o.id} className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border p-3 ${channel === o.id ? "border-primary bg-accent/60" : ""}`}>
                  <input type="radio" name="channel" className="accent-primary" checked={channel === o.id} onChange={() => setChannel(o.id)} />
                  {o.id === "call" ? <Phone aria-hidden className="h-4 w-4 text-primary" /> : <MessageSquare aria-hidden className="h-4 w-4 text-primary" />}
                  <span>{fi ? o.fi : o.en}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-3">
            <legend className="text-sm font-bold">{fi ? "Aihe" : "Topic"}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(Object.keys(TOPIC_LABEL) as Topic[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={topic === k}
                  onClick={() => setTopic(k)}
                  className={`min-h-11 rounded-full border px-3 text-xs font-semibold ${topic === k ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}
                >
                  {fi ? TOPIC_LABEL[k].fi : TOPIC_LABEL[k].en}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="mt-3 flex items-start gap-2 text-xs">
            <input type="checkbox" className="mt-0.5 accent-primary" checked={share} onChange={(e) => setShare(e.target.checked)} />
            <span>
              {fi ? "Jaa asiantuntijalle tämän päivän tilanne lyhyesti: " : "Share today's situation briefly with the advisor: "}
              <em>{context}</em>
            </span>
          </label>

          <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 p-2 text-xs text-muted-foreground">
            <UserRound aria-hidden className="h-4 w-4" />
            {fi ? `Demo: asiantuntija ${ADVISOR.name} on kuvitteellinen.` : `Demo: advisor ${ADVISOR.name} is fictional.`}
          </div>

          <Button
            className="mt-3 min-h-11 w-full"
            onClick={() => {
              const opt = CHANNEL_OPTIONS.find((o) => o.id === channel)!;
              onSend({ channel, topic, slot: opt.slot, context: share ? context : "" });
              setOpen(false);
            }}
          >
            <CalendarClock aria-hidden className="h-4 w-4" />
            {fi ? "Lähetä pyyntö" : "Send request"}
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
