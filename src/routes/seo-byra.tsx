import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Compass,
  FileText,
  Handshake,
  KeyRound,
  LineChart,
  MapPin,
  MessageSquareText,
  MousePointerClick,
  Search,
  Settings2,
  Target,
  TrendingUp,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { KortVy, type Kort } from "@/components/Kort";
import { FramtidaLank } from "@/components/FramtidaLank";
import { Markerad, Mark, PageHero } from "@/components/Heading";
import { SjalvMotOss } from "@/components/LyckasDigitalt";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { BINDNING_TEXT, kr, MOMS_TEXT, PAKET, PRIS } from "@/lib/priser";
import { SEO_BYRA, SEO_FRAGOR } from "@/lib/seo-byra";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

const SIDA = SEO_BYRA.sokvag;
const TJANST = "seo";

export const Route = createFileRoute("/seo-byra")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: SEO_BYRA.seoTitel,
      beskrivning: SEO_BYRA.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t ? [tjanstSchema(t)] : []),
        faqSchema(SEO_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
          { namn: SEO_BYRA.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: SeoByra,
});

const LANK =
  "font-bold text-ink underline decoration-sun decoration-2 underline-offset-4 hover:decoration-ink";

const FORDELAR_HERO = [
  "SEO anpassad efter ert företag",
  "Fokus på sökningar som ger kunder",
  "Långsiktigt arbete med synlighet",
] as const;

const VARFOR_SEO: readonly Kort[] = [
  {
    titel: "Synas på rätt sökningar",
    text: "Bättre förutsättningar att dyka upp när någon söker efter det ni erbjuder.",
    ikon: Search,
  },
  {
    titel: "Mer relevant trafik",
    text: "Besökare som redan har ett behov – inte bara fler besökare.",
    ikon: MousePointerClick,
  },
  {
    titel: "Fler förfrågningar",
    text: "En sajt som syns och är tydlig ger fler tillfällen till kundkontakt.",
    ikon: MessageSquareText,
  },
  {
    titel: "Värde som byggs över tid",
    text: "Sidor som rankar fortsätter ge besök, till skillnad från en annons som stängs av.",
    ikon: TrendingUp,
  },
];

const TJANSTER_SEO: readonly Kort[] = [
  {
    titel: "Sökordsanalys",
    text: "Vi tar reda på vilka ord och fraser era kunder använder, och väger sökintention, relevans och konkurrens för att prioritera de sökord som är värda mest för er.",
    ikon: KeyRound,
  },
  {
    titel: "Teknisk SEO",
    text: "Vi går igenom det som avgör om Google kan hitta och indexera sajten: laddningstid, mobilanpassning, interna länkar, sitemap, canonical-taggar och indexeringsfel.",
    ikon: Settings2,
  },
  {
    titel: "On-page SEO",
    text: "Sidtitlar, metabeskrivningar, rubriker, URL:er och sidinnehåll – så att varje viktig sida blir tydlig för både besökare och sökmotorer.",
    ikon: FileText,
  },
  {
    titel: "Innehållsoptimering",
    text: "Vi skriver och förbättrar tjänstesidor, landningssidor och guider som svarar på det era kunder faktiskt söker efter.",
    ikon: Compass,
  },
  {
    titel: "Lokal SEO",
    text: "För företag med kunder i ett visst område: lokala sökord, lokala sidor och en genomgång av Google-företagsprofilen.",
    ikon: MapPin,
  },
  {
    titel: "Uppföljning och analys",
    text: "Google Search Console och Bing Webmaster Tools i ert namn. Vi följer klick, visningar och landningssidor och prioriterar nästa steg utifrån det.",
    ikon: BarChart3,
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "Vi lär känna företaget, era kunder och er hemsida, och vad ni vill uppnå med SEO.",
  },
  {
    titel: "Analys och nuläge",
    text: "Vi går igenom sajtens teknik, innehåll och vilka sökningar ni redan syns på.",
  },
  {
    titel: "Sökordsstrategi",
    text: "Vi väljer vilka sökningar som är värda att satsa på och vilka sidor som ska bära dem.",
  },
  {
    titel: "Åtgärder",
    text: "Vi gör de överenskomna förbättringarna: metadata, struktur, internlänkar, teknik och innehåll.",
  },
  {
    titel: "Uppföljning",
    text: "Ni får en rapport varje månad och förslag på nästa steg när marknad och sökbeteende förändras.",
  },
];

