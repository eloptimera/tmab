import {
  Bot,
  Camera,
  Gauge,
  LayoutTemplate,
  Megaphone,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { Steg } from "@/components/Steg";
import { GSC_SVAR, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

// De sex tjänsterna. Enda källan för startsidan, /tjanster, varje tjänstesida, sidfoten,
// kontaktformuläret, sitemap.xml och llms.txt.
// TODO(TAB): stämmer "Med oss"-listorna med vad ni levererar i varje tjänst?

export type Tjanst = {
  /** Används i adressen: /tjanster/{slug} */
  slug: string;
  /** Kort namn i menyer och listor. */
  titel: string;
  /** Namnet mitt i en mening, t.ex. "Läs mer om hemsideoptimering". */
  iText: string;
  /** Sidrubrik (h1). `markera` är den del som får gul understrykning. */
  rubrik: { text: string; markera: string };
  /** Sidans titel i sökresultat, utan företagsnamn (läggs till automatiskt). */
  seoTitel: string;
  /** Metabeskrivning, max ca 155 tecken. */
  seoBeskrivning: string;
  /** En rad om vad tjänsten ger. */
  vad: string;
  ikon: LucideIcon;
  /** 1–5: hur krångligt det är att göra själv. */
  svarighet: 1 | 2 | 3 | 4 | 5;
  forklaring: string;
  sjalv: readonly string[];
  medOss: readonly string[];
  pris: { belopp: number; fran: boolean; avser: string };
  /** Hur tjänsten ingår i månadspaketen, eller null om den inte gör det. */
  iPaket: string | null;
  /** Hur vi arbetar, steg för steg – visas som "Så jobbar vi" på tjänstesidan. */
  arbetssatt?: { steg: readonly Steg[]; underlag: string };
  fragor: readonly Fraga[];
  /**
   * Egen landningssida som ersätter /tjanster/{slug}. Den gamla adressen omdirigeras dit
   * (301) och alla interna länkar går direkt till landningssidan.
   */
  sida?: string;
};

export const TJANSTER: readonly Tjanst[] = [
  {
    slug: "seo",
    titel: "SEO",
    iText: "SEO",
    rubrik: { text: "SEO som gör att kunderna hittar er på Google", markera: "hittar er" },
    seoTitel: "SEO för företag – synas på Google",
    seoBeskrivning: `Sökmotoroptimering som får er att synas på Google. Grundoptimering ${kr(PRIS.seoGeo)}, löpande SEO ingår i alla månadspaket. Gratis genomgång.`,
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
      "Google Search Console i ert namn och rapport varje månad",
    ],
    pris: { belopp: PRIS.seoGeo, fran: false, avser: "Grundoptimering av SEO och GEO" },
    iPaket: `Löpande SEO ingår i alla månadspaket, från ${kr(PRIS.start)} per månad.`,
    sida: "/seo-byra",
    fragor: [
      {
        fraga: "Vad kostar SEO?",
        svar: `En grundoptimering av SEO och GEO kostar ${kr(PRIS.seoGeo)}. Löpande SEO ingår i alla månadspaket från ${kr(PRIS.start)} per månad. ${MOMS_TEXT}`,
      },
      {
        fraga: "Hur lång tid tar det innan SEO ger resultat?",
        svar: "Oftast syns de första förbättringarna efter några månader. SEO är ett långsiktigt arbete, därför ingår det löpande i månadspaketen.",
      },
      {
        fraga: "Vad är skillnaden mellan SEO och GEO?",
        svar: "SEO handlar om att synas på Google. GEO handlar om att bli nämnd när någon frågar en AI-assistent som ChatGPT. Grunden är densamma, så vi gör dem tillsammans.",
      },
      { fraga: "Ingår Google Search Console?", svar: GSC_SVAR },
    ],
  },
  {
    slug: "geo",
    titel: "GEO",
    iText: "GEO",
    rubrik: {
      text: "GEO som gör att AI-assistenter rekommenderar er",
      markera: "rekommenderar er",
    },
    seoTitel: "GEO – synas i ChatGPT och AI-sök",
    seoBeskrivning: `Generative Engine Optimization: bli nämnd när kunder frågar ChatGPT, Gemini och Perplexity. Grundoptimering ${kr(PRIS.seoGeo)}. Gratis genomgång.`,
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
    pris: { belopp: PRIS.seoGeo, fran: false, avser: "Grundoptimering av SEO och GEO" },
    iPaket: `GEO ingår löpande i alla månadspaket, från ${kr(PRIS.start)} per månad.`,
    fragor: [
      {
        fraga: "Vad är GEO?",
        svar: "GEO står för Generative Engine Optimization. Det är arbetet med att synas och bli rekommenderad när någon frågar en AI-assistent som ChatGPT, Gemini eller Perplexity.",
      },
      {
        fraga: "Behöver vi GEO om vi redan har SEO?",
        svar: "SEO och GEO bygger på samma grund, men AI-assistenter lägger mer vikt vid tydliga svar, strukturerad data och omnämnanden på andra sajter. Därför gör vi dem tillsammans.",
      },
      {
        fraga: "Vad kostar GEO?",
        svar: `GEO ingår i grundoptimeringen av SEO och GEO för ${kr(PRIS.seoGeo)}, och löpande i alla månadspaket. ${MOMS_TEXT}`,
      },
    ],
  },
  {
    slug: "meta-annonser",
    titel: "Meta-annonser",
    iText: "Meta-annonser",
    rubrik: {
      text: "Meta-annonser som når rätt personer på Facebook och Instagram",
      markera: "rätt personer",
    },
    seoTitel: "Meta-annonser – Facebook & Instagram",
    seoBeskrivning: `Vi sätter upp och sköter era annonser på Facebook och Instagram. Uppsättning ${kr(PRIS.metaUppsattning)}, löpande hantering i Growth och Premium.`,
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
    pris: { belopp: PRIS.metaUppsattning, fran: false, avser: "Uppsättning av Meta Ads" },
    iPaket: `Löpande hantering ingår i Growth (${kr(PRIS.growth)} per månad) och Premium.`,
    fragor: [
      {
        fraga: "Ingår annonsbudgeten?",
        svar: "Nej. Annonsbudgeten betalar ni direkt till Meta. Vårt pris gäller arbetet med att sätta upp och sköta annonserna.",
      },
      {
        fraga: "Vad kostar det att komma igång?",
        svar: `Uppsättningen kostar ${kr(PRIS.metaUppsattning)}. Löpande hantering ingår i Growth (${kr(PRIS.growth)} per månad) och Premium (${kr(PRIS.premium)} per månad). ${MOMS_TEXT}`,
      },
    ],
  },
  {
    slug: "hemsideoptimering",
    titel: "Optimering av hemsida",
    iText: "hemsideoptimering",
    rubrik: { text: "Hemsideoptimering som gör fler besökare till kunder", markera: "kunder" },
    seoTitel: "Optimering av hemsida för fler kunder",
    seoBeskrivning: `Vi går igenom er hemsida och gör den snabbare, tydligare och bättre på att sälja. Uppfräschning från ${kr(PRIS.uppfraschning)}. Gratis genomgång.`,
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
    pris: { belopp: PRIS.uppfraschning, fran: true, avser: "Uppfräschning av hemsida" },
    iPaket: `Hemsideförbättringar ingår i alla månadspaket, från ${kr(PRIS.start)} per månad.`,
    fragor: [
      {
        fraga: "Vad kostar det att förbättra vår hemsida?",
        svar: `En uppfräschning kostar från ${kr(PRIS.uppfraschning)}, beroende på hur mycket som behöver göras. Ni får ett skräddarsytt förslag efter den kostnadsfria genomgången. ${MOMS_TEXT}`,
      },
      {
        fraga: "Ingår hemsideförbättringar i månadspaketen?",
        svar: "Ja. Start har mindre hemsidejusteringar, Growth har hemsideförbättringar och Premium har fler hemsideförbättringar.",
      },
    ],
  },
  {
    slug: "marknadsforingsbilder",
    titel: "Marknadsföringsbilder",
    iText: "marknadsföringsbilder",
    rubrik: {
      text: "Marknadsföringsbilder som får folk att sluta scrolla",
      markera: "sluta scrolla",
    },
    seoTitel: "Marknadsföringsbilder för företag",
    seoBeskrivning: `Produkt- och kampanjbilder för sociala medier, annonser och hemsida. 5 bilder ${kr(PRIS.bilder5)}, 10 bilder ${kr(PRIS.bilder10)}, 20 bilder ${kr(PRIS.bilder20)}.`,
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
    pris: { belopp: PRIS.bilder5, fran: true, avser: "Marknadsföringsbilder" },
    iPaket: `5, 10 eller 20 bilder per månad ingår i månadspaketen, från ${kr(PRIS.start)} per månad.`,
    fragor: [
      {
        fraga: "Vad kostar marknadsföringsbilder?",
        svar: `5 bilder kostar ${kr(PRIS.bilder5)}, 10 bilder ${kr(PRIS.bilder10)} och 20 bilder ${kr(PRIS.bilder20)}. Bilder ingår också i alla månadspaket. ${MOMS_TEXT}`,
      },
      {
        fraga: "Får vi bilderna i rätt format för varje kanal?",
        svar: "Ja. Ni får bilderna färdiga i de format som behövs för sociala medier, annonser och hemsida.",
      },
    ],
  },
  {
    slug: "hemsida",
    titel: "Bygga hemsida",
    iText: "nya hemsidor",
    rubrik: { text: "En hemsida som ser ut som ert varumärke och säljer", markera: "säljer" },
    seoTitel: "Skapa ny hemsida för företag",
    seoBeskrivning: `Vi designar, skriver och bygger er nya hemsida med SEO från start. Från ${kr(PRIS.hemsida)}. Gratis genomgång och skräddarsytt förslag.`,
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
      "SEO-grund från start",
    ],
    pris: { belopp: PRIS.hemsida, fran: true, avser: "Ny hemsida" },
    iPaket: null,
    sida: "/hemsida-foretag",
    arbetssatt: {
      steg: [
        {
          titel: "Vi bestämmer vad sajten ska göra",
          text: "Mål, målgrupp, vilka sidor som behövs och hur besökaren tar sig från första klicket till att kontakta er.",
        },
        {
          titel: "Ni godkänner utseendet",
          text: "Färger, typsnitt, bildstil och tonalitet utifrån ert varumärke – innan vi börjar designa.",
        },
        {
          titel: "Vi bygger efter en tidplan",
          text: "Ni vet hela tiden vad som händer härnäst, från första sidan till lansering.",
        },
      ],
      underlag:
        "Allt står på papper: ni får kravunderlag, användarflöde, designbrief och tidplan att godkänna innan vi bygger. Då ser ni svart på vitt att vi förstått hur ni vill ha det.",
    },
    fragor: [
      {
        fraga: "Hur går det till när ni bygger en hemsida?",
        svar: "I tre steg: vi bestämmer tillsammans vad sajten ska göra, ni godkänner utseendet och sedan bygger vi efter en tidplan. Ni får kravunderlag, användarflöde, designbrief och tidplan att godkänna innan vi börjar bygga.",
      },
      {
        fraga: "Vad kostar en ny hemsida?",
        svar: `En ny hemsida kostar från ${kr(PRIS.hemsida)}. Det slutliga priset beror på hur många sidor och funktioner ni behöver, och ni får ett skräddarsytt förslag efter den kostnadsfria genomgången. ${MOMS_TEXT}`,
      },
      {
        fraga: "Ska vi bygga nytt eller förbättra den hemsida vi har?",
        svar: `Ofta räcker det att förbättra den sajt ni redan har – en uppfräschning kostar från ${kr(PRIS.uppfraschning)}. Vi går igenom vilket som passar er på den kostnadsfria genomgången.`,
      },
    ],
  },
];

export function hittaTjanst(slug: string): Tjanst | undefined {
  return TJANSTER.find((t) => t.slug === slug);
}

/** Adressen till tjänstens sida – landningssidan om den har en, annars /tjanster/{slug}. */
export function tjanstSokvag(t: Tjanst | string): string {
  const tjanst = typeof t === "string" ? hittaTjanst(t) : t;
  if (!tjanst) return "/tjanster";
  return tjanst.sida ?? `/tjanster/${tjanst.slug}`;
}
