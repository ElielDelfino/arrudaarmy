"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import SlideRow from "@/components/SlideRow";

interface Depoimento {
  src: string;
  width: number;
  height: number;
}

// Capturas reais de conversas/comentários de alunos (ver assets/depoimentos/),
// redimensionadas para 700px de largura e convertidas para .webp — mesmo
// processamento usado em public/results/ (ver docs/ARCHITECTURE.md). Os cards
// usam altura fixa e largura livre (proporcional ao width/height de cada
// print), tipo "linha justificada" de álbum de fotos — nenhum print é
// cortado, e todos ficam alinhados pela mesma altura na faixa.
const DEPOIMENTOS: Depoimento[] = [
  { src: "/depoimentos/depoimento1.webp", width: 700, height: 731 },
  { src: "/depoimentos/depoimento2.webp", width: 700, height: 832 },
  { src: "/depoimentos/depoimento3.webp", width: 700, height: 1004 },
  { src: "/depoimentos/depoimento4.webp", width: 700, height: 863 },
  { src: "/depoimentos/depoimento5.webp", width: 700, height: 765 },
  { src: "/depoimentos/depoimento6.webp", width: 700, height: 677 },
  { src: "/depoimentos/depoimento7.webp", width: 700, height: 789 },
  { src: "/depoimentos/depoimento8.webp", width: 700, height: 858 },
];

function DepoimentoCard({
  depoimento,
  onOpen,
}: {
  depoimento: Depoimento;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Ampliar depoimento"
      className="group relative block w-64 shrink-0 overflow-hidden rounded-lg border border-chrome/15 bg-teal-800 shadow-xl shadow-ink/50 transition-all duration-300 hover:-translate-y-1 hover:border-brass/50 sm:w-80"
    >
      <Image
        src={depoimento.src}
        alt="Depoimento de aluno do Arruda Army"
        width={depoimento.width}
        height={depoimento.height}
        sizes="(max-width: 640px) 256px, 320px"
        className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </button>
  );
}

export default function Depoimentos() {
  const [open, setOpen] = useState<Depoimento | null>(null);

  return (
    <section
      id="depoimentos"
      className="relative flex min-h-screen scroll-mt-20 flex-col justify-center overflow-hidden bg-teal-900 py-16 md:py-24"
    >
      {/* Foto de bastidor de competição (assets/hugoarruda/fundodepoimentos.jpeg)
         como fundo da seção — escurecida com um véu em degradê pra manter o
         texto e os cards de depoimento legíveis por cima. */}
      <Image
        src="/depoimentos/fundo-depoimentos.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[65%_20%]"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(5,38,43,0.22), transparent 55%), linear-gradient(180deg, rgba(1,9,11,0.68), rgba(5,38,43,0.72) 45%, rgba(5,38,43,0.85))",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-brass-bright"
        >
          Depoimentos
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 max-w-2xl font-heading text-4xl font-semibold text-chrome md:text-6xl"
        >
          Quem treina, confirma.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-xl text-chrome-dim"
        >
          Passe o mouse e clique em qualquer card para ler na íntegra.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative z-10 mt-14"
      >
        <SlideRow speed={18}>
          {[...DEPOIMENTOS, ...DEPOIMENTOS].map((d, i) => (
            <DepoimentoCard key={`${d.src}-${i}`} depoimento={d} onOpen={() => setOpen(d)} />
          ))}
        </SlideRow>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-sm overflow-hidden rounded-lg border border-chrome/15 bg-teal-800"
            >
              <Image
                src={open.src}
                alt="Depoimento de aluno do Arruda Army"
                width={open.width}
                height={open.height}
                className="h-auto max-h-[85vh] w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Fechar"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-chrome transition-colors hover:text-brass-bright"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
