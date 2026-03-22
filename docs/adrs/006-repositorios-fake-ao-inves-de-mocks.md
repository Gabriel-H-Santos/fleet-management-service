# ADR 006 — Fake repositories ao invés de mocks

- **Data:** 2026-03-22
- **Status:** Aceito

## Contexto

Os testes de casos de uso precisam exercitar a lógica de negócio em isolamento da infraestrutura. A abordagem padrão em muitos projetos Node.js é usar os utilitários de mock do framework de testes para substituir métodos de repositório com valores de retorno inline. Embora rápida de configurar, essa abordagem tem uma desvantagem significativa: os stubs são acoplados à estrutura interna de chamadas do código testado. Uma refatoração que muda como um caso de uso chama um repositório pode silenciosamente quebrar testes mesmo quando o comportamento permanece correto, e vice-versa.

## Decisão

Implementei uma classe fake dedicada para cada interface de repositório. Os fakes armazenam dados em arrays privados em memória e implementam a mesma interface que os repositórios de produção implementam. Os testes interagem com os fakes através de `seed()` (para configurar estado) e `clear()` (para resetar entre casos).

Utilitários de mock (`jest.fn`, `jest.mock`, `jest.spyOn`) não são utilizados para dependências injetadas.

## Consequências

- Os testes são resilientes a refatorações internas — validam comportamento observável, não sequências de chamadas
- Os fakes podem ser reutilizados em múltiplas suites de testes sem duplicação
- Adicionar um novo método a uma interface de repositório força uma atualização correspondente no fake, detectando drift de contrato em tempo de compilação
- Escrever fakes exige mais esforço inicial do que stubs inline, mas o investimento é amortizado rapidamente ao longo de toda a suite de testes

## Referências

- MESZAROS, G. *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley, 2007. — Capítulo 23, Test Double: distinção formal entre Fake Objects, Stubs e Mock Objects
- FOWLER, M. *Mocks Aren't Stubs*. Disponível em: https://martinfowler.com/articles/mocksArentStubs.html — explica verificação baseada em estado versus verificação baseada em interação, e por que fakes favorecem a primeira
