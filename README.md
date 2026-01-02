# Lorenzo Store 🛒

**Lorenzo Store** is a sample e-commerce storefront built with Next.js (frontend) and an optional Express + TypeScript backend located in `/server`. It showcases product pages, an admin area, and a small mock API for demos.
Wesbite for Customer 
Secure Admin Panel to manage

---

## ✅ Quick Start

1. Clone the repo:

```bash
git clone https://github.com/atif-nazir/LorenzoStore.git
cd LorenzoStore
```

2. Install dependencies (choose one):

```bash
npm install
# or 
pnpm install
```

3. Start the frontend dev server:

```bash
npm run dev
# or
pnpm dev
```

4. (Optional) Run the backend server in a separate terminal:

```bash
cd server
npm install
npm run build 
npm start
```

> 💡 Create a `.env` file for backend config (e.g. `MONGO_URI`, `JWT_SECRET`) if you use the API server.

---

## 🧰 Tech Stack

- Frontend: **Next.js**, **React**, **TypeScript**, **Tailwind CSS**
- Backend: **Express**, **TypeScript**, **Mongoose** (in `/server`)
- Tools: ESLint, TypeScript, Vercel for deployment

---

## 📦 Available Scripts (root)

- `npm run dev` — Run Next.js in development mode
- `npm run build` — Build the Next.js app for production
- `npm run vercel-build` — (used by Vercel) builds the app (`next build`)
- `npm run lint` — Run linting

Backend scripts (in `/server`):

- `npm run dev` — Run backend in dev mode (ts-node-dev)
- `npm run build` — Build backend TypeScript
- `npm start` — Start compiled backend (after build)

---

## 🚀 Deployment (Vercel)

1. Ensure lockfile is committed (`package-lock.json` for npm or `pnpm-lock.yaml` for pnpm).
2. If you use **pnpm**, commit `pnpm-lock.yaml` and configure Vercel to use pnpm; otherwise use npm and commit `package-lock.json`.
3. The `vercel-build` script was updated to `next build` so Vercel's installer handles dependency installation.
4. Connect the GitHub repo to Vercel and deploy, or use the Vercel CLI:

```bash
vercel --prod
```

---

## 🔎 Troubleshooting & Checks

- Run a TypeScript check:

```bash
npx tsc --noEmit
```

- Run linting:

```bash
npm run lint
```

- If the Vercel build fails with package manager or dependency issues, check the lockfile and ensure the project's package manager matches Vercel's configuration.

---

## 🤝 Contributing

- Fork the repo, create a feature branch, and open a PR.
- Run linters and type checks before submitting.
- Keep changes focused and add brief descriptions in PRs.

---

## 📄 License

This project is licensed under the **MIT License** — see the `LICENSE` file.

---
