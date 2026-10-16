import { FORETAG } from "@/lib/foretag";

/** Ordbild: TREATLY i serif-versaler. */
export function Logo({ ljus = false, className = "" }: { ljus?: boolean; className?: string }) {
  return (
    <span
      className={`font-display text-xl font-semibold tracking-[0.2em] uppercase ${
        ljus ? "text-white" : "text-ink"
      } ${className}`}
    >
      <span aria-hidden="true">{FORETAG.kortnamn}</span>
      <span className="sr-only">{FORETAG.namn}</span>
    </span>
  );
}

/**
 * Kornig, suddig färgblob. Förrenderad till en bild (public/blob.webp) i stället för ett
 * levande SVG-filter – filtret räknades om varje gång innehållet runt omkring flyttade sig,
 * vilket gjorde t.ex. den utfällbara listan hackig. Rent dekorativ – döljs för skärmläsare.
 * Storlek och placering styrs med className (t.ex. absolute/relative + bredd).
 */
export function Blob({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none aspect-[5/4] ${className}`}>
      <div className="relative size-full">
        <img
          src="/blob.webp"
          alt=""
          width={1000}
          height={800}
          decoding="async"
          draggable={false}
          className="absolute top-[-30%] left-[-30%] h-[160%] w-[160%] max-w-none select-none"
        />
      </div>
    </div>
  );
}

/** Tunna linjer: en cirkel och två horisontella – korsar blobben och ordbilden. */
export function Linjer({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      className={`pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      vectorEffect="non-scaling-stroke"
    >
      <line x1="0" y1="62" x2="1000" y2="62" vectorEffect="non-scaling-stroke" />
      <line x1="0" y1="338" x2="1000" y2="338" vectorEffect="non-scaling-stroke" />
      <ellipse cx="650" cy="200" rx="290" ry="196" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
