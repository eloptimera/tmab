import { createFileRoute } from "@tanstack/react-router";
import { absolut, FORETAG } from "@/lib/foretag";
import {
  ENGANGSTJANSTER,
  kr,
  MOMS_TEXT,
  PAKET,
  PAKET_VILLKOR,
  PRIS_FRAGOR,
  prisText,
} from "@/lib/priser";
import { textSvar } from "@/lib/sidor";
import { TJANSTER } from "@/lib/tjanster";

// llms.txt (https://llmstxt.org): en kort sammanfattning av sajten för AI-assistenter.
// Byggs från samma data som sidorna, så den är alltid uppdaterad.

const ren = (text: string) => text.replace(/\u00a0/g, " ");

function llmsText(): string {
  const rader = [
    `# ${FORETAG.namn}`,
    "",
    `> ${FORETAG.beskrivning}`,
    "",
    `Ort: ${FORETAG.ort}. ${MOMS_TEXT} Första genomgången (20–25 minuter) är gratis och bokas på ${absolut("/kontakt")}.`,
    "",
    "## Tjänster",
    "",
    ...TJANSTER.map(
      (t) =>
        `- [${t.titel}](${absolut(`/tjanster/${t.slug}`)}): ${t.vad}. ${t.pris.avser}: ${t.pris.fran ? "från " : ""}${kr(t.pris.belopp)}.`,
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
    "## Vanliga frågor",
    "",
    ...[...PRIS_FRAGOR, ...TJANSTER.flatMap((t) => t.fragor)].map((f) => `- ${f.fraga} ${f.svar}`),
    "",
    "## Sidor",
    "",
    `- [Priser](${absolut("/priser")})`,
    `- [Alla tjänster](${absolut("/tjanster")})`,
    `- [Om oss](${absolut("/om-oss")})`,
    `- [Boka gratis genomgång](${absolut("/kontakt")})`,
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
