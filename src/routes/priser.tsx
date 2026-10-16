import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Blob } from "@/components/Brand";
import { Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import {
  ENGANGSTJANSTER,
  KONSULTATION,
  PAKET,
  PAKET_VILLKOR,
  type Paket,
  type Prisrad,
} from "@/lib/priser";

export const Route = createFileRoute("/priser")({
  head: () => ({
    meta: [
      { title: "Priser – Treatly – Marketing AB" },
      {
        name: "description",
        content:
          "Månadspaket från 2 995 kr, engångstjänster och gratis första konsultation. Se vad marknadsföringsbilder, SEO/GEO, Meta-annonser och hemsida kostar.",
      },
      { property: "og:title", content: "Priser – Treatly – Marketing AB" },
      { property: "og:url", content: "/priser" },
    ],
    links: [{ rel: "canonical", href: "/priser" }],
  }),
  component: Priser,
});

function Paketkort({ p }: { p: Paket }) {
  const utvalt = p.utvalt === true;
  return (
    <article
      aria-labelledby={`paket-${p.id}`}
      className={`relative flex h-full flex-col rounded-[2rem] p-7 sm:p-9 ${
        utvalt ? "bg-brand text-white lg:-my-4 lg:py-12" : "border-2 border-line bg-white text-ink"
      }`}
    >
      {utvalt && (
        <span className="absolute -top-3.5 left-7 -rotate-[2deg] rounded-full bg-sun px-4 py-1.5 text-xs font-bold tracking-[0.14em] text-ink uppercase shadow-[3px_3px_0_var(--ink)] sm:left-9">
          Rekommenderas
        </span>
      )}
      <h3
        id={`paket-${p.id}`}
        className={`font-sans text-xs font-bold tracking-[0.22em] uppercase ${
          utvalt ? "text-white/85" : "text-brand"
        }`}
      >
        {p.namn}
      </h3>
      <p className="mt-5 font-display text-5xl leading-none sm:text-6xl">{p.pris}</p>
      <p className={`mt-2 text-sm ${utvalt ? "text-white/80" : "text-muted-foreground"}`}>
        {p.per}
      </p>

      <ul
        className={`mt-8 space-y-3.5 border-t pt-8 ${utvalt ? "border-white/25" : "border-line"}`}
      >
        {p.ingar.map((rad) => (
          <li key={rad} className="flex gap-3">
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full ${
                utvalt ? "bg-white text-brand" : "bg-brand text-white"
              }`}
            >
              <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className={utvalt ? "font-bold" : ""}>{rad}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-9">
        <Link to="/offert" className={`btn-base w-full ${utvalt ? "btn-white" : "btn-dark"}`}>
          Välj {p.namn}
        </Link>
      </div>
    </article>
  );
}

function Pristabell({
  id,
  rubrik,
  rader,
}: {
  id: string;
  rubrik: string;
  rader: readonly Prisrad[];
}) {
  return (
    <div className="rounded-[2rem] border-2 border-line bg-white px-5 py-2 sm:px-9">
      <table className="w-full border-collapse text-left" aria-labelledby={id}>
        <caption className="sr-only">{rubrik}</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Tjänst</th>
            <th scope="col">Pris</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-line">
          {rader.map((r) => {
            const gratis = r.pris === "Gratis";
            return (
              <tr key={r.tjanst}>
                <th
                  scope="row"
                  className="py-5 pr-3 align-middle font-normal break-words hyphens-auto text-ink sm:pr-4 sm:text-lg"
                >
                  {r.tjanst}
                </th>
                <td className="py-5 text-right align-middle">
                  {gratis ? (
                    <span className="inline-block rounded-full bg-sun px-3.5 py-1 text-sm font-bold text-ink">
                      Gratis
                    </span>
                  ) : (
                    <span
                      className={
                        /\d/.test(r.pris)
                          ? "font-display text-lg text-ink sm:text-2xl"
                          : "inline-block max-w-[9rem] text-sm text-muted-foreground"
                      }
                    >
                      {r.pris.split("–").map((del, i) => (
                        <span key={del}>
                          {i > 0 && (
                            <>
                              –<wbr />
                            </>
                          )}
                          <span className="whitespace-nowrap">{del}</span>
                        </span>
                      ))}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Priser() {
  return (
    <>
      <PageHero
        eyebrow="Priser"
        title={
          <>
            Tydliga priser, <Mark>inga överraskningar</Mark>
          </>
        }
        intro="Välj ett månadspaket, köp en enskild tjänst eller börja med en kostnadsfri konsultation där vi går igenom er digitala närvaro."
      >
        <Link to="/kontakt" className="btn-base btn-dark">
          Boka kostnadsfri konsultation
        </Link>
        <a href="#engangstjanster" className="btn-base btn-outline">
          Se engångstjänster
        </a>
      </PageHero>

      {/* Månadspaket */}
      <section aria-labelledby="manadspaket" className="relative isolate">
        <Blob className="absolute top-1/3 -left-56 -z-10 hidden w-[34rem] opacity-35 lg:block" />
        <div className="container-page py-14 sm:py-20">
          <Reveal>
            <p className="eyebrow">01 · Månadspaket</p>
            <h2 id="manadspaket" className="mt-4 text-4xl sm:text-5xl">
              Löpande hjälp varje <Mark>månad</Mark>
            </h2>
          </Reveal>
          <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
            {PAKET.map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className="h-full">
                <Paketkort p={p} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {PAKET_VILLKOR}
          </p>
        </div>
      </section>

      {/* Engångstjänster och konsultation */}
      <section className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-10">
          <Reveal className="min-w-0">
            <p className="eyebrow">02 · Engångstjänster</p>
            <h2 id="engangstjanster" className="mt-4 scroll-mt-28 text-3xl sm:text-4xl">
              Köp det ni behöver, <Mark>en gång</Mark>
            </h2>
            <div className="mt-8">
              <Pristabell id="engangstjanster" rubrik="Engångstjänster" rader={ENGANGSTJANSTER} />
            </div>
          </Reveal>
          <Reveal delay={100} className="min-w-0">
            <p className="eyebrow">03 · Konsultation och uppstart</p>
            <h2 id="konsultation" className="mt-4 text-3xl sm:text-4xl">
              Första steget är <Mark>gratis</Mark>
            </h2>
            <div className="mt-8">
              <Pristabell
                id="konsultation"
                rubrik="Konsultation och uppstart"
                rader={KONSULTATION}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Avslut */}
      <section className="px-3 pb-3 sm:px-6">
        <Reveal>
          <div className="panel-ink relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] px-6 py-16 sm:px-14 sm:py-20">
            <Blob className="absolute top-1/2 -right-24 -z-10 hidden w-[34rem] -translate-y-1/2 lg:block" />
            <p className="caps text-white/70">Osäker på vilket paket?</p>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05]">
              Vi går igenom er närvaro <Mark>kostnadsfritt</Mark>
            </h2>
            <p className="mt-5 max-w-xl text-white/80">
              20–25 minuter, ett skräddarsytt förslag efteråt och inga förpliktelser.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/kontakt" className="btn-base btn-white">
                Boka kostnadsfri konsultation
              </Link>
              <Link to="/offert" className="btn-base btn-outline-white">
                Få fri offert
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
