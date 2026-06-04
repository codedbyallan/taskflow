# TaskFlow

Gerenciador inteligente de tarefas desenvolvido como projeto prático de portfólio.

O objetivo do TaskFlow é consolidar fundamentos de desenvolvimento backend com .NET, criação de API REST, organização em camadas, integração com MongoDB Atlas, documentação de endpoints e preparação gradual para frontend, Docker e deploy.

---

## Objetivo

Criar uma aplicação para cadastrar, listar, editar, concluir e excluir tarefas, evoluindo de uma API simples em memória para uma aplicação fullstack com persistência real, frontend web, Docker e deploy.

Este projeto faz parte de uma trilha prática de estudos para evolução de portfólio como desenvolvedor, usando como base conceitos trabalhados no projeto acadêmico SIGA.

---

## Status do projeto

Backend funcional com CRUD completo, persistência em MongoDB Atlas, validações, documentação da API e organização em camadas.

Até o momento, o projeto possui:

- API REST criada com ASP.NET Core Web API;
- CRUD completo de tarefas;
- persistência real com MongoDB Atlas;
- arquitetura organizada em Controller, Service e Repository;
- DTOs para criação e atualização de tarefas;
- validações com DataAnnotations;
- configuração segura da connection string com User Secrets;
- documentação visual da API com Scalar;
- testes manuais organizados em arquivo `.http`.

Próximas etapas:

- criar o frontend com React + Vite;
- integrar frontend com a API;
- melhorar README com prints;
- dockerizar o backend;
- realizar deploy do backend e frontend;
- preparar versão final para portfólio.

---

## Stack utilizada

### Backend

- .NET
- ASP.NET Core Web API
- C#
- MongoDB.Driver

### Banco de dados

- MongoDB Atlas

### Documentação e testes da API

- Scalar

### Configuração e segurança em desenvolvimento

- User Secrets

### Versionamento

- Git
- GitHub

### Frontend

Ainda será desenvolvido.

Stack prevista:

- React
- Vite
- JavaScript
- CSS

### Infraestrutura prevista

- Docker
- Render

---

## Funcionalidades atuais

A API permite:

- listar todas as tarefas;
- buscar uma tarefa por ID;
- criar uma nova tarefa;
- atualizar dados de uma tarefa;
- marcar uma tarefa como concluída;
- excluir uma tarefa;
- validar campos obrigatórios;
- validar tamanho mínimo e máximo de campos;
- validar valores permitidos para prioridade;
- tratar IDs inválidos sem quebrar a aplicação.

---

## Modelo de tarefa

Cada tarefa possui os seguintes campos:

| Campo | Descrição |
|---|---|
| `id` | Identificador gerado automaticamente pelo MongoDB |
| `title` | Título da tarefa |
| `description` | Descrição opcional |
| `status` | Status da tarefa |
| `priority` | Prioridade da tarefa |
| `createdAt` | Data de criação |
| `updatedAt` | Data da última atualização |

### Status disponíveis

| Status | Descrição |
|---|---|
| `pending` | Tarefa pendente |
| `completed` | Tarefa concluída |

### Prioridades disponíveis

| Prioridade | Descrição |
|---|---|
| `low` | Baixa prioridade |
| `medium` | Prioridade média |
| `high` | Alta prioridade |

---

## Arquitetura atual

O backend segue uma organização simples em camadas:

```text
Controller → Service → Repository → MongoDB Atlas
```

### Controller

Responsável por receber as requisições HTTP e retornar respostas adequadas, como:

- `200 OK`;
- `201 Created`;
- `204 No Content`;
- `400 Bad Request`;
- `404 Not Found`.

### Service

Responsável pelas regras de negócio da aplicação, como:

- validar criação de tarefas;
- definir status inicial;
- definir prioridade padrão;
- preservar dados existentes em atualizações parciais;
- atualizar datas de modificação;
- coordenar chamadas ao repository.

### Repository

Responsável pelo acesso aos dados no MongoDB Atlas, incluindo:

- listagem;
- busca por ID;
- criação;
- atualização;
- exclusão;
- tratamento de IDs inválidos.

---

## Decisões técnicas

