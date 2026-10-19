// Landningssidan /seo-smaforetag – SEO för småföretag.
// Ersätter guiden /guider/seo-for-smaforetag (som omdirigeras hit); guidens checklista finns
// kvar som SJALV_LISTA. Skild från /seo-byra: här står småföretagens budget, prioriteringar
// och vad de kan göra själva i centrum. Priser hämtas från priser.ts.
import { BINDNING_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const SEO_SMAFORETAG = {
  sokvag: "/seo-smaforetag",
  titel: "SEO för småföretag",
  etikett: "Tjänst · SEO",
  seoTitel: "SEO för småföretag – fler kunder via Google",
  seoBeskrivning: `SEO för småföretag som vill synas bättre på Google. Vi hjälper er med sökord, lokal SEO och innehåll som når rätt kunder – från ${kr(PRIS.start)}/mån.`,
  kortText:
    "Var ett litet företag ska börja, vad det kostar, tio saker ni kan fixa själva – och när det lönar sig att ta hjälp.",
  // Guiden som sidan ersätter publicerades 2026-10-16.
  publicerad: "2026-10-16",
  uppdaterad: "2026-10-19",
} as const;

/** Tio saker ett småföretag kan göra själv – flyttad från guiden. */
export const SJALV_LISTA: readonly { titel: string; text: string }[] = [
  {
    titel: "Koppla Google Search Console",
    text: "Då ser ni vilka sökningar ni redan syns för och om Google hittar alla era sidor.",
  },
  {
    titel: "Fyll i Google-företagsprofilen",
    text: "Den styr hur ni syns på Google Maps och i lokala sökningar. Lägg in öppettider, tjänster och bilder.",
  },
  {
    titel: "Skriv en unik sidtitel för varje sida",
    text: "Börja med det kunden söker på, till exempel ”Elektriker i Västerås – akut och planerat”, inte ”Startsida”.",
  },
  {
    titel: "Skriv en beskrivning per sida",
    text: "Den syns under titeln i sökresultatet och avgör ofta om någon klickar. Håll den under cirka 155 tecken.",
  },
  {
    titel: "En sida per tjänst",
    text: "En sida som handlar om en sak har lättare att ranka än en sida som räknar upp allt.",
  },
  {
    titel: "Svara på vanliga frågor",
    text: "Samla det kunder frågar och svara på hemsidan. Det hjälper både Google och AI-assistenter.",
  },
  {
    titel: "Gör sajten snabb på mobilen",
    text: "Testa i PageSpeed Insights. Stora bilder är den vanligaste orsaken till långsamma sidor.",
  },
  {
    titel: "Ge bilderna namn och alt-text",
    text: "”rostskydd-bil.jpg” säger mer än ”IMG_4021.jpg”, och alt-texten beskriver bilden för den som inte ser den.",
  },
  {
    titel: "Länka mellan era egna sidor",
    text: "Från startsidan till tjänsterna, och från varje tjänst till kontakt.",
  },
  {
    titel: "Be nöjda kunder om omdömen",
    text: "Recensioner på Google-företagsprofilen påverkar hur högt ni syns i lokala sökningar.",
  },
];

export const SMAFORETAG_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Behöver småföretag SEO?",
    svar: "Många har nytta av det, särskilt om kunderna använder Google för att hitta tjänster eller jämföra leverantörer. Hur mycket arbete som behövs beror på företagets mål och marknad – för vissa räcker grunden, andra behöver löpande arbete.",
  },
  {
    fraga: "Vad kostar SEO för ett småföretag?",
    svar: `Hos oss kostar en grundoptimering av SEO och GEO ${kr(PRIS.seoGeo)} som engångsinsats. Löpande SEO ingår i alla månadspaket – det minsta, Start, kostar ${kr(PRIS.start)} per månad. ${BINDNING_TEXT} ${MOMS_TEXT}`,
  },
  {
    fraga: "Kan ett litet företag konkurrera på Google?",
    svar: "Ja, på rätt sökningar. Ett litet företag vinner sällan på breda sökord, men ofta på specifika tjänster i ett visst område. Placeringar i Googles sökresultat kan ingen garantera.",
  },
  {
    fraga: "Hur får vi fler kunder via Google?",
    svar: "Ta reda på vad kunderna söker på, se till att det finns en tydlig sida för varje tjänst och gör det enkelt att höra av sig. SEO gör att fler hittar er – hur många som blir kunder beror också på erbjudandet, priset och hemsidan.",
  },
  {
    fraga: "Hur lång tid tar SEO för ett småföretag?",
    svar: "Tekniska fel och otydliga sidtitlar kan ge effekt inom några veckor. Konkurrensutsatta sökningar tar oftast flera månader. Därför ingår SEO löpande i månadspaketen.",
  },
  {
    fraga: "Vad ska vi börja med om vi bara hinner en sak?",
    svar: "Google-företagsprofilen om ni har kunder i ett visst område. Annars en tydlig sidtitel och beskrivning på era viktigaste sidor.",
  },
  {
    fraga: "Måste man betala för att synas på Google?",
    svar: "Nej. En plats i de vanliga sökresultaten går inte att köpa. Annonser är något annat och märks som sponsrade.",
  },
  {
    fraga: "Vad är lokal SEO?",
    svar: "Arbetet med att synas när någon söker efter en tjänst i ett visst område, till exempel ”frisör Malmö”. Google-företagsprofilen, sidor om orterna ni arbetar i och omdömen spelar stor roll.",
  },
  {
    fraga: "Behöver vi en ny hemsida för att börja med SEO?",
    svar: "Nej, oftast går den hemsida ni har att förbättra. Har den större tekniska eller innehållsmässiga brister kan en uppfräschning eller ny hemsida vara bättre – det ser vi på genomgången.",
  },
  {
    fraga: "Ska vi välja SEO eller Google Ads?",
    svar: "Det beror på hur snabbt ni behöver kunder och vilken budget ni har. Annonser ger synlighet direkt men bara så länge ni betalar. SEO tar längre tid men fortsätter ge besök. Många använder båda.",
  },
  {
    fraga: "Kan ni hjälpa nystartade företag med SEO?",
    svar: "Ja. Ett nytt företag har en fördel: hemsidan kan byggas med rätt struktur och sökord från start, så att ni slipper göra om den senare.",
  },
  {
    fraga: "Kan småföretag synas i ChatGPT och andra AI-tjänster?",
    svar: "Det går att förbättra förutsättningarna med tydligt innehåll, korrekta uppgifter om företaget och omnämnanden på andra sajter – samma grund som SEO. Ingen kan garantera att en AI-tjänst rekommenderar ett visst företag.",
  },
  {
    fraga: "Hur ofta behöver man jobba med SEO?",
    svar: "Grunden gör ni en gång. Därefter räcker det långt att följa upp i Search Console varje månad och lägga till nytt innehåll när ni har något att säga – eller låta oss sköta det i ett månadspaket.",
  },
  {
    fraga: "Hur kommer vi igång?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Vi tittar på er hemsida och hur ni syns i dag, och ni får ett förslag på vad som bör göras först – utan kostnad.",
  },
];
