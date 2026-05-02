# serverlesstea
a git hosting service based on workers

## Packages
- `server`: unified API + Git smart HTTP worker
- `frontend`: web UI

## Worker configuration
`server/wrangler.example.toml` and `server/config.example.js` are examples only.

Create a real config before running Wrangler:

```bash
cp server/config.example.js server/config.js
cp server/wrangler.example.toml server/wrangler.toml
npm --prefix server run generate:wrangler-config
```

Set `r2.endpoint`, `r2.bucketName`, and `r2.accessToken` in `server/config.js`, then fill remaining values from your environment/secrets (worker name, D1 database id/name, JWT secret).  
In CI, `server/wrangler.toml` is generated from repository secrets (and optional `CF_R2_ENDPOINT`) without committing real values (`CF_WORKER_NAME`, `CF_D1_DATABASE_NAME`, `CF_D1_DATABASE_ID`, `CF_R2_BUCKET_NAME`, `CF_R2_ENDPOINT`, `JWT_SECRET`, `R2_ACCESS_TOKEN`).
