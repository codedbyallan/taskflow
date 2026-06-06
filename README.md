# TaskFlow

Gerenciador inteligente de tarefas desenvolvido como projeto prático de portfólio.

O TaskFlow é uma aplicação fullstack para organização de tarefas, construída com **ASP.NET Core Web API**, **MongoDB Atlas** e **React com Vite**. O projeto começou como um CRUD simples e evoluiu para um painel visual moderno com vencimento de tarefas, busca, filtros, agrupamento por prazo, indicadores de urgência, testes automatizados, Docker e deploy em produção.

---

## Links do projeto

- **Frontend publicado:** https://taskflow-web-e6fr.onrender.com
- **Backend publicado:** https://taskflow-api-jkpb.onrender.com/api/tasks
- **Repositório:** https://github.com/codedbyallan/taskflow

> Observação: como o projeto está hospedado no plano gratuito do Render, a primeira requisição pode demorar alguns segundos quando o serviço estiver inativo.

---

## Preview

### Dashboard principal

![Dashboard do TaskFlow](docs/prints/01-home-dashboard.png)

### Criação de tarefa

![Formulário de criação de tarefa](docs/prints/02-criar-tarefa.png)

### Tarefas agrupadas por prazo

![Tarefas agrupadas por prazo](docs/prints/03-tarefas-agrupadas.png)

### Filtros de tarefas

![Filtros do TaskFlow](docs/prints/04-filtros.png)

### Busca de tarefas

![Busca de tarefas](docs/prints/05-busca.png)

### Edição de tarefa

![Edição de tarefa](docs/prints/06-editar-tarefa.png)

### API publicada no Render

![API publicada no Render](docs/prints/07-api-render.png)

---

## Objetivo

Criar uma aplicação web para cadastrar, listar, editar, concluir, excluir e organizar tarefas de forma prática, evoluindo gradualmente de uma API simples para uma solução fullstack com persistência real, interface moderna, documentação técnica, testes automatizados, Docker e deploy.

Este projeto faz parte de uma trilha prática de estudos para evolução de portfólio como desenvolvedor, consolidando conceitos aplicados em projetos anteriores e expandindo a prática com uma aplicação menor, controlada e bem documentada.

---

## Status do projeto

Projeto concluído como **MVP robusto publicado**.

O TaskFlow possui:

- backend funcional em ASP.NET Core Web API;
- CRUD completo de tarefas;
- persistência real com MongoDB Atlas;
- arquitetura em camadas: Controller, Service e Repository;
- interface `ITaskRepository` para desacoplamento e testes;
- DTOs para criação e atualização de tarefas;
- validações com DataAnnotations;
- documentação visual da API com Scalar em ambiente local;
- configuração segura da connection string com User Secrets e variáveis de ambiente;
- frontend React + Vite integrado com a API;
- layout moderno com sidebar, hero visual, cards de resumo e assets próprios;
- criação, edição, conclusão e exclusão de tarefas pelo frontend;
- data de vencimento opcional para tarefas;
- indicadores visuais de prazo;
- busca por título e descrição;
- filtros rápidos por status e prazo;
- agrupamento de tarefas por prazo;
- ordenação por vencimento e prioridade;
- testes automatizados no backend com xUnit;
- Dockerfile para backend;
- Dockerfile para frontend;
- Docker Compose para subir backend e frontend localmente;
- deploy do backend no Render;
- deploy do frontend no Render;
- README final com prints, links e instruções completas.

---

## Stack utilizada

### Backend

- .NET
- ASP.NET Core Web API
- C#
- MongoDB.Driver
- Scalar
- User Secrets
- xUnit

### Banco de dados

- MongoDB Atlas

### Frontend

- React
- Vite
- JavaScript
- CSS
- Lucide React

### Infraestrutura

- Docker
- Docker Compose
- Render Web Service
- Render Static Site

### Versionamento

- Git
- GitHub

---

## Funcionalidades

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
  - futuras;
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

## Arquitetura

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

#### Interface de repositório

Para permitir testes automatizados sem depender do MongoDB real, foi criada a interface `ITaskRepository`.

Fluxo em produção:

```text
TaskService → ITaskRepository → TaskRepository → MongoDB Atlas
```

Fluxo nos testes:

```text
TaskService → ITaskRepository → FakeTaskRepository
```

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

O `App.jsx` concentra os estados principais, chamadas aos services, filtros e funções de manipulação. Os componentes cuidam da renderização visual e recebem dados/funções por props.

---

## Decisões técnicas

