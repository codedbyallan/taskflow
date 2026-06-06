# TaskFlow

Gerenciador inteligente de tarefas desenvolvido como projeto prático de portfólio.

O TaskFlow é uma aplicação fullstack para organização de tarefas, construída com backend em ASP.NET Core Web API, banco de dados MongoDB Atlas e frontend em React com Vite. O projeto começou como um CRUD simples e evoluiu para um painel visual moderno com vencimento de tarefas, busca, filtros, agrupamento por prazo e indicadores de urgência.

---

## Objetivo

Criar uma aplicação web para cadastrar, listar, editar, concluir, excluir e organizar tarefas de forma prática, evoluindo gradualmente de uma API simples para uma solução fullstack com persistência real, interface moderna, documentação técnica, testes, Docker e deploy.

Este projeto faz parte de uma trilha prática de estudos para evolução de portfólio como desenvolvedor, consolidando conceitos aplicados no projeto acadêmico SIGA e expandindo a prática com uma aplicação menor, controlada e bem documentada.

---

## Status do projeto

Projeto em fase de **MVP robusto local**.

Até o momento, o TaskFlow possui:

- backend funcional em ASP.NET Core Web API;
- CRUD completo de tarefas;
- persistência real com MongoDB Atlas;
- arquitetura em camadas: Controller, Service e Repository;
- DTOs para criação e atualização de tarefas;
- validações com DataAnnotations;
- documentação visual da API com Scalar;
- configuração segura da connection string com User Secrets;
- frontend React + Vite integrado com a API;
- layout moderno com sidebar, hero visual, cards de resumo e assets próprios;
- criação, edição, conclusão e exclusão de tarefas pelo frontend;
- data de vencimento opcional para tarefas;
- indicadores visuais de prazo: atrasada, hoje, amanhã, próximos dias, futura e concluída;
- busca por título e descrição;
- filtros rápidos por status e prazo;
- agrupamento de tarefas por prazo;
- ordenação por vencimento e prioridade;
- build de produção do frontend validado.

Próximas etapas planejadas para fechamento do projeto:

- atualizar documentação técnica com prints;
- adicionar testes automatizados;
- dockerizar backend e frontend;
- realizar deploy do backend;
- realizar deploy do frontend;
- atualizar README final com links publicados, prints e instruções completas.

---

## Stack utilizada

### Backend

- .NET
- ASP.NET Core Web API
- C#
- MongoDB.Driver
- Scalar
- User Secrets

### Banco de dados

- MongoDB Atlas

### Frontend

- React
- Vite
- JavaScript
- CSS
- Lucide React

### Versionamento

- Git
- GitHub

### Infraestrutura prevista

- Docker
- Render ou serviço equivalente para deploy do backend
- Render, Vercel ou Netlify para deploy do frontend

---

## Funcionalidades atuais

### Backend

A API permite:

- listar todas as tarefas;
- buscar uma tarefa por ID;
- criar uma nova tarefa;
- atualizar dados de uma tarefa;
- marcar uma tarefa como concluída;
- excluir uma tarefa;
- salvar data de vencimento opcional;
- validar campos obrigatórios;
- validar tamanho mínimo e máximo de campos;
- validar valores permitidos para prioridade;
- tratar IDs inválidos sem quebrar a aplicação.

### Frontend

A interface permite:

- visualizar tarefas cadastradas no MongoDB;
- criar tarefas com título, descrição, prioridade e vencimento;
- editar título, descrição, prioridade e vencimento;
- concluir tarefas pendentes;
- excluir tarefas;
- buscar tarefas por título ou descrição;
- filtrar tarefas por:
  - todas;
  - pendentes;
  - concluídas;
  - atrasadas;
  - hoje;
  - próximas;
  - sem prazo;
- visualizar tarefas agrupadas por:
  - atrasadas;
  - hoje;
  - próximas;
  - futuras;
  - sem prazo;
  - concluídas;
