import { useParams } from 'react-router-dom'

export default function OrgHeader() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="org-header">
      <h2>{org}</h2>
    </div>
  )
}
