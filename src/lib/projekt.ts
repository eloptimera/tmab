// Tidigare projekt som visas på startsidan.
// TODO(TAB): stämmer beskrivningarna med vad ni faktiskt gjorde i varje uppdrag?
export type Projekt = {
  namn: string;
  kategori: string;
  text: string;
  url: string;
  doman: string;
  /** Två färger ur blob-paletten som ger kortet sin egen färgklick. */
  farger: readonly [string, string];
  /**
   * Riktiga skärmbilder av sajten (public/projekt/). Tagna från projektets egen källkod
   * 2026-10-19 – ta nya när sajten ändras.
   */
  skarmbild?: { dator: string; mobil: string };
};

export const PROJEKT: readonly Projekt[] = [
  {
    namn: "Treatly",
    kategori: "Personaluppvaktning",
    text: "Födelsedagar, jubileum och fredagsfika från lokala bagerier – godkänt i ett klick.",
    url: "https://www.treatly.se",
    doman: "treatly.se",
    farger: ["#ffb066", "#ff4f6e"],
  },
  {
    namn: "Scudaro",
    kategori: "Streetwear",
    text: "Oversized streetwear med racing i blodet, släppt i små kollektioner.",
    url: "https://www.scudaro.com",
    doman: "scudaro.com",
    farger: ["#8a4dff", "#3a1fe0"],
    skarmbild: {
      dator: "/projekt/scudaro-hemsida.webp",
      mobil: "/projekt/scudaro-hemsida-mobil.webp",
    },
  },
  {
    namn: "Martinssons",
    kategori: "Billackering",
    text: "Billackering, rostskydd och plastreparationer för privatpersoner, försäkringsbolag och företag.",
    url: "https://martinsson.vercel.app",
    doman: "martinsson.vercel.app",
    farger: ["#7fe3ff", "#3d7bff"],
    skarmbild: {
      dator: "/projekt/martinsson-hemsida.webp",
      mobil: "/projekt/martinsson-hemsida-mobil.webp",
    },
  },
];

// Marknadsföringsbilder som visas under projekten. Filerna ligger i public/projekt/.
// TODO(TAB): bekräfta att ni har rätt att visa bilderna och vilka kunder de gjordes för.
export type Bild = {
  src: string;
  alt: string;
  etikett: string;
  bredd: number;
  hojd: number;
};

export const BILDER: readonly Bild[] = [
  {
    src: "/projekt/karamellsas.webp",
    alt: "Flaska med karamellsås som rinner över glasskulor i en skål av metall",
    etikett: "Produktbild · Dryck & dessert",
    bredd: 900,
    hojd: 1205,
  },
  {
    src: "/projekt/serum.webp",
    alt: "Serumflaska som ligger bland jordgubbar i röd sirap",
    etikett: "Produktbild · Hudvård",
    bredd: 768,
    hojd: 1376,
  },
  {
    src: "/projekt/solglasogon.webp",
    alt: "Hand som håller upp solglasögon mot blå himmel, i en mobilkameras sökare",
    etikett: "Kampanjbild · Glasögon",
    bredd: 900,
    hojd: 1599,
  },
  {
    src: "/projekt/tshirt.webp",
    alt: "Modell bakifrån i svart t-shirt med röd text på ryggen",
    etikett: "Lookbook · Streetwear",
    bredd: 768,
    hojd: 1376,
  },
];
