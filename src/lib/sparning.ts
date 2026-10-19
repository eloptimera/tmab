// Händelser till Vercel Analytics (cookiefri, ingen personuppgift skickas).
//
// Själva konverteringen – en skickad bokning – räknas som besök på /tack. Klick på
// bokningsknapparna skickas som händelsen "boka_klick" med vilken sida och vilken knapp, så
// att vi ser vilka knappar som leder till bokningar. Egna händelser visas i Vercel först på
// Pro-planen; på Hobby ignoreras de utan att något går sönder.
//
// Skicka aldrig namn, e-post, telefon eller fritext från formulär hit.
import { track } from "@vercel/analytics";

export function bokaKlick(sida: string, plats: string) {
  try {
    track("boka_klick", { sida, plats });
  } catch {
    // Statistik får aldrig stoppa ett klick.
  }
}
