import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import worker from '../src/index'

class MockR2ObjectBody {
  constructor(private value: string | Uint8Array) {}
  async text() {
    return typeof this.value === 'string' ? this.value : new TextDecoder().decode(this.value)
  }
  async arrayBuffer() {
    return typeof this.value === 'string' ? new TextEncoder().encode(this.value).buffer : this.value.buffer
  }
}

class MockR2Bucket {
  private store = new Map<string, string | Uint8Array>()

  async get(key: string) {
    const value = this.store.get(key)
    if (!value) return null
    return new MockR2ObjectBody(value)
  }

  async put(key: string, value: string | ArrayBuffer | Uint8Array) {
    if (typeof value === 'string') {
      this.store.set(key, value)
      return
    }
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value)
    this.store.set(key, bytes)
  }

  async list({ prefix }: { prefix: string }) {
    const objects = Array.from(this.store.keys())
      .filter((k) => k.startsWith(prefix))
      .map((key) => ({ key }))
    return { objects }
  }
}

describe('git smart-http worker', () => {
  const fetchMock = vi.fn()
  let bucket: MockR2Bucket

  beforeEach(async () => {
    vi.stubGlobal('fetch', fetchMock)
    fetchMock.mockReset()
    bucket = new MockR2Bucket()
    await bucket.put('alice/repo.git/HEAD', 'ref: refs/heads/main\n')
    await bucket.put('alice/repo.git/refs/heads/main', `${'a'.repeat(40)}\n`)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function env() {
    return { GIT_BUCKET: bucket as unknown as R2Bucket, API_BASE_URL: 'https://api.local' }
  }

  it('serves info/refs for upload-pack when read access is granted', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ valid: true }), { status: 200 }))

    const res = await worker.fetch(
      new Request('https://git.local/alice/repo.git/info/refs?service=git-upload-pack'),
      env()
    )
    const body = await res.text()

    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('application/x-git-upload-pack-advertisement')
    expect(body).toContain('# service=git-upload-pack')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.local/api/internal/check-access?owner=alice&repo=repo&action=read',
      expect.any(Object)
    )
  })

  it('requires authentication for receive-pack advertisement', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }))

    const res = await worker.fetch(
      new Request('https://git.local/alice/repo.git/info/refs?service=git-receive-pack'),
      env()
    )

    expect(res.status).toBe(401)
    expect(res.headers.get('WWW-Authenticate')).toContain('Basic')
  })

  it('blocks upload-pack when read permission is denied', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 }))

    const res = await worker.fetch(
      new Request('https://git.local/alice/repo.git/git-upload-pack', {
        method: 'POST',
        body: '0000',
      }),
      env()
    )

    expect(res.status).toBe(403)
  })

  it('accepts receive-pack and updates refs when write access is granted', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ valid: true }), { status: 200 }))

    const updateLine = `${'0'.repeat(40)} ${'b'.repeat(40)} refs/heads/feature\0 report-status\n`
    const encoded = new TextEncoder().encode(updateLine)
    const len = (encoded.length + 4).toString(16).padStart(4, '0')
    const requestBody = new TextEncoder().encode(`${len}${updateLine}0000`)

    const res = await worker.fetch(
      new Request('https://git.local/alice/repo.git/git-receive-pack', {
        method: 'POST',
        body: requestBody,
      }),
      env()
    )
    const body = await res.text()

    expect(res.status).toBe(200)
    expect(body).toContain('unpack ok')

    const updatedRef = await bucket.get('alice/repo.git/refs/heads/feature')
    expect(await updatedRef?.text()).toContain('b'.repeat(40))
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.local/api/internal/check-access?owner=alice&repo=repo&action=write',
      expect.any(Object)
    )
  })
})
