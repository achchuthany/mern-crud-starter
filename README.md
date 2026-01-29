# MERN CRUD Starter

This workspace contains a minimal MERN-style (React + Express + Sequelize) starter project intended for teaching and demo purposes. It includes two main folders:

- `frontend/` — React + Vite frontend. See frontend/README.md for details.
- `backend/` — Express API with Sequelize models. See backend/README.md for details.

Quick links

- Frontend README: [frontend/README.md](frontend/README.md)
- Backend README: [backend/README.md](backend/README.md)

What this repository includes

- A simple product CRUD frontend with pages to list, add, edit and delete products.
- An Express backend exposing REST endpoints under `/products` backed by Sequelize models.
- Basic validation using Joi, and a Bootstrap-based UI for quick layout.
- Example `.gitignore` files and README files for both projects.

How to use (short)

1. Start the backend:

```bash
cd backend
npm install
# set DATABASE_URL or configure config/config.json
npm run dev
```

2. Start the frontend in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Why this structure

- Separating frontend and backend keeps concerns clear for learners and makes deployment options flexible.
- Using Vite + React offers a fast developer experience; Express + Sequelize is a common stack for learning server-side concepts.

Suggested next steps for students

- Add authentication (JWT) and protect routes.
- Add migrations and seed scripts for reproducible databases.
- Add tests for API endpoints and React components.
- Containerize with Docker and add a `docker-compose` setup.
