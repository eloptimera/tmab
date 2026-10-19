import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  FileCheck,
  Gauge,
  LayoutTemplate,
  MessageSquareText,
  Palette,
  Puzzle,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark, PageHero } from "@/components/Heading";
import { SjalvMotOss } from "@/components/LyckasDigitalt";
import { ProjektLista } from "@/components/Projekt";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { HEMSIDA_FORETAG, HEMSIDA_FRAGOR } from "@/lib/hemsida-foretag";
import { AGANDE_TEXT, kr, MOMS_TEXT, PRIS } from "@/lib/priser";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

const SIDA = HEMSIDA_FORETAG.sokvag;
const TJANST = "hemsida";

export const Route = createFileRoute("/hemsida-foretag")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: HEMSIDA_FORETAG.seoTitel,
      beskrivning: HEMSIDA_FORETAG.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t ? [tjanstSchema(t)] : []),
        faqSchema(HEMSIDA_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
          { namn: HEMSIDA_FORETAG.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: HemsidaForetag,
});

const FORDELAR_HERO = [
  "Anpassad efter ert företag",
  "Mobilanpassad och SEO-vänlig",
  "Personlig kontakt genom hela projektet",
] as const;

const GOR_MER: readonly Kort[] = [
  {
    titel: "Förtroende från första sekunden",
    text: "En genomtänkt design som får företaget att se lika seriöst ut som det är.",
    ikon: ShieldCheck,
  },
  {
    titel: "Fungerar på alla skärmar",
    text: "Responsiv webbdesign som är lika lätt att använda på mobilen som på datorn.",
    ikon: Smartphone,
  },
  {
    titel: "Teknisk SEO från start",
    text: "Struktur, rubriker och metadata som gör att Google förstår vad ni erbjuder.",
    ikon: Search,
  },
  {
    titel: "Tydliga vägar till kontakt",
    text: "Kontaktformulär och offertförfrågningar där besökaren faktiskt letar efter dem.",
    ikon: MessageSquareText,
  },
];

const MALGRUPPER: readonly { titel: string; text: string }[] = [
  {
    titel: "Hantverkare och byggföretag",
    text: "Visa vilka jobb ni tar och var ni arbetar, och gör det enkelt att begära offert.",
  },
  {
    titel: "Skönhetssalonger",
    text: "Behandlingar, priser och en tydlig väg till bokning – i ett utseende som matchar salongen.",
  },
  {
    titel: "Konsulter",
    text: "Gör det tydligt vad ni hjälper till med och varför kunden ska välja just er.",
  },
  {
    titel: "Städföretag",
    text: "Tjänster, område och pris i klartext, så att kunden kan jämföra och höra av sig direkt.",
  },
  {
    titel: "Restauranger och caféer",
    text: "Meny, öppettider och bordsbokning som går att hitta snabbt på mobilen.",
  },
  {
    titel: "Andra lokala tjänsteföretag",
    text: "Syns när kunder i ert område söker, och ger dem en anledning att välja er.",
  },
];