- visualizar indicadores visuais de vencimento;
- visualizar cards de resumo com total, pendentes e concluídas;
- navegar em uma interface visual com sidebar e layout de dashboard.

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
| `dueDate` | Data de vencimento opcional |
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

### Backend

O backend segue uma organização simples em camadas:

```text
Controller → Service → Repository → MongoDB Atlas
```

#### Controller

Responsável por receber as requisições HTTP e retornar respostas adequadas, como:

- `200 OK`;
- `201 Created`;
- `204 No Content`;
- `400 Bad Request`;
- `404 Not Found`.

#### Service

Responsável pelas regras de negócio da aplicação, como:

- validar criação de tarefas;
- definir status inicial;
- definir prioridade padrão;
- preservar dados existentes em atualizações;
- atualizar datas de modificação;
- salvar e atualizar data de vencimento;
- coordenar chamadas ao repository.

#### Repository

Responsável pelo acesso aos dados no MongoDB Atlas, incluindo:

- listagem;
- busca por ID;
- criação;
- atualização;
- exclusão;
- tratamento de IDs inválidos.

### Frontend

O frontend foi organizado em componentes:

```text
App.jsx
├── Sidebar
├── Header
├── SummaryCards
├── TaskFilters
├── TaskForm
└── TaskList
    └── TaskCard
```

O `App.jsx` concentra os estados principais, chamadas aos services e funções de manipulação. Os componentes cuidam da renderização visual e recebem dados/funções por props.

---

## Decisões técnicas

- A API foi organizada em camadas para separar responsabilidades entre Controller, Service e Repository.
- Foram utilizados DTOs para controlar os dados recebidos nas requisições de criação e atualização, evitando expor diretamente o model da aplicação.
- O MongoDB Atlas foi escolhido para praticar persistência NoSQL em ambiente de nuvem.
- O User Secrets foi utilizado para evitar que dados sensíveis fossem salvos no repositório.
- O Scalar foi adotado para facilitar a visualização e o teste dos endpoints durante o desenvolvimento.
- O frontend foi criado com React + Vite para manter o projeto leve, rápido e adequado ao aprendizado gradual.
- A URL da API no frontend foi configurada via `.env`, usando `VITE_API_BASE_URL`.
- O layout foi refatorado em componentes para reduzir a complexidade do `App.jsx`.
- Os filtros e agrupamentos foram feitos inicialmente no frontend para manter a API simples nesta fase do projeto.
- Tarefas concluídas não exibem botão de edição, preservando a ideia de registro finalizado.
- O campo `dueDate` é opcional, permitindo tarefas com ou sem prazo.

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
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskFilters.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── services/
│   │   │   └── taskService.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
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
  "title": "Estudar React",
  "description": "Praticar componentes e props",
  "priority": "high",
  "dueDate": "2026-06-10"
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
  "priority": "medium",
  "dueDate": "2026-06-15"
}
```

Neste projeto, o endpoint `PUT /api/tasks/{id}` foi implementado aceitando atualização parcial de campos permitidos.

Exemplo alterando apenas a prioridade:

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
- prioridade permitida apenas como `low`, `medium` ou `high`;
- data de vencimento opcional.

### Atualização de tarefa

Na atualização, os campos são opcionais para permitir alteração parcial.

Regras aplicadas:

- se enviado, o título deve ter no mínimo 3 caracteres;
- se enviado, o título deve ter no máximo 100 caracteres;
- se enviada, a descrição deve ter no máximo 500 caracteres;
- se enviada, a prioridade deve ser `low`, `medium` ou `high`;
- se enviada, a data de vencimento é atualizada;
- se a data de vencimento não for enviada, o valor anterior é preservado.

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

## Configuração do frontend

O frontend utiliza variável de ambiente para definir a URL da API.

Arquivo esperado:

```text
frontend/.env
```

Exemplo:

```env
VITE_API_BASE_URL=https://localhost:7064
```

Também existe o arquivo de exemplo:

```text
frontend/.env.example
```

O `.env` real não deve ser salvo no repositório.

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

## Como rodar o frontend localmente

### Pré-requisitos

- Node.js instalado;
- npm instalado;
- backend rodando localmente;
- arquivo `.env` configurado em `frontend/.env`.

Entre na pasta do frontend:

```powershell
cd frontend
```

Instale as dependências:

```powershell
npm install
```

Execute o frontend em modo desenvolvimento:

```powershell
npm run dev
```

A aplicação será iniciada normalmente em:

```text
http://localhost:5173
```

---

## Build do frontend

Para gerar a versão de produção do frontend:

```powershell
cd frontend

