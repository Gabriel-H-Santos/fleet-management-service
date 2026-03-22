# ADR 003 — Express como framework HTTP

- **Data:** 2026-03-22
- **Status:** Aceito

## Contexto

O serviço expõe uma API REST e precisa de um framework HTTP para lidar com roteamento, middlewares e o ciclo de vida das requisições. As opções consideradas foram Express, Fastify e Koa.

O Fastify oferece maior throughput bruto e uma camada de validação de schema nativa, mas seu modelo de plugins introduz convenções que geram atrito quando a estrutura da aplicação já é definida pela Clean Architecture. O Koa é mínimo e elegante, mas exige mais configuração manual para padrões comuns. O Express é o framework Node.js mais amplamente adotado, com amplo suporte da comunidade e um modelo de middleware direto que se integra sem conflito à estrutura em camadas existente.

## Decisão

Escolhi o Express. Roteamento e middlewares ficam confinados à camada de apresentação; nenhum tipo ou construto do Express vaza para as camadas de aplicação ou domínio.

## Consequências

- Familiar para praticamente todo desenvolvedor Node.js, reduzindo o custo de onboarding
- O ecossistema de middlewares compatíveis com Express é o maior disponível
- O Express não impõe nenhuma convenção estrutural, portanto a disciplina arquitetural é mantida pelas próprias fronteiras de camada do projeto
- Se o throughput se tornar um problema em escala, migrar para o Fastify afetaria apenas a camada de apresentação

## Referências

- Express.js. *Express — Fast, unopinionated, minimalist web framework for Node.js*. Disponível em: https://expressjs.com — documentação oficial e referência da API
- npm. *express*. Disponível em: https://www.npmjs.com/package/express — métricas de adoção; consistentemente entre os pacotes Node.js mais baixados
