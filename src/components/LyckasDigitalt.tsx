import * as Accordion from "@radix-ui/react-accordion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { FORETAG } from "@/lib/foretag";
import { kr } from "@/lib/priser";
import { avstava } from "@/lib/text";
import { TJANSTER, type Tjanst } from "@/lib/tjanster";

const LUTNING = ["-rotate-[1.4deg]", "rotate-[1.1deg]", "rotate-[0.8deg]", "-rotate-[1deg]"];

function Svarighet({ niva }: { niva: Tjanst["svarighet"] }) {
  return (
    <span className="flex items-center gap-2" aria-label={`Svårighet att göra själv: ${niva} av 5`}>
      <span className="text-[0.7rem] font-bold tracking-[0.14em] text-muted-foreground uppercase sm:hidden lg:inline">
        Göra själv
      </span>
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`size-2.5 rounded-full ${n <= niva ? "bg-ink" : "border border-ink/30"}`}
          />
        ))}
      </span>
    </span>
  );
}

/** "Gör det själv" mot "Med oss" för en tjänst. Används här och på tjänstesidorna. */
export function SjalvMotOss({ o }: { o: Tjanst }) {
  return (
    <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
      {/* Gör det själv */}
      <div className="h-full rounded-[1.75rem] bg-tint p-6 sm:p-8">
        <p className="text-[0.7rem] font-bold tracking-[0.18em] text-brand uppercase">
          Gör det själv · det blir ett extrajobb
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {o.sjalv.map((s, i) => (
            <li
              key={s}
              className={`rounded-md bg-white p-4 text-[0.95rem] leading-snug text-ink shadow-[4px_5px_0_rgb(17_18_22/0.08)] ${LUTNING[i % LUTNING.length]}`}
            >
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-6 inline-block font-bold text-ink underline decoration-brand decoration-2 underline-offset-[6px]">
          Och det tar tid från det ni egentligen ska göra.
        </p>
      </div>

      <span
        aria-hidden="true"
        className="mx-auto grid size-14 rotate-90 place-items-center rounded-full bg-sun text-ink shadow-[4px_4px_0_var(--ink)] lg:rotate-0"
      >
        <ArrowRight className="size-6" />
      </span>

      {/* Med oss */}
      <div className="h-full rounded-[1.75rem] bg-brand p-6 text-white sm:p-8">
        <p className="text-[0.7rem] font-bold tracking-[0.18em] text-white/80 uppercase">
          Med {FORETAG.kortnamn} · det bara händer
        </p>
        <ol className="relative mt-6 space-y-4">
          <span
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-[1.1rem] w-px bg-white/40"
          />
          {o.medOss.map((m) => (
            <li key={m} className="relative flex items-center gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-brand">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="font-bold">{m}</span>
            </li>
          ))}
        </ol>
        <p className="mt-7 inline-block -rotate-[1.2deg] rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_rgb(255_255_255/0.35)]">
          Klart. Ni behövde inte göra något.
        </p>
      </div>
    </div>
  );
}

function Innehall({ o }: { o: Tjanst }) {
  return (
    <div className="px-5 pb-6 sm:px-8 sm:pb-8">
      <p className="max-w-3xl text-lg leading-relaxed text-ink/80">{o.forklaring}</p>
      <div className="mt-8">
        <SjalvMotOss o={o} />
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <p className="text-ink/80">
          {o.pris.avser}:{" "}
          <span className="font-display text-xl text-ink">
            {o.pris.fran ? "från " : ""}
            {kr(o.pris.belopp)}
          </span>{" "}
          <span className="text-sm text-muted-foreground">exkl. moms</span>
        </p>
        <Link to="/tjanster/$slug" params={{ slug: o.slug }} className="btn-base btn-outline">
          Läs mer om {avstava(o.iText)}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/** Utfällbar lista: vad som krävs för att lyckas digitalt, själv kontra med oss. */
export function LyckasDigitalt() {
  const rot = useRef<HTMLDivElement>(null);
  const [oppen, setOppen] = useState("seo");

  // När en rad ovanför stängs samtidigt som en ny öppnas glider den klickade raden uppåt
  // under fingret, vilket upplevs som hack. Vi håller kvar den klickade raden på samma
  // plats på skärmen medan animationen pågår.
  function byt(nytt: string) {
    const id = nytt || oppen;
    const rad = rot.current?.querySelector<HTMLElement>(`[data-omrade="${id}"]`);
    const start = rad?.getBoundingClientRect().top;
    setOppen(nytt);
    if (!rad || start === undefined) return;
    const slut = performance.now() + 450;
    const folj = () => {
      const diff = rad.getBoundingClientRect().top - start;
      if (Math.abs(diff) > 0.5) window.scrollBy({ top: diff, behavior: "instant" });
      if (performance.now() < slut) requestAnimationFrame(folj);
    };
    requestAnimationFrame(folj);
  }

  return (
    <Accordion.Root
      ref={rot}
      type="single"
      collapsible
      value={oppen}
      onValueChange={byt}
      className="grid gap-3 [overflow-anchor:none]"
    >
      {TJANSTER.map((o, i) => (
        <Accordion.Item
          key={o.slug}
          value={o.slug}
          data-omrade={o.slug}
          className="overflow-hidden rounded-[2rem] border-2 border-line bg-white/80 transition-colors data-[state=open]:border-ink/80 data-[state=open]:bg-white"
        >
          <Accordion.Header className="font-sans leading-normal font-normal tracking-normal">
            <Accordion.Trigger className="group flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:gap-6 sm:px-8 sm:py-6">
              <span
                className="hidden font-display text-2xl text-ink/55 sm:inline"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white">
                <o.ikon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-2xl leading-tight tracking-[-0.015em] text-ink sm:text-3xl">
                  {avstava(o.titel)}
                </span>
                <span className="mt-1 block text-sm leading-snug text-muted-foreground sm:text-base">
                  {o.vad}
                </span>
                <span className="mt-2.5 block sm:hidden">
                  <Svarighet niva={o.svarighet} />
                </span>
              </span>
              <span className="hidden sm:block">
                <Svarighet niva={o.svarighet} />
              </span>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink text-ink transition-[transform,background-color,color] duration-300 group-hover:bg-ink group-hover:text-white group-data-[state=open]:rotate-45 group-data-[state=open]:bg-ink group-data-[state=open]:text-white">
                <Plus className="size-5" aria-hidden="true" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden [--tw-animation-duration:280ms] [--tw-ease:cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <Innehall o={o} />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
