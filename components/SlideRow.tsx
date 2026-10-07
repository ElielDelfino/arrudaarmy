"use client";

import { useEffect, useRef } from "react";

// Faixa horizontal que desliza sozinha em loop (lista de filhos já duplicada
// pelo chamador — o loop reseta o deslocamento ao passar da metade da
// largura total, então a segunda cópia precisa existir fisicamente no DOM).
//
// Não pausa ao passar o mouse — só clicando na faixa (em qualquer lugar,
// inclusive num card) ou nas setas. As setas movem o fluxo manualmente pra
// qualquer um dos dois lados, sempre pausando o auto-play nesse momento.
export default function SlideRow({
  children,
  speed = 30,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const pausedRef = useRef(false);
  const manualRemaining = useRef(0);

  function setPaused(value: boolean) {
    pausedRef.current = value;
  }

  useEffect(() => {
    let raf: number;
    let last = performance.now();

    function tick(now: number) {
      const track = trackRef.current;
      const dt = now - last;
      last = now;
      if (track) {
        if (Math.abs(manualRemaining.current) > 0.5) {
          const maxStep = 1400 * (dt / 1000);
          const move = Math.sign(manualRemaining.current) * Math.min(Math.abs(manualRemaining.current), maxStep);
          offset.current += move;
          manualRemaining.current -= move;
        } else if (!pausedRef.current) {
          offset.current += (speed * dt) / 1000;
        }
        const half = track.scrollWidth / 2;
        if (half > 0) {
          if (offset.current >= half) offset.current -= half;
          else if (offset.current < 0) offset.current += half;
        }
        track.style.transform = `translateX(${-offset.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  function step(direction: 1 | -1) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    setPaused(true);
    manualRemaining.current += direction * wrap.clientWidth * 0.7;
  }

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div
        ref={trackRef}
        onClick={() => setPaused(!pausedRef.current)}
        className="flex w-max cursor-pointer items-center gap-5 sm:gap-6"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Voltar"
        className="absolute left-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-chrome/20 bg-ink/60 text-chrome opacity-80 backdrop-blur-sm transition-colors hover:border-brass hover:text-brass-bright hover:opacity-100 md:h-11 md:w-11"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Avançar"
        className="absolute right-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-chrome/20 bg-ink/60 text-chrome opacity-80 backdrop-blur-sm transition-colors hover:border-brass hover:text-brass-bright hover:opacity-100 md:h-11 md:w-11"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
