import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { skickaBokning } from "@/lib/bokning";
import { FORETAG } from "@/lib/foretag";
import { PAKET } from "@/lib/priser";
import { sidhuvud } from "@/lib/seo";
import { hittaTjanst, TJANSTER } from "@/lib/tjanster";

type Sok = { tjanst?: string; paket?: string };

export const Route = createFileRoute("/kontakt")({
  validateSearch: (sok: Record<string, unknown>): Sok => {
    const ut: Sok = {};
    if (typeof sok["tjanst"] === "string" && hittaTjanst(sok["tjanst"])) ut.tjanst = sok["tjanst"];
    if (typeof sok["paket"] === "string" && PAKET.some((p) => p.id === sok["paket"])) {
      ut.paket = sok["paket"];
    }
    return ut;
  },
  head: () =>
    sidhuvud({
      titel: "Boka gratis genomgång",
      beskrivning:
        "Boka en kostnadsfri genomgång på 20–25 minuter. Vi går igenom er hemsida, synlighet på Google och sociala medier och ger ett skräddarsytt förslag.",
      sokvag: "/kontakt",
    }),
  component: Kontakt,
});

const STEG = [
  {
    titel: "Ni skickar formuläret",
    text: "Berätta kort vilka ni är och vad ni vill ha hjälp med.",
  },
  { titel: "Vi bokar en tid", text: "Vi hör av oss och bokar in 20–25 minuter som passar er." },
  {
    titel: "Ni får ett förslag",
    text: "Vi går igenom er digitala närvaro och ger ett skräddarsytt förslag – helt utan kostnad.",
  },
] as const;

function Kontakt() {
  const sok = Route.useSearch();
  const [skickar, setSkickar] = useState(false);
  const [klart, setKlart] = useState(false);
  const [fel, setFel] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(false);
    setSkickar(true);
    const fd = new FormData(e.currentTarget);
    const text = (namn: string) => String(fd.get(namn) ?? "");
    try {
      await skickaBokning({
        data: {
          namn: text("namn"),
          foretag: text("foretag"),
          epost: text("epost"),
          telefon: text("telefon"),
          webbplats: text("webbplats"),
          tjanster: fd.getAll("tjanster").map(String),
          paket: text("paket"),
          meddelande: text("meddelande"),
          falla: text("falla"),
        },
      });
      setKlart(true);
    } catch {
      setFel(true);
    } finally {
      setSkickar(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Gratis genomgång"
        title={
          <>
            Boka en <Mark>gratis genomgång</Mark>
          </>
        }
        intro="20–25 minuter där vi går igenom er hemsida, er synlighet på Google och i sociala medier. Ni får ett skräddarsytt förslag efteråt – helt utan kostnad."
      />

      <section className="container-page grid gap-14 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Så går det till</h2>
          <ol className="mt-8 space-y-4">
            {STEG.map((s, i) => (
              <li key={s.titel} className="flex gap-5 rounded-[1.5rem] bg-tint p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand font-display text-lg text-white">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-bold text-ink">{s.titel}</span>
                  <span className="mt-1 block leading-relaxed text-muted-foreground">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          {(FORETAG.telefon || FORETAG.epost) && (
            <ul className="mt-8 space-y-3">
              {FORETAG.telefon && (
                <li className="flex items-center gap-3">
                  <Phone className="size-5 text-brand" aria-hidden="true" />
                  <a href={`tel:${FORETAG.telefonLank}`} className="font-bold text-ink underline">
                    {FORETAG.telefon}
                  </a>
                </li>
              )}
              {FORETAG.epost && (
                <li className="flex items-center gap-3">
                  <Mail className="size-5 text-brand" aria-hidden="true" />
                  <a href={`mailto:${FORETAG.epost}`} className="font-bold text-ink underline">
                    {FORETAG.epost}
                  </a>
                </li>
              )}
            </ul>
          )}
        </Reveal>

        <Reveal delay={100}>
          {klart ? (
            <div role="status" className="rounded-[2rem] border-2 border-line bg-white p-8 sm:p-10">
              <h2 className="text-3xl">Tack – vi hör av oss</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Vi har fått er förfrågan och återkommer för att boka en tid för genomgången.
              </p>
              <Link to="/" className="btn-base btn-outline mt-8">
                Till startsidan
              </Link>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="grid gap-6 rounded-[2rem] border-2 border-line bg-white p-7 sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Falt id="namn" etikett="Namn" autoComplete="name" kravs />
                <Falt id="foretag" etikett="Företag" autoComplete="organization" kravs />
                <Falt id="epost" etikett="E-post" typ="email" autoComplete="email" kravs />
                <Falt id="telefon" etikett="Telefon (valfritt)" typ="tel" autoComplete="tel" />
              </div>
              <Falt
                id="webbplats"
                etikett="Er nuvarande hemsida (valfritt)"
                typ="url"
                autoComplete="url"
                platshallare="https://"
              />

              <fieldset>
                <legend className="text-sm font-bold">Vad vill ni ha hjälp med? (valfritt)</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TJANSTER.map((t) => (
                    <label
                      key={t.slug}
                      className="flex min-h-11 cursor-pointer items-center rounded-full border-2 border-line px-4 py-2 text-sm font-bold transition-colors duration-200 hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-light"
                    >
                      <input
                        type="checkbox"
                        name="tjanster"
                        value={t.titel}
                        defaultChecked={sok.tjanst === t.slug}
                        className="sr-only"
                      />
                      {t.titel}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="paket" className="text-sm font-bold">
                  Månadspaket (valfritt)
                </label>
                <select
                  id="paket"
                  name="paket"
                  defaultValue={PAKET.find((p) => p.id === sok.paket)?.namn ?? ""}
                  className="field mt-2"
                >
                  <option value="">Vet inte än</option>
                  {PAKET.map((p) => (
                    <option key={p.id} value={p.namn}>
                      {p.namn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="meddelande" className="text-sm font-bold">
                  Något vi bör veta? (valfritt)
                </label>
                <textarea id="meddelande" name="meddelande" rows={4} className="field mt-2" />
              </div>

              {/* Dolt fält mot skräppost – riktiga besökare ser det aldrig. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
                <label htmlFor="falla">Lämna tomt</label>
                <input id="falla" name="falla" tabIndex={-1} autoComplete="off" />
              </div>

              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" required className="mt-0.5 size-5 shrink-0 accent-brand" />
                <span>
                  Jag samtycker till att {FORETAG.namn} sparar mina uppgifter för att boka
                  genomgången. Läs mer i{" "}
                  <Link to="/integritetspolicy" className="font-bold text-brand underline">
                    integritetspolicyn
                  </Link>
                  .
                </span>
              </label>

              {fel && (
                <p role="alert" className="text-sm font-bold text-destructive">
                  Förfrågan kunde inte skickas. Försök igen om en stund
                  {FORETAG.epost ? ` eller mejla ${FORETAG.epost}` : ""}.
                </p>
              )}

              <div>
                <button type="submit" disabled={skickar} className="btn-base btn-dark">
                  {skickar ? "Skickar …" : "Boka gratis genomgång"}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}

function Falt({
  id,
  etikett,
  typ = "text",
  autoComplete,
  platshallare,
  kravs = false,
}: {
  id: string;
  etikett: string;
  typ?: "text" | "email" | "tel" | "url";
  autoComplete: string;
  platshallare?: string;
  kravs?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold">
        {etikett}
      </label>
      <input
        id={id}
        name={id}
        type={typ}
        autoComplete={autoComplete}
        placeholder={platshallare}
        required={kravs}
        className="field mt-2"
      />
    </div>
  );
}
