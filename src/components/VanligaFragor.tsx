import { Plus } from "lucide-react";
import type { Fraga } from "@/lib/priser";

/**
 * Vanliga frågor som inbyggda <details>-element: svaren finns i HTML:en från start, så
 * sökmotorer och AI-assistenter kan läsa dem, och det behövs ingen JavaScript.
 * Lägg faqSchema() med samma frågor i sidans head().
 */
export function VanligaFragor({ fragor }: { fragor: readonly Fraga[] }) {
  return (
    <div className="grid gap-3">
      {fragor.map((f) => (
        <details
          key={f.fraga}
          className="group rounded-[1.5rem] border-2 border-line bg-white/80 open:border-ink/80 open:bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 sm:px-8 [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-lg leading-snug font-bold tracking-normal text-ink">
              {f.fraga}
            </h3>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink text-ink transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="px-6 pb-6 text-base leading-relaxed text-ink/80 sm:px-8">{f.svar}</p>
        </details>
      ))}
    </div>
  );
}
