// Serverdelen av bokningsformuläret: kontroll av indata och utskick via Resend.
// Laddas bara på servern (se bokning.ts), så zod och nycklar når aldrig webbläsaren.
import { z } from "zod";
import { kr, raknaVal, VAL, type Val } from "@/lib/priser";

const BokningSchema = z.object({
  /** Företag, namn eller båda – besökaren skriver fritt. */
  namn: z.string().trim().min(1).max(200),
  epost: z.string().trim().email().max(200),
  telefon: z.string().trim().max(40),
  webbplats: z.string().trim().max(200),
  tjanster: z.array(z.string().max(60)).max(10),
  // Längsta nivånamnet är "Extern marknadsavdelning" (24 tecken).
  paket: z.string().max(40),
  meddelande: z.string().trim().max(3000),
  /** Dolt fält som bara robotar fyller i. */
  falla: z.string().max(500),
});

export async function hanteraBokning(indata: unknown): Promise<{ ok: true }> {
  const data = BokningSchema.parse(indata);
  // Robot: låtsas att allt gick bra men skicka ingenting.
  if (data.falla) return { ok: true as const };

  const nyckel = process.env["RESEND_API_KEY"];
  const till = process.env["KONTAKT_TILL"];
  if (!nyckel || !till) {
    console.error("Bokning: RESEND_API_KEY eller KONTAKT_TILL saknas – inget mejl skickades.");
    throw new Error("Formuläret är inte kopplat till någon mottagare ännu.");
  }

  const rader = [
    `Företag/namn: ${data.namn}`,
    `E-post: ${data.epost}`,
    data.telefon && `Telefon: ${data.telefon}`,
    data.webbplats && `Webbplats: ${data.webbplats}`,
    data.paket && `Intresserad av: ${data.paket}`,
    data.tjanster.length > 0 && `Vill ha hjälp med: ${data.tjanster.join(", ")}`,
    data.meddelande && `\nMeddelande:\n${data.meddelande}`,
  ].filter(Boolean);

  await skickaMejl(nyckel, {
    to: till.split(",").map((a) => a.trim()),
    reply_to: data.epost,
    subject: `Ny bokning av gratis genomgång – ${data.namn}`,
    text: rader.join("\n"),
  });
  return { ok: true as const };
}

async function skickaMejl(
  nyckel: string,
  mejl: { to: string[]; reply_to?: string; subject: string; text: string },
) {
  const svar = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${nyckel}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env["KONTAKT_FRAN"] ?? "Webbplatsen <onboarding@resend.dev>",
      ...mejl,
    }),
  });
  if (!svar.ok) {
    console.error("Mejl: Resend svarade", svar.status, await svar.text());
    throw new Error("Mejlet kunde inte skickas.");
  }
}

const EngangsSchema = z.object({
  namn: z.string().trim().min(1).max(200),
  epost: z.string().trim().email().max(200),
  telefon: z.string().trim().max(40),
  webbplats: z.string().trim().max(200),
  meddelande: z.string().trim().max(3000),
  /** Id:n för nivåer, bygge och engångsjobb (VAL i priser.ts). */
  jobb: z
    .array(z.string().refine((id) => VAL.some((v) => v.id === id)))
    .min(1)
    .max(VAL.length),
  falla: z.string().max(500),
});

const valRad = (v: Val) =>
  `- ${v.namn}: ${v.fran ? `offert (från ${kr(v.belopp)})` : `${kr(v.belopp)}${v.enhet === "mån" ? "/mån" : ""}`}`;

/**
 * Förfrågan från prissidan. Priset räknas om här från priser.ts – det som kommer från
 * webbläsaren är bara vilka val som gjorts, aldrig belopp.
 */
export async function hanteraEngangsforfragan(indata: unknown): Promise<{ ok: true }> {
  const data = EngangsSchema.parse(indata);
  if (data.falla) return { ok: true as const };

  const nyckel = process.env["RESEND_API_KEY"];
  const till = process.env["KONTAKT_TILL"];
  if (!nyckel || !till) {
    console.error(
      "Prisförfrågan: RESEND_API_KEY eller KONTAKT_TILL saknas – inget mejl skickades.",
    );
    throw new Error("Formuläret är inte kopplat till någon mottagare ännu.");
  }

  const r = raknaVal(data.jobb);
  const urval: string[] = [];
  if (r.manad.length > 0) {
    urval.push("Per månad:", ...r.manad.map(valRad), `Totalt per månad: ${kr(r.manadSumma)}`, "");
  }
  if (r.engang.length > 0) {
    urval.push(
      "Engång:",
      ...r.engang.map(valRad),
      ...(r.procent > 0 ? [`Mängdrabatt ${r.procent} % på engångsjobben: −${kr(r.rabatt)}`] : []),
      `Totalt engång: ${kr(r.engangTotal)}`,
      "",
    );
  }
  urval.push("Alla priser exkl. moms.");

  const sammanfattning = [
    r.manadSumma > 0 ? `${kr(r.manadSumma)}/mån` : null,
    r.engangTotal > 0 ? `${kr(r.engangTotal)} engång` : null,
  ]
    .filter(Boolean)
    .join(" + ");

  const internt = [
    `Företag/namn: ${data.namn}`,
    `E-post: ${data.epost}`,
    data.telefon ? `Telefon: ${data.telefon}` : null,
    data.webbplats ? `Webbplats: ${data.webbplats}` : null,
    "",
    ...urval,
    data.meddelande ? `\nMeddelande:\n${data.meddelande}` : null,
  ].filter((rad): rad is string => rad !== null);

  await skickaMejl(nyckel, {
    to: till.split(",").map((a) => a.trim()),
    reply_to: data.epost,
    subject: `Förfrågan från prissidan – ${data.namn}${sammanfattning ? ` – ${sammanfattning}` : ""}`,
    text: internt.join("\n"),
  });

  // Kopia till kunden – bara när en egen, verifierad avsändare finns. Resends testavsändare
  // kan inte skicka till andra adresser än kontots egen. Misslyckas kopian stoppar det inte
  // förfrågan, som redan har kommit fram.
  if (process.env["KONTAKT_FRAN"]) {
    try {
      await skickaMejl(nyckel, {
        to: [data.epost],
        reply_to: till.split(",")[0]?.trim() ?? "",
        subject: "Vi har fått er förfrågan – TAB Marketing",
        text: [
          `Hej ${data.namn},`,
          "",
          "Tack för er förfrågan. Så här ser den ut:",
          "",
          ...urval,
          "",
          "Vi återkommer inom en arbetsdag med en bekräftelse. Inget är beställt förrän ni har godkänt den.",
          "",
          "TAB Marketing",
        ].join("\n"),
      });
    } catch (fel) {
      console.error("Prisförfrågan: kopian till kunden kunde inte skickas", fel);
    }
  }
  return { ok: true as const };
}
