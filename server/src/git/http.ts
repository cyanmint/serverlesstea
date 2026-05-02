import { authorizeGitAccess } from '../auth/git-access'
import type { Env } from '../index'
import { handleInfoRefs } from './protocol/info-refs'
import { handleUploadPack } from './protocol/upload-pack'
import { handleReceivePack } from './protocol/receive-pack'

export async function handleGitRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const pathname = url.pathname

  const match = pathname.match(/^\/git\/([^/]+)\/([^/]+)\.git(\/.*)?$/)
  if (!match) {
    return new Response('Not Found', { status: 404 })
  }

  const owner = match[1]
  const repo = match[2]
  const path = match[3] ?? '/'
  const authHeader = request.headers.get('Authorization') ?? undefined

  if (request.method === 'GET' && path === '/info/refs') {
    const service = url.searchParams.get('service')
    if (service !== 'git-upload-pack' && service !== 'git-receive-pack') {
      return new Response('Invalid service', { status: 400 })
    }

    const action = service === 'git-receive-pack' ? 'write' : 'read'
    const access = await authorizeGitAccess(env.DB, authHeader, owner, repo, action)
    if (!access.allowed) {
      if (access.status === 401) {
        return new Response('Unauthorized', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Git"' },
        })
      }
      return new Response(access.status === 404 ? 'Not Found' : 'Forbidden', {
        status: access.status,
      })
    }

    return handleInfoRefs(request, env.GIT_BUCKET, owner, repo)
  }

  if (request.method === 'POST' && path === '/git-upload-pack') {
    const access = await authorizeGitAccess(env.DB, authHeader, owner, repo, 'read')
    if (!access.allowed) {
      if (access.status === 401) {
        return new Response('Unauthorized', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Git"' },
        })
      }
      return new Response(access.status === 404 ? 'Not Found' : 'Forbidden', {
        status: access.status,
      })
    }

    return handleUploadPack(request)
  }

  if (request.method === 'POST' && path === '/git-receive-pack') {
    const access = await authorizeGitAccess(env.DB, authHeader, owner, repo, 'write')
    if (!access.allowed) {
      if (access.status === 401) {
        return new Response('Unauthorized', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Git"' },
        })
      }
      return new Response(access.status === 404 ? 'Not Found' : 'Forbidden', {
        status: access.status,
      })
    }

    return handleReceivePack(request, env.GIT_BUCKET, owner, repo)
  }

  return new Response('Not Found', { status: 404 })
}
