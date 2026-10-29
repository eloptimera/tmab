import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BANNER_KATEGORIER,
  ALLT,
  BEHOVER_SAMTYCKE,
  VISA_BANNER,
  INGET,
  KATEGORIER,
  lasVal,
  narInstallningarOppnas,
  sidvisning,
  sparaVal,
  starta,
  type Val,
} from "@/lib/samtycke";

/** Cookiebanner. Visas alltid när VISA_BANNER är på, annars bara när ett spårverktyg kräver samtycke. */
export function Samtycke() {
  return VISA_BANNER || BEHOVER_SAMTYCKE ? <Banner /> : null;
}

function Banner() {
  const [visa, setVisa] = useState(false);
  const [valjSjalv, setValjSjalv] = useState(false);
  const [val, setVal] = useState<Val>(INGET);
  const ruta = useRef<HTMLDivElement>(null);
  const href = useRouterState({ select: (s) => s.location.href });
  const forstaSidan = useRef(true);

  useEffect(() => {
    const sparat = lasVal();
    if (sparat) starta(sparat);
    else setVisa(true);
    return narInstallningarOppnas(() => {
      setVal(lasVal() ?? INGET);
      setValjSjalv(true);
      setVisa(true);
      // Flytta fokus hit så att den som använder tangentbord hamnar rätt.
      requestAnimationFrame(() => ruta.current?.focus());
    });
  }, []);

  useEffect(() => {
    if (forstaSidan.current) {
      forstaSidan.current = false;
      return;
    }
    sidvisning();
  }, [href]);

  function spara(nytt: Val) {
    sparaVal(nytt);
    setVisa(false);
    setValjSjalv(false);
  }

  if (!visa) return null;

  const syften = BANNER_KATEGORIER.map((k) => KATEGORIER[k].syfte).join(" och ");

  return (
    <div
      ref={ruta}
      role="dialog"
      aria-modal="false"
      aria-labelledby="samtycke-rubrik"
      aria-describedby="samtycke-text"
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-50 rounded-[1.75rem] bg-ink p-6 text-white ring-1 ring-white/20 shadow-[0_20px_60px_rgb(17_18_22/0.35)] outline-none sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:p-7"
    >
      <h2 id="samtycke-rubrik" className="font-sans text-lg leading-snug font-bold">
        Får vi använda cookies?
      </h2>
      <p id="samtycke-text" className="mt-2 text-sm leading-relaxed text-white/80">
        Vi vill {syften}. Inget startar förrän du säger ja, och du kan ändra dig när som helst
        längst ner på sidan.{" "}
        <Link
          to="/integritetspolicy"
          hash="cookies"
          className="font-bold text-white underline underline-offset-2"
        >
          Läs mer
        </Link>
      </p>

      {valjSjalv && (
        <fieldset className="mt-5 space-y-3">
          <legend className="sr-only">Välj vilka cookies du godkänner</legend>
          {BANNER_KATEGORIER.map((k) => (
            <label
              key={k}
              className="flex cursor-pointer gap-3 rounded-2xl bg-white/10 p-4 text-sm leading-snug"
            >
              <input
                type="checkbox"
                checked={val[k]}
                onChange={(e) => setVal({ ...val, [k]: e.target.checked })}
                className="mt-0.5 size-5 shrink-0 accent-sun"
              />
              <span>
                <span className="block font-bold">{KATEGORIER[k].namn}</span>
                <span className="text-white/75">{KATEGORIER[k].text}</span>
              </span>
            </label>
          ))}
        </fieldset>
      )}

      {/* Välj själv och Godkänn alla överst, Neka alla som egen knapp under. Neka och Godkänn
          har samma stil – det ska vara lika lätt att säga nej som ja. */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        {valjSjalv ? (
          <button type="button" onClick={() => spara(val)} className="btn-base btn-outline-white">
            Spara mitt val
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setValjSjalv(true)}
            className="btn-base btn-outline-white"
          >
            Välj själv
          </button>
        )}
        <button type="button" onClick={() => spara(ALLT)} className="btn-base btn-white">
          Godkänn alla
        </button>
      </div>
      <button type="button" onClick={() => spara(INGET)} className="btn-base btn-white mt-2 w-full">
        Neka alla
      </button>
    </div>
  );
}
