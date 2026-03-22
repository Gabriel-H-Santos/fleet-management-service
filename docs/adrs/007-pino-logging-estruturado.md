# ADR 007 — Pino para logging estruturado

- **Data:** 2026-03-22
- **Status:** Aceito

## Contexto

O serviço precisava de uma camada de logging para registrar requisições HTTP e erros de forma estruturada e indexável. As alternativas consideradas foram `console.log`, Winston e Pino.

`console.log` não oferece níveis de severidade, serialização JSON ou controle por ambiente — inadequado para produção. O Winston é o logger mais popular do ecossistema Node.js e possui uma API rica, mas é síncrono por padrão e carrega um overhead considerável. O Pino, por sua vez, é o logger Node.js de maior throughput disponível: opera de forma assíncrona, produz JSON compacto por padrão e suporta TypeScript nativamente sem pacote de tipos adicional.

## Decisão

Adotei o Pino como biblioteca de logging. O comportamento varia por ambiente: JSON puro em produção, saída formatada via `pino-pretty` em desenvolvimento e nível `silent` em testes para evitar ruído durante a execução da suite. O `pino-pretty` foi adicionado como dependência de desenvolvimento e nunca é carregado em produção.

O logger expõe quatro métodos (`info`, `warn`, `error`, `debug`) e enriquece automaticamente cada chamada com os identificadores de contexto da requisição corrente — sem exigir que as camadas de domínio ou aplicação passem esses dados explicitamente.

## Consequências

- Saída JSON em produção é diretamente indexável por ferramentas de gestão de logs (Datadog, ELK, Cloud Logging)
- `pino-pretty` oferece legibilidade no terminal de desenvolvimento sem impactar o artefato de produção
- A ausência de logs durante os testes mantém a saída da suite limpa e focada nos resultados
- Nenhum pacote `@types/pino` necessário — os tipos são fornecidos pelo próprio pacote
- Se o logging precisar ser substituído no futuro, o impacto fica contido no módulo `src/infra/logger/`

## Referências

- Pino. *Pino — Super fast, all natural JSON logger*. Disponível em: https://getpino.io — documentação oficial e benchmarks de performance
- npm. *pino*. Disponível em: https://www.npmjs.com/package/pino — histórico de adoção e versões
