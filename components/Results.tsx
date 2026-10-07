"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useIsDesktop } from "@/lib/use-is-desktop";

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
// Ordem: quem tem mais ângulos disponíveis vem primeiro; o `id` (AL-0N) segue
// essa mesma ordem, não o número original do arquivo em assets/alunos/.
const ALUNOS: Aluno[] = [
  {
    id: "AL-01",
    photos: [
      { angulo: "Frente", src: "/results/aluno7-1.webp", width: 1000, height: 1000 },
      { angulo: "Costas", src: "/results/aluno7-2.webp", width: 1000, height: 1000 },
      { angulo: "Lateral", src: "/results/aluno7-3.webp", width: 1000, height: 1000 },
    ],
  },
  {
    id: "AL-02",
    photos: [
      { angulo: "Frente", src: "/results/aluno2-1.webp", width: 1000, height: 1000 },
      { angulo: "Costas", src: "/results/aluno2-2.webp", width: 1000, height: 1000 },
    ],
  },
  {
    id: "AL-03",
    photos: [
      { angulo: "Frente", src: "/results/aluno3-1.webp", width: 1000, height: 828 },
      { angulo: "Costas", src: "/results/aluno3-2.webp", width: 1000, height: 800 },
    ],
  },
  {
    id: "AL-04",
    photos: [
      { angulo: "Frente", src: "/results/aluno4-1.webp", width: 1000, height: 1000 },
      { angulo: "Costas", src: "/results/aluno4-2.webp", width: 1000, height: 1000 },
    ],
  },
  { id: "AL-05", photos: [{ angulo: "Frente", src: "/results/aluno1.webp", width: 1000, height: 989 }] },
  { id: "AL-06", photos: [{ angulo: "Frente", src: "/results/aluno5.webp", width: 1000, height: 951 }] },
  { id: "AL-07", photos: [{ angulo: "Frente", src: "/results/aluno6.webp", width: 1000, height: 1000 }] },
];

function AlunoCard({ aluno, delay }: { aluno: Aluno; delay: number }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const hasMultiple = aluno.photos.length > 1;

  // Passar o mouse dá uma prévia do próximo ângulo; clicar avança de verdade.
  const previewIndex = (active + 1) % aluno.photos.length;
  const displayIndex = hasMultiple && hovering ? previewIndex : active;
  const photo = aluno.photos[displayIndex];

  function handleAdvance() {
    if (!hasMultiple) return;
    setActive((a) => (a + 1) % aluno.photos.length);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-sm border border-chrome/12 bg-teal-800"
    >
      <span className="absolute left-2 top-2 z-10 h-1.5 w-1.5 rounded-full bg-chrome/20" />
      <span className="absolute right-2 top-2 z-10 h-1.5 w-1.5 rounded-full bg-chrome/20" />
      <span className="absolute bottom-2 left-2 z-10 h-1.5 w-1.5 rounded-full bg-chrome/20" />
      <span className="absolute bottom-2 right-2 z-10 h-1.5 w-1.5 rounded-full bg-chrome/20" />

      <div
        role={hasMultiple ? "button" : undefined}
        tabIndex={hasMultiple ? 0 : undefined}
        aria-label={hasMultiple ? `Ver próximo ângulo de ${aluno.id}` : undefined}
        onClick={handleAdvance}
        onKeyDown={(e) => {
          if (hasMultiple && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleAdvance();
          }
        }}
        onMouseEnter={() => hasMultiple && setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`relative aspect-[4/5] w-full overflow-hidden md:aspect-square ${hasMultiple ? "cursor-pointer" : ""}`}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={photo.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={photo.src}
              alt={`Antes e depois de um aluno do Arruda Army — ângulo ${photo.angulo.toLowerCase()}`}
              fill
              sizes="(max-width: 768px) 90vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

        {hasMultiple && (
          <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex gap-1">
            {aluno.photos.map((p, i) => (
              <span
                key={p.angulo}
                className={`h-0.5 flex-1 rounded-full transition-colors ${
                  i === active ? "bg-brass" : "bg-chrome/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3">
        <div>
          <span className="block font-mono text-[0.65rem] uppercase tracking-[0.3em] text-chrome-dim/60">
            {aluno.id}
          </span>
          <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-chrome-dim/35">
            Antes · Depois
          </span>
        </div>

        {hasMultiple && (
          <div className="flex gap-1">
            {aluno.photos.map((p, i) => (
              <button
                key={p.angulo}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`rounded-sm px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] transition-colors ${
                  i === active
                    ? "bg-brass text-ink"
                    : "text-chrome-dim/60 hover:text-chrome"
                }`}
              >
                {p.angulo.slice(0, 3)}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Aluno anterior" : "Próximo aluno"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-chrome/20 text-chrome transition-colors hover:border-brass hover:text-brass-bright md:h-11 md:w-11"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {direction === "prev" ? (
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export default function Results() {
  const isDesktop = useIsDesktop();
  const perView = isDesktop ? 3 : 1;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  function next() {
    setIndex((i) => (i + 1) % ALUNOS.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + ALUNOS.length) % ALUNOS.length);
  }

  // Avança automaticamente a cada 3s, como um carrossel — reinicia a contagem
  // a cada mudança de índice (manual ou automática) e pausa com o mouse em cima.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, 3000);
    return () => clearTimeout(t);
  }, [index, paused]);

  const visible = Array.from({ length: perView }, (_, i) => ALUNOS[(index + i) % ALUNOS.length]);

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
          Passe o mouse para visualizar. Clique para avançar.
        </motion.p>

        <div
          className="mt-14 flex items-center gap-3 md:gap-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ArrowButton direction="prev" onClick={prev} />

          <div className="min-w-0 flex-1 overflow-hidden">
            {/* key={index} força o React a remontar o grupo inteiro a cada
               troca, disparando a entrada com fade em cada card. */}
            <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {visible.map((aluno, i) => (
                <AlunoCard key={aluno.id} aluno={aluno} delay={i * 0.08} />
              ))}
            </div>
          </div>

          <ArrowButton direction="next" onClick={next} />
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          {ALUNOS.map((aluno, i) => (
            <button
              key={aluno.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir para ${aluno.id}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-brass" : "w-1.5 bg-chrome/20 hover:bg-chrome/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
