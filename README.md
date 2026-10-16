# TAB Marketing – webbplats

TAB Marketing drivs av Treatly AB. Byggd med TanStack Start, React och Tailwind. Körs på Vercel.

```sh
bun install
bun run dev
```

## Var saker finns

All text som återkommer på flera ställen har en enda källa:

| Fil                   | Innehåll                                                                   |
| --------------------- | -------------------------------------------------------------------------- |
| `src/lib/foretag.ts`  | Företagsuppgifter (namn, ort, kontakt, org.nr)                             |
| `src/lib/tjanster.ts` | De sex tjänsterna – startsida, `/tjanster`, tjänstesidor, sidfot, formulär |
| `src/lib/priser.ts`   | Alla priser och prisfrågor                                                 |
| `src/lib/projekt.ts`  | Tidigare projekt och marknadsföringsbilder                                 |
| `src/lib/guider.ts`   | Guiderna på `/guider` – text, datum och vanliga frågor                     |
| `src/lib/seo.ts`      | Metadata och strukturerad data (schema.org) för varje sida                 |
| `src/lib/sidor.ts`    | Sidlistan för `sitemap.xml` och `llms.txt`                                 |

Ändrar du ett pris eller en tjänst uppdateras sidorna, den strukturerade datan,
`sitemap.xml` och `llms.txt` automatiskt.

## SEO och GEO

- Varje sida sätter titel, beskrivning, canonical, delningsbild och JSON-LD via `sidhuvud()`.
- `/sitemap.xml`, `/robots.txt` och `/llms.txt` genereras av servern från samma data.
- Sajtens adress tas från Vercels produktionsdomän. Använd egen domän genom att sätta
  `SAJT_URL` (t.ex. `https://exempel.se`) i Vercel.
- `robots.txt` släpper in alla sökmotorer och AI-tjänsternas robotar med namn.
- Guiderna får `Article`-schema och `lastmod` i sitemap från fältet `uppdaterad`.
  Uppdatera datumet när du ändrar en guide.

### Google Search Console och Bing Webmaster Tools

1. Lägg till sajten i [Google Search Console](https://search.google.com/search-console)
   som **URL-prefix** och välj verifiering med **HTML-tagg**.
2. Kopiera värdet i `content="…"` och sätt det som `GOOGLE_SITE_VERIFICATION` i Vercel.
3. Gör en ny deploy och klicka på Verifiera. Skicka sedan in `/sitemap.xml` under Webbplatskartor.
4. I [Bing Webmaster Tools](https://www.bing.com/webmasters) väljer du import från
   Google Search Console. Vill du verifiera separat sätter du `BING_SITE_VERIFICATION`.

Byt till egen domän? Lägg till den som en ny egendom (helst typen Domän, via DNS) och
skicka in sitemap igen.

## Bokningsformuläret

Formuläret på `/kontakt` skickar mejl via [Resend](https://resend.com). Sätt i Vercel
(Settings → Environment Variables):

- `RESEND_API_KEY` – API-nyckel från Resend
- `KONTAKT_TILL` – adressen som tar emot bokningarna
- `KONTAKT_FRAN` (valfri) – avsändare när er domän är verifierad i Resend

Utan nyckeln visar formuläret ett felmeddelande i stället för att låtsas att det skickats.

Sök efter `TODO(TAB)` för det som ska fyllas i.
