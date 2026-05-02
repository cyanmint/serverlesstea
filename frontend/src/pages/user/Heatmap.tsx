import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { listRepos, getCommits } from '../../api/client'

interface DayCount { [date: string]: number }

export default function UserHeatmap() {
  const { username } = useParams<{ username: string }>()
  const [dayCounts, setDayCounts] = useState<DayCount>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username) return
    listRepos()
      .then(async r => {
        const userRepos = r.repos.filter(repo => repo.owner_username === username && !repo.is_private)
        const map: DayCount = {}
        await Promise.all(userRepos.slice(0, 10).map(async repo => {
          try {
            const res = await getCommits(username, repo.name, 'HEAD')
            for (const c of res.commits) {
              const d = new Date(c.author.timestamp * 1000).toISOString().slice(0, 10)
              map[d] = (map[d] ?? 0) + 1
            }
          } catch { /* skip */ }
        }))
        setDayCounts(map)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [username])

  // Build last 52 weeks
  const weeks: Array<Array<{ date: string; count: number }>> = []
  const now = new Date(); now.setHours(0, 0, 0, 0)
  const end = new Date(now); end.setDate(now.getDate() - now.getDay())
  const start = new Date(end); start.setDate(end.getDate() - 51 * 7)
  const cur = new Date(start)
  while (cur <= end) {
    const week: Array<{ date: string; count: number }> = []
    for (let d = 0; d < 7; d++) {
      const ds = cur.toISOString().slice(0, 10)
      week.push({ date: ds, count: dayCounts[ds] ?? 0 })
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(week)
  }
  const maxCount = Math.max(...Object.values(dayCounts).map(Number), 1)
  const color = (c: number) => {
    if (c === 0) return 'var(--bg-secondary, #eee)'
    const intensity = Math.ceil((c / maxCount) * 4)
    const colors = ['#9be9a8', '#40c463', '#30a14e', '#216e39']
    return colors[intensity - 1]
  }

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>{username} – Activity Heatmap</h2>
      {loading && <div className="page-loading">Loading…</div>}
      {!loading && (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {week.map(day => (
                  <div key={day.date} title={`${day.date}: ${day.count} commit${day.count !== 1 ? 's' : ''}`}
                    style={{ width: '12px', height: '12px', borderRadius: '2px', background: color(day.count), cursor: 'default' }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
