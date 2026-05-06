function pktLineBytes(data: Uint8Array): Uint8Array {
  const lenHex = (data.length + 4).toString(16).padStart(4, '0')
  const lenBytes = new TextEncoder().encode(lenHex)
  const out = new Uint8Array(lenBytes.length + data.length)
  out.set(lenBytes)
  out.set(data, lenBytes.length)
  return out
}

function pktLineStr(s: string): Uint8Array {
  return pktLineBytes(new TextEncoder().encode(s))
}

function concatArrays(arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((n, a) => n + a.length, 0)
  const out = new Uint8Array(total)
  let off = 0
  for (const a of arrays) {
    out.set(a, off)
    off += a.length
  }
  return out
}

// SHA-1 of the 12-byte empty-pack header (PACK + version 2 + 0 objects)
const EMPTY_PACK = new Uint8Array([
  0x50, 0x41, 0x43, 0x4b, // "PACK"
  0x00, 0x00, 0x00, 0x02, // version 2
  0x00, 0x00, 0x00, 0x00, // 0 objects
  0x02, 0x9d, 0x08, 0x82, 0x3b, 0xd8, 0xa8, 0xea, // SHA-1 checksum
  0xb5, 0x10, 0xad, 0x6a, 0xc7, 0x5c, 0x82, 0x3c,
  0xfd, 0x3e, 0xd3, 0x1e,
])

export async function handleUploadPack(
  request: Request,
  bucket: R2Bucket,
  owner: string,
  repo: string,
): Promise<Response> {
  const body = await request.arrayBuffer()
  const bodyBytes = new Uint8Array(body)

  // Parse pkt-lines to find wants and detect sideband capability
  let useSideband = false
  const wants: string[] = []
  let off = 0

  while (off < bodyBytes.length) {
    if (off + 4 > bodyBytes.length) break
    const lenHex = new TextDecoder().decode(bodyBytes.subarray(off, off + 4))
    const len = parseInt(lenHex, 16)
    off += 4
    if (len === 0) break // flush pkt
    if (len <= 4) continue

    const line = new TextDecoder().decode(bodyBytes.subarray(off, off + len - 4))
    off += len - 4

    if (line.startsWith('want ')) {
      const sha = line.slice(5, 45)
      wants.push(sha)
      if (wants.length === 1) {
        // First want line carries capabilities after NUL
        const nullIdx = line.indexOf('\0')
        if (nullIdx !== -1) {
          const caps = line.slice(nullIdx + 1)
          useSideband = caps.includes('side-band-64k') || caps.includes('side-band')
        }
      }
    }
  }

  const nakLine = pktLineStr('NAK\n')
  const flushLine = new TextEncoder().encode('0000')

  // Try to serve real pack data from R2
  const packPrefix = `${owner}/${repo}.git/objects/pack/`
  const listed = await bucket.list({ prefix: packPrefix })
  const packKeys = listed.objects.filter((o) => o.key.endsWith('.pack'))

  let packData: Uint8Array
  if (packKeys.length > 0 && wants.length > 0) {
    // Serve the most recently pushed pack (last by name is fine for a single-push repo)
    const packObj = await bucket.get(packKeys[packKeys.length - 1].key)
    packData = packObj ? new Uint8Array(await packObj.arrayBuffer()) : EMPTY_PACK
  } else {
    packData = EMPTY_PACK
  }

  const parts: Uint8Array[] = [nakLine]

  if (useSideband) {
    // Wrap pack data in sideband pkt-lines (band 0x01 = pack data)
    const MAX_CHUNK = 65515 // 65519 max pkt-line data minus 1 band byte = 65518, but stay safe
    let dataOff = 0
    while (dataOff < packData.length) {
      const end = Math.min(dataOff + MAX_CHUNK, packData.length)
      const chunk = packData.subarray(dataOff, end)
      dataOff = end
      const banded = new Uint8Array(1 + chunk.length)
      banded[0] = 0x01 // band 1: pack data
      banded.set(chunk, 1)
      parts.push(pktLineBytes(banded))
    }
    parts.push(flushLine)
  } else {
    // No sideband: NAK followed by raw pack bytes
    parts.push(packData)
  }

  return new Response(concatArrays(parts), {
    status: 200,
    headers: { 'Content-Type': 'application/x-git-upload-pack-result' },
  })
}
