# serverlesstea
a git hosting service based on workers

## Packages
- `server`: unified API + Git smart HTTP worker
- `frontend`: web UI

## Worker configuration
`server/wrangler.example.toml` is an example only.

Create a real config before running Wrangler:

```bash
cp server/wrangler.example.toml server/wrangler.toml
```

Then fill values from your environment/secrets (worker name, D1 database id/name, R2 bucket name, JWT secret, optional R2 access token).  
In CI, generate `server/wrangler.toml` from repository secrets instead of committing real values (`CF_WORKER_NAME`, `CF_D1_DATABASE_NAME`, `CF_D1_DATABASE_ID`, `CF_R2_BUCKET_NAME`, `JWT_SECRET`, `R2_ACCESS_TOKEN`).
