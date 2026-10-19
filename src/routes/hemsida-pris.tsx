import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Camera,
  Check,
  FileText,
  Gauge,
  LayoutTemplate,
  Megaphone,
  Minus,
  Palette,
  RefreshCw,
  Search,
  Wrench,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark } from "@/components/Heading";
import { Blob } from "@/components/Brand";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { HEMSIDA_FORETAG } from "@/lib/hemsida-foretag";
import { ARSKOSTNAD, HEMSIDA_PRIS, HEMSIDA_PRIS_FRAGOR } from "@/lib/hemsida-pris";
import {
  AGANDE_TEXT,
  BETALNING_TEXT,
  BINDNING_TEXT,
  kr,
  MOMS_TEXT,
  PAKET,
  PRIS,
} from "@/lib/priser";
import { SEO_BYRA } from "@/lib/seo-byra";
import { SEO_SMAFORETAG } from "@/lib/seo-smaforetag";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";
import { WEBBYRA } from "@/lib/webbyra";

const SIDA = HEMSIDA_PRIS.sokvag;
const TJANST = "hemsida";

export const Route = createFileRoute("/hemsida-pris")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: HEMSIDA_PRIS.seoTitel,
      beskrivning: HEMSIDA_PRIS.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: "Hemsida till företag",
                beskrivning: HEMSIDA_PRIS.seoBeskrivning,
                sokvag: SIDA,
              }),
            ]
          : []),
        faqSchema(HEMSIDA_PRIS_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Priser", sokvag: "/priser" },
          { namn: HEMSIDA_PRIS.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: HemsidaPris,
});

const LANK =
  "font-bold text-ink underline decoration-sun decoration-2 underline-offset-4 hover:decoration-ink";

/** Den del av ett paket som rör hemsidan, SEO eller annonser – hämtas ur paketet självt. */
const rad = (ingar: readonly string[], monster: RegExp) => ingar.find((r) => monster.test(r));

const NY_HEMSIDA_INGAR = [
  "Design efter ert varumärke",
  "Texter och bilder som säljer",
  "Mobilanpassning för alla skärmar",
  "SEO-grund: struktur, rubriker och metadata",
  "Kontaktformulär och tydliga kontaktvägar",
  "En ändringsrunda innan lansering",
  "Ni äger sajten, texterna och bilderna",
] as const;

const NY_HEMSIDA_INGAR_INTE = [
  "Domän och webbhotell – betalas direkt till leverantören, i ert namn",
  "Löpande SEO och ändringar efter lansering – i månadspaket eller enligt offert",
] as const;

type Cell = { text: string; ingar: boolean };
const ja = (text = "Ingår"): Cell => ({ text, ingar: true });
const nej = (text = "Ingår inte"): Cell => ({ text, ingar: false });
const paketCell = (monster: RegExp) =>
  PAKET.map((p) => {
    const r = rad(p.ingar, monster);
    return r ? ja(r) : nej();
  });

const KOLUMNER = ["Ny hemsida", ...PAKET.map((p) => p.namn)] as const;

const JAMFORELSE: readonly { rad: string; celler: readonly Cell[] }[] = [
  { rad: "Webbdesign efter ert varumärke", celler: [ja(), nej("—"), nej("—"), nej("—")] },
  { rad: "Mobilanpassning", celler: [ja(), nej("—"), nej("—"), nej("—")] },
  { rad: "Kontaktformulär", celler: [ja(), nej("—"), nej("—"), nej("—")] },
  { rad: "SEO-grund och metadata", celler: [ja(), nej("—"), nej("—"), nej("—")] },
  { rad: "Ändringsrunda innan lansering", celler: [ja(), nej("—"), nej("—"), nej("—")] },
  {
    rad: "Ändringar efter lansering",
    celler: [nej("Enligt offert"), ...paketCell(/hemsid/i)],
  },
  { rad: "Löpande SEO och GEO", celler: [nej("Tillägg"), ...paketCell(/SEO/)] },
  { rad: "Meta-annonser och cookiebanner", celler: [nej("Tillägg"), ...paketCell(/Meta/)] },
  { rad: "Marknadsföringsbilder", celler: [nej("Tillägg"), ...paketCell(/bilder/)] },
  { rad: "Månadsrapport", celler: [nej("—"), ...paketCell(/rapport/i)] },
];

