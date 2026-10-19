import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type Kort = { titel: string; text: string; ikon: LucideIcon };

/** Vitt kort med ikon, rubrik och text – används på landningssidorna. */
export function KortVy({ k, children }: { k: Kort; children?: ReactNode }) {
  return (
    <div className="kortskugga flex h-full flex-col rounded-[2rem] border-2 border-line bg-white p-7">
      <span className="grid size-12 place-items-center rounded-full bg-tint text-brand">
        <k.ikon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-sans text-lg leading-snug font-bold tracking-normal text-ink">
        {k.titel}
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{k.text}</p>
      {children}
    </div>
  );
}
