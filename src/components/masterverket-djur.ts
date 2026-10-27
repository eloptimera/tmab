/**
 * Djuren i startsidans målning (Masterverket.tsx): biet, fjärilen och snigeln är målade ur
 * dukbilderna och ritas här som egna bilder ovanpå, så att de kan röra sig.
 * - Biet surrar på sin blomma, flyger en runda mellan blommorna och landar igen.
 * - Fjärilen fäller vingarna sakta och fladdrar till en annan blomma när pekaren kommer nära.
 * - Snigeln kryper fram och tillbaka på marmorhyllan och stannar när pekaren kommer nära.
 * Alla lägen är andelar av dukbilden, så djuren sitter rätt i alla skärmstorlekar.
 */

type Punkt = readonly [number, number];
type Lage = "bred" | "smal";

/** Djurens platser i målningarna (andel av dukbilden) och storlek (andel av dukens bredd). */
const DJUR: Record<"bi" | "fjaril" | "snigel", Record<Lage, { hem: Punkt; bredd: number }>> = {
  bi: { bred: { hem: [0.828, 0.224], bredd: 0.034 }, smal: { hem: [0.693, 0.227], bredd: 0.07 } },
  fjaril: { bred: { hem: [0.66, 0.679], bredd: 0.052 }, smal: { hem: [0.389, 0.64], bredd: 0.11 } },
  snigel: {
    bred: { hem: [0.518, 0.904], bredd: 0.062 },
    smal: { hem: [0.243, 0.897], bredd: 0.11 },
  },
};

/** Avstånd (px) där djuren märker pekaren. */
const NARA = 90;
/** Biets flygfart och fjärilens, i px per sekund. */
const BI_FART = 230;
const FJARIL_FART = 150;
/** Snigelns fart (px/s) och hur långt den kryper åt varje håll (andel av dukens bredd). */
const SNIGEL_FART = 5;
const SNIGEL_STRACKA: Record<Lage, readonly [number, number]> = {
  bred: [-0.02, 0.04],
  smal: [-0.05, 0.08],
};

type Djur = {
  el: HTMLImageElement;
  fx: number;
  fy: number;
  rutt: Punkt[];
  vanster: boolean;
  fas: number;
  nasta: number;
  vila: number;
};

