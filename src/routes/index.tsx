import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clapperboard, Megaphone, Search } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Blob, Linjer } from "@/components/Brand";
import { Heading, Mark } from "@/components/Heading";
import { LyckasDigitalt } from "@/components/LyckasDigitalt";
import { BildGalleri, ProjektLista } from "@/components/Projekt";
import { Reveal } from "@/components/Reveal";
import { Tusch } from "@/components/Tusch";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { BINDNING_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";
import { faqSchema, sidhuvud } from "@/lib/seo";
import { avstava } from "@/lib/text";

export const Route = createFileRoute("/")({
  head: () =>
    sidhuvud({
      titel: "Marknadsföringsbyrå för företag",
      beskrivning: `Vi tar fram marknadsföringsbilder, sköter SEO, GEO och Meta-annonser och bygger hemsidor åt företag. Marknadsföring från ${kr(PRIS.start)}/mån. Boka gratis genomgång.`,
      sokvag: "/",
      schema: [faqSchema(HEM_FRAGOR)],
    }),
  component: Start,
});

const LOFTEN_KORT = ["Gratis genomgång", "Fasta priser", "Ingen bindningstid"] as const;

// Vanliga frågor på startsidan – svarar på det man undrar innan man anlitar en byrå.
// Visas längst ner och som FAQPage-schema.
const HEM_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad gör en marknadsföringsbyrå?",
    svar: "Den hjälper företag att synas och få kunder – på Google, i AI-tjänster, i sociala medier och i annonser. Hos oss betyder det marknadsföringsbilder och video, SEO och GEO, Meta-annonser och hemsidor. Vi gör jobbet åt er i stället för att bara ge råd.",
  },
  {
    fraga: "Vad kostar det att anlita er?",
    svar: `Månadspaketen kostar ${kr(PRIS.start)}, ${kr(PRIS.growth)} eller ${kr(PRIS.premium)} per månad. En ny hemsida kostar från ${kr(PRIS.hemsida)} som engångspris. ${MOMS_TEXT} Första genomgången är gratis.`,
  },
  {
    fraga: "Arbetar ni med företag i hela Sverige?",
    svar: "Ja. Vi arbetar digitalt, så det spelar ingen roll var ert företag finns.",
  },
  {
    fraga: "Finns det någon bindningstid?",
    svar: BINDNING_TEXT,
  },
  {
    fraga: "Kan ni garantera att vi hamnar först på Google?",
    svar: "Nej, det kan ingen lova. Vi lovar arbetet och en rapport varje månad som visar vad det gav.",
  },
  {
    fraga: "Hur kommer vi igång?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Vi går igenom er digitala närvaro och skickar sedan ett förslag med pris. Säger ni ja börjar vi.",
  },
];

// Tre övergripande områden på startsidan. Detaljerna per tjänst ligger i listan längre ner
// och på /tjanster – här ska besökaren bara snabbt förstå vad vi hjälper till med.
const OMRADEN = [
  {
    titel: "Synas på Google & i AI",
    text: "SEO och GEO som gör att kunderna hittar er – på Google och i ChatGPT.",
    ikon: Search,
    stil: "bg-brand text-white kortskugga-brand",
    till: { to: "/seo-byra" },
  },
  {
    titel: "Innehåll & sociala medier",
    text: "Bilder och korta videor som får er målgrupp att stanna upp.",
    ikon: Clapperboard,
    stil: "border-2 border-line bg-white text-ink kortskugga",
    till: { to: "/tjanster/$slug", params: { slug: "marknadsforingsbilder" } },
  },
  {
    titel: "Kampanjer & annonsering",
    text: "Kampanjer som når rätt personer och går att mäta.",
    ikon: Megaphone,
    stil: "bg-ink text-white kortskugga",
    till: { to: "/meta-ads-byra" },
  },
] as const;

