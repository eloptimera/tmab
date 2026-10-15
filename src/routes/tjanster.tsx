import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { TJANSTER } from "@/lib/tjanster";

export const Route = createFileRoute("/tjanster")({
  head: () => ({
    meta: [
      { title: "Tjänster – Treatly – Marketing AB" },
      {
        name: "description",
        content:
          "Varumärke, innehåll och kampanjer för företag som vill synas och växa. Fri offert.",
      },
      { property: "og:title", content: "Tjänster – Treatly – Marketing AB" },
      { property: "og:url", content: "/tjanster" },
    ],
    links: [{ rel: "canonical", href: "/tjanster" }],
  }),
  component: Tjanster,
});

function Tjanster() {
  return (
    <>
      <PageHero
        eyebrow="Tjänster"
        title={
          <>
            Marknadsföring som passar <Mark>din verksamhet</Mark>
          </>
        }
        intro="Varumärke, innehåll och kampanjer för företag som vill synas och växa."
      >
        <Link to="/offert" className="btn-base btn-dark">
          Få fri offert
        </Link>
        <Link to="/kontakt" className="btn-base btn-outline">
          Kontakta oss
        </Link>
      </PageHero>

      <div className="container-page grid gap-5 py-20 sm:py-28">
        {TJANSTER.map((t, i) => (
          <Reveal key={t.id}>
            <section
              id={t.id}
              aria-labelledby={`${t.id}-rubrik`}
              className={`grid gap-8 rounded-[2rem] p-7 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 ${
                i % 2 === 0 ? "bg-tint" : "border-2 border-line bg-white"
              }`}
            >
              <div>
                <span className="grid size-16 place-items-center rounded-full bg-brand text-white">
                  <t.ikon className="size-7" aria-hidden="true" />
                </span>
                <h2 id={`${t.id}-rubrik`} className="mt-6 text-3xl sm:text-4xl">
                  {t.titel}
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                  {t.kort}
                </p>
              </div>
              <div>
                <ul className="space-y-3">
                  {t.punkter.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 rounded-2xl bg-white p-4 text-ink shadow-sm shadow-brand/10"
                    >
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-brand"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/offert" className="btn-base btn-dark mt-6">
                  Begär offert på {t.titel.toLowerCase()}
                </Link>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </>
  );
}