const INGAR: readonly (Kort & { lank?: { till: string; text: string } })[] = [
  {
    titel: "Design anpassad efter ert varumärke",
    text: "En enhetlig och professionell design som speglar företagets identitet – med text och bilder som säljer.",
    ikon: Palette,
  },
  {
    titel: "Mobilanpassad webbplats",
    text: "Hemsidan byggs för och testas på mobiltelefoner, surfplattor och datorer.",
    ikon: Smartphone,
  },
  {
    titel: "Grundläggande SEO",
    text: "Sidstruktur, rubriker, sidtitlar, beskrivningar och sitemap – så att sökmotorer kan förstå och visa sidorna.",
    ikon: Search,
    lank: { till: tjanstSokvag("seo"), text: "Löpande SEO" },
  },
  {
    titel: "Kontaktformulär och tydliga kontaktvägar",
    text: "Besökare ska kunna kontakta er och skicka förfrågningar utan att leta.",
    ikon: MessageSquareText,
  },
  {
    titel: "Snabb och användarvänlig",
    text: "Tydlig sidstruktur, relevant innehåll och kort laddningstid, även på mobilnät.",
    ikon: Gauge,
  },
  {
    titel: "Möjlighet att bygga vidare",
    text: "Hemsidan kan utvecklas när verksamheten växer – med nya sidor, funktioner eller löpande förbättringar.",
    ikon: Puzzle,
    lank: { till: "/priser", text: "Månadspaket" },
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "20–25 minuter där vi går igenom företaget, era kunder och vad hemsidan ska uppnå. Efteråt får ni ett förslag med upplägg och pris.",
  },
  {
    titel: "Underlag att godkänna",
    text: "Kravunderlag, användarflöde, designbrief och tidplan – så att ni ser svart på vitt vad vi bygger innan vi börjar.",
  },
  {
    titel: "Design och bygge",
    text: "Vi designar, skriver och bygger efter tidplanen och testar på olika skärmar. En ändringsrunda ingår innan lansering.",
  },
  {
    titel: "Lansering och vidare",
    text: "Vi publicerar hemsidan enligt överenskommelse. Vill ni fortsätta utveckla den finns hemsideförbättringar och SEO i månadspaketen.",
  },
];

const PRISFAKTORER = [
  "Hur många sidor som behövs",
  "Vilken design ni önskar",
  "Om vi tar fram texter och bilder",
  "Vilka funktioner hemsidan ska ha",
] as const;

const VARFOR: readonly Kort[] = [
  {
    titel: "Personlig dialog",
    text: "Ni har en kontaktperson genom hela projektet och får svar inom en arbetsdag.",
    ikon: MessageSquareText,
  },
  {
    titel: "Byggd för att ge affärer",
    text: "Vi utgår från vad besökaren ska göra på sajten – inte bara från hur den ser ut.",
    ikon: LayoutTemplate,
  },
  {
    titel: "Hemsida, SEO och marknadsföring på ett ställe",
    text: "När sajten är klar kan vi fortsätta med SEO, AI-synlighet, bilder och annonser.",
    ikon: Search,
  },
];