- A API foi organizada em camadas para separar responsabilidades entre Controller, Service e Repository.
- Foram utilizados DTOs para controlar os dados recebidos nas requisições de criação e atualização, evitando expor diretamente o model da aplicação.
- O MongoDB Atlas foi escolhido para praticar persistência NoSQL em ambiente de nuvem.
- O User Secrets foi utilizado para evitar que dados sensíveis fossem salvos no repositório durante o desenvolvimento local.
- O Scalar foi adotado para facilitar a visualização e o teste dos endpoints durante o desenvolvimento.
- O frontend foi criado com React + Vite para manter o projeto leve, rápido e adequado ao aprendizado gradual.
- A URL da API no frontend foi configurada via variável de ambiente `VITE_API_BASE_URL`.
- O layout foi refatorado em componentes para reduzir a complexidade do `App.jsx`.
- Os filtros e agrupamentos foram feitos inicialmente no frontend para manter a API simples nesta fase do projeto.
- Tarefas concluídas não exibem botão de edição, preservando a ideia de registro finalizado.
- O campo `dueDate` é opcional, permitindo tarefas com ou sem prazo.
- O backend foi dockerizado para facilitar execução local e deploy.
- O frontend também possui Dockerfile com Nginx para simular uma entrega de produção em ambiente local/containerizado.
- O Docker Compose foi usado para rodar backend e frontend juntos localmente.
- O deploy foi realizado no Render, com backend como Web Service e frontend como Static Site.
- 

---

## Estrutura do projeto

```text
taskflow/
├── backend/
│   └── TaskFlow/
│       ├── TaskFlow.slnx
│       ├── TaskFlow.Api/
│       │   ├── Controllers/
│       │   │   └── TasksController.cs
│       │   ├── DTOs/
│       │   │   ├── CreateTaskDto.cs
│       │   │   └── UpdateTaskDto.cs
│       │   ├── Models/
│       │   │   └── TaskItem.cs
│       │   ├── Repositories/
│       │   │   ├── ITaskRepository.cs
│       │   │   └── TaskRepository.cs
│       │   ├── Services/
│       │   │   └── TaskService.cs
│       │   ├── Settings/
│       │   │   └── MongoDbSettings.cs
│       │   ├── Properties/
│       │   │   └── launchSettings.json
│       │   ├── Dockerfile
│       │   ├── Program.cs
│       │   ├── appsettings.json
│       │   ├── appsettings.Development.json
│       │   ├── TaskFlow.Api.csproj
│       │   └── TaskFlow.Api.http
│       └── TaskFlow.Tests/
│           ├── Fakes/
│           │   └── FakeTaskRepository.cs
│           ├── SmokeTests.cs
│           ├── TaskServiceTests.cs
│           └── TaskFlow.Tests.csproj
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
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── docs/
│   └── prints/
│       ├── extras/
│       ├── 01-home-dashboard.png
│       ├── 02-criar-tarefa.png
│       ├── 03-tarefas-agrupadas.png
│       ├── 04-filtros.png
│       ├── 05-busca.png
│       ├── 06-editar-tarefa.png
│       └── 07-api-render.png
├── docker-compose.yml
├── .env.example
├── README.md
└── .gitignore
```

---

## Endpoints da API

Base local da API:

```text
https://localhost:7064
```

Base publicada:

```text
https://taskflow-api-jkpb.onrender.com
```

### Listar tarefas

```http
GET /api/tasks
```

Retorna todas as tarefas cadastradas.

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

Exemplo para desenvolvimento local com API em HTTPS:

```env
VITE_API_BASE_URL=https://localhost:7064
```

Exemplo para Docker local:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Exemplo em produção:

```env
VITE_API_BASE_URL=https://taskflow-api-jkpb.onrender.com
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

## Docker

O projeto possui Dockerfile para backend e frontend, além de `docker-compose.yml` na raiz.

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
MONGODB_CONNECTION_STRING=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/taskflow_db?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DATABASE_NAME=taskflow_db
MONGODB_TASKS_COLLECTION_NAME=tasks
VITE_API_BASE_URL=http://localhost:8080
```

O arquivo `.env` real não deve ser versionado.

### Subir backend e frontend com Docker Compose

Na raiz do projeto:

```powershell
docker compose up --build
```

Acesse:

```text
Backend: http://localhost:8080/api/tasks
Frontend: http://localhost:3000
```

Para parar os containers:

```powershell
docker compose down
```

---

## Documentação da API

A API possui documentação visual com Scalar em ambiente de desenvolvimento.

Com a aplicação rodando localmente, acesse:

```text
https://localhost:7064/scalar
```

Também é possível acessar o documento OpenAPI em:

```text
https://localhost:7064/openapi/v1.json
```

No Docker e no Render, o Scalar pode não estar disponível se a aplicação estiver rodando como `Production`.

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
- build de produção com `npm run build`;
- funcionamento do frontend publicado no Render;
- consumo da API publicada pelo frontend publicado.

---

## Testes automatizados

O backend possui testes automatizados com xUnit.

Para executar:

```powershell
cd backend/TaskFlow

dotnet test
```

Os testes cobrem:

- execução básica do projeto de testes;
- criação de tarefa;
- criação com prioridade padrão;
- criação sem data de vencimento;
- persistência no repositório fake;
- atualização de tarefa;
- preservação de dados antigos;
- atualização de tarefa inexistente;
- conclusão de tarefa;
- conclusão de tarefa inexistente;
- exclusão de tarefa;
- exclusão de tarefa inexistente.

A estrutura de testes utiliza um `FakeTaskRepository`, evitando dependência direta do MongoDB durante os testes de regra de negócio.

