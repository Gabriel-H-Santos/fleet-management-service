# Fleet Management Service

API REST para controle de utilização de veículos de uma frota. Permite gerenciar veículos, motoristas e registros de uso — com regras de negócio que garantem que um veículo não seja utilizado por mais de um motorista ao mesmo tempo, e que um motorista não conduza mais de um veículo simultaneamente.

Construído com Node.js, TypeScript e Clean Architecture — sem banco de dados, persistência em memória.

---

## 🚀 Como executar

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Git](https://git-scm.com)
- [Node.js v24](https://nodejs.org/en/) — versão exata no `.nvmrc`. Para gerenciar versões do Node, recomendo o [NVM](https://github.com/nvm-sh/nvm) (Linux/macOS) ou o [NVS](https://github.com/jasongin/nvs) (multiplataforma, funciona bem no Windows)
- [Docker](https://www.docker.com/products/docker-desktop/) — para executar via container

---

### 🔧 Instalação

```bash
# Clone o repositório
$ git clone https://github.com/Gabriel-H-Santos/fleet-management-service.git

# Entre na pasta do projeto
$ cd fleet-management-service

# Instale as dependências
$ npm install
```

---

### ⚙️ Variáveis de Ambiente

| Variável | Padrão | Descrição | Opcional |
|---|---|---|---|
| `PORT` | `3000` | Porta em que o servidor HTTP irá escutar | * |
| `NODE_ENV` | — | Ambiente de execução (`production`, `development` ou `test`) | * |

> Nenhum arquivo `.env` é necessário para execução local. As variáveis acima são opcionais e possuem valores padrão.

---

### ▶️ Executando Localmente

```bash
# Produção
$ npm start

# Desenvolvimento (com hot reload)
$ npm run dev
```

O servidor sobe instantaneamente e escuta na porta `3000`.

```bash
# Health check
$ curl http://localhost:3000/health
# { "status": "ok", "uptime": 12 }

# Criar um veículo
$ curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{"plate": "ABC1234", "color": "Vermelho", "brand": "Toyota"}'

# Listar veículos
$ curl http://localhost:3000/api/vehicles
```

---

### 🐋 Executando com Docker

```bash
# Subir o container
$ npm run infra:up

# Parar o container
$ npm run infra:stop

# Remover o container e volumes
$ npm run infra:down
```

---

### ⚙️ Executando Testes

```bash
# Testes
$ npm test

# Testes com watch
$ npm run test:watch

# Testes com cobertura
$ npm run test:cov

# Testes com saída detalhada
$ npm run test:verbose
```

A cobertura mínima configurada é de **80%** em branches, functions, lines e statements.

---

## 🌐 API

A documentação completa de cada recurso — entidade, endpoints, schemas, exemplos de resposta e cobertura de testes — está em [`docs/api/`](./docs/api/):

| Recurso | Documentação |
|---|---|
| Veículos | [docs/api/vehicles.md](./docs/api/vehicles.md) |
| Motoristas | [docs/api/drivers.md](./docs/api/drivers.md) |
| Utilizações de Veículo | [docs/api/vehicle-usages.md](./docs/api/vehicle-usages.md) |

---

## 🗂️ Postman Collection

A collection está disponível em [`docs/collections/`](./docs/collections/) e cobre todos os 13 endpoints da API com exemplos de requisição e resposta salvos para cada cenário relevante — incluindo os casos de erro (400, 404, 409, 422).

**Como importar:**
1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo `docs/collections/fleet_management_service.postman_collection.json`
4. Defina a variável de coleção `base_url` como `http://localhost:3000`

> Os endpoints de criação (POST de veículos, motoristas e utilizações) possuem scripts que capturam automaticamente o `id` da resposta e o armazenam nas variáveis `vehicle_id`, `driver_id` e `vehicle_usage_id`, disponibilizando-os para os demais endpoints da coleção sem configuração manual.

---

## 🏗️ ADRs (Architecture Decision Records)

As decisões de arquitetura estão documentadas em [`docs/adrs/`](./docs/adrs/):

| # | Decisão | Documentação |
|---|---|---|
| 001 | Clean Architecture em quatro camadas | [docs/adrs/001-clean-architecture.md](./docs/adrs/001-clean-architecture.md) |
| 002 | Persistência em memória | [docs/adrs/002-persistencia-em-memoria.md](./docs/adrs/002-persistencia-em-memoria.md) |
| 003 | Express como framework HTTP | [docs/adrs/003-express-framework-http.md](./docs/adrs/003-express-framework-http.md) |
| 004 | TSyringe para injeção de dependência | [docs/adrs/004-tsyringe-injecao-de-dependencia.md](./docs/adrs/004-tsyringe-injecao-de-dependencia.md) |
| 005 | Zod para validação de DTOs | [docs/adrs/005-zod-validacao-de-dtos.md](./docs/adrs/005-zod-validacao-de-dtos.md) |
| 006 | Fake repositories ao invés de mocks | [docs/adrs/006-repositorios-fake-ao-inves-de-mocks.md](./docs/adrs/006-repositorios-fake-ao-inves-de-mocks.md) |
| 007 | Pino para logging estruturado | [docs/adrs/007-pino-logging-estruturado.md](./docs/adrs/007-pino-logging-estruturado.md) |
| 008 | AsyncLocalStorage para propagação de contexto | [docs/adrs/008-asynclocalstorage-propagacao-de-contexto.md](./docs/adrs/008-asynclocalstorage-propagacao-de-contexto.md) |

---

## 📐 Diagramas

Os fluxos da aplicação estão documentados em [`docs/diagrams/`](./docs/diagrams/):

| # | Diagrama |
|---|---|
| [01](./docs/diagrams/01-clean-architecture-layers.md) | Camadas da Clean Architecture |
| [02](./docs/diagrams/02-vehicle-usage-creation-flow.md) | Fluxo de criação de utilização de veículo |
| [03](./docs/diagrams/03-vehicle-usage-finish-flow.md) | Fluxo de finalização de utilização |
| [04](./docs/diagrams/04-business-rules-availability-conflicts.md) | Regras de negócio — conflitos de disponibilidade |
| [05](./docs/diagrams/005-vehicle-crud-flow.md) | Fluxo CRUD de veículos |
| [06](./docs/diagrams/006-driver-crud-flow.md) | Fluxo CRUD de motoristas |
| [07](./docs/diagrams/007-full-usage-lifecycle.md) | Ciclo de vida completo de uma utilização |

---

## 🛠️ Ferramentas Utilizadas

- [Node.js 24](https://nodejs.org/) — runtime
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [Express](https://expressjs.com/) — framework HTTP
- [TSyringe](https://github.com/microsoft/tsyringe) — injeção de dependência
- [Zod](https://zod.dev/) — validação de schemas em runtime
- [tsx](https://github.com/privatenumber/tsx) — execução de TypeScript sem compilação
- [Jest](https://jestjs.io/) + [Fishery](https://github.com/thoughtbot/fishery) — testes com factories
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — qualidade e formatação de código
- [Docker](https://www.docker.com/) + [docker-compose](https://docs.docker.com/compose/) — containerização
- [VSCode](https://code.visualstudio.com/) — editor
- [Claude Code](https://claude.ai/claude-code) (Claude Sonnet 4.6) — responsável pela documentação, tradução e validador das ADRs

---

## 📚 Referências

- [Architecture Decision Records — Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — formato de ADR utilizado no projeto
- [Clean Architecture — Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) — modelo de camadas adotado
- [Mocks Aren't Stubs — Martin Fowler](https://martinfowler.com/articles/mocksArentStubs.html) — fundamentação para uso de fakes nos testes
