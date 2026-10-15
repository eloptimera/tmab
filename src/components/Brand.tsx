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

/** SVG-filter som suddar och spräcklar blobbens kanter (korn). Renderas en gång i roten. */
export function KornFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="pointer-events-none absolute">
      <defs>
        <filter
          id="treatly-korn"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="22" result="bl" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            seed="7"
            result="nz"
          />
          <feDisplacementMap
            in="bl"
            in2="nz"
            scale="64"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

const BLOBBAR = [
  // [left, top, width, height, gradient, rotation]
  ["6%", "4%", "46%", "42%", "radial-gradient(circle at 40% 40%, #7fe3ff 0%, #3d7bff 70%)", 0],
  ["26%", "22%", "42%", "56%", "radial-gradient(circle at 50% 40%, #8a4dff 0%, #3a1fe0 80%)", -18],
  ["50%", "10%", "42%", "40%", "radial-gradient(circle at 50% 50%, #ffb066 0%, #ff6f3c 85%)", 8],
  ["4%", "52%", "40%", "36%", "radial-gradient(circle at 50% 50%, #ffe27a 0%, #ffb52e 90%)", 0],
  ["46%", "56%", "40%", "38%", "radial-gradient(circle at 50% 50%, #ff7d96 0%, #ff4f6e 90%)", 0],
  ["34%", "58%", "26%", "28%", "radial-gradient(circle at 50% 50%, #6a3bff 0%, #3a1fe0 90%)", 0],
] as const;

/**
 * Kornig, suddig färgblob i referensens stil. Rent dekorativ – döljs för skärmläsare.
 * Storlek och placering styrs med className (t.ex. absolute/relative + bredd).
 */
export function Blob({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none aspect-[5/4] ${className}`}>
      <div className="relative size-full" style={{ filter: "url(#treatly-korn)" }}>
        {BLOBBAR.map(([left, top, w, h, bg, rot]) => (
          <span
            key={bg}
            className="absolute rounded-full"
            style={{
              left,
              top,
              width: w,
              height: h,
              backgroundImage: bg,
              transform: `rotate(${rot}deg)`,
            }}
          />
        ))}
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
