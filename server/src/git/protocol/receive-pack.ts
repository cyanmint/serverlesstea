import { writeRef, readRef } from '../storage/r2'
import { createR2Fs } from '../r2fs'
import git from 'isomorphic-git'

function pktLine(data: string): string {
  const len = data.length + 4
  return len.toString(16).padStart(4, '0') + data
}

export async function handleReceivePack(
  request: Request,
  bucket: R2Bucket,
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

  // After the FLUSH, the remaining bytes are the git packfile.
  if (offset < body.byteLength) {
    const packData = new Uint8Array(body, offset)
    // Verify the PACK magic header.
    if (packData.length >= 20 && new TextDecoder().decode(packData.subarray(0, 4)) === 'PACK') {
      // The last 20 bytes of a packfile are its SHA-1 checksum — use that as the file name.
      const packSha = Array.from(packData.subarray(packData.length - 20))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')

      const fs = createR2Fs(bucket, owner, repo)
      const packFilepath = `${owner}/${repo}.git/objects/pack/pack-${packSha}.pack`

      // Write the pack file to R2.
      await fs.promises.writeFile(`/${packFilepath}`, packData)

      // Generate the .idx file so isomorphic-git can resolve objects.
      try {
        await git.indexPack({
          fs: fs as unknown as Parameters<typeof git.indexPack>[0]['fs'],
          dir: '/',
          gitdir: `/${owner}/${repo}.git`,
          filepath: packFilepath,
        })
      } catch (e) {
        console.error('indexPack failed:', e)
      }
    }
  }

  for (const update of updates) {
    const zeroSha = '0'.repeat(40)
    if (update.newSha !== zeroSha) {
      await writeRef(bucket, owner, repo, update.refName, update.newSha)
    }
  }

  // Set HEAD on first push to a branch if HEAD is not already initialised.
  const head = await readRef(bucket, owner, repo, 'HEAD')
  if (!head) {
    const firstBranch = updates.find((u) => u.refName.startsWith('refs/heads/'))
    if (firstBranch) {
      await bucket.put(`${owner}/${repo}.git/HEAD`, `ref: ${firstBranch.refName}\n`)
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
