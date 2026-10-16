// Bokningsformuläret skickas hit och vidare som mejl via Resend (https://resend.com).
//
// Kräver två miljövariabler i Vercel (Settings → Environment Variables):
//   RESEND_API_KEY  – API-nyckel från Resend
//   KONTAKT_TILL    – adressen som ska ta emot bokningarna (flera separeras med komma)
// Valfritt:
//   KONTAKT_FRAN    – avsändare, t.ex. "Webbplatsen <hej@er-doman.se>" när domänen är
//                     verifierad i Resend. Utan den används Resends testavsändare, som bara
//                     kan skicka till adressen ert Resend-konto är registrerat på.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const BokningSchema = z.object({
  namn: z.string().trim().min(1).max(120),
  foretag: z.string().trim().min(1).max(160),
  epost: z.string().trim().email().max(200),
  telefon: z.string().trim().max(40),
  webbplats: z.string().trim().max(200),
  tjanster: z.array(z.string().max(60)).max(10),
  paket: z.string().max(20),
  meddelande: z.string().trim().max(3000),
  /** Dolt fält som bara robotar fyller i. */
  falla: z.string().max(500),
});

export type Bokning = z.infer<typeof BokningSchema>;

export const skickaBokning = createServerFn({ method: "POST" })
  .validator((data: unknown) => BokningSchema.parse(data))
  .handler(async ({ data }) => {
    // Robot: låtsas att allt gick bra men skicka ingenting.
    if (data.falla) return { ok: true as const };

    const nyckel = process.env["RESEND_API_KEY"];
    const till = process.env["KONTAKT_TILL"];
    if (!nyckel || !till) {
      console.error("Bokning: RESEND_API_KEY eller KONTAKT_TILL saknas – inget mejl skickades.");
      throw new Error("Formuläret är inte kopplat till någon mottagare ännu.");
    }

    const rader = [
      `Namn: ${data.namn}`,
      `Företag: ${data.foretag}`,
      `E-post: ${data.epost}`,
      data.telefon && `Telefon: ${data.telefon}`,
      data.webbplats && `Webbplats: ${data.webbplats}`,
      data.paket && `Intresserad av paket: ${data.paket}`,
      data.tjanster.length > 0 && `Vill ha hjälp med: ${data.tjanster.join(", ")}`,
      data.meddelande && `\nMeddelande:\n${data.meddelande}`,
    ].filter(Boolean);

    const svar = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${nyckel}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env["KONTAKT_FRAN"] ?? "Webbplatsen <onboarding@resend.dev>",
        to: till.split(",").map((a) => a.trim()),
        reply_to: data.epost,
        subject: `Ny bokning av gratis genomgång – ${data.foretag}`,
        text: rader.join("\n"),
      }),
    });

    if (!svar.ok) {
      console.error("Bokning: Resend svarade", svar.status, await svar.text());
      throw new Error("Mejlet kunde inte skickas.");
    }
    return { ok: true as const };
  });
