export type Lang = "en" | "fi";

const dict = {
  customer: { en: "Customer view", fi: "Asiakasnäkymä" },
  business: { en: "Advisor desk", fi: "Myyjän työpöytä" },
  hi: { en: "Hi, Mila", fi: "Hei, Mila" },
  heroTitle: {
    en: "Calm, clear safety — online and on the road.",
    fi: "Rauhallista turvaa – verkossa ja tiellä.",
  },
  heroSub: {
    en: "We look ahead so you don't have to. Most fixes take under two minutes.",
    fi: "Katsomme eteenpäin puolestasi. Useimmat korjaukset vievät alle kaksi minuuttia.",
  },
  focus: { en: "Calm focus", fi: "Rauhallinen fokus" },
  focusOn: { en: "Show everything", fi: "Näytä kaikki" },
  focusTitle: { en: "One thing matters right now", fi: "Nyt tärkeintä on yksi asia" },
  allClear: {
    en: "All clear. Nothing needs you right now.",
    fi: "Kaikki kunnossa. Mikään ei vaadi sinua nyt.",
  },
  reset: { en: "Reset demo", fi: "Nollaa demo" },
  overall: { en: "Overall risk", fi: "Kokonaisriski" },
  scenario: { en: "Demo scenario", fi: "Demotilanne" },
  play: { en: "Learn by playing", fi: "Opi pelaamalla" },
  skip: { en: "Skip to main content", fi: "Siirry pääsisältöön" },
} as const;

export function t(key: keyof typeof dict, lang: Lang): string {
  return dict[key][lang];
}

