import { Env } from '../index'
import { readPackedRefs, readRef } from '../storage/r2'

function pktLine(data: string): string {
  const len = data.length + 4
  return len.toString(16).padStart(4, '0') + data
}

const FLUSH = '0000'

async function collectRefs(env: Env, owner: string, repo: string): Promise<Map<string, string>> {
  const allRefs = new Map<string, string>()

  const packed = await readPackedRefs(env.GIT_BUCKET, owner, repo)
  for (const [ref, sha] of packed) {
    allRefs.set(ref, sha)
  }

  const headContent = await readRef(env.GIT_BUCKET, owner, repo, 'HEAD')
  if (headContent) {
    if (headContent.startsWith('ref: ')) {
      const targetRef = headContent.slice(5).trim()
      const sha = allRefs.get(targetRef)
      if (sha) allRefs.set('HEAD', sha)
    } else {
      allRefs.set('HEAD', headContent)
    }
  }

  const commonRefs = ['refs/heads/main', 'refs/heads/master', 'refs/heads/develop']
  for (const ref of commonRefs) {
    if (!allRefs.has(ref)) {
      const sha = await readRef(env.GIT_BUCKET, owner, repo, ref)
      if (sha) allRefs.set(ref, sha)
    }
  }

  const prefixes = [`${owner}/${repo}.git/refs/heads/`, `${owner}/${repo}.git/refs/tags/`]
  for (const prefix of prefixes) {
    const listed = await env.GIT_BUCKET.list({ prefix })
    for (const obj of listed.objects) {
      const refName = obj.key.slice(`${owner}/${repo}.git/`.length)
      if (!allRefs.has(refName)) {
        const sha = await readRef(env.GIT_BUCKET, owner, repo, refName)
        if (sha) allRefs.set(refName, sha)
      }
    }
  }

  return allRefs
}

export async function handleInfoRefs(
  request: Request,
  env: Env,
  owner: string,
  repo: string
): Promise<Response> {
  const url = new URL(request.url)
  const service = url.searchParams.get('service')

  if (service !== 'git-upload-pack' && service !== 'git-receive-pack') {
    return new Response('Invalid service', { status: 400 })
  }

  const allRefs = await collectRefs(env, owner, repo)

  let body = ''
  body += pktLine(`# service=${service}\n`)
  body += FLUSH

  const refs = Array.from(allRefs.entries())
  if (refs.length === 0) {
    const nullSha = '0'.repeat(40)
    const caps = 'capabilities^{}'
    body += pktLine(`${nullSha} ${caps}\0side-band side-band-64k ofs-delta\n`)
  } else {
    let first = true
    for (const [refName, sha] of refs) {
      if (first) {
        body += pktLine(`${sha} ${refName}\0side-band side-band-64k ofs-delta\n`)
        first = false
      } else {
        body += pktLine(`${sha} ${refName}\n`)
      }
    }
  }
  body += FLUSH

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': `application/x-${service}-advertisement`,
      'Cache-Control': 'no-cache',
    },
  })
}
