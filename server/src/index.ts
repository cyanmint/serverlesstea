import { Hono } from 'hono'
import { cors } from './middleware/cors'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import repoRoutes from './routes/repos'
import adminRoutes from './routes/admin'
import internalRoutes from './routes/internal'
import issueRoutes from './routes/issues'
import labelRoutes from './routes/labels'
import milestoneRoutes from './routes/milestones'
import releaseRoutes from './routes/releases'
import wikiRoutes from './routes/wiki'
import branchRoutes from './routes/branches'
import orgRoutes from './routes/orgs'
import sshKeyRoutes from './routes/sshkeys'
import notificationRoutes from './routes/notifications'
import dashboardRoutes from './routes/dashboard'
import { handleGitRequest } from './git/http'
import v1Routes from './routes/v1'

export interface Env {
  database: D1Database
  bucket: R2Bucket
  JWT_SECRET: string
  R2_ACCESS_TOKEN?: string
  R2_ENDPOINT?: string
  NODE_ENV?: string
  SEND_EMAIL?: SendEmail
  EMAIL_FROM?: string
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors)

app.route('/api/auth', authRoutes)
app.route('/api/users', userRoutes)
app.route('/api/repos', repoRoutes)
app.route('/api/repos', issueRoutes)
app.route('/api/repos', labelRoutes)
app.route('/api/repos', milestoneRoutes)
app.route('/api/repos', releaseRoutes)
app.route('/api/repos', wikiRoutes)
app.route('/api/repos', branchRoutes)
app.route('/api/admin', adminRoutes)
app.route('/api/internal', internalRoutes)
app.route('/api/orgs', orgRoutes)
app.route('/api/user/keys', sshKeyRoutes)
app.route('/api/notifications', notificationRoutes)
app.route('/api/dashboard', dashboardRoutes)
app.route('/api/v1', v1Routes)
app.all('/git/*', async (c) => handleGitRequest(c.req.raw, c.env))

app.get('/', (c) => c.json({ service: 'serverlesstea-server', status: 'ok' }))

export default app
