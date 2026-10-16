// Enda källan till företagsuppgifter. Allt på sajten (sidfot, kontakt, integritetspolicy,
// metadata, strukturerad data och llms.txt) läser härifrån.
//
// Fält med tomt värde visas inte på sajten förrän de fylls i.
// TODO(TAB): fyll i adress och telefon när ni vill visa dem.
export const FORETAG: {
  /** Varumärket som syns på sajten. */
  namn: string;
  /** Kort form – den stora ordbilden och "Varför TAB". */
  kortnamn: string;
  /** Bolaget som driver verksamheten (personuppgiftsansvarig, fakturerar). */
  juridisktNamn: string;
  /** En mening om vad företaget gör – används i metadata, strukturerad data och llms.txt. */
  beskrivning: string;
  /** Säte. Används bara i adressen och den strukturerade datan – inte i rubriker eller texter. */
  ort: string;
  orgnr: string;
  momsnr: string;
  gata: string;
  postnummer: string;
  adress: string;
  telefon: string;
  telefonLank: string;
  epost: string;
  oppettider: readonly { dagar: string; tid: string }[];
  personer: readonly { namn: string; roll: string }[];
} = {
  namn: "TAB Marketing",
  kortnamn: "TAB",
  juridisktNamn: "Treatly AB",
  beskrivning:
    "Marknadsföringsbyrå som tar fram marknadsföringsbilder, sköter SEO, GEO och Meta-annonser och bygger och förbättrar hemsidor åt företag i hela Sverige – till fasta priser.",
  ort: "Göteborg",
  orgnr: "559582-8046",
  momsnr: "SE559582804601",
  gata: "",
  postnummer: "",
  adress: "",
  telefon: "",
  telefonLank: "",
  epost: "edvin@treatlymarketing.se",
  oppettider: [],
  personer: [],
};

declare const __SAJT_URL__: string;

/** Sajtens publika adress utan avslutande snedstreck, t.ex. https://exempel.se */
export const SAJT_URL: string = __SAJT_URL__;

/** Gör en sökväg (/priser) till en absolut adress (https://…/priser). */
export function absolut(sokvag: string): string {
  return `${SAJT_URL}${sokvag === "/" ? "/" : sokvag}`;
}
