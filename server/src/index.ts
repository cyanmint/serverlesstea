import { Hono } from 'hono'
import { cors } from './middleware/cors'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import repoRoutes from './routes/repos'
import adminRoutes from './routes/admin'
import internalRoutes from './routes/internal'
import { handleGitRequest } from './git/http'

export interface Env {
  DB: D1Database
  GIT_BUCKET: R2Bucket
  JWT_SECRET: string
  R2_ACCESS_TOKEN?: string
  NODE_ENV?: string
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors)

app.route('/api/auth', authRoutes)
app.route('/api/users', userRoutes)
app.route('/api/repos', repoRoutes)
app.route('/api/admin', adminRoutes)
app.route('/api/internal', internalRoutes)
app.all('/git/*', async (c) => handleGitRequest(c.req.raw, c.env))

app.get('/', (c) => c.json({ service: 'serverlesstea-server', status: 'ok' }))

export default app
