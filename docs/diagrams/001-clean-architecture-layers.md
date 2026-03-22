# Diagrama 01 — Camadas da Clean Architecture

## Explicação

O projeto é organizado em cinco diretórios de código com responsabilidades estritamente separadas. A regra central é que o fluxo de dependência aponta sempre para dentro — camadas externas conhecem as internas, mas o inverso nunca ocorre.

- **domain** é o núcleo: contém entidades, interfaces de repositório e contratos de casos de uso. Não importa nada de fora.
- **application** implementa os casos de uso. Depende apenas do domínio — nunca de Express, TypeORM ou qualquer framework.
- **infra** fornece as implementações concretas dos repositórios e os primitivos de exceção HTTP. Depende dos contratos definidos no domínio.
- **presentation** trata das requisições HTTP: controllers, rotas e middleware de erro. Depende das interfaces da camada de aplicação.
- **di** é o ponto de composição: registra e conecta todas as dependências via TSyringe. Conhece application e infra, mas nenhuma das camadas de negócio o conhece.

## Diagrama

```mermaid
graph TD
    classDef presentation fill:#fce4ec,stroke:#e91e63,color:#000
    classDef application fill:#e8f5e9,stroke:#4caf50,color:#000
    classDef domain fill:#e3f2fd,stroke:#2196f3,color:#000
    classDef infra fill:#fff8e1,stroke:#ff9800,color:#000
    classDef di fill:#f3e5f5,stroke:#9c27b0,color:#000

    subgraph presentation["presentation"]
        C[Controladores]:::presentation
        R[Rotas]:::presentation
        MW[Middlewares]:::presentation
    end

    subgraph di["di"]
        CT[Container]:::di
    end

    subgraph application["application"]
        UC[Casos de Uso]:::application
        DTO[DTOs]:::application
        H[Helpers]:::application
    end

    subgraph domain["domain"]
        E[Entidades]:::domain
        RI[Interfaces de Repositório]:::domain
        UCI[Contratos de Casos de Uso]:::domain
    end

    subgraph infra["infra"]
        IR[Repositórios em Memória]:::infra
        EX[Exceções HTTP]:::infra
    end

    presentation --> application
    di --> application
    di --> infra
    application --> domain
    infra --> domain
```
