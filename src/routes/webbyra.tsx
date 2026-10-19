import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  FileCheck,
  Gauge,
  Handshake,
  LayoutTemplate,
  ListTree,
  MessageSquareText,
  MousePointerClick,
  Palette,
  RefreshCw,
  Search,
  Smartphone,
  Sprout,
} from "lucide-react";
import { Blob } from "@/components/Brand";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { FramtidaLank } from "@/components/FramtidaLank";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { Skarmbild } from "@/components/Skarmbild";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { AGANDE_TEXT, kr, MOMS_TEXT, PRIS } from "@/lib/priser";
import { PROJEKT } from "@/lib/projekt";
import { SEO_BYRA } from "@/lib/seo-byra";
import { SEO_SMAFORETAG } from "@/lib/seo-smaforetag";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick, projektKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";
import { WEBBYRA, WEBBYRA_FRAGOR } from "@/lib/webbyra";

const SIDA = WEBBYRA.sokvag;
const TJANST = "hemsida";

export const Route = createFileRoute("/webbyra")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: WEBBYRA.seoTitel,
      beskrivning: WEBBYRA.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: "Webbdesign och webbutveckling",
                beskrivning: WEBBYRA.seoBeskrivning,
                sokvag: SIDA,
              }),
            ]
          : []),
        faqSchema(WEBBYRA_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: WEBBYRA.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: Webbyra,
});

const LANK =
  "font-bold text-ink underline decoration-sun decoration-2 underline-offset-4 hover:decoration-ink";

/** Projekten med riktiga skärmbilder – de andra visas inte på webbyråsidan. */
const MED_SKARMBILD = PROJEKT.filter((p) => p.skarmbild);
const HERO_PROJEKT = MED_SKARMBILD.find((p) => p.namn === "Martinssons") ?? MED_SKARMBILD[0];

const FORDELAR_HERO = [
  "Webbdesign anpassad efter ert företag",
  "Användarvänlig och synlig på Google",
  "En partner även efter lansering",
] as const;

const VAD_VI_GOR: readonly Kort[] = [
  {
    titel: "Professionell design",
    text: "Ett utseende som representerar verksamheten och känns igen i alla kanaler.",
    ikon: Palette,
  },
  {
    titel: "Användarvänlighet",
    text: "Besökaren hittar rätt information utan att leta.",
    ikon: MousePointerClick,
  },
  {
    titel: "Teknisk kvalitet",
    text: "Mobilanpassad, snabb och byggd så att Google kan läsa den.",
    ikon: Gauge,
  },
  {
    titel: "Affärsfokus",
    text: "Kontaktvägar och funktioner som gör det lätt att ta nästa steg.",
    ikon: MessageSquareText,
  },
];

type Tjanstkort = Kort & { lank?: { till: string; text: string } };

const TJANSTER: readonly Tjanstkort[] = [
  {
    titel: "Webbdesign",
    text: "Layout, färger, typsnitt och informationsstruktur som tillsammans ger ett professionellt helhetsintryck och speglar ert varumärke.",
    ikon: Palette,
  },
  {
    titel: "Webbutveckling",
    text: "Vi bygger sajten och funktionerna den behöver – tjänstesidor, formulär, bokning – med modern teknik som laddar snabbt.",
    ikon: Code2,
  },
  {
    titel: "Nya företagshemsidor",
    text: "Från planering och design till text, bygge och publicering, med tydliga vägar till kontakt.",
    ikon: LayoutTemplate,
    lank: { till: tjanstSokvag("hemsida"), text: "Hemsida till företag" },
  },
  {
    titel: "Modernisering",
    text: "Har ni en äldre sajt förbättrar vi design, struktur, mobilanpassning och hastighet utifrån det som redan finns.",
    ikon: RefreshCw,
    lank: { till: tjanstSokvag("hemsideoptimering"), text: "Modernisera hemsida" },
  },
  {
    titel: "SEO",
    text: "Sidstruktur, metadata, teknisk SEO och innehåll – så att sajten inte bara ser bra ut utan också hittas på Google.",
    ikon: Search,
    lank: { till: SEO_BYRA.sokvag, text: "SEO och sökmotoroptimering" },
  },
  {
    titel: "GEO och AI-synlighet",
    text: "Tydligt innehåll och strukturerad data som gör det lättare för ChatGPT och andra AI-tjänster att förstå och nämna er.",
    ikon: Bot,
    lank: { till: tjanstSokvag("geo"), text: "GEO-optimering" },
  },
];

const SMAFORETAG_FORDELAR = [
  "Lösningar efter vad ni faktiskt behöver",
  "Tydlig kommunikation genom hela projektet",
  "En sajt som kan växa med företaget",
] as const;

