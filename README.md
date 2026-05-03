# serverlesstea
a git hosting service based on workers

## Project
- Single-package repository with:
  - `server`: unified API + Git smart HTTP worker source
  - `frontend`: web UI source

## Worker configuration
Worker bindings (D1, R2) and secrets are configured on the Cloudflare side.
The `wrangler.jsonc` file at the repo root contains basic worker metadata only.

### Required Worker secrets
Set these once with `wrangler secret put <NAME>`:
- `JWT_SECRET` — random high-entropy string used to sign JWTs (e.g. `openssl rand -hex 32`)

### Required D1 migration
Apply the database schema once after creating the D1 database:
```
npx wrangler d1 execute git-devel --remote --file=server/schema.sql
```

Default frontend API URL is `https://git-devel.cyanmint.workers.dev` (overridable via `VITE_API_URL` or `WORKER_URL` env vars at build time).

## Local commands
- `npm run build` builds backend and frontend from project root.
- `npm test` runs backend tests.
