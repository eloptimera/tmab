import { ArrowRight, X } from "lucide-react";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Engangsforfragan } from "@/components/Engangsforfragan";
import { kr, raknaVal, vaxlaVal } from "@/lib/priser";

/**
 * Det kunden har valt på prissidan – nivåer, bygge och engångsjobb i samma förfrågan.
 * Bara ett val per grupp (t.ex. en Studio-nivå) kan vara aktivt; resten kan kombineras fritt.
 */
type Prisval = {
  valda: readonly string[];
  arVald: (id: string) => boolean;
  vaxla: (id: string) => void;
  rensa: () => void;
  oppnaFormular: () => void;
};

const Kontext = createContext<Prisval | null>(null);

export function usePrisval(): Prisval {
  const v = useContext(Kontext);
  if (!v) throw new Error("usePrisval måste användas inuti PrisvalProvider");
  return v;
}

export function PrisvalProvider({ children }: { children: ReactNode }) {
  const [valda, setValda] = useState<readonly string[]>([]);
  const [formular, setFormular] = useState(false);

  const varde = useMemo<Prisval>(
    () => ({
      valda,
      arVald: (id) => valda.includes(id),
      vaxla: (id) => setValda((nu) => vaxlaVal(nu, id)),
      rensa: () => setValda([]),
      oppnaFormular: () => setFormular(true),
    }),
    [valda],
  );

  return (
    <Kontext.Provider value={varde}>
      {children}
      <Valrad />
      <Engangsforfragan oppen={formular} onOppen={setFormular} valda={valda} />
    </Kontext.Provider>
  );
}

/** Fast rad längst ner som visar urvalet och öppnar förfrågan. Syns bara när något är valt. */
function Valrad() {
  const { valda, rensa, oppnaFormular } = usePrisval();
  if (valda.length === 0) return null;
  const r = raknaVal(valda);
  const delar = [
    r.manadSumma > 0 && `${kr(r.manadSumma)}/mån`,
    r.engangTotal > 0 && `${kr(r.engangTotal)} engång`,
    r.offert.length > 0 && "+ offert",
  ].filter(Boolean);

  return (
    <>
      {/* Plats för raden, så att den inte täcker sidans slut. */}
      <div aria-hidden="true" className="h-36 sm:h-28" />
      <div
        role="region"
        aria-label="Ert urval"
        className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-6 sm:bottom-5"
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-5 gap-y-3 rounded-[1.5rem] bg-ink px-5 py-4 text-elfenben shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:px-7">
          <div className="min-w-0 flex-[1_1_16rem]" aria-live="polite">
            <p className="text-sm font-bold">
              {r.valda.length} valda:{" "}
              <span className="font-normal text-white/80">
                {r.valda.map((v) => v.namn).join(", ")}
              </span>
            </p>
            <p className="mt-0.5 font-display text-xl">{delar.join(" · ")}</p>
          </div>
          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
            <button
              type="button"
              onClick={rensa}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-white/80 hover:text-white"
            >
              <X className="size-4" aria-hidden="true" />
              Rensa
            </button>
            <button type="button" onClick={oppnaFormular} className="btn-base btn-white">
              Skicka förfrågan
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
