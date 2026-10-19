import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, LayoutTemplate } from "lucide-react";
import { BokaPanel } from "@/components/Boka";
import { Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { GUIDER, lastid } from "@/lib/guider";
import { LANDNINGSSIDOR } from "@/lib/landningssidor";
import { brodsmulor, sidhuvud } from "@/lib/seo";
import { avstava } from "@/lib/text";

export const Route = createFileRoute("/guider/")({
  head: () =>
    sidhuvud({
      titel: "Guider om SEO, GEO och Google Search Console",
      beskrivning:
        "Gratis guider för företag som vill synas bättre på Google och i AI-assistenter som ChatGPT. Konkreta steg du kan göra själv.",
      sokvag: "/guider",
      schema: [
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Guider", sokvag: "/guider" },
        ]),
      ],
    }),
  component: Guider,
});

function Guider() {
  return (
    <>
      <PageHero
        eyebrow="Guider"
        title={
          <>
            Gör det själv – <Mark>steg för steg</Mark>
          </>
        }
        intro="Konkreta guider om hur ditt företag syns på Google och i AI-assistenter. Gratis att läsa, och det mesta kan du göra själv."
      />

      <ul className="container-page grid gap-5 py-14 sm:py-20 lg:grid-cols-3">
        {GUIDER.map((g, i) => (
          <li key={g.slug}>
            <Reveal delay={i * 60} className="h-full">
              <Link
                to="/guider/$slug"
                params={{ slug: g.slug }}
                className="kortskugga group flex h-full flex-col rounded-[2rem] border-2 border-line bg-white p-7 transition-colors hover:border-ink sm:p-8"
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" aria-hidden="true" />
                  {lastid(g)} min läsning
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl">{avstava(g.titel)}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                  {g.seoBeskrivning}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-ink">
                  Läs guiden
                  <ArrowRight
                    className="size-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
        {/* Landningssidor med samma kort som guiderna, så att de går att hitta härifrån. */}
        {LANDNINGSSIDOR.map((l, i) => (
          <li key={l.sokvag}>
            <Reveal delay={(GUIDER.length + i) * 60} className="h-full">
              <Link
                to={l.sokvag}
                className="kortskugga group flex h-full flex-col rounded-[2rem] border-2 border-line bg-white p-7 transition-colors hover:border-ink sm:p-8"
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LayoutTemplate className="size-4" aria-hidden="true" />
                  {l.etikett}
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl">{avstava(l.titel)}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{l.kortText}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-ink">
                  Läs mer
                  <ArrowRight
                    className="size-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <BokaPanel />
    </>
  );
}
