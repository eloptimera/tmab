import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  Handshake,
  KeyRound,
  LayoutTemplate,
  ListChecks,
  MapPin,
  MessageSquareText,
  MousePointerClick,
  Search,
  Settings2,
  Sprout,
  Target,
  TrendingUp,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { FramtidaLank } from "@/components/FramtidaLank";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { BINDNING_TEXT, kr, MOMS_TEXT, PAKET, PRIS } from "@/lib/priser";
import { SEO_BYRA } from "@/lib/seo-byra";
import { SEO_SMAFORETAG, SJALV_LISTA, SMAFORETAG_FRAGOR } from "@/lib/seo-smaforetag";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

const SIDA = SEO_SMAFORETAG.sokvag;
const TJANST = "seo";

export const Route = createFileRoute("/seo-smaforetag")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: SEO_SMAFORETAG.seoTitel,
      beskrivning: SEO_SMAFORETAG.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: SEO_SMAFORETAG.titel,
                beskrivning: SEO_SMAFORETAG.seoBeskrivning,
                sokvag: SIDA,
              }),
            ]
          : []),
        faqSchema(SMAFORETAG_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: SEO_BYRA.titel, sokvag: SEO_BYRA.sokvag },
          { namn: SEO_SMAFORETAG.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: SeoSmaforetag,
});

const LANK =
  "font-bold text-ink underline decoration-sun decoration-2 underline-offset-4 hover:decoration-ink";

const FORDELAR_HERO = [
  "SEO anpassad för småföretag",
  "Fokus på sökningar som ger kunder",
  "Tydliga prioriteringar för er verksamhet",
] as const;

const VARFOR: readonly Kort[] = [
  {
    titel: "Nå fler relevanta kunder",
    text: "Synas när någon aktivt söker efter det ni erbjuder – inte bara bland många andra.",
    ikon: MousePointerClick,
  },
  {
    titel: "Synlighet som håller",
    text: "Sidor och innehåll som rankar fortsätter ge besök långt efter att jobbet är gjort.",
    ikon: TrendingUp,
  },
  {
    titel: "Rätt sökningar, inte alla",
    text: "Sökord kopplade till era tjänster och ert område, där ni faktiskt kan vinna.",
    ikon: Target,
  },
  {
    titel: "Fler förfrågningar",
    text: "En tydlig väg från sökning till kontakt, så att besöken blir samtal och offerter.",
    ikon: MessageSquareText,
  },
];

const BUDGET_STEG: readonly Steg[] = [
  {
    titel: "Hitta de viktigaste sökorden",
    text: "Ett fåtal sökningar som era kunder faktiskt använder – inte en lista på hundra.",
  },
  {
    titel: "Gör det som ger mest först",
    text: "Ofta tjänstesidorna, sidtitlarna och Google-företagsprofilen. Resten kan vänta.",
  },
  {
    titel: "Följ upp och bygg vidare",
    text: "Se vad som ger besök och förfrågningar, och lägg nästa insats där.",
  },
];

const TJANSTER: readonly Kort[] = [
  {
    titel: "Sökordsanalys för småföretag",
    text: "Vi tar reda på vad era kunder söker på och väljer ut de sökfraser som passar era tjänster och er budget.",
    ikon: KeyRound,
  },
  {
    titel: "Bättre befintliga sidor",
    text: "Rubriker, sidtitlar, beskrivningar, texter och länkar mellan sidorna – så att Google och besökarna förstår vad ni gör.",
    ikon: FileText,
  },
  {
    titel: "Lokal SEO",
    text: "Lokala sökord, sidor om orterna ni arbetar i och en genomgång av hur ni syns i lokala sökresultat.",
    ikon: MapPin,
  },
  {
    titel: "Teknisk SEO",
    text: "Vi kontrollerar att Google kan läsa sajten: mobilanpassning, laddningstid, indexering och struktur. På ren svenska: att inget tekniskt står i vägen.",
    ikon: Settings2,
  },
  {
    titel: "Landningssidor som säljer",
    text: "Sidor som svarar på en specifik sökning – till exempel en tjänst i en viss stad – och gör det lätt att ta kontakt.",
    ikon: LayoutTemplate,
  },
  {
    titel: "Uppföljning varje månad",
    text: "Google Search Console i ert namn och en månadsrapport om klick, visningar och vilka sidor som ger förfrågningar.",
    ikon: BarChart3,
  },
];

