"use client";

import Image from "next/image";
import { motion } from "motion/react";

const PILARES = ["Treino sob medida", "Contato direto", "Sem planilha genérica"];

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="relative flex min-h-screen scroll-mt-20 flex-col justify-center bg-teal-900 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1.3fr_1fr] md:items-center md:px-10 md:gap-20">
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
            Arruda Army não é um aplicativo nem uma consultoria em série.
            Cada aluno é acompanhado diretamente — do plano à execução, do
            ajuste fino ao resultado — porque progresso de verdade não sai
            de fórmula pronta nem de planilha copiada.
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
          className="relative mx-auto aspect-square w-full max-w-xs"
        >
          <div className="absolute inset-0 rounded-full border border-chrome/10" />
          <div className="absolute inset-6 rounded-full border border-brass/25" />
          <Image
            src="/brand/icon.png"
            alt="Emblema Arruda Army"
            fill
            className="object-contain p-14"
          />
        </motion.div>
      </div>
    </section>
  );
}