const FAKTORER: readonly Kort[] = [
  {
    titel: "Antal sidor",
    text: "En sida per tjänst ger bättre synlighet, men varje sida är också arbete.",
    ikon: LayoutTemplate,
  },
  {
    titel: "Design",
    text: "Bygger vi på en befintlig grafisk profil, eller tar vi fram utseendet från början?",
    ikon: Palette,
  },
  {
    titel: "Funktioner",
    text: "Kontaktformulär ingår. Bokning, offertflöden eller annat kan påverka priset.",
    ikon: Wrench,
  },
  {
    titel: "Innehåll",
    text: "Finns texter och bilder, eller ska vi skriva och ta fram dem?",
    ikon: FileText,
  },
  {
    titel: "SEO",
    text: "En SEO-grund ingår alltid. Mer omfattande SEO är en egen tjänst.",
    ikon: Search,
  },
  {
    titel: "Efter lansering",
    text: "Ska vi sköta ändringar löpande, eller tar ni över själva?",
    ikon: Gauge,
  },
];

const KONTROLLERA: readonly { punkt: string; hosOss: string }[] = [
  { punkt: "Startkostnad", hosOss: `Från ${kr(PRIS.hemsida)}, fast pris i offerten` },
  { punkt: "Löpande avgifter", hosOss: "Inga obligatoriska – månadspaket är frivilliga" },
  { punkt: "Vad som ingår", hosOss: "Står i offerten innan ni bestämmer er" },
  { punkt: "Mobilanpassning", hosOss: "Ingår alltid" },
  { punkt: "Grundläggande SEO", hosOss: "Ingår alltid" },
  { punkt: "Ändringar", hosOss: "En runda innan lansering, sedan i paket eller enligt offert" },
  { punkt: "Ägande", hosOss: "Ni äger sajten, domänen och kontona" },
  { punkt: "Om ni slutar", hosOss: "Vi lämnar över all åtkomst och allt material" },
];

const FORETAGSTYPER: readonly { titel: string; text: string }[] = [
  {
    titel: "Nystartade företag",
    text: "Ofta räcker några få sidor: vad ni gör, för vem och hur man når er. Bra struktur från start gör att sajten kan växa utan att byggas om.",
  },
  {
    titel: "Hantverkare",
    text: "En sida per tjänst och ett tydligt offertformulär ger mest – kunder söker på tjänst och ort.",
  },
  {
    titel: "Konsulter",
    text: "Tjänstesidor som visar kompetensen, och gärna några artiklar som svarar på kundernas frågor.",
  },
  {
    titel: "Lokala småföretag",
    text: "Öppettider, karta, tjänster och en enkel väg till kontakt. Google-företagsprofilen gör resten.",
  },
];

