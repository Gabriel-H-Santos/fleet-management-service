# Veículos

## Entidade

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `string (UUID)` | Identificador único gerado automaticamente |
| `plate` | `string` | Placa do veículo — deve ser única no sistema |
| `color` | `string` | Cor do veículo |
| `brand` | `string` | Marca do veículo |
| `createdAt` | `string (ISO 8601)` | Data de criação do registro |
| `updatedAt` | `string (ISO 8601)` | Data da última atualização |

---

## Endpoints

### POST /api/vehicles
Cadastra um novo veículo. A placa deve ser única — tentativas de cadastro com placa já existente retornam `409 Conflict`.

**Body**
```json
{
  "plate": "ABC1234",
  "color": "Vermelho",
  "brand": "Toyota"
}
```

| Campo | Tipo | Obrigatório |
|---|---|---|
| `plate` | `string` | Sim |
| `color` | `string` | Sim |
| `brand` | `string` | Sim |

**Respostas**

`201 Created`
```json
{
  "id": "117789b7-79d4-4e55-bd9e-b5e214bca9f6",
  "plate": "ABC1234",
  "color": "Vermelho",
  "brand": "Toyota",
  "createdAt": "2026-03-22T16:17:19.074Z"
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

`409 Conflict` — placa já cadastrada
```json
{
  "name": "Conflict",
  "message": "Vehicle with plate ABC1234 already exists",
  "errorCode": "VEHICLE_PLATE_CONFLICT",
  "statusCode": 409,
  "timestamp": "2026-03-22T16:34:43.907Z"
}
```

---

### GET /api/vehicles
Lista todos os veículos cadastrados. Suporta filtros opcionais por `color` e `brand` via query string (busca parcial, sem distinção de maiúsculas/minúsculas).

**Query Parameters**

| Parâmetro | Tipo | Obrigatório | Exemplo |
|---|---|---|---|
| `color` | `string` | Não | `?color=Vermelho` |
| `brand` | `string` | Não | `?brand=Toyota` |

**Respostas**

`200 OK`
```json
[
  {
    "id": "117789b7-79d4-4e55-bd9e-b5e214bca9f6",
    "plate": "ABC1234",
    "color": "Vermelho",
    "brand": "Toyota",
    "createdAt": "2026-03-22T16:17:19.074Z",
    "updatedAt": "2026-03-22T16:17:19.074Z"
  }
]
```

> Retorna um array vazio `[]` quando não há veículos cadastrados ou nenhum corresponde aos filtros.

---

### GET /api/vehicles/:id
Retorna um único veículo pelo seu identificador.

**Respostas**

`200 OK`
```json
{
  "id": "117789b7-79d4-4e55-bd9e-b5e214bca9f6",
  "plate": "ABC1234",
  "color": "Vermelho",
  "brand": "Toyota",
  "createdAt": "2026-03-22T16:17:19.074Z",
  "updatedAt": "2026-03-22T16:17:19.074Z"
}
```

`404 Not Found`
```json
{
  "name": "NotFound",
  "message": "Vehicle with id 117789b7-79d4-4e55-bd9e-b5e214bca9f6 not found",
  "errorCode": "VEHICLE_NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2026-03-22T16:00:00.000Z"
}
```

---

### PATCH /api/vehicles/:id
Atualiza parcialmente um veículo. Todos os campos são opcionais. Ao alterar a placa, o sistema verifica unicidade — se outro veículo já utiliza a nova placa, retorna `409 Conflict`.

**Body**
```json
{
  "plate": "XYZ9876",
  "color": "Azul"
}
```

| Campo | Tipo | Obrigatório |
|---|---|---|
| `plate` | `string` | Não |
| `color` | `string` | Não |
| `brand` | `string` | Não |

**Respostas**

`200 OK`
```json
{
  "id": "117789b7-79d4-4e55-bd9e-b5e214bca9f6",
  "plate": "XYZ9876",
  "color": "Azul",
  "brand": "Toyota",
  "updatedAt": "2026-03-22T17:00:00.000Z"
}
```

`404 Not Found` — veículo não encontrado

`409 Conflict` — nova placa já pertence a outro veículo

---

### DELETE /api/vehicles/:id
Remove um veículo do sistema. Retorna `404` se o veículo não existir.

**Respostas**

`204 No Content` — removido com sucesso (sem corpo)

`404 Not Found`
```json
{
  "name": "NotFound",
  "message": "Vehicle with id 117789b7-79d4-4e55-bd9e-b5e214bca9f6 not found",
  "errorCode": "VEHICLE_NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2026-03-22T16:00:00.000Z"
}
```

---

## Cobertura de Testes

| Caso | Coberto |
|---|---|
| Criar veículo com sucesso | ✅ |
| Rejeitar placa duplicada na criação | ✅ |
| Rejeitar body inválido | ✅ |
| Listar veículos sem filtros | ✅ |
| Listar veículos com filtro por cor | ✅ |
| Listar veículos com filtro por marca | ✅ |
| Buscar veículo por ID | ✅ |
| Retornar 404 para veículo inexistente | ✅ |
| Atualizar veículo com sucesso | ✅ |
| Rejeitar placa duplicada na atualização | ✅ |
| Retornar 404 ao atualizar veículo inexistente | ✅ |
| Remover veículo com sucesso | ✅ |
| Retornar 404 ao remover veículo inexistente | ✅ |
