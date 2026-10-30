// Serverdelen av bokningsformuläret: kontroll av indata och utskick via Resend.
// Laddas bara på servern (se bokning.ts), så zod och nycklar når aldrig webbläsaren.
import { z } from "zod";
import { ENGANGSJOBB, hittaEngangsjobb, kr, raknaEngang } from "@/lib/priser";

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
  jobb: z
    .array(z.string().refine((id) => ENGANGSJOBB.some((j) => j.id === id)))
    .min(1)
    .max(ENGANGSJOBB.length),
  falla: z.string().max(500),
});

/**
 * Förfrågan från engångsväljaren. Priset räknas om här från priser.ts – det som kommer
 * från webbläsaren är bara vilka jobb som valts, aldrig belopp.
 */
export async function hanteraEngangsforfragan(indata: unknown): Promise<{ ok: true }> {
  const data = EngangsSchema.parse(indata);
  if (data.falla) return { ok: true as const };

  const nyckel = process.env["RESEND_API_KEY"];
  const till = process.env["KONTAKT_TILL"];
  if (!nyckel || !till) {
    console.error(
      "Engångsförfrågan: RESEND_API_KEY eller KONTAKT_TILL saknas – inget mejl skickades.",
    );
    throw new Error("Formuläret är inte kopplat till någon mottagare ännu.");
  }

  const valda = hittaEngangsjobb(data.jobb);
  const r = raknaEngang(valda);
  const jobbrader = valda.map(
    (j) => `- ${j.namn}: ${j.fran ? `offert (från ${kr(j.belopp)})` : kr(j.belopp)}`,
  );
  const prisrader = [
    `Summa: ${kr(r.summa)}`,
    r.procent > 0 && `Mängdrabatt ${r.procent} %: −${kr(r.rabatt)}`,
    `Totalt: ${kr(r.total)} exkl. moms`,
  ].filter(Boolean);

  const internt = [
    `Företag/namn: ${data.namn}`,
    `E-post: ${data.epost}`,
    data.telefon ? `Telefon: ${data.telefon}` : null,
    data.webbplats ? `Webbplats: ${data.webbplats}` : null,
    "",
    "Valda engångsjobb:",
    ...jobbrader,
    "",
    ...prisrader,
    data.meddelande ? `\nMeddelande:\n${data.meddelande}` : null,
  ].filter((r): r is string => r !== null);

  await skickaMejl(nyckel, {
    to: till.split(",").map((a) => a.trim()),
    reply_to: data.epost,
    subject: `Förfrågan om engångsjobb – ${data.namn} – ${kr(r.total)}`,
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
          "Tack för er förfrågan. Så här ser det ut:",
          "",
          ...jobbrader,
          "",
          ...prisrader,
          "",
          "Vi återkommer inom en arbetsdag med en bekräftelse. Inget är beställt förrän ni har godkänt den.",
          "",
          "TAB Marketing",
        ].join("\n"),
      });
    } catch (fel) {
      console.error("Engångsförfrågan: kopian till kunden kunde inte skickas", fel);
    }
  }
  return { ok: true as const };
}
