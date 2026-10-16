// Gemensam SEO/GEO-hjälp: metadata per sida och strukturerad data (schema.org).
// Varje route anropar sidhuvud() i sin head() – då blir titel, beskrivning, canonical,
// delningsbild och strukturerad data likadana överallt.
import { absolut, FORETAG, SAJT_URL } from "@/lib/foretag";
import type { Guide } from "@/lib/guider";
import { PAKET, PRIS, type Fraga } from "@/lib/priser";
import { TJANSTER, type Tjanst } from "@/lib/tjanster";

export const DELNINGSBILD = { src: "/og.png", bredd: 1200, hojd: 630 } as const;

const FORETAG_ID = `${SAJT_URL}/#foretag`;

type Schema = Record<string, unknown>;

/** JSON-LD som går säkert att lägga i en <script>-tagg. */
export function jsonLd(schema: Schema) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
}

export function sidhuvud({
  titel,
  beskrivning,
  sokvag,
  schema = [],
}: {
  /** Titel utan företagsnamn – det läggs till automatiskt. */
  titel: string;
  beskrivning: string;
  sokvag: string;
  schema?: readonly Schema[];
}) {
  const fullTitel = titel === FORETAG.namn ? titel : `${titel} | ${FORETAG.namn}`;
  const url = absolut(sokvag);
  return {
    meta: [
      { title: fullTitel },
      { name: "description", content: beskrivning },
      { property: "og:title", content: fullTitel },
      { property: "og:description", content: beskrivning },
      { property: "og:url", content: url },
      { property: "og:image", content: absolut(DELNINGSBILD.src) },
      { property: "og:image:width", content: String(DELNINGSBILD.bredd) },
      { property: "og:image:height", content: String(DELNINGSBILD.hojd) },
      { property: "og:image:alt", content: FORETAG.namn },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: schema.map(jsonLd),
  };
}

/** Företaget och webbplatsen – ligger på alla sidor via roten. */
export function grundSchema(): Schema {
  const adress: Schema = {
    "@type": "PostalAddress",
    addressLocality: FORETAG.ort,
    addressCountry: "SE",
  };
  if (FORETAG.gata) adress["streetAddress"] = FORETAG.gata;
  if (FORETAG.postnummer) adress["postalCode"] = FORETAG.postnummer;

  const foretag: Schema = {
    "@type": "ProfessionalService",
    "@id": FORETAG_ID,
    name: FORETAG.namn,
    legalName: FORETAG.juridisktNamn,
    description: FORETAG.beskrivning,
    url: absolut("/"),
    logo: absolut("/logo.png"),
    image: absolut(DELNINGSBILD.src),
    address: adress,
    areaServed: { "@type": "Country", name: "Sverige" },
    priceRange: `${PRIS.bilder5}–${PRIS.premium} SEK`,
    knowsAbout: TJANSTER.map((t) => t.titel),
  };
  if (FORETAG.telefon) foretag["telephone"] = FORETAG.telefonLank;
  if (FORETAG.epost) foretag["email"] = FORETAG.epost;
  if (FORETAG.orgnr) foretag["taxID"] = FORETAG.orgnr;
  if (FORETAG.momsnr) foretag["vatID"] = FORETAG.momsnr;

  return {
    "@context": "https://schema.org",
    "@graph": [
      foretag,
      {
        "@type": "WebSite",
        "@id": `${SAJT_URL}/#webbplats`,
        name: FORETAG.namn,
        url: absolut("/"),
        inLanguage: "sv-SE",
        publisher: { "@id": FORETAG_ID },
      },
    ],
  };
}

export function tjanstSchema(t: Tjanst): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.titel,
    serviceType: t.titel,
    description: t.seoBeskrivning,
    url: absolut(`/tjanster/${t.slug}`),
    provider: { "@id": FORETAG_ID },
    areaServed: { "@type": "Country", name: "Sverige" },
    offers: {
      "@type": "Offer",
      description: t.pris.avser,
      priceCurrency: "SEK",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "SEK",
        valueAddedTaxIncluded: false,
        ...(t.pris.fran ? { minPrice: t.pris.belopp } : { price: t.pris.belopp }),
      },
    },
  };
}

export function faqSchema(fragor: readonly Fraga[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fragor.map((f) => ({
      "@type": "Question",
      name: f.fraga,
      acceptedAnswer: { "@type": "Answer", text: f.svar },
    })),
  };
}

export function brodsmulor(steg: readonly { namn: string; sokvag: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: steg.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.namn,
      item: absolut(s.sokvag),
    })),
  };
}

/** Månadspaketen som erbjudanden – används på prissidan. */
export function paketSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Månadspaket",
    url: absolut("/priser"),
    itemListElement: PAKET.map((p) => ({
      "@type": "Offer",
      name: p.namn,
      description: p.ingar.join(", "),
      seller: { "@id": FORETAG_ID },
      priceCurrency: "SEK",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.belopp,
        priceCurrency: "SEK",
        unitText: "månad",
        valueAddedTaxIncluded: false,
      },
    })),
  };
}

/** En guide som artikel – visar Google och AI-tjänster vem som skrivit den och när. */
export function artikelSchema(g: Guide): Schema {
  const url = absolut(`/guider/${g.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.rubrik.text,
    description: g.seoBeskrivning,
    url,
    mainEntityOfPage: url,
    datePublished: g.publicerad,
    dateModified: g.uppdaterad,
    inLanguage: "sv-SE",
    image: absolut(DELNINGSBILD.src),
    author: { "@id": FORETAG_ID },
    publisher: { "@id": FORETAG_ID },
  };
}
