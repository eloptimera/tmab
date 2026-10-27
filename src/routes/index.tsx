import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clapperboard, Megaphone, Search } from "lucide-react";
import { Blob } from "@/components/Brand";
import { Fyrscen } from "@/components/Fyrscen";
import { Masterverket } from "@/components/Masterverket";
import { Heading, Mark } from "@/components/Heading";
import { LyckasDigitalt } from "@/components/LyckasDigitalt";
import { BildGalleri, ProjektLista } from "@/components/Projekt";
import { ProjektVideo } from "@/components/ProjektVideo";
import { Reveal } from "@/components/Reveal";
import { Tusch } from "@/components/Tusch";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { BINDNING_TEXT, kr, LAGSTA_MANADSPRIS, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";
import { PROJEKT_VIDEO } from "@/lib/projekt";
import { faqSchema, sidhuvud, videoSchema } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    sidhuvud({
      titel: "Marknadsföringsbyrå för företag",
      beskrivning: `Vi tar fram marknadsföringsbilder, sköter SEO, GEO och Meta-annonser och bygger hemsidor åt företag. Marknadsföring från ${kr(LAGSTA_MANADSPRIS)}/mån. Boka gratis genomgång.`,
      sokvag: "/",
      schema: [faqSchema(HEM_FRAGOR), videoSchema(PROJEKT_VIDEO.startsida)],
    }),
  component: Start,
});

// Vanliga frågor på startsidan – svarar på det man undrar innan man anlitar en byrå.
// Visas längst ner och som FAQPage-schema.
const HEM_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad gör en marknadsföringsbyrå?",
    svar: "Den hjälper företag att synas och få kunder – på Google, i AI-tjänster, i sociala medier och i annonser. Hos oss betyder det marknadsföringsbilder och video, SEO och GEO, Meta-annonser och hemsidor. Vi gör jobbet åt er i stället för att bara ge råd.",
  },
  {
    fraga: "Vad kostar det att anlita er?",
    svar: `Ni köper det ni behöver: bilder och video från ${kr(PRIS.studioS)}/mån, annonser från ${kr(PRIS.annonser1)}/mån, SEO och GEO från ${kr(PRIS.synlighetBas)}/mån och en ny hemsida från ${kr(PRIS.landningssida)}. Ingen startavgift. ${MOMS_TEXT} Första genomgången är gratis.`,
  },
  {
    fraga: "Arbetar ni med företag i hela Sverige?",
    svar: "Ja. Vi har säte i Göteborg och arbetar digitalt, så det spelar ingen roll var ert företag finns.",
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
      {/* Hero: en inramad målning – rubriken (H1) bär sökfrasen och står på dukens mörka del. */}
      <Masterverket />

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
          <Reveal className="mt-10">
            <ProjektVideo video={PROJEKT_VIDEO.startsida} />
          </Reveal>
          <ProjektLista className="mt-12" />

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

      <Fyrscen />
    </>
  );
}
