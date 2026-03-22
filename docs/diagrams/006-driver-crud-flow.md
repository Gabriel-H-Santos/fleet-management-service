# Diagrama 06 — Fluxo CRUD de motoristas

## Explicação

Este diagrama cobre o ciclo de vida completo de um motorista no sistema: criação, leitura, atualização e remoção. O recurso de motoristas é o mais simples da API — não possui restrições de unicidade além da validação do campo `name` como obrigatório na criação.

A listagem suporta filtro opcional por `name`, aplicado via busca parcial sem distinção de maiúsculas e minúsculas.

## Diagrama

```mermaid
flowchart TD
    classDef erro fill:#ffebee,stroke:#ef5350,color:#000
    classDef sucesso fill:#e8f5e9,stroke:#66bb6a,color:#000
    classDef acao fill:#e3f2fd,stroke:#42a5f5,color:#000

    A([Cliente]) --> B{Operação}

    B -- POST /api/drivers --> C{Body válido?}
    C -- Não --> C1[400 Requisição Inválida]:::erro
    C -- Sim --> C2[Cria motorista]:::acao
    C2 --> C3[201 Criado]:::sucesso

    B -- GET /api/drivers --> D[Aplica filtro nome]:::acao
    D --> D1[200 OK — array]:::sucesso

    B -- GET /api/drivers/:id --> E{Motorista existe?}
    E -- Não --> E1[404 Não Encontrado]:::erro
    E -- Sim --> E2[200 OK]:::sucesso

    B -- PATCH /api/drivers/:id --> F{Motorista existe?}
    F -- Não --> F1[404 Não Encontrado]:::erro
    F -- Sim --> G{Body válido?}
    G -- Não --> G1[400 Requisição Inválida]:::erro
    G -- Sim --> G2[Atualiza motorista]:::acao
    G2 --> G3[200 OK]:::sucesso

    B -- DELETE /api/drivers/:id --> H{Motorista existe?}
    H -- Não --> H1[404 Não Encontrado]:::erro
    H -- Sim --> H2[Remove motorista]:::acao
    H2 --> H3[204 Sem Conteúdo]:::sucesso
```
