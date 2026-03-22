# ADR 005 — Zod para validação de DTOs

- **Data:** 2026-03-22
- **Status:** Aceito

## Contexto

Requisições HTTP carregam dados fornecidos pelo usuário que precisam ser validados antes de chegar aos casos de uso. O sistema de tipos do TypeScript é apagado em tempo de execução, portanto tipos em tempo de compilação isoladamente não protegem contra payloads malformados. Uma biblioteca de validação em runtime é necessária.

As opções consideradas foram Joi, class-validator e Zod. O Joi é maduro, mas JavaScript-first — seus tipos são uma camada adicional, não um recurso nativo. O `class-validator` se integra bem a DTOs baseados em classes, mas exige decorators nas propriedades e acopla a validação ao modelo orientado a objetos. O Zod define schemas como valores TypeScript simples, infere tipos estáticos diretamente deles e produz mensagens de erro claras e estruturadas, sem necessidade de decorators.

## Decisão

Utilizei schemas Zod para validar todos os corpos de requisição recebidos. Os schemas são definidos em `src/application/dtos/` junto aos seus respectivos casos de uso. Um `validation.helper.ts` compartilhado centraliza a chamada `safeParse` e lança uma exceção `BadRequest` estruturada em caso de falha.

## Consequências

- Os tipos dos DTOs são inferidos a partir dos schemas Zod — há uma única fonte de verdade para formato e validação
- Os erros de validação são estruturados e descritivos, facilitando o retorno de mensagens significativas para os consumidores da API
- Os schemas Zod são combináveis e fáceis de estender (ex.: adicionar `.optional()`, `.min()`, `.regex()`) sem alterar o código ao redor
- O Zod adiciona um pequeno overhead de tamanho de bundle, negligível para um serviço server-side

## Referências

- COLINHACKS. *Zod — TypeScript-first schema validation with static type inference*. Disponível em: https://zod.dev — documentação oficial, API de schemas e modelo de inferência TypeScript
- npm. *zod*. Disponível em: https://www.npmjs.com/package/zod — métricas de adoção e histórico de versões