function Start() {
  return (
    <>
      {/* Hero: en stark rubrik är det största på sidan – den bär sökordet och säger direkt
          vad vi gör. Blobben och linjerna är samma bildspråk som tidigare ordbilden. */}
      <section aria-labelledby="hero-rubrik" className="relative isolate overflow-hidden">
        <div className="mx-auto flex max-w-[88rem] flex-col px-6 pt-6 pb-14 sm:px-10 lg:min-h-[min(46rem,calc(100svh-4.5rem))] lg:pb-16">
          <div className="caps flex items-start justify-between gap-6 text-ink max-sm:justify-center">
            <span className="hidden sm:inline">Marknadsföringsbyrå för företag</span>
            <span>Fasta priser · Gratis genomgång</span>
          </div>

          <div className="relative my-14 flex items-center justify-center sm:my-16 lg:flex-1">
            <Blob className="absolute top-1/2 left-1/2 -z-10 w-[min(80vw,46rem)] -translate-x-1/2 -translate-y-[55%]" />
            {/* Höjden i em mot rubrikens egen textstorlek, så att linjerna ramar in rubriken
                och ellipsen aldrig når ner i brödtexten: 3 rader på mobil, 2 från sm. */}
            <Linjer className="absolute inset-x-[-1.5rem] top-1/2 -z-10 h-[5.2em] w-[calc(100%+3rem)] -translate-y-1/2 text-[clamp(2.3rem,7.2vw,6.5rem)] text-ink/70 sm:inset-x-[-2.5rem] sm:h-[3.7em] sm:w-[calc(100%+5rem)]" />
            <h1
              id="hero-rubrik"
              className="max-w-[15ch] text-center text-[clamp(2.3rem,7.2vw,6.5rem)] sm:max-w-[21ch] leading-[1.02] text-balance"
            >
              {avstava("Marknadsföringsbyrå")} som <Mark>gör jobbet åt er</Mark>
            </h1>
          </div>

          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="text-lg leading-relaxed text-ink/80">
              Vi tar fram marknadsföringsbilder och video, sköter SEO, GEO och Meta-annonser och
              bygger hemsidor som säljer – för företag i hela Sverige. Marknadsföring från{" "}
              {kr(PRIS.start)} i månaden, exkl. moms.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <BokaKnapp />
              <Link to="/priser" className="btn-base btn-outline">
                Se priser
              </Link>
            </div>
            <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-ink/80">
              {LOFTEN_KORT.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-4 text-brand" strokeWidth={3} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tjänster */}
      <section id="tjanster" className="relative isolate">
        <Blob className="absolute -top-10 -right-40 -z-10 w-[30rem] opacity-35 sm:-right-24" />
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <p className="eyebrow">Tjänster</p>
            <Heading className="mt-8 max-w-3xl text-4xl sm:text-5xl">
              Från idé till{" "}
              <Tusch className="ml-[0.1em] px-[0.3em]">
                <Mark>synlighet</Mark>
              </Tusch>
            </Heading>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {OMRADEN.map((o, i) => (
              <Reveal key={o.titel} delay={i * 70}>
                <Link
                  {...o.till}
                  className={`group flex h-full min-h-[18rem] flex-col justify-between rounded-[2rem] p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:p-8 ${o.stil}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-full bg-white/20 ring-1 ring-current/15">
                      <o.ikon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="grid size-11 place-items-center rounded-full bg-white text-brand transition-colors group-hover:bg-sun group-hover:text-ink">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-10">
                    <h3 className="text-3xl">{o.titel}</h3>
                    <p className="mt-3 leading-relaxed opacity-90">{o.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Varför TAB – vad som krävs för att lyckas digitalt */}
      <section aria-labelledby="lyckas-rubrik" className="bg-fade-tint py-12 sm:py-16">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <Heading className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              <span id="lyckas-rubrik">
                Det här krävs för att <Mark>lyckas</Mark> digitalt
              </span>
            </Heading>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Digital marknadsföring är många hantverk på en gång. Ni kan lära er alla själva, eller
              låta oss sköta dem medan ni driver företaget.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <LyckasDigitalt />
          </Reveal>
        </div>
      </section>

      {/* Tidigare projekt */}
      <section aria-labelledby="projekt-rubrik" className="relative isolate">
        <Blob className="absolute top-1/2 -left-48 -z-10 w-[32rem] -translate-y-1/2 opacity-35" />
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <p className="eyebrow">Projekt</p>
            <Heading className="mt-4 max-w-2xl text-4xl sm:text-5xl">
              <span id="projekt-rubrik">
                Några av våra <Mark>tidigare projekt</Mark>
              </span>
            </Heading>
          </Reveal>
          <ProjektLista className="mt-10" />

          <Reveal className="mt-14">
            <h3 className="text-3xl sm:text-4xl">
              Marknadsföringsbilder vi <Mark>tagit fram</Mark>
            </h3>
          </Reveal>
          <BildGalleri className="mt-8" />
        </div>
      </section>

      {/* Om oss */}
      <section className="relative isolate">
        <Blob className="absolute top-1/2 -right-40 -z-10 hidden w-[30rem] -translate-y-1/2 opacity-35 lg:block" />
        <div className="container-page grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">Om {FORETAG.kortnamn}</p>
            <Heading className="mt-4 max-w-2xl text-4xl sm:text-5xl">
              Marknadsföring utan <Mark>krångel</Mark>
            </Heading>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {FORETAG.namn} hjälper företag i hela Sverige med bilder, synlighet och hemsidor. Ni
              får fasta priser, en kontakt och ett jobb som blir gjort.
            </p>
            <Link to="/om-oss" className="btn-base btn-outline mt-8">
              Läs mer om oss
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <dl className="grid grid-cols-2 gap-4">
              <div className="rounded-[2rem] bg-brand p-6 text-white">
                <dt className="text-xs font-bold tracking-[0.14em] text-white/85 uppercase">
                  Fokus
                </dt>
                <dd className="mt-3 font-display text-2xl sm:text-4xl">Marknadsföring</dd>
              </div>
              <div className="rounded-[2rem] bg-ink p-6 text-white">
                <dt className="text-xs font-bold tracking-[0.14em] text-sun uppercase">Område</dt>
                <dd className="mt-3 font-display text-2xl sm:text-4xl">Hela Sverige</dd>
              </div>
              <div className="col-span-2 rounded-[2rem] bg-tint p-6">
                <dt className="text-xs font-bold tracking-[0.14em] text-brand uppercase">
                  Arbetssätt
                </dt>
                <dd className="mt-3 font-display text-3xl text-ink">
                  Idé · Produktion · Uppföljning
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor-rubrik" className="bg-fade-tint py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Vanliga frågor</p>
            <Heading className="mt-4 text-4xl sm:text-5xl">
              <span id="fragor-rubrik">
                Innan ni anlitar en <Mark>marknadsföringsbyrå</Mark>
              </span>
            </Heading>
          </Reveal>
          <Reveal delay={80}>
            <VanligaFragor fragor={HEM_FRAGOR} />
          </Reveal>
        </div>
      </section>

      <BokaPanel />
    </>
  );
}