export function skapaDjur({
  lager,
  duk,
  smal,
  blommor,
}: {
  lager: HTMLElement;
  duk: HTMLElement;
  smal: MediaQueryList;
  blommor: () => readonly (readonly Punkt[])[];
}) {
  const lage = (): Lage => (smal.matches ? "smal" : "bred");
  const nytt = (namn: keyof typeof DJUR): Djur => {
    const el = document.createElement("img");
    el.src = `/masterverk/${namn}.webp`;
    el.alt = "";
    el.decoding = "async";
    el.className = "tavla-djur";
    lager.appendChild(el);
    const [fx, fy] = DJUR[namn][lage()].hem;
    return {
      el,
      fx,
      fy,
      rutt: [],
      vanster: false,
      fas: Math.random() * 6,
      nasta: 4 + Math.random() * 4,
      vila: 0,
    };
  };
  const bi = nytt("bi");
  const fjaril = nytt("fjaril");
  const snigel = nytt("snigel");
  let snigelMal = 1;

  const slumpBlomma = (): Punkt => {
    const alla = blommor().flat();
    return alla[Math.floor(Math.random() * alla.length)] ?? DJUR.bi[lage()].hem;
  };

  // Flytta djuret mot nästa punkt i rutten med en fart i px/s. Sant när rutten är slut.
  const flyg = (dj: Djur, d: DOMRect, fart: number, dt: number) => {
    const mal = dj.rutt[0];
    if (!mal) return true;
    const dx = (mal[0] - dj.fx) * d.width;
    const dy = (mal[1] - dj.fy) * d.height;
    const avst = Math.hypot(dx, dy);
    const steg = Math.min(avst, fart * dt);
    if (avst > 0.5) {
      dj.fx += ((dx / avst) * steg) / d.width;
      dj.fy += ((dy / avst) * steg) / d.height;
      if (Math.abs(dx) > 2) dj.vanster = dx < 0;
    }
    if (avst < 2) dj.rutt.shift();
    return dj.rutt.length === 0;
  };

  const placera = (dj: Djur, d: DOMRect, l: DOMRect, bredd: number, extra: string) => {
    const b = bredd * d.width;
    dj.el.style.width = `${b.toFixed(1)}px`;
    const x = d.left - l.left + dj.fx * d.width - b / 2;
    const y =
      d.top - l.top + dj.fy * d.height - (b * dj.el.naturalHeight) / (dj.el.naturalWidth || 1) / 2;
    dj.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scaleX(${dj.vanster ? -1 : 1}) ${extra}`;
  };

  const nara = (dj: Djur, d: DOMRect, pekare: { x: number; y: number } | null) =>
    pekare !== null &&
    Math.hypot(d.left + dj.fx * d.width - pekare.x, d.top + dj.fy * d.height - pekare.y) < NARA;

  /** Ett steg i animationen. `pekare` är i klientkoordinater. */
  const uppdatera = (dt: number, tid: number, pekare: { x: number; y: number } | null) => {
    const d = duk.getBoundingClientRect();
    const l = lager.getBoundingClientRect();
    const m = lage();

    // Biet: surrar på stället, flyger en runda med jämna mellanrum eller när pekaren kommer nära.
    bi.nasta -= dt;
    if (!bi.rutt.length && (bi.nasta <= 0 || nara(bi, d, pekare))) {
      bi.rutt = [slumpBlomma(), slumpBlomma(), slumpBlomma(), DJUR.bi[m].hem];
      bi.nasta = 7 + Math.random() * 6;
    }
    const biHemma = flyg(bi, d, BI_FART, dt);
    const surr = biHemma ? 0.6 : 1.6;
    // I luften gungar biet upp och ner; vingsurret är ett snabbt litet darr.
    const gungar = biHemma ? 0 : Math.sin(tid * 5) * 0.012 * d.height;
    const darr = Math.sin(tid * 55) * surr + gungar;
    placera(
      bi,
      d,
      l,
      DJUR.bi[m].bredd,
      `rotate(${(Math.sin(tid * 70) * 2.5 * surr).toFixed(1)}deg) translateY(${darr.toFixed(1)}px)`,
    );

    // Fjärilen: vingarna fälls sakta när den sitter och snabbt när den flyger.
    fjaril.nasta -= dt;
    if (!fjaril.rutt.length && nara(fjaril, d, pekare)) {
      fjaril.rutt = [slumpBlomma()];
      fjaril.vila = 6 + Math.random() * 5;
    } else if (!fjaril.rutt.length && fjaril.nasta <= 0) {
      const hem = DJUR.fjaril[m].hem;
      const hemma = Math.hypot(fjaril.fx - hem[0], fjaril.fy - hem[1]) < 0.01;
      fjaril.rutt = [hemma ? slumpBlomma() : hem];
      fjaril.nasta = 10 + Math.random() * 8;
    }
    const fjarilSitter = flyg(fjaril, d, FJARIL_FART, dt);
    fjaril.fas += dt * (fjarilSitter ? 1.4 : 16);
    const vinge = fjarilSitter
      ? 0.62 + 0.38 * (0.5 + 0.5 * Math.cos(fjaril.fas))
      : 0.2 + 0.8 * Math.abs(Math.cos(fjaril.fas));
    const fladder = fjarilSitter ? 0 : Math.sin(fjaril.fas * 0.35) * 6;
    placera(
      fjaril,
      d,
      l,
      DJUR.fjaril[m].bredd,
      `translateY(${fladder.toFixed(1)}px) scaleX(${vinge.toFixed(3)})`,
    );

    // Snigeln: kryper sakta längs hyllan och stannar när pekaren är nära.
    const sh = DJUR.snigel[m].hem;
    const [min, max] = SNIGEL_STRACKA[m];
    if (!nara(snigel, d, pekare)) {
      const mal = sh[0] + (snigelMal > 0 ? max : min);
      const dx = (mal - snigel.fx) * d.width;
      if (Math.abs(dx) < 1) snigelMal = -snigelMal;
      else {
        snigel.fx += (Math.sign(dx) * Math.min(Math.abs(dx), SNIGEL_FART * dt)) / d.width;
        snigel.vanster = dx < 0;
      }
      snigel.fas += dt * 2.2;
    }
    snigel.fy = sh[1];
    placera(
      snigel,
      d,
      l,
      DJUR.snigel[m].bredd,
      `scaleX(${(1 + Math.sin(snigel.fas) * 0.035).toFixed(3)})`,
    );
  };

  /** Pausat eller minskad rörelse: alla djur sitter stilla på sina platser i målningen. */
  const stillbild = () => {
    const m = lage();
    for (const [dj, namn] of [
      [bi, "bi"],
      [fjaril, "fjaril"],
      [snigel, "snigel"],
    ] as const) {
      dj.rutt = [];
      [dj.fx, dj.fy] = DJUR[namn][m].hem;
      dj.vanster = false;
    }
    const d = duk.getBoundingClientRect();
    const l = lager.getBoundingClientRect();
    placera(bi, d, l, DJUR.bi[m].bredd, "");
    placera(fjaril, d, l, DJUR.fjaril[m].bredd, "");
    placera(snigel, d, l, DJUR.snigel[m].bredd, "");
  };

  const taBort = () => {
    for (const dj of [bi, fjaril, snigel]) dj.el.remove();
  };

  return { uppdatera, stillbild, taBort };
}
