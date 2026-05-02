export async function readObject(
  bucket: R2Bucket,
  owner: string,
  repo: string,
  sha: string
): Promise<Uint8Array | null> {
  const dir = sha.slice(0, 2)
  const file = sha.slice(2)
  const key = `${owner}/${repo}.git/objects/${dir}/${file}`
  const obj = await bucket.get(key)
  if (!obj) return null
  return new Uint8Array(await obj.arrayBuffer())
}

export async function writeObject(
  bucket: R2Bucket,
  owner: string,
  repo: string,
  sha: string,
  data: Uint8Array
): Promise<void> {
  const dir = sha.slice(0, 2)
  const file = sha.slice(2)
  const key = `${owner}/${repo}.git/objects/${dir}/${file}`
  await bucket.put(key, data)
}

export async function readRef(
  bucket: R2Bucket,
  owner: string,
  repo: string,
  refName: string
): Promise<string | null> {
  const key = `${owner}/${repo}.git/${refName}`
  const obj = await bucket.get(key)
  if (!obj) return null
  const text = await obj.text()
  return text.trim()
}

export async function writeRef(
  bucket: R2Bucket,
  owner: string,
  repo: string,
  refName: string,
  sha: string
): Promise<void> {
  const key = `${owner}/${repo}.git/${refName}`
  await bucket.put(key, sha + '\n')
}

export async function readPackedRefs(
  bucket: R2Bucket,
  owner: string,
  repo: string
): Promise<Map<string, string>> {
  const key = `${owner}/${repo}.git/packed-refs`
  const obj = await bucket.get(key)
  const refs = new Map<string, string>()
  if (!obj) return refs

  const text = await obj.text()
  for (const line of text.split('\n')) {
    if (!line || line.startsWith('#') || line.startsWith('^')) continue
    const parts = line.split(' ')
    if (parts.length >= 2) {
      refs.set(parts[1].trim(), parts[0].trim())
    }
  }
  return refs
}
