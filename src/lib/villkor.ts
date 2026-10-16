// Allmänna villkor för TAB Marketing. Sidan /villkor renderas härifrån.
// TODO(TAB): utkast – låt någon med juridisk kunskap läsa igenom innan ni hänvisar kunder hit.
import { FORETAG } from "@/lib/foretag";
import { AGANDE_TEXT, BETALNING_TEXT, BINDNING_TEXT, GARANTI_TEXT, MOMS_TEXT } from "@/lib/priser";

export const VILLKOR_DATUM = "2026-10-16";

export const VILLKOR: readonly { rubrik: string; stycken: readonly string[] }[] = [
  {
    rubrik: "1. Parter och tillämpning",
    stycken: [
      `${FORETAG.namn} drivs av ${FORETAG.juridisktNamn}, org.nr ${FORETAG.orgnr} ("vi"). Villkoren gäller när ett företag ("kunden") köper våra tjänster.`,
      "Våra tjänster riktar sig till företag och andra näringsidkare. Det som står i en godkänd offert gäller före dessa villkor.",
    ],
  },
  {
    rubrik: "2. Avtal",
    stycken: [
      "Avtal ingås när kunden godkänner vår offert skriftligt. Ett svar via mejl räcker.",
      "En offert gäller i 30 dagar från att den skickades.",
    ],
  },
  {
    rubrik: "3. Priser och betalning",
    stycken: [
      `${MOMS_TEXT} ${BETALNING_TEXT} Vid försenad betalning debiteras dröjsmålsränta enligt räntelagen.`,
      "Annonsbudget för Meta och andra kanaler betalar kunden direkt till respektive plattform. Den ingår aldrig i våra priser.",
    ],
  },
  {
    rubrik: "4. Månadspaket och uppsägning",
    stycken: [
      `${BINDNING_TEXT} Uppsägning görs via mejl till ${FORETAG.epost}.`,
      "Påbörjad period återbetalas inte. Leveranser som ingår i ett paket gäller för den månaden och sparas inte till nästa.",
    ],
  },
  {
    rubrik: "5. Leveranser och ändringar",
    stycken: [
      "Vi levererar det som står i paketet eller offerten.",
      `${GARANTI_TEXT} För hemsidor ingår en ändringsrunda innan lansering, enligt den tidplan kunden godkänt.`,
      "Arbete utanför det avtalade debiteras enligt överenskommelse, som vi alltid stämmer av med kunden innan arbetet börjar.",
    ],
  },
  {
    rubrik: "6. Kundens ansvar",
    stycken: [
      "Kunden ger oss det material, den åtkomst och de svar vi behöver i tid. Förseningar hos kunden flyttar tidplanen lika mycket.",
      "Kunden ansvarar för att material som kunden själv lämnar, till exempel logotyper, bilder och texter, får användas.",
    ],
  },
  {
    rubrik: "7. Rättigheter till materialet",
    stycken: [
      `${AGANDE_TEXT} Rätten går över till kunden när betalning skett.`,
      "Bilder kan tas fram helt eller delvis med AI-verktyg. Kunden ansvarar för att märka sådant innehåll där lag eller en plattforms regler kräver det.",
      "Vi får visa arbetet som referens, om vi inte avtalat något annat.",
    ],
  },
  {
    rubrik: "8. Konton och åtkomst",
    stycken: [
      "Konton för exempelvis Google, Meta, domän och webbhotell ska ligga i kundens namn. Vi får åtkomst som användare eller partner.",
      "När samarbetet upphör lämnar vi tillbaka all åtkomst och överlämnar material vi tagit fram.",
    ],
  },
  {
    rubrik: "9. Resultat",
    stycken: [
      "Vi lovar att utföra arbetet fackmannamässigt och rapportera vad vi gjort. Placeringar i sökresultat, omnämnanden i AI-svar och annonsresultat styrs av andra och kan inte garanteras.",
    ],
  },
  {
    rubrik: "10. Ansvarsbegränsning",
    stycken: [
      "Vårt ansvar är begränsat till det belopp kunden betalat för den aktuella tjänsten de senaste tre månaderna. Vi ansvarar inte för indirekta skador, till exempel utebliven vinst.",
    ],
  },
  {
    rubrik: "11. Personuppgifter",
    stycken: [
      "När vi behandlar personuppgifter för kundens räkning, till exempel kundlistor eller formulär, tecknar vi ett personuppgiftsbiträdesavtal. Hur vi hanterar uppgifter som lämnas på webbplatsen står i integritetspolicyn.",
    ],
  },
  {
    rubrik: "12. Ändringar och tvist",
    stycken: [
      "Vi kan ändra villkoren. Ändringar meddelas kunden minst 30 dagar i förväg och gäller från nästa betalningsperiod.",
      "Svensk lag gäller. Tvister avgörs av svensk allmän domstol.",
    ],
  },
];
