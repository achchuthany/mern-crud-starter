# Backend (Express + Sequelize)

Overview

- Express-based API for products with Sequelize models. Provides CRUD endpoints under `/products`.

Prerequisites

- Node.js (>=16) and npm
- A SQL database (Postgres, MySQL, SQLite) configured via `DATABASE_URL` or `config/config.json`.

Install

```bash
cd backend
npm install
```

Run (development)

```bash
# nodemon recommended for auto-restart
npm run dev
# or
node index.js
```

Environment

- Set `DATABASE_URL` (optional) e.g. `postgres://user:pass@host:5432/dbname`.
- Optionally set `DB_SSL=true` if your DB requires SSL.

Key packages used

- `express`: web framework for APIs
- `sequelize`: ORM for models and DB access
- `cors`: enable Cross-Origin requests from frontend
- `joi`: request validation for endpoints
- `sqlite3` / `pg` / `mysql2`: database driver (install per your DB choice)

Why these packages

- `express` is minimal and widely-used for REST APIs.
- `sequelize` provides model definitions, migrations and a consistent API across SQL dialects.
- `joi` gives clear, reusable validation schemas.
- `cors` allows frontend (on a different port) to call the API safely.

What to improve next

- Add migrations and seed scripts (use `sequelize-cli` or `umzug`).
- Add authentication/authorization (JWT) for protected routes.
- Move sensitive config to environment variables and use a .env loader.
- Add tests (Supertest + Jest) for API endpoints.
- Add Dockerfile and docker-compose for local development.
- Consider Git LFS or cleaning history if repository contains very large files (to allow pushes to GitHub).
