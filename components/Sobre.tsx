"use client";

import Image from "next/image";
import { motion } from "motion/react";

const PILARES = ["Treino sob medida", "Contato direto", "Sem planilha genérica"];

interface FotoSobre {
  src: string;
  className: string;
  style: React.CSSProperties;
  /** Visível só a partir do md (desktop) — no mobile aparecem só 3 fotos. */
  desktopOnly?: boolean;
}

// Colagem inspirada na seção "Sobre" de arturcalheiros.revvistudios.com —
// fotos (assets/hugoarruda/sobremim{1,2,4,5,6}) sobrepostas em posições
// fixas (%), todas na mesma proporção (3:4, igual à sobremim1), com leve
// flutuação (ver @keyframes em app/globals.css). sobremim2 (ele com os
// alunos) fica no centro, maior. No mobile só 3 fotos aparecem — sobremim1,
// sobremim2 e sobremim5 (sobremim6/sobremim4 têm `desktopOnly: true`).
const FOTOS: FotoSobre[] = [
  {
    src: "/sobre/sobremim6.webp",
    className: "animate-[photo-float-a_7s_ease-in-out_infinite]",
    style: { top: "0%", left: "0%", width: "36%", aspectRatio: "3 / 4", zIndex: 1, animationDelay: "0s" },
    desktopOnly: true,
  },
  {
    src: "/sobre/sobremim1.webp",
    className: "animate-[photo-float-b_8s_ease-in-out_infinite]",
    style: { bottom: "2%", left: "4%", width: "37%", aspectRatio: "3 / 4", zIndex: 2, animationDelay: "0.5s" },
  },
  {
    // Sem `top` no style: a posição vertical vem das classes abaixo (mais
    // centralizada no navegador normal, a partir do md — ver `top-[...]`).
    src: "/sobre/sobremim2.webp",
    className: "-top-[6%] animate-[photo-float-a_7s_ease-in-out_infinite] md:top-[20%]",
    style: { left: "28%", width: "48%", aspectRatio: "3 / 4", zIndex: 5, animationDelay: "1s" },
  },
  {
    src: "/sobre/sobremim4.webp",
    className: "animate-[photo-float-b_8s_ease-in-out_infinite]",
    style: { top: "0%", right: "0%", width: "34%", aspectRatio: "3 / 4", zIndex: 3, animationDelay: "1.5s" },
    desktopOnly: true,
  },
  {
    src: "/sobre/sobremim5.webp",
    className: "animate-[photo-float-a_7s_ease-in-out_infinite]",
    style: { bottom: "0%", right: "2%", width: "38%", aspectRatio: "3 / 4", zIndex: 2, animationDelay: "2s" },
  },
];

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="relative flex min-h-screen scroll-mt-20 flex-col justify-center overflow-hidden bg-teal-900 py-16 md:py-24"
    >
      {/* Vídeo de academia como fundo da seção — em loop, mudo, autoplay.
         MP4 H.264 baseline profile (sem B-frames), 540p 24fps CFR — decode
         leve em qualquer device. Poster estático enquanto carrega. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/sobre/fundo-sobremim-poster.webp"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
        disableRemotePlayback
      >
        <source src="/sobre/fundo-sobremim.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 20% 10%, rgba(5,38,43,0.5), transparent 55%), linear-gradient(180deg, rgba(1,9,11,0.8), rgba(5,38,43,0.82) 45%, rgba(5,38,43,0.88))",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1.3fr_1fr] md:items-center md:px-10 md:gap-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.35em] text-brass-bright"
          >
            Sobre
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-heading text-4xl font-semibold text-chrome md:text-5xl"
          >
            Comando direto, sem terceirização.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-xl text-chrome-dim leading-relaxed"
          >
            Na Arruda Army, cada aluno é acompanhado de perto, com estratégia
            construída de acordo com sua rotina, objetivo e evolução. Nada de
            protocolos genéricos ou planilhas copiadas: o planejamento é
            individual, o acompanhamento é constante e cada ajuste acontece
            quando precisa acontecer.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 max-w-xl text-chrome-dim leading-relaxed"
          >
            Você não entra para seguir uma fórmula. Entra para seguir uma
            estratégia.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {PILARES.map((p) => (
              <li
                key={p}
                className="rounded-sm border border-brass/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-brass-bright"
              >
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto h-[340px] w-full max-w-md sm:h-[440px] md:h-[500px] lg:h-[580px]"
        >
          {/* Emblema original, mantido como fundo atrás da colagem de fotos. */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-0 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute inset-0 rounded-full border border-chrome/10" />
            <div className="absolute inset-6 rounded-full border border-brass/25" />
            <Image src="/brand/icon.png" alt="" fill className="object-contain p-10" />
          </div>

          {FOTOS.map((foto) => (
            <div
              key={foto.src}
              style={foto.style}
              className={`absolute overflow-hidden rounded-2xl border border-chrome/15 bg-teal-800 opacity-90 shadow-xl shadow-ink/50 ${foto.className} ${
                foto.desktopOnly ? "hidden md:block" : ""
              }`}
            >
              <Image
                src={foto.src}
                alt="Hugo Arruda"
                fill
                sizes="(max-width: 768px) 45vw, 240px"
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
