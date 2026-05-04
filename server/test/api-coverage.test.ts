import { describe, it } from 'vitest'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import app from '../src/index'

type FrontendEndpoint = { name: string; method: string; path: string }
type CoverageStatus = 'correct' | 'stub' | 'malfunction'
type CoverageRow = { name: string; method: string; path: string; status: CoverageStatus; note: string }

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
      if (!found) return 'malfunction'

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
        status === 'malfunction'
          ? 'Route not registered in app'
          : status === 'stub'
            ? 'No DB/git operations — returns minimal data'
            : 'DB-backed implementation'
      return { name: ep.name, method: ep.method, path: ep.path, status, note }
    })

    const correctCount = rows.filter((r) => r.status === 'correct').length
    const stubCount = rows.filter((r) => r.status === 'stub').length
    const malfunctionCount = rows.filter((r) => r.status === 'malfunction').length
    const total = rows.length

    const md = [
      '# API Coverage Report',
      '',
      `**Total endpoints:** ${total} | **Correct:** ${correctCount} | **Stub:** ${stubCount} | **Malfunction:** ${malfunctionCount}`,
      '',
      '| Endpoint | Method | Path | Status | Note |',
      '|----------|--------|------|--------|------|',
      ...rows.map((r) => `| ${r.name} | \`${r.method}\` | \`${r.path}\` | **${r.status}** | ${r.note} |`),
    ].join('\n')

    writeFileSync(path.resolve(process.cwd(), 'api-coverage-report.md'), md, 'utf8')
    console.log(
      `Coverage: ${correctCount} correct, ${stubCount} stub, ${malfunctionCount} malfunction out of ${total}`,
    )
  })
})
