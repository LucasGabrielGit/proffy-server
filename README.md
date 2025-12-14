# Proffy Server

Backend da aplicação Proffy, uma plataforma construída para conectar professores e alunos. Este projeto utiliza uma arquitetura moderna e performática baseada em **Fastify**, **Prisma** e **TypeScript**, organizada em um **Monorepo** gerenciado pelo TurboRepo.

## 🚀 Tecnologias

As principais ferramentas utilizadas no desenvolvimento deste projeto:

- **Node.js** & **TypeScript**: Base sólida e tipada para o backend.
- **Fastify**: Framework web focado em alta performance e baixo overhead.
- **Prisma ORM**: ORM moderno para interação segura e fácil com o banco de dados.
- **PostgreSQL**: Banco de dados relacional robusto.
- **Zod**: Biblioteca para validação de esquemas e dados.
- **JWT (JSON Web Token)**: Padrão para autenticação segura entre as partes.
- **TurboRepo**: Ferramenta de build system para monorepos JavaScript/TypeScript.
- **Docker**: Para containerização do serviço de banco de dados.

## 📁 Estrutura do Projeto

O projeto segue uma estrutura de monorepo:

```
proffy-server/
├── apps/
│   └── server/       # Aplicação Backend principal (Fastify)
├── packages/
│   ├── db/           # Camada de Banco de Dados (Schema do Prisma, Migrations, Docker)
│   └── config/       # Configurações compartilhadas (TSConfig base, etc.)
```

## 🛠️ Como Executar

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- **Node.js** (Versão 18 ou superior)
- **npm** (Gerenciador de pacotes)
- **Docker** (Para rodar o banco de dados PostgreSQL localmente)

### Passo a Passo

1.  **Instale as dependências:**
    Execute o comando na raiz do projeto:
    ```bash
    npm install
    ```

2.  **Configure o Ambiente:**
    Verifique se existe um arquivo `.env` configurado em `apps/server/`. Você pode usar o `.env.example` como base.

3.  **Inicie o Banco de Dados:**
    Utilize o script para subir o container do PostgreSQL via Docker:
    ```bash
    npm run db:start
    ```

4.  **Execute as Migrations:**
    Aplique as tabelas no banco de dados:
    ```bash
    npm run db:migrate
    ```

5.  **Inicie o Servidor:**
    Rode o servidor em modo de desenvolvimento:
    ```bash
    npm run dev:server
    ```
    
    🚀 O servidor estará rodando em: `http://localhost:3000`

## 📜 Scripts Principais

No `package.json` raiz, você encontrará atalhos úteis:

- **`npm run dev`**: Inicia todos os apps do monorepo em modo watch.
- **`npm run dev:server`**: Inicia apenas o backend (`apps/server`).
- **`npm run db:start`**: Sobe o banco de dados (Docker Compose).
- **`npm run db:stop`**: Para o banco de dados.
- **`npm run db:studio`**: Abre o **Prisma Studio** no navegador para gerenciar os dados visualmente.
- **`npm run db:migrate`**: Executa as migrações pendentes do Prisma.

## 🔌 Rotas da API

### 🔐 Autenticação
- **`POST /auth/login`**: Autentica o usuário e retorna o token JWT.

### 👤 Usuários
- **`POST /user`**: Cadastra um novo usuário (Professor).
- **`GET /users`**: Lista professores com filtros. *(Requer Autenticação)*
- **`PUT /user/:id`**: Atualiza dados do perfil do usuário. *(Requer Autenticação)*
- **`PATCH /user/:id/reset-password`**: Atualiza apenas a senha do usuário. *(Requer Autenticação)*
- **`DELETE /user/:id`**: Remove a conta do usuário. *(Requer Autenticação)*

### 📚 Aulas
- **`POST /classes`**: Cria uma nova aula vinculada ao professor logado. *(Requer Autenticação)*
- **`GET /classes`**: Lista as aulas disponíveis para alunos (público).

### 💜 Conexões
- **`POST /connections`**: Registra uma nova conexão (quando um aluno entra em contato).
- **`GET /connections`**: Retorna o total de conexões já realizadas na plataforma.

---

Desenvolvido com 💜 para estudos e portfólio.
