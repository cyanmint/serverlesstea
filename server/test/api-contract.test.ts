import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import app from '../src/index'

type ApiSpec = {
  endpoints: Array<{ method: string; path: string }>
  stubResponseMarkers: string[]
}

function normalizeSpecPath(specPath: string): string {
  if (specPath.startsWith('/git/')) {
    return '/git/*'
  }

  return specPath
    .split('?')[0]
    .replace('{owner}', ':owner')
    .replace('{repo}', ':repo')
    .replace('{ref}', ':ref')
    .replace('{sha}', ':sha')
    .replace('{username}', ':username')
    .replace('{index}', ':index')
    .replace('{tag}', ':tag')
    .replace('{pageName}', ':pageName')
    .replace('{number}', ':number')
    .replace('{id}', ':id')
    .replace('{path}', ':path{.*}')
}

function collectSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir)
  const files: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stats = statSync(fullPath)
    if (stats.isDirectory()) {
      files.push(...collectSourceFiles(fullPath))
    } else if (stats.isFile() && fullPath.endsWith('.ts')) {
      files.push(fullPath)
    }
  }
  return files
}

describe('api.json contract', () => {
  const specPath = path.resolve(process.cwd(), '../api.json')
  const spec = JSON.parse(readFileSync(specPath, 'utf8')) as ApiSpec
  const routes = (app as unknown as { routes: Array<{ method: string; path: string }> }).routes

  it('lists only implemented endpoints', () => {
    for (const endpoint of spec.endpoints) {
      const routePath = normalizeSpecPath(endpoint.path)
      const found = routes.find((route) => {
        if (routePath === '/git/*') {
          return route.method.toLowerCase() === 'all' && route.path === '/git/*'
        }
        return route.method.toLowerCase() === endpoint.method.toLowerCase() && route.path === routePath
      })
      expect(found, `${endpoint.method} ${endpoint.path}`).toBeTruthy()
    }
  })

  it('contains no obvious stub markers in server handlers', () => {
    const sourceFiles = collectSourceFiles(path.resolve(process.cwd(), 'src'))
    const markers = spec.stubResponseMarkers.map((m) => m.toLowerCase())

    for (const file of sourceFiles) {
      const content = readFileSync(file, 'utf8').toLowerCase()
      const hasMarker = markers.some((marker) => content.includes(`'${marker}`) || content.includes(`"${marker}`))
      expect(hasMarker, file).toBe(false)
    }
  })
})
