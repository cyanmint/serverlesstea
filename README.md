# serverlesstea
a git hosting service based on workers

## Project
- Single-package repository with:
  - `server`: unified API + Git smart HTTP worker source
  - `frontend`: web UI source

## Worker configuration
`wrangler.example.toml` and `config.example.js` are examples only.

Create a real config before running Wrangler:

```bash
cp config.example.js config.js
cp wrangler.example.toml wrangler.toml
npm run generate:wrangler-config
```

Set `r2.endpoint`, `r2.bucketName`, and `r2.accessToken` in `config.js`, then fill remaining values from your environment/secrets (worker name, D1 database id/name, JWT secret).
In CI, `wrangler.toml` is generated from repository secrets without committing real values. Supported secret names include:

- Legacy: `CF_WORKER_NAME`, `CF_D1_DATABASE_NAME`, `CF_D1_DATABASE_ID`, `CF_R2_BUCKET_NAME`, `CF_R2_ENDPOINT`, `JWT_SECRET`, `R2_ACCESS_TOKEN`
- Copilot environment: `BUCKET_ENDPOINT`, `BUCKET_ACCOUNT_ID`, `BUCKET_TOKEN`, `DB_NAME`

Default worker bindings are:
- D1: `database`
- R2: `bucket`

Default frontend API domain is read from environment secret `WORKER_URL` (or `VITE_API_URL` if explicitly set).

## Local commands
- `npm run build` builds backend and frontend from project root.
- `npm test` runs backend tests.
- `npx wrangler deploy` (or `npm run deploy`) from project root deploys the worker.
