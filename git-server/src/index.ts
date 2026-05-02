import { handleInfoRefs } from './protocol/info-refs'
import { handleUploadPack } from './protocol/upload-pack'
import { handleReceivePack } from './protocol/receive-pack'
import { validateGitAccess } from './auth/validate'

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

    if (request.method === 'GET' && path === '/info/refs') {
      const service = url.searchParams.get('service')
      if (service !== 'git-upload-pack' && service !== 'git-receive-pack') {
        return new Response('Invalid service', { status: 400 })
      }

      const action = service === 'git-receive-pack' ? 'write' : 'read'
      const access = await validateGitAccess(request, env.API_BASE_URL, owner, repo, action)
      if (!access.allowed) {
        return new Response(access.status === 401 ? 'Unauthorized' : 'Forbidden', {
          status: access.status,
          headers: access.status === 401 ? { 'WWW-Authenticate': 'Basic realm="Git"' } : undefined,
        })
      }

      return handleInfoRefs(request, env, owner, repo)
    }

    if (request.method === 'POST' && path === '/git-upload-pack') {
      const access = await validateGitAccess(request, env.API_BASE_URL, owner, repo, 'read')
      if (!access.allowed) {
        return new Response(access.status === 401 ? 'Unauthorized' : 'Forbidden', {
          status: access.status,
          headers: access.status === 401 ? { 'WWW-Authenticate': 'Basic realm="Git"' } : undefined,
        })
      }

      return handleUploadPack(request, env, owner, repo)
    }

    if (request.method === 'POST' && path === '/git-receive-pack') {
      const access = await validateGitAccess(request, env.API_BASE_URL, owner, repo, 'write')
      if (!access.allowed) {
        return new Response(access.status === 401 ? 'Unauthorized' : 'Forbidden', {
          status: access.status,
          headers: access.status === 401 ? { 'WWW-Authenticate': 'Basic realm="Git"' } : undefined,
        })
      }

      return handleReceivePack(request, env, owner, repo)
    }

    return new Response('Not Found', { status: 404 })
  },
}
