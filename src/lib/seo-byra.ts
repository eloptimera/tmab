// Landningssidan /seo-byra – sajtens sida för SEO-tjänsten.
// Ersätter /tjanster/seo (som omdirigeras hit). Priser hämtas från priser.ts – skriv aldrig
// belopp här.
import { BINDNING_TEXT, GSC_SVAR, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const SEO_BYRA = {
  sokvag: "/seo-byra",
  titel: "SEO-byrå",
  etikett: "Tjänst · SEO",
  seoTitel: "SEO-byrå för företag – sökmotoroptimering",
  seoBeskrivning: `Vill ni synas bättre på Google? TAB hjälper företag med teknisk SEO, sökordsanalys och innehåll som når rätt kunder. Grundoptimering ${kr(PRIS.seoGeo)}.`,
  kortText:
    "Vad SEO är, vad vi gör, hur arbetet går till och vad sökmotoroptimering kostar för ett företag.",
  publicerad: "2026-10-19",
  uppdaterad: "2026-10-19",
} as const;

export const SEO_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad gör en SEO-byrå?",
    svar: "En SEO-byrå hjälper företag att förbättra webbplatsens förutsättningar att synas i Googles vanliga sökresultat. Arbetet omfattar bland annat sökordsanalys, teknisk SEO, optimering av sidor och innehåll, internlänkning och uppföljning.",
  },
  {
    fraga: "Hur lång tid tar det innan SEO ger resultat?",
    svar: "Tekniska fel och otydliga sidtitlar kan ge effekt inom några veckor. Placeringar på konkurrensutsatta sökord tar oftast flera månader. Det beror på konkurrensen, hur sajten ser ut i dag och vilka åtgärder som görs – därför ingår löpande SEO i månadspaketen.",
  },
  {
    fraga: "Vad kostar det att anlita en SEO-byrå?",
    svar: `Hos oss kostar en grundoptimering av SEO och GEO ${kr(PRIS.seoGeo)}. Löpande SEO ingår i alla månadspaket, från ${kr(PRIS.start)} per månad, utan bindningstid. ${MOMS_TEXT}`,
  },
  {
    fraga: "Kan SEO hjälpa småföretag att få fler kunder?",
    svar: "Ja. Ett mindre företag kan ofta synas på specifika sökningar – en tjänst i en viss stad, till exempel – där konkurrensen är lägre än på breda sökord. Hur många förfrågningar det blir beror på efterfrågan, konkurrensen och hur bra sajten är på att göra besökare till kunder.",
  },
  {
    fraga: "Vad är skillnaden mellan SEO och Google Ads?",
    svar: "Google Ads är betalda annonser där ni betalar för klicken och syns så länge budgeten räcker. SEO handlar om de vanliga sökresultaten – där betalar ni inget till Google per klick, men arbetet med att komma dit kostar tid eller pengar.",
  },
  {
    fraga: "Vad är teknisk SEO?",
    svar: "Teknisk SEO är det som gör att Google kan hitta, läsa och indexera sajten: laddningstid, mobilanpassning, sitemap, canonical-taggar, länkstruktur och att inga viktiga sidor är blockerade.",
  },
  {
    fraga: "Vad är lokal SEO?",
    svar: "Lokal SEO är arbetet med att synas när någon söker efter en tjänst i ett visst område, till exempel ”elektriker Uppsala”. Google-företagsprofilen, lokala sidor på hemsidan och omdömen spelar stor roll.",
  },
  {
    fraga: "Kan ni hjälpa oss att synas bättre på Google Maps?",
    svar: "Vi kan gå igenom er Google-företagsprofil och er hemsida och föreslå vad som bör förbättras, om företaget uppfyller Googles krav för en profil. En viss placering i Google Maps kan ingen garantera.",
  },
  {
    fraga: "Behöver vi en ny hemsida för att jobba med SEO?",
    svar: "Nej, oftast går det att förbättra den hemsida ni har. Har sajten stora tekniska begränsningar eller en struktur som är svår att bygga vidare på kan en ny hemsida vara det bättre alternativet – det ser vi på genomgången.",
  },
  {
    fraga: "Kan ni kombinera SEO med GEO och synlighet i AI?",
    svar: "Ja. SEO och GEO bygger på samma grund – tydligt innehåll, korrekt företagsinformation och en tekniskt sund sajt – så vi gör dem tillsammans. Ingen kan garantera att ett företag nämns i ett AI-svar.",
  },
  {
    fraga: "Hur vet vi om SEO-arbetet fungerar?",
    svar: `Vi följer organiska klick, visningar i sökresultaten, utvecklingen för era viktigaste sidor och förfrågningar som kommer därifrån. ${GSC_SVAR}`,
  },
  {
    fraga: "Finns det någon bindningstid?",
    svar: BINDNING_TEXT,
  },
  {
    fraga: "Hur kommer vi igång med SEO hos TAB?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Vi tittar på er hemsida och hur ni syns i dag, och ni får ett skräddarsytt förslag efteråt – utan kostnad.",
  },
];