const cardTranslations: Record<string, string> = {
  "Mila lives in Espoo. A new job, a school run and a changed commute make this first snowy morning matter.": "Mila asuu Espoossa. Uusi työ, koulukyyti ja muuttunut työmatka tekevät ensilumen aamusta tärkeän.",
  "A little more time for an important morning": "Hieman lisää aikaa tärkeään aamuun",
  "Snow and freezing temperatures can reduce grip. Check road conditions and your tyres before leaving. If the journey is unsafe, choose another way or postpone it.": "Lumi ja pakkanen voivat heikentää pitoa. Tarkista keli ja renkaat ennen lähtöä. Jos matka ei ole turvallinen, valitse toinen kulkutapa tai siirrä lähtöä.",
  "Your first week in a new job. One decision before the school run.": "Ensimmäinen viikkosi uudessa työssä. Yksi valinta ennen koulukyytiä.",
  "Your travel choice is noted. Now you choose when to look at online safety.": "Matkavalintasi on huomioitu. Seuraavaksi valitset tietoturva-asialle sopivan hetken.",
  "You chose not to drive. A little room to breathe.": "Valitsit, ettet aja tänään. Hieman tilaa hengähtää.",
  "Your travel plan is noted. Check tyre grip before the next drive if you are unsure.": "Matkasuunnitelmasi on huomioitu. Jos pito mietityttää, tarkista renkaat ennen seuraavaa ajoa.",
  "Your morning travel task is still open. Check conditions before your next drive.": "Aamun matkavalinta on vielä avoinna. Tarkista keli ennen seuraavaa ajoa.",
  "A quiet moment, with the next step in your hands.": "Rauhallinen hetki. Seuraava askel on sinun käsissäsi.",
  "LinkedIn: choose a moment to protect your account": "LinkedIn: valitse hetki tilisi suojaamiseen",
  "This demo includes a LinkedIn breach signal. It does not tell us whether your account is being used. Check your password and any reuse today; suspicious activity calls for immediate action.": "Tässä demossa on LinkedIn-tietovuotosignaali. Se ei kerro, käytetäänkö tiliäsi. Tarkista salasana ja sen mahdollinen käyttö muissa palveluissa tänään. Epäilyttävä toiminta vaatii välitöntä reagointia.",
  "See the password steps": "Katso salasanan vaihdon ohjeet",
  "Plan my journey": "Suunnittele matkani",
  "I'll reassess conditions before leaving later": "Lähden myöhemmin, kun olen tarkistanut kelin uudelleen",
  "I'm not driving today": "En aja tänään",
  "Before leaving": "Ennen lähtöä",
  "Important today · you choose the moment": "Tärkeä tänään · sinä valitset hetken",
  "At your pace": "Omassa tahdissasi",
  "Handle later · remind me at 19:00": "Hoidan myöhemmin · muistuta klo 19:00",
  "Remind me tomorrow evening": "Muistuta huomenna illalla",
  "Also noted: LinkedIn breach signal": "Myös huomioitu: LinkedIn-tietovuotosignaali",
  "The breach signal is not proof of account takeover. You choose a handling time; suspected misuse needs immediate attention.": "Tietovuotosignaali ei todista tilin kaappausta. Sinä valitset käsittelyhetken. Epäilty väärinkäyttö vaatii välitöntä huomiota.",
  "Reminder saved for 19:00. The task is still open.": "Muistutus tallennettu klo 19:00:lle. Asia on vielä avoinna.",
  "Your reminder is planned — no extra task now": "Muistutus on sovittu – ei uutta tehtävää nyt",
  "You chose tomorrow evening for your password task. It remains open, not completed.": "Valitsit salasana-asialle huomisen illan. Asia on vielä avoinna, ei hoidettu.",
  "Your password task is scheduled for next week. If you suspect account misuse, act immediately.": "Salasana-asiasi on ajoitettu ensi viikolle. Jos epäilet tilin väärinkäyttöä, toimi heti.",
  "You chose 19:00 for your password task. You can still open the steps whenever you have a moment.": "Valitsit salasana-asialle klo 19:00. Voit silti avata ohjeet heti, kun sinulla on hetki.",
  "I have time now · open password steps": "Minulla on aikaa nyt · avaa salasanaohjeet",
  "One useful step taken, at your pace": "Yksi hyödyllinen askel, omassa tahdissasi",
  "You practised the password steps. Real account changes must be made in the service itself. Other safety topics remain available when you want them.": "Harjoittelit salasanan vaihtoa. Oikeat tilimuutokset tehdään palvelussa itsessään. Muut turvallisuusaiheet ovat saatavilla, kun haluat.",
  "Mila · one day, one shared story": "Mila · yksi päivä, yhteinen tarina",
  "An important morning. Care through the day.": "Tärkeä aamu. Huolenpitoa läpi päivän.",
  "Reflects Mila's saved choices in the snowy-morning demo.": "Näyttää Milan tallennetut valinnat ensilumen aamun demossa.",
  "Mila's saved snowy-morning story · separate from the currently selected customer or scenario.": "Milan tallennettu ensilumen päivä · erillään nyt valitusta asiakkaasta tai tilanteesta.",
  "Clarity before leaving": "Selkeyttä ennen lähtöä",
  "Room to breathe": "Tilaa hengähtää",
  "Care at your pace": "Huolenpitoa omaan tahtiin",
  "Emotional arc is a design intention, not a measured feeling. Test usefulness, trust and opt-in cover reviews; validate retention and claims against a control group. No guaranteed NPS or savings uplift.": "Tunnekaari on suunnittelutavoite, ei mitattu tunnetila. Testaa hyödyllisyyttä, luottamusta ja asiakkaan valitsemia turvatarkistuksia. Varmenna pysyvyys ja vahingot verrokkiryhmällä. NPS-nousua tai säästöjä ei luvata.",

  "Demo controls": "Demon ohjaimet",
  "Customer": "Asiakas",
  "Time of day": "Päivän hetki",
  "Overview": "Yhteenveto",
  "Economics": "Kannattavuus",
  "Pilot plan": "Pilottisuunnitelma",
  "Everyday care. Measurable value.": "Arjen huolenpitoa. Mitattavaa arvoa.",
  "Pilot proposal · not approved IF material": "Pilottiehdotus · ei hyväksyttyä If-aineistoa",
  "Test usefulness before scaling": "Todista hyödyllisyys ennen laajentamista",
  "Value hypothesis": "Arvohypoteesi",
  "Annual assumptions": "Vuositason oletukset",
  "Your day, at your pace": "Sinun päiväsi, sinun tahtisi",
  "Care that creates commercial value": "Huolenpito, joka luo kaupallista arvoa",
  "Everyday safety companion · two use cases today, broader potential tomorrow.": "Arjen turvakumppani · tänään kaksi käyttötapausta, huomenna laajempi mahdollisuus.",
  "The commercial path": "Kaupallinen polku",
  "Relevant moment": "Osuva hetki",
  "A calm, optional cover review.": "Rauhallinen, valinnainen turvan tarkistus.",
  "Customer request": "Asiakkaan pyyntö",
  "Permission, topic and channel chosen by the customer.": "Asiakas valitsee luvan, aiheen ja kanavan.",
  "Advisor proposal": "Myyjän ehdotus",
  "Clear options and verified terms, without pressure.": "Selkeät vaihtoehdot ja tarkistetut ehdot, ilman painetta.",
  "Customer decision": "Asiakkaan päätös",
  "Suitable upgrade, partner service or current cover confirmed.": "Sopiva laajennus, kumppanipalvelu tai nykyisen turvan vahvistus.",
  "Cover growth": "Turvan laajentaminen",
  "Measure accepted offers / relevant proposals and net contribution after costs.": "Mittaa hyväksytyt tarjoukset / osuvat ehdotukset sekä lisäkate kulujen jälkeen.",
  "Partner services": "Kumppanipalvelut",
  "Measure completed services and agreed net referral income. No agreement, no assumed revenue.": "Mittaa toteutuneet palvelut ja sovittu nettovälitystulo. Ei sopimusta, ei oletettua tuloa.",
  "Retention & prevention": "Pysyvyys ja ennakointi",
  "Measure renewals and claims against a control group; count incremental value only once.": "Mittaa uusinnat ja vahingot verrokkiryhmään nähden; laske lisäarvo vain kerran.",
  "3-month pilot: test useful contacts, relevant proposals and accepted decisions. Longer follow-up validates claims and retention.": "3 kk pilotti: testaa hyödylliset yhteydenotot, osuvat ehdotukset ja hyväksytyt päätökset. Pidempi seuranta todentaa vahingot ja pysyvyyden.",
  "Investment case": "Investointiperustelu",
  "Fund learning. Earn the right to scale.": "Rahoita oppiminen. Ansaitse oikeus kasvaa.",
  "Proposal, not an approved IF pilot. All numbers below are editable assumptions, not forecasts or verified IF data.": "Ehdotus, ei hyväksytty If-pilotti. Alla olevat luvut ovat muokattavia oletuksia, eivät ennusteita tai vahvistettua If-dataa.",
  "Prevent losses": "Ehkäise vahinkoja",
  "Measure claims frequency and severity against a comparable control group. No savings are inferred from demo clicks.": "Vertaa vahinkotiheyttä ja vakavuutta vertailukelpoiseen verrokkiryhmään. Demon klikkauksista ei päätellä säästöjä.",
  "Serve a real need": "Palvele aitoa tarvetta",
  "Customer request → advisor conversation → suitable cover or confirmation that current cover is enough.": "Asiakkaan pyyntö → neuvojan keskustelu → sopiva turva tai vahvistus nykyisen turvan riittävyydestä.",
  "Build lasting value": "Rakenna pysyvää arvoa",
  "Test retention and partner usefulness. Digital support is a product hypothesis, not current sales revenue.": "Testaa pysyvyyttä ja kumppanipalvelun hyödyllisyyttä. Digituki on tuotehypoteesi, ei nykyistä myyntituloa.",
  "Annual economics sandbox": "Vuositason kannattavuuslaskelma",
  "Steady-state annual scenario, not the return on a 3-month pilot.": "Vakiintuneen toiminnan vuosiskenaario, ei 3 kuukauden pilotin tuotto.",
  "Customers": "Asiakkaita",
  "Annual claims cost / customer (€)": "Vahinkokulu / asiakas / vuosi (€)",
  "Claims cost reduction (%)": "Vahinkokulun alenema (%)",
  "Incremental net contribution / customer / year (€)": "Lisäkate / asiakas / vuosi (€)",
  "Annual operating cost (€)": "Vuotuiset käyttökulut (€)",
  "Claims savings / year": "Vahinkosäästö / vuosi",
  "Incremental contribution / year": "Lisäkate / vuosi",
  "Net impact / year": "Nettovaikutus / vuosi",
  "Break-even claims reduction": "Kannattavuuden vaatima vahinkokulun alenema",
  "Not calculable": "Ei laskettavissa",
  "Contribution is after claims, servicing, discounts and partner costs. Count retention or cross-sell only once. Operating cost includes staff, data, support and technology; setup investment is separate.": "Lisäkate on vahinkojen, palvelun, alennusten ja kumppanikulujen jälkeen. Laske pysyvyys tai lisämyynti vain kerran. Käyttökuluihin kuuluvat henkilöstö, data, tuki ja teknologia; perustamisinvestointi on erillinen.",
  "These assumptions do not support scale-up yet.": "Näillä oletuksilla laajentaminen ei vielä kannata.",
  "Positive scenario — evidence still required.": "Positiivinen skenaario — näyttö tarvitaan silti.",
  "Pilot decision gates": "Pilotin päätösportit",
  "Before launch": "Ennen aloitusta",
  "Agree budget, owner, data access, legal review, accessibility and success thresholds. Determine sample size from baseline claims data.": "Sovi budjetti, omistaja, datan käyttö, juridinen arvio, saavutettavuus ja onnistumisrajat. Määritä otoskoko lähtötason vahinkodatasta.",
  "3 months · feasibility": "3 kuukautta · toimivuus",
  "Tampere motor-customer proposal: test opt-in use, useful contacts, response time, cover reviews and notification fatigue. This is not proof of annual claims savings.": "Ehdotus Tampereen autoasiakkaille: testaa vapaaehtoinen käyttö, hyödylliset yhteydenotot, vasteaika, turvan tarkistukset ja ilmoituskuorma. Tämä ei todista vuotuisia vahinkosäästöjä.",
  "Longer follow-up · impact": "Pidempi seuranta · vaikutus",
  "Compare claims and retention over a suitable season-adjusted period. Scale only with credible incremental value after all costs and no material trust or privacy harms.": "Vertaa vahinkoja ja pysyvyyttä riittävän pitkällä, kausivaihtelun huomioivalla jaksolla. Laajenna vain uskottavalla lisäarvolla kaikkien kulujen jälkeen, ilman olennaista luottamus- tai tietosuojahaittaa.",
  "Stop or redesign if contacts feel pushy, warnings burden customers, permissions fail or unit economics remain negative.": "Pysäytä tai muuta suuntaa, jos yhteydenotot painostavat, ilmoitukset kuormittavat, luvat eivät toimi tai asiakaskohtainen kannattavuus jää negatiiviseksi.",
  "Open decisions": "Avoimet päätökset",
  "IF budget and integration estimate · verified policy terms · partner agreements · legal classification · baseline and control-group design.": "Ifin budjetti ja integraatioarvio · vahvistetut vakuutusehdot · kumppanisopimukset · juridinen luokittelu · lähtötaso ja verrokkiryhmän suunnittelu.",
  "Story, safeguards and expansion ideas": "Tarina, vastuullisuus ja laajennusideat",
  "Customer requests": "Asiakkaiden pyynnöt",
  "No contact requests": "Ei yhteydenottopyyntöjä",
  "No customer has requested contact yet.": "Yksikään asiakas ei ole vielä pyytänyt yhteydenottoa.",
  "Open customer view": "Avaa asiakasnäkymä",
  "Customer-approved context only": "Vain asiakkaan hyväksymät tiedot",
  "Requested contact": "Toivottu yhteydenotto",
  "Call tomorrow 12–13": "Soitto huomenna klo 12–13",
  "Message in My IF within 1 working day": "Viesti Omat sivut -palveluun 1 arkipäivässä",
  "Current cover": "Nykyinen turva",
  "Conversation opening": "Keskustelunavaus",
  "You asked us to review your cover. What would you like more peace of mind with?": "Pyysit meitä käymään turvasi läpi. Mihin kaipaisit lisää mielenrauhaa?",
  "Review together": "Käykää yhdessä läpi",
  "Confirm current motor cover and explain its terms.": "Vahvista nykyinen autoturva ja selvennä sen ehdot.",
  "Compare motor cover options if the customer wants extra support.": "Vertaa autoturvan vaihtoehtoja, jos asiakas toivoo lisää huolenpitoa.",
  "Explain the broad digital support concept; no upgrade needed in this demo.": "Selvennä laajaa digituen konseptia; demossa ei tarvetta laajennukselle.",
  "Explore optional digital support. Concept only, not an IF product for sale.": "Tutustukaa valinnaiseen digitukeen. Konsepti, ei myytävä If-tuote.",
  "Shared with advisor": "Jaettu neuvojalle",
  "Customer chose not to share context.": "Asiakas ei halunnut jakaa tilannetietoja.",
  "Request history": "Pyyntöhistoria",
  "Latest customer request": "Asiakkaan viimeisin pyyntö",
  "Earlier contacts and contract changes are not connected to this demo.": "Aiemmat yhteydenotot ja sopimusmuutokset eivät ole kytkettynä demoon.",
  "Coverage and prices must be checked from the actual policy. No automatic changes.": "Turva ja hinnat tarkistetaan oikeasta sopimuksesta. Ei automaattisia muutoksia.",
  "Profile unavailable — verify cover with the customer.": "Profiili ei saatavilla — tarkista turva asiakkaalta.",
  "Next contact": "Seuraava yhteydenotto",
  "For IF advisors": "Ifin myyjille ja asiakasneuvojille",
  "Advisor desk": "Myyjän työpöytä",
  "A customer request. A thoughtful conversation.": "Asiakkaan pyyntö. Huolehtiva keskustelu.",
  "Earlier concept material": "Aiempi konseptiaineisto",
  "Awaiting validation": "Odottaa arviointia",
  "Demo customer": "Demoasiakas",
  "My insurance": "Omat vakuutukseni",
  "Motor insurance": "Autovakuutus",
  "Full cover": "Täyskasko",
  "Partial cover": "Osakasko",
  "Motor liability": "Liikennevakuutus",
  "Digiturva · concept": "Digiturva · konsepti",
  "Broad": "Laaja",
  "Basic": "Perus",
  "No digital cover": "Ei digiturvaa",
  "Safety guidance": "Turvallisuusohjeet",
  "Roadside support": "Tiepalvelutuki",
  "Partner benefits": "Kumppaniedut",
  "Digital advice": "Digineuvonta",
  "Recovery assistance": "Palautumisapu",
  "Available in demo": "Mukana demossa",
  "Not in this demo cover": "Ei tässä demoturvassa",
  "Insurance details": "Vakuutusten tiedot",
  "Your support for this situation": "Tukesi tässä tilanteessa",
  "Same warnings for everyone": "Samat varoitukset kaikille",
  "Insurance affects support, not risk urgency.": "Vakuutus vaikuttaa tukeen, ei riskin kiireellisyyteen.",
  "Illustrative policies and benefits, not a coverage decision. Digiturva is a product idea, not an existing IF product.": "Vakuutukset ja edut ovat havainnollistavia, eivät korvauspäätös. Digiturva on tuoteidea, ei nykyinen If-tuote.",
  "Broad concept: digital advice, recovery assistance and partner benefits. Basic concept: advice and smaller partner benefits. Neither guarantees security or reimbursement.": "Laaja konsepti: digineuvonta, palautumisapu ja kumppaniedut. Peruskonsepti: neuvonta ja pienemmät kumppaniedut. Kumpikaan ei takaa turvallisuutta tai korvausta.",
  "Actual coverage depends on your policy, exclusions and excess. Motor liability is not cover for damage to your own car. Identity-theft cover must be checked separately, not inferred from motor cover.": "Todellinen turva määräytyy vakuutuskirjasta, rajoituksista ja omavastuusta. Liikennevakuutus ei kata oman auton vaurioita. Identiteettivarkausturva tarkistetaan erikseen, ei päätellä autovakuutuksesta.",
  "Compare motor cover at IF": "Vertaa autovakuutuksia Ifissä",
  "Explore digital support concept": "Tutustu digituen konseptiin",
  "Explore my benefits": "Katso omat edut",
  "Illustrative benefit · not a verified IF offer": "Esimerkkietu · ei vahvistettu If-tarjous",
  "Potential partner": "Potentiaalinen kumppani",
  "Check eligibility at IF": "Tarkista oikeus turvaan Ifistä",
  "Not in your demo package": "Ei omassa demopaketissasi",
  "Included in demo package": "Mukana demopaketissa",
  "Your cover in these conditions": "Turvasi näissä olosuhteissa",
  "Illustrative examples — check your actual policy terms at IF.": "Havainnollistavia esimerkkejä — tarkista todelliset ehdot Ifistä.",
  "Review my cover at IF": "Tarkista turvani Ifissä",
  "Lunch 12:00": "Lounas klo 12",
  "Evening 19:00": "Ilta klo 19",
  "Good morning, {0}. One thing needs your attention.": "Huomenta, {0}. Yksi asia vaatii huomiosi.",
  "Good evening, {0}. A moment for your safety.": "Hyvää iltaa, {0}. Hetki omalle turvallisuudellesi.",
  "Hi, {0}": "Hei, {0}",
  "Your email found in: {0}.": "Sähköpostisi löytyi palveluista: {0}.",
  "Snow + risky driving": "Lunta ja haastava ajokeli",
  "Sunny + safe driving": "Aurinkoista ja rauhallista ajoa",
  "Multiple breaches": "Useita tietovuotoja",
  "Black ice + night": "Mustaa jäätä ja yöajoa",
  "Typical Finnish November morning": "Tavallinen suomalainen marraskuun aamu",
  "Everything looks good": "Kaikki näyttää hyvältä",
  "Identity under pressure": "Henkilötiedot vaarassa",
  "Severe road conditions": "Vaikeat tieolosuhteet",
  "Online pharmacy": "Verkkoapteekki",
  Weak: "Heikko",
  Strong: "Vahva",
  Snow: "Lumisade",
  Clear: "Selkeää",
  Cloudy: "Pilvistä",
  "Freezing rain": "Jäätävä sade",
  Low: "Matala",
  Medium: "Kohtalainen",
  High: "Korkea",
  Light: "Vähäinen",
  Moderate: "Kohtalainen",
  Heavy: "Vilkas",
  "{0} breaches detected": "Havaittu {0} tietovuotoa",
  "Breach detected: {0}": "Tietovuoto havaittu: {0}",
  "mila.k@…mail.com found in: {0}.": "Osoite mila.k@…mail.com löytyi palveluista: {0}.",
  "Attackers try leaked passwords on other services.":
    "Rikolliset kokeilevat vuotaneita salasanoja muissa palveluissa.",
  "Change it now so nobody can get into your accounts.":
    "Vaihda salasana estääksesi pääsyn tileillesi.",
  "Breach data · HIBP-style mock": "Tietovuototiedot · HIBP-tyylinen demodata",
  "Fix now": "Korjaa nyt",
  "Leaked passwords replaced. Breach monitoring is on.":
    "Vuotaneet salasanat vaihdettu. Tietovuotojen seuranta käytössä.",
  "Securing your accounts": "Tilien suojaaminen",
  "Verifying breach records": "Tietovuototietojen tarkistus",
  "Revoking active sessions": "Vanhojen istuntojen sulkeminen",
  "Generating strong new passwords": "Vahvojen salasanojen luominen",
  "Routing to LinkedIn password change": "Siirtyminen LinkedInin salasanan vaihtoon",
  "Passwords changed and old sessions signed out.":
    "Salasanat vaihdettu ja vanhat istunnot suljettu.",
  "Change password on LinkedIn": "Vaihda LinkedIn-salasana",
  "Password strength: Weak": "Salasana on heikko",
  "Your email, streaming and shop accounts share a similar password.":
    "Sähköposti-, suoratoisto- ja verkkokauppatileilläsi on samankaltainen salasana.",
  "One leak can unlock all three.": "Yksi tietovuoto voi avata pääsyn kaikille kolmelle tilille.",
  "One strong password per account, so a single leak stays a small problem.":
    "Oma vahva salasana jokaiselle tilille rajaa tietovuodon vaikutukset.",
  "Password check · k-anonymity mock": "Salasanatarkistus · k-anonymiteetin demo",
  "Improve security": "Paranna suojausta",
  "3 reused passwords replaced with unique ones.":
    "Kolme uudelleenkäytettyä salasanaa vaihdettu yksilöllisiksi.",
  "Strengthening your passwords": "Salasanojen vahvistaminen",
  "Scanning saved accounts": "Tallennettujen tilien tarkistus",
  "Flagging 3 reused passwords": "Kolmen uudelleenkäytetyn salasanan tunnistus",
  "Creating unique replacements": "Yksilöllisten salasanojen luominen",
  "3 passwords replaced.": "Kolme salasanaa vaihdettu.",
  "IF Identity insurance": "IF:n ohjeet identiteettivarkauteen",
  "Two-factor authentication: Off": "Kaksivaiheinen tunnistautuminen ei ole käytössä",
  "Your main email has no second login step.":
    "Ensisijaisen sähköpostisi kirjautumisessa ei ole toista varmennusta.",
  "Email resets every other account. 2FA blocks most automated takeover attempts.":
    "Sähköpostilla voi palauttaa muiden tilien salasanat. Kaksivaiheinen tunnistautuminen vaikeuttaa tilikaappauksia.",
  "Turn on 2FA to protect your identity, even if a password leaks.":
    "Ota kaksivaiheinen tunnistautuminen käyttöön suojaksi myös salasanan vuotaessa.",
  "Account status · IdP-style mock": "Tilin tila · IdP-tyylinen demodata",
  "Enable 2FA": "Ota kaksivaiheinen tunnistautuminen käyttöön",
  "2FA is on for your email. Backup codes are saved.":
    "Sähköpostin kaksivaiheinen tunnistautuminen käytössä. Varakoodit tallennettu.",
  "Turning on 2FA": "Kaksivaiheisen tunnistautumisen käyttöönotto",
  "Connecting authenticator app": "Tunnistautumissovelluksen yhdistäminen",
  "Verifying 6-digit code": "Kuusinumeroisen koodin tarkistus",
  "Saving backup codes": "Varakoodien tallennus",
  "2FA is on.": "Kaksivaiheinen tunnistautuminen käytössä.",
  "{0} and icy roads on your route": "{0} ja jäisiä teitä reitilläsi",
  "{0} °C. Road risk is High on the Tampere ring road.":
    "{0} °C. Tampereen kehätien keli on riskialtis.",
  "Braking distance on ice can be up to 10× longer.":
    "Jäällä jarrutusmatka voi olla jopa kymmenkertainen.",
  "Avoid icy roads to keep your family safe on the way to school and work.":
    "Vältä jäisiä teitä perheesi koulumatkalla ja työmatkalla.",
  "Weather · OpenWeather-style mock · Road data · Digitraffic-style mock":
    "Sää · OpenWeather-tyylinen demo · Tietiedot · Digitraffic-tyylinen demo",
  "Avoid icy roads": "Vältä jäisiä teitä",
  "Switched to gritted main roads: +4 min, much lower risk.":
    "Vaihdettu hiekoitetuille pääteille: 4 minuuttia lisää, pienempi riski.",
  "Finding a safer route": "Turvallisemman reitin etsiminen",
  "Reading live road weather": "Tiesäätietojen tarkistus",
  "Checking gritted roads": "Hiekoitettujen teiden tarkistus",
  "Comparing 3 alternative routes": "Kolmen vaihtoehtoisen reitin vertailu",
  "Safer route saved for tomorrow morning.": "Turvallisempi reitti tallennettu huomisaamuksi.",
  "IF Roadside assistance": "IF:n tiepalvelu",
  "Night driving {0}%": "Yöajoa {0} %",
  "A large share of your kilometres were driven between 22:00 and 05:00.":
    "Suuri osa ajokilometreistäsi kertyi kello 22–05.",
  "Visibility and tiredness raise accident risk at night.":
    "Pimeys ja väsymys lisäävät onnettomuusriskiä yöllä.",
  "Rest reminders help you arrive safely, not just on time.":
    "Taukomuistutukset auttavat saapumaan turvallisesti, eivät vain ajoissa.",
  "Telematics · OBD-style mock": "Ajotiedot · OBD-tyylinen demodata",
  "Get tips": "Katso vinkit",
  "Rest reminders are on for drives over 2 hours.":
    "Taukomuistutukset käytössä yli kahden tunnin ajomatkoilla.",
  "Night driving plan": "Yöajon suunnitelma",
  "Analysing your night trips": "Yöajojen tarkastelu",
  "Building a rest-stop plan": "Taukosuunnitelman laatiminen",
  "Rest reminders set.": "Taukomuistutukset asetettu.",
  "IF Car insurance": "IF:n autovakuutus",
  "{0} hard brakes · {1} speeding": "{0} voimakasta jarrutusta · {1} ylinopeutta",
  "Mostly in heavy traffic on Hervannan valtaväylä.":
    "Enimmäkseen Hervannan valtaväylän ruuhkassa.",
  "Usually a sign of short following distance.": "Usein merkki liian lyhyestä turvavälistä.",
  "Calmer driving means less stress, less fuel and fewer close calls.":
    "Rauhallinen ajo vähentää stressiä, kulutusta ja vaaratilanteita.",
  "Telematics · OBD-style mock · Traffic · Google Traffic-style mock":
    "Ajotiedot · OBD-tyylinen demo · Liikenne · Google Traffic -tyylinen demo",
  "View trips": "Tarkastele ajoja",
  "Coaching tips added to your next 5 trips.": "Ohjausvinkit lisätty viidelle seuraavalle ajolle.",
  "Reviewing your trips": "Ajomatkojen tarkastelu",
  "Loading telematics": "Ajotietojen lataaminen",
  "Marking events on your trips": "Tapahtumien merkitseminen ajoihin",
  "Coaching tips added.": "Ohjausvinkit lisätty.",
  "Report a claim (vahinkoilmoitus)": "Tee vahinkoilmoitus",
  "Tire tread {0} mm": "Renkaan urasyvyys {0} mm",
  "Close to the 3 mm winter legal minimum.":
    "Lähellä talvirenkaiden lakisääteistä 3 mm:n vähimmäisurasyvyyttä.",
  "Worn tires lose grip on snow and slush.":
    "Kuluneet renkaat menettävät pitoa lumessa ja sohjossa.",
  "Fresh tires give you grip when it matters most.":
    "Hyväkuntoiset renkaat auttavat pitämään pidon.",
  "Tire sensor · TPMS-style mock": "Rengastiedot · simuloitu urasyvyys, ei TPMS-mittaus",
  "Check tires": "Tarkista renkaat",
  "Tire check booked for Sat 10:00.": "Renkaiden tarkistus varattu lauantaiksi klo 10.",
  "Checking your tires": "Renkaiden tarkistus",
  "Reading tread sensor: {0} mm": "Simuloitu urasyvyys: {0} mm",
  "Comparing with winter minimum (3 mm)": "Vertailu talvirenkaiden vähimmäisurasyvyyteen (3 mm)",
  "Finding a partner workshop near you": "Korjaamovaihtoehtojen etsiminen",
  "Tire check booked.": "Renkaiden tarkistus varattu demossa.",
  "Book maintenance": "Suunnittele huolto",
  "Service due in {0} km": "Huoltoon {0} km",
  "Brakes and lights get checked during the service.": "Huollossa tarkistetaan jarrut ja valot.",
  "A well-kept car breaks down less often.": "Hyvin huollettu auto rikkoutuu harvemmin.",
  "No surprise breakdowns on cold mornings.": "Vähemmän yllättäviä vikoja kylminä aamuina.",
  "Vehicle data · OEM API-style mock": "Auton tiedot · OEM API -tyylinen demodata",
  "Service booked for Tue 08:30.": "Huolto varattu tiistaiksi klo 8.30 demossa.",
  "Booking a service": "Huollon suunnittelu",
  "Checking service interval": "Huoltovälin tarkistus",
  "Finding free slots": "Vapaiden aikojen etsiminen demossa",
  "Service booked.": "Huolto varattu demossa.",
  "Your email appears in {0} known breach{1}":
    "Sähköpostisi esiintyy {0} tunnetussa tietovuodossa{1}",
  "2FA is off on your main email":
    "Ensisijaisen sähköpostisi kaksivaiheinen tunnistautuminen ei ole käytössä",
  "Weak or reused passwords found": "Heikkoja tai uudelleenkäytettyjä salasanoja havaittu",
  "High share of night driving ({0}%)": "Paljon yöajoa ({0} %)",
  "Icy conditions ({0} °C, {1})": "Jäinen keli ({0} °C, {1})",
  "Service is overdue soon, so breakdowns are more likely":
    "Huolto lähestyy, joten vikojen mahdollisuus kasvaa",
  "Your commute runs in heavy traffic": "Työmatkasi kulkee vilkkaassa liikenteessä",
  "{0} accident{1} reported on your route today":
    "Reitilläsi ilmoitettu tänään {0} onnettomuutta{1}",
  "{0} hard-braking events this week": "{0} voimakasta jarrutusta tällä viikolla",
  "Identity protection": "Ohjeet identiteettivarkauteen",
  "Roadside assistance": "Tiepalvelu",
  risk: "Riski",
  "{0} out of 100, {1} risk": "{0} sadasta, riski {1}",
  "{0} out of 100, {1}": "{0} sadasta, {1}",
  "Resolved: ": "Ratkaistu: ",
  "Planned:": "Suunniteltu:",
  "What you learned": "Mitä opit",
  "Why? (10 s)": "Miksi?",
  "−{0} risk": "−{0} riskipistettä",
  Later: "Myöhemmin",
  "You've done your part · optional extra peace of mind":
    "Olet tehnyt oman osasi · vapaaehtoista lisäturvaa",
  "Not needed right now": "Ei tarpeen juuri nyt",
  "For the risks outside your control, this can help. No pressure — explore it only if it feels useful.":
    "Tämä voi auttaa riskeissä, joihin et itse voi vaikuttaa. Tutustu vain, jos se tuntuu hyödylliseltä.",
  "Why it might fit you:": "Miksi tämä voi sopia sinulle:",
  "Your current data shows no reason to recommend this product.":
    "Nykyiset demotiedot eivät anna aihetta tähän suositukseen.",
  "Explore if helpful": "Tutustu halutessasi",
  Close: "Sulje",
  "risk score ·": "Riskipisteet ·",
  "Demo action completed — no real accounts, routes or bookings were changed.":
    "Demoharjoitus tehty – oikeita tilejä, reittejä tai varauksia ei muutettu.",
  "Continue my progress": "Jatka oppimista",
  "Optional:": "Vapaaehtoinen:",
  "Chose a calm moment to act instead of rushing.":
    "Valitsit rauhallisen hetken toimia kiirehtimisen sijaan.",
  Weather: "Sää",
  "Road risk": "Tien riski",
  "Safer route": "Turvallisempi reitti",
  Traffic: "Liikenne",
  "Accidents nearby": "Onnettomuuksia lähellä",
  Language: "Kieli",
  "Choose view": "Valitse näkymä",
  "For IF leadership, product & compliance":
    "IF:n johdolle, tuotekehitykselle ja sääntelyasiantuntijoille",
  "The business case behind IF Compass.": "IF Compassin liiketoimintaperusteet.",
  "Value, governance, data quality and roadmap — reacting live to the customer scenario.":
    "Arvo, hallinta, tiedon laatu ja kehityssuunnitelma asiakkaan demotilanteessa.",
  today: "tänään",
  "Cybersecurity Risk Advisor": "Digiturvan riskineuvoja",
  "Your digital safety": "Digitaalinen turvallisuutesi",
  "Digital risk": "Digitaalinen riski",
  "Live sources: breach feeds · password check · 2FA status":
    "Demolähteet: tietovuodot · salasanatarkistus · tunnistautumisen tila",
  "No cyber risks found. Your identity looks well protected.":
    "Digiriskejä ei havaittu demossa. Henkilötietosi näyttävät hyvin suojatuilta.",
  "Vehicle Usage Risk Advisor": "Autoilun riskineuvoja",
  "Driving risk": "Ajamisen riski",
  "Live road conditions": "Simuloidut tieolosuhteet",
  mock: "demo",
  "Live · updates every 5 s": "Simuloitu · päivittyy 5 sekunnin välein",
  "This week's driving": "Tämän viikon ajot",
  Night: "Yöajo",
  "hard brakes ·": "voimakasta jarrutusta ·",
  speeding: "ylinopeutta",
  Mon: "Ma",
  Tue: "Ti",
  Wed: "Ke",
  Thu: "To",
  Fri: "Pe",
  Sat: "La",
  Sun: "Su",
  "Safe roads and smooth driving. Enjoy the ride.": "Hyvä keli ja tasaista ajoa. Hyvää matkaa.",
  "Your progress today": "Edistymisesi tänään",
  "What changed for you": "Mikä muuttui kohdallasi",
  Before: "Ennen",
  Now: "Nyt",
  "points lower": "pistettä vähemmän",
  "Take an action above to see your risk improve.":
    "Tee yllä oleva harjoitus nähdäksesi riskipisteiden muutoksen.",
  "Internal view · IF leadership, product & compliance":
    "Sisäinen näkymä · IF:n johto, tuotekehitys ja sääntely",
  "This view is never shown to customers. It explains the business case, governance and architecture behind what Mila sees. Numbers react to the scenario and to actions taken in the Customer view.":
    "Tämä sisältö kuuluu vain sisäiseen näkymään. Se kuvaa Milan kokemuksen liiketoimintaperusteet, hallinnan ja rakenteen. Luvut muuttuvat demotilanteen ja asiakasnäkymän valintojen mukaan.",
  "Business value for IF": "Liiketoiminta-arvo IF:lle",
  "Why this matters": "Miksi tämä on tärkeää",
  "expected claim likelihood": "vahinkotodennäköisyyden demoarvio",
  "estimated claims cost avoided (primary value) ·":
    "vältettyjen vahinkokulujen demoarvio (ensisijainen arvo) ·",
  "earned, post-action offers (secondary)":
    "toimenpiteen jälkeistä vapaaehtoista ehdotusta (toissijainen arvo)",
  "self-service actions, no phone call needed": "itsepalveluharjoituksia, ilman puhelua",
  "Figures are illustrative estimates for the demo.":
    "Luvut ovat havainnollistavia demoarvioita, eivät mitattuja tuloksia.",
  "Value for the customer": "Arvo asiakkaalle",
  "Safety — risks are caught before they become claims":
    "Turvallisuus – riskit huomataan ennen vahinkoa",
  "Clarity — every insight explains itself in plain language":
    "Selkeys – jokainen havainto selitetään ymmärrettävästi",
  "Prevention — small fixes today, fewer surprises tomorrow":
    "Ennaltaehkäisy – pieni teko tänään, vähemmän yllätyksiä huomenna",
  "Peace of mind — someone is looking ahead for you":
    "Mielenrauha – joku katsoo eteenpäin puolestasi",
  "Value for IF": "Arvo IF:lle",
  "Reduced claims through prevention": "Vähemmän vahinkoja ennaltaehkäisyn avulla",
  "Relevant, explained cross-sell instead of cold offers":
    "Perusteltuja lisäturvaehdotuksia kylmien tarjousten sijaan",
  "Improved retention — customers stay with an insurer that protects them":
    "Parempi asiakaspysyvyys – asiakkaat arvostavat ennakoivaa turvaa",
  "Brand differentiation: the insurer that prevents, not just pays":
    "Erottuva brändi: vakuuttaja, joka ehkäisee eikä vain korvaa",
  "Risk governance & compliance": "Riskienhallinta ja sääntelyn noudattaminen",
  "Every module, accountable": "Vastuut jokaiselle moduulille",
  Requirement: "Vaatimus",
  "Cybersecurity module": "Digiturvamoduuli",
  "Vehicle module": "Autoilumoduuli",
  Status: "Tila",
  "GDPR — purpose limitation": "GDPR – käyttötarkoitussidonnaisuus",
  "Breach data used only to protect the customer":
    "Tietovuototietoja käytetään vain asiakkaan suojaamiseen",
  "Driving data used only for safety insights":
    "Ajotietoja käytetään vain turvallisuushavaintoihin",
  Compliant: "Suunnittelutavoite – arvioitava",
  "Insurance regulation": "Vakuutussääntely",
  "No automated pricing decisions from breach data":
    "Ei automaattista hinnoittelua tietovuototiedoista",
  "No premium changes without human review": "Ei maksujen muutoksia ilman ihmisen arviota",
  Explainability: "Selitettävyys",
  "Every insight shows source, reason and benefit":
    "Jokainen havainto näyttää lähteen, syyn ja hyödyn",
  "IF internal risk policy": "IF:n sisäinen riskipolitiikka",
  "Human approves before any account action": "Ihminen hyväksyy tilitoimet etukäteen",
  "Recommendations only — never auto-booking": "Vain ehdotuksia – ei automaattisia varauksia",
  "Audit trail": "Tapahtumahistoria",
  "Every recommendation and action is logged":
    "Demovalinnat tallentuvat vain tähän selaimeen; tuotannon lokitus suunniteltava",
  "Data quality & reliability": "Tiedon laatu ja luotettavuus",
  "Can we trust this data?": "Voimmeko luottaa tietoon?",
  "Weather feed": "Säätiedot",
  "Updated 10 min ago": "Päivitetty 10 min sitten (demo)",
  "Official meteorological source": "Suunniteltu virallinen säälähde; demodata",
  "Road conditions": "Tieolosuhteet",
  "Updated 4 min ago": "Päivitetty 4 min sitten (demo)",
  "National road authority feed": "Suunniteltu kansallinen tietietolähde; demodata",
  "Breach data": "Tietovuototiedot",
  "Updated 2 h ago": "Päivitetty 2 h sitten (demo)",
  "Trusted breach aggregation feed": "Suunniteltu tietovuotojen koostelähde; demodata",
  "Vehicle telematics": "Auton ajotiedot",
  "Updated 12 min ago": "Päivitetty 12 min sitten (demo)",
  "Direct from the car": "Simuloitu auton tietolähde",
  "% reliable": "% luotettavuus (demoarvio)",
  "Failure mode simulation": "Häiriötilanteen simulaatio",
  "What if the data breaks?": "Entä jos tiedot puuttuvat?",
  "Weather feed down": "Säälähde ei vastaa",
  "Data 3 days old": "Tiedot 3 päivää vanhoja",
  "Contradictory sources": "Ristiriitaiset lähteet",
  "Pick a failure above to see how the system responds safely.":
    "Valitse häiriö nähdäksesi suunnitellun turvallisen toimintatavan.",
  "Safe fallback: no weather-based advice": "Turvallinen toimintatapa: ei säähän perustuvaa neuvoa",
  'The icy-road insight is hidden and marked "unavailable" — never guessed. Mila sees: "Weather data is temporarily unavailable, so we can\'t assess road risk right now." No recommendation is made on missing data.':
    "Suunniteltu toimintatapa: jäisen tien havaintoa ei arvata. Asiakas näkee, ettei säätietoa ole saatavilla eikä tien riskiä voida arvioida. Puuttuvasta tiedosta ei tehdä suositusta. Tämä paneeli havainnollistaa toimintatapaa.",
  "Safe fallback: staleness is shown, advice is softened":
    "Turvallinen toimintatapa: vanhentunut tieto merkitään",
  'Insights based on old data get a visible "based on data from 3 days ago" label and drop to informational only — no urgent action buttons until fresh data arrives.':
    "Suunniteltu toimintatapa: vanhaan tietoon perustuvat havainnot merkitään kolmen päivän ikäisiksi. Ne ovat vain tiedoksi, kunnes uutta tietoa saadaan.",
  "Safe fallback: the cautious source wins": "Turvallinen toimintatapa: varovaisempi arvio",
  'When two sources disagree (e.g. one says icy, one says clear), the system shows the more cautious assessment and says so openly: "Sources disagree — we show the safer option."':
    "Suunniteltu toimintatapa: lähteiden ollessa ristiriidassa näytetään varovaisempi arvio ja ristiriita kerrotaan avoimesti.",
  "Principle: the system may stay silent, but it may never invent risk advice.":
    "Periaate: järjestelmä voi olla hiljaa, mutta se ei saa keksiä riskineuvoja.",
  "Cost–benefit for IF": "Kustannukset ja hyödyt IF:lle",
  "What does this produce?": "Mitä tämä tuottaa?",
  "−12% identity-related claims": "−12 % identiteettiin liittyviä vahinkoja",
  "+9% identity insurance take-up": "+9 % kiinnostusta lisäturvaan",
  "+3 pts retention": "+3 pistettä asiakaspysyvyyttä",
  "−8% accident claims in target group": "−8 % liikennevahinkoja kohderyhmässä",
  "+6% kasko & roadside take-up": "+6 % kiinnostusta kaskoon ja tiepalveluun",
  "+2 pts retention": "+2 pistettä asiakaspysyvyyttä",
  "estimated annual impact": "vuotuisen vaikutuksen demoarvio",
  "Illustrative demo estimates — to be validated with IF portfolio data.":
    "Havainnollistavia demoarvioita – vahvistettava IF:n vakuutuskannan tiedoilla.",
  "Operational integration": "Liittäminen IF:n toimintaan",
  "Fits into IF, not beside it": "Osaksi IF:ää, ei erilliseksi saarekkeeksi",
  "Vahinkoilmoitus (claims)": "Vahinkoilmoitus",
  "If a risk turns into damage, the claim form opens pre-filled with context — faster handling, less friction.":
    "Tavoite: vahingon sattuessa tiedot voidaan siirtää asiakkaan suostumuksella vahinkoilmoitukseen. Demo linkittää IF:n sivulle, ei esitäytä ilmoitusta.",
  "Asiakaspalvelu (customer service)": "Asiakaspalvelu",
  "Agents see the same insights Mila sees, so calls start from understanding, not from zero.":
    "Tavoite: asiakaspalvelu näkee asiakkaan luvalla samat havainnot. Liitäntää ei ole demossa.",
  "Vakuutustuotteet (products)": "Vakuutustuotteet",
  "Recommendations route to the relevant existing product page — no new product silos.":
    "Ehdotukset johtavat olemassa oleville IF:n palvelusivuille.",
  "Tiepalvelu (roadside)": "Tiepalvelu",
  "Breakdown-risk insights link directly to roadside assistance signup and booking.":
    "Tiepalvelulinkki avaa IF:n oikean avustuspalvelun. Demo ei tilaa apua.",
  "Sales & marketing": "Myynti ja markkinointi",
  "Only explained, consented insights feed offers — every suggestion shows its reason.":
    "Tavoite: vain perustellut, suostumukseen pohjautuvat havainnot tukevat vapaaehtoisia ehdotuksia.",
  "Customer trust & transparency": "Luottamus ja läpinäkyvyys",
  "What we use, and why": "Mitä käytämme ja miksi",
  "Location & routes": "Sijainti ja reitit",
  "To warn about icy roads and accidents on your way":
    "Varoituksiin jäisistä teistä ja reitin onnettomuuksista",
  "Safer commute": "Turvallisempi työmatka",
  "Driving style (telematics)": "Ajotapa ja ajotiedot",
  "To spot tiring night driving and harsh braking":
    "Rasittavan yöajon ja voimakkaiden jarrutusten tunnistamiseen",
  "Gentler, cheaper driving": "Rauhallisempi ja taloudellisempi ajo",
  "Breach monitoring of your email": "Sähköpostin tietovuotoseuranta",
  "To catch leaked passwords before criminals use them":
    "Vuotaneiden salasanojen tunnistamiseen ajoissa",
  "Identity stays yours": "Henkilötietosi pysyvät suojassa",
  "Weather & road data": "Sää- ja tietiedot",
  "To time warnings to real conditions": "Varoitusten ajoittamiseen kelin mukaan",
  "Right advice at the right time": "Oikea neuvo oikeaan aikaan",
  "Use {0}": "Käytä tietoja: {0}",
  "Every toggle is opt-in and reversible. Turn something off and the related insights disappear — no questions asked.":
    "Valinnat koskevat vain demoa, eivät IF-tiliäsi. Voit perua valinnan, jolloin siihen liittyvät havainnot piilotetaan.",
  "Ethical boundaries": "Eettiset rajat",
  "What we will never do": "Mitä emme tee",
  "No mental health prediction or inference": "Ei mielenterveyden ennustamista tai päättelyä",
  "No financial hardship inference": "Ei taloudellisten vaikeuksien päättelyä",
  "No profiling based on sensitive data (health, religion, ethnicity, politics)":
    "Ei profilointia arkaluonteisilla tiedoilla (terveys, uskonto, etnisyys, politiikka)",
  "No selling or sharing of personal data to third parties":
    "Ei henkilötietojen myyntiä tai jakamista kolmansille osapuolille",
  "No hidden scoring — every score can be explained and questioned":
    "Ei piilopisteytystä – jokainen pisteytys on selitettävä ja kyseenalaistettava",
  "No surveillance feel: insights are about safety, never about monitoring the customer":
    "Ei valvonnan tunnetta: havainnot tukevat turvallisuutta, eivät asiakkaan tarkkailua",
  "These boundaries are hard rules in the system design, not marketing promises.":
    "Nämä ovat suunnittelun periaatteita. Tuotannon toteutus vaatii erillisen tarkastuksen.",
  "Scalability roadmap": "Laajentamisen kehityssuunnitelma",
  "New modules plug in — no rebuild": "Uudet moduulit yhteiseen rakenteeseen",
  Cybersecurity: "Digiturva",
  Vehicle: "Autoilu",
  Home: "Koti",
  Travel: "Matkat",
  Family: "Perhe",
  SME: "Pk-yritykset",
  "Live in this demo": "Käytössä demossa",
  "Q1 2027 · water leak & fire sensors": "Q1 2027 · vesivuoto- ja palotunnistimet",
  "Q2 2027 · destination risk & cover gaps": "Q2 2027 · matkakohteen riskit ja turvan puutteet",
  "Q3 2027 · young drivers & child safety": "Q3 2027 · nuoret kuljettajat ja lasten turvallisuus",
  "2028 · small business cyber & property": "2028 · pienyritysten digi- ja omaisuusturva",
  "Each module reuses the same engine: data sources → explainable insight → customer action → IF service. Adding a module means adding data connectors and rules, not a new system.":
    "Jokainen moduuli käyttää yhteistä ketjua: tietolähde → selitettävä havainto → asiakkaan valinta → IF:n palvelu. Laajentaminen lisää tietolähteitä ja sääntöjä, ei uutta järjestelmää.",
  "IF Compass · Demo concept · All live data is simulated mock data":
    "IF Compass · Demokonsepti · Kaikki reaaliaikaiset tiedot on simuloitu",
  "Learning & Development": "Oppiminen ja kehittyminen",
  "Safer decisions, one step at a time": "Turvallisempia valintoja, askel kerrallaan",
  "Safety Score": "Turvallisuuspisteet",
  "Safety progress": "Oppimisen edistyminen",
  "positive decisions · +": "myönteistä valintaa · +",
  "progress points": "oppimispistettä",
  "Demo progress measure, not a guarantee of safety or an insurance rating. Resets with each scenario.":
    "Demon oppimismittari, ei turvallisuuslupaus tai vakuutusluokitus. Nollautuu demotilanteen vaihtuessa.",
  "Learning Timeline": "Oppimisaikajana",
  "Your next safer decision starts a new chapter.":
    "Seuraava turvallisempi valintasi aloittaa uuden luvun.",
  Step: "Askel",
  "Digital safety": "Digiturva",
  "Driving safety": "Ajoturvallisuus",
  "Stopping at 50 km/h": "Pysähtyminen nopeudesta 50 km/h",
  "Road surface": "Tien pinta",
  dry: "Kuiva",
  wet: "Märkä",
  ice: "Jäinen",
  "Fresh tires · 8 mm": "Uudet renkaat · 8 mm",
  "Your tires · {0} mm": "Omat renkaat · {0} mm",
  "Tire tread:": "Renkaan urasyvyys:",
  "{0} millimetres": "{0} millimetriä",
  "+{0} m — about {1} car lengths longer.": "+{0} m – noin {1} autonmittaa pidempi.",
  "Same as new tires.": "Sama kuin uusilla renkailla.",
  "What if I leave at…": "Entä jos lähden kello…",
  "Leave at {0}": "Lähtö kello {0}",
  "Gritter 07:40": "Hiekoitus 07.40",
  Icy: "Jäinen",
  Gritted: "Hiekoitettu",
  Rush: "Ruuhka",
  "Trip risk": "Matkan riski",
  "Road turns icy on the highway.": "Moottoritie muuttuu jäiseksi.",
  "Keep cruise control on": "Pidä vakionopeudensäädin päällä",
  "Turn cruise control off": "Kytke vakionopeudensäädin pois",
  "Cruise control off on ice — you keep control of the speed.":
    "Vakionopeudensäädin pois jäällä – hallitset nopeutta itse.",
  "The car starts to slide.": "Auto alkaa luistaa.",
  "Look and steer where you want to go": "Katso ja ohjaa haluamaasi suuntaan",
  "Brake hard and look at the obstacle": "Jarruta voimakkaasti ja katso estettä",
  "Look where you want to go — your hands follow your eyes.":
    "Katso haluamaasi suuntaan – kädet seuraavat katsetta.",
  "SMS: “Your bank account is locked, tap here”.":
    "Tekstiviesti: ”Pankkitilisi on lukittu, paina tästä”.",
  "Tap the link quickly": "Paina linkkiä nopeasti",
  "Open the bank app yourself": "Avaa itse pankkisi sovellus",
  "Open the app yourself — never trust a link in an urgent message.":
    "Avaa sovellus itse – älä luota kiireellisessä viestissä olevaan linkkiin.",
  "Quick choice: {0}": "Pikavalinta: {0}",
  "5-second choice ·": "Lyhyt valinta ·",
  "Nice — +8 Safety Score.": "Hyvä valinta – +8 oppimispistettä, vain kerran.",
  "Close. Here's the trick:": "Ei aivan. Muista tämä:",
  Next: "Seuraava",
  "What IF…? game": "What IF…? -peli",
  "Try a different choice and see what happens. Optional — games never affect your insurance price.": "Kokeile toista valintaa ja katso, mitä tapahtuu. Valinnainen — pelit eivät vaikuta vakuutusmaksuusi.",
  "Picked for today's situation": "Valittu tämän päivän tilanteeseen",
  "What IF I brake on…": "What IF jarrutan…",
  "What IF I leave at…": "What IF lähden kello…",
  "What IF I had 5 seconds?": "What IF minulla olisi 5 sekuntia?",
  "What IF one password leaks?": "What IF yksi salasana vuotaa?",
  "Same password everywhere": "Sama salasana kaikkialla",
  "Unique passwords": "Eri salasana joka palvelussa",
  "Two-factor login on": "Kaksivaiheinen tunnistautuminen päällä",
  "accounts an attacker could open": "tiliä, jotka hyökkääjä voisi avata",
  "One leak opens only one door.": "Yksi vuoto avaa vain yhden oven.",
  "One leak spreads to your other accounts.": "Yksi vuoto leviää muille tileillesi.",
  "Lock it down": "Lukitse",
  "Contained the leak": "Vuoto rajattu",
  "Unique passwords and two-factor login keep one leak in one place.": "Eri salasanat ja kaksivaiheinen tunnistautuminen pitävät vuodon yhdessä paikassa.",
  "Nice work!": "Hienoa!",
  "Demo estimates.": "Demoarvioita. Ei oikean matkan turvallisuusarvio.",
  "A breached password can be tried on other accounts. Replace it everywhere it was reused and sign out old sessions.":
    "Vuotanutta salasanaa voidaan kokeilla muilla tileillä. Vaihda se kaikkialla, missä käytit sitä, ja sulje vanhat istunnot.",
  "Good decision — you have practised containing a breach before it spreads to other accounts.":
    "Hyvä valinta – harjoittelit tietovuodon rajaamista ennen sen leviämistä muille tileille.",
  "Unique passwords keep a leak in one account from unlocking the rest. A password manager helps you create and remember them.":
    "Yksilölliset salasanat rajaavat vuodon yhdelle tilille. Salasananhallinta auttaa luomaan ja muistamaan ne.",
  "Well done — unique passwords make your other accounts harder to reach.":
    "Hienoa – yksilölliset salasanat vaikeuttavat pääsyä muille tileillesi.",
  "Two-factor authentication adds a second check beyond your password. Keep backup codes somewhere safe in case you lose your phone.":
    "Kaksivaiheinen tunnistautuminen lisää salasanan rinnalle toisen varmennuksen. Säilytä varakoodit turvallisesti puhelimen katoamisen varalta.",
  "Great progress — you have added another barrier and prepared a way to recover access.":
    "Hienoa edistymistä – lisäsit suojan ja valmistauduit palauttamaan pääsyn tilillesi.",
  "Ice reduces grip, even on familiar roads. Check current conditions, allow more time and consider postponing a trip if no safe route is available.":
    "Jää vähentää pitoa tutuillakin teillä. Tarkista keli, varaa aikaa ja harkitse matkan siirtämistä, jos turvallista reittiä ei ole.",
  "Thoughtful choice — planning around conditions gives you more time and fewer rushed decisions.":
    "Harkittu valinta – kelin huomioiminen tuo aikaa ja vähentää kiireisiä päätöksiä.",
  "Darkness limits visibility and fatigue slows reactions. Plan breaks and stop somewhere safe if you feel tired.":
    "Pimeys heikentää näkyvyyttä ja väsymys hidastaa reaktioita. Suunnittele tauot ja pysähdy turvallisesti, jos väsyttää.",
  "Well done — recognising tiredness and planning breaks is a safer habit.":
    "Hienoa – väsymyksen tunnistaminen ja taukojen suunnittelu on turvallinen tapa.",
  "More following distance gives you time to react smoothly. Slow down early rather than relying on sudden braking.":
    "Pidempi turvaväli antaa aikaa reagoida rauhallisesti. Hidasta ajoissa äkkijarrutuksen sijaan.",
  "Good step — anticipating traffic helps make each journey calmer.":
    "Hyvä askel – liikenteen ennakointi rauhoittaa matkoja.",
  "Tread depth is only one part of tire safety: condition, pressure and the weather matter too. Ask a professional if you are unsure about grip.":
    "Urasyvyys on vain osa renkaan turvallisuutta: kunto, paine ja keli vaikuttavat myös. Kysy ammattilaiselta, jos olet epävarma pidosta.",
  "Good decision — checking your tires replaces uncertainty with a clearer picture.":
    "Hyvä valinta – renkaiden tarkistus korvaa epävarmuuden tiedolla.",
  "Regular servicing can catch worn brakes, lights and other issues before they disrupt a journey. Follow the vehicle's service schedule.":
    "Säännöllinen huolto voi havaita jarru-, valo- ja muut viat ajoissa. Noudata autosi huolto-ohjelmaa.",
  "Well done — planning maintenance now helps prevent surprises later.":
    "Hienoa – huollon suunnittelu auttaa ehkäisemään yllätyksiä.",
  "Good decision — you have taken a practical step toward a safer day.":
    "Hyvä valinta – otit käytännön askeleen kohti turvallisempaa päivää.",
  "Remind me at 19:00 — I'll change it when I'm home": "Muistuta klo 19 – vaihdan salasanan kotona",
  "Remind me tonight": "Muistuta tänä iltana",
  "Remind me this weekend": "Muistuta viikonloppuna",
  "Leave 20 min later, after the gritter passes":
    "Suunnittele lähtö 20 min myöhemmin hiekoituksen jälkeen",
  "Plan a break on my next night drive": "Suunnittele tauko seuraavalle yöajolle",
  "Remind me before my next drive": "Muistuta ennen seuraavaa ajoa",
  "Remind me on Saturday": "Muistuta lauantaina",
  "Remind me next week": "Muistuta ensi viikolla",
  "Remind me later today": "Muistuta myöhemmin tänään",
  "Cross-module synergy": "Moduulien yhteiset havainnot",
  "One signal, two protections": "Yksi havainto, kaksi suojaa",
  'Modules share only anonymous context signals (like "severe weather in region"), never personal data such as your location history or account details.':
    "Suunnittelutavoite: moduulit jakavat vain anonyymejä tilannetietoja, eivät sijaintihistoriaa tai tilitietoja.",
  "Severe winter weather": "Vaikea talvisää",
  "Raises driving risk and warns about fake 'roadside help' and delivery-delay phishing emails that spike in storms.":
    "Lisää ajamisen riskiä ja muistuttaa valheellisista tiepalvelu- ja toimitusviesteistä.",
  "New breach detected": "Uusi tietovuoto",
  "Vehicle module warns about fake parking and toll payment SMS that use leaked contact data.":
    "Autoilumoduuli muistuttaa vuotaneita yhteystietoja hyödyntävistä pysäköinti- ja tiemaksuhuijauksista.",
  "Service overdue": "Huolto myöhässä",
  "Cyber module flags fake 'car recall' emails asking you to log in.":
    "Digiturva muistuttaa valheellisista takaisinkutsuviesteistä, joissa pyydetään kirjautumaan.",
  "Active now": "Aktiivinen nyt",
  "Not active in this scenario": "Ei aktiivinen tässä demotilanteessa",
  "Habit & coaching engine": "Kannustava valmennus",
  "One supportive coach, no escalating warnings":
    "Yksi kannustava valmentaja, ei kovenevia varoituksia",
  'When Mila can\'t act right away, she picks a low-friction alternative ("Remind me at 19:00"). Plans earn a little progress, completed actions earn more, and both appear on her Learning Timeline. The tone never becomes firmer — ignored advice is never punished. Open items now:':
    "Kun Mila ei voi toimia heti, hän valitsee sopivamman hetken. Suunnitelmista kertyy hieman oppimista, tehdyistä harjoituksista enemmän. Molemmat näkyvät oppimisaikajanalla. Neuvojen sivuuttamisesta ei rangaista. Avoinna nyt:",
  "Service ecosystem": "Palveluverkosto",
  "Partners that finish the job": "Palvelut, jotka auttavat loppuun",
  "Auto repair shops": "Autokorjaamot",
  "Book tire change or service directly from a vehicle insight. IF-partner discount.":
    "Konseptiesimerkki: renkaiden vaihdon tai huollon suunnittelu. Ei vahvistettua IF-kumppanuutta tai alennusta.",
  "Tire hotels": "Rengashotellit",
  "Seasonal tire swap reminders tied to the first frost forecast.":
    "Konseptiesimerkki: kausirenkaiden vaihtomuistutus pakkasennusteen mukaan.",
  "Cyber education": "Digiturvakoulutus",
  "15-minute phishing and password courses after a breach is found.":
    "Konseptiesimerkki: lyhyt tietojenkalastelu- ja salasanakurssi tietovuodon jälkeen.",
  "Driving schools": "Autokoulut",
  "Winter and slippery-road training for drivers with high-risk patterns.":
    "Konseptiesimerkki: talvi- ja liukkaan kelin ajoharjoittelu.",
  "Partners are examples. Only the action the customer chooses is shared, with consent.":
    "Palvelut ovat konseptiesimerkkejä, eivät vahvistettuja IF-kumppaneita. Demo ei jaa tietoja palveluille.",
  "Customer segments": "Asiakasryhmät",
  "Same risks, different advice": "Samat riskit, erilaiset neuvot",
  "Young driver": "Nuori kuljettaja",
  "Short in-app nudges about social media scams and reused passwords.":
    "Lyhyitä muistutuksia somehuijauksista ja uudelleenkäytetyistä salasanoista.",
  "Night and speed coaching first; winter driving course suggested.":
    "Yöajo- ja nopeusvinkkejä sekä talviajoharjoittelua.",
  "Young driver kasko with telematics discount":
    "Konseptiesimerkki: nuoren kuljettajan autovakuutus. Ei vahvistettua ajotietoalennusta.",
  "Shared family 2FA checklist and child account protection.":
    "Perheen yhteinen tunnistautumisen tarkistuslista ja lasten tilien suojaus.",
  "School-run route alerts on icy mornings, child seat reminders.":
    "Koulureitin kelivaroituksia ja lastenistuinmuistutuksia.",
  "Family car + home bundle": "Konseptiesimerkki: perheen auto- ja kotiturva.",
  Senior: "Ikääntynyt",
  "Phone-call scam warnings in plain language, larger text, call-back from IF.":
    "Selkeitä puhelinhuijausvaroituksia, suurempi teksti ja yhteys IF:n asiakaspalveluun.",
  "Daylight route planning and annual service reminders.":
    "Reittien suunnittelua päivänvalossa ja huoltomuistutuksia.",
  "Roadside assistance with personal help line": "IF:n tiepalvelu ja asiakaspalvelun yhteystiedot.",
  "Tech-savvy": "Tekniikkaan perehtynyt",
  "Detailed breach data, passkey setup, security key support.":
    "Tarkempia tietovuototietoja sekä pääsyavain- ja turva-avainohjeita.",
  "Full telematics dashboard and EV charging route risk.":
    "Konseptiesimerkki: ajotiedot ja sähköauton latausreitin suunnittelu.",
  "Identity protection with advanced monitoring":
    "IF:n ohjeet identiteettivarkauteen. Ei vahvistettua seurantapalvelua.",
  "Suggested IF offer": "Esimerkkiehdotus – ei vahvistettu tuote",
  "Life event simulation": "Elämäntilanteen harjoitus",
  "Unexpected Life Disruption Morning": "Yllättävien tilanteiden aamu",
  "Four risks arrive at once. IF Compass doesn't sell — it helps Mila decide what matters now, and what can wait.":
    "Neljä riskiä saapuu yhtä aikaa. IF Compass auttaa valitsemaan, mikä on tärkeää nyt ja mikä voi odottaa.",
  "What's happening": "Mitä tapahtuu",
  "How Mila feels": "Miltä Milasta tuntuu",
  "Stress level": "Stressitaso",
  "IF Compass says": "IF Compass sanoo",
  "Mila's calm plan so far": "Milan rauhallinen suunnitelma",
  Back: "Takaisin",
  "Next moment": "Seuraava hetki",
  "Human-centered: one prioritised decision instead of four alarms. No insurance offers during the stressful moment.":
    "Yksi tärkeä päätös neljän hälytyksen sijaan. Ei vakuutusehdotuksia stressaavalla hetkellä.",
  "IF by your side": "IF rinnallasi",
  "Quiet support when you need it": "Apua silloin, kun tarvitset",
  "Car won't start in the cold": "Auto ei käynnisty pakkasessa",
  "Someone used my identity": "Henkilötietojani käytettiin väärin",
  "I slid into a ditch": "Suistuin ojaan",
  "No pop-up offers. Help appears only after you ask or act.":
    "Ei tarjouksia. Apua, kun pyydät sitä.",
  "What makes it new": "Mikä tässä on uutta",
  "Innovation & experience": "Uudistuminen ja käyttökokemus",
  "Proactive prevention": "Ennakoiva ennaltaehkäisy",
  "Warns before the risk happens, not after the claim.":
    "Tavoite: auttaa ennen vahinkoa, ei vasta vahinkoilmoituksen jälkeen.",
  "Human storytelling": "Ihmisläheiset tilanteet",
  "Speaks to real moments: school runs, scams, winter mornings.":
    "Tuttuja tilanteita: koulumatkat, huijaukset ja talviaamut.",
  "Open data": "Avoin data",
  "FMI, Digitraffic and HIBP turn public data into personal safety.":
    "Konsepti: FMI:n, Digitrafficin ja HIBP:n tiedot turvallisuuden tueksi. Demossa kaikki tiedot simuloidaan.",
  Modular: "Modulaarisuus",
  "New modules like home or travel plug in the same way.":
    "Kodin ja matkojen moduulit voidaan suunnitella yhteiseen rakenteeseen.",
  "CEO investment review": "Toimitusjohtajan sijoitusarvio",
  "Would I fund this? Yes — as a pilot.": "Rahoittaisinko tämän? Kyllä – pilottina.",
  "Engagement fades after week two": "Käyttö hiipuu kahden viikon jälkeen",
  "Short 5-second choices, streak-free progress and only one alert at a time keep it light. KPI: 30-day active rate.":
    "Lyhyet valinnat, oppiminen ilman suoritusputkia ja yksi päätös kerrallaan. Mittari: aktiivisuus 30 päivässä.",
  "Addressed in demo": "Käsitelty demossa",
  "Unclear money story — cross-sell looks small":
    "Epäselvä ansaintalogiikka – lisämyynti jää pieneksi",
  "Lead with avoided claims (loss prevention); add-ons only appear after a customer action.":
    "Ensisijainen arvo on vahinkojen ehkäisy. Vapaaehtoiset ehdotukset vasta harjoituksen jälkeen.",
  "Liability if advice is wrong or late": "Vastuu väärästä tai myöhäisestä neuvosta",
  "Advice is always framed as guidance, shows its data source, and falls back safely when feeds fail.":
    "Demoneuvot merkitään harjoitteluksi ja lähteet näytetään. Tuotannon turvalliset häiriötilanteet ja vastuut on vielä validoitava.",
  "Accessibility and EU Accessibility Act (2025)":
    "Saavutettavuus ja EU:n esteettömyyssäädös (2025)",
  "Screen-reader labels, live announcements, icons beside colours, big touch targets, calm focus mode.":
    "Näytönlukijatunnisteet, ilmoitukset, värien rinnalla kuvakkeet, suuret painikkeet ja rauhallinen oletusnäkymä. Testaus oikeilla käyttäjillä vielä tarpeen.",
  "Integration cost with IF core systems": "IF:n järjestelmiin liittämisen kustannukset",
  "Pilot reads only open data plus opt-in telematics; claims and CRM links via existing APIs.":
    "Pilottisuunnitelma: avoin data ja vapaaehtoiset ajotiedot. Vahinko- ja asiakkuusliitännät vaativat IF:n arvion; demossa niitä ei ole.",
  "Needs IF IT estimate": "Tarvitsee IF:n IT-arvion",
  "No proof the numbers are real": "Luvuille ei vielä ole näyttöä",
  "Run a 3-month pilot with ~1,000 Tampere car customers; measure claim frequency against a control group.":
    "Kolmen kuukauden pilotti noin 1 000 Tampereen autoasiakkaalla. Vahinkotiheyden vertailu vertailuryhmään.",
  "Needs pilot": "Tarvitsee pilotin",
  "AI Act / GDPR review": "Tekoälysäädös ja GDPR",
  "No sensitive profiling, opt-in per data source; formal DPIA and AI Act classification still required.":
    "Ei arkaluonteista profilointia. Tietolähdekohtainen suostumus; vaikutustenarviointi ja tekoälysäädöksen luokittelu vielä tehtävä.",
  "Needs legal review": "Tarvitsee oikeudellisen arvion",
  "Ask: a 3-month Tampere pilot. Go/no-go metric: measurable drop in winter claim frequency.":
    "Ehdotus: kolmen kuukauden pilotti Tampereella. Jatkopäätös: mitattava talvivahinkotiheyden väheneminen.",
  "Sudden snowfall: 8 cm overnight, more coming until 09:00.":
    "Demossa: yöllä satoi 8 cm lunta, lisää klo 9 asti.",
  "Mila checks the window. Two kids, a 08:00 school start and a 09:00 meeting.":
    "Mila katsoo ikkunasta. Kaksi lasta, koulu klo 8 ja kokous klo 9.",
  '"Heavy snow this morning. You have time — let\'s plan it together."':
    "”Runsaasti lunta tänä aamuna. Suunnitellaan rauhassa yhdessä.”",
  "Road surface icy on Hervannan valtaväylä. Speeds down 35 %.":
    "Demossa: Hervannan valtaväylä on jäinen. Nopeudet laskeneet 35 %.",
  "Time pressure rises. Should she still drive?": "Kiire kasvaa. Kannattaako silti ajaa?",
  '"Your usual route is icy. Insinöörinkatu is calmer. Leaving at 07:15 adds 10 minutes but avoids the worst stretch."':
    "”Demoreittisi on jäinen. Insinöörinkatu on rauhallisempi vaihtoehto. Tarkista oikea keli ennen lähtöä.”",
  Telematics: "Ajotiedot",
  "Front tire tread estimated 3.2 mm, low for these conditions.":
    "Demossa: eturenkaan urasyvyysarvio 3,2 mm on matala tähän keliin.",
  "Uncertainty: is the car even safe for the kids today?":
    "Epävarmuus: onko auto turvallinen lapsille tänään?",
  '"Your tires are OK for a slow city drive today, not for the highway. Keep distance. A tire check can wait until Saturday."':
    "”Pelkkä urasyvyys ei kerro renkaiden turvallisuutta. Tarkista keli ja renkaiden kunto. Jos epäilet pitoa, älä aja; kysy ammattilaiselta.”",
  "Mila's email found in a new data breach.":
    "Milan sähköposti löytyi uudesta tietovuodosta demossa.",
  "One more worry, in the worst possible moment.": "Yksi huoli lisää pahimpaan hetkeen.",
  '"This can wait until tonight. Nothing urgent is happening to your accounts. We\'ll remind you at 19:00 — it takes 3 minutes."':
    "”Emme voi päätellä, ovatko oikeat tilisi turvassa. Jos epäilet väärinkäyttöä, toimi heti. Muussa tapauksessa voit suunnitella salasanan vaihdon rauhalliseen hetkeen.”",
  "One calm plan: leave 07:15, calm route, drive slow, password tonight.":
    "Demossa: yksi suunnitelma – tarkista keli, harkitse reittiä ja suunnittele tilien suojaus.",
  "Four risks, one clear decision. Mila leaves with the kids, calm.":
    "Neljä riskiä, yksi selkeä suunnitelma. Mila arvioi turvallisen vaihtoehdon rauhassa.",
  "\"You've got this. Drive safe — we'll be here if you need anything.\"":
    "”Hyvin suunniteltu. Valitse turvallinen tapa matkustaa – apua on saatavilla.”",
};

export function tr(text: string | undefined, lang: Lang): string {
  if (text === undefined) return "";
  if (lang === "en") return text;
  if (cardTranslations[text]) return cardTranslations[text];
  for (const [source, translated] of Object.entries(cardTranslations)) {
    if (!source.includes("{0}")) continue;
    const pattern = source
      .split(/(\{\d+\})/)
      .map((part) =>
        /^\{\d+\}$/.test(part) ? "(.*?)" : part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      )
      .join("");
    const match = text.match(new RegExp("^" + pattern + "$"));
    if (match)
      return translated.replace(/\{(\d+)\}/g, (_, n) => tr(match[Number(n) + 1] ?? "", lang));
  }
  return text;
}
