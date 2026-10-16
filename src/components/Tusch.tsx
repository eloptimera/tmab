import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Ringar in innehållet med en handritad, svart tuschlinje som ritas fram när den
 * syns i bild. Linjen är rent dekorativ och döljs för skärmläsare.
 */
export function Tusch({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [synlig, setSynlig] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setSynlig(true);
          obs.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute -top-[32%] -left-[6.5%] h-[166%] w-[111%] sm:-top-[38%] sm:-left-[9%] sm:h-[176%] sm:w-[118%] overflow-visible text-ink"
      >
        <path
          pathLength={1}
          className={`tusch-linje ${synlig ? "tusch-in" : ""}`}
          d="M334 15C252 1 92 3 31 26C-6 41 3 89 61 105C152 127 322 120 379 92C411 74 397 29 330 16C288 8 248 11 214 17"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
