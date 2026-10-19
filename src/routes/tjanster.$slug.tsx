import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowRight, FileCheck } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Markerad, Mark, PageHero } from "@/components/Heading";
import { SjalvMotOss } from "@/components/LyckasDigitalt";
import { Reveal } from "@/components/Reveal";
import { Stegliste } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { kr, MOMS_TEXT } from "@/lib/priser";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { avstava } from "@/lib/text";
import { hittaTjanst, TJANSTER, tjanstSokvag, type Tjanst } from "@/lib/tjanster";

export const Route = createFileRoute("/tjanster/$slug")({
  beforeLoad: ({ params }) => {
    // Tjänster med egen landningssida (t.ex. /hemsida-foretag) har bara en adress, så att
    // två sidor inte konkurrerar om samma sökningar. Permanent omdirigering.
    const sida = hittaTjanst(params.slug)?.sida;
    if (sida) throw redirect({ href: sida, statusCode: 301 });
  },
  loader: ({ params }) => {
    if (!hittaTjanst(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const t = hittaTjanst(params.slug);
    if (!t) return {};
    return sidhuvud({
      titel: t.seoTitel,
      beskrivning: t.seoBeskrivning,
      sokvag: `/tjanster/${t.slug}`,
      schema: [
        tjanstSchema(t),
        faqSchema(t.fragor),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
          { namn: t.titel, sokvag: `/tjanster/${t.slug}` },
        ]),
      ],
    });
  },
  component: TjanstSida,
});

function TjanstSida() {
  const { slug } = Route.useParams();
  const t = hittaTjanst(slug);
  if (!t) return null;
  const ovriga = TJANSTER.filter((o) => o.slug !== t.slug);

  return (
    <>
      <PageHero
        eyebrow={`Tjänster · ${t.titel}`}
        title={<Markerad text={t.rubrik.text} markera={t.rubrik.markera} />}
        intro={t.forklaring}
      >
        <BokaKnapp tjanst={t.slug} />
        <a href="#pris" className="btn-base btn-outline">
          Pris: {t.pris.fran ? "från " : ""}
          {kr(t.pris.belopp)}
        </a>
      </PageHero>

      <section aria-labelledby="jamforelse" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Själv eller med oss</p>
          <h2 id="jamforelse" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Det här krävs för {avstava(t.iText)} – <Mark>vi gör det åt er</Mark>
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <SjalvMotOss o={t} />
        </Reveal>
      </section>

      {t.arbetssatt && (
        <section aria-labelledby="arbetssatt" className="container-page pb-14 sm:pb-20">
          <Reveal>
            <p className="eyebrow">Så jobbar vi</p>
            <h2 id="arbetssatt" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Ni godkänner allt <Mark>innan vi bygger</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={t.arbetssatt.steg} rad />
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 flex max-w-3xl gap-3 text-lg leading-relaxed text-ink/80">
              <FileCheck className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
              {t.arbetssatt.underlag}
            </p>
          </Reveal>
        </section>
      )}

      <section className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Pris t={t} />
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">Vanliga frågor</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Frågor om {avstava(t.iText)}</h2>
            <div className="mt-8">
              <VanligaFragor fragor={t.fragor} />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="fler-tjanster" className="container-page py-14 sm:py-20">
        <h2 id="fler-tjanster" className="text-3xl sm:text-4xl">
          Fler <Mark>tjänster</Mark>
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ovriga.map((o) => (
            <li key={o.slug}>
              <Link
                to={tjanstSokvag(o)}
                className="group flex h-full items-center justify-between gap-3 rounded-[1.5rem] border-2 border-line bg-white/80 p-5 transition-colors hover:border-ink"
              >
                <span>
                  <span className="block font-bold text-ink">{o.titel}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                    {o.vad}
                  </span>
                </span>
                <ArrowRight
                  className="size-5 shrink-0 text-ink transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <BokaPanel tjanst={t.slug} />
    </>
  );
}

function Pris({ t }: { t: Tjanst }) {
  return (
    <div id="pris" className="scroll-mt-28 rounded-[2rem] bg-ink p-8 text-white sm:p-10">
      <p className="caps text-sun">Pris</p>
      <p className="mt-5 text-white/80">{t.pris.avser}</p>
      <p className="mt-2 font-display text-5xl leading-none sm:text-6xl">
        {t.pris.fran ? <span className="text-3xl sm:text-4xl">från </span> : null}
        {kr(t.pris.belopp)}
      </p>
      <p className="mt-3 text-sm text-white/70">{MOMS_TEXT}</p>
      {t.iPaket && <p className="mt-8 leading-relaxed text-white/85">{t.iPaket}</p>}
      <div className="mt-8 flex flex-wrap gap-3">
        <BokaKnapp variant="white" tjanst={t.slug} />
        <Link to="/priser" className="btn-base btn-outline-white">
          Alla priser
        </Link>
      </div>
    </div>
  );
}
