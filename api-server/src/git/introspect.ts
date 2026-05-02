import git from 'isomorphic-git'
import { createR2Fs } from './r2fs'

export async function listFiles(
  owner: string,
  repo: string,
  ref: string,
  bucket: R2Bucket
): Promise<Array<{ path: string; type: string; oid: string }>> {
  const fs = createR2Fs(bucket, owner, repo)
  const dir = `/${owner}/${repo}.git`

  const files = await git.listFiles({ fs: fs as unknown as Parameters<typeof git.listFiles>[0]['fs'], gitdir: dir, ref })
  return files.map((f) => ({ path: f, type: 'blob', oid: '' }))
}

export async function readBlob(
  owner: string,
  repo: string,
  ref: string,
  filepath: string,
  bucket: R2Bucket
): Promise<string> {
  const fs = createR2Fs(bucket, owner, repo)
  const dir = `/${owner}/${repo}.git`

  const result = await git.readBlob({ fs: fs as unknown as Parameters<typeof git.readBlob>[0]['fs'], gitdir: dir, oid: ref, filepath })
  return new TextDecoder().decode(result.blob)
}

export async function listCommits(
  owner: string,
  repo: string,
  ref: string,
  bucket: R2Bucket
): Promise<Array<{ oid: string; message: string; author: { name: string; email: string; timestamp: number }; committer: { name: string; email: string; timestamp: number } }>> {
  const fs = createR2Fs(bucket, owner, repo)
  const dir = `/${owner}/${repo}.git`

  const commits = await git.log({ fs: fs as unknown as Parameters<typeof git.log>[0]['fs'], gitdir: dir, ref, depth: 50 })
  return commits.map((c) => ({
    oid: c.oid,
    message: c.commit.message,
    author: {
      name: c.commit.author.name,
      email: c.commit.author.email,
      timestamp: c.commit.author.timestamp,
    },
    committer: {
      name: c.commit.committer.name,
      email: c.commit.committer.email,
      timestamp: c.commit.committer.timestamp,
    },
  }))
}

export async function getCommitDiff(
  owner: string,
  repo: string,
  sha: string,
  bucket: R2Bucket
): Promise<Array<{ path: string; type: string }>> {
  const fs = createR2Fs(bucket, owner, repo)
  const dir = `/${owner}/${repo}.git`
  const fsTyped = fs as unknown as Parameters<typeof git.walk>[0]['fs']

  const commit = await git.readCommit({ fs: fsTyped, gitdir: dir, oid: sha })
  const parentOid = commit.commit.parent[0]

  if (!parentOid) {
    const files = await git.listFiles({ fs: fsTyped, gitdir: dir, ref: sha })
    return files.map((f) => ({ path: f, type: 'added' }))
  }

  const diff = await git.walk({
    fs: fsTyped,
    gitdir: dir,
    trees: [git.TREE({ ref: parentOid }), git.TREE({ ref: sha })],
    map: async (filepath, [A, B]) => {
      if (filepath === '.') return undefined
      const aOid = A ? await A.oid() : null
      const bOid = B ? await B.oid() : null
      if (aOid === bOid) return undefined
      if (!A) return { path: filepath, type: 'added' }
      if (!B) return { path: filepath, type: 'deleted' }
      return { path: filepath, type: 'modified' }
    },
  })

  return (diff as Array<{ path: string; type: string } | undefined>).filter(Boolean) as Array<{ path: string; type: string }>
}
