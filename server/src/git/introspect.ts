import git from 'isomorphic-git'
import { createR2Fs } from './r2fs'

type FsType = Parameters<typeof git.resolveRef>[0]['fs']

function makeFs(bucket: R2Bucket, owner: string, repo: string): { fs: FsType; gitdir: string } {
  return {
    fs: createR2Fs(bucket, owner, repo) as unknown as FsType,
    gitdir: `/${owner}/${repo}.git`,
  }
}

export async function listFiles(
  owner: string,
  repo: string,
  ref: string,
  bucket: R2Bucket
): Promise<Array<{ path: string; type: string; oid: string }>> {
  const { fs, gitdir } = makeFs(bucket, owner, repo)
  const files = await git.listFiles({ fs, gitdir, ref })
  return files.map((f) => ({ path: f, type: 'blob', oid: '' }))
}

export async function readBlob(
  owner: string,
  repo: string,
  ref: string,
  filepath: string,
  bucket: R2Bucket
): Promise<string> {
  const { fs, gitdir } = makeFs(bucket, owner, repo)
  // ref may be a branch name or tag — resolve it to a commit SHA first, since
  // git.readBlob expects an object OID, not a symbolic ref.
  const oid = await git.resolveRef({ fs, gitdir, ref })
  const result = await git.readBlob({ fs, gitdir, oid, filepath })
  return new TextDecoder().decode(result.blob)
}

export interface DirEntry {
  name: string
  path: string
  type: 'file' | 'dir'
  sha: string
}

/**
 * List the immediate children of a directory inside a git repository.
 * `dirpath` is the path relative to the repo root, or `''` for the root tree.
 */
export async function listDirectory(
  owner: string,
  repo: string,
  ref: string,
  dirpath: string,
  bucket: R2Bucket
): Promise<DirEntry[]> {
  const { fs, gitdir } = makeFs(bucket, owner, repo)
  const commitSha = await git.resolveRef({ fs, gitdir, ref })
  const commitObj = await git.readCommit({ fs, gitdir, oid: commitSha })
  let treeSha = commitObj.commit.tree

  // Walk down the path components to reach the target subdirectory.
  if (dirpath) {
    for (const part of dirpath.split('/').filter(Boolean)) {
      const { tree } = await git.readTree({ fs, gitdir, oid: treeSha })
      const entry = tree.find((e) => e.path === part)
      if (!entry) throw Object.assign(new Error(`ENOENT: ${dirpath}`), { code: 'ENOENT' })
      if (entry.type !== 'tree') throw Object.assign(new Error(`ENOTDIR: ${dirpath}`), { code: 'ENOTDIR' })
      treeSha = entry.oid
    }
  }

  const { tree } = await git.readTree({ fs, gitdir, oid: treeSha })
  return tree.map((entry) => ({
    name: entry.path,
    path: dirpath ? `${dirpath}/${entry.path}` : entry.path,
    type: entry.type === 'tree' ? 'dir' : 'file',
    sha: entry.oid,
  }))
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
