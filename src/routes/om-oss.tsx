import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, LineChart, UserRound } from "lucide-react";
import { BokaPanel } from "@/components/Boka";
import { Heading, Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { sidhuvud } from "@/lib/seo";

export const Route = createFileRoute("/om-oss")({
  head: () =>
    sidhuvud({
      titel: "Om oss – marknadsföring i Göteborg",
      beskrivning: `${FORETAG.namn} är en marknadsföringsbyrå i ${FORETAG.ort}. Vi tar fram bilder, sköter SEO, GEO och annonser och bygger hemsidor åt företag.`,
      sokvag: "/om-oss",
    }),
  component: OmOss,
});

// TODO(Treatly): byt till era egna värderingar.
const VARDERINGAR = [
  {
    ikon: UserRound,
    titel: "En kontakt hela vägen",
    text: "Du har en person att prata med, från första idé till färdig publicering.",
    stil: "bg-brand text-white",
  },
  {
    ikon: Lightbulb,
    titel: "Kreativt och genomtänkt",
    text: "Idéer som sticker ut, men som alltid utgår från vad verksamheten behöver.",
    stil: "bg-ink text-white",
  },
  {
    ikon: LineChart,
    titel: "Resultat du kan följa",
    text: "Vi sätter mål innan vi börjar och redovisar tydligt vad insatserna gav.",
    stil: "bg-tint text-ink",
  },
] as const;

const FAKTA = [
  { rubrik: "Företag", varde: FORETAG.namn },
  { rubrik: "Organisationsnummer", varde: FORETAG.orgnr },
  { rubrik: "Bransch", varde: "Marknadsföring & kommunikation" },
  { rubrik: "Säte", varde: FORETAG.ort },
  { rubrik: "Adress", varde: FORETAG.adress },
] as const;

const initialer = (namn: string) =>
  namn
    .split(" ")
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .map((d) => d[0])
    .join("");

function OmOss() {
  return (
    <>
      <PageHero
        eyebrow="Om oss"
        title={
          <>
            Marknadsföring från <Mark>{FORETAG.ort}</Mark>
          </>
        }
        intro={`${FORETAG.namn} är ett marknadsföringsbolag med säte i ${FORETAG.ort}. Vi hjälper företag med varumärke, innehåll och kampanjer.`}
      />

      <section className="container-page grid gap-4 py-20 md:grid-cols-3 sm:py-28">
        {VARDERINGAR.map((v, i) => (
          <Reveal key={v.titel} delay={i * 90}>
            <article className={`h-full rounded-[2rem] p-8 ${v.stil}`}>
              <span className="grid size-14 place-items-center rounded-full bg-white/20">
                <v.ikon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-8 text-3xl">{v.titel}</h2>
              <p className="mt-3 leading-relaxed opacity-90">{v.text}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="bg-fade-tint py-14 sm:py-20">
        <div
          className={`container-page grid gap-12 lg:gap-20 ${FORETAG.personer.length > 0 ? "lg:grid-cols-2" : "max-w-3xl"}`}
        >
          <Reveal>
            {FORETAG.personer.length > 0 && (
              <>
                <p className="eyebrow">Teamet</p>
                <Heading className="mt-4 text-4xl sm:text-5xl">Ledningen</Heading>
                <ul className="mt-8 space-y-3">
                  {FORETAG.personer.map((p) => (
                    <li key={p.namn} className="flex items-center gap-4 rounded-3xl bg-white p-4">
                      <span
                        aria-hidden="true"
                        className="grid size-14 shrink-0 place-items-center rounded-full bg-brand font-display text-xl text-white"
                      >
                        {initialer(p.namn)}
                      </span>
                      <span>
                        <span className="block font-bold text-ink">{p.namn}</span>
                        <span className="text-sm text-muted-foreground">{p.roll}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Fakta om företaget</p>
            <dl className="mt-6 divide-y-2 divide-line rounded-[2rem] bg-white px-6 py-2 sm:px-8">
              {FAKTA.filter((f) => f.varde).map((f) => (
                <div key={f.rubrik} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-sm font-bold text-ink">{f.rubrik}</dt>
                  <dd className="text-muted-foreground">{f.varde}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <BokaPanel />
    </>
  );
}
