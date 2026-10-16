// Alla indexerbara sidor – används av sitemap.xml och llms.txt.
import { TJANSTER } from "@/lib/tjanster";

export const SIDOR: readonly { sokvag: string; namn: string }[] = [
  { sokvag: "/", namn: "Startsida" },
  { sokvag: "/tjanster", namn: "Tjänster" },
  ...TJANSTER.map((t) => ({ sokvag: `/tjanster/${t.slug}`, namn: t.titel })),
  { sokvag: "/priser", namn: "Priser" },
  { sokvag: "/om-oss", namn: "Om oss" },
  { sokvag: "/kontakt", namn: "Boka gratis genomgång" },
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
