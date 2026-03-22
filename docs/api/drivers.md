# Motoristas

## Entidade

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `string (UUID)` | Identificador único gerado automaticamente |
| `name` | `string` | Nome do motorista |
| `createdAt` | `string (ISO 8601)` | Data de criação do registro |
| `updatedAt` | `string (ISO 8601)` | Data da última atualização |

---

## Endpoints

### POST /api/drivers
Cadastra um novo motorista.

**Body**
```json
{
  "name": "Gabriel Santos"
}
```

| Campo | Tipo | Obrigatório |
|---|---|---|
| `name` | `string` | Sim |

**Respostas**

`201 Created`
```json
{
  "id": "c9e4a2b1-5678-4def-9abc-000000000002",
  "name": "Gabriel Santos",
  "createdAt": "2026-03-22T16:20:00.000Z"
}
```

`400 Bad Request` — corpo inválido ou campo obrigatório ausente
```json
{
  "name": "BadRequest",
  "message": "Validation error",
  "errorCode": "VALIDATION_ERROR",
  "statusCode": 400,
  "timestamp": "2026-03-22T16:00:00.000Z"
}
```

---

### GET /api/drivers
Lista todos os motoristas cadastrados. Suporta filtro opcional por `name` via query string (busca parcial, sem distinção de maiúsculas/minúsculas).

**Query Parameters**

| Parâmetro | Tipo | Obrigatório | Exemplo |
|---|---|---|---|
| `name` | `string` | Não | `?name=Gabriel` |

**Respostas**

`200 OK`
```json
[
  {
    "id": "c9e4a2b1-5678-4def-9abc-000000000002",
    "name": "Gabriel Santos",
    "createdAt": "2026-03-22T16:20:00.000Z",
    "updatedAt": "2026-03-22T16:20:00.000Z"
  }
]
```

> Retorna um array vazio `[]` quando não há motoristas cadastrados ou nenhum corresponde ao filtro.

---

### GET /api/drivers/:id
Retorna um único motorista pelo seu identificador.

**Respostas**

`200 OK`
```json
{
  "id": "c9e4a2b1-5678-4def-9abc-000000000002",
  "name": "Gabriel Santos",
  "createdAt": "2026-03-22T16:20:00.000Z",
  "updatedAt": "2026-03-22T16:20:00.000Z"
}
```

`404 Not Found`
```json
{
  "name": "NotFound",
  "message": "Driver with id c9e4a2b1-5678-4def-9abc-000000000002 not found",
  "errorCode": "DRIVER_NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2026-03-22T16:00:00.000Z"
}
```

---

### PATCH /api/drivers/:id
Atualiza parcialmente um motorista. O campo `name` é o único campo atualizável.

**Body**
```json
{
  "name": "Gabriel H. Santos"
}
```

| Campo | Tipo | Obrigatório |
|---|---|---|
| `name` | `string` | Não |

**Respostas**

`200 OK`
```json
{
  "id": "c9e4a2b1-5678-4def-9abc-000000000002",
  "name": "Gabriel H. Santos",
  "updatedAt": "2026-03-22T17:30:00.000Z"
}
```

`400 Bad Request` — body inválido

`404 Not Found` — motorista não encontrado

---

### DELETE /api/drivers/:id
Remove um motorista do sistema. Retorna `404` se o motorista não existir.

**Respostas**

`204 No Content` — removido com sucesso (sem corpo)

`404 Not Found`
```json
{
  "name": "NotFound",
  "message": "Driver with id c9e4a2b1-5678-4def-9abc-000000000002 not found",
  "errorCode": "DRIVER_NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2026-03-22T16:00:00.000Z"
}
```

---

## Cobertura de Testes

| Caso | Coberto |
|---|---|
| Criar motorista com sucesso | ✅ |
| Rejeitar body inválido na criação | ✅ |
| Listar motoristas sem filtro | ✅ |
| Listar motoristas com filtro por nome | ✅ |
| Buscar motorista por ID | ✅ |
| Retornar 404 para motorista inexistente | ✅ |
| Atualizar motorista com sucesso | ✅ |
| Retornar 404 ao atualizar motorista inexistente | ✅ |
| Remover motorista com sucesso | ✅ |
| Retornar 404 ao remover motorista inexistente | ✅ |
