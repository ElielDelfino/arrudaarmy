"use client";

import { useSyncExternalStore } from "react";

// Detecta breakpoint md (>=768px). useSyncExternalStore evita mismatch de
// hidratação: no servidor sempre "false", corrigido assim que o client sincroniza.
const QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}
function getServerSnapshot() {
  return false;
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
