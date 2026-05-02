# serverlesstea
a git hosting service based on workers

## Project
- Single-package repository with:
  - `server`: unified API + Git smart HTTP worker source
  - `frontend`: web UI source

## Worker configuration
Worker bindings (D1, R2) and secrets are configured on the Cloudflare side.
The `wrangler.jsonc` file at the repo root contains basic worker metadata only.

Default frontend API URL is `https://git-devel.cyanmint.workers.dev` (overridable via `VITE_API_URL` or `WORKER_URL` env vars at build time).

## Local commands
- `npm run build` builds backend and frontend from project root.
- `npm test` runs backend tests.
