import { LifeBuoy, Phone, ExternalLink, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Lang } from "@/lib/i18n";

export function AccessibilityGuide({ lang }: { lang: Lang }) {
  return (
    <details className="border-b bg-card px-5 py-3">
      <summary className="flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-primary">
        <Accessibility aria-hidden className="h-5 w-5" />
        {lang === "fi"
          ? "Saavutettavuusohje – näytönlukija ja näppäimistö"
          : "Accessibility guide — screen reader and keyboard"}
      </summary>
      <div className="max-w-2xl space-y-2 py-3 text-sm">
        <p>
          {lang === "fi"
            ? "Sivun ensimmäinen linkki vie pääsisältöön. Rauhallinen näkymä näyttää yhden päätöksen kerrallaan. Voit avata kaikki osiot Näytä kaikki -painikkeella."
            : "The first link skips to the main content. Calm focus presents one decision at a time. Show everything opens all sections."}
        </p>
        <p>
          {lang === "fi"
            ? "Siirry painikkeiden välillä Tab-näppäimellä ja takaisin Shift+Tab-näppäimillä. Aktivoi Enterillä tai välilyönnillä. Sulje harjoitus Escape-näppäimellä. Liukusäätimiä voi muuttaa nuolinäppäimillä."
            : "Use Tab and Shift+Tab to move between controls, Enter or Space to activate, and Escape to close an exercise. Adjust sliders with arrow keys."}
        </p>
        <p>
          {lang === "fi"
            ? "Näytönlukija kertoo riskipisteet, oppimisen edistymisen ja harjoituksen tuloksen. Kokeiluissa matkat ja kelit kerrotaan myös tekstinä. Käytä näytönlukijan otsikko- tai maamerkkinavigointia siirtyäksesi osioihin."
            : "Your screen reader announces risk scores, learning progress and exercise results. Distance and road conditions also have text alternatives. Use heading or landmark navigation to move between sections."}
        </p>
        <p>
          {lang === "fi"
            ? "Tämä on demo, ei hätäpalvelu. Oikeita tilejä ei muuteta, varauksia ei tehdä eikä muistutuksia lähetetä. Välittömässä vaarassa soita 112."
            : "This is a demo, not an emergency service. It does not change accounts, make bookings or send reminders. In immediate danger call 112."}
        </p>
      </div>
    </details>
  );
}

const contacts = [
  {
    id: "roadside",
    title: { fi: "Tiepalvelu ja hinaus", en: "Roadside assistance and towing" },
    phone: "010 19 18 40",
    tel: "+35810191840",
    detail: {
      fi: "24/7 · Palvelun tuottaa Viking Hinaus.",
      en: "24/7 · Provided by Viking Hinaus.",
    },
    href: "https://www.if.fi/henkiloasiakkaat/vahingot/ajoneuvo/hinaus",
  },
  {
    id: "customer",
    title: { fi: "IF:n asiakaspalvelu", en: "IF customer service" },
    phone: "010 19 19 19",
    tel: "+35810191919",
    detail: {
      fi: "Vakuutukset ma–pe 8–18, korvaukset ma–pe 8–16. Tarkista poikkeusajat IF:n sivulta.",
      en: "Insurance Mon–Fri 08–18, claims Mon–Fri 08–16. Check IF for holiday hours.",
    },
    href: "https://www.if.fi/henkiloasiakkaat/asiakaspalvelu",
  },
];

export function OfficialSupport({ lang }: { lang: Lang }) {
  return (
    <section aria-labelledby="support-heading" className="border-y bg-card px-5 py-6">
      <h2 id="support-heading" className="flex items-center gap-2 text-xl font-bold">
        <LifeBuoy aria-hidden className="h-5 w-5 text-primary" />
        {lang === "fi" ? "Oikeaa apua IF:ltä" : "Real help from IF"}
      </h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {contacts.map((c) => (
          <div key={c.id}>
            <h3 className="font-semibold">{c.title[lang]}</h3>
            <Button asChild variant="link" className="min-h-11 px-0">
              <a href={`tel:${c.tel}`}>
                <Phone aria-hidden />
                {c.phone}
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">{c.detail[lang]}</p>
            <Button asChild variant="link" className="min-h-11 px-0 whitespace-normal">
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                {lang === "fi" ? "IF:n ohjeet (uusi välilehti)" : "IF guidance (new tab)"}
                <ExternalLink aria-hidden />
              </a>
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t pt-3">
        {[
          {
            fi: "Tilaa hinaus · Viking",
            en: "Request towing · Viking",
            href: "https://tiepalvelu.if.fi/",
          },
          {
            fi: "Tee vahinkoilmoitus · 24/7",
            en: "Report a claim · 24/7",
            href: "https://www.if.fi/henkiloasiakkaat/vahingot",
          },
          {
            fi: "Identiteettivarkauden toimintaohjeet",
            en: "Identity theft guidance",
            href: "https://www.if.fi/henkiloasiakkaat/vahingot/koti-ja-omaisuus/identiteettivarkaus",
          },
          {
            fi: "Oma If",
            en: "My If",
            href: "https://www.if.fi/henkiloasiakkaat/asiakaspalvelu/verkkopalvelut/omat-sivut",
          },
        ].map((l) => (
          <Button
            asChild
            variant="link"
            className="min-h-11 max-w-full whitespace-normal px-0"
            key={l.href}
          >
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              {l[lang]}
              <ExternalLink aria-hidden />
              <span className="sr-only">{lang === "fi" ? "(uusi välilehti)" : "(new tab)"}</span>
            </a>
          </Button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {lang === "fi"
          ? "Yhteystiedot tarkistettu IF:n sivuilta 17.10.2026. Puhelun hinta IF:n hinnaston mukaan. Vakuutuksen korvattavuus riippuu omasta turvastasi ja ehdoista."
          : "Contacts checked on IF’s website on 17 October 2026. Call charges follow IF’s tariff. Cover depends on your own policy and its terms."}
      </p>
    </section>
  );
}
