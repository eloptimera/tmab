import {
  Bot,
  Camera,
  Gauge,
  LayoutTemplate,
  Megaphone,
  Search,
  type LucideIcon,
} from "lucide-react";

// "Det här krävs för att lyckas digitalt" på startsidan.
// TODO(Treatly): stämmer "med oss"-listorna med vad ni faktiskt levererar i varje tjänst?
export type Omrade = {
  id: string;
  titel: string;
  /** En rad om vad det ger, visas i den stängda raden. */
  vad: string;
  ikon: LucideIcon;
  /** 1–5: hur krångligt det är att göra själv. */
  svarighet: 1 | 2 | 3 | 4 | 5;
  /** Kort förklaring av området. */
  forklaring: string;
  /** Det du måste göra själv – visas som lösa lappar. */
  sjalv: readonly string[];
  /** Det vi tar hand om – visas som en checklista. */
  medOss: readonly string[];
};

export const OMRADEN: readonly Omrade[] = [
  {
    id: "seo",
    titel: "SEO",
    vad: "Synas när kunder söker på Google",
    ikon: Search,
    svarighet: 4,
    forklaring:
      "Sökmotoroptimering avgör om ni hamnar på första sidan eller sidan fem. Det är ett långsiktigt arbete där resultatet ofta syns först efter några månader.",
    sjalv: [
      "Ta reda på vilka sökord kunderna faktiskt använder",
      "Fixa teknik: laddtid, struktur och metadata",
      "Skriva nytt innehåll varje månad",
      "Hänga med när Google ändrar reglerna",
    ],
    medOss: [
      "Sökordsanalys mot era kunder",
      "Tekniska åtgärder på sajten",
      "Innehållsplan som vi skriver",
      "Rapport varje månad",
    ],
  },
  {
    id: "geo",
    titel: "GEO",
    vad: "Synas när kunder frågar ChatGPT och andra AI-assistenter",
    ikon: Bot,
    svarighet: 5,
    forklaring:
      "Generative Engine Optimization handlar om att bli nämnd och rekommenderad när någon frågar en AI-assistent. Området är nytt, det finns få färdiga verktyg och det är svårt att mäta.",
    sjalv: [
      "Förstå hur AI-assistenter väljer källor",
      "Strukturera sajten så att den går att citera",
      "Bli omnämnd på sajter som AI:n litar på",
      "Testa frågor manuellt för att se om ni dyker upp",
    ],
    medOss: [
      "Innehåll byggt för att citeras",
      "Strukturerad data på sajten",
      "Plan för omnämnanden",
      "Uppföljning av hur ni nämns",
    ],
  },
  {
    id: "meta",
    titel: "Meta-annonser",
    vad: "Nå rätt personer på Facebook och Instagram",
    ikon: Megaphone,
    svarighet: 4,
    forklaring:
      "Annonser på Facebook och Instagram kan ge kunder snabbt, men budgeten försvinner lika snabbt om målgrupp, spårning och annonsmaterial inte sitter.",
    sjalv: [
      "Sätta upp Business Manager och spårning",
      "Bygga målgrupper som inte är för breda",
      "Ta fram annonser i flera format",
      "Testa, läsa siffror och justera varje vecka",
    ],
    medOss: [
      "Konto och spårning på plats",
      "Annonsmaterial i alla format",
      "Löpande optimering av budgeten",
      "Tydlig rapport om vad det gav",
    ],
  },
  {
    id: "optimering",
    titel: "Optimering av hemsida",
    vad: "Få fler besökare att bli kunder",
    ikon: Gauge,
    svarighet: 3,
    forklaring:
      "Det spelar ingen roll hur många som hittar er om sajten är långsam, rörig på mobilen eller otydlig om nästa steg. Små ändringar ger ofta stor effekt.",
    sjalv: [
      "Installera och tolka analysverktyg",
      "Hitta var besökarna hoppar av",
      "Snabba upp sidor och bilder",
      "Ändra sajten utan att något går sönder",
    ],
    medOss: [
      "Genomgång av hela sajten",
      "Prioriterad lista med åtgärder",
      "Vi gör ändringarna åt er",
      "Mätning före och efter",
    ],
  },
  {
    id: "bilder",
    titel: "Marknadsföringsbilder",
    vad: "Bilder som får folk att sluta scrolla",
    ikon: Camera,
    svarighet: 4,
    forklaring:
      "Bilden är det första kunden ser i flödet och på sajten. Bra produktbilder kräver idé, ljus, rekvisita och efterarbete, och varje kanal vill ha sitt eget format.",
    sjalv: [
      "Komma på ett koncept som sticker ut",
      "Ordna fotograf, ljus och rekvisita",
      "Redigera varje bild",
      "Beskära om för varje kanal",
    ],
    medOss: [
      "Koncept anpassat efter varumärket",
      "Produktion av bilderna",
      "Färdiga format för alla kanaler",
      "Klara att publicera direkt",
    ],
  },
  {
    id: "hemsida",
    titel: "Bygga hemsida",
    vad: "En sajt som ser ut som ert varumärke och säljer",
    ikon: LayoutTemplate,
    svarighet: 5,
    forklaring:
      "En mall ser ut som alla andras, och en utvecklare på timme blir snabbt dyrt. En bra sajt kräver design, text, teknik och SEO som fungerar tillsammans.",
    sjalv: [
      "Välja plattform och mall",
      "Skriva all text och ta fram bilder",
      "Få den snabb och snygg på mobilen",
      "Sköta hosting, uppdateringar och GDPR",
    ],
    medOss: [
      "Design utifrån ert varumärke",
      "Text och bilder som säljer",
      "Utveckling och lansering",
      "Vi sköter driften efteråt",
    ],
  },
];