---

## Deploy

### Backend

O backend foi publicado no Render como Web Service usando Docker.

Configurações principais:

```text
Runtime: Docker
Root Directory: backend/TaskFlow/TaskFlow.Api
Branch: main
PORT: 10000
ASPNETCORE_URLS: http://+:10000
ASPNETCORE_ENVIRONMENT: Production
```

Variáveis de ambiente utilizadas no Render:

```text
MongoDbSettings__ConnectionString
MongoDbSettings__DatabaseName
MongoDbSettings__TasksCollectionName
ASPNETCORE_ENVIRONMENT
ASPNETCORE_URLS
PORT
```

Endpoint publicado:

```text
https://taskflow-api-jkpb.onrender.com/api/tasks
```

### Frontend

O frontend foi publicado no Render como Static Site.

Configurações principais:

```text
Root Directory: frontend
Branch: main
Build Command: npm install && npm run build
Publish Directory: dist
```

Variável de ambiente utilizada no Render:

```text
VITE_API_BASE_URL=https://taskflow-api-jkpb.onrender.com
```

Site publicado:

```text
https://taskflow-web-e6fr.onrender.com
```

---

## CORS

Para permitir a comunicação entre frontend e backend, o backend possui política de CORS configurada no `Program.cs`.

Origens liberadas:

```text
http://localhost:5173
http://localhost:3000
https://taskflow-web-e6fr.onrender.com
```
---

## Segurança

A connection string do MongoDB não é salva no repositório.

Ela deve ser configurada localmente usando User Secrets durante o desenvolvimento.

Em ambiente de deploy, a connection string deve ser configurada por variável de ambiente.

O frontend também utiliza variável de ambiente para configurar a URL da API.

Cuidados aplicados:

- `.env` real não versionado;
- uso de `.env.example`;
- uso de User Secrets em desenvolvimento;
- uso de variáveis de ambiente no Render;
- senha real do MongoDB fora do código-fonte.

---

## Desafios técnicos resolvidos

Durante o desenvolvimento e deploy, foram tratados pontos importantes:

- configuração segura da connection string com User Secrets e variáveis de ambiente;
- integração entre frontend e backend usando `VITE_API_BASE_URL`;
- ajuste de CORS em ambiente local e produção;
- configuração de porta no Render com `PORT` e `ASPNETCORE_URLS`;
- dockerização do backend e frontend;
- desacoplamento do `TaskService` com `ITaskRepository` para permitir testes automatizados.

---

## Roadmap concluído

### Backend

- [x] Criar API ASP.NET Core
- [x] Criar model de tarefa
- [x] Criar DTOs
- [x] Criar controller de tarefas
- [x] Criar service
- [x] Criar repository
- [x] Criar interface `ITaskRepository`
- [x] Integrar com MongoDB Atlas
- [x] Implementar CRUD persistente
- [x] Adicionar validações
- [x] Adicionar campo de vencimento
- [x] Adicionar Scalar em ambiente Development
- [x] Criar testes automatizados
- [x] Dockerizar backend
- [x] Publicar backend no Render

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
- [x] Adicionar filtro de tarefas futuras
- [x] Agrupar tarefas por prazo
- [x] Ordenar tarefas por prazo e prioridade
- [x] Modernizar interface visual
- [x] Validar build de produção
- [x] Dockerizar frontend
- [x] Publicar frontend no Render

### Infraestrutura e documentação

- [x] Criar testes automatizados
- [x] Dockerizar backend
- [x] Dockerizar frontend
- [x] Criar Docker Compose
- [x] Configurar deploy do backend
- [x] Configurar deploy do frontend
- [x] Atualizar README final com links publicados
- [x] Adicionar prints finais em `docs/prints`

---

## Melhorias futuras

Possíveis evoluções para próximas versões:

- autenticação de usuários;
- tarefas por usuário;
- categorias personalizadas;
- tags;
- calendário semanal ou mensal;
- notificações de vencimento;
- botão para reabrir tarefa concluída;
- dashboard com métricas avançadas;
- filtros persistidos na URL;
- paginação ou carregamento incremental;
- testes automatizados de frontend;
- tratamento global de erros no backend;
- logs estruturados;
- CI/CD com GitHub Actions;
- ambiente MongoDB local no Docker Compose;
- exportação de tarefas;
- modo escuro;
- responsividade mobile mais refinada.

---

## Aprendizados aplicados

Neste projeto foram praticados conceitos como criação de APIs REST com ASP.NET Core, separação em camadas, uso de DTOs, persistência com MongoDB Atlas, testes automatizados com xUnit, consumo de API no React, organização de componentes, Docker, Docker Compose, CORS, variáveis de ambiente e deploy no Render.

---

## Status final

A aplicação está publicada e acessível pelo Render:

```text
Frontend: https://taskflow-web-e6fr.onrender.com
Backend: https://taskflow-api-jkpb.onrender.com/api/tasks
```

Este projeto representa a primeira entrega da trilha prática de projetos para portfólio.