const ANVANDARVANLIGHET: readonly Kort[] = [
  {
    titel: "Responsiv design",
    text: "Sajten anpassar sig till mobil, surfplatta och dator.",
    ikon: Smartphone,
  },
  {
    titel: "Tydlig navigering",
    text: "Besökaren hittar det viktigaste på några sekunder.",
    ikon: ListTree,
  },
  {
    titel: "Kontakt- och offertformulär",
    text: "Enkelt att skicka frågor och förfrågningar – där besökaren letar.",
    ikon: MessageSquareText,
  },
  {
    titel: "Genomtänkt sidstruktur",
    text: "Innehållet ordnat efter kundens frågor, inte efter organisationsschemat.",
    ikon: LayoutTemplate,
  },
];

const FLODE: readonly { titel: string; till?: string }[] = [
  { titel: "Webbdesign" },
  { titel: "Webbutveckling" },
  { titel: "SEO", till: SEO_BYRA.sokvag },
  { titel: "GEO", till: tjanstSokvag("geo") },
  { titel: "Vidareutveckling", till: "/priser" },
];

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "Vi pratar om företaget, målen och vad sajten ska göra. Ni får ett förslag med upplägg och pris.",
  },
  {
    titel: "Struktur och planering",
    text: "Kravunderlag, användarflöde och designbrief – innehåll, funktioner och sidor bestäms innan vi designar.",
  },
  {
    titel: "Design och utveckling",
    text: "Vi designar och bygger efter en tidplan ni godkänt, och testar på olika skärmar.",
  },
  {
    titel: "Granskning och lansering",
    text: "Vi går igenom sajten tillsammans. En ändringsrunda ingår innan vi publicerar.",
  },
  {
    titel: "Vidareutveckling",
    text: "Efter lansering kan vi fortsätta med uppdateringar, SEO och nya sidor – när ni behöver.",
  },
];

const PRISFAKTORER = [
  "Antal sidor och funktioner",
  "Om texter och bilder redan finns",
  "Om en gammal sajt ska flyttas",
  "Om SEO eller annat ska ingå",
] as const;

const VARFOR: readonly Kort[] = [
  {
    titel: "Personlig kontakt",
    text: "En kontaktperson genom hela projektet och svar inom en arbetsdag.",
    ikon: Handshake,
  },
  {
    titel: "Allt på papper",
    text: "Kravunderlag, designbrief och tidplan att godkänna innan vi bygger.",
    ikon: FileCheck,
  },
  {
    titel: "Helhetsperspektiv",
    text: "Webbdesign, SEO, AI-synlighet och bilder från samma byrå.",
    ikon: Search,
  },
  {
    titel: "Långsiktighet",
    text: "Sajten kan byggas vidare när verksamheten förändras – och den är er.",
    ikon: Sprout,
  },
];

