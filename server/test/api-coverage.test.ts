import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import app from '../src/index'

type Endpoint = { name?: string; method: string; path: string }
type CoverageStatus = 'correct' | 'stub' | 'malfunction' | 'missing'
type CoverageRow = { name: string; method: string; path: string; status: CoverageStatus; note: string }

// Known format mismatches: route exists + DB ops but response shape differs from
// what the caller expects.  Key format: "METHOD:/handler/path"
// Update this set whenever a format regression is introduced or fixed.
const knownMalfunctions = new Set<string>([
  // Example: 'GET:/repos/issues/search',
])

function collectSourceFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) {
      files.push(...collectSourceFiles(full))
    } else if (full.endsWith('.ts')) {
      files.push(full)
    }
  }
  return files
}

// Route prefixes registered in src/index.ts — used to derive the handler-relative path
// that appears in each route file (e.g. '/api/v1/user' → '/user' for v1Routes).
const ROUTE_PREFIXES = [
  '/api/v1',
  '/api/auth',
  '/api/users',
  '/api/repos',
  '/api/admin',
  '/api/internal',
  '/api/orgs',
  '/api/user/keys',
  '/api/notifications',
  '/api/dashboard',
]

describe('api coverage report', () => {
  it('generates coverage report for all endpoints in api.json', () => {
    const apiJson = JSON.parse(readFileSync(path.resolve(process.cwd(), '../api.json'), 'utf8'))

    // The implemented-endpoint list (used for hard assertions).
    const implementedEndpoints: Endpoint[] = apiJson.endpoints

    // Build the full endpoint list from the Swagger spec: basePath + paths.
    // basePath may contain a Go template prefix (e.g. "{{.SwaggerAppSubUrl}}/api/v1");
    // strip it to get the real path base.
    const swaggerBase: string = (apiJson.basePath as string).replace(/\{\{.*?\}\}/g, '')
    const swaggerPaths: Record<string, Record<string, unknown>> = apiJson.paths ?? {}
    const swaggerEndpoints: Endpoint[] = []
    for (const [swaggerPath, methods] of Object.entries(swaggerPaths)) {
      for (const method of Object.keys(methods)) {
        swaggerEndpoints.push({ method: method.toUpperCase(), path: swaggerBase + swaggerPath })
      }
    }

    // Union: Swagger spec + any implemented endpoints that aren't in the Swagger spec
    // (e.g. /api/auth/*, /git/*).
    const swaggerSet = new Set(swaggerEndpoints.map((e) => `${e.method}:${e.path}`))
    const extras = implementedEndpoints.filter((e) => !swaggerSet.has(`${e.method.toUpperCase()}:${e.path}`))
    const allEndpoints: Endpoint[] = [...swaggerEndpoints, ...extras]

    // Set of implemented keys for per-endpoint assertion enforcement.
    const implementedKeys = new Set(implementedEndpoints.map((e) => `${e.method.toUpperCase()}:${e.path}`))

    const routes = (app as unknown as { routes: Array<{ method: string; path: string }> }).routes

    // Concatenate all TypeScript source files for DB/git-op detection.
    const allSource = collectSourceFiles(path.resolve(process.cwd(), 'src'))
      .map((f) => readFileSync(f, 'utf8'))
      .join('\n')

    function normalizePath(p: string): string {
      // All git smart-HTTP paths are handled by a single app.all('/git/*') wildcard.
      if (p.startsWith('/git/')) return '/git/*'
      return p
        .replace(/\{owner\}/g, ':owner')
        .replace(/\{repo\}/g, ':repo')
        .replace(/\{username\}/g, ':username')
        .replace(/\{index\}/g, ':index')
        .replace(/\{id\}/g, ':id')
        .replace(/\{ref\}/g, ':ref')
        .replace(/\{sha\}/g, ':sha')
        .replace(/\{tag\}/g, ':tag')
        .replace(/\{pageName\}/g, ':pageName')
        .replace(/\{number\}/g, ':number')
        .replace(/\{path\}.*/, ':path{.*}')
        .split('?')[0]
    }

    function classifyEndpoint(method: string, normalizedPath: string): CoverageStatus {
      // Git routes are registered as app.all('/git/*').
      const isGit = normalizedPath === '/git/*'
      const found = routes.find((r) => {
        if (isGit) return r.method.toLowerCase() === 'all' && r.path === '/git/*'
        return r.method.toLowerCase() === method.toLowerCase() && r.path === normalizedPath
      })
      if (!found) return 'missing'

      // Git operations always touch git storage — always correct.
      if (isGit) return 'correct'

      // Derive the handler-relative path that appears in the route source file.
      let handlerPath = normalizedPath
      for (const prefix of ROUTE_PREFIXES) {
        if (normalizedPath.startsWith(prefix)) {
          handlerPath = normalizedPath.slice(prefix.length) || '/'
          break
        }
      }

      const malfunctionKey = `${method.toUpperCase()}:${handlerPath}`
      if (knownMalfunctions.has(malfunctionKey)) return 'malfunction'

      const lines = allSource.split('\n')
      for (let i = 0; i < lines.length; i++) {
        if (
          lines[i].includes(handlerPath.replace(/:([^/]+)\{\.\*\}/, ':$1{.*}')) ||
          lines[i].includes(handlerPath.replace(/:([^/]+)/g, (_, p) => `{${p}}`))
        ) {
          const context = lines.slice(i, i + 30).join('\n')
          if (
            context.includes('db.prepare') ||
            context.includes('listFiles') ||
            context.includes('readBlob') ||
            context.includes('listCommits') ||
            context.includes('getCommitDiff') ||
            context.includes('listBranches') ||
            context.includes('listTags')
          ) {
            return 'correct'
          }
          return 'stub'
        }
      }
      return 'stub'
    }

    const rows: CoverageRow[] = allEndpoints.map((ep) => {
      const normalizedPath = normalizePath(ep.path)
      const status = classifyEndpoint(ep.method, normalizedPath)
      const name = ep.name ?? `${ep.method} ${ep.path}`
      const note =
        status === 'missing'
          ? 'Route not registered — returns 404'
          : status === 'malfunction'
            ? 'Route exists but response format does not match expectation'
            : status === 'stub'
              ? 'No DB/git operations — returns minimal data'
              : 'DB/git-backed implementation'
      return { name, method: ep.method, path: ep.path, status, note }
    })

    const correctCount = rows.filter((r) => r.status === 'correct').length
    const stubCount = rows.filter((r) => r.status === 'stub').length
    const malfunctionCount = rows.filter((r) => r.status === 'malfunction').length
    const missingCount = rows.filter((r) => r.status === 'missing').length
    const total = rows.length

    const md = [
      '# API Coverage Report',
      '',
      `**Total endpoints:** ${total} | **Correct:** ${correctCount} | **Stub:** ${stubCount} | **Malfunction:** ${malfunctionCount} | **Missing:** ${missingCount}`,
      '',
      '| Endpoint | Method | Path | Status | Note |',
      '|----------|--------|------|--------|------|',
      ...rows.map((r) => `| ${r.name} | \`${r.method}\` | \`${r.path}\` | **${r.status}** | ${r.note} |`),
    ].join('\n')

    writeFileSync(path.resolve(process.cwd(), 'api-coverage-report.md'), md, 'utf8')
    console.log(
      `Coverage: ${correctCount} correct, ${stubCount} stub, ${malfunctionCount} malfunction, ${missingCount} missing out of ${total}`,
    )

    // Every endpoint in the `endpoints` array must be registered in the app — a missing
    // route means the server returns 404 for a path that was declared implemented.
    // Swagger-spec-only paths (not yet implemented) are reported but do not fail CI.
    const missingEndpoints = rows
      .filter((r) => r.status === 'missing' && implementedKeys.has(`${r.method.toUpperCase()}:${r.path}`))
      .map((r) => `${r.method} ${r.path}`)
    expect(missingEndpoints, `Implemented endpoints no longer registered in the app: ${missingEndpoints.join(', ')}`).toHaveLength(0)

    // Known format mismatches must not accumulate silently (implemented routes only).
    const malfunctionEndpoints = rows
      .filter((r) => r.status === 'malfunction' && implementedKeys.has(`${r.method.toUpperCase()}:${r.path}`))
      .map((r) => `${r.method} ${r.path}`)
    expect(
      malfunctionEndpoints,
      `Endpoints with response-format mismatches: ${malfunctionEndpoints.join(', ')}`,
    ).toHaveLength(0)
  })
})

