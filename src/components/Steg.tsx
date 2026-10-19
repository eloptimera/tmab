export type Steg = { titel: string; text: string };

/** Fyra eller fem steg får två kolumner på mellanstora skärmar och en rad på breda. */
const KOLUMNER: Record<number, string> = {
  4: "md:grid-cols-2 xl:grid-cols-4",
  5: "md:grid-cols-2 xl:grid-cols-5",
};

/** Numrerade steg. `rad` lägger dem bredvid varandra på bredare skärmar. */
export function Stegliste({ steg, rad = false }: { steg: readonly Steg[]; rad?: boolean }) {
  return (
    <ol className={rad ? `grid gap-4 ${KOLUMNER[steg.length] ?? "md:grid-cols-3"}` : "space-y-4"}>
      {steg.map((s, i) => (
        <li
          key={s.titel}
          className={`flex gap-5 rounded-[1.5rem] bg-tint p-6 ${rad ? "md:flex-col md:gap-6 md:p-8" : ""}`}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand font-display text-lg text-white">
            {i + 1}
          </span>
          <span>
            <span className={`block font-bold text-ink ${rad ? "md:text-lg" : ""}`}>{s.titel}</span>
            <span className="mt-1 block leading-relaxed text-muted-foreground">{s.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