- A API foi organizada em camadas para separar responsabilidades entre Controller, Service e Repository.
- Foram utilizados DTOs para controlar os dados recebidos nas requisições de criação e atualização, evitando expor diretamente o model da aplicação.
- O MongoDB Atlas foi escolhido para praticar persistência NoSQL em ambiente de nuvem.
- O User Secrets foi utilizado para evitar que dados sensíveis fossem salvos no repositório.
- O Scalar foi adotado para facilitar a visualização e o teste dos endpoints durante o desenvolvimento.

---

## Estrutura do projeto

```text
taskflow/
├── backend/
│   └── TaskFlow/
│       ├── TaskFlow.slnx
│       └── TaskFlow.Api/
│           ├── Controllers/
│           │   └── TasksController.cs
│           ├── DTOs/
│           │   ├── CreateTaskDto.cs
│           │   └── UpdateTaskDto.cs
│           ├── Models/
│           │   └── TaskItem.cs
│           ├── Repositories/
│           │   └── TaskRepository.cs
│           ├── Services/
│           │   └── TaskService.cs
│           ├── Settings/
│           │   └── MongoDbSettings.cs
│           ├── Properties/
│           │   └── launchSettings.json
│           ├── Program.cs
│           ├── appsettings.json
│           ├── appsettings.Development.json
│           └── TaskFlow.Api.http
├── frontend/
├── docs/
│   └── prints/
├── README.md
└── .gitignore
```

---

## Endpoints da API

Base local da API:

```text
https://localhost:7064
```

### Listar tarefas

```http
GET /api/tasks
```

Retorna todas as tarefas cadastradas.

---

### Buscar tarefa por ID

```http
GET /api/tasks/{id}
```

Retorna uma tarefa específica pelo ID.

Possíveis respostas:

| Status | Descrição |
|---|---|
| `200 OK` | Tarefa encontrada |
| `404 Not Found` | Tarefa não encontrada ou ID inválido |

---

### Criar tarefa

```http
POST /api/tasks
```

Exemplo de body:

```json
{
  "title": "Estudar validações",
  "description": "Validando CreateTaskDto com DataAnnotations",
  "priority": "medium"
}
```

Possíveis respostas:

| Status | Descrição |
|---|---|
| `201 Created` | Tarefa criada com sucesso |
| `400 Bad Request` | Dados inválidos |

---

### Atualizar tarefa

```http
PUT /api/tasks/{id}
```

Exemplo de body:

```json
{
  "title": "Tarefa atualizada",
  "description": "Descrição atualizada",
  "priority": "high"
}
```

Neste projeto, o endpoint `PUT /api/tasks/{id}` foi implementado aceitando atualização parcial de campos permitidos, como apenas a prioridade:

```json
{
  "priority": "high"
}
```

Possíveis respostas:

| Status | Descrição |
|---|---|
| `200 OK` | Tarefa atualizada com sucesso |
| `400 Bad Request` | Dados inválidos |
| `404 Not Found` | Tarefa não encontrada ou ID inválido |

---

### Concluir tarefa

```http
PATCH /api/tasks/{id}/complete
```

Marca uma tarefa como concluída.

Possíveis respostas:

| Status | Descrição |
|---|---|
| `200 OK` | Tarefa concluída com sucesso |
| `404 Not Found` | Tarefa não encontrada ou ID inválido |

---

### Excluir tarefa

```http
DELETE /api/tasks/{id}
```

Remove uma tarefa.

Possíveis respostas:

| Status | Descrição |
|---|---|
| `204 No Content` | Tarefa excluída com sucesso |
| `404 Not Found` | Tarefa não encontrada ou ID inválido |

---

## Validações implementadas

### Criação de tarefa

O campo `title` é obrigatório.

Regras aplicadas:

- título obrigatório;
- título com no mínimo 3 caracteres;
- título com no máximo 100 caracteres;
- descrição com no máximo 500 caracteres;
- prioridade permitida apenas como `low`, `medium` ou `high`.

### Atualização de tarefa

Na atualização, os campos são opcionais para permitir alteração parcial.

Regras aplicadas:

- se enviado, o título deve ter no mínimo 3 caracteres;
- se enviado, o título deve ter no máximo 100 caracteres;
- se enviada, a descrição deve ter no máximo 500 caracteres;
- se enviada, a prioridade deve ser `low`, `medium` ou `high`.

---