const BRANSCHER: readonly { titel: string; text: string }[] = [
  {
    titel: "Hantverkare och byggföretag",
    text: "Synas på sökningar som kombinerar tjänst och ort – måleri, renovering eller snickeri i ert område.",
  },
  {
    titel: "Städföretag",
    text: "En sida per städtjänst, tydliga områden ni arbetar i och en enkel väg till offert.",
  },
  {
    titel: "Skönhetssalonger och frisörer",
    text: "Behandlingar beskrivna så som kunderna söker, salongens läge och en tydlig bokningsknapp.",
  },
  {
    titel: "Konsultföretag",
    text: "Tjänstesidor och artiklar som visar kompetensen och hjälper kunden att förstå erbjudandet.",
  },
  {
    titel: "Nystartade företag",
    text: "Rätt struktur och sökord från början, så att hemsidan inte behöver göras om senare.",
  },
  {
    titel: "Lokala serviceföretag",
    text: "Lokala sökningar, korrekta företagsuppgifter överallt och tydliga sätt att höra av sig.",
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "Vi lär känna företaget, vilka kunder ni vill nå och vad ni vill uppnå.",
  },
  {
    titel: "Genomgång av sajten",
    text: "Vi tittar på innehåll, struktur och teknik och hittar det som ger mest att förbättra.",
  },
  {
    titel: "Prioriterade sökord",
    text: "Vi väljer de sökningar som matchar era tjänster och är realistiska att vinna.",
  },
  {
    titel: "Optimering",
    text: "Vi gör de överenskomna förbättringarna – rubriker, metadata, tjänstesidor, länkar, teknik eller lokal synlighet.",
  },
  {
    titel: "Uppföljning",
    text: "Månadsrapport och förslag på nästa steg utifrån vad som faktiskt ger resultat.",
  },
];

const JAMFORELSE: readonly (readonly [string, string, string])[] = [
  ["Ni betalar för", "Arbetet med sajten", "Varje klick, till Google"],
  ["Synlighet", "Byggs upp över tid", "Direkt när kampanjen startar"],
  ["När ni slutar", "Sidorna fortsätter synas", "Annonserna försvinner"],
  ["Passar när", "Ni vill ha kunder långsiktigt", "Ni behöver kunder snabbt"],
];

const VARFOR_TAB: readonly Kort[] = [
  {
    titel: "Personlig kontakt",
    text: "En kontaktperson och svar inom en arbetsdag – ingen kundtjänstkö.",
    ikon: Handshake,
  },
  {
    titel: "Anpassat efter er storlek",
    text: "Vi föreslår det som ger mest för er budget, inte allt som går att göra.",
    ikon: Sprout,
  },
  {
    titel: "Raka besked",
    text: "Ni får veta vad vi gör, varför och vad det kostar – på svenska, utan jargong.",
    ikon: ListChecks,
  },
  {
    titel: "SEO, hemsida och GEO",
    text: "Kräver SEO-arbetet ändringar på hemsidan gör vi dem själva.",
    ikon: Search,
  },
];

