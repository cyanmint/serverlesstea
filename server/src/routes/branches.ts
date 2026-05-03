import { Hono } from 'hono'
import { Env } from '../index'
import git from 'isomorphic-git'
import { createR2Fs } from '../git/r2fs'

const router = new Hono<{ Bindings: Env }>()

async function getRepoId(db: D1Database, owner: string, repo: string) {
  return db.prepare(`
    SELECT r.id FROM repositories r
    JOIN users u ON r.owner_id = u.id
    WHERE u.username = ? AND r.name = ?
  `).bind(owner, repo).first<{ id: string }>()
}

router.get('/:owner/:repo/branches', async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepoId(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    const branches = await git.listBranches({ fs: fs as unknown as Parameters<typeof git.listBranches>[0]['fs'], gitdir })
    const result = await Promise.all(branches.map(async (name) => {
      try {
        const sha = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: name })
        return { name, commit_sha: sha }
      } catch {
        return { name, commit_sha: '' }
      }
    }))
    return c.json({ branches: result })
  } catch {
    return c.json({ branches: [] })
  }
})

router.get('/:owner/:repo/tags', async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepoId(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    const tags = await git.listTags({ fs: fs as unknown as Parameters<typeof git.listTags>[0]['fs'], gitdir })
    const result = await Promise.all(tags.map(async (name) => {
      try {
        const sha = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: name })
        return { name, commit_sha: sha }
      } catch {
        return { name, commit_sha: '' }
      }
    }))
    return c.json({ tags: result })
  } catch {
    return c.json({ tags: [] })
  }
})

export default router
