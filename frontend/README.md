# Frontend (React + Vite)

Overview

- Simple React frontend built with Vite. Provides pages to list, add, edit and delete products.

Prerequisites

- Node.js (>=16) and npm/yarn

Install

```bash
cd frontend
npm install
```

Run (development)

```bash
npm run dev
```

Build

```bash
npm run build
```

Key packages used

- `react`, `react-dom`: UI library
- `vite`: fast dev server and build tool
- `react-router`: client-side routing
- `axios`: HTTP client for API calls
- `react-hook-form` + `@hookform/resolvers/joi`: form handling with Joi validation
- `joi`: declarative validation schema used both frontend and backend
- `bootstrap`: CSS framework for layout and components

Why these packages

- Vite + React provide fast development feedback and small production bundles.
- `react-hook-form` is lightweight and performant for forms; `joi` keeps validation logic consistent across frontend and backend.
- `axios` is a familiar, promise-based HTTP client.
- `bootstrap` gives a quick, responsive UI without custom CSS.

What to improve next

- Centralize API base URL and add environment-specific configs.
- Add global error handling and toasts for UX.
- Add client-side pagination and search for products list.
- Add unit/integration tests (Jest + React Testing Library).
- Improve accessibility and form UX (inline validation, loading states).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
