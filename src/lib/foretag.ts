// Enda källan till företagsuppgifter. Allt på sajten (sidfot, kontakt, integritetspolicy,
// metadata, strukturerad data och llms.txt) läser härifrån.
//
// Fält med tomt värde visas inte på sajten förrän de fylls i.
// TODO(Treatly): fyll i org.nr, adress, telefon, e-post och personer.
export const FORETAG: {
  namn: string;
  kortnamn: string;
  /** En mening om vad företaget gör – används i metadata, strukturerad data och llms.txt. */
  beskrivning: string;
  /** Säte. Används bara i adressen och den strukturerade datan – inte i rubriker eller texter. */
  ort: string;
  orgnr: string;
  gata: string;
  postnummer: string;
  adress: string;
  telefon: string;
  telefonLank: string;
  epost: string;
  oppettider: readonly { dagar: string; tid: string }[];
  personer: readonly { namn: string; roll: string }[];
} = {
  namn: "Treatly – Marketing AB",
  kortnamn: "Treatly",
  beskrivning:
    "Marknadsföringsbyrå som tar fram marknadsföringsbilder, sköter SEO, GEO och Meta-annonser och bygger och förbättrar hemsidor åt företag i hela Sverige – till fasta priser.",
  ort: "Göteborg",
  orgnr: "",
  gata: "",
  postnummer: "",
  adress: "",
  telefon: "",
  telefonLank: "",
  epost: "",
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