function HemsidaForetag() {
  const hemsida = hittaTjanst(TJANST);

  return (
    <>
      <PageHero
        eyebrow={`Tjänster · ${HEMSIDA_FORETAG.titel}`}
        title={
          <Markerad
            text="Hemsida till företag – vi bygger er nästa företagshemsida"
            markera="nästa företagshemsida"
          />
        }
        intro={`En professionell hemsida gör det enklare för kunderna att hitta er, förstå vad ni erbjuder och ta kontakt. ${FORETAG.kortnamn} bygger moderna, snabba och mobilanpassade hemsidor där design och affärsmål går hand i hand – oavsett om företaget är etablerat eller precis har startat.`}
      >
        <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")} />
        <a href="#projekt" className="btn-base btn-outline">
          Se tidigare projekt
        </a>
      </PageHero>

      {/* Tre fördelar och pris direkt under rubriken */}
      <section aria-label="Kort om tjänsten" className="container-page pt-8 sm:pt-10">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {FORDELAR_HERO.map((f) => (
            <li key={f} className="flex items-center gap-3 font-bold text-ink">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
          <li className="flex items-center gap-3 font-bold text-ink">
            <span className="rounded-full bg-sun px-3 py-1 text-sm">
              Från {kr(PRIS.hemsida)} exkl. moms
            </span>
          </li>
        </ul>
      </section>

      {/* 2. En hemsida som arbetar för företaget */}
      <section aria-labelledby="gor-mer" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Mer än en snygg yta</p>
            <h2 id="gor-mer" className="mt-4 text-4xl sm:text-5xl">
              En professionell hemsida som <Mark>gör mer</Mark> än att bara se bra ut
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Hemsidan är ofta det första mötet mellan ert företag och en ny kund. En genomtänkt
              företagshemsida ska därför inte bara presentera verksamheten – den ska hjälpa
              besökaren att ta nästa steg.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Därför bygger vi med tydlig navigering, relevant innehåll, snabb laddningstid och
              genomtänkta kontaktvägar. Det ska gå fort att förstå vad ni erbjuder, varför kunden
              ska välja er och hur man hör av sig. Tillsammans med en grund i sökmotoroptimering
              blir det en stabil bas för hela er digitala närvaro.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GOR_MER.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Småföretag och nystartade */}
      <section aria-labelledby="smaforetag" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">För vem</p>
            <h2 id="smaforetag" className="mt-4 max-w-4xl text-4xl sm:text-5xl">
              Hemsidor för småföretag, <Mark>nystartade företag</Mark> och växande verksamheter
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={60}>
              <p className="text-lg leading-relaxed text-ink/80">
                Att skapa en hemsida till ett småföretag behöver inte vara ett stort eller dyrt
                projekt. För ett nystartat företag är hemsidan ofta första steget för att presentera
                tjänsterna, skapa trovärdighet och bli lättare att hitta.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-ink/80">
                För ett mer etablerat företag kan en ny webbplats modernisera varumärket, förbättra
                kundupplevelsen och ge fler förfrågningar. Vi anpassar struktur, innehåll och
                funktioner efter verksamheten – alla företag behöver inte samma lösning.
              </p>
            </Reveal>
          </div>

          <Reveal delay={80} className="mt-12">
            <h3 className="text-2xl sm:text-3xl">Några verksamheter vi kan hjälpa</h3>
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MALGRUPPER.map((m, i) => (
              <li key={m.titel}>
                <Reveal delay={i * 50} className="h-full">
                  <div className="h-full rounded-[1.5rem] bg-white/80 p-6">
                    <h4 className="font-sans text-lg font-bold tracking-normal text-ink">
                      {m.titel}
                    </h4>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{m.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Vad ingår */}
      <section aria-labelledby="ingar" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Det här ingår</p>
          <h2 id="ingar" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Vad ingår när {FORETAG.kortnamn} bygger <Mark>er hemsida</Mark>?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Vi utgår från verksamhetens mål, målgrupp och önskemål, och tar fram en lösning där
            design, funktion och användarvänlighet fungerar tillsammans.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INGAR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k}>
                  {k.lank && (
                    <Link
                      to={k.lank.till}
                      className="mt-5 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
                    >
                      {k.lank.text}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                </KortVy>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={80}>
          <p className="mt-8 flex max-w-3xl gap-3 text-lg leading-relaxed text-ink/80">
            <FileCheck className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
            {AGANDE_TEXT} Domän och konton registreras i ert namn.
          </p>
        </Reveal>
      </section>

      {/* 5. Så går det till */}
      <section aria-labelledby="process" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Så går det till</p>
            <h2 id="process" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Så hjälper vi er att skapa en hemsida till <Mark>ert företag</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={STEG} rad />
          </Reveal>
          <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")}>
              Diskutera er nya hemsida
            </BokaKnapp>
            <span className="text-muted-foreground">Ni godkänner allt innan vi bygger.</span>
          </Reveal>
        </div>
      </section>

      {/* 6. Portfolio */}
      <section
        id="projekt"
        aria-labelledby="projekt-rubrik"
        className="container-page scroll-mt-28 py-14 sm:py-20"
      >
        <Reveal>
          <p className="eyebrow">Projekt</p>
          <h2 id="projekt-rubrik" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Se exempel på hemsidor och <Mark>digitala projekt</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Varje företag har olika behov, så vi utgår från verksamhetens mål när vi planerar
            design, innehåll och funktioner. Här är några av våra tidigare projekt.
          </p>
        </Reveal>
        <ProjektLista className="mt-10" />
      </section>

      {/* 7. Pris */}
      <section aria-labelledby="pris-rubrik" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Pris</p>
            <h2 id="pris-rubrik" className="mt-4 text-4xl sm:text-5xl">
              Vad kostar en <Mark>hemsida till företag</Mark>?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Priset beror på hur stor och avancerad hemsidan ska vara. En enklare företagshemsida
              med information om verksamheten och kontaktmöjligheter är ett annat projekt än en
              webbplats med flera tjänstesidor och specialanpassade funktioner. Det som påverkar
              mest:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {PRISFAKTORER.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-ink">
                  <Check className="size-5 shrink-0 text-brand" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Vi börjar med att förstå vad ert företag faktiskt behöver och skickar sedan ett
              tydligt förslag med upplägg och pris. Ni vet vad som ingår innan något arbete
              påbörjas.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div id="pris" className="scroll-mt-28 rounded-[2rem] bg-ink p-8 text-white sm:p-10">
              <p className="caps text-sun">Ny hemsida</p>
              <p className="mt-5 font-display text-5xl leading-none sm:text-6xl">
                <span className="text-3xl sm:text-4xl">från </span>
                {kr(PRIS.hemsida)}
              </p>
              <p className="mt-3 text-sm text-white/70">
                {MOMS_TEXT} Första genomgången och förslaget är gratis.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BokaKnapp variant="white" tjanst={TJANST} onClick={() => bokaKlick(SIDA, "pris")}>
                  Få en kostnadsfri offert
                </BokaKnapp>
                <Link to="/priser" className="btn-base btn-outline-white">
                  Alla priser
                </Link>
              </div>
              <div className="mt-10 border-t border-white/15 pt-8">
                <p className="font-bold">Har ni redan en hemsida?</p>
                <p className="mt-2 leading-relaxed text-white/80">
                  Ofta räcker det att modernisera den ni har. En uppfräschning kostar från{" "}
                  {kr(PRIS.uppfraschning)}.
                </p>
                <Link
                  to={tjanstSokvag("hemsideoptimering")}
                  className="mt-4 inline-flex items-center gap-2 font-bold text-white underline decoration-sun decoration-2 underline-offset-4"
                >
                  Förbättra befintlig hemsida
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Varför TAB */}
      <section aria-labelledby="varfor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Varför välja {FORETAG.kortnamn} när ni behöver en <Mark>ny hemsida</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              En bra hemsida ska vara enkel att använda, representera företaget professionellt och
              göra det lättare för kunder att höra av sig. Därför tittar vi inte bara på hur sajten
              ser ut, utan på hur den fungerar i praktiken.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vi kombinerar webbdesign med{" "}
              <Link
                to={tjanstSokvag("seo")}
                className="font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
              >
                SEO
              </Link>
              ,{" "}
              <Link
                to={tjanstSokvag("geo")}
                className="font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
              >
                synlighet i AI-assistenter
              </Link>{" "}
              och digital marknadsföring. Det gör att ni kan tänka långsiktigt kring er digitala
              närvaro, även om första steget bara är en ny hemsida.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {VARFOR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
        {hemsida && (
          <Reveal delay={80} className="mt-14">
            <h3 className="max-w-3xl text-3xl sm:text-4xl">
              Det här krävs för en ny hemsida – <Mark>vi gör det åt er</Mark>
            </h3>
            <div className="mt-8">
              <SjalvMotOss o={hemsida} />
            </div>
          </Reveal>
        )}
      </section>

      {/* 9. Vanliga frågor */}
      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Vanliga frågor om <Mark>hemsidor till företag</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={HEMSIDA_FRAGOR} />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Avslutning */}
      <div className="pt-14 sm:pt-20">
        <BokaPanel
          tjanst={TJANST}
          onBoka={() => bokaKlick(SIDA, "avslutning")}
          rubrik={
            <>
              Redo att skapa en professionell hemsida till <Mark>ert företag</Mark>?
            </>
          }
          text="Oavsett om ni bygger er första hemsida eller vill ersätta en gammal: berätta kort om företaget, så går vi igenom hur en ny hemsida kan se ut utifrån era mål. Genomgången är gratis och ni förbinder er inte till något."
        />
      </div>
    </>
  );
}
