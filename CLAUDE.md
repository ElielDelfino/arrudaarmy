# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre este repositório

Landing page estática para "Arruda Army" (personal trainer/coach), construída em cima dos assets em `assets/`. Ainda não há código-fonte nem `.git` neste repositório — stack e deploy já foram decididos (ver `docs/`), mas o projeto ainda não foi escafoldado.

## Documentação

As decisões e o contexto deste projeto estão documentados em `docs/` — leia o arquivo relevante antes de mexer na área correspondente:

- @docs/STACK.md — framework, libs e por que cada escolha foi feita.
- @docs/ARCHITECTURE.md — estrutura de assets, seções da página e implicações do export estático do Next.js.
- @docs/SECURITY.md — privacidade das fotos de alunos, segredos/credenciais, dados do formulário de leads, DNS.
- @docs/SETUP-DEPLOY.md — receita completa de deploy (Firebase Hosting, WIF, domínio).

Ao adicionar uma decisão nova ou mudar uma existente, atualize o arquivo correspondente em `docs/` em vez de duplicar a informação aqui.

## Regras rápidas (sempre valem)

- **Nunca publicar as fotos de `assets/alunos/`** sem confirmar autorização do aluno — ver @docs/SECURITY.md.
- **Nunca commitar segredos** (`.env`, chaves, tokens) — usar GitHub Secrets no CI. O deploy do Firebase usa Workload Identity Federation, não chave JSON de service account.
- **Antes de configurar CI/CD**, confirmar que o repositório já tem `git init` + remoto no GitHub — é pré-requisito.
- Repositório do usuário usado como referência de padrão de deploy: `~/storage/opencode-dev/workspace/chill-store-main-2` (ver @docs/SETUP-DEPLOY.md).
