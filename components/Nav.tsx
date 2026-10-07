"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#metodo", label: "Método" },
  { href: "#resultados", label: "Resultados" },
  { href: "#depoimentos", label: "Depoimentos" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Usado tanto pelos links do menu mobile quanto pelos do nav desktop, para
  // rolar sempre do mesmo jeito. No mobile, fecha o menu antes de rolar — se o
  // scroll começasse com o painel ainda aberto, ele recolhendo ao mesmo tempo
  // mudava a altura da página e cancelava/desviava o scroll (o clique "não
  // fazia nada"). No desktop não há menu para fechar, então rola na hora.
  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const wasOpen = menuOpen;
    setMenuOpen(false);
    const id = href.slice(1);
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (wasOpen) {
      window.setTimeout(scroll, 220);
    } else {
      scroll();
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-teal-900/90 backdrop-blur-sm border-b border-chrome/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-10">
        <a href="#hero" className="flex shrink-0 items-center gap-2">
          <Image
            src="/brand/icon.png"
            alt=""
            width={28}
            height={28}
            className="h-6 w-6 object-contain sm:h-7 sm:w-7"
            priority
          />
          <span className="font-mono text-[0.65rem] tracking-[0.15em] text-chrome uppercase sm:text-xs sm:tracking-[0.25em]">
            Arruda Army
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-chrome-dim transition-colors hover:text-brass-bright"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#inscricao"
            className="shrink-0 rounded-sm border border-brass px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-brass-bright transition-colors hover:bg-brass hover:text-ink sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]"
          >
            Comece agora
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-chrome/20 text-chrome md:hidden"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-chrome/10 bg-teal-900/95 backdrop-blur-sm md:hidden"
          >
            <div className="flex flex-col px-4 py-3 sm:px-6">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="border-b border-chrome/10 py-3 font-mono text-sm uppercase tracking-[0.2em] text-chrome-dim transition-colors last:border-b-0 hover:text-brass-bright"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
