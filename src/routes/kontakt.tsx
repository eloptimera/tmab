import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHero, Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { skickaKontakt } from "@/lib/formular";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Treatly – Marketing AB" },
      {
        name: "description",
        content: "Kontakta Treatly – Marketing AB. Skicka ett meddelande så återkommer vi.",
      },
      { property: "og:title", content: "Kontakt – Treatly – Marketing AB" },
      {
        property: "og:description",
        content: "Kontaktuppgifter till Treatly – Marketing AB.",
      },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: Kontakt,
});

function Kontakt() {
  const [skickar, setSkickar] = useState(false);
  const [klart, setKlart] = useState(false);
  const [fel, setFel] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(null);
    setSkickar(true);
    const fd = new FormData(e.currentTarget);
    try {
      await skickaKontakt({
        namn: String(fd.get("namn") ?? ""),
        epost: String(fd.get("epost") ?? ""),
        telefon: String(fd.get("telefon") ?? ""),
        meddelande: String(fd.get("meddelande") ?? ""),
      });
      setKlart(true);
    } catch {
      setFel("Meddelandet kunde inte skickas. Försök igen om en stund.");
    } finally {
      setSkickar(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Hör av dig – vi <Mark>återkommer</Mark>
          </>
        }
        intro="Skicka ett meddelande så svarar vi så snart vi kan."
      />

      <section className="container-page grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <ul className="space-y-4">
            {FORETAG.telefon && (
              <li className="flex gap-4 rounded-3xl bg-tint p-6">
                <Phone className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="eyebrow">Telefon</p>
                  <a
                    href={`tel:${FORETAG.telefonLank}`}
                    className="mt-1 block font-display text-2xl text-ink hover:text-brand"
                  >
                    {FORETAG.telefon}
                  </a>
                </div>
              </li>
            )}
            {FORETAG.epost && (
              <li className="flex gap-4 rounded-3xl bg-tint p-6">
                <Mail className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="eyebrow">E-post</p>
                  <a
                    href={`mailto:${FORETAG.epost}`}
                    className="mt-1 block font-bold text-ink hover:text-brand"
                  >
                    {FORETAG.epost}
                  </a>
                </div>
              </li>
            )}
            <li className="flex gap-4 rounded-3xl bg-tint p-6">
              <MapPin className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <p className="eyebrow">Adress</p>
                <address className="mt-1 font-bold text-ink not-italic">
                  {FORETAG.namn}
                  {FORETAG.gata && (
                    <>
                      <br />
                      {FORETAG.gata}
                    </>
                  )}
                  <br />
                  {FORETAG.postnummer} {FORETAG.ort}
                </address>
                {FORETAG.adress && (
                  <a
                    href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(FORETAG.adress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-bold text-brand underline"
                  >
                    Visa på karta
                  </a>
                )}
              </div>
            </li>
            {FORETAG.oppettider.length > 0 && (
              <li className="flex gap-4 rounded-3xl bg-tint p-6">
                <Clock className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="eyebrow">Öppettider kundtjänst</p>
                  <dl className="mt-2 space-y-1 text-sm">
                    {FORETAG.oppettider.map((o) => (
                      <div key={o.dagar} className="flex justify-between gap-6">
                        <dt className="font-bold text-ink">{o.dagar}</dt>
                        <dd className="text-muted-foreground">{o.tid}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          {klart ? (
            <div role="status" className="rounded-[2rem] border-2 border-line bg-white p-8 sm:p-10">
              <h2 className="text-3xl">Tack för ditt meddelande</h2>
              <p className="mt-4 text-muted-foreground">Vi återkommer så snart vi kan.</p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="grid gap-5 rounded-[2rem] border-2 border-line bg-white p-8 sm:p-10"
            >
              <h2 className="text-3xl">Skicka ett meddelande</h2>
              <div>
                <label htmlFor="k-namn" className="text-sm font-bold">
                  Namn
                </label>
                <input
                  id="k-namn"
                  name="namn"
                  autoComplete="name"
                  required
                  className="field mt-2"
                />
              </div>
              <div>
                <label htmlFor="k-epost" className="text-sm font-bold">
                  E-post
                </label>
                <input
                  id="k-epost"
                  name="epost"
                  type="email"
                  autoComplete="email"
                  required
                  className="field mt-2"
                />
              </div>
              <div>
                <label htmlFor="k-telefon" className="text-sm font-bold">
                  Telefon (valfritt)
                </label>
                <input
                  id="k-telefon"
                  name="telefon"
                  type="tel"
                  autoComplete="tel"
                  className="field mt-2"
                />
              </div>
              <div>
                <label htmlFor="k-meddelande" className="text-sm font-bold">
                  Meddelande
                </label>
                <textarea
                  id="k-meddelande"
                  name="meddelande"
                  rows={5}
                  required
                  className="field mt-2"
                />
              </div>
              {fel && (
                <p role="alert" className="text-sm font-bold text-destructive">
                  {fel}
                </p>
              )}
              <div>
                <button type="submit" disabled={skickar} className="btn-base btn-dark">
                  {skickar ? "Skickar …" : "Skicka meddelande"}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}