const VARFOR_TAB: readonly Kort[] = [
  {
    titel: "Personlig kontakt",
    text: "En kontaktperson, raka besked och svar inom en arbetsdag.",
    ikon: Handshake,
  },
  {
    titel: "SEO efter era mål",
    text: "Vi prioriterar sökningar som kan bli kunder, inte sökord som bara ser bra ut i en rapport.",
    ikon: Target,
  },
  {
    titel: "Teknik, innehåll och hemsida",
    text: "Vi bygger och förbättrar hemsidor själva, så åtgärderna blir gjorda – inte bara föreslagna.",
    ikon: Settings2,
  },
  {
    titel: "Ingen bindningstid",
    text: "Löpande SEO ingår i månadspaketen och löper till slutet av betald period.",
    ikon: LineChart,
  },
];

function SeoByra() {
  const seo = hittaTjanst(TJANST);
  const seoRad = (ingar: readonly string[]) => ingar.find((r) => r.includes("SEO")) ?? "";

  return (
    <>
      <PageHero
        eyebrow={`Tjänster · ${SEO_BYRA.titel}`}
        title={
          <Markerad
            text="SEO-byrå som hjälper ert företag att synas på Google"
            markera="synas på Google"
          />
        }
        intro={`Vill ni att fler kunder hittar er när de söker på Google? ${FORETAG.kortnamn} är en SEO-byrå som kombinerar teknisk SEO, sökordsanalys och innehåll för att göra er hemsida synlig för människor som aktivt letar efter det ni erbjuder – oavsett om ni är ett småföretag eller en växande verksamhet.`}
      >
        <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")} />
        <a href="#process" className="btn-base btn-outline">
          Se hur vi arbetar
        </a>
      </PageHero>

      {/* Fördelar och illustration */}
      <section
        aria-label="Kort om tjänsten"
        className="container-page grid items-center gap-10 pt-10 pb-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <ul className="space-y-3">
          {FORDELAR_HERO.map((f) => (
            <li key={f} className="flex items-center gap-3 font-bold text-ink">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
          <li className="pt-2">
            <span className="rounded-full bg-sun px-3 py-1 text-sm font-bold text-ink">
              Grundoptimering {kr(PRIS.seoGeo)} · löpande från {kr(PRIS.start)}/mån
            </span>
          </li>
        </ul>
        <Sokresultat />
      </section>

      {/* Vad är SEO */}
      <section aria-labelledby="vad-ar-seo" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Grunderna</p>
            <h2 id="vad-ar-seo" className="mt-4 text-4xl sm:text-5xl">
              Vad är sökmotoroptimering och varför är det <Mark>viktigt</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Sökmotoroptimering, SEO, är arbetet med att göra en webbplats lätt för Google att
              hitta, förstå och visa för rätt sökningar. Målet är att ert företag finns bland
              resultaten när någon söker efter en tjänst, en produkt eller en lösning ni erbjuder.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Till skillnad från annonser betalar ni inte Google för varje klick. Däremot kräver SEO
              analys, tekniskt arbete och löpande förbättringar. Hur snabbt och hur mycket det ger
              beror på konkurrensen, hur sajten ser ut i dag och hur kunderna söker.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VARFOR_SEO.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Tjänster */}
      <section aria-labelledby="seo-tjanster" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Det här gör vi</p>
            <h2 id="seo-tjanster" className="mt-4 max-w-4xl text-4xl sm:text-5xl">
              Våra SEO-tjänster – från analys till <Mark>löpande optimering</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              SEO består av flera delar som måste fungera tillsammans. Vi hittar var det finns mest
              att vinna och prioriterar efter era mål, er målgrupp och er marknad.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TJANSTER_SEO.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <KortVy k={k} />
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={80} className="mt-10">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "tjanster")}>
              Få hjälp med SEO
            </BokaKnapp>
          </Reveal>
        </div>
      </section>

      {/* Småföretag */}
      <section aria-labelledby="smaforetag" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Småföretag</p>
            <h2 id="smaforetag" className="mt-4 text-4xl sm:text-5xl">
              SEO för småföretag – bli synliga där <Mark>kunderna söker</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Ni behöver inte vara ett stort företag för att ha nytta av SEO. För många mindre
              verksamheter är Google platsen där kunder letar efter lokala tjänster, jämför
              alternativ och bestämmer sig.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Med rätt sökord kan även ett litet företag vinna på specifika sökningar: en städfirma
              som vill synas i sin stad, ett byggföretag som vill ha fler offertförfrågningar eller
              en konsult som vill hittas av nya uppdragsgivare. I stället för att försöka synas på
              allt lägger vi kraften där trafiken kan bli affärer.
            </p>
            <FramtidaLank
              till="/seo-smaforetag"
              dold
              className="mt-5 inline-flex items-center gap-2 text-lg font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
            >
              Läs mer om SEO för småföretag
              <ArrowRight className="size-4" aria-hidden="true" />
            </FramtidaLank>
            <div className="mt-8">
              <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "smaforetag")}>
                Få hjälp med SEO för ert företag
              </BokaKnapp>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        aria-labelledby="process-rubrik"
        className="scroll-mt-28 bg-fade-tint py-14 sm:py-20"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Så arbetar vi</p>
            <h2 id="process-rubrik" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Så fungerar vårt SEO-arbete – <Mark>steg för steg</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              SEO är långsiktigt och behöver justeras när marknaden, konkurrensen och sökbeteendet
              förändras. Därför är uppföljningen lika viktig som de första åtgärderna.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={STEG} rad />
          </Reveal>
        </div>
      </section>

      {/* Lokal SEO och GEO */}
      <section className="container-page grid gap-6 py-14 sm:py-20 lg:grid-cols-2">
        <Reveal className="h-full">
          <article
            aria-labelledby="lokal-seo"
            className="h-full rounded-[2rem] border-2 border-line bg-white p-8 sm:p-10"
          >
            <span className="grid size-12 place-items-center rounded-full bg-tint text-brand">
              <MapPin className="size-6" aria-hidden="true" />
            </span>
            <h2 id="lokal-seo" className="mt-6 text-3xl sm:text-4xl">
              Lokal SEO – synas i <Mark>ert område</Mark>
            </h2>
            <p className="mt-5 leading-relaxed text-ink/80">
              Söker någon efter en städfirma, en hantverkare eller en annan tjänst i en viss ort
              vill Google visa företag som finns där. Lokala sökord, sidor om orterna ni arbetar i
              och en korrekt Google-företagsprofil gör att ni har bättre chans att hittas i lokala
              sökresultat och på Google Maps.
            </p>
            <p className="mt-4 leading-relaxed text-ink/80">
              Vi tar reda på vilka lokala sökningar som är värda mest för er och vilka åtgärder som
              ska göras först.
            </p>
            <FramtidaLank
              till="/lokal-seo"
              dold
              className="mt-6 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
            >
              Läs mer om lokal SEO
              <ArrowRight className="size-4" aria-hidden="true" />
            </FramtidaLank>
          </article>
        </Reveal>
        <Reveal delay={80} className="h-full">
          <article
            aria-labelledby="seo-geo"
            className="h-full rounded-[2rem] bg-ink p-8 text-white sm:p-10"
          >
            <span className="grid size-12 place-items-center rounded-full bg-white/10 text-sun">
              <Bot className="size-6" aria-hidden="true" />
            </span>
            <h2 id="seo-geo" className="mt-6 text-3xl sm:text-4xl">
              SEO och GEO – synlighet på Google och <Mark>i AI</Mark>
            </h2>
            <p className="mt-5 leading-relaxed text-white/80">
              Allt fler frågar ChatGPT och andra AI-assistenter i stället för att googla. SEO
              handlar om de vanliga sökresultaten. GEO, Generative Engine Optimization, handlar om
              att AI-tjänster ska kunna förstå och nämna ert företag.
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              Grunden är densamma – tydligt innehåll, korrekt företagsinformation, en tekniskt sund
              sajt och omnämnanden på andra sajter – så vi gör dem tillsammans. Ingen kan garantera
              att ett företag nämns i ett AI-svar.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link
                to={tjanstSokvag("geo")}
                className="inline-flex items-center gap-2 font-bold text-white underline decoration-sun decoration-2 underline-offset-4"
              >
                Läs mer om GEO-optimering
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                to="/guider/$slug"
                params={{ slug: "vad-ar-geo" }}
                className="inline-flex items-center gap-2 font-bold text-white/85 underline decoration-white/40 decoration-2 underline-offset-4"
              >
                Guide: Vad är GEO?
              </Link>
            </div>
          </article>
        </Reveal>
      </section>

      {/* Pris */}
      <section aria-labelledby="pris-rubrik" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Pris</p>
              <h2 id="pris-rubrik" className="mt-4 text-4xl sm:text-5xl">
                Vad kostar SEO och sökmotoroptimering för <Mark>företag</Mark>?
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                Hur mycket arbete som behövs beror på hur sajten ser ut i dag, hur hård konkurrensen
                är och hur många tjänster och sökord ni vill synas på. Därför har vi två vägar in:
                en grundoptimering som engångsinsats, och löpande SEO som ingår i månadspaketen.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                På den kostnadsfria genomgången går vi igenom vad som behövs, och ni får ett förslag
                där det står vad som ingår och varför.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="h-full">
              <div
                id="pris"
                className="flex h-full scroll-mt-28 flex-col rounded-[2rem] bg-ink p-8 text-white sm:p-10"
              >
                <p className="caps text-sun">Engång</p>
                <h3 className="mt-4 font-sans text-xl font-bold tracking-normal">
                  Grundoptimering av SEO och GEO
                </h3>
                <p className="mt-4 font-display text-5xl leading-none sm:text-6xl">
                  {kr(PRIS.seoGeo)}
                </p>
                <p className="mt-3 flex-1 text-sm text-white/70">
                  {MOMS_TEXT} Genomgången och förslaget är gratis.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <BokaKnapp
                    variant="white"
                    tjanst={TJANST}
                    onClick={() => bokaKlick(SIDA, "pris")}
                  >
                    Få en kostnadsfri SEO-genomgång
                  </BokaKnapp>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80} className="h-full">
              <div className="h-full rounded-[2rem] border-2 border-line bg-white p-8 sm:p-10">
                <p className="caps text-brand">Löpande · per månad</p>
                <h3 className="mt-4 font-sans text-xl font-bold tracking-normal text-ink">
                  SEO i månadspaketen
                </h3>
                <ul className="mt-6 divide-y divide-line">
                  {PAKET.map((p) => (
                    <li key={p.id} className="flex items-baseline justify-between gap-4 py-4">
                      <span>
                        <span className="block font-bold text-ink">{p.namn}</span>
                        <span className="text-sm text-muted-foreground">{seoRad(p.ingar)}</span>
                      </span>
                      <span className="shrink-0 font-display text-2xl text-ink">
                        {kr(p.belopp)}
                        <span className="text-sm text-muted-foreground">/mån</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {BINDNING_TEXT} Uppstart av större månadsabonnemang {kr(PRIS.uppstart)}.
                </p>
                <Link to="/priser" className="btn-base btn-outline mt-6">
                  Se vad som ingår i paketen
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Varför TAB */}
      <section aria-labelledby="varfor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Varför välja {FORETAG.kortnamn} för er <Mark>sökmotoroptimering</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              SEO ska inte bara ge fler besökare – det ska ge fler av rätt besökare. Därför börjar
              vi med verksamheten och vilka sökningar som faktiskt kan bli kunder, och ser sedan hur
              teknik, innehåll och struktur kan stärka synligheten. Det gäller oavsett om ni letar
              efter en SEO-byrå eller en{" "}
              <FramtidaLank till="/seo-konsult" className={LANK}>
                SEO-konsult
              </FramtidaLank>
              .
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vi arbetar med hela kedjan: SEO, synlighet i AI och – som{" "}
              <FramtidaLank till="/webbyra" className={LANK}>
                webbyrå
              </FramtidaLank>{" "}
              – själva hemsidan. Behöver sajten bara förbättras kan vi{" "}
              <Link to={tjanstSokvag("hemsideoptimering")} className={LANK}>
                modernisera er hemsida
              </Link>
              , och är den för gammal för att bygga vidare på tar vi fram en{" "}
              <Link to={tjanstSokvag("hemsida")} className={LANK}>
                professionell hemsida till företaget
              </Link>{" "}
              med SEO från start.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VARFOR_TAB.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
        {seo && (
          <Reveal delay={80} className="mt-14">
            <h3 className="max-w-3xl text-3xl sm:text-4xl">
              Det här krävs för SEO – <Mark>vi gör det åt er</Mark>
            </h3>
            <div className="mt-8">
              <SjalvMotOss o={seo} />
            </div>
          </Reveal>
        )}
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Vanliga frågor om SEO och <Mark>sökmotoroptimering</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={SEO_FRAGOR} />
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
              Vill ni att fler kunder hittar er på <Mark>Google</Mark>?
            </>
          }
          text="Er nästa kund kanske redan söker efter det ni erbjuder. På den gratis genomgången tittar vi på hur ni syns i dag och vad som ger mest att förbättra först."
        />
      </div>
    </>
  );
}

