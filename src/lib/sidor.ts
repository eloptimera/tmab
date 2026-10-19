// Alla indexerbara sidor – används av sitemap.xml och llms.txt.
import { GUIDER } from "@/lib/guider";
import { HEMSIDA_FORETAG } from "@/lib/hemsida-foretag";
import { TJANSTER, tjanstSokvag } from "@/lib/tjanster";

/** `andrad` (ÅÅÅÅ-MM-DD) anges bara där vi vet när innehållet senast ändrades. */
export const SIDOR: readonly { sokvag: string; namn: string; andrad?: string }[] = [
  { sokvag: "/", namn: "Startsida" },
  { sokvag: "/tjanster", namn: "Tjänster" },
  ...TJANSTER.map((t) =>
    t.sida === HEMSIDA_FORETAG.sokvag
      ? { sokvag: t.sida, namn: HEMSIDA_FORETAG.titel, andrad: HEMSIDA_FORETAG.uppdaterad }
      : { sokvag: tjanstSokvag(t), namn: t.titel },
  ),
  { sokvag: "/priser", namn: "Priser" },
  { sokvag: "/guider", namn: "Guider" },
  ...GUIDER.map((g) => ({ sokvag: `/guider/${g.slug}`, namn: g.titel, andrad: g.uppdaterad })),
  { sokvag: "/om-oss", namn: "Om oss" },
  { sokvag: "/kontakt", namn: "Boka gratis genomgång" },
  { sokvag: "/villkor", namn: "Allmänna villkor" },
  { sokvag: "/integritetspolicy", namn: "Integritetspolicy" },
];

export function textSvar(text: string, typ: string): Response {
  return new Response(text, {
    headers: {
      "Content-Type": `${typ}; charset=utf-8`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
