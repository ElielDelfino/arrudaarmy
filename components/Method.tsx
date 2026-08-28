"use client";

import { motion } from "motion/react";

const STEPS = [
  {
    n: "01",
    title: "Avaliação",
    text: "Ponto de partida real: rotina, histórico, limitações e objetivo — sem meia palavra.",
  },
  {
    n: "02",
    title: "Planejamento",
    text: "Treino e dieta desenhados para a sua rotina, não para uma planilha padrão de internet.",
  },
  {
    n: "03",
    title: "Execução",
    text: "Você entra em campo. Ajuste fino toda semana, conforme a resposta do seu corpo.",
  },
  {
    n: "04",
    title: "Acompanhamento",
    text: "Contato direto comigo. Suporte contínuo até o resultado aparecer — e depois dele também.",
  },
];

export default function Method() {
  return (
    <section
      id="metodo"
      className="relative flex min-h-screen scroll-mt-20 flex-col justify-center bg-teal-800 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-brass-bright"
        >
          O método
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 max-w-2xl font-heading text-4xl font-semibold text-chrome md:text-6xl"
        >
          Quatro fases. Nenhum atalho.
        </motion.h2>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-sm bg-teal-700 md:mt-16 md:grid-cols-4 md:px-10">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-teal-800 p-4 md:p-8"
          >
            <span className="font-mono text-3xl font-semibold text-brass/35 md:text-5xl">
              {step.n}
            </span>
            <h3 className="mt-3 font-heading text-base font-semibold text-chrome md:mt-6 md:text-xl">
              {step.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-chrome-dim md:mt-3 md:text-sm">{step.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-px max-w-6xl md:px-10">
        <a
          href="#inscricao"
          className="flex flex-col gap-2 bg-brass px-8 py-6 text-ink transition-colors hover:bg-brass-bright sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <span className="block font-mono text-xs uppercase tracking-[0.3em] opacity-70">
              Próximo passo
            </span>
            <span className="block font-heading text-2xl font-semibold">
              Comece sua transformação
            </span>
          </span>
          <span aria-hidden="true" className="font-mono text-2xl">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
