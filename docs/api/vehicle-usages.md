# Utilizações de Veículo

## Entidade

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `string (UUID)` | Identificador único gerado automaticamente |
| `vehicle` | `Vehicle` | Veículo utilizado (objeto completo) |
| `driver` | `Driver` | Motorista responsável (objeto completo) |
| `reason` | `string` | Motivo da utilização |
| `startDate` | `string (ISO 8601)` | Data e hora de início — definida automaticamente no momento da criação |
| `endDate` | `string (ISO 8601) \| null` | Data e hora de término — `null` enquanto a utilização estiver ativa |
| `createdAt` | `string (ISO 8601)` | Data de criação do registro |
| `updatedAt` | `string (ISO 8601)` | Data da última atualização |

---

## Regras de Negócio

- Um veículo **não pode ser utilizado por mais de um motorista ao mesmo tempo**. Tentativas de criar uma utilização com um veículo já ativo retornam `409 Conflict`.
- Um motorista **não pode conduzir mais de um veículo simultaneamente**. Tentativas de criar uma utilização com um motorista já ativo retornam `409 Conflict`.
- Uma utilização **já finalizada não pode ser finalizada novamente**. A tentativa retorna `422 Unprocessable Content`.

---

## Endpoints

### POST /api/vehicle-usages
Registra o início de uma utilização, associando um motorista a um veículo. O campo `startDate` é definido automaticamente com o timestamp da requisição.

**Body**
```json
{
  "vehicleId": "117789b7-79d4-4e55-bd9e-b5e214bca9f6",
  "driverId": "c9e4a2b1-5678-4def-9abc-000000000002",
  "reason": "Visita a cliente"
}
```

| Campo | Tipo | Obrigatório |
|---|---|---|
| `vehicleId` | `string (UUID)` | Sim |
| `driverId` | `string (UUID)` | Sim |
| `reason` | `string` | Sim |

**Respostas**

`201 Created`
```json
{
  "id": "a3c2f1d0-1234-4abc-8def-000000000001",
  "vehicleId": "117789b7-79d4-4e55-bd9e-b5e214bca9f6",
  "driverId": "c9e4a2b1-5678-4def-9abc-000000000002",
  "reason": "Visita a cliente",
  "startDate": "2026-03-22T17:00:00.000Z",
  "endDate": null
}
```

`400 Bad Request` — corpo inválido ou campo obrigatório ausente

`404 Not Found` — veículo ou motorista não encontrado
```json
{
  "name": "NotFound",
  "message": "Vehicle with id 117789b7-79d4-4e55-bd9e-b5e214bca9f6 not found",
  "errorCode": "VEHICLE_NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2026-03-22T17:00:00.000Z"
}
```

`409 Conflict` — veículo já em uso
```json
{
  "name": "Conflict",
  "message": "Vehicle with id 117789b7-79d4-4e55-bd9e-b5e214bca9f6 is already in use",
  "errorCode": "VEHICLE_ALREADY_IN_USE",
  "statusCode": 409,
  "timestamp": "2026-03-22T17:05:00.000Z"
}
```

`409 Conflict` — motorista já conduzindo outro veículo
```json
{
  "name": "Conflict",
  "message": "Driver with id c9e4a2b1-5678-4def-9abc-000000000002 is already using a vehicle",
  "errorCode": "DRIVER_ALREADY_IN_USE",
  "statusCode": 409,
  "timestamp": "2026-03-22T17:05:00.000Z"
}
```

---

### GET /api/vehicle-usages
Lista todos os registros de utilização cadastrados, incluindo os dados completos do veículo e do motorista.

**Respostas**

`200 OK`
```json
[
  {
    "id": "a3c2f1d0-1234-4abc-8def-000000000001",
    "vehicle": {
      "id": "117789b7-79d4-4e55-bd9e-b5e214bca9f6",
      "plate": "ABC1234",
      "color": "Vermelho",
      "brand": "Toyota"
    },
    "driver": {
      "id": "c9e4a2b1-5678-4def-9abc-000000000002",
      "name": "Gabriel Santos"
    },
    "reason": "Visita a cliente",
    "startDate": "2026-03-22T17:00:00.000Z",
    "endDate": null
  }
]
```

> Retorna um array vazio `[]` quando não há registros cadastrados.

---

### PATCH /api/vehicle-usages/:id/finish
Finaliza uma utilização ativa, registrando o `endDate` com o timestamp da requisição. Após finalizada, a utilização não pode ser finalizada novamente.

**Respostas**

`200 OK`
```json
{
  "id": "a3c2f1d0-1234-4abc-8def-000000000001",
  "vehicleId": "117789b7-79d4-4e55-bd9e-b5e214bca9f6",
  "driverId": "c9e4a2b1-5678-4def-9abc-000000000002",
  "reason": "Visita a cliente",
  "startDate": "2026-03-22T17:00:00.000Z",
  "endDate": "2026-03-22T18:30:00.000Z"
}
```

`404 Not Found` — utilização não encontrada
```json
{
  "name": "NotFound",
  "message": "Vehicle usage with id a3c2f1d0-1234-4abc-8def-000000000001 not found",
  "errorCode": "VEHICLE_USAGE_NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2026-03-22T18:00:00.000Z"
}
```

`422 Unprocessable Content` — utilização já finalizada
```json
{
  "name": "UnprocessableContent",
  "message": "Vehicle usage with id a3c2f1d0-1234-4abc-8def-000000000001 is already finished",
  "errorCode": "VEHICLE_USAGE_ALREADY_FINISHED",
  "statusCode": 422,
  "timestamp": "2026-03-22T18:00:00.000Z"
}
```

---

## Cobertura de Testes

| Caso | Coberto |
|---|---|
| Criar utilização com sucesso | ✅ |
| Rejeitar body inválido | ✅ |
| Retornar 404 quando veículo não existe | ✅ |
| Retornar 404 quando motorista não existe | ✅ |
| Retornar 409 quando veículo já está em uso | ✅ |
| Retornar 409 quando motorista já está em uso | ✅ |
| Listar utilizações com sucesso | ✅ |
| Finalizar utilização com sucesso | ✅ |
| Retornar 404 ao finalizar utilização inexistente | ✅ |
| Retornar 422 ao finalizar utilização já encerrada | ✅ |
