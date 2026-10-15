import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { skickaOffert } from "@/lib/formular";

export const Route = createFileRoute("/offert")({
  head: () => ({
    meta: [
      { title: "Få fri offert – Treatly – Marketing AB" },
      {
        name: "description",
        content:
          "Berätta vad du behöver hjälp med och få en fri offert från Treatly – Marketing AB.",
      },
      { property: "og:title", content: "Få fri offert – Treatly – Marketing AB" },
      {
        property: "og:description",
        content: "Berätta vad du behöver hjälp med och få en fri offert.",
      },
      { property: "og:url", content: "/offert" },
    ],
    links: [{ rel: "canonical", href: "/offert" }],
  }),
  component: Offert,
});

const UPPDRAGSTYPER = [
  "Varumärke & strategi",
  "Innehåll & sociala medier",
  "Kampanjer & annonsering",
  "Annat",
];

function Offert() {
  const [typer, setTyper] = useState<string[]>([]);
  const [filer, setFiler] = useState<File[]>([]);
  const [skickar, setSkickar] = useState(false);
  const [klart, setKlart] = useState(false);
  const [fel, setFel] = useState<string | null>(null);

  const vaxla = (t: string) =>
    setTyper((v) => (v.includes(t) ? v.filter((x) => x !== t) : [...v, t]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(null);
    setSkickar(true);

    const fd = new FormData(e.currentTarget);
    try {
      const budget = fd.get("budget");
      const datum = fd.get("onskat_startdatum");

      await skickaOffert(
        {
          namn: String(fd.get("namn") ?? ""),
          telefon: String(fd.get("telefon") ?? ""),
          epost: String(fd.get("epost") ?? ""),
          foretag: String(fd.get("foretag") ?? ""),
          uppdragstyper: typer,
          budget: budget ? String(budget) : null,
          onskat_startdatum: datum ? String(datum) : null,
          meddelande: String(fd.get("meddelande") ?? ""),
          gdpr_samtycke: true,
        },
        filer,
      );
      setKlart(true);
    } catch {
      setFel("Något gick fel när förfrågan skulle skickas. Försök igen om en stund.");
    } finally {
      setSkickar(false);
    }
  }

  if (klart) {
    return (
      <section className="container-page py-28">
        <div
          role="status"
          className="mx-auto max-w-xl rounded-[2rem] border-2 border-line bg-white p-10 text-center"
        >
          <p className="eyebrow">Tack!</p>
          <h1 className="mt-5 text-3xl">Din förfrågan är mottagen</h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Vi återkommer så snart vi kan.
            {FORETAG.telefon && ` Är det brådskande går det bra att ringa ${FORETAG.telefon}.`}
          </p>
          <Link to="/" className="btn-base btn-outline mt-8">
            Tillbaka till startsidan
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Offertförfrågan"
        title={
          <>
            Berätta vad du behöver <Mark>hjälp med</Mark>
          </>
        }
        intro="Ju mer du berättar, desto bättre underlag får vi till din offert. Offerten är fri."
      />

      <section className="container-page py-16 sm:py-24">
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="grid max-w-3xl gap-6 rounded-[2rem] border-2 border-line bg-white p-8 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="namn" className="text-sm font-bold">
                  Namn
                </label>
                <input id="namn" name="namn" required className="field mt-2" />
              </div>
              <div>
                <label htmlFor="telefon" className="text-sm font-bold">
                  Telefon
                </label>
                <input id="telefon" name="telefon" type="tel" required className="field mt-2" />
              </div>
              <div>
                <label htmlFor="epost" className="text-sm font-bold">
                  E-post
                </label>
                <input id="epost" name="epost" type="email" required className="field mt-2" />
              </div>
              <div>
                <label htmlFor="foretag" className="text-sm font-bold">
                  Företag
                </label>
                <input id="foretag" name="foretag" required className="field mt-2" />
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-bold">Typ av uppdrag</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {UPPDRAGSTYPER.map((t) => (
                  <label
                    key={t}
                    className={`flex min-h-11 cursor-pointer items-center rounded-full border-2 px-5 py-2 text-sm font-bold transition-colors duration-200 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-light ${
                      typer.includes(t)
                        ? "border-brand bg-brand text-white"
                        : "border-line hover:border-brand"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={typer.includes(t)}
                      onChange={() => vaxla(t)}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="text-sm font-bold">
                  Ungefärlig budget (valfritt)
                </label>
                <input
                  id="budget"
                  name="budget"
                  className="field mt-2"
                  placeholder="t.ex. 20 000 kr"
                />
              </div>
              <div>
                <label htmlFor="onskat_startdatum" className="text-sm font-bold">
                  Önskat startdatum
                </label>
                <input
                  id="onskat_startdatum"
                  name="onskat_startdatum"
                  type="date"
                  className="field mt-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="meddelande" className="text-sm font-bold">
                Beskriv uppdraget
              </label>
              <textarea
                id="meddelande"
                name="meddelande"
                rows={5}
                className="field mt-2"
                placeholder="Vad vill ni uppnå, vilken målgrupp vill ni nå, vilka kanaler använder ni i dag …"
              />
            </div>

            <div>
              <label htmlFor="bilder" className="text-sm font-bold">
                Bifoga material (valfritt)
              </label>
              <input
                id="bilder"
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={(e) => setFiler(Array.from(e.target.files ?? []))}
                className="field mt-2 file:mr-4 file:rounded-full file:border-0 file:font-bold file:bg-sun file:text-ink file:px-3 file:py-1.5 file:text-sm"
              />
              {filer.length > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">{filer.length} fil(er) valda</p>
              )}
            </div>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 size-5 shrink-0 accent-brand" />
              <span>
                Jag samtycker till att {FORETAG.namn} lagrar mina uppgifter för att kunna besvara
                min förfrågan. Läs mer i{" "}
                <Link to="/integritetspolicy" className="font-bold text-brand underline">
                  integritetspolicyn
                </Link>
                .
              </span>
            </label>

            {fel && (
              <p role="alert" className="text-sm font-bold text-destructive">
                {fel}
              </p>
            )}

            <div>
              <button type="submit" disabled={skickar} className="btn-base btn-dark">
                {skickar ? "Skickar …" : "Skicka förfrågan"}
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}