function Webbyra() {
  return (
    <>
      {/* Hero med en riktig skärmbild */}
      <section className="relative isolate overflow-hidden">
        <Blob className="absolute top-1/3 -right-40 -z-10 hidden w-[34rem] opacity-60 lg:block" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 border-b border-ink/70"
        />
        <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow">{WEBBYRA.titel}</p>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,5.6vw,4.75rem)] leading-[1.03]">
              <Markerad
                text="Webbyrå för företag – modern webbdesign och webbutveckling"
                markera="webbdesign och webbutveckling"
              />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80">
              Letar ni efter en webbyrå som kan ge företaget en professionell sajt som fungerar?{" "}
              {FORETAG.kortnamn} kombinerar webbdesign, webbutveckling och digital marknadsföring.
              Vi bygger nya hemsidor, förbättrar befintliga och gör det lättare för era kunder att
              hitta information, förstå erbjudandet och höra av sig.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")} />
              <a href="#projekt" className="btn-base btn-outline">
                Se våra projekt
              </a>
            </div>
          </div>
          {HERO_PROJEKT?.skarmbild && (
            <figure>
              <Skarmbild
                dator={HERO_PROJEKT.skarmbild.dator}
                mobil={HERO_PROJEKT.skarmbild.mobil}
                doman={HERO_PROJEKT.doman}
                alt={`Startsidan för ${HERO_PROJEKT.namn}`}
                prioriterad
              />
              <figcaption className="mt-4 text-sm text-muted-foreground">
                {HERO_PROJEKT.namn} – ett av våra projekt
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <section aria-label="Kort om oss" className="container-page pt-8 sm:pt-10">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {FORDELAR_HERO.map((f) => (
            <li key={f} className="flex items-center gap-3 font-bold text-ink">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* Vad gör en webbyrå */}
      <section aria-labelledby="vad" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Vad vi gör</p>
            <h2 id="vad" className="mt-4 text-4xl sm:text-5xl">
              Vad gör en webbyrå – och hur kan vi hjälpa <Mark>ert företag</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              En webbyrå planerar, designar, bygger och förbättrar webbplatser – en helt ny
              företagshemsida, en modernisering av den gamla eller funktioner som gör det lättare
              för kunder att ta kontakt.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Men en bra webbyrå jobbar inte bara med utseendet. Struktur, användarvänlighet, teknik
              och innehåll avgör hur väl sajten fungerar. Därför ser vi hemsidan som en del av hela
              er digitala närvaro och kombinerar webbdesign med SEO och marknadsföring.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VAD_VI_GOR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Tjänster */}
      <section aria-labelledby="tjanster-rubrik" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Tjänster</p>
            <h2 id="tjanster-rubrik" className="mt-4 max-w-4xl text-4xl sm:text-5xl">
              Våra webbyråtjänster – från idé till <Mark>färdig webbplats</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Behöver ni en ny hemsida, vill förbättra den ni har eller söker hjälp att utveckla
              sajten långsiktigt? Vi anpassar arbetet efter var ni står.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TJANSTER.map((k, i) => (
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
          <Reveal delay={80} className="mt-10">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "tjanster")}>
              Diskutera ert webbprojekt
            </BokaKnapp>
          </Reveal>
        </div>
      </section>

      {/* Småföretag */}
      <section aria-labelledby="smaforetag" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">För vem</p>
            <h2 id="smaforetag" className="mt-4 text-4xl sm:text-5xl">
              En webbyrå för småföretag och <Mark>växande verksamheter</Mark>
            </h2>
            <ul className="mt-8 space-y-3">
              {SMAFORETAG_FORDELAR.map((f) => (
                <li key={f} className="flex items-center gap-3 font-bold text-ink">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Att anlita en webbyrå ska inte vara krångligt. För de flesta småföretag är det
              viktigaste en professionell hemsida som visar vad ni gör och gör det lätt för kunder
              att höra av sig.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Det kan vara ett nystartat konsultbolag som behöver synas, ett hantverksföretag som
              vill ha fler offertförfrågningar eller en lokal verksamhet med en hemsida som börjat
              bli gammal. Vi utgår från vad ni behöver i praktiken – och när sajten är klar kan vi
              hjälpa er vidare med{" "}
              <Link to={SEO_SMAFORETAG.sokvag} className={LANK}>
                SEO för småföretag
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Användarvänlighet */}
      <section aria-labelledby="ux" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Webbdesign</p>
            <h2 id="ux" className="mt-4 text-4xl sm:text-5xl">
              Professionell webbdesign med fokus på <Mark>användarvänlighet</Mark>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              En bra sajt ska inte bara se professionell ut. Den ska hjälpa besökaren att förstå vad
              ni erbjuder och vad nästa steg är. Viktiga tjänster ska vara lätta att hitta,
              kontaktuppgifterna tydliga och allt ska fungera lika bra på mobilen som på datorn.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Ju mindre besökaren behöver leta, desto större chans att den hör av sig.
            </p>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {ANVANDARVANLIGHET.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <KortVy k={k} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partner */}
      <section aria-labelledby="partner" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Efter lansering</p>
          <h2 id="partner" className="mt-4 max-w-4xl text-4xl sm:text-5xl">
            Mer än webbdesign – en partner för er <Mark>digitala utveckling</Mark>
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/80">
            Hemsidan är ofta början, inte slutet. När den är på plats kan nästa steg vara att synas
            bättre på Google, bygga fler landningssidor eller nå ut med{" "}
            <Link to={tjanstSokvag("meta-annonser")} className={LANK}>
              Meta Ads
            </Link>
            . Eftersom vi arbetar med alla delarna kan sajten växa med företaget i stället för att
            bli ett avslutat projekt.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ol className="mt-10 flex flex-wrap items-center gap-3">
            {FLODE.map((f, i) => (
              <li key={f.titel} className="flex items-center gap-3">
                {f.till ? (
                  <Link
                    to={f.till}
                    className="rounded-full border-2 border-ink bg-white px-5 py-2.5 font-bold text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    {f.titel}
                  </Link>
                ) : (
                  <span className="rounded-full bg-ink px-5 py-2.5 font-bold text-white">
                    {f.titel}
                  </span>
                )}
                {i < FLODE.length - 1 && (
                  <ArrowRight className="size-5 text-ink/60" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Varje del kan vara ett eget uppdrag. Vad som ingår bestämmer vi tillsammans i förslaget
            – ni betalar bara för det ni väljer.
          </p>
        </Reveal>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Så går det till</p>
            <h2 id="process" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Från första mötet till färdig hemsida – <Mark>så går det till</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={STEG} rad />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")}>
              Boka ett första möte
            </BokaKnapp>
          </Reveal>
        </div>
      </section>

      {/* Pris */}
      <section aria-labelledby="pris-rubrik" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Pris</p>
            <h2 id="pris-rubrik" className="mt-4 text-4xl sm:text-5xl">
              Vad kostar en <Mark>webbyrå</Mark>?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Priset beror på hur stort projektet är och hur mycket arbete som krävs inom design,
              utveckling och innehåll. En enkel företagshemsida med några sidor är ett annat projekt
              än en större sajt med många tjänstesidor och egna funktioner. Det som påverkar mest:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {PRISFAKTORER.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-2xl bg-tint p-4 text-ink">
                  <Check className="size-5 shrink-0 text-brand" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Efter en kostnadsfri genomgång får ni ett förslag där det står vad som ingår och vad
              det kostar – innan ni bestämmer er.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div id="pris" className="scroll-mt-28 rounded-[2rem] bg-ink p-8 text-white sm:p-10">
              <dl className="divide-y divide-white/15">
                {[
                  { namn: "Ny hemsida", pris: `från ${kr(PRIS.hemsida)}` },
                  {
                    namn: "Uppfräschning av befintlig hemsida",
                    pris: `från ${kr(PRIS.uppfraschning)}`,
                  },
                  {
                    namn: "Löpande förbättringar i månadspaket",
                    pris: `från ${kr(PRIS.start)}/mån`,
                  },
                ].map((r) => (
                  <div
                    key={r.namn}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4 first:pt-0"
                  >
                    <dt className="text-white/85">{r.namn}</dt>
                    <dd className="font-display text-3xl">{r.pris}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-white/70">
                {MOMS_TEXT} Genomgången och förslaget är gratis.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BokaKnapp variant="white" tjanst={TJANST} onClick={() => bokaKlick(SIDA, "pris")}>
                  Få en kostnadsfri offert
                </BokaKnapp>
                <Link to="/priser" className="btn-base btn-outline-white">
                  Alla priser
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projekt */}
      {MED_SKARMBILD.length > 0 && (
        <section
          id="projekt"
          aria-labelledby="projekt-rubrik"
          className="scroll-mt-28 bg-fade-tint py-14 sm:py-20"
        >
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Projekt</p>
              <h2 id="projekt-rubrik" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
                Utforska våra tidigare <Mark>webbprojekt</Mark>
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
                Varje företag har olika förutsättningar, så designen utgår från verksamheten och
                upplevelsen sajten ska ge. Skärmbilderna är tagna från sajterna som de ser ut i dag.
              </p>
            </Reveal>
            <ul className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
              {MED_SKARMBILD.map((p, i) =>
                p.skarmbild ? (
                  <li key={p.url}>
                    <Reveal delay={i * 80}>
                      <Skarmbild
                        dator={p.skarmbild.dator}
                        mobil={p.skarmbild.mobil}
                        doman={p.doman}
                        alt={`Startsidan för ${p.namn}`}
                      />
                      <div className="mt-6">
                        <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">
                          {p.kategori}
                        </p>
                        <h3 className="mt-2 text-3xl">{p.namn}</h3>
                        <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground">
                          {p.text}
                        </p>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => projektKlick(p.namn)}
                          className="mt-4 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
                        >
                          {p.doman}
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                          <span className="sr-only"> (öppnas i ny flik)</span>
                        </a>
                      </div>
                    </Reveal>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </section>
      )}

      {/* Varför TAB */}
      <section aria-labelledby="varfor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Varför anlita {FORETAG.kortnamn} som <Mark>webbyrå</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              När ni anlitar en webbyrå vill ni veta att sajten blir anpassad efter er och att
              arbetet utgår från verksamheten. Vi tittar inte bara på hur sajten ser ut, utan på hur
              den fungerar för besökarna, hur informationen presenteras och hur den kan växa.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Ni ska förstå vad vi gör, varför och vad det ger – oavsett om det är en enkel
              företagshemsida eller ett större webbprojekt. {AGANDE_TEXT}
            </p>
            <FramtidaLank
              till="/webbyra-goteborg"
              dold
              className="mt-5 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
            >
              Söker ni en webbyrå i Göteborg?
              <ArrowRight className="size-4" aria-hidden="true" />
            </FramtidaLank>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VARFOR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Vanliga frågor om att anlita en <Mark>webbyrå</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={WEBBYRA_FRAGOR} />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-20">
        <BokaPanel
          tjanst={TJANST}
          onBoka={() => bokaKlick(SIDA, "avslutning")}
          rubrik={
            <>
              Behöver ert företag en webbyrå? Låt oss prata om <Mark>ert projekt</Mark>
            </>
          }
          text="Ny hemsida, modernisering av den gamla eller hjälp att utveckla sajten vidare – berätta kort om företaget, så går vi igenom vad som passar er. Genomgången är gratis."
        />
      </div>
    </>
  );
}
