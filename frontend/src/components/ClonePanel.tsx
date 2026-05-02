import { useState } from 'react'

interface ClonePanelProps {
  owner: string
  repo: string
}

export default function ClonePanel({ owner, repo }: ClonePanelProps) {
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState<'https' | 'ssh'>('https')

  const origin = window.location.origin.replace(/\?.*$/, '')
  const httpsUrl = `${origin}/git/${owner}/${repo}.git`
  const sshUrl = `git@${new URL(origin).hostname}:${owner}/${repo}.git`

  const url = tab === 'https' ? httpsUrl : sshUrl

  function copy() {
    navigator.clipboard.writeText(url).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="clone-panel">
      <div className="clone-panel-header">
        <span className="clone-panel-title">Clone</span>
        <div className="clone-tab-group">
          <button
            className={`clone-tab${tab === 'https' ? ' active' : ''}`}
            onClick={() => setTab('https')}
          >
            HTTPS
          </button>
          <button
            className={`clone-tab${tab === 'ssh' ? ' active' : ''}`}
            onClick={() => setTab('ssh')}
          >
            SSH
          </button>
        </div>
      </div>
      <div className="clone-url-row">
        <input
          className="clone-url-input"
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
        />
        <button className="btn btn-sm clone-copy-btn" onClick={copy}>
          {copied ? '✓' : '📋'}
        </button>
      </div>
    </div>
  )
}
