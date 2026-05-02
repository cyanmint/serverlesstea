import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..', '..')
const templatePath = path.join(repoRoot, 'wrangler.example.toml')
const outputPath = path.join(repoRoot, 'wrangler.toml')
const rootConfigPath = path.join(repoRoot, 'config.js')
const legacyConfigPath = path.join(repoRoot, 'server', 'config.js')

function readConfig() {
  const targetPath = fs.existsSync(rootConfigPath) ? rootConfigPath : legacyConfigPath
  if (!fs.existsSync(targetPath)) return {}
  const require = createRequire(import.meta.url)
  const loaded = require(targetPath)
  return loaded && typeof loaded === 'object' ? loaded : {}
}

function pick(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.length > 0) return value
  }
  return ''
}

function tomlEscape(value) {
  return value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')
}

const config = readConfig()
const bucketAccountId = pick(
  process.env.CF_ACCOUNT_ID,
  process.env.CLOUDFLARE_ACCOUNT_ID,
  process.env.BUCKET_ACCOUNT_ID
)
const endpointFromAccountId = bucketAccountId ? `https://${bucketAccountId}.r2.cloudflarestorage.com` : ''

const values = {
  workerName: pick(process.env.CF_WORKER_NAME, 'serverlesstea-server-ci'),
  d1DatabaseName: pick(process.env.CF_D1_DATABASE_NAME, process.env.DB_NAME, 'serverlesstea-ci'),
  d1DatabaseId: pick(process.env.CF_D1_DATABASE_ID, process.env.DB_NAME, 'ci-d1-database-id'),
  r2BucketName: pick(config.r2?.bucketName, process.env.CF_R2_BUCKET_NAME, process.env.BUCKET_NAME, 'serverlesstea-ci-git'),
  jwtSecret: pick(process.env.JWT_SECRET, 'ci-jwt-secret'),
  r2AccessToken: pick(config.r2?.accessToken, process.env.R2_ACCESS_TOKEN, process.env.BUCKET_TOKEN, 'ci-r2-access-token'),
  r2Endpoint: pick(config.r2?.endpoint, process.env.CF_R2_ENDPOINT, process.env.BUCKET_ENDPOINT, endpointFromAccountId),
}

let output = fs.readFileSync(templatePath, 'utf8')
output = output.replaceAll('your-worker-name', tomlEscape(values.workerName))
output = output.replaceAll('your-d1-database-name', tomlEscape(values.d1DatabaseName))
output = output.replaceAll('your-d1-database-id', tomlEscape(values.d1DatabaseId))
output = output.replaceAll('your-r2-bucket-name', tomlEscape(values.r2BucketName))
output = output.replaceAll('replace-with-a-secret-value', tomlEscape(values.jwtSecret))
output = output.replaceAll('replace-with-r2-access-token-if-needed', tomlEscape(values.r2AccessToken))
output = output.replaceAll('replace-with-r2-endpoint-if-needed', tomlEscape(values.r2Endpoint))

fs.writeFileSync(outputPath, output)
console.log(`Generated ${outputPath}`)
