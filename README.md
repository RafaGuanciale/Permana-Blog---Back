# Permana Blog — API

## Sobre o projeto

**API REST do Permana Blog**, o backend que serve os conteúdos do blog da plataforma Permana. Construído em **Node.js + Express + TypeScript** sobre um banco **PostgreSQL**, faz parte de um projeto full-stack com tipagem de ponta a ponta, cujo objetivo é demonstrar arquitetura de backend, modelagem de dados em SQL e integração entre serviços em produção.

Este repositório contém a **API**, consumida pelo **frontend** em React + TypeScript (em repositório separado).

---

## Links

- **API (Render):** https://permana-blog-back.onrender.com
- **Frontend (Vercel):** https://permana-blog-front.vercel.app/
- **Repositório do frontend:** https://github.com/RafaGuanciale/Permana-Blog---front
---

## Endpoints

| Método | Rota           | Descrição                                                       |
| ------ | -------------- | -------------------------------------------------------------- |
| `GET`  | `/posts`       | Lista todos os posts (preview), do mais recente ao mais antigo  |
| `GET`  | `/posts/:slug` | Retorna um post completo pelo slug (404 se não existir)         |

O endpoint de listagem retorna apenas os campos de resumo (sem o corpo do texto); o de detalhe retorna o post completo. São dois recortes da mesma tabela.

---

## Arquitetura

A aplicação segue uma organização em **camadas**, separando responsabilidades:

```
src/
  server.ts          sobe o processo (listen)
  app.ts             cria o Express, registra middlewares e rotas
  db.ts              conexao com o PostgreSQL (pool)
  routes/
    posts.ts         define os caminhos e aponta para os controllers
  controllers/
    posts.ts         logica de cada endpoint (queries)
  db/
    migrations/      schema em SQL versionado
```

A separação `server` / `app` permite subir a aplicação sem abrir porta de rede (útil para testes). O fluxo de uma requisição é: `server` para `app` para `routes` para `controller` para `db`.

---

## Banco de dados

- **PostgreSQL** hospedado no **Neon**
- **Schema modelado em SQL escrito à mão**, sem ORM, versionado como migration
- Chave primária por `id` gerado pelo banco (`GENERATED ALWAYS AS IDENTITY`); `slug` único para acesso por URL
- Datas em `TIMESTAMPTZ` (com fuso), com `DEFAULT NOW()`
- Acesso via driver `pg`, com **queries parametrizadas** (`$1`), proteção contra SQL injection

---

## Tecnologias e técnicas utilizadas

- **Node.js + Express**, servidor e roteamento
- **TypeScript**, tipagem estática em todo o backend, compilado para `dist/` em produção
- **PostgreSQL** (`pg`), banco relacional, SQL direto
- **CORS**, configurado por origem (front local e produção)
- **dotenv**, variáveis de ambiente
- **tsx**, execução do TypeScript em desenvolvimento

### Boas práticas

- Arquitetura em camadas com responsabilidades separadas
- Queries parametrizadas contra injeção de SQL
- Validação da variável de ambiente na inicialização (falha explícita se ausente)
- Tratamento de recurso inexistente (404) e rota não encontrada (fallback)
- Schema versionado em migration

---

## Como rodar localmente

```
npm install
```

Crie um arquivo `.env` na raiz com a variável:

```
DATABASE_URL=sua_connection_string_postgres
```

Depois:

```
npm run dev
```

Scripts disponíveis:

- `npm run dev`, desenvolvimento com recarga automática (`tsx watch`)
- `npm run build`, compila o TypeScript para `dist/`
- `npm start`, roda a versão compilada (usado em produção)

---

## Melhorias futuras

- **Tratamento de erro centralizado**, middleware de erro para capturar falhas das queries em um único ponto
- **Validação de dados**, validação em runtime das respostas do banco (ex.: Zod), eliminando o `any` na fronteira com o `pg`
- **CRUD de administração**, criação e edição de posts com autenticação
- **Script de migrations**, execução automática dos arquivos SQL versionados

---

## Autor

Rafael Guanciale Nacarato
