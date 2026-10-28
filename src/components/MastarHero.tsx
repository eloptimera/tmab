import { useEffect, useRef, type ReactNode } from "react";

/**
 * Första skärmen på en tjänstesida: hantverkets mästare (från startsidans galleri) sedd
 * bakifrån, som en romantisk målning. Två bilder: bakgrunden (landskapet) och förgrunden
 * (mästaren och stenen, utklippt). Lagren förskjuts olika mycket vid scroll och pekare, så
 * att det känns djup. Inget WebGL och inga animationer som går av sig själva – bara två
 * transformer när man scrollar eller rör musen; vid minskad rörelse står allt still.
 */

export type Mastare = {
  /** Personens namn, för alt-text och skylt. */
  person: string;
  bakgrund: { src: string; srcSet: string; alt: string };
  figur: { src: string; srcSet: string; bredd: number; hojd: number };
};

// Hur mycket lagren förskjuts. Figuren står närmast och rör sig mest.
const SCROLL_BAKGRUND = 0.18;
const PEKARE_BAKGRUND = 8;
const PEKARE_FIGUR = 22;

export function MastarHero({
  mastare,
  eyebrow,
  title,
  intro,
  children,
}: {
  mastare: Mastare;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  const rotRef = useRef<HTMLElement>(null);
  const bakRef = useRef<HTMLImageElement>(null);
  const figurRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const rot = rotRef.current;
    const bak = bakRef.current;
    const figur = figurRef.current;
    if (!rot || !bak || !figur) return;
    const stilla = window.matchMedia("(prefers-reduced-motion: reduce)");
    let px = 0;
    let py = 0;
    let raf = 0;
    const rita = () => {
      raf = 0;
      if (stilla.matches) {
        bak.style.transform = "";
        figur.style.transform = "";
        return;
      }
      const top = rot.getBoundingClientRect().top;
      if (top > window.innerHeight || -top > rot.offsetHeight) return;
      const s = Math.max(0, -top);
      bak.style.transform = `translate3d(${(-px * PEKARE_BAKGRUND).toFixed(1)}px, ${(s * SCROLL_BAKGRUND - py * PEKARE_BAKGRUND).toFixed(1)}px, 0) scale(1.06)`;
      figur.style.transform = `translate3d(${(px * PEKARE_FIGUR).toFixed(1)}px, ${(py * PEKARE_FIGUR * 0.4).toFixed(1)}px, 0)`;
    };
    const begar = () => {
      if (!raf) raf = requestAnimationFrame(rita);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = rot.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      begar();
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      begar();
    };
    rita();
    window.addEventListener("scroll", begar, { passive: true });
    rot.addEventListener("pointermove", onMove, { passive: true });
    rot.addEventListener("pointerleave", onLeave, { passive: true });
    stilla.addEventListener("change", begar);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", begar);
      rot.removeEventListener("pointermove", onMove);
      rot.removeEventListener("pointerleave", onLeave);
      stilla.removeEventListener("change", begar);
    };
  }, []);

  return (
    <section ref={rotRef} className="mastar-hero" aria-labelledby="mastar-rubrik">
      <img
        ref={bakRef}
        src={mastare.bakgrund.src}
        srcSet={mastare.bakgrund.srcSet}
        sizes="100vw"
        alt={mastare.bakgrund.alt}
        width={1672}
        height={941}
        fetchPriority="high"
        decoding="async"
        className="mastar-bakgrund"
      />
      <img
        ref={figurRef}
        src={mastare.figur.src}
        srcSet={mastare.figur.srcSet}
        sizes="(min-width: 1024px) 34vw, 62vw"
        alt={`${mastare.person} sedd bakifrån`}
        width={mastare.figur.bredd}
        height={mastare.figur.hojd}
        fetchPriority="high"
        decoding="async"
        className="mastar-figur"
      />
      <div className="mastar-text">
        <p className="eyebrow">{eyebrow}</p>
        <h1
          id="mastar-rubrik"
          className="mt-6 max-w-3xl text-[clamp(2.4rem,5.6vw,5rem)] leading-[1.02]"
        >
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        <p className="mastar-skylt">Tillägnad {mastare.person}</p>
      </div>
    </section>
  );
}