const TILLVAL: readonly (Kort & { pris: string; till: string; lanktext: string })[] = [
  {
    titel: "SEO och GEO – grundoptimering",
    text: "Sökordsanalys, teknisk SEO och strukturerad data för Google och AI-tjänster.",
    ikon: Search,
    pris: kr(PRIS.seoGeo),
    till: SEO_BYRA.sokvag,
    lanktext: "SEO och sökmotoroptimering",
  },
  {
    titel: "GEO och AI-synlighet",
    text: "Ingår i grundoptimeringen och löpande i månadspaketen.",
    ikon: Bot,
    pris: "Ingår i SEO och GEO",
    till: tjanstSokvag("geo"),
    lanktext: "GEO-optimering",
  },
  {
    titel: "Meta Ads – uppsättning",
    text: "Konto, spårning, cookiebanner och annonser på Facebook och Instagram.",
    ikon: Megaphone,
    pris: kr(PRIS.metaUppsattning),
    till: tjanstSokvag("meta-annonser"),
    lanktext: "Meta Ads",
  },
  {
    titel: "Uppfräschning",
    text: "Förbättringar av en befintlig sajt – design, struktur och hastighet.",
    ikon: RefreshCw,
    pris: `från ${kr(PRIS.uppfraschning)}`,
    till: tjanstSokvag("hemsideoptimering"),
    lanktext: "Modernisera din hemsida",
  },
  {
    titel: "Marknadsföringsbilder",
    text: "Produkt- och kampanjbilder för hemsidan, sociala medier och annonser.",
    ikon: Camera,
    pris: `från ${kr(PRIS.bilder5)}`,
    till: tjanstSokvag("marknadsforingsbilder"),
    lanktext: "Marknadsföringsbilder",
  },
  {
    titel: "Fler landningssidor",
    text: "Sidor för fler tjänster, orter eller sökningar när sajten ska växa.",
    ikon: LayoutTemplate,
    pris: "Pris i offerten",
    till: "/kontakt",
    lanktext: "Fråga om pris",
  },
];

const STEG: readonly Steg[] = [
  {
    titel: "Jämför eller boka",
    text: "Läs igenom priserna här, eller boka en gratis genomgång om ni är osäkra på vad ni behöver.",
  },
  {
    titel: "Vi går igenom behoven",
    text: "20–25 minuter om verksamheten, önskemålen och vilka sidor och funktioner sajten behöver.",
  },
  {
    titel: "Ni får en offert",
    text: "Fast pris och vad som ingår. Offerten gäller i 30 dagar och godkänns med ett mejl.",
  },
  {
    titel: "Design och bygge",
    text: "Kravunderlag, designbrief och tidplan att godkänna – sedan designar och bygger vi.",
  },
  {
    titel: "Lansering",
    text: "En ändringsrunda, sedan publicerar vi. Vill ni ha löpande hjälp väljer ni ett månadspaket.",
  },
];

