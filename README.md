# TechControl

Aplicação web para cadastro e acompanhamento de equipamentos de TI. Projeto de portfólio e aprendizado em desenvolvimento Full Stack.

## Funcionalidades (versão 0.1)

- Cadastrar, listar, editar e excluir equipamentos
- Buscar por nome, tipo, patrimônio ou sistema operacional
- Filtrar por situação (em uso, disponível ou manutenção)
- Visualizar indicadores resumidos
- Validar campos obrigatórios e impedir patrimônios duplicados

## Tecnologias

Java 21+, Spring Boot 3.5, Spring Data JPA, PostgreSQL 16, HTML, CSS e JavaScript.

## Como executar

Pré-requisitos: Java 21 ou superior, Maven 3.9+ e Docker Desktop.

1. Inicie o banco de dados na pasta do projeto:

   ```bash
   docker compose up -d
   ```

2. Execute a aplicação:

   ```bash
   mvn spring-boot:run
   ```

3. Abra **http://localhost:8080** no navegador.

> Se a porta 5432 já estiver ocupada por outro PostgreSQL, pare o serviço conflitante ou ajuste a porta do `compose.yaml` e a variável `DB_URL`.

## API REST

| Método | Rota | Função |
|---|---|---|
| GET | `/api/equipamentos` | Listar |
| GET | `/api/equipamentos/{id}` | Buscar |
| POST | `/api/equipamentos` | Cadastrar |
| PUT | `/api/equipamentos/{id}` | Atualizar |
| DELETE | `/api/equipamentos/{id}` | Excluir |

Exemplo de JSON para POST:

```json
{
  "nome": "NB-TI-01",
  "tipo": "Notebook",
  "patrimonio": "PAT-001",
  "sistemaOperacional": "Windows 11",
  "situacao": "EM_USO",
  "observacoes": "Equipamento de demonstração"
}
```

## Observações

- Projeto de demonstração local: não há autenticação, autorização ou histórico de auditoria.
- O esquema é criado/atualizado automaticamente com `ddl-auto=update`, adequado apenas para desenvolvimento. Para produção, usar migrações versionadas (Flyway).
- Não inserir dados reais ou confidenciais de clientes.
- A senha do `compose.yaml` é **somente para desenvolvimento local**.
- A execução ainda deve ser validada em um ambiente com Java, Maven e Docker disponíveis.

## Próximos passos

- Testes automatizados e migrações com Flyway
- Cadastro e histórico de manutenções
- Autenticação e perfis de acesso
- Reconstruir o projeto do zero, estudando cada componente
