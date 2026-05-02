import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const serverDir = path.resolve(__dirname, '..')
const templatePath = path.join(serverDir, 'wrangler.example.toml')
const outputPath = path.join(serverDir, 'wrangler.toml')
const configPath = path.join(serverDir, 'config.js')

function readConfig() {
  if (!fs.existsSync(configPath)) return {}
  const require = createRequire(import.meta.url)
  const loaded = require(configPath)
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

const values = {
  workerName: pick(process.env.CF_WORKER_NAME, 'serverlesstea-server-ci'),
  d1DatabaseName: pick(process.env.CF_D1_DATABASE_NAME, 'serverlesstea-ci'),
  d1DatabaseId: pick(process.env.CF_D1_DATABASE_ID, 'ci-d1-database-id'),
  r2BucketName: pick(config.r2?.bucketName, process.env.CF_R2_BUCKET_NAME, 'serverlesstea-ci-git'),
  jwtSecret: pick(process.env.JWT_SECRET, 'ci-jwt-secret'),
  r2AccessToken: pick(config.r2?.accessToken, process.env.R2_ACCESS_TOKEN, 'ci-r2-access-token'),
  r2Endpoint: pick(config.r2?.endpoint, process.env.CF_R2_ENDPOINT, ''),
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
