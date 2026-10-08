# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre este repositório

Landing page estática para "Arruda Army" (personal trainer/coach), construída em cima dos assets em `assets/`. Projeto já escafoldado (Next.js + Tailwind + Motion, ver `docs/STACK.md`), com CI/CD configurado — push na branch `main` dispara build + deploy automático no Firebase Hosting (ver `docs/SETUP-DEPLOY.md`).

## Documentação

As decisões e o contexto deste projeto estão documentados em `docs/` — leia o arquivo relevante antes de mexer na área correspondente:

- @docs/STACK.md — framework, libs e por que cada escolha foi feita.
- @docs/ARCHITECTURE.md — estrutura de assets, seções da página e implicações do export estático do Next.js.
- @docs/SECURITY.md — privacidade das fotos de alunos, segredos/credenciais, dados do formulário de leads, DNS.
- @docs/SETUP-DEPLOY.md — receita completa de deploy (Firebase Hosting, WIF, domínio).
- @docs/MARKETING.md — padrão e passo a passo dos vídeos/imagens de divulgação (Reels, Story, post) gerados a partir do site; scripts em `marketing/`.

Ao adicionar uma decisão nova ou mudar uma existente, atualize o arquivo correspondente em `docs/` em vez de duplicar a informação aqui.

## Regras rápidas (sempre valem)

- **Nunca publicar as fotos de `assets/alunos/` nem os prints de `assets/depoimentos/`** sem confirmar autorização — ver @docs/SECURITY.md.
- **Nunca commitar segredos** (`.env`, chaves, tokens) — usar GitHub Secrets no CI. O deploy do Firebase usa Workload Identity Federation, não chave JSON de service account.
- **Antes de configurar CI/CD**, confirmar que o repositório já tem `git init` + remoto no GitHub — é pré-requisito.
- **Toda seção de `main` deve ter exatamente a altura da tela** (igual ao hero) em 390×844 e 1440×900, com `pt-20` no mobile para o rótulo não ficar atrás do menu fixo — é o que mantém as paradas do vídeo de divulgação sem cortes. Ao criar/alterar uma seção, conferir as alturas — ver @docs/MARKETING.md.
- Repositório do usuário usado como referência de padrão de deploy: `~/storage/opencode-dev/workspace/chill-store-main-2` (ver @docs/SETUP-DEPLOY.md).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