function HemsidaPris() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Blob className="absolute top-1/2 -right-32 -z-10 hidden w-[34rem] -translate-y-1/2 opacity-60 lg:block" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 border-b border-ink/70"
        />
        <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow">Priser · Hemsida</p>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,5.6vw,4.75rem)] leading-[1.03]">
              <Markerad
                text="Vad kostar en hemsida till företag? Se våra priser"
                markera="Se våra priser"
              />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80">
              Ni ska inte behöva gissa vad en ny hemsida kostar. Hos {FORETAG.kortnamn} är en
              företagshemsida ett engångspris med fast pris i offerten – utan obligatorisk
              månadsavgift. Här ser ni vad den kostar, vad som ingår och vad ni betalar totalt
              första året.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#priser" className="btn-base btn-dark">
                Se våra priser
              </a>
              <Link
                to="/kontakt"
                search={{ tjanst: TJANST }}
                onClick={() => bokaKlick(SIDA, "hero")}
                className="btn-base btn-outline"
              >
                Boka gratis genomgång
              </Link>
            </div>
          </div>
          <div className="kortskugga rounded-[2rem] bg-ink p-8 text-white sm:p-10">
            <p className="caps text-sun">Företagshemsidor från</p>
            <p className="mt-4 font-display text-6xl leading-none sm:text-7xl">
              {kr(PRIS.hemsida)}
            </p>
            <p className="mt-3 text-white/75">Engångspris, exkl. moms</p>
            <dl className="mt-8 divide-y divide-white/15 border-t border-white/15">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/80">Uppfräschning</dt>
                <dd className="font-bold">från {kr(PRIS.uppfraschning)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/80">Löpande hjälp (frivilligt)</dt>
                <dd className="font-bold">från {kr(PRIS.start)}/mån</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/80">Genomgång och offert</dt>
                <dd className="font-bold">Gratis</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Priser */}
      <section
        id="priser"
        aria-labelledby="priser-rubrik"
        className="container-page scroll-mt-28 py-14 sm:py-20"
      >
        <Reveal>
          <p className="eyebrow">Priser</p>
          <h2 id="priser-rubrik" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Våra priser för <Mark>företagshemsidor</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Tre sätt att komma igång. Den nya hemsidan och uppfräschningen är engångspriser.
            Månadspaketen är frivilliga och kan väljas till när som helst.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {/* Ny hemsida */}
          <Reveal className="h-full">
            <article
              aria-labelledby="ny-hemsida"
              className="flex h-full flex-col rounded-[2rem] bg-brand p-8 text-white sm:p-9"
            >
              <p className="caps text-white/80">Engångspris</p>
              <h3 id="ny-hemsida" className="mt-3 font-sans text-2xl font-bold tracking-normal">
                Ny hemsida
              </h3>
              <p className="mt-5 font-display text-5xl leading-none">
                <span className="text-2xl">från </span>
                {kr(PRIS.hemsida)}
              </p>
              <p className="mt-2 text-sm text-white/75">Ingen månadsavgift till oss</p>
              <ul className="mt-7 space-y-2.5">
                {NY_HEMSIDA_INGAR.map((r) => (
                  <li key={r} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0" strokeWidth={3} aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-bold text-white/85">Ingår inte</p>
              <ul className="mt-2 flex-1 space-y-2 text-sm text-white/80">
                {NY_HEMSIDA_INGAR_INTE.map((r) => (
                  <li key={r} className="flex gap-3">
                    <Minus className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <BokaKnapp
                  variant="white"
                  tjanst={TJANST}
                  onClick={() => bokaKlick(SIDA, "pris-ny")}
                >
                  Diskutera en ny hemsida
                </BokaKnapp>
              </div>
            </article>
          </Reveal>

          {/* Uppfräschning */}
          <Reveal delay={60} className="h-full">
            <article
              aria-labelledby="uppfraschning"
              className="flex h-full flex-col rounded-[2rem] border-2 border-line bg-white p-8 text-ink sm:p-9"
            >
              <p className="caps text-brand">Engångspris</p>
              <h3 id="uppfraschning" className="mt-3 font-sans text-2xl font-bold tracking-normal">
                Uppfräschning av befintlig hemsida
              </h3>
              <p className="mt-5 font-display text-5xl leading-none">
                <span className="text-2xl">från </span>
                {kr(PRIS.uppfraschning)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Beroende på sajtens skick</p>
              <p className="mt-7 flex-1 leading-relaxed text-ink/80">
                Har ni redan en sajt räcker det ofta att förbättra den: snabbare, tydligare och
                bättre på mobilen. Vi går igenom hela sajten, gör en prioriterad lista och genomför
                ändringarna åt er.
              </p>
              <Link to={tjanstSokvag("hemsideoptimering")} className={`mt-6 ${LANK}`}>
                Modernisera din hemsida
              </Link>
              <div className="mt-8">
                <BokaKnapp tjanst="hemsideoptimering" onClick={() => bokaKlick(SIDA, "pris-upp")}>
                  Diskutera uppfräschning
                </BokaKnapp>
              </div>
            </article>
          </Reveal>

          {/* Löpande */}
          <Reveal delay={120} className="h-full">
            <article
              aria-labelledby="lopande"
              className="flex h-full flex-col rounded-[2rem] border-2 border-line bg-white p-8 text-ink sm:p-9"
            >
              <p className="caps text-brand">Per månad · frivilligt</p>
              <h3 id="lopande" className="mt-3 font-sans text-2xl font-bold tracking-normal">
                Löpande hjälp efter lansering
              </h3>
              <p className="mt-5 font-display text-5xl leading-none">
                <span className="text-2xl">från </span>
                {kr(PRIS.start)}
                <span className="text-2xl text-muted-foreground">/mån</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Ingen bindningstid</p>
              <ul className="mt-7 flex-1 divide-y divide-line">
                {PAKET.map((p) => (
                  <li key={p.id} className="py-3">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-bold">{p.namn}</span>
                      <span className="font-display text-xl">{kr(p.belopp)}/mån</span>
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {[rad(p.ingar, /hemsid/i), rad(p.ingar, /SEO/)].filter(Boolean).join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/priser" className={`mt-4 ${LANK}`}>
                Allt som ingår i paketen
              </Link>
              <div className="mt-8">
                <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "pris-paket")}>
                  Diskutera paketen
                </BokaKnapp>
              </div>
            </article>
          </Reveal>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {MOMS_TEXT} {BETALNING_TEXT} Uppstart av större månadsabonnemang kostar{" "}
          {kr(PRIS.uppstart)}.
        </p>
      </section>

      {/* Jämförelse */}
      <section aria-labelledby="ingar" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Vad ingår</p>
            <h2 id="ingar" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Vad får ni när ni beställer en hemsida från <Mark>{FORETAG.kortnamn}</Mark>?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Priset säger lite utan innehållet. Här står vad som ingår i den nya hemsidan och vad
              månadspaketen lägger till efter lansering.
            </p>
          </Reveal>

          {/* Dator: tabell */}
          <Reveal delay={80} className="mt-10 hidden md:block">
            <div className="overflow-hidden rounded-2xl border-2 border-line bg-white">
              <table className="w-full text-left">
                <caption className="sr-only">
                  Vad som ingår i en ny hemsida och i månadspaketen
                </caption>
                <thead>
                  <tr className="border-b-2 border-line">
                    <th scope="col" className="p-4">
                      <span className="sr-only">Innehåll</span>
                    </th>
                    {KOLUMNER.map((k, i) => (
                      <th
                        key={k}
                        scope="col"
                        className={`p-4 font-bold ${i === 0 ? "text-brand" : "text-ink"}`}
                      >
                        {k}
                        <span className="block text-sm font-normal text-muted-foreground">
                          {i === 0
                            ? `från ${kr(PRIS.hemsida)}`
                            : `${kr(PAKET[i - 1]?.belopp ?? 0)}/mån`}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {JAMFORELSE.map((r) => (
                    <tr key={r.rad} className="border-b border-line last:border-0">
                      <th scope="row" className="p-4 font-bold text-ink">
                        {r.rad}
                      </th>
                      {r.celler.map((c, i) => (
                        <td key={i} className="p-4 text-sm">
                          <CellVy c={c} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mobil: ett kort per alternativ */}
          <div className="mt-10 grid gap-4 md:hidden">
            {KOLUMNER.map((k, i) => (
              <div key={k} className="rounded-2xl border-2 border-line bg-white p-5">
                <h3 className="font-sans text-lg font-bold tracking-normal text-ink">
                  {k}{" "}
                  <span className="font-normal text-muted-foreground">
                    {i === 0 ? `från ${kr(PRIS.hemsida)}` : `${kr(PAKET[i - 1]?.belopp ?? 0)}/mån`}
                  </span>
                </h3>
                <dl className="mt-3 space-y-2 text-sm">
                  {JAMFORELSE.map((r) => {
                    const c = r.celler[i];
                    // Rader som inte gäller alternativet ("—") är bara brus på en liten skärm.
                    if (!c || c.text === "—") return null;
                    return (
                      <div key={r.rad} className="flex justify-between gap-4">
                        <dt className="text-ink/80">{r.rad}</dt>
                        <dd className="text-right">
                          <CellVy c={c} />
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Domän och webbhotell registreras alltid i ert namn och betalas direkt till leverantören.{" "}
            {AGANDE_TEXT}
          </p>
        </div>
      </section>

      {/* Engång eller månad */}
      <section aria-labelledby="modell" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Prismodell</p>
            <h2 id="modell" className="mt-4 text-4xl sm:text-5xl">
              Engångspris eller månadskostnad – <Mark>hur fungerar det?</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Hos många leverantörer kostar en hemsida en startavgift plus en månadsavgift för
              drift, och ibland äger leverantören sajten. Jämför därför alltid totalkostnaden och
              vad som händer om ni vill byta.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                `Ni betalar hemsidan en gång – från ${kr(PRIS.hemsida)}.`,
                "Domän och webbhotell betalar ni direkt till leverantören, i ert namn.",
                `Månadspaket är frivilliga. ${BINDNING_TEXT}`,
                "Slutar ni hos oss lämnar vi tillbaka all åtkomst och överlämnar materialet.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-ink/85">
                  <Check className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Årskostnad */}
      <section aria-labelledby="arskostnad" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Totalkostnad</p>
            <h2 id="arskostnad" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Vad kostar en företagshemsida totalt <Mark>under ett år</Mark>?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Startkostnad plus tolv månader. Beräknat på våra lägsta priser – det slutliga priset
              för hemsidan står i offerten.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ARSKOSTNAD.map((a, i) => (
              <li key={a.namn}>
                <Reveal delay={i * 60} className="h-full">
                  <div
                    className={`flex h-full flex-col rounded-[2rem] p-6 ${
                      i === 0 ? "bg-ink text-white" : "border-2 border-line bg-white text-ink"
                    }`}
                  >
                    <h3 className="font-sans text-lg font-bold tracking-normal">{a.namn}</h3>
                    <p
                      className={`mt-1 flex-1 text-sm ${i === 0 ? "text-white/70" : "text-muted-foreground"}`}
                    >
                      {a.beskrivning}
                    </p>
                    <dl
                      className={`mt-5 divide-y text-sm ${i === 0 ? "divide-white/15" : "divide-line"}`}
                    >
                      <div className="flex justify-between gap-3 py-2">
                        <dt>Vid start</dt>
                        <dd className="font-bold">{kr(a.start)}</dd>
                      </div>
                      <div className="flex justify-between gap-3 py-2">
                        <dt>Per månad</dt>
                        <dd className="font-bold">{a.perManad ? kr(a.perManad) : "0 kr"}</dd>
                      </div>
                      <div className="flex justify-between gap-3 py-2">
                        <dt>Första året</dt>
                        <dd className="font-display text-2xl">{kr(a.forstaAret)}</dd>
                      </div>
                      <div className="flex justify-between gap-3 py-2">
                        <dt>Följande år</dt>
                        <dd className="font-bold">{kr(a.darefter)}</dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {MOMS_TEXT} Tillkommer: domän och webbhotell, som ni betalar direkt till leverantören,
            och eventuell uppstart av större månadsabonnemang ({kr(PRIS.uppstart)}). Månadspaketen
            kan avslutas när som helst – räkningen gäller om ni behåller paketet hela året.
          </p>
        </div>
      </section>

      {/* Vad påverkar priset */}
      <section aria-labelledby="faktorer" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Prisets delar</p>
          <h2 id="faktorer" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Vad avgör hur mycket en <Mark>hemsida kostar</Mark>?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            En enkel hemsida med verksamheten, tjänsterna och kontaktuppgifter är mindre arbete än
            en stor sajt med många undersidor och egna funktioner. Jämför därför vad som ingår, inte
            bara beloppet.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FAKTORER.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Billig eller professionell */}
      <section aria-labelledby="billig" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Billig hemsida</p>
            <h2 id="billig" className="mt-4 text-4xl sm:text-5xl">
              Billig hemsida till företag – vad är viktigt att <Mark>tänka på</Mark>?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              En billig hemsida kan räcka för den som behöver en enkel närvaro. Men det mest
              prisvärda är inte alltid lägsta startpris, utan det som motsvarar behoven och har
              tydliga villkor. Kontrollera det här – oavsett vilken leverantör ni väljer.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="overflow-hidden rounded-2xl border-2 border-line bg-white">
              <table className="w-full text-left text-sm sm:text-base">
                <caption className="sr-only">
                  Vad ni bör kontrollera och hur det ser ut hos oss
                </caption>
                <thead>
                  <tr className="border-b-2 border-line">
                    <th scope="col" className="p-4 font-bold text-ink">
                      Kontrollera
                    </th>
                    <th scope="col" className="p-4 font-bold text-brand">
                      Hos {FORETAG.kortnamn}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {KONTROLLERA.map((k) => (
                    <tr key={k.punkt} className="border-b border-line last:border-0">
                      <th scope="row" className="p-4 font-bold text-ink">
                        {k.punkt}
                      </th>
                      <td className="p-4 text-ink/85">{k.hosOss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Olika företag */}
      <section aria-labelledby="typer" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Olika behov</p>
          <h2 id="typer" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Hemsidor anpassade efter olika <Mark>företags behov</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Alla börjar på samma grundpris. Det som skiljer är hur många sidor och vilka funktioner
            som behövs.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FORETAGSTYPER.map((f, i) => (
            <li key={f.titel}>
              <Reveal delay={i * 50} className="h-full">
                <div className="h-full rounded-[1.5rem] bg-tint p-6">
                  <h3 className="font-sans text-lg font-bold tracking-normal text-ink">
                    Hemsida för {f.titel.toLowerCase()}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Tillval */}
      <section aria-labelledby="tillval" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Tillval</p>
            <h2 id="tillval" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Vill ni utveckla hemsidan <Mark>ytterligare</Mark>?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Det här ingår inte i hemsidans pris, men kan läggas till nu eller senare.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TILLVAL.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <KortVy k={k}>
                    <p className="mt-5 font-display text-2xl text-ink">{k.pris}</p>
                    <Link
                      to={k.till}
                      className="mt-3 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
                    >
                      {k.lanktext}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </KortVy>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">{MOMS_TEXT}</p>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Så går det till</p>
          <h2 id="process" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Från prisförfrågan till färdig hemsida – <Mark>så går det till</Mark>
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <Stegliste steg={STEG} rad />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")} />
        </Reveal>
      </section>

      {/* Varför TAB */}
      <section aria-labelledby="varfor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Tydliga priser och en hemsida anpassad efter <Mark>ert företag</Mark>
            </h2>
            <ul className="mt-8 space-y-3">
              {[
                "Tydliga priser och innehåll – innan ni bestämmer er",
                "Professionell, mobilanpassad webbdesign",
                "Lösningar efter företagets behov",
                "Hemsida, SEO och marknadsföring på ett ställe",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 font-bold text-ink">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Att köpa en hemsida ska vara ett begripligt beslut. Vill ni läsa mer om själva
              tjänsten finns allt om att beställa en{" "}
              <Link to={HEMSIDA_FORETAG.sokvag} className={LANK}>
                hemsida till företag
              </Link>
              , och om hur vi arbetar på sidan om{" "}
              <Link to={WEBBYRA.sokvag} className={LANK}>
                våra webbyråtjänster
              </Link>
              .
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Eftersom vi även jobbar med SEO och marknadsföring kan sajten fortsätta utvecklas
              efter lansering – till exempel med{" "}
              <Link to={SEO_SMAFORETAG.sokvag} className={LANK}>
                SEO för småföretag
              </Link>{" "}
              när ni vill synas bättre på Google.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="container-page py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Vanliga frågor</p>
          <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
            Vanliga frågor om vad en <Mark>hemsida kostar</Mark>
          </h2>
          <div className="mt-8">
            <VanligaFragor fragor={HEMSIDA_PRIS_FRAGOR} />
          </div>
        </div>
      </section>

      <BokaPanel
        tjanst={TJANST}
        onBoka={() => bokaKlick(SIDA, "avslutning")}
        prislank={{ href: "#priser", text: "Se våra priser" }}
        rubrik={
          <>
            Redo att investera i en professionell <Mark>hemsida</Mark>?
          </>
        }
        text="Första hemsidan eller en ersättare för en gammal – boka en gratis genomgång så får ni en offert med fast pris och allt som ingår."
      />
    </>
  );
}

function CellVy({ c }: { c: Cell }) {
  return c.ingar ? (
    <span className="inline-flex items-start gap-2 text-ink">
      <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} aria-hidden="true" />
      {c.text}
    </span>
  ) : (
    <span className="text-muted-foreground">{c.text}</span>
  );
}
