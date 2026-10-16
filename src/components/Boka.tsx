import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Blob } from "@/components/Brand";
import { Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";

/** Sajtens enda primära nästa steg. Används i header, på alla sidor och i avslutningsrutan. */
export const BOKA_TEXT = "Boka gratis genomgång";

type Val = { tjanst?: string; paket?: string };

export function BokaKnapp({
  variant = "dark",
  className = "",
  children = BOKA_TEXT,
  onClick,
  ...val
}: Val & {
  variant?: "dark" | "white";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      to="/kontakt"
      search={{
        ...(val.tjanst ? { tjanst: val.tjanst } : {}),
        ...(val.paket ? { paket: val.paket } : {}),
      }}
      onClick={onClick}
      className={`btn-base ${variant === "white" ? "btn-white" : "btn-dark"} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Mörk avslutningsruta längst ner på sidorna. */
export function BokaPanel({
  rubrik = (
    <>
      Redo att <Mark>synas</Mark>?
    </>
  ),
  text = "20–25 minuter där vi går igenom er digitala närvaro. Ni får ett skräddarsytt förslag efteråt – helt utan kostnad.",
  ...val
}: Val & { rubrik?: ReactNode; text?: string }) {
  return (
    <section className="px-3 pb-3 sm:px-6">
      <Reveal>
        <div className="panel-ink relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] px-6 py-16 sm:px-14 sm:py-20">
          <Blob className="absolute top-1/2 -right-24 -z-10 hidden w-[34rem] -translate-y-1/2 lg:block" />
          <p className="caps text-white/70">Gratis genomgång</p>
          <h2 className="mt-5 max-w-2xl text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.05]">
            {rubrik}
          </h2>
          <p className="mt-5 max-w-xl text-white/80">{text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BokaKnapp variant="white" {...val} />
            <Link to="/priser" className="btn-base btn-outline-white">
              Se priser
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
