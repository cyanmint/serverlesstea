import { handleInfoRefs } from './protocol/info-refs'
import { handleUploadPack } from './protocol/upload-pack'
import { handleReceivePack } from './protocol/receive-pack'
import { validateBasicAuth } from './auth/validate'

export interface Env {
  GIT_BUCKET: R2Bucket
  API_BASE_URL: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const pathname = url.pathname

    // Match /:owner/:repo.git/...
    const match = pathname.match(/^\/([^/]+)\/([^/]+)\.git(\/.*)?$/)
    if (!match) {
      return new Response('Not Found', { status: 404 })
    }

    const owner = match[1]
    const repo = match[2]
    const path = match[3] ?? '/'

    // Validate auth for write operations
    if (request.method === 'POST') {
      const authResult = await validateBasicAuth(request, env.API_BASE_URL)
      if (!authResult.valid) {
        return new Response('Unauthorized', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Git"' },
        })
      }
    }

    if (request.method === 'GET' && path === '/info/refs') {
      return handleInfoRefs(request, env, owner, repo)
    }

    if (request.method === 'POST' && path === '/git-upload-pack') {
      return handleUploadPack(request, env, owner, repo)
    }

    if (request.method === 'POST' && path === '/git-receive-pack') {
      return handleReceivePack(request, env, owner, repo)
    }

    return new Response('Not Found', { status: 404 })
  },
}
