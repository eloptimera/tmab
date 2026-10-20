// Landningssidan /hemsida-pris – vad en hemsida kostar hos TAB.
// Varje belopp kommer från priser.ts och räknas ut här, så att sidan aldrig visar ett pris som
// inte står i prislistan. Skild från /hemsida-foretag (tjänsten).
//
// TODO(TAB): komplettera när det är bestämt – visas inte på sajten förrän då:
//  - vad som ingår i grundpriset för en ny hemsida (antal sidor, funktioner)
//  - om ni rekommenderar ett webbhotell och ungefär vad domän och webbhotell kostar
//  - pris för ändringar efter lansering (timpris eller fast pris per offert) – ingår aldrig i paketen
//  - vilka paket "uppstart av större månadsabonnemang" gäller (Growth och Premium?)
import {
  AGANDE_TEXT,
  BETALNING_TEXT,
  BINDNING_TEXT,
  kr,
  MOMS_TEXT,
  PAKET,
  PRIS,
  type Fraga,
} from "@/lib/priser";

export const HEMSIDA_PRIS = {
  sokvag: "/hemsida-pris",
  titel: "Hemsida pris",
  etikett: "Pris · Hemsida",
  seoTitel: "Vad kostar en hemsida för företag? Våra priser",
  seoBeskrivning: `Vad kostar en hemsida till företag? Hos TAB från ${kr(PRIS.hemsida)}, engångspris exkl. moms. Se vad som ingår, löpande kostnader och årskostnad.`,
  kortText:
    "Vad en företagshemsida kostar hos oss, vad som ingår, löpande kostnader och vad ni betalar totalt första året.",
  publicerad: "2026-10-19",
  uppdaterad: "2026-10-20",
} as const;

/** Årskostnad hos oss: ny hemsida + tolv månader av paketet. Uppstart och moms ingår inte. */
export const ARSKOSTNAD = [
  {
    namn: "Bara hemsidan",
    start: PRIS.hemsida,
    perManad: 0,
    beskrivning: "Ni sköter ändringar själva eller beställer dem som engångsarbete när de behövs.",
  },
  ...PAKET.map((p) => ({
    namn: `Hemsida + ${p.namn}`,
    start: PRIS.hemsida,
    perManad: p.belopp,
    // Paketen är marknadsföring – visa det som läggs till efter lansering, inte rapport och möten.
    beskrivning: p.ingar.filter((r) => !/rapport|avstämning/i.test(r)).join(", "),
  })),
].map((r) => ({ ...r, forstaAret: r.start + 12 * r.perManad, darefter: 12 * r.perManad }));

export const HEMSIDA_PRIS_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad kostar en hemsida till företag?",
    svar: `Hos oss kostar en ny företagshemsida från ${kr(PRIS.hemsida)} som engångspris. Slutpriset beror på antal sidor, funktioner och hur mycket text och bild vi tar fram – ni får ett fast pris i offerten innan arbetet börjar. ${MOMS_TEXT}`,
  },
  {
    fraga: "Vad kostar det att bygga en professionell hemsida?",
    svar: `Startpriset är ${kr(PRIS.hemsida)}. Fler sidor, egna funktioner och mer innehåll påverkar priset uppåt. Då ingår design, text, bygge, mobilanpassning, SEO-grund och en ändringsrunda innan lansering.`,
  },
  {
    fraga: "Vad kostar en hemsida per månad?",
    svar: `Hos oss ingen månadsavgift för hemsidan. Ändringar efter lansering gör vi som engångsarbete med fast pris. Vill ni marknadsföra er löpande – bilder, SEO/GEO och Meta-annonser – finns månadspaket från ${kr(PRIS.start)} per månad. Domän och webbhotell betalar ni direkt till leverantören.`,
  },
  {
    fraga: "Är det ett engångspris eller en prenumeration?",
    svar: "Hemsidan är ett engångspris, och det är ändringar efter lansering också. Månadspaketen gäller marknadsföring och är frivilliga – de kan väljas till, nu eller senare.",
  },
  {
    fraga: "Ingår domän och webbhotell i priset?",
    svar: "Nej. Domän och webbhotell registreras i ert namn och betalas direkt till leverantören, så att ni alltid äger dem. Vi hjälper till att välja och sätta upp dem och går igenom kostnaden innan projektet börjar.",
  },
  {
    fraga: "Ingår SEO i hemsidans pris?",
    svar: `En SEO-grund ingår: sidstruktur, rubriker, sidtitlar, beskrivningar och mobilanpassning. Löpande sökmotoroptimering är en separat tjänst – en grundoptimering kostar ${kr(PRIS.seoGeo)} och löpande SEO ingår i alla månadspaket.`,
  },
  {
    fraga: "Kan vi uppdatera hemsidan efter lansering?",
    svar: "Ja. Ni äger sajten och kan ändra den själva eller låta oss göra det. Ändringar från oss är engångsarbete: ni får ett fast pris innan vi börjar. De ingår inte i månadspaketen, som bara innehåller marknadsföring.",
  },
  {
    fraga: "Vem äger hemsidan när den är klar?",
    svar: `Ni. ${AGANDE_TEXT} Rätten går över till er när betalning skett, och slutar ni hos oss lämnar vi över allt.`,
  },
  {
    fraga: "Finns det bindningstid?",
    svar: `Hemsidan har ingen bindningstid – den är ett engångsköp. För månadspaketen gäller: ${BINDNING_TEXT}`,
  },
  {
    fraga: "Hur betalar vi?",
    svar: `${BETALNING_TEXT} Offerten gäller i 30 dagar.`,
  },
  {
    fraga: "Vad kostar det att modernisera en hemsida vi redan har?",
    svar: `En uppfräschning kostar från ${kr(PRIS.uppfraschning)}, beroende på sajtens skick och vad som ska ändras. Ofta räcker det i stället för en ny hemsida.`,
  },
  {
    fraga: "Kan vi få en hemsida till fast pris?",
    svar: "Ja. Efter den kostnadsfria genomgången får ni en offert med fast pris och en beskrivning av vad som ingår. Arbete utöver det stämmer vi alltid av med er innan det görs.",
  },
  {
    fraga: "Hur beställer vi en hemsida?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Ni får en offert med pris och innehåll, och när ni godkänt den skriftligt – ett mejl räcker – sätter vi igång.",
  },
];
