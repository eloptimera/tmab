// Priser som visas på /priser.
// TODO(Treatly): ange om priserna är inklusive eller exklusive moms, samt bindningstid och
// uppsägningstid för månadspaketen.

export type Paket = {
  id: string;
  namn: string;
  pris: string;
  per: string;
  ingar: readonly string[];
  /** Det paket som lyfts fram visuellt. */
  utvalt?: boolean;
};

export const PAKET: readonly Paket[] = [
  {
    id: "start",
    namn: "Start",
    pris: "2 995 kr",
    per: "per månad",
    ingar: [
      "5 marknadsföringsbilder",
      "Grundläggande SEO/GEO",
      "1 mindre hemsidejustering",
      "Månadsrapport",
    ],
  },
  {
    id: "growth",
    namn: "Growth",
    pris: "4 995 kr",
    per: "per månad",
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
    pris: "7 995 kr",
    per: "per månad",
    ingar: [
      "20 marknadsföringsbilder",
      "Löpande SEO/GEO-optimering",
      "Fler hemsideförbättringar",
      "Meta Ads-hantering och optimering",
      "2 avstämningar per månad",
    ],
  },
];

export const PAKET_VILLKOR =
  "Annonsbudget ingår inte. Paketen utgår från huvudsakligen AI-assisterad bildproduktion, begränsade revideringar och tydligt avgränsade arbetsinsatser.";

export type Prisrad = { tjanst: string; pris: string };

export const ENGANGSTJANSTER: readonly Prisrad[] = [
  { tjanst: "5 marknadsföringsbilder", pris: "1 495 kr" },
  { tjanst: "10 marknadsföringsbilder", pris: "2 495 kr" },
  { tjanst: "20 marknadsföringsbilder", pris: "3 995 kr" },
  { tjanst: "SEO/GEO – grundoptimering", pris: "3 995 kr" },
  { tjanst: "Uppfräschning av hemsida", pris: "4 995–9 995 kr" },
  { tjanst: "Meta Ads – uppsättning", pris: "2 495 kr" },
];

export const KONSULTATION: readonly Prisrad[] = [
  { tjanst: "Första konsultationen (20–25 minuter)", pris: "Gratis" },
  { tjanst: "Genomgång av digital närvaro under konsultationen", pris: "Gratis" },
  { tjanst: "Skräddarsytt förbättringsförslag/offert", pris: "Gratis" },
  { tjanst: "Uppstart av större månadsabonnemang", pris: "2 495 kr" },
  { tjanst: "Annonsbudget på Meta", pris: "Betalas separat av kunden" },
];
