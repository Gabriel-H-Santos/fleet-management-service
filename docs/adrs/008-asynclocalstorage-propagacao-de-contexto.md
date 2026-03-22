# ADR 008 — AsyncLocalStorage para propagação de contexto

- **Data:** 2026-03-22
- **Status:** Aceito

## Contexto

Para correlacionar logs de uma mesma requisição, cada entrada de log precisa carregar um `traceId` e um `correlationId`. O desafio é tornar esses identificadores acessíveis em qualquer ponto da cadeia de execução — middlewares, casos de uso, repositórios — sem alterar as assinaturas de nenhuma função.

A alternativa mais direta seria passar um objeto de contexto explicitamente como parâmetro por toda a pilha de chamadas. Isso funciona, mas viola o princípio de separação de preocupações: a camada de domínio não deve conhecer nem transportar contexto de infraestrutura de observabilidade. Cada interface de caso de uso e repositório precisaria de um parâmetro adicional que nada tem a ver com as regras de negócio que eles modelam.

Outra opção seria um singleton global mutável. Simples, mas não seguro para ambientes concorrentes: requisições simultâneas sobrescreveriam o contexto umas das outras.

## Decisão

Utilizei `AsyncLocalStorage` do módulo nativo `node:async_hooks`. O `traceIdMiddleware` chama `asyncContextManager.run(context, () => next())` na entrada de cada requisição, estabelecendo um escopo de contexto isolado. Esse escopo se propaga automaticamente por toda a cadeia assíncrona — `await`, callbacks de `Promise` e listeners de `EventEmitter` registrados dentro do escopo herdam o mesmo contexto. O logger lê o contexto atual via `getContext()` em cada chamada de log sem que nenhuma outra camada precise saber da sua existência.

## Consequências

- As interfaces de domínio e aplicação permanecem limpas — nenhum parâmetro de contexto adicionado
- Requisições concorrentes têm contextos completamente isolados, sem risco de contaminação entre escopos
- Nenhuma dependência externa: `AsyncLocalStorage` é parte da biblioteca padrão do Node.js desde a versão 12.17
- A propagação de contexto por listeners de `EventEmitter` (usada no `logMiddleware` via `res.on('finish', ...)`) requer Node.js 17.4 ou superior — compatível com o runtime adotado pelo projeto (Node.js 24)
- A abstração pode ser estendida para incluir outros campos de contexto (`userId`, `spanId`) sem alterações nas interfaces de negócio

## Referências

- Node.js. *AsyncLocalStorage*. Disponível em: https://nodejs.org/api/async_context.html — documentação oficial da API, incluindo semântica de propagação e integração com EventEmitter
- Node.js. *Diagnostics — Async Context Tracking*. Disponível em: https://nodejs.org/en/learn/asynchronous-work/asynchronous-context-tracking — guia introdutório sobre rastreamento de contexto assíncrono
