// Enda källan till företagsuppgifter. Allt på sajten (sidfot, kontakt, integritetspolicy,
// meta-data) läser härifrån.
//
// Fält med tomt värde visas inte på sajten förrän de fylls i.
// TODO(Treatly): fyll i org.nr, adress, telefon, e-post och personer innan sajten går live.
export const FORETAG: {
  namn: string;
  kortnamn: string;
  ort: string;
  omrade: string;
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
  ort: "Göteborg",
  omrade: "Göteborg",
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
