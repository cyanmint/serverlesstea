import { writeRef, readRef } from '../storage/r2'
import { createR2Fs } from '../r2fs'
import git from 'isomorphic-git'

// Build a pkt-line from raw bytes.
function pktLineBytes(content: Uint8Array): Uint8Array {
  const len = content.length + 4
  const header = new TextEncoder().encode(len.toString(16).padStart(4, '0'))
  const out = new Uint8Array(header.length + content.length)
  out.set(header)
  out.set(content, header.length)
  return out
}

// Build a pkt-line from a string.
function pktLineStr(text: string): Uint8Array {
  return pktLineBytes(new TextEncoder().encode(text))
}

// Wrap content in a sideband-1 outer pkt-line.
// git's receive_status() reads pkt-line-formatted data from the band-1 pipe,
// so the content passed here must already be a formatted inner pkt-line.
function sidebandPkt(innerContent: Uint8Array): Uint8Array {
  const withBand = new Uint8Array(1 + innerContent.length)
  withBand[0] = 0x01 // band 1
  withBand.set(innerContent, 1)
  return pktLineBytes(withBand)
}

function concatArrays(arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((n, a) => n + a.length, 0)
  const out = new Uint8Array(total)
  let off = 0
  for (const a of arrays) { out.set(a, off); off += a.length }
  return out
}

export async function handleReceivePack(
  request: Request,
  bucket: R2Bucket,
  owner: string,
  repo: string
): Promise<Response> {
  const body = await request.arrayBuffer()
  let offset = 0

  let useSideband = false
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

    // First pkt-line carries capabilities after the NUL byte
    if (nullIdx !== -1 && updates.length === 0) {
      const caps = data.slice(nullIdx + 1)
      useSideband = caps.includes('side-band-64k') || caps.includes('side-band')
    }

    const parts = refLine.trim().split(' ')
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

      // Use .slice() to copy the pack data before writing so the stored bytes
      // are not a view into the larger request body buffer.
      await fs.promises.writeFile(`/${packFilepath}`, packData.slice())

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

  // Build response: each status line is an inner pkt-line, then wrapped in a sideband-1
  // outer pkt-line.  git's receive_status() uses packet_reader_read() on the band-1 pipe,
  // so the band-1 content must be pkt-line formatted, not raw text.
  const flushBytes = new TextEncoder().encode('0000')
  const parts: Uint8Array[] = []

  if (useSideband) {
    parts.push(sidebandPkt(pktLineStr('unpack ok\n')))
    for (const update of updates) {
      parts.push(sidebandPkt(pktLineStr(`ok ${update.refName}\n`)))
    }
    // Inner flush (0000) wrapped in sideband so the band-1 pkt-line reader sees EOF.
    parts.push(sidebandPkt(flushBytes))
    // Outer sideband flush — signals end of the sideband stream.
    parts.push(flushBytes)
  } else {
    parts.push(pktLineStr('unpack ok\n'))
    for (const update of updates) {
      parts.push(pktLineStr(`ok ${update.refName}\n`))
    }
    parts.push(flushBytes)
  }

  return new Response(concatArrays(parts), {
    status: 200,
    headers: { 'Content-Type': 'application/x-git-receive-pack-result' },
  })
}
