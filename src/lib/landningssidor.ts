// Alla landningssidor (/hemsida-foretag, /seo-byra …). Härifrån får /guider sina kort,
// sitemap.xml sina adresser och llms.txt sina länkar och frågor. Ny landningssida: lägg till
// den här och sätt `sida` på tjänsten i tjanster.ts så att /tjanster/{slug} omdirigeras.
import { HEMSIDA_FORETAG, HEMSIDA_FRAGOR } from "@/lib/hemsida-foretag";
import type { Fraga } from "@/lib/priser";
import { SEO_BYRA, SEO_FRAGOR } from "@/lib/seo-byra";

export type Landningssida = {
  sokvag: string;
  /** Kort namn i listor, brödsmulor och sitemap. */
  titel: string;
  /** Liten etikett på kortet under /guider. */
  etikett: string;
  /** Sidans titel i sökresultat, utan företagsnamn (läggs till automatiskt). */
  seoTitel: string;
  /** Max ca 155 tecken. */
  seoBeskrivning: string;
  /** Text på kortet under /guider. */
  kortText: string;
  publicerad: string;
  uppdaterad: string;
  fragor: readonly Fraga[];
};

export const LANDNINGSSIDOR: readonly Landningssida[] = [
  { ...SEO_BYRA, fragor: SEO_FRAGOR },
  { ...HEMSIDA_FORETAG, fragor: HEMSIDA_FRAGOR },
];

export function hittaLandningssida(sokvag: string): Landningssida | undefined {
  return LANDNINGSSIDOR.find((l) => l.sokvag === sokvag);
}
