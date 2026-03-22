# ADR 002 — Persistência em memória

- **Data:** 2026-03-22
- **Status:** Aceito

## Contexto

O serviço gerencia três recursos: veículos, motoristas e utilizações de veículos. Para esta versão inicial, não há requisito de durabilidade de dados entre reinicializações, e introduzir um banco de dados adicionaria sobrecarga operacional (gerenciamento de conexão, migrações, configuração de ambiente) não justificada neste estágio.

As interfaces de repositório definidas na camada de domínio são agnósticas em relação à tecnologia, o que significa que a estratégia de persistência é um detalhe de implementação que pode ser substituído a qualquer momento sem tocar na lógica de negócio.

## Decisão

Implementei todas as interfaces de repositório usando arrays simples em memória. Cada repositório mantém sua própria coleção privada e expõe a mesma interface que uma implementação baseada em banco de dados exporia.

## Consequências

- Zero dependências de infraestrutura — o serviço roda com `npm start`, sem banco de dados
- Testes rodam inteiramente em processo, sem overhead de I/O
- Todos os dados são perdidos ao reiniciar o processo — aceitável para este estágio, não adequado para cargas de produção que exijam durabilidade
- Migrar para um armazenamento persistente (ex.: PostgreSQL, SQLite) requer apenas uma nova implementação de infra para cada interface de repositório; as camadas de domínio e aplicação permanecem intactas

## Referências

- FOWLER, M. *Repository*. Disponível em: https://martinfowler.com/eaaCatalog/repository.html — definição do padrão: mediação entre domínio e camada de mapeamento de dados através de uma interface semelhante a uma coleção
- FOWLER, M. *Patterns of Enterprise Application Architecture*. Addison-Wesley, 2002. — Capítulo 18, Repository: motivação para abstrair a persistência por trás de uma interface
