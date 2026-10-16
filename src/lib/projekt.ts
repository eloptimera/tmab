// Tidigare projekt som visas på startsidan.
// TODO(Treatly): stämmer beskrivningarna med vad ni faktiskt gjorde i varje uppdrag?
export type Projekt = {
  namn: string;
  kategori: string;
  text: string;
  url: string;
  doman: string;
  /** Två färger ur blob-paletten som ger kortet sin egen färgklick. */
  farger: readonly [string, string];
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
  },
  {
    namn: "Martinssons",
    kategori: "Billackering",
    text: "Billackering, rostskydd och plastreparationer för privatpersoner, försäkringsbolag och företag.",
    url: "https://martinsson.vercel.app",
    doman: "martinsson.vercel.app",
    farger: ["#7fe3ff", "#3d7bff"],
  },
];
