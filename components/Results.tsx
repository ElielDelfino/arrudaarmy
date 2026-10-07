"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import SlideRow from "@/components/SlideRow";

type Angulo = "Frente" | "Costas" | "Lateral";

interface AlunoPhoto {
  angulo: Angulo;
  src: string;
  width: number;
  height: number;
}

interface Aluno {
  id: string;
  photos: AlunoPhoto[];
}

// Fotos reais de assets/alunos/ (autorização de uso confirmada pelo usuário).
// Cada arquivo já é um comparativo antes/depois lado a lado por ângulo —
// ver convenção de nomenclatura em docs/ARCHITECTURE.md.
//
// Ordem: quem tem mais ângulos disponíveis vem primeiro; o `id` ("Aluno - 0N")
// segue essa mesma ordem, não o número original do arquivo em assets/alunos/.
const ALUNOS: Aluno[] = [
  {
    id: "Aluno - 01",
    photos: [
      { angulo: "Frente", src: "/results/aluno7-1.webp", width: 1000, height: 1000 },
      { angulo: "Costas", src: "/results/aluno7-2.webp", width: 1000, height: 1000 },
      { angulo: "Lateral", src: "/results/aluno7-3.webp", width: 1000, height: 1000 },
    ],
  },
  {
    id: "Aluno - 02",
    photos: [
      { angulo: "Frente", src: "/results/aluno2-1.webp", width: 1000, height: 1000 },
      { angulo: "Costas", src: "/results/aluno2-2.webp", width: 1000, height: 1000 },
    ],
  },
  {
    id: "Aluno - 03",
    photos: [
      { angulo: "Frente", src: "/results/aluno3-1.webp", width: 1000, height: 828 },
      { angulo: "Costas", src: "/results/aluno3-2.webp", width: 1000, height: 800 },
    ],
  },
  {
    id: "Aluno - 04",
    photos: [
      { angulo: "Frente", src: "/results/aluno4-1.webp", width: 1000, height: 1000 },
      { angulo: "Costas", src: "/results/aluno4-2.webp", width: 1000, height: 1000 },
    ],
  },
  { id: "Aluno - 05", photos: [{ angulo: "Frente", src: "/results/aluno1.webp", width: 1000, height: 989 }] },
  { id: "Aluno - 06", photos: [{ angulo: "Frente", src: "/results/aluno5.webp", width: 1000, height: 951 }] },
  { id: "Aluno - 07", photos: [{ angulo: "Frente", src: "/results/aluno6.webp", width: 1000, height: 1000 }] },
];

interface LightboxState {
  aluno: Aluno;
  angleIndex: number;
}

function AngleTabs({
  photos,
  activeIndex,
  onSelect,
  size = "sm",
}: {
  photos: AlunoPhoto[];
  activeIndex: number;
  onSelect: (i: number) => void;
  size?: "sm" | "md";
}) {
  if (photos.length < 2) return null;
  return (
    <div className="flex gap-1">
      {photos.map((p, i) => (
        <button
          key={p.angulo}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(i);
          }}
          aria-pressed={i === activeIndex}
          className={`rounded-sm font-mono uppercase tracking-[0.15em] transition-colors ${
            size === "md" ? "px-2.5 py-1.5 text-sm" : "px-2.5 py-1 text-xs"
          } ${i === activeIndex ? "bg-brass text-ink" : "text-chrome-dim/60 hover:text-chrome"}`}
        >
          {p.angulo.slice(0, 3)}
        </button>
      ))}
    </div>
  );
}

function AlunoCard({
  aluno,
  onOpen,
}: {
  aluno: Aluno;
  onOpen: (aluno: Aluno, angleIndex: number) => void;
}) {
  const [active, setActive] = useState(0);
  const photo = aluno.photos[active];

  return (
    <div className="group relative w-56 shrink-0 overflow-hidden rounded-lg border border-chrome/15 bg-teal-800 shadow-xl shadow-ink/50 transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 sm:w-64">
      <button
        type="button"
        onClick={() => onOpen(aluno, active)}
        aria-label={`Ampliar fotos de ${aluno.id}`}
        className="relative block aspect-[4/5] w-full overflow-hidden"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={photo.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={photo.src}
              alt={`Antes e depois de um aluno do Arruda Army — ângulo ${photo.angulo.toLowerCase()}`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
      </button>

      <div className="px-4 py-3">
        <span className="block whitespace-nowrap text-center font-mono text-xs uppercase tracking-[0.3em] text-chrome-dim/60">
          {aluno.id}
        </span>
        <div className="mt-1 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.2em] text-chrome-dim/35">
          <span>Antes</span>
          <span>Depois</span>
        </div>

        {/* Altura reservada mesmo quando não há abas (1 foto só), pra todos
           os cards — com ou sem ângulos extras — terminarem na mesma altura. */}
        <div className="mt-2 flex h-7 items-center justify-center">
          <AngleTabs photos={aluno.photos} activeIndex={active} onSelect={setActive} />
        </div>
      </div>
    </div>
  );
}


export default function Results() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const lightboxPhoto = lightbox?.aluno.photos[lightbox.angleIndex];

  return (
    <section
      id="resultados"
      className="relative flex min-h-screen scroll-mt-20 flex-col justify-center bg-teal-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-brass-bright"
        >
          Arquivo fotográfico
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 max-w-2xl font-heading text-4xl font-semibold text-chrome md:text-6xl"
        >
          Resultados registrados.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-xl text-lg text-chrome md:text-xl"
        >
          Evoluções reais de quem decidiu levar o processo a sério.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-4 max-w-xl text-chrome-dim"
        >
          Cada registro representa uma transformação construída na
          consultoria Arruda Army com estratégia, consistência e trabalho
          duro — sem atalhos e sem promessa fácil.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 max-w-xl text-sm text-chrome-dim/70"
        >
          Clique numa foto para ampliar. Use as abas pra alternar entre
          frente, costas e lateral.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-14"
      >
        <SlideRow speed={28}>
          {[...ALUNOS, ...ALUNOS].map((aluno, i) => (
            <AlunoCard
              key={`${aluno.id}-${i}`}
              aluno={aluno}
              onOpen={(a, angleIndex) => setLightbox({ aluno: a, angleIndex })}
            />
          ))}
        </SlideRow>
      </motion.div>

      <AnimatePresence>
        {lightbox && lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-lg border border-chrome/15 bg-teal-800"
            >
              <div className="relative">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={lightboxPhoto.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Image
                      src={lightboxPhoto.src}
                      alt={`Antes e depois de um aluno do Arruda Army — ângulo ${lightboxPhoto.angulo.toLowerCase()}`}
                      width={lightboxPhoto.width}
                      height={lightboxPhoto.height}
                      className="h-auto max-h-[70vh] w-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label="Fechar"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-chrome transition-colors hover:text-brass-bright"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3">
                <div>
                  <span className="block font-mono text-xs uppercase tracking-[0.3em] text-chrome-dim/60">
                    {lightbox.aluno.id}
                  </span>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-chrome-dim/35">
                    Antes · Depois — {lightboxPhoto.angulo}
                  </span>
                </div>
                <AngleTabs
                  photos={lightbox.aluno.photos}
                  activeIndex={lightbox.angleIndex}
                  onSelect={(i) => setLightbox({ aluno: lightbox.aluno, angleIndex: i })}
                  size="md"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
