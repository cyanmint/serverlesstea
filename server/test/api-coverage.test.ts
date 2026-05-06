import { describe, expect, it } from 'vitest'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import app from '../src/index'

type FrontendEndpoint = { name: string; method: string; path: string }
type CoverageStatus = 'correct' | 'stub' | 'malfunction' | 'missing'
type CoverageRow = { name: string; method: string; path: string; status: CoverageStatus; note: string }

// Known format mismatches: route exists + DB ops but response shape differs from
// what the frontend function expects.  Key format: "METHOD:/path/without/api/v1"
// Update this set whenever a format regression is introduced or fixed.
const knownMalfunctions = new Set<string>([
  // Example (currently empty after fixing repos/issues/search):
  // 'GET:/repos/issues/search',
])

describe('api coverage report', () => {
  it('generates coverage report for frontendRequiredEndpoints', () => {
    const apiJson = JSON.parse(readFileSync(path.resolve(process.cwd(), '../api.json'), 'utf8'))
    const endpoints: FrontendEndpoint[] = apiJson.frontendRequiredEndpoints
    const routes = (app as unknown as { routes: Array<{ method: string; path: string }> }).routes
    const v1Source = readFileSync(path.resolve(process.cwd(), 'src/routes/v1.ts'), 'utf8')

    function normalizePath(p: string): string {
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
      const routePath = normalizedPath.replace('/api/v1', '')
      const found = routes.find(
        (r) => r.method.toLowerCase() === method.toLowerCase() && r.path === normalizedPath,
      )
      // Route does not exist in the app at all — the frontend will get a 404.
      if (!found) return 'missing'

      // Route exists but is a known response-format mismatch.
      const malfunctionKey = `${method.toUpperCase()}:${routePath}`
      if (knownMalfunctions.has(malfunctionKey)) return 'malfunction'

      const lines = v1Source.split('\n')
      for (let i = 0; i < lines.length; i++) {
        if (
          lines[i].includes(routePath.replace(/:([^/]+)\{\.\*\}/, ':$1{.*}')) ||
          lines[i].includes(routePath.replace(/:([^/]+)/g, (_, p) => `{${p}}`))
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

    const rows: CoverageRow[] = endpoints.map((ep) => {
      const normalizedPath = normalizePath(ep.path)
      const status = classifyEndpoint(ep.method, normalizedPath)
      const note =
        status === 'missing'
          ? 'Route not registered — frontend receives 404'
          : status === 'malfunction'
            ? 'Route exists but response format does not match frontend expectation'
            : status === 'stub'
              ? 'No DB/git operations — returns minimal data'
              : 'DB-backed implementation'
      return { name: ep.name, method: ep.method, path: ep.path, status, note }
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

    const missingEndpoints = rows.filter((r) => r.status === 'missing').map((r) => `${r.method} ${r.path}`)
    const stubEndpoints = rows.filter((r) => r.status === 'stub').map((r) => `${r.method} ${r.path}`)
    const malfunctionEndpoints = rows.filter((r) => r.status === 'malfunction').map((r) => `${r.method} ${r.path}`)

    expect(missingEndpoints, `Missing endpoints (not registered in app): ${missingEndpoints.join(', ')}`).toHaveLength(0)
    expect(stubEndpoints, `Stub endpoints (no DB/git operations): ${stubEndpoints.join(', ')}`).toHaveLength(0)
    expect(
      malfunctionEndpoints,
      `Malfunctioning endpoints (response format mismatch): ${malfunctionEndpoints.join(', ')}`,
    ).toHaveLength(0)
  })
})

