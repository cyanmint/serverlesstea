import { useEffect, useState } from 'react'
import { getNotifications, markNotificationRead, Notification as Notif } from '../../../api/client'

export default function Notification() {
  const [notifications, setNotifications] = useState<Notif[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAll, setShowAll] = useState(false)

  function load() {
    setLoading(true)
    getNotifications(showAll ? undefined : false)
      .then((d) => setNotifications(d.notifications))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [showAll])

  async function markRead(id: string) {
    try {
      await markNotificationRead(id)
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: 1 } : n))
      )
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed')
    }
  }

  return (
    <div className="page-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Notifications</h1>
        <button className="btn btn-sm" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show Unread' : 'Show All'}
        </button>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="page-loading">Loading…</div>
      ) : notifications.length === 0 ? (
        <p className="empty-placeholder">No notifications.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((n) => (
            <li
              key={n.id}
              style={{
                padding: '0.75rem 0',
                borderBottom: '1px solid #e0e0e0',
                opacity: n.is_read ? 0.6 : 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <div style={{ fontWeight: n.is_read ? 'normal' : 'bold' }}>{n.subject_title}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  {n.subject_type} · {new Date(n.created_at).toLocaleDateString()}
                </div>
              </div>
              {!n.is_read && (
                <button className="btn btn-sm" onClick={() => markRead(n.id)}>
                  Mark read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