npm run build
```

O Vite gera a pasta:

```text
frontend/dist/
```

Essa pasta não deve ser versionada no Git.

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
- criar tarefa com data de vencimento;
- buscar tarefa por ID;
- atualizar tarefa;
- concluir tarefa;
- excluir tarefa;
- testar ID inválido;
- testar ObjectId válido inexistente.

Além disso, os fluxos do frontend foram testados manualmente:

- listagem de tarefas;
- criação de tarefa;
- criação com e sem vencimento;
- edição de tarefa;
- edição de vencimento;
- conclusão de tarefa;
- exclusão de tarefa;
- busca;
- filtros;
- agrupamento por prazo;
- ordenação por prazo e prioridade;
- build de produção com `npm run build`.

---

## Segurança

A connection string do MongoDB não é salva no repositório.

Ela deve ser configurada localmente usando User Secrets durante o desenvolvimento.

Em ambiente de deploy, a connection string deverá ser configurada por variável de ambiente.

O frontend também utiliza variável de ambiente para configurar a URL da API.

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
- [x] Adicionar campo de vencimento
- [x] Adicionar Scalar
- [ ] Melhorar tratamento global de erros
- [ ] Criar testes automatizados

### Frontend

- [x] Criar projeto React + Vite
- [x] Criar layout inicial
- [x] Integrar frontend com API
- [x] Listar tarefas
- [x] Criar tarefa
- [x] Atualizar tarefa
- [x] Concluir tarefa
- [x] Excluir tarefa
- [x] Adicionar data de vencimento
- [x] Adicionar indicadores visuais de prazo
- [x] Adicionar busca
- [x] Adicionar filtros rápidos
- [x] Agrupar tarefas por prazo
- [x] Ordenar tarefas por prazo e prioridade
- [x] Modernizar interface visual
- [x] Validar build de produção

### Infraestrutura

- [ ] Criar testes automatizados
- [ ] Dockerizar backend
- [ ] Dockerizar frontend
- [ ] Configurar deploy do backend
- [ ] Configurar deploy do frontend
- [ ] Atualizar README final com links publicados
- [ ] Adicionar prints finais em `docs/prints`

---

## Melhorias futuras

Possíveis evoluções para próximas versões:

- autenticação de usuários;
- categorias personalizadas;
- calendário semanal ou mensal;
- notificações de vencimento;
- botão para reabrir tarefa concluída;
- dashboard com métricas avançadas;
- filtros persistidos na URL;
- paginação ou carregamento incremental;
- testes automatizados de backend;
- testes automatizados de frontend;
- Docker Compose para ambiente completo;
- deploy backend;
- deploy frontend;
- README final com prints, links publicados e instruções de produção.

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
- consumo de API no React;
- organização de frontend em componentes;
- uso de variáveis de ambiente no Vite;
- manipulação de estado no React;
- criação de filtros e busca no frontend;
- agrupamento e ordenação de listas;
- tratamento de datas no frontend;
- estilização moderna com CSS;
- uso de assets visuais;
- versionamento com Git e GitHub.

---

## Status atual

O TaskFlow possui backend funcional, frontend integrado, CRUD completo, persistência em MongoDB Atlas, layout moderno e recursos de organização por prazo.

A próxima fase será focada em qualidade e publicação:

```text
testes automatizados → Docker → deploy backend → deploy frontend → README final
```