// Alla landningssidor (/hemsida-foretag, /seo-byra …). Härifrån får /guider sina kort,
// sitemap.xml sina adresser och llms.txt sina länkar och frågor.
//
// Ny landningssida: lägg till den här. Då händer resten av sig själv –
//  - FramtidaLank-länkar som pekar på adressen blir riktiga länkar,
//  - ersätter den en tjänst (`tjanst`) omdirigeras /tjanster/{slug} dit (301) och alla
//    interna länkar till tjänsten går direkt till landningssidan.
import { HEMSIDA_FORETAG, HEMSIDA_FRAGOR } from "@/lib/hemsida-foretag";
import type { Fraga } from "@/lib/priser";
import { SEO_BYRA, SEO_FRAGOR } from "@/lib/seo-byra";
import { SEO_SMAFORETAG, SMAFORETAG_FRAGOR } from "@/lib/seo-smaforetag";
import { WEBBYRA, WEBBYRA_FRAGOR } from "@/lib/webbyra";

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
  /** Tjänsten (slug i tjanster.ts) som sidan ersätter, om någon. */
  tjanst?: string;
};

export const LANDNINGSSIDOR: readonly Landningssida[] = [
  { ...SEO_BYRA, fragor: SEO_FRAGOR, tjanst: "seo" },
  { ...SEO_SMAFORETAG, fragor: SMAFORETAG_FRAGOR },
  { ...HEMSIDA_FORETAG, fragor: HEMSIDA_FRAGOR, tjanst: "hemsida" },
  { ...WEBBYRA, fragor: WEBBYRA_FRAGOR },
];

export function hittaLandningssida(sokvag: string): Landningssida | undefined {
  return LANDNINGSSIDOR.find((l) => l.sokvag === sokvag);
}

export function landningssidaForTjanst(slug: string): Landningssida | undefined {
  return LANDNINGSSIDOR.find((l) => l.tjanst === slug);
}
