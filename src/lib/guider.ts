// Guider – informationssidor som svarar på det kunder söker på. De ger sajten innehåll att
// ranka på i Google och att citeras av AI-assistenter, och länkar vidare till rätt tjänst.
// Enda källan för /guider, varje guidesida, sitemap.xml och llms.txt.
import type { Fraga } from "@/lib/priser";

export type Rad = string | { titel: string; text: string };

export type Avsnitt = {
  rubrik: string;
  stycken?: readonly string[];
  lista?: { numrerad?: boolean; rader: readonly Rad[] };
  tabell?: { kolumner: readonly string[]; rader: readonly (readonly string[])[] };
  /** Stycken efter listan eller tabellen. */
  efter?: readonly string[];
};

export type Guide = {
  slug: string;
  /** Kort namn i listor. */
  titel: string;
  rubrik: { text: string; markera: string };
  seoTitel: string;
  seoBeskrivning: string;
  /** Första stycket – själva svaret på frågan i rubriken. */
  ingress: string;
  publicerad: string;
  uppdaterad: string;
  /** Tjänsten guiden leder vidare till. */
  tjanst: string;
  avsnitt: readonly Avsnitt[];
  fragor: readonly Fraga[];
};

export const GUIDER: readonly Guide[] = [
  {
    slug: "google-search-console",
    titel: "Google Search Console: kom igång på 15 minuter",
    rubrik: {
      text: "Google Search Console: kom igång på 15 minuter",
      markera: "15 minuter",
    },
    seoTitel: "Google Search Console – guide på svenska",
    seoBeskrivning:
      "Så kopplar du hemsidan till Google Search Console, skickar in din sitemap och ser vilka sökord som ger besök. Steg för steg, gratis.",
    ingress:
      "Google Search Console är Googles gratis verktyg som visar hur din hemsida syns i sökresultaten: vilka sökningar du visas för, hur många som klickar och om Google har problem att läsa dina sidor. Det tar en kvart att komma igång.",
    publicerad: "2026-10-16",
    uppdaterad: "2026-10-16",
    tjanst: "seo",
    avsnitt: [
      {
        rubrik: "Vad du kan se i Search Console",
        lista: {
          rader: [
            "Vilka sökningar du visas för, och hur många som klickar.",
            "Genomsnittlig placering per sökning och per sida.",
            "Vilka sidor Google har tagit med i sitt index – och vilka som saknas och varför.",
            "Fel som gör att sidor inte kan visas i sökresultaten.",
          ],
        },
        efter: [
          "Statistiken sparas i 16 månader. Ju tidigare du kommer igång, desto mer historik har du att jämföra med.",
        ],
      },
      {
        rubrik: "Steg 1: Lägg till din hemsida",
        lista: {
          numrerad: true,
          rader: [
            "Gå till search.google.com/search-console och logga in med företagets Google-konto – inte ett privat.",
            "Välj egendomstyp: Domän om du kan ändra DNS hos din domänleverantör, annars URL-prefix.",
            "Verifiera att sajten är din. För Domän lägger du till en TXT-post i DNS. För URL-prefix är en HTML-tagg i hemsidans kod enklast.",
            "Vänta tills Google bekräftat. En DNS-ändring kan ta en stund att slå igenom.",
          ],
        },
        efter: [
          "Välj Domän om du kan. Då täcks alla varianter av adressen – med och utan www, http och https – av samma egendom.",
        ],
      },
      {
        rubrik: "Steg 2: Skicka in din sitemap",
        stycken: [
          "En sitemap är en lista över alla sidor du vill att Google ska hitta. De flesta hemsideverktyg skapar den automatiskt, ofta på adressen /sitemap.xml.",
        ],
        lista: {
          numrerad: true,
          rader: [
            "Öppna Webbplatskartor i menyn.",
            "Skriv in adressen till din sitemap och klicka på Skicka.",
            "Kontrollera efter några dagar att statusen är Lyckades och att antalet sidor stämmer.",
          ],
        },
      },
      {
        rubrik: "Steg 3: Be Google läsa en ny sida",
        stycken: [
          "Har du publicerat en ny sida eller ändrat en viktig text kan du snabba på. Klistra in adressen i sökfältet överst i Search Console och välj Begär indexering.",
          "Det garanterar inte att sidan visas högt, men Google brukar läsa den snabbare.",
        ],
      },
      {
        rubrik: "Det här ska du titta på varje månad",
        lista: {
          rader: [
            {
              titel: "Sökningar med många visningar men få klick",
              text: "En tydligare sidtitel och beskrivning kan ge fler besök utan att placeringen ändras.",
            },
            {
              titel: "Sidor som inte indexeras",
              text: "Rapporten säger varför. Ofta är det dubbletter eller sidor som saknar länkar.",
            },
            {
              titel: "Sidupplevelse på mobil",
              text: "Långsamma sidor tappar besökare, oavsett hur högt de rankar.",
            },
          ],
        },
      },
      {
        rubrik: "Glöm inte Bing",
        stycken: [
          "Bing Webmaster Tools fungerar på samma sätt och kan hämta din egendom direkt från Search Console. Det tar fem minuter.",
          "Det är värt det även om få av dina kunder använder Bing. Bing ligger bakom Microsoft Copilot och används av flera andra AI-tjänster för att hitta källor.",
        ],
      },
    ],
    fragor: [
      {
        fraga: "Kostar Google Search Console något?",
        svar: "Nej. Google Search Console och Bing Webmaster Tools är gratis.",
      },
      {
        fraga: "Vad är skillnaden mellan Search Console och Google Analytics?",
        svar: "Search Console visar vad som händer innan besöket, i sökresultaten. Google Analytics visar vad besökarna gör på hemsidan. Du behöver båda för att se hela bilden.",
      },
      {
        fraga: "Vem ska äga Search Console-kontot?",
        svar: "Företaget. Lägg upp egendomen i företagets Google-konto och ge byrån eller konsulten åtkomst som användare. Då förlorar du ingen statistik om ni slutar samarbeta.",
      },
    ],
  },
  {
    slug: "vad-ar-geo",
    titel: "Vad är GEO? Så syns ditt företag i ChatGPT",
    rubrik: {
      text: "Vad är GEO? Så syns ditt företag i ChatGPT och andra AI-assistenter",
      markera: "ChatGPT",
    },
    seoTitel: "Vad är GEO? Synas i ChatGPT och AI-sök",
    seoBeskrivning:
      "GEO betyder Generative Engine Optimization: att bli nämnd när kunder frågar ChatGPT, Gemini eller Perplexity. Så fungerar det och vad du kan göra själv.",
    ingress:
      "GEO, Generative Engine Optimization, är arbetet med att bli nämnd och rekommenderad när någon frågar en AI-assistent i stället för att googla. Grunden är densamma som för SEO, men AI-assistenter lägger mer vikt vid tydliga svar, fakta som går att kontrollera och vad andra skriver om dig.",
    publicerad: "2026-10-16",
    uppdaterad: "2026-10-16",
    tjanst: "geo",
    avsnitt: [
      {
        rubrik: "Hur AI-assistenter väljer vilka företag de nämner",
        stycken: [
          "När en AI-assistent svarar på en fråga om något aktuellt söker den ofta på webben och sammanfattar det den hittar. Den nämner hellre källor som:",
        ],
        lista: {
          rader: [
            "svarar tydligt och direkt på frågan,",
            "har fakta som pris, område och vad som ingår skrivet i klartext,",
            "nämns på andra sajter som assistenten litar på, till exempel branschsidor, recensioner och artiklar,",
            "är tekniskt lätta att läsa – texten finns i sidans kod från början, inte först efter att JavaScript körts.",
          ],
        },
      },
      {
        rubrik: "Skillnaden mellan SEO och GEO",
        tabell: {
          kolumner: ["", "SEO", "GEO"],
          rader: [
            ["Mål", "Hamna högt i Googles resultat", "Bli nämnd i ett AI-svar"],
            ["Kunden ser", "En lista med länkar", "Ett färdigt svar, ibland med källor"],
            ["Viktigast", "Sökord, teknik, länkar", "Tydliga svar, fakta, omnämnanden"],
            ["Följs upp med", "Google Search Console", "Egna tester och trafik från AI-tjänster"],
          ],
        },
      },
      {
        rubrik: "Sex saker du kan göra själv",
        lista: {
          numrerad: true,
          rader: [
            {
              titel: "Skriv det viktigaste i klartext",
              text: "Vad du gör, för vem och vad det kostar – på en egen sida, inte bara i en bild eller pdf.",
            },
            {
              titel: "Svara på kundernas frågor",
              text: "En fråga per rubrik, med svaret direkt i första meningen.",
            },
            {
              titel: "Lägg till strukturerad data",
              text: "Märk upp företaget, tjänsterna, priserna och de vanliga frågorna enligt schema.org.",
            },
            {
              titel: "Släpp in AI-tjänsternas sökrobotar",
              text: "Kontrollera att robots.txt inte stänger ute till exempel OAI-SearchBot och PerplexityBot.",
            },
            {
              titel: "Synas där andra letar",
              text: "Branschregister, recensionssajter och artiklar är källor som AI-assistenter ofta läser.",
            },
            {
              titel: "Håll uppgifterna lika överallt",
              text: "Samma namn, beskrivning och kontaktuppgifter på hemsidan och på alla andra ställen.",
            },
          ],
        },
      },
      {
        rubrik: "Så kontrollerar du om du syns",
        stycken: [
          "Det finns ännu inget verktyg för AI-svar som motsvarar Search Console. Det enklaste är att fråga själv:",
        ],
        lista: {
          rader: [
            "Ställ de frågor dina kunder ställer, till exempel ”vilken redovisningsbyrå passar ett litet aktiebolag?”.",
            "Testa i flera tjänster: ChatGPT, Gemini, Perplexity och Copilot.",
            "Gör om testet varje månad och anteckna vilka företag som nämns.",
          ],
        },
        efter: [
          "Svaren varierar mellan gånger och användare. Se på utvecklingen över tid, inte på ett enskilt svar.",
        ],
      },
      {
        rubrik: "Vad är llms.txt?",
        stycken: [
          "llms.txt är en textfil på hemsidan som sammanfattar vad företaget gör, skriven för AI-tjänster. Det är ett förslag till standard och alla tjänster läser den inte ännu, men den är snabb att lägga till och skadar inte. Vår egen ligger på adressen /llms.txt.",
        ],
      },
    ],
    fragor: [
      {
        fraga: "Är GEO samma sak som SEO?",
        svar: "Nej, men de bygger på samma grund. En sajt som är bra för SEO har oftast en bra start för GEO. GEO lägger mer vikt vid tydliga svar och vid att andra sajter nämner dig.",
      },
      {
        fraga: "Hur lång tid tar GEO?",
        svar: "Tekniska ändringar som strukturerad data går snabbt att göra. Omnämnanden på andra sajter och förtroende byggs över flera månader, precis som för SEO.",
      },
      {
        fraga: "Måste jag släppa in AI-robotar på min sajt?",
        svar: "Vill du synas i AI-svar behöver de robotar som hämtar källor få läsa sajten. Du kan samtidigt välja att stänga ute robotar som bara samlar in träningsdata.",
      },
    ],
  },
];

/**
 * Guider som ersatts av en landningssida. Den gamla adressen omdirigeras dit (301) så att
 * länkar och sökresultat hamnar rätt.
 */
export const FLYTTADE_GUIDER: Readonly<Record<string, string>> = {
  "seo-for-smaforetag": "/seo-smaforetag",
};

export function hittaGuide(slug: string): Guide | undefined {
  return GUIDER.find((g) => g.slug === slug);
}

/** Ungefärlig lästid i minuter (200 ord per minut). */
export function lastid(g: Guide): number {
  const text = [
    g.ingress,
    ...g.avsnitt.flatMap((a) => [
      ...(a.stycken ?? []),
      ...(a.lista?.rader ?? []).map((r) => (typeof r === "string" ? r : `${r.titel} ${r.text}`)),
      ...(a.tabell?.rader.flat() ?? []),
      ...(a.efter ?? []),
    ]),
    ...g.fragor.flatMap((f) => [f.fraga, f.svar]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
