import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Brand";
import { FORETAG } from "@/lib/foretag";

const LANKAR = [
  { to: "/", label: "Hem" },
  { to: "/tjanster", label: "Tjänster" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

const LANK =
  "caps px-4 py-3 !tracking-[0.16em] whitespace-nowrap text-ink/70 transition-colors duration-200 hover:text-ink";
const LANK_AKTIV = "text-ink underline decoration-ink decoration-1 underline-offset-[10px]";

function Lank({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeOptions={{ exact: to === "/" }}
      className={LANK}
      activeProps={{ className: `${LANK} ${LANK_AKTIV}`, "aria-current": "page" }}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [oppen, setOppen] = useState(false);

  useEffect(() => {
    if (!oppen) return;
    const stang = (e: KeyboardEvent) => e.key === "Escape" && setOppen(false);
    window.addEventListener("keydown", stang);
    return () => window.removeEventListener("keydown", stang);
  }, [oppen]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
      >
        Hoppa till innehållet
      </a>
      <div className="relative mx-auto flex h-[4.5rem] max-w-[88rem] items-center justify-between px-6 sm:px-10">
        <Link to="/" aria-label={`${FORETAG.namn} – startsida`} onClick={() => setOppen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Huvudmeny">
          {LANKAR.map((l) => (
            <Lank key={l.to} {...l} />
          ))}
          <Link to="/offert" className="btn-base btn-dark ml-4 min-h-11 px-6 py-2 text-sm">
            Få fri offert
          </Link>
        </nav>

        <button
          type="button"
          aria-label={oppen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={oppen}
          aria-controls="mobilmeny"
          onClick={() => setOppen((o) => !o)}
          className="grid size-12 place-items-center rounded-full bg-tint text-ink md:hidden"
        >
          {oppen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>

        {oppen && (
          <nav
            id="mobilmeny"
            aria-label="Mobilmeny"
            className="absolute inset-x-4 top-full mt-2 flex flex-col gap-1 rounded-[1.75rem] bg-white p-3 shadow-xl shadow-ink/15 md:hidden"
          >
            {LANKAR.map((l) => (
              <Lank key={l.to} {...l} onClick={() => setOppen(false)} />
            ))}
            <Link to="/offert" onClick={() => setOppen(false)} className="btn-base btn-dark mt-1">
              Få fri offert
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
