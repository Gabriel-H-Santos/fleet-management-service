# ADR 001 — Clean Architecture

- **Data:** 2026-03-22
- **Status:** Aceito

## Contexto

Um serviço de gestão de frota precisa lidar com preocupações bem distintas: regras de negócio sobre disponibilidade de veículos e atribuição de motoristas, tratamento de requisições HTTP, persistência de dados e validação de entrada. Sem fronteiras claras, mudanças em qualquer uma dessas áreas (como trocar o framework HTTP ou o mecanismo de armazenamento) correm o risco de impactar a lógica de negócio.

Precisei também ter confiança para testar os casos de uso de forma independente, sem precisar inicializar infraestrutura ou lidar com construtos específicos de frameworks.

## Decisão

Estruturei o código em quatro camadas explícitas seguindo os princípios da Clean Architecture:

- **domain** — entidades, interfaces de repositório e contratos de casos de uso. Sem dependências externas.
- **application** — implementações dos casos de uso, DTOs e helpers de validação. Depende apenas do domínio.
- **infra** — implementações de repositório e primitivos de exceção HTTP. Depende dos contratos do domínio.
- **presentation** — controllers, rotas e middlewares. Depende das interfaces da camada de aplicação.

O fluxo de dependência é estritamente para dentro: camadas externas dependem das internas, nunca o contrário. A camada de domínio não tem conhecimento de Express, persistência ou qualquer framework.

## Consequências

- A lógica de negócio pode ser testada sem instanciar servidores HTTP ou bancos de dados
- Trocar o framework HTTP ou a estratégia de persistência requer mudanças em apenas uma camada
- Novos membros da equipe têm um modelo mental claro de onde posicionar cada tipo de código
- A configuração inicial é mais verbosa do que uma estrutura plana, mas o custo das fronteiras se paga rapidamente conforme o código cresce

## Referências

- MARTIN, R. C. *Arquitetura Limpa: O Guia do Artesão para Estrutura e Design de Software*. Alta Books, 2019. — referência fundamental para o modelo de camadas e a Regra de Dependência
- MARTIN, R. C. *The Clean Architecture*. Disponível em: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html — artigo original introduzindo o diagrama de camadas concêntricas
- EVANS, E. *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley, 2003. — isolamento do modelo de domínio em relação à infraestrutura
