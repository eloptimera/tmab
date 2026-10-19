import { createFileRoute } from "@tanstack/react-router";
import { absolut, FORETAG } from "@/lib/foretag";
import {
  ENGANGSTJANSTER,
  kr,
  MOMS_TEXT,
  PAKET,
  PAKET_VILLKOR,
  PRIS_FRAGOR,
  LOFTEN,
  prisText,
} from "@/lib/priser";
import { GUIDER } from "@/lib/guider";
import { LANDNINGSSIDOR } from "@/lib/landningssidor";
import { textSvar } from "@/lib/sidor";
import { TJANSTER, tjanstSokvag } from "@/lib/tjanster";

// llms.txt (https://llmstxt.org): en kort sammanfattning av sajten för AI-assistenter.
// Byggs från samma data som sidorna, så den är alltid uppdaterad.

const ren = (text: string) => text.replace(/\u00a0/g, " ");

function llmsText(): string {
  const rader = [
    `# ${FORETAG.namn}`,
    "",
    `> ${FORETAG.beskrivning}`,
    "",
    `${FORETAG.namn} drivs av ${FORETAG.juridisktNamn} (org.nr ${FORETAG.orgnr}). Kontakt: ${FORETAG.epost}.`,
    "",
    `Vi arbetar digitalt med företag i hela Sverige. ${MOMS_TEXT} Första genomgången (20–25 minuter) är gratis och bokas på ${absolut("/kontakt")}.`,
    "",
    "## Löften",
    "",
    ...LOFTEN.map((l) => `- ${l.titel}: ${l.text}`),
    "",
    "## Tjänster",
    "",
    ...TJANSTER.map(
      (t) =>
        `- [${t.titel}](${absolut(tjanstSokvag(t))}): ${t.vad}. ${t.pris.avser}: ${t.pris.fran ? "från " : ""}${kr(t.pris.belopp)}.`,
    ),
    "",
    "## Månadspaket",
    "",
    ...PAKET.map((p) => `- ${p.namn}: ${kr(p.belopp)} per månad – ${p.ingar.join(", ")}.`),
    "",
    PAKET_VILLKOR,
    "",
    "## Engångstjänster",
    "",
    ...ENGANGSTJANSTER.map((r) => `- ${r.tjanst}: ${prisText(r)}`),
    "",
    "## Guider",
    "",
    ...GUIDER.map((g) => `- [${g.titel}](${absolut(`/guider/${g.slug}`)}): ${g.ingress}`),
    "",
    "## Vanliga frågor",
    "",
    // Tjänster med egen landningssida har sina frågor där – inte på /tjanster/{slug}.
    ...[
      ...PRIS_FRAGOR,
      ...TJANSTER.filter((t) => !t.sida).flatMap((t) => t.fragor),
      ...LANDNINGSSIDOR.flatMap((l) => l.fragor),
    ].map((f) => `- ${f.fraga} ${f.svar}`),
    "",
    "## Sidor",
    "",
    `- [Priser](${absolut("/priser")})`,
    `- [Alla tjänster](${absolut("/tjanster")})`,
    `- [Guider](${absolut("/guider")})`,
    ...LANDNINGSSIDOR.map((l) => `- [${l.titel}](${absolut(l.sokvag)})`),
    `- [Om oss](${absolut("/om-oss")})`,
    `- [Boka gratis genomgång](${absolut("/kontakt")})`,
    `- [Allmänna villkor](${absolut("/villkor")})`,
    "",
  ];
  return ren(rader.join("\n"));
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () => textSvar(llmsText(), "text/plain"),
    },
  },
});