function SeoSmaforetag() {
  const start = PAKET.find((p) => p.id === "start");
  const startSeo = start?.ingar.find((r) => r.includes("SEO")) ?? "SEO";

  return (
    <>
      <PageHero
        eyebrow={`${SEO_BYRA.titel} · ${SEO_SMAFORETAG.titel}`}
        title={
          <Markerad
            text="SEO för småföretag – bli synliga för fler potentiella kunder"
            markera="fler potentiella kunder"
          />
        }
        intro="Driver ni ett småföretag och vill att fler kunder ska hitta er på Google? Vi hjälper mindre företag att lägga krutet rätt: på sökningar som passar just ert erbjudande, på tydliga sidor och på förbättringar som går att genomföra steg för steg – oavsett om ni är ett lokalt tjänsteföretag, konsult eller precis har startat."
      >
        <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")} />
        <a href="#hjalp" className="btn-base btn-outline">
          Så hjälper vi småföretag
        </a>
      </PageHero>

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
          <li className="flex items-center">
            <span className="rounded-full bg-sun px-3 py-1 text-sm font-bold text-ink">
              Från {kr(PRIS.start)}/mån · ingen bindningstid
            </span>
          </li>
        </ul>
      </section>

      {/* Varför SEO */}
      <section aria-labelledby="varfor-seo" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför SEO</p>
            <h2 id="varfor-seo" className="mt-4 text-4xl sm:text-5xl">
              Varför är SEO viktigt för <Mark>småföretag</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              När folk behöver en tjänst börjar de ofta på Google. Det kan vara någon som letar
              efter en målare i närheten, ett företag som behöver en redovisningskonsult eller någon
              som vill hitta en lokal städfirma. Syns ni inte där hittar de någon annan.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Sökmotoroptimering för småföretag hjälper Google att förstå vad ni erbjuder och vilka
              sökningar er hemsida passar för. Och som litet företag behöver ni inte slåss om
              landets största sökord – det räcker långt att synas för de människor som faktiskt
              behöver just era tjänster.
            </p>
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

      {/* Budget */}
      <section aria-labelledby="budget" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Liten budget</p>
              <h2 id="budget" className="mt-4 text-4xl sm:text-5xl">
                SEO för småföretag med <Mark>begränsad budget</Mark>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                Som småföretagare måste ni välja var pengarna gör mest nytta. Därför gör vi inte
                samma saker för alla. För ett företag är det tjänstesidorna som behöver bli
                tydligare, för ett annat lokal SEO, bättre rubriker eller ett kontaktformulär som
                faktiskt fungerar.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                Vi utgår från hur det ser ut i dag och börjar med det som ger mest. Sedan bygger vi
                vidare i den takt budgeten tillåter.
              </p>
            </Reveal>
          </div>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={BUDGET_STEG} rad />
          </Reveal>
        </div>
      </section>

      {/* Tjänster */}
      <section
        id="hjalp"
        aria-labelledby="hjalp-rubrik"
        className="container-page scroll-mt-28 py-14 sm:py-20"
      >
        <Reveal>
          <p className="eyebrow">Det här gör vi</p>
          <h2 id="hjalp-rubrik" className="mt-4 max-w-4xl text-4xl sm:text-5xl">
            Så hjälper vi småföretag att synas bättre på <Mark>Google</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Sökmotoroptimering för små företag handlar om att göra rätt saker i rätt ordning. Vi tar
            hand om de delar som gör hemsidan tydligare, mer relevant och lättare att hitta. Vill ni
            se helheten finns alla{" "}
            <Link to={SEO_BYRA.sokvag} className={LANK}>
              våra SEO-tjänster
            </Link>{" "}
            samlade på en sida.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TJANSTER.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Lokal SEO */}
      <section aria-labelledby="lokal" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Lokal SEO</p>
            <h2 id="lokal" className="mt-4 text-4xl sm:text-5xl">
              Lokal SEO – syns när kunder söker i <Mark>ert område</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              För många småföretag är det viktigare att hittas av rätt människor i rätt område än
              att synas i hela Sverige. En städfirma i Göteborg, en frisör i Malmö eller en
              hantverkare i Stockholm har mer nytta av ”städfirma Göteborg” än av breda, nationella
              sökord.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vi gör hemsidan relevant för orterna ni arbetar i, förbättrar tjänstesidorna och ser
              över hur företaget visas i lokala sökresultat. Uppfyller ni Googles krav är
              Google-företagsprofilen ofta det viktigaste av allt.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "lokal")}>
                Få hjälp med lokal SEO
              </BokaKnapp>
              <FramtidaLank
                till="/lokal-seo"
                dold
                className="inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
              >
                Läs mer om lokal SEO
                <ArrowRight className="size-4" aria-hidden="true" />
              </FramtidaLank>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Branscher */}
      <section aria-labelledby="branscher" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Exempel</p>
          <h2 id="branscher" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            SEO anpassad efter <Mark>er bransch</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Så kan SEO se ut för olika typer av småföretag. Exempel på upplägg – inte kundcase.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BRANSCHER.map((b, i) => (
            <li key={b.titel}>
              <Reveal delay={i * 50} className="h-full">
                <div className="h-full rounded-[1.5rem] bg-tint p-6">
                  <h3 className="font-sans text-lg font-bold tracking-normal text-ink">
                    {b.titel}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Gör själv */}
      <section
        id="sjalv"
        aria-labelledby="sjalv-rubrik"
        className="scroll-mt-28 bg-fade-tint py-14 sm:py-20"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Börja själva</p>
            <h2 id="sjalv-rubrik" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              10 saker ni kan fixa <Mark>på en eftermiddag</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Ni behöver ingen byrå för de första stegen. Det här ger mest effekt för minst arbete,
              och det mesta kostar inget.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-3 md:grid-cols-2">
            {SJALV_LISTA.map((r, i) => (
              <li
                key={r.titel}
                className="flex gap-4 rounded-2xl bg-white p-5 text-ink shadow-sm shadow-brand/10"
              >
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span>
                  <strong className="block">{r.titel}</strong>
                  <span className="text-ink/80">{r.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <Reveal delay={80}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/80">
              När grunden är på plats handlar SEO om löpande arbete: nytt innehåll, tekniska
              förbättringar och uppföljning varje månad. Det är där det blir tidskrävande – och där
              vi kan ta över.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Så går det till</p>
          <h2 id="process" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Så hjälper vi ert småföretag med SEO – <Mark>steg för steg</Mark>
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <Stegliste steg={STEG} rad />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")}>
            Kom igång med SEO
          </BokaKnapp>
        </Reveal>
      </section>

      {/* Pris */}
      <section aria-labelledby="pris-rubrik" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Pris</p>
              <h2 id="pris-rubrik" className="mt-4 text-4xl sm:text-5xl">
                Vad kostar SEO för ett <Mark>småföretag</Mark>?
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                Det beror på hur stor sajten är, hur hård konkurrensen är och hur mycket som behöver
                göras. För många småföretag räcker det att börja med en avgränsad insats: sökorden
                och de viktigaste tjänstesidorna. Andra vill ha löpande hjälp med innehåll, teknik
                och uppföljning.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                Vi börjar med er situation och föreslår ett upplägg som passar budgeten. Ni ser vad
                som ingår och vad det kostar innan ni bestämmer er.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-[2rem] border-2 border-line bg-white p-8 sm:p-10">
                <p className="caps text-brand">Engång · för att komma igång</p>
                <h3 className="mt-4 font-sans text-xl font-bold tracking-normal text-ink">
                  Grundoptimering av SEO och GEO
                </h3>
                <p className="mt-4 flex-1 font-display text-5xl leading-none text-ink">
                  {kr(PRIS.seoGeo)}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Grunden på plats en gång – sedan kan ni ta över själva.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80} className="h-full">
              <div
                id="pris"
                className="flex h-full scroll-mt-28 flex-col rounded-[2rem] bg-ink p-8 text-white sm:p-10"
              >
                <p className="caps text-sun">Löpande · minsta paketet</p>
                <h3 className="mt-4 font-sans text-xl font-bold tracking-normal">
                  {start?.namn ?? "Start"} – {startSeo} varje månad
                </h3>
                <p className="mt-4 font-display text-5xl leading-none">
                  {kr(PRIS.start)}
                  <span className="text-2xl text-white/70">/mån</span>
                </p>
                <p className="mt-4 flex-1 text-sm text-white/70">{BINDNING_TEXT}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <BokaKnapp
                    variant="white"
                    tjanst={TJANST}
                    onClick={() => bokaKlick(SIDA, "pris")}
                  >
                    Få ett SEO-förslag för ert företag
                  </BokaKnapp>
                  <Link to="/priser" className="btn-base btn-outline-white">
                    Alla paket
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {MOMS_TEXT} Första genomgången och förslaget är gratis.
          </p>
        </div>
      </section>

      {/* SEO eller annonser */}
      <section aria-labelledby="annonser" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">SEO eller annonser</p>
            <h2 id="annonser" className="mt-4 text-4xl sm:text-5xl">
              SEO eller betalda annonser – vad ska ett <Mark>småföretag</Mark> välja?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Det beror på hur snabbt ni behöver kunder, vilken budget ni har och hur konkurrensen
              ser ut. Ofta kompletterar de varandra – och en tydlig hemsida behövs oavsett hur
              besökarna hittar dit.
            </p>
            <p className="mt-5 leading-relaxed text-ink/80">
              Google Ads sköter vi inte. Vill ni annonsera betalt hjälper vi till med{" "}
              <Link to={tjanstSokvag("meta-annonser")} className={LANK}>
                annonser på Facebook och Instagram
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="overflow-x-auto rounded-2xl border-2 border-line bg-white">
              <table className="w-full min-w-[30rem] text-left">
                <caption className="sr-only">Jämförelse mellan SEO och Google Ads</caption>
                <thead>
                  <tr className="border-b-2 border-line">
                    <th scope="col" className="p-4">
                      <span className="sr-only">Egenskap</span>
                    </th>
                    <th scope="col" className="p-4 font-bold text-brand">
                      SEO
                    </th>
                    <th scope="col" className="p-4 font-bold text-ink">
                      Google Ads
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {JAMFORELSE.map(([rad, seo, ads]) => (
                    <tr key={rad} className="border-b border-line last:border-0">
                      <th scope="row" className="p-4 font-bold text-ink">
                        {rad}
                      </th>
                      <td className="p-4 text-ink/85">{seo}</td>
                      <td className="p-4 text-ink/85">{ads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Varför TAB */}
      <section aria-labelledby="varfor-tab" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
              <h2 id="varfor-tab" className="mt-4 text-4xl sm:text-5xl">
                Varför välja {FORETAG.kortnamn} för ert småföretags <Mark>SEO</Mark>?
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                Som småföretagare ska ni inte behöva bli SEO-experter för att förstå vad ni betalar
                för. Vi förklarar vad som behöver göras, i vilken ordning och varför – oavsett om ni
                tänkt anlita en byrå eller en{" "}
                <FramtidaLank till="/seo-konsult" className={LANK}>
                  SEO-konsult
                </FramtidaLank>
                .
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                Eftersom vi även är{" "}
                <FramtidaLank till="/webbyra" className={LANK}>
                  webbyrå
                </FramtidaLank>{" "}
                kan vi göra ändringarna själva när SEO-arbetet visar att sajten behöver mer. Ibland
                räcker det att{" "}
                <Link to={tjanstSokvag("hemsideoptimering")} className={LANK}>
                  modernisera en befintlig hemsida
                </Link>
                , ibland behövs en ny{" "}
                <Link to={tjanstSokvag("hemsida")} className={LANK}>
                  hemsida till företaget
                </Link>
                . Och vill ni synas i ChatGPT och andra AI-tjänster gör vi{" "}
                <Link to={tjanstSokvag("geo")} className={LANK}>
                  GEO-optimering
                </Link>{" "}
                på samma grund.
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
        </div>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="container-page py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Vanliga frågor</p>
          <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
            Vanliga frågor om SEO för <Mark>småföretag</Mark>
          </h2>
          <div className="mt-8">
            <VanligaFragor fragor={SMAFORETAG_FRAGOR} />
          </div>
        </div>
      </section>

      <BokaPanel
        tjanst={TJANST}
        onBoka={() => bokaKlick(SIDA, "avslutning")}
        rubrik={
          <>
            Vill ni att fler kunder ska hitta ert <Mark>småföretag</Mark> på Google?
          </>
        }
        text="Oavsett om ni precis har startat eller vill synas bättre som etablerat företag: på den gratis genomgången tittar vi på hur ni syns i dag och vad som ger mest att göra först."
      />
    </>
  );
}
