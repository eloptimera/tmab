import {
  Bot,
  Camera,
  Cookie,
  Gauge,
  LayoutTemplate,
  Megaphone,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { Steg } from "@/components/Steg";
import { landningssidaForTjanst } from "@/lib/landningssidor";
import { BILDER, type Bild } from "@/lib/projekt";
import {
  GARANTI_TEXT,
  GSC_SVAR,
  HEMSIDA_UTANFOR_PAKET_TEXT,
  kr,
  MOMS_TEXT,
  PRIS,
  type Fraga,
} from "@/lib/priser";

// Tjänsterna som säljs var för sig. Enda källan för startsidan, /tjanster, varje tjänstesida, sidfoten,
// kontaktformuläret, sitemap.xml och llms.txt.
// TODO(TAB): stämmer "Med oss"-listorna med vad ni levererar i varje tjänst?

export type Fordjupning = {
  rubrik: { text: string; markera: string };
  stycken?: readonly string[];
  lista?: readonly string[];
  efter?: readonly string[];
  lank?: { text: string; till: string };
};

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
  /** Exempelbilder som visas under rubriken på tjänstesidan. */
  galleri?: readonly Bild[];
  /** Fördjupande avsnitt på tjänstesidan: hur det går till, vad vi gör, hur vi mäter. */
  fordjupning?: readonly Fordjupning[];
  /** Hur vi arbetar, steg för steg – visas som "Så jobbar vi" på tjänstesidan. */
  arbetssatt?: { steg: readonly Steg[]; underlag: string };
  fragor: readonly Fraga[];
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
      text: "GEO som gör det lättare för AI-assistenter att rekommendera er",
      markera: "rekommendera er",
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
    fordjupning: [
      {
        rubrik: { text: "Så väljer AI-assistenter vilka företag de nämner", markera: "nämner" },
        stycken: [
          "När någon frågar ChatGPT, Gemini, Perplexity eller Copilot om något aktuellt söker assistenten ofta på webben och sammanfattar det den hittar. Den nämner hellre företag vars sajt:",
        ],
        lista: [
          "svarar tydligt och direkt på frågan,",
          "har fakta i klartext – vad ni gör, för vem, var och vad det kostar,",
          "är märkt med strukturerad data som maskiner kan läsa,",
          "nämns på andra sajter som assistenten litar på.",
        ],
      },
      {
        rubrik: { text: "Det här gör vi för att ni ska bli nämnda", markera: "bli nämnda" },
        lista: [
          "Vi frågar AI-assistenterna det era kunder frågar och ser vilka företag som nämns i dag.",
          "Vi skriver om sidorna så att de svarar direkt på kundernas frågor.",
          "Vi lägger till strukturerad data för företaget, tjänsterna, priserna och vanliga frågor.",
          "Vi släpper in AI-tjänsternas sökrobotar och lägger till en llms.txt.",
          "Vi ser till att namn och uppgifter är likadana överallt där ni finns.",
          "Vi hjälper er att synas på sajter som AI-assistenterna läser, som branschregister och recensionssajter.",
        ],
      },
      {
        rubrik: { text: "Så mäter vi resultatet", markera: "mäter" },
        stycken: [
          "Det finns ännu inget verktyg för AI-svar som motsvarar Google Search Console. Därför ställer vi samma frågor i ChatGPT, Gemini, Perplexity och Copilot varje månad och antecknar vilka företag som nämns. I er statistik följer vi besök som kommer från AI-tjänsterna.",
          "Svaren varierar mellan gånger och användare, så vi tittar på utvecklingen över flera månader – inte på ett enskilt svar.",
        ],
        lank: { text: "Läs guiden: Vad är GEO?", till: "/guider/vad-ar-geo" },
      },
    ],
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
      "Sätta upp Business Manager, pixel och cookiebanner",
      "Bygga målgrupper som inte är för breda",
      "Ta fram annonser i flera format",
      "Testa, läsa siffror och justera varje vecka",
    ],
    medOss: [
      "Konto, pixel och cookiebanner – när vi har tillgång till sajten",
      "Annonsmaterial i alla format",
      "Löpande optimering av budgeten",
      "Tydlig rapport om vad det gav",
    ],
    pris: { belopp: PRIS.metaUppsattning, fran: false, avser: "Uppsättning av Meta Ads" },
    iPaket: `Löpande hantering ingår i Growth (${kr(PRIS.growth)} per månad) och Premium (${kr(PRIS.premium)} per månad).`,
    fordjupning: [
      {
        rubrik: { text: "Så sätter vi upp era annonser", markera: "sätter vi upp" },
        lista: [
          "Annonskonto och Business Manager i ert namn – vi får åtkomst som partner, så kontot alltid är ert.",
          "Målgrupper utifrån vilka era kunder är, var de bor och vad de är intresserade av.",
          "Annonser i flera format – bild, video och karusell – för flödet, Stories och Reels.",
          "En tydlig plats att landa på: en sida på er hemsida eller ett formulär direkt i annonsen.",
        ],
      },
      {
        rubrik: { text: "Mätning – med eller utan pixel", markera: "Mätning" },
        stycken: [
          "Har vi tillgång till er hemsida lägger vi in Meta-pixeln tillsammans med en cookiebanner. Då ser vi vilka annonser som leder till förfrågningar, och vi kan visa annonser för personer som redan besökt sajten.",
          "Har vi inte tillgång till sajten behövs ingen banner. Vi märker alla annonslänkar med spårningslänkar och följer besöken i er statistik, och vi kan använda formulärannonser där kunden lämnar sina uppgifter direkt i Facebook eller Instagram.",
        ],
      },
      {
        rubrik: { text: "Budget och uppföljning", markera: "uppföljning" },
        stycken: [
          "Annonsbudgeten betalar ni direkt till Meta och bestämmer själva. Planera för att låta annonserna gå i minst fyra veckor – de behöver tid att hitta rätt personer, och vi behöver tid att testa vad som fungerar.",
          "Vi justerar målgrupper, budget och annonser löpande och visar i månadsrapporten vad pengarna gav.",
        ],
      },
    ],
    fragor: [
      {
        fraga: "Ingår annonsbudgeten?",
        svar: "Nej. Annonsbudgeten betalar ni direkt till Meta. Vårt pris gäller arbetet med att sätta upp och sköta annonserna.",
      },
      {
        fraga: "Vad kostar det att komma igång?",
        svar: `Uppsättningen kostar ${kr(PRIS.metaUppsattning)}. Löpande hantering ingår i Growth (${kr(PRIS.growth)} per månad) och Premium (${kr(PRIS.premium)} per månad). ${MOMS_TEXT}`,
      },
      {
        fraga: "Ingår cookiebanner?",
        svar: "Ja, när vi har tillgång till er hemsida eller bygger den åt er. Då lägger vi in Meta-pixeln, som mäter vilka annonser som ger bokningar, tillsammans med en cookiebanner och texten i er integritetspolicy. Har vi inte tillgång till sajten behövs ingen banner: annonserna skickar besökare till er, och vi följer upp resultatet med spårningslänkar och Metas egen statistik.",
      },
      {
        fraga: "Varför behövs samtycke för Meta-pixeln?",
        svar: "Pixeln sätter cookies och skickar uppgifter om besöken till Meta. Enligt lagen om elektronisk kommunikation, med Post- och telestyrelsen (PTS) som tillsyn, får den bara laddas efter ett ja, och det ska vara lika lätt att neka som att godkänna. IMY har dessutom bötfällt svenska företag för hur de använt pixeln, bland annat Apoteket med 37 miljoner kronor 2024.",
      },
      {
        fraga: "Kan ni garantera att vi följer GDPR?",
        svar: "Nej, och det bör ingen byrå som inte är jurister lova. Vi ansvarar för det tekniska: att bannern fungerar, att pixeln väntar på samtycke och att policyn beskriver det som finns på sajten. Ni är personuppgiftsansvariga för er sajt, och vid juridiska frågor om just er verksamhet rekommenderar vi en jurist.",
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
    iPaket: null,
    fordjupning: [
      {
        rubrik: { text: "Det här går vi igenom", markera: "går vi igenom" },
        lista: [
          "Laddtid, särskilt på mobilen, där de flesta besökare finns.",
          "Tydlighet: förstår en ny besökare på några sekunder vad ni gör och vad nästa steg är?",
          "Kontaktvägar: formulär, telefon och bokning ska gå att hitta och använda.",
          "Teknisk SEO: sidtitlar, beskrivningar, rubriker, struktur och sitemap.",
          "Tillgänglighet: kontrast, textstorlek och att sajten går att använda med tangentbord.",
        ],
      },
      {
        rubrik: { text: "Så ser ni skillnaden", markera: "skillnaden" },
        stycken: [
          "Innan vi ändrar något sparar vi utgångsläget: laddtid, besök, förfrågningar och placeringar i Google. Efter ändringarna jämför vi samma siffror, så att ni ser vad arbetet gav.",
        ],
      },
      {
        rubrik: { text: "Vi arbetar i er plattform", markera: "er plattform" },
        stycken: [
          "WordPress, Wix, Squarespace, Shopify eller en egenbyggd sajt – vi gör ändringarna där sajten redan finns. Ibland lönar det sig mer att bygga nytt än att laga det gamla, och då säger vi det.",
        ],
        lank: { text: "Läs om att bygga en ny hemsida", till: "/hemsida-foretag" },
      },
    ],
    fragor: [
      {
        fraga: "Vad kostar det att förbättra vår hemsida?",
        svar: `En uppfräschning kostar från ${kr(PRIS.uppfraschning)}, beroende på hur mycket som behöver göras. Ni får ett skräddarsytt förslag efter den kostnadsfria genomgången. ${MOMS_TEXT}`,
      },
      {
        fraga: "Ingår hemsideförbättringar i månadspaketen?",
        svar: `Nej. Månadspaketen innehåller marknadsföring: bilder, SEO/GEO och Meta-annonser. ${HEMSIDA_UTANFOR_PAKET_TEXT}`,
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
    seoTitel: "Marknadsföringsbilder och video för företag",
    seoBeskrivning: `Produkt- och kampanjbilder och korta videor för sociala medier, annonser och hemsida. 5 bilder ${kr(PRIS.bilder5)}, 10 bilder ${kr(PRIS.bilder10)}.`,
    vad: "Bilder och video som får folk att sluta scrolla",
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
      "Produktion av bilder och video",
      "Färdiga format för alla kanaler",
      "Klara att publicera direkt",
    ],
    pris: { belopp: PRIS.bilder5, fran: true, avser: "Marknadsföringsbilder" },
    galleri: BILDER,
    iPaket: `5, 10 eller 20 bilder per månad ingår i månadspaketen, från ${kr(PRIS.start)} per månad.`,
    fordjupning: [
      {
        rubrik: { text: "Så går det till", markera: "går det till" },
        lista: [
          "Vi går igenom varumärket, målgruppen och var bilderna ska användas.",
          "Ni får förslag på koncept innan vi börjar producera.",
          "Vi tar fram bilderna och videorna – med kamera, AI-verktyg eller båda.",
          "Ni får allt i rätt format: stående och kvadratiskt för sociala medier, liggande för hemsidan och de format annonserna kräver.",
        ],
        efter: [GARANTI_TEXT],
      },
      {
        rubrik: { text: "AI i bildproduktionen", markera: "AI" },
        stycken: [
          "Många av våra bilder tas fram helt eller delvis med AI-verktyg. Då kan vi visa produkten i miljöer som annars kräver studio, resa och rekvisita – till en bråkdel av kostnaden.",
          "Produkten ska alltid se ut som den gör i verkligheten, så vi utgår från bilder på den riktiga produkten. Kräver en plattform att AI-genererat innehåll märks, hjälper vi er att göra det.",
        ],
      },
      {
        rubrik: { text: "Korta videor för sociala medier", markera: "videor" },
        stycken: [
          "Vi gör korta videor i stående format för Reels, TikTok och annonser – produkten i rörelse, en före och efter, eller en kort presentation av det ni erbjuder. Video prissätts efter innehåll, och ni får ett fast pris innan vi börjar.",
        ],
      },
    ],
    fragor: [
      {
        fraga: "Vad kostar marknadsföringsbilder?",
        svar: `5 bilder kostar ${kr(PRIS.bilder5)}, 10 bilder ${kr(PRIS.bilder10)} och 20 bilder ${kr(PRIS.bilder20)}. Bilder ingår också i alla månadspaket. ${MOMS_TEXT}`,
      },
      {
        fraga: "Gör ni video också?",
        svar: "Ja. Vi gör korta videor i stående format för Reels, TikTok och annonser. Video prissätts efter vad som ska göras – ni får ett fast pris efter den kostnadsfria genomgången, innan något arbete börjar.",
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
      "En mall ser ut som alla andras, och en utvecklare som tar betalt per timme blir snabbt dyrt. En bra sajt kräver design, text, teknik och SEO som fungerar tillsammans.",
    sjalv: [
      "Välja plattform och mall",
      "Skriva all text och ta fram bilder",
      "Få den snabb och snygg på mobilen",
      "Sköta hosting, uppdateringar och säkerhet",
    ],
    medOss: [
      "Design utifrån ert varumärke",
      "Text och bilder som säljer",
      "Utveckling och lansering",
      "SEO-grund från start",
    ],
    pris: { belopp: PRIS.hemsida, fran: true, avser: "Ny hemsida" },
    iPaket: null,
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

/**
 * Ett område som visas under "Det här krävs för att lyckas digitalt" på startsidan men säljs
 * som en del av en annan tjänst. Har ingen egen sida – adressen omdirigeras till tjänsten.
 */
export type Delomrade = Pick<
  Tjanst,
  "slug" | "titel" | "iText" | "vad" | "ikon" | "svarighet" | "forklaring" | "sjalv" | "medOss"
> & {
  /** Slug för tjänsten området ingår i. */
  ingarI: string;
  /** Visas i stället för ett pris. */
  ingarText: string;
};

export const SPARNING: Delomrade = {
  slug: "cookies-och-sparning",
  titel: "Cookies och spårning",
  iText: "cookies och spårning",
  vad: "Mät vad som fungerar – med en cookiebanner som väntar på ja",
  ikon: Cookie,
  svarighet: 4,
  forklaring:
    "Utan mätning vet ni inte vilka annonser och sidor som ger kunder. Men spårning kräver samtycke, och många cookiebanners är fel uppsatta: verktygen laddas innan besökaren svarat, eller så är det svårt att neka.",
  sjalv: [
    "Ta reda på vilka cookies sajten faktiskt sätter",
    "Välja och sätta upp en cookiebanner",
    "Se till att inget laddas innan besökaren svarat",
    "Skriva en integritetspolicy som stämmer",
  ],
  medOss: [
    "Genomgång av allt som laddas på sajten",
    "Cookiebanner där Neka är lika enkelt som Godkänn",
    "Meta-pixel och statistik kopplade till samtycket",
    "Integritetspolicy som listar varje verktyg",
  ],
  ingarI: "meta-annonser",
  ingarText: "Ingår i Meta-annonser – så länge vi kan göra ändringar på er hemsida.",
};

/** Raderna under "Det här krävs för att lyckas digitalt" på startsidan. */
export const OMRADEN: readonly (Tjanst | Delomrade)[] = [...TJANSTER, SPARNING];

export function hittaDelomrade(slug: string): Delomrade | undefined {
  return SPARNING.slug === slug ? SPARNING : undefined;
}

export function hittaTjanst(slug: string): Tjanst | undefined {
  return TJANSTER.find((t) => t.slug === slug);
}

/**
 * Adressen till tjänstens sida. Har en landningssida tagit över tjänsten (`tjanst` i
 * landningssidor.ts) är det landningssidan – annars /tjanster/{slug}.
 */
export function tjanstSokvag(t: Tjanst | string): string {
  const slug = typeof t === "string" ? t : t.slug;
  if (!hittaTjanst(slug)) return "/tjanster";
  return landningssidaForTjanst(slug)?.sokvag ?? `/tjanster/${slug}`;
}
