# Diagrama 05 — Fluxo CRUD de veículos

## Explicação

Este diagrama cobre o ciclo de vida completo de um veículo no sistema: criação, leitura, atualização e remoção. A criação e a atualização incluem verificação de unicidade de placa, que é a única restrição de negócio aplicada a este recurso além da validação de campos obrigatórios.

A listagem suporta filtros opcionais por `color` e `brand`, aplicados via busca parcial sem distinção de maiúsculas e minúsculas.

## Diagrama

```mermaid
flowchart TD
    classDef erro fill:#ffebee,stroke:#ef5350,color:#000
    classDef sucesso fill:#e8f5e9,stroke:#66bb6a,color:#000
    classDef acao fill:#e3f2fd,stroke:#42a5f5,color:#000

    A([Cliente]) --> B{Operação}

    B -- POST /api/vehicles --> C{Body válido?}
    C -- Não --> C1[400 Requisição Inválida]:::erro
    C -- Sim --> D{Placa já cadastrada?}
    D -- Sim --> D1[409 Conflito]:::erro
    D -- Não --> D2[Cria veículo]:::acao
    D2 --> D3[201 Criado]:::sucesso

    B -- GET /api/vehicles --> E[Aplica filtros cor/marca]:::acao
    E --> E1[200 OK — array]:::sucesso

    B -- GET /api/vehicles/:id --> F{Veículo existe?}
    F -- Não --> F1[404 Não Encontrado]:::erro
    F -- Sim --> F2[200 OK]:::sucesso

    B -- PATCH /api/vehicles/:id --> G{Veículo existe?}
    G -- Não --> G1[404 Não Encontrado]:::erro
    G -- Sim --> H{Alterando placa?}
    H -- Não --> H1[Atualiza campos]:::acao
    H -- Sim --> I{Nova placa já cadastrada?}
    I -- Sim --> I1[409 Conflito]:::erro
    I -- Não --> H1
    H1 --> H2[200 OK]:::sucesso

    B -- DELETE /api/vehicles/:id --> J{Veículo existe?}
    J -- Não --> J1[404 Não Encontrado]:::erro
    J -- Sim --> J2[Remove veículo]:::acao
    J2 --> J3[204 Sem Conteúdo]:::sucesso
```
