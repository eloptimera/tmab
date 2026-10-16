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
| `src/lib/seo.ts`      | Metadata och strukturerad data (schema.org) för varje sida                 |
| `src/lib/sidor.ts`    | Sidlistan för `sitemap.xml` och `llms.txt`                                 |

Ändrar du ett pris eller en tjänst uppdateras sidorna, den strukturerade datan,
`sitemap.xml` och `llms.txt` automatiskt.

## SEO och GEO

- Varje sida sätter titel, beskrivning, canonical, delningsbild och JSON-LD via `sidhuvud()`.
- `/sitemap.xml`, `/robots.txt` och `/llms.txt` genereras av servern från samma data.
- Sajtens adress tas från Vercels produktionsdomän. Använd egen domän genom att sätta
  `SAJT_URL` (t.ex. `https://exempel.se`) i Vercel.

## Bokningsformuläret

Formuläret på `/kontakt` skickar mejl via [Resend](https://resend.com). Sätt i Vercel
(Settings → Environment Variables):

- `RESEND_API_KEY` – API-nyckel från Resend
- `KONTAKT_TILL` – adressen som tar emot bokningarna
- `KONTAKT_FRAN` (valfri) – avsändare när er domän är verifierad i Resend

Utan nyckeln visar formuläret ett felmeddelande i stället för att låtsas att det skickats.

Sök efter `TODO(TAB)` för det som ska fyllas i.
