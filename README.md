# API REST Node.js

Uma API para um aplicativo de lista de tarefas (to do list) com modelos de Tasks e Tags utilizando MongoDB.

## Rodando a API

Utilize o .env fornecido como expemplo e preencha com um PORT de sua escolha e uma URI de um banco de dados Mongo.

.env.exemple
PORT=
DB_URI=

Após isso, basta usar o seguinte comando no terminal:

npm run start

## Rotas da API

Na tabela abaixo você pode encontrar todas as rotas da API.
A rota padrão é `http://localhost:3000`

Tasks

| Método | URL | Descrição |
| :--- | :--- | :--- |
| POST | `/api/task` | Cria um task |
| GET | `/api/task` | Lista todas as tasks |
| PUT | `/api/task/:taskId` | Edita uma task |
| DELETE | `/api/task/:taskId` | Deleta uma task |

Tags

| Método | URL | Descrição |
| :--- | :--- | :--- |
| POST | `/api/tag` | Cria um tag |
| GET | `/api/tag` | Lista todas as tags |
| PUT | `/api/tag/:tagId` | Edita uma tag |
| DELETE | `/api/tag/:tagId` | Deleta uma tag |

Relacionamentos

| Método | URL | Descrição |
| :--- | :--- | :--- |
| PUT | `/api/addTagToTask/:taskId/:tagId` | Adiciona um tag a uma task |
| GET | `/api/getTasksByTags` | Lista todas as Tasks que possuem determinadas tags |

## Tecnologias utilizadas

* Node.js
* Express
* Mongoose