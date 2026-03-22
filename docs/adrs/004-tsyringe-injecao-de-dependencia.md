# ADR 004 — TSyringe para injeção de dependência

- **Data:** 2026-03-22
- **Status:** Aceito

## Contexto

Com a Clean Architecture implementada, cada caso de uso depende de uma ou mais interfaces de repositório definidas na camada de domínio. Conectar essas dependências manualmente (passando instâncias pelos construtores na raiz de composição) é viável, mas se torna tedioso conforme o número de casos de uso cresce. Também dispersa a lógica de configuração pelo código se não for centralizada.

As opções consideradas foram configuração manual, InversifyJS e TSyringe. O InversifyJS é rico em recursos, mas verboso, exigindo configuração explícita no container para cada binding. O TSyringe usa decorators TypeScript (`@injectable`, `@inject`) e se integra naturalmente ao `reflect-metadata`, que já é uma dependência par do stack.

## Decisão

Adotei o TSyringe. Cada implementação de caso de uso é decorada com `@injectable`, e a injeção baseada em tokens é utilizada para interfaces de repositório. Todos os registros ficam centralizados no diretório `src/di/`.

## Consequências

- A configuração de dependências é declarativa e colocada junto ao arquivo de registro de cada módulo
- Adicionar um novo caso de uso requer apenas um decorator e uma linha de registro
- O TSyringe requer `emitDecoratorMetadata: true` e `experimentalDecorators: true` no `tsconfig.json` — ambos estão habilitados
- O container de DI é uma preocupação de infraestrutura e vive em sua própria camada, mantendo o código de domínio e aplicação livre de imports específicos do container

## Referências

- Microsoft. *TSyringe — A lightweight dependency injection container for TypeScript/JavaScript for use with constructor injection*. Disponível em: https://github.com/microsoft/tsyringe — repositório oficial, API de decorators e configuração do container
- TC39. *Decorators Proposal*. Disponível em: https://github.com/tc39/proposal-decorators — especificação da sintaxe de decorator utilizada por `@injectable` e `@inject`
