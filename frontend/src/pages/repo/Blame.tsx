import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlob } from '../../api/client'
import RepoHeader from '../../components/RepoHeader'

export default function Blame() {
  const { username, repo, ref, '*': filePath } = useParams<{ username: string; repo: string; ref: string; '*': string }>()
  const [content, setContent] = useState<string[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo || !ref || !filePath) return
    getBlob(username, repo, ref, filePath)
      .then((data) => setContent(data.content.split('\n')))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
  }, [username, repo, ref, filePath])

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Blame: {filePath}</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {content.length > 0 && (
          <table className="blame-table" style={{ fontFamily: 'monospace', fontSize: '0.85rem', width: '100%' }}>
            <tbody>
              {content.map((line, i) => (
                <tr key={i}>
                  <td style={{ padding: '0 1rem', color: '#888', userSelect: 'none', textAlign: 'right' }}>{i + 1}</td>
                  <td style={{ whiteSpace: 'pre' }}>{line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
