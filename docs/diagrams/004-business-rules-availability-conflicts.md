# Diagrama 04 — Regras de negócio: conflitos de disponibilidade

## Explicação

Este diagrama consolida as regras de negócio que governam a disponibilidade de veículos e motoristas no momento de criar uma nova utilização.

Há dois tipos de conflito possíveis:

- **Veículo ocupado:** o veículo solicitado já possui uma utilização sem `endDate`, ou seja, está em uso por outro motorista no momento da requisição.
- **Motorista ocupado:** o motorista solicitado já está associado a uma utilização ativa em outro veículo.

Ambos resultam em `409 Conflict` com mensagens distintas para que o cliente saiba exatamente qual restrição foi violada. As verificações de existência (404) ocorrem antes das verificações de conflito (409).

## Diagrama

```mermaid
flowchart TD
    classDef erro fill:#ffebee,stroke:#ef5350,color:#000
    classDef sucesso fill:#e8f5e9,stroke:#66bb6a,color:#000
    classDef acao fill:#e3f2fd,stroke:#42a5f5,color:#000

    A[POST /api/vehicle-usages]:::acao --> B{Veículo existe?}
    B -- Não --> B1[404 Não Encontrado]:::erro
    B -- Sim --> C{Motorista existe?}
    C -- Não --> C1[404 Não Encontrado]:::erro
    C -- Sim --> D{Veículo está em uso?}
    D -- Sim --> D1[409 Conflito Veículo já em uso]:::erro
    D -- Não --> E{Motorista está em uso?}
    E -- Sim --> E1[409 Conflito Motorista já conduzindo outro veículo]:::erro
    E -- Não --> F[Cria utilização startDate = agora]:::acao
    F --> G[201 Criado]:::sucesso
```
