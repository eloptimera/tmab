import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { skickaEngangsforfragan } from "@/lib/bokning";
import { FORETAG } from "@/lib/foretag";
import { kr, MOMS_TEXT, raknaVal, type Val } from "@/lib/priser";
import { metaKonvertering } from "@/lib/samtycke";
import { bokningSkickad } from "@/lib/sparning";

type Uppgifter = {
  namn: string;
  epost: string;
  telefon: string;
  webbplats: string;
  meddelande: string;
  falla: string;
};

const TOM: Uppgifter = {
  namn: "",
  epost: "",
  telefon: "",
  webbplats: "",
  meddelande: "",
  falla: "",
};

/**
 * Popupen för förfrågan från prissidan. Kunden fyller i sina uppgifter och allt som är
 * valt – nivåer, bygge och engångsjobb – följer med. Bara id:n skickas; priset räknas
 * om på servern.
 */
export function Engangsforfragan({
  oppen,
  onOppen,
  valda,
}: {
  oppen: boolean;
  onOppen: (oppen: boolean) => void;
  valda: readonly string[];
}) {
  const navigate = useNavigate();
  const [u, setU] = useState<Uppgifter>(TOM);
  const [skickar, setSkickar] = useState(false);
  const [fel, setFel] = useState(false);
  const r = raknaVal(valda);

  function satt<K extends keyof Uppgifter>(nyckel: K, varde: string) {
    setU((nu) => ({ ...nu, [nyckel]: varde }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(false);
    setSkickar(true);
    try {
      await skickaEngangsforfragan({ data: { ...u, jobb: [...valda] } });
      bokningSkickad(r.valda.map((v) => v.namn));
      metaKonvertering("Lead");
      onOppen(false);
      await navigate({ to: "/tack" });
    } catch {
      setFel(true);
    } finally {
      setSkickar(false);
    }
  }

  return (
    <Dialog open={oppen} onOpenChange={onOppen}>
      <DialogContent className="max-h-[92dvh] max-w-xl overflow-y-auto rounded-[2rem] border-2 border-line bg-white p-7 sm:p-9">
        <DialogTitle className="font-display text-3xl leading-tight font-normal text-ink">
          Skicka förfrågan
        </DialogTitle>
        <DialogDescription className="text-base text-ink/80">
          Det ni har valt följer med. Vi återkommer inom en arbetsdag med en bekräftelse – inget är
          beställt förrän ni har godkänt den.
        </DialogDescription>

        <div className="space-y-4 rounded-2xl bg-elfenben p-5">
          {r.manad.length > 0 && (
            <Lista rubrik="Per månad" rader={r.manad} summa={`${kr(r.manadSumma)}/mån`} />
          )}
          {r.engang.length > 0 && (
            <Lista
              rubrik="Engång"
              rader={r.engang}
              summa={kr(r.engangTotal)}
              not={
                r.procent > 0
                  ? `Mängdrabatt ${r.procent} % på engångsjobben: −${kr(r.rabatt)}`
                  : undefined
              }
            />
          )}
          <p className="text-xs text-muted-foreground">
            {MOMS_TEXT} Månadstjänsterna har ingen bindningstid.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          data-clarity-mask="true"
          className="grid gap-4"
          aria-busy={skickar}
        >
          <Falt id="eng-namn" etikett="Företag/namn" kravs>
            <input
              id="eng-namn"
              required
              value={u.namn}
              onChange={(e) => satt("namn", e.target.value)}
              autoComplete="organization"
              className="field"
            />
          </Falt>
          <Falt id="eng-epost" etikett="E-post" kravs>
            <input
              id="eng-epost"
              type="email"
              required
              value={u.epost}
              onChange={(e) => satt("epost", e.target.value)}
              autoComplete="email"
              className="field"
            />
          </Falt>
          <div className="grid gap-4 sm:grid-cols-2">
            <Falt id="eng-telefon" etikett="Telefon (valfritt)">
              <input
                id="eng-telefon"
                type="tel"
                value={u.telefon}
                onChange={(e) => satt("telefon", e.target.value)}
                autoComplete="tel"
                className="field"
              />
            </Falt>
            <Falt id="eng-webbplats" etikett="Hemsida (valfritt)">
              <input
                id="eng-webbplats"
                value={u.webbplats}
                onChange={(e) => satt("webbplats", e.target.value)}
                autoComplete="url"
                inputMode="url"
                placeholder="t.ex. foretaget.se"
                className="field"
              />
            </Falt>
          </div>
          <Falt id="eng-meddelande" etikett="Något vi bör veta? (valfritt)">
            <textarea
              id="eng-meddelande"
              rows={3}
              value={u.meddelande}
              onChange={(e) => satt("meddelande", e.target.value)}
              className="field"
            />
          </Falt>
          {/* Fälla för robotar – dold för människor och skärmläsare. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={u.falla}
            onChange={(e) => satt("falla", e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          {fel && (
            <p role="alert" className="text-sm font-bold text-red-700">
              Förfrågan kunde inte skickas. Försök igen
              {FORETAG.epost ? `, eller mejla ${FORETAG.epost}` : ""}.
            </p>
          )}

          <button type="submit" disabled={skickar} className="btn-base btn-dark w-full">
            {skickar ? "Skickar …" : "Skicka förfrågan"}
            {!skickar && <ArrowRight className="size-4" aria-hidden="true" />}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Falt({
  id,
  etikett,
  kravs = false,
  children,
}: {
  id: string;
  etikett: string;
  kravs?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold">
        {etikett}
        {kravs && <span className="sr-only"> (obligatoriskt)</span>}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Lista({
  rubrik,
  rader,
  summa,
  not,
}: {
  rubrik: string;
  rader: readonly Val[];
  summa: string;
  not?: string | undefined;
}) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.18em] text-guld-mork uppercase">{rubrik}</p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {rader.map((v) => (
          <li key={v.id} className="flex justify-between gap-4">
            <span className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-guld-mork" aria-hidden="true" />
              {v.namn}
            </span>
            <span className="whitespace-nowrap">
              {v.fran ? "offert" : `${kr(v.belopp)}${v.enhet === "mån" ? "/mån" : ""}`}
            </span>
          </li>
        ))}
      </ul>
      {not && <p className="mt-2 text-sm text-guld-mork">{not}</p>}
      <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-line pt-2">
        <span className="text-sm">Totalt</span>
        <span className="font-display text-2xl text-ink">{summa}</span>
      </div>
    </div>
  );
}
