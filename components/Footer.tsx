import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-chrome/10 bg-teal-900 px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/icon.png"
            alt="Arruda Army"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-chrome">
              Arruda Army
            </p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-chrome-dim/50">
              Consultoria de treino online
            </p>
          </div>
        </div>

        <div className="flex gap-6 font-mono text-xs uppercase tracking-[0.2em] text-chrome-dim">
          <a href="#sobre" className="transition-colors hover:text-brass-bright">
            Sobre
          </a>
          <a href="#metodo" className="transition-colors hover:text-brass-bright">
            Método
          </a>
          <a href="#resultados" className="transition-colors hover:text-brass-bright">
            Resultados
          </a>
        </div>
      </div>
    </footer>
  );
}