## Configuração do MongoDB

O projeto utiliza MongoDB Atlas como banco de dados.

Configuração esperada:

```json
{
  "MongoDbSettings": {
    "ConnectionString": "",
    "DatabaseName": "taskflow_db",
    "TasksCollectionName": "tasks"
  }
}
```

A connection string real não deve ser salva no repositório.

Para desenvolvimento local, a connection string deve ser configurada com User Secrets:

```powershell
cd backend/TaskFlow/TaskFlow.Api

dotnet user-secrets init

dotnet user-secrets set "MongoDbSettings:ConnectionString" "MINHA_CONNECTION_STRING_DO_MONGODB"

dotnet user-secrets set "MongoDbSettings:DatabaseName" "taskflow_db"

dotnet user-secrets set "MongoDbSettings:TasksCollectionName" "tasks"
```

Para conferir os valores configurados localmente:

```powershell
dotnet user-secrets list
```

---

## Como rodar o backend localmente

### Pré-requisitos

- .NET instalado;
- MongoDB Atlas configurado;
- connection string salva em User Secrets;
- Visual Studio ou VS Code.

### Rodando pelo Visual Studio

1. Abra a solution:

```text
backend/TaskFlow/TaskFlow.slnx
```

2. Defina `TaskFlow.Api` como projeto de inicialização.

3. Execute o projeto.

A API será iniciada em ambiente local. Caso configurado no `launchSettings.json`, o Scalar poderá abrir automaticamente no navegador.

### Rodando pelo terminal

Entre na pasta da API:

```powershell
cd backend/TaskFlow/TaskFlow.Api
```

Execute:

```powershell
dotnet run
```

---

## Documentação da API

A API possui documentação visual com Scalar.

Com a aplicação rodando, acesse:

```text
https://localhost:7064/scalar
```

Também é possível acessar o documento OpenAPI em:

```text
https://localhost:7064/openapi/v1.json
```

---

## Testes manuais

O projeto possui um arquivo `.http` para testes manuais da API:

```text
backend/TaskFlow/TaskFlow.Api/TaskFlow.Api.http
```

Esse arquivo contém requisições para:

- listar tarefas;
- criar tarefa válida;
- criar tarefa inválida;
- buscar tarefa por ID;
- atualizar tarefa;
- concluir tarefa;
- excluir tarefa;
- testar ID inválido;
- testar ObjectId válido inexistente.

---

## Segurança

A connection string do MongoDB não é salva no repositório.

Ela deve ser configurada localmente usando User Secrets durante o desenvolvimento.

Em ambiente de deploy, a connection string deverá ser configurada por variável de ambiente.

---

## Roadmap

### Backend

- [x] Criar API ASP.NET Core
- [x] Criar model de tarefa
- [x] Criar DTOs
- [x] Criar controller de tarefas
- [x] Criar service
- [x] Criar repository
- [x] Integrar com MongoDB Atlas
- [x] Implementar CRUD persistente
- [x] Adicionar validações
- [x] Adicionar Scalar
- [ ] Melhorar tratamento global de erros
- [ ] Criar testes automatizados

### Frontend

- [ ] Criar projeto React + Vite
- [ ] Criar layout inicial
- [ ] Listar tarefas
- [ ] Criar tarefa
- [ ] Atualizar tarefa
- [ ] Concluir tarefa
- [ ] Excluir tarefa
- [ ] Integrar com API

### Infraestrutura

- [ ] Dockerizar backend
- [ ] Configurar deploy do backend
- [ ] Configurar deploy do frontend
- [ ] Atualizar README com links publicados
- [ ] Adicionar prints finais em `docs/prints`

---

## Aprendizados aplicados

Neste projeto foram praticados conceitos como:

- criação de API REST com ASP.NET Core;
- uso de controllers;
- separação entre Model, DTO, Service e Repository;
- persistência com MongoDB Atlas;
- configuração segura com User Secrets;
- validações com DataAnnotations;
- documentação com Scalar;
- testes manuais com arquivo `.http`;
- versionamento com Git e GitHub.

---

## Status atual

O backend está funcional, com CRUD completo, persistência em MongoDB Atlas, validações, documentação via Scalar e testes manuais organizados.

As próximas etapas serão a criação do frontend, a dockerização e o deploy da aplicação.