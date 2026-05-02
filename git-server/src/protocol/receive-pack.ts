import { Env } from '../index'
import { writeRef } from '../storage/r2'

function pktLine(data: string): string {
  const len = data.length + 4
  return len.toString(16).padStart(4, '0') + data
}

export async function handleReceivePack(
  request: Request,
  env: Env,
  owner: string,
  repo: string
): Promise<Response> {
  const body = await request.arrayBuffer()
  let offset = 0

  const updates: Array<{ oldSha: string; newSha: string; refName: string }> = []

  while (offset < body.byteLength) {
    if (offset + 4 > body.byteLength) break
    const lenHex = new TextDecoder().decode(new Uint8Array(body, offset, 4))
    const len = parseInt(lenHex, 16)
    offset += 4

    if (len === 0) break
    if (len <= 4) continue

    const data = new TextDecoder().decode(new Uint8Array(body, offset, len - 4))
    offset += len - 4

    const nullIdx = data.indexOf('\0')
    const refLine = nullIdx !== -1 ? data.slice(0, nullIdx) : data.trimEnd()
    const parts = refLine.split(' ')
    if (parts.length >= 3) {
      updates.push({ oldSha: parts[0], newSha: parts[1], refName: parts[2] })
    }
  }

  for (const update of updates) {
    const zeroSha = '0'.repeat(40)
    if (update.newSha !== zeroSha) {
      await writeRef(env.GIT_BUCKET, owner, repo, update.refName, update.newSha)
    }
  }

  let responseBody = pktLine('unpack ok\n')
  for (const update of updates) {
    responseBody += pktLine(`ok ${update.refName}\n`)
  }
  responseBody += '0000'

  return new Response(responseBody, {
    status: 200,
    headers: { 'Content-Type': 'application/x-git-receive-pack-result' },
  })
}
