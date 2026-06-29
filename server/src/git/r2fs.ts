type StatResult = {
  type: 'file' | 'dir'
  mode: number
  size: number
  ino: number
  mtimeMs: number
  ctimeMs: number
  uid: number
  gid: number
  dev: number
  isFile(): boolean
  isDirectory(): boolean
  isSymbolicLink(): boolean
}

function makeStatResult(type: 'file' | 'dir', size: number): StatResult {
  const now = Date.now()
  return {
    type,
    mode: type === 'file' ? 0o100644 : 0o040755,
    size,
    ino: 0,
    mtimeMs: now,
    ctimeMs: now,
    uid: 0,
    gid: 0,
    dev: 0,
    isFile: () => type === 'file',
    isDirectory: () => type === 'dir',
    isSymbolicLink: () => false,
  }
}

export function createR2Fs(bucket: R2Bucket, owner: string, repo: string) {
  const prefix = `${owner}/${repo}.git`

  function r2Key(path: string): string {
    const normalized = path.replace(/^\//, '')
    if (normalized.startsWith(prefix + '/')) return normalized
    if (normalized === prefix) return normalized
    const rel = normalized.startsWith('/') ? normalized.slice(1) : normalized
    return `${prefix}/${rel}`
  }

  return {
    promises: {
      async readFile(path: string, options?: { encoding?: string } | string | null): Promise<string | Uint8Array> {
        const key = r2Key(path)
        const obj = await bucket.get(key)
        if (!obj) throw Object.assign(new Error(`ENOENT: ${path}`), { code: 'ENOENT' })
        const buf = await obj.arrayBuffer()
        const encoding = typeof options === 'string' ? options : (options as { encoding?: string } | null | undefined)?.encoding
        if (encoding === 'utf8' || encoding === 'utf-8') {
          return new TextDecoder().decode(buf)
        }
        return new Uint8Array(buf)
      },

      async writeFile(path: string, data: string | Uint8Array, _options?: unknown): Promise<void> {
        const key = r2Key(path)
        const body = typeof data === 'string' ? new TextEncoder().encode(data) : data
        await bucket.put(key, body)
      },

      async unlink(path: string): Promise<void> {
        const key = r2Key(path)
        await bucket.delete(key)
      },

      async readdir(path: string): Promise<string[]> {
        const key = r2Key(path)
        const dirPrefix = key.endsWith('/') ? key : key + '/'
        const listed = await bucket.list({ prefix: dirPrefix, delimiter: '/' })
        const names: string[] = []
        for (const obj of listed.objects) {
          const rel = obj.key.slice(dirPrefix.length)
          if (rel && !rel.includes('/')) names.push(rel)
        }
        for (const cp of listed.delimitedPrefixes) {
          const rel = cp.slice(dirPrefix.length).replace(/\/$/, '')
          if (rel) names.push(rel)
        }
        return names
      },

      async mkdir(_path: string, _options?: unknown): Promise<void> {
        // R2 has no real directories; just succeed
      },

      async rmdir(_path: string): Promise<void> {
        // no-op
      },

      async readlink(_path: string): Promise<string> {
        // Bare git repos stored in R2 do not contain symlinks.
        throw Object.assign(new Error(`ENOENT: readlink not supported`), { code: 'ENOENT' })
      },

      async symlink(_target: string, _path: string): Promise<void> {
        // no-op: symlinks not supported in R2-backed bare repos
      },

      async stat(path: string): Promise<StatResult> {
        const key = r2Key(path)
        const obj = await bucket.head(key)
        if (obj) return makeStatResult('file', obj.size)
        const dirPrefix = key.endsWith('/') ? key : key + '/'
        const listed = await bucket.list({ prefix: dirPrefix, limit: 1 })
        if (listed.objects.length > 0 || listed.delimitedPrefixes.length > 0) {
          return makeStatResult('dir', 0)
        }
        throw Object.assign(new Error(`ENOENT: ${path}`), { code: 'ENOENT' })
      },

      async lstat(path: string): Promise<StatResult> {
        const key = r2Key(path)
        const obj = await bucket.head(key)
        if (obj) return makeStatResult('file', obj.size)
        const dirPrefix = key.endsWith('/') ? key : key + '/'
        const listed = await bucket.list({ prefix: dirPrefix, limit: 1 })
        if (listed.objects.length > 0 || listed.delimitedPrefixes.length > 0) {
          return makeStatResult('dir', 0)
        }
        throw Object.assign(new Error(`ENOENT: ${path}`), { code: 'ENOENT' })
      },
    },
  }
}
