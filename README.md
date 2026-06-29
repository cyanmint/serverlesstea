# serverlesstea
a git hosting service based on workers

## Project
This is an npm workspaces monorepo with two independently deployable packages:
- `server`: unified API + Git smart HTTP worker source (Cloudflare Workers / Hono)
- `frontend`: web UI source (Vue 3 SPA / Vite)

## Worker configuration
Worker bindings (D1, R2) and secrets are configured on the Cloudflare side.
The `server/wrangler.jsonc` file contains the worker metadata.

### Required Worker secrets
Set these once with `wrangler secret put <NAME>`:
- `JWT_SECRET` — random high-entropy string used to sign JWTs (e.g. `openssl rand -hex 32`)

### Required D1 migration
Apply the database schema once after creating the D1 database:
```
npm run migrate
```
or from the `server/` directory:
```
npx wrangler d1 execute git-devel --remote --file=schema.sql
```

Default frontend API URL is `https://git-devel.cyanmint.workers.dev` (overridable via `VITE_API_URL` or `WORKER_URL` env vars at build time).

## Commands
Run from the project root:
- `npm run build` — build both server and frontend
- `npm run build:server` — build server only
- `npm run build:frontend` — build frontend only
- `npm run dev:server` — start server in local dev mode
- `npm run dev:frontend` — start frontend dev server
- `npm test` — run backend tests
- `npm run deploy` — deploy the worker to Cloudflare
- `npm run migrate` — apply database schema remotely

Or run from each workspace directory (`cd server` or `cd frontend`) using the same script names (e.g. `npm run dev`, `npm run build`, `npm test`).

