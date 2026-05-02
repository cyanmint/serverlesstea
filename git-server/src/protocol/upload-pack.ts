import { Env } from '../index'

export async function handleUploadPack(
  request: Request,
  _env: Env,
  _owner: string,
  _repo: string
): Promise<Response> {
  const body = await request.arrayBuffer()
  const text = new TextDecoder().decode(body)

  const wants: string[] = []
  for (const line of text.split('\n')) {
    if (line.includes('want ')) {
      const sha = line.split('want ')[1]?.slice(0, 40)
      if (sha) wants.push(sha)
    }
  }

  // TODO: serve requested objects from R2; for now NAK with an empty pack
  void wants

  const nak = '0008NAK\n'

  // Minimal valid Git pack file: magic "PACK" + version 2 + 0 objects + SHA-1 of empty pack
  const packHeader = new Uint8Array([
    0x50, 0x41, 0x43, 0x4b, // "PACK"
    0x00, 0x00, 0x00, 0x02, // version 2
    0x00, 0x00, 0x00, 0x00, // 0 objects
    // SHA-1 checksum of the above 12 bytes (empty pack checksum)
    0x02, 0x9d, 0x08, 0x82, 0x3b, 0xd8, 0xa8, 0xea,
    0xb5, 0x10, 0xad, 0x6a, 0xc7, 0x5c, 0x82, 0x3c,
    0xfd, 0x3e, 0xd3, 0x1e,
  ])

  const nakBytes = new TextEncoder().encode(nak)
  const response = new Uint8Array(nakBytes.length + packHeader.length)
  response.set(nakBytes)
  response.set(packHeader, nakBytes.length)

  return new Response(response, {
    status: 200,
    headers: { 'Content-Type': 'application/x-git-upload-pack-result' },
  })
}
