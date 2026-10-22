import { Link } from "@tanstack/react-router";
import { BokaKnapp } from "@/components/Boka";
import { Reveal } from "@/components/Reveal";
import { kr, MOMS_TEXT, PRIS, prisText, type Del } from "@/lib/priser";

/**
 * Två prisrutor för en del: engångsjobbet (mörk ruta, id="pris") och de löpande nivåerna.
 * Används av landningssidorna så att priserna bara skrivs på ett ställe (priser.ts).
 */
export function DelPrisrutor({
  del,
  engangIndex,
  engangRubrik,
  engangNot,
  lopandeRubrik,
  lopandeNot,
  tjanst,
  knapptext,
  onBoka,
}: {
  del: Del;
  /** Vilken engångsrad som lyfts fram i den mörka rutan. */
  engangIndex: number;
  engangRubrik: string;
  engangNot: string;
  lopandeRubrik: string;
  lopandeNot?: string;
  tjanst: string;
  knapptext: string;
  onBoka?: () => void;
}) {
  const engang = del.engang[engangIndex];
  if (!engang) return null;
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Reveal className="h-full">
        <div
          id="pris"
          className="flex h-full scroll-mt-28 flex-col rounded-[2rem] bg-ink p-8 text-white sm:p-10"
        >
          <p className="caps text-sun">Först · engång</p>
          <h3 className="mt-4 font-sans text-xl font-bold tracking-normal">{engangRubrik}</h3>
          <p className="mt-4 font-display text-5xl leading-none sm:text-6xl">{prisText(engang)}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75">
            {engangNot} {MOMS_TEXT}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BokaKnapp variant="white" tjanst={tjanst} {...(onBoka ? { onClick: onBoka } : {})}>
              {knapptext}
            </BokaKnapp>
          </div>
        </div>
      </Reveal>
      <Reveal delay={80} className="h-full">
        <div className="h-full rounded-[2rem] border-2 border-line bg-white p-8 sm:p-10">
          <p className="caps text-brand">Sedan · löpande</p>
          <h3 className="mt-4 font-sans text-xl font-bold tracking-normal text-ink">
            {lopandeRubrik}
          </h3>
          <ul className="mt-6 divide-y divide-line">
            {del.nivaer.map((n) => (
              <li key={n.id} className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="block font-bold text-ink">{n.namn}</span>
                  <span className="text-sm text-muted-foreground">{n.ingar[0]}</span>
                </span>
                <span className="shrink-0 font-display text-2xl text-ink">
                  {kr(n.belopp)}
                  {n.enhet === "mån" && <span className="text-sm text-muted-foreground">/mån</span>}
                </span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-4 py-4">
              <span>
                <span className="block font-bold text-ink">Skräddarsytt</span>
                <span className="text-sm text-muted-foreground">{del.skraddarsytt.text}</span>
              </span>
              <span className="shrink-0 text-right text-sm text-ink">
                offert från {kr(del.skraddarsytt.pris)}
                {del.skraddarsytt.enhet === "mån" ? "/mån" : ""}
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {lopandeNot ? `${lopandeNot} ` : ""}Ingen bindningstid.
          </p>
          <Link to="/priser" hash={del.id} className="btn-base btn-outline mt-6">
            Se allt som ingår
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

/** Kort prisrad för hjältesektionen: "Grundoptimering 5 995 kr · löpande från 3 995 kr/mån". */
export const SYNLIGHET_KORT = `Grundoptimering från ${kr(PRIS.grundoptimering)} · löpande från ${kr(PRIS.synlighetBas)}/mån`;
export const ANNONSER_KORT = `Uppsättning ${kr(PRIS.annonsUppsattning)} · löpande från ${kr(PRIS.annonser1)}/mån`;
