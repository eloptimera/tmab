// Alla priser på sajten. Beloppen står bara här – prissidan, tjänstesidorna, strukturerad
// data och llms.txt läser härifrån. Alla priser är exkl. moms.

export const PRIS = {
  start: 2995,
  growth: 4995,
  premium: 7995,
  bilder5: 1495,
  bilder10: 2495,
  bilder20: 3995,
  seoGeo: 3995,
  uppfraschning: 3995,
  hemsida: 4995,
  metaUppsattning: 2495,
  uppstart: 2495,
} as const;

export const MOMS_TEXT = "Alla priser är exkl. moms.";

/** Villkor för månadspaketen. */
export const BINDNING_TEXT =
  "Ingen bindningstid. Ni kan avsluta när ni vill – paketet löper till slutet av den period ni redan betalat för.";

/** 2995 → "2 995 kr" (med hårt mellanslag så att beloppet aldrig bryts). */
export function kr(belopp: number): string {
  return `${String(belopp).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")}\u00a0kr`;
}

export type Paket = {
  id: "start" | "growth" | "premium";
  namn: string;
  belopp: number;
  ingar: readonly string[];
  /** Det paket som lyfts fram visuellt. */
  utvalt?: boolean;
};

export const PAKET: readonly Paket[] = [
  {
    id: "start",
    namn: "Start",
    belopp: PRIS.start,
    ingar: [
      "5 marknadsföringsbilder",
      "Grundläggande SEO/GEO",
      "Mindre hemsidejusteringar",
      "Månadsrapport",
    ],
  },
  {
    id: "growth",
    namn: "Growth",
    belopp: PRIS.growth,
    utvalt: true,
    ingar: [
      "10 marknadsföringsbilder",
      "SEO/GEO-optimering",
      "Hemsideförbättringar",
      "Meta Ads-hantering",
      "Månadsrapport",
    ],
  },
  {
    id: "premium",
    namn: "Premium",
    belopp: PRIS.premium,
    ingar: [
      "20 marknadsföringsbilder",
      "Löpande SEO/GEO-optimering",
      "Fler hemsideförbättringar",
      "Meta Ads-hantering och optimering",
      "2 avstämningar per månad",
    ],
  },
];

export const PAKET_VILLKOR = `${BINDNING_TEXT} ${MOMS_TEXT} Annonsbudget ingår inte.`;

/** En rad i en pristabell. `pris` är ett belopp i kronor, "Gratis" eller en kort text. */
export type Prisrad = {
  tjanst: string;
  pris: number | string;
  fran?: boolean;
  /** Länk till tjänstens egen sida, om den har en. */
  slug?: string;
};

export function prisText(rad: Pick<Prisrad, "pris" | "fran">): string {
  if (typeof rad.pris === "string") return rad.pris;
  return rad.fran ? `från ${kr(rad.pris)}` : kr(rad.pris);
}

export const ENGANGSTJANSTER: readonly Prisrad[] = [
  { tjanst: "5 marknadsföringsbilder", pris: PRIS.bilder5, slug: "marknadsforingsbilder" },
  { tjanst: "10 marknadsföringsbilder", pris: PRIS.bilder10, slug: "marknadsforingsbilder" },
  { tjanst: "20 marknadsföringsbilder", pris: PRIS.bilder20, slug: "marknadsforingsbilder" },
  { tjanst: "SEO/GEO – grundoptimering", pris: PRIS.seoGeo, slug: "seo" },
  {
    tjanst: "Uppfräschning av hemsida",
    pris: PRIS.uppfraschning,
    fran: true,
    slug: "hemsideoptimering",
  },
  { tjanst: "Skapa hemsida", pris: PRIS.hemsida, fran: true, slug: "hemsida" },
  { tjanst: "Meta Ads – uppsättning", pris: PRIS.metaUppsattning, slug: "meta-annonser" },
];

export const KONSULTATION: readonly Prisrad[] = [
  { tjanst: "Första konsultationen (20–25 minuter)", pris: "Gratis" },
  { tjanst: "Genomgång av digital närvaro under konsultationen", pris: "Gratis" },
  { tjanst: "Skräddarsytt förbättringsförslag/offert", pris: "Gratis" },
  { tjanst: "Uppstart av större månadsabonnemang", pris: PRIS.uppstart },
  { tjanst: "Annonsbudget på Meta", pris: "Betalas separat av kunden" },
];

export type Fraga = { fraga: string; svar: string };

/** Vanliga frågor på prissidan. Svaren bygger bara på priserna ovan. */
export const PRIS_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad kostar marknadsföring hos er?",
    svar: `Månadspaketen kostar ${kr(PRIS.start)}, ${kr(PRIS.growth)} eller ${kr(PRIS.premium)} per månad. Enskilda tjänster finns från ${kr(PRIS.bilder5)}. ${MOMS_TEXT}`,
  },
  {
    fraga: "Finns det någon bindningstid?",
    svar: BINDNING_TEXT,
  },
  {
    fraga: "Ingår annonsbudgeten i priset?",
    svar: "Nej. Annonsbudgeten på Meta betalar ni själva direkt till Meta. Våra priser gäller arbetet.",
  },
  {
    fraga: "Kostar första mötet något?",
    svar: "Nej. Första konsultationen på 20–25 minuter, genomgången av er digitala närvaro och förbättringsförslaget är gratis.",
  },
  {
    fraga: "Finns det en startavgift?",
    svar: `Uppstart av större månadsabonnemang kostar ${kr(PRIS.uppstart)}. Engångstjänsterna har ingen startavgift.`,
  },
];
