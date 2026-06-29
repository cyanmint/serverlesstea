import { readPackedRefs, readRef } from '../storage/r2'

function pktLine(data: string): string {
  const len = data.length + 4
  return len.toString(16).padStart(4, '0') + data
}

const FLUSH = '0000'

async function collectRefs(bucket: R2Bucket, owner: string, repo: string): Promise<Map<string, string>> {
  const allRefs = new Map<string, string>()

  const packed = await readPackedRefs(bucket, owner, repo)
  for (const [ref, sha] of packed) {
    allRefs.set(ref, sha)
  }

  const headContent = await readRef(bucket, owner, repo, 'HEAD')
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
      const sha = await readRef(bucket, owner, repo, ref)
      if (sha) allRefs.set(ref, sha)
    }
  }

  const prefixes = [`${owner}/${repo}.git/refs/heads/`, `${owner}/${repo}.git/refs/tags/`]
  for (const prefix of prefixes) {
    const listed = await bucket.list({ prefix })
    for (const obj of listed.objects) {
      const refName = obj.key.slice(`${owner}/${repo}.git/`.length)
      if (!allRefs.has(refName)) {
        const sha = await readRef(bucket, owner, repo, refName)
        if (sha) allRefs.set(refName, sha)
      }
    }
  }

  return allRefs
}

export async function handleInfoRefs(
  request: Request,
  bucket: R2Bucket,
  owner: string,
  repo: string
): Promise<Response> {
  const url = new URL(request.url)
  const service = url.searchParams.get('service')

  if (service !== 'git-upload-pack' && service !== 'git-receive-pack') {
    return new Response('Invalid service', { status: 400 })
  }

  const allRefs = await collectRefs(bucket, owner, repo)

  let body = ''
  body += pktLine(`# service=${service}\n`)
  body += FLUSH

  const refs = Array.from(allRefs.entries())
  // Capabilities advertised for this server.
  // report-status must be included so git send-pack reads the per-ref result
  // lines we send inside sideband band 1 (omitting it causes git to drop the
  // sideband output pipe and the demultiplexer fails writing to it).
  const CAPS = 'side-band side-band-64k ofs-delta report-status delete-refs'

  if (refs.length === 0) {
    const nullSha = '0'.repeat(40)
    const caps = 'capabilities^{}'
    body += pktLine(`${nullSha} ${caps}\0${CAPS}\n`)
  } else {
    let first = true
    for (const [refName, sha] of refs) {
      if (first) {
        body += pktLine(`${sha} ${refName}\0${CAPS}\n`)
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
