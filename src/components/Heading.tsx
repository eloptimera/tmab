import type { ElementType, ReactNode } from "react";
import { Blob } from "@/components/Brand";

export function Heading({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={className}>{children}</Tag>;
}

/** Markerat ord – gul understrykning (en riktig text-underline). */
export function Mark({ children, nowrap = false }: { children: ReactNode; nowrap?: boolean }) {
  return (
    <span
      className={`italic underline decoration-sun decoration-[0.07em] underline-offset-[0.1em] [text-decoration-skip-ink:none] ${
        nowrap ? "whitespace-nowrap" : ""
      }`}
    >
      {children}
    </span>
  );
}

/** Sidhuvud för undersidor: pappersyta, serif-rubrik, kornig blob och tunna linjer. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Blob className="absolute top-1/2 -right-16 -z-10 hidden w-[36rem] -translate-y-1/2 opacity-90 lg:block" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[5%] -z-10 hidden aspect-square w-[30rem] -translate-y-1/2 rounded-full border border-ink/70 lg:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 border-b border-ink/70"
      />
      <div className="mx-auto max-w-[88rem] px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[1.02]">{title}</h1>
        {intro && <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80">{intro}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
