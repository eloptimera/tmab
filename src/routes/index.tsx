import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Blob, Linjer } from "@/components/Brand";
import { Heading, Mark } from "@/components/Heading";
import { LyckasDigitalt } from "@/components/LyckasDigitalt";
import { Reveal } from "@/components/Reveal";
import { Tusch } from "@/components/Tusch";
import { BILDER, PROJEKT } from "@/lib/projekt";
import { FORETAG } from "@/lib/foretag";
import { kr, PRIS } from "@/lib/priser";
import { sidhuvud } from "@/lib/seo";
import { TJANSTER } from "@/lib/tjanster";

export const Route = createFileRoute("/")({
  head: () =>
    sidhuvud({
      titel: "Marknadsföringsbyrå i Göteborg",
      beskrivning: `Vi tar fram marknadsföringsbilder, sköter SEO, GEO och Meta-annonser och bygger hemsidor åt företag. Fasta priser från ${kr(PRIS.start)}/mån. Boka gratis genomgång.`,
      sokvag: "/",
    }),
  component: Start,
});

// Två rader med tre kort – färgerna förskjuts ett steg per rad.
const KORTSTIL = [
  "bg-brand text-white",
  "border-2 border-line bg-white text-ink",
  "bg-ink text-white",
  "border-2 border-line bg-white text-ink",
  "bg-ink text-white",
  "bg-brand text-white",
] as const;

function Start() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto flex max-w-[88rem] flex-col px-6 pt-6 pb-8 sm:px-10 lg:min-h-[min(42rem,calc(100svh-4.5rem))] lg:pb-6">
          <div className="caps flex items-start justify-between gap-6 text-ink max-sm:justify-end">
            <span aria-hidden="true" className="hidden sm:inline">
              Bilder · SEO & GEO · Annonser · Hemsidor
            </span>
            <span>{FORETAG.ort} · Marknadsföringsbyrå</span>
          </div>

          {/* Ordbild över blob och linjer */}
          <div className="relative my-10 flex flex-1 items-center justify-center lg:my-4">
            <Blob className="absolute top-1/2 left-1/2 -z-10 w-[min(72vw,44rem)] -translate-x-[48%] -translate-y-[56%]" />
            <Linjer className="absolute inset-x-[-1.5rem] top-1/2 -z-10 h-[min(34vw,26rem)] min-h-40 w-[calc(100%+3rem)] -translate-y-1/2 text-ink/80 sm:inset-x-[-2.5rem] sm:w-[calc(100%+5rem)]" />
            <p
              aria-hidden="true"
              className="font-display text-[min(17vw,14rem)] leading-[0.9] font-medium tracking-[-0.02em] text-ink uppercase select-none"
            >
              {FORETAG.kortnamn}
            </p>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <h1 className="max-w-2xl text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.12]">
              Marknadsföringsbyrå i {FORETAG.ort} som <Mark>gör jobbet åt er</Mark>
            </h1>
            <div>
              <p className="max-w-md leading-relaxed text-ink/80">
                Marknadsföringsbilder, SEO, GEO, Meta-annonser och hemsidor – till fasta priser från{" "}
                {kr(PRIS.start)} i månaden, exkl. moms. Börja med en gratis genomgång.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <BokaKnapp />
                <Link to="/priser" className="btn-base btn-outline">
                  Se priser
                </Link>
              </div>
            </div>
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
            {TJANSTER.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 3) * 70}>
                <Link
                  to="/tjanster/$slug"
                  params={{ slug: t.slug }}
                  className={`group flex h-full min-h-[15rem] flex-col justify-between rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${KORTSTIL[i]}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-full bg-white/20 ring-1 ring-current/15">
                      <t.ikon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="grid size-11 place-items-center rounded-full bg-white text-brand transition-colors group-hover:bg-sun group-hover:text-ink">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-3xl">{t.titel}</h3>
                    <p className="mt-3 leading-relaxed opacity-90">{t.vad}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Varför Treatly – vad som krävs för att lyckas digitalt */}
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
              Digital marknadsföring är sex hantverk på en gång. Ni kan lära er alla själva, eller
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
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {PROJEKT.map((p, i) => (
              <li key={p.url} className="h-full">
                <Reveal delay={i * 80} className="h-full">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-line bg-white transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative isolate grid aspect-[16/10] place-items-center overflow-hidden bg-tint">
                      <span
                        aria-hidden="true"
                        className="absolute top-[18%] left-[16%] -z-10 size-[58%] rounded-full blur-2xl transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `radial-gradient(circle, ${p.farger[0]} 0%, transparent 70%)`,
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute right-[12%] bottom-[8%] -z-10 size-[54%] rounded-full blur-2xl transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `radial-gradient(circle, ${p.farger[1]} 0%, transparent 70%)`,
                        }}
                      />
                      <span className="px-4 text-center font-display text-[clamp(1.75rem,2.7vw,2.6rem)] tracking-[0.04em] text-ink uppercase">
                        {p.namn}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">
                        {p.kategori}
                      </p>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{p.text}</p>
                      <span className="mt-auto flex items-center justify-between gap-3 pt-6 font-bold text-ink">
                        {p.doman}
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors group-hover:bg-sun group-hover:text-ink">
                          <ArrowUpRight className="size-5" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="sr-only"> (öppnas i ny flik)</span>
                    </div>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-14">
            <h3 className="text-3xl sm:text-4xl">
              Marknadsföringsbilder vi <Mark>tagit fram</Mark>
            </h3>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {BILDER.map((b, i) => (
              <li key={b.src}>
                <Reveal delay={i * 70}>
                  <figure>
                    <div className="overflow-hidden rounded-[1.5rem] bg-tint">
                      <img
                        src={b.src}
                        alt={b.alt}
                        width={b.bredd}
                        height={b.hojd}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                      />
                    </div>
                    <figcaption className="mt-3 text-xs font-bold tracking-[0.14em] text-ink/70 uppercase">
                      {b.etikett}
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Om oss */}
      <section className="relative isolate">
        <Blob className="absolute top-1/2 -right-40 -z-10 hidden w-[30rem] -translate-y-1/2 opacity-35 lg:block" />
        <div className="container-page grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">Om {FORETAG.kortnamn}</p>
            <Heading className="mt-4 max-w-2xl text-4xl sm:text-5xl">
              Marknadsföring från <Mark>{FORETAG.ort}</Mark>
            </Heading>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {FORETAG.namn} är ett marknadsföringsbolag med säte i {FORETAG.ort}. Vi hjälper
              företag med varumärke, innehåll och kampanjer som når rätt personer.
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
                <dd className="mt-3 font-display text-2xl sm:text-4xl">Marketing</dd>
              </div>
              <div className="rounded-[2rem] bg-ink p-6 text-white">
                <dt className="text-xs font-bold tracking-[0.14em] text-sun uppercase">Säte</dt>
                <dd className="mt-3 font-display text-2xl sm:text-4xl">{FORETAG.ort}</dd>
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

      <BokaPanel />
    </>
  );
}
