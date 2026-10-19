// Landningssidan /webbyra – TAB som webbyrå: leverantören, arbetssättet och samarbetet.
// Skild från /hemsida-foretag (själva tjänsten att beställa en ny hemsida). Priser hämtas
// från priser.ts – skriv aldrig belopp här.
import { AGANDE_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const WEBBYRA = {
  sokvag: "/webbyra",
  titel: "Webbyrå",
  etikett: "Om oss · Webbyrå",
  seoTitel: "Webbyrå för företag – webbdesign & utveckling",
  seoBeskrivning: `Söker ni en webbyrå? TAB hjälper företag med webbdesign, webbutveckling och SEO – nya hemsidor från ${kr(PRIS.hemsida)}. Boka en gratis genomgång.`,
  kortText:
    "Vad en webbyrå gör, hur vi arbetar från första mötet till lansering, vad det kostar och hur ni väljer rätt byrå.",
  publicerad: "2026-10-19",
  uppdaterad: "2026-10-19",
} as const;

export const WEBBYRA_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad gör en webbyrå?",
    svar: "En webbyrå planerar, designar, bygger och förbättrar webbplatser. Hos oss ingår också text och bilder, SEO från start och hjälp med att vidareutveckla sajten efter lansering.",
  },
  {
    fraga: "Vad kostar det att anlita en webbyrå?",
    svar: `Hos oss kostar en ny hemsida från ${kr(PRIS.hemsida)} och en uppfräschning av en befintlig från ${kr(PRIS.uppfraschning)}. Slutpriset beror på antal sidor, funktioner och hur mycket innehåll vi tar fram – ni får ett förslag med pris efter den kostnadsfria genomgången. ${MOMS_TEXT}`,
  },
  {
    fraga: "Hur lång tid tar det att bygga en hemsida med en webbyrå?",
    svar: "Det beror på sajtens storlek, funktioner och hur snabbt texter, bilder och återkoppling finns på plats. Ni får en tidplan att godkänna innan vi börjar bygga.",
  },
  {
    fraga: "Kan ni hjälpa småföretag med webbdesign?",
    svar: "Ja. Vi anpassar omfattningen efter företaget – ett mindre företag behöver sällan en stor sajt, men en som tydligt visar vad ni gör och gör det lätt att höra av sig.",
  },
  {
    fraga: "Kan ni förbättra vår befintliga hemsida?",
    svar: `Ja. Vi kan förbättra design, navigering, mobilanpassning, hastighet och innehåll i den sajt ni redan har. En uppfräschning kostar från ${kr(PRIS.uppfraschning)}.`,
  },
  {
    fraga: "Vad är skillnaden mellan webbdesign och webbutveckling?",
    svar: "Webbdesign är hur sajten ser ut och hur den är att använda. Webbutveckling är att bygga den – koden, funktionerna och tekniken som gör att den fungerar och laddar snabbt. Vi gör båda.",
  },
  {
    fraga: "Kan ni hjälpa till med SEO?",
    svar: "Ja. En SEO-grund ingår när vi bygger en hemsida, och vi erbjuder även löpande sökmotoroptimering: sökordsanalys, teknisk SEO, metadata och innehåll.",
  },
  {
    fraga: "Är hemsidorna mobilanpassade?",
    svar: "Ja. Vi bygger med responsiv design och testar på mobil, surfplatta och dator innan lansering.",
  },
  {
    fraga: "Kan ni hjälpa till med domän och publicering?",
    svar: "Ja. Vi går igenom vilken domän och vilket webbhotell som passar och publicerar sajten enligt det vi kommit överens om. Domänen och kontona registreras i ert namn.",
  },
  {
    fraga: "Kan vi få en hemsida med kontaktformulär?",
    svar: "Ja. Vi utformar formuläret efter vad ni behöver veta för att kunna svara – frågor, offertförfrågningar eller bokningar.",
  },
  {
    fraga: "Behöver vi redan ha texter och bilder?",
    svar: "Nej. Vi kan skriva texterna och ta fram bilderna, eller utgå från det ni redan har. Vi går igenom materialet på genomgången så att ni vet vad som behövs.",
  },
  {
    fraga: "Vem äger hemsidan?",
    svar: `Ni. ${AGANDE_TEXT}`,
  },
  {
    fraga: "Hur väljer vi rätt webbyrå?",
    svar: "Titta på byråns tidigare sajter, be om ett skriftligt förslag på vad som ingår, fråga vem som äger sajten och kontona efteråt och vad det kostar att ändra den senare. Välj den som passar er, inte den med flest funktioner.",
  },
  {
    fraga: "Hur kommer vi igång?",
    svar: "Boka en gratis genomgång på 20–25 minuter och berätta kort om företaget. Efteråt får ni ett förslag med upplägg och pris.",
  },
];