/** Stiliserat sökresultat och klickkurva. Rent illustration – inga verkliga kundsiffror. */
function Sokresultat() {
  return (
    <figure className="kortskugga relative rounded-[2rem] border-2 border-line bg-white p-5 sm:p-7">
      <div aria-hidden="true">
        <div className="flex items-center gap-3 rounded-full border-2 border-line px-5 py-3">
          <Search className="size-4 text-muted-foreground" />
          <span className="text-ink">elektriker uppsala</span>
        </div>
        <div className="mt-5 rounded-2xl bg-tint p-4 ring-2 ring-brand">
          <p className="text-xs text-muted-foreground">ert-foretag.se › elektriker-uppsala</p>
          <p className="mt-1 font-bold text-brand">Elektriker i Uppsala – akut och planerat</p>
          <p className="mt-1 text-sm text-ink/70">
            Certifierade elektriker i hela Uppsala. Fast pris och svar samma dag.
          </p>
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="mt-3 space-y-2 px-4 py-2">
            <span className="block h-2 w-1/3 rounded-full bg-line" />
            <span className="block h-3 w-2/3 rounded-full bg-ink/15" />
            <span className="block h-2 w-5/6 rounded-full bg-line" />
          </div>
        ))}
        <div className="mt-4 border-t border-line pt-4">
          <p className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
            Organiska klick
          </p>
          <svg viewBox="0 0 300 70" className="mt-2 h-16 w-full" fill="none">
            <path
              d="M0 62 L40 58 L80 60 L120 48 L160 44 L200 32 L240 26 L300 10"
              stroke="var(--brand)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0 62 L40 58 L80 60 L120 48 L160 44 L200 32 L240 26 L300 10 L300 70 L0 70 Z"
              fill="var(--brand)"
              opacity="0.08"
            />
          </svg>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        Illustration av ett sökresultat och en klickkurva – exempel, inte ett kundresultat.
      </figcaption>
    </figure>
  );
}
