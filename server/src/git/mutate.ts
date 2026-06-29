import git from 'isomorphic-git'
import { createR2Fs } from './r2fs'

type FsType = Parameters<typeof git.resolveRef>[0]['fs']

type TreeEntry = {
  mode: string
  path: string
  oid: string
  type: 'blob' | 'tree' | 'commit'
}

function makeFs(bucket: R2Bucket, owner: string, repo: string): { fs: FsType; gitdir: string } {
  return {
    fs: createR2Fs(bucket, owner, repo) as unknown as FsType,
    gitdir: `/${owner}/${repo}.git`,
  }
}

async function upsertBlobInTree(
  fs: FsType,
  gitdir: string,
  treeOid: string | null,
  parts: string[],
  blobOid: string,
): Promise<string> {
  const currentTree: TreeEntry[] = treeOid
    ? (await git.readTree({ fs, gitdir, oid: treeOid })).tree as unknown as TreeEntry[]
    : []
  const [head, ...tail] = parts
  if (!head) throw new Error('Invalid file path')

  if (tail.length === 0) {
    const filtered = currentTree.filter((e) => e.path !== head)
    filtered.push({ mode: '100644', path: head, oid: blobOid, type: 'blob' })
    filtered.sort((a, b) => a.path.localeCompare(b.path))
    return git.writeTree({ fs, gitdir, tree: filtered as unknown as Parameters<typeof git.writeTree>[0]['tree'] })
  }

  const existing = currentTree.find((e) => e.path === head && e.type === 'tree')
  const childOid = await upsertBlobInTree(fs, gitdir, existing?.oid ?? null, tail, blobOid)
  const filtered = currentTree.filter((e) => e.path !== head)
  filtered.push({ mode: '040000', path: head, oid: childOid, type: 'tree' })
  filtered.sort((a, b) => a.path.localeCompare(b.path))
  return git.writeTree({ fs, gitdir, tree: filtered as unknown as Parameters<typeof git.writeTree>[0]['tree'] })
}

export async function commitFileToBranch(
  owner: string,
  repo: string,
  bucket: R2Bucket,
  opts: {
    branch: string
    filePath: string
    contentBytes: Uint8Array
    message: string
    authorName: string
    authorEmail: string
  },
): Promise<{ commitSha: string; blobSha: string }> {
  const { fs, gitdir } = makeFs(bucket, owner, repo)
  const ref = `refs/heads/${opts.branch}`

  let parentCommit: string | null = null
  try {
    parentCommit = await git.resolveRef({ fs, gitdir, ref })
  } catch {
    parentCommit = null
  }

  const blobOid = await git.writeBlob({ fs, gitdir, blob: opts.contentBytes })

  let baseTree: string | null = null
  if (parentCommit) {
    const commitObj = await git.readCommit({ fs, gitdir, oid: parentCommit })
    baseTree = commitObj.commit.tree
  }

  const cleanPath = opts.filePath.replace(/^\/+/, '').replace(/\/+/g, '/')
  const parts = cleanPath.split('/').filter(Boolean)
  if (parts.length === 0) throw new Error('File path is required')

  const treeOid = await upsertBlobInTree(fs, gitdir, baseTree, parts, blobOid)
  const now = Math.floor(Date.now() / 1000)
  const commitSha = await git.writeCommit({
    fs,
    gitdir,
    commit: {
      tree: treeOid,
      parent: parentCommit ? [parentCommit] : [],
      author: {
        name: opts.authorName,
        email: opts.authorEmail,
        timestamp: now,
        timezoneOffset: 0,
      },
      committer: {
        name: opts.authorName,
        email: opts.authorEmail,
        timestamp: now,
        timezoneOffset: 0,
      },
      message: opts.message,
    },
  })

  await git.writeRef({ fs, gitdir, ref, value: commitSha, force: true })
  return { commitSha, blobSha: blobOid }
}
