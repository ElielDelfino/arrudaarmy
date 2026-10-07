"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      video.pause();
      return;
    }

    // Toca os 4s do vídeo e, ao terminar, espera 2s antes de reiniciar
    // (em vez de loop contínuo — pausa proposital entre repetições).
    let timeout: ReturnType<typeof setTimeout>;
    const handleEnded = () => {
      timeout = setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 2000);
    };
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16 md:px-10"
    >
      {/* Vídeo de fundo — animação do emblema (assets/logo/IMG_2127.MP4, cortado em 4s,
         comprimido em public/brand/hero-bg.mp4). No mobile (hero mais alto que largo)
         object-cover preenche bem sem distorcer. No desktop (hero bem mais largo que
         alto), em vez de cortar ou colar uma cor de fundo ao lado (nunca bate exatamente
         com o gradiente/grão reais), esticamos o vídeo lateralmente com object-fill —
         preenche 100% da largura sem faixas de cor visíveis. Sem `loop`: reinicia via JS
         com pausa de 2s. */}
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        muted
        playsInline
        poster="/brand/hero-bg-poster.webp"
        className="absolute inset-0 h-full w-full object-cover opacity-45 md:object-fill"
      >
        <source src="/brand/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Vinheta radial + escurecimento, garantindo contraste do texto sobre o vídeo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(176,141,56,0.08), transparent 60%), radial-gradient(ellipse 90% 70% at 100% 100%, rgba(1,9,11,0.85), transparent 55%), linear-gradient(rgba(1,9,11,0.55), rgba(5,38,43,0.75))",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10">
        {/* Selo / eyebrow no estilo de carimbo de dossiê */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-brass-bright"
        >
          [ Consultoria de treino e nutrição — 100% online ]
        </motion.p>

        <div className="relative">
          {/* Anel de impacto do "carimbo" */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0.5, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
            className="absolute -left-4 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-brass-bright md:h-56 md:w-56"
          />

          <motion.h1
            initial={{ opacity: 0, scale: 1.18, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 15, delay: 0.1 }}
            className="font-display text-[19vw] leading-[0.78] tracking-tight text-chrome md:text-[9.5rem] lg:text-[11rem]"
            style={{
              textShadow:
                "0 2px 0 rgba(176,141,56,0.35), 0 1px 0 rgba(1,9,11,0.6), 0 18px 40px rgba(1,9,11,0.55)",
            }}
          >
            ARRUDA
            <br />
            ARMY
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="max-w-xl font-heading text-xl text-chrome-dim md:text-2xl"
        >
          Treino e dieta sob comando direto.
          <br />
          Sem fórmula pronta.
          <br />
          Sem achismo.
          <br />
          Só estratégia, execução e acompanhamento.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#inscricao"
            className="rounded-sm bg-brass px-7 py-3.5 text-center font-heading text-2xl font-semibold text-ink transition-colors hover:bg-brass-bright"
          >
            Comece sua transformação
          </a>
          <a
            href="#metodo"
            className="rounded-sm border border-chrome/30 px-7 py-3.5 text-center font-heading text-2xl font-semibold text-chrome transition-colors hover:border-chrome hover:bg-chrome/5"
          >
            Ver o método
          </a>
        </motion.div>
      </div>

      {/* Rótulo vertical lateral — textura de dossiê, sem estatística inventada */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] font-mono text-xs uppercase tracking-[0.4em] text-chrome-dim/50 md:block"
      >
        Treino · Nutrição · Acompanhamento
      </div>
    </section>
  );
}
