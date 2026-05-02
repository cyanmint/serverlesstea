import { Link } from 'react-router-dom'

interface Props {
  repos: Array<{ name: string; owner: string }>
}

export default function Repolist({ repos }: Props) {
  if (!repos || repos.length === 0) return <p>No repositories.</p>
  return (
    <ul>
      {repos.map((r) => (
        <li key={`${r.owner}/${r.name}`}>
          <Link to={`/${r.owner}/${r.name}`}>{r.owner}/{r.name}</Link>
        </li>
      ))}
    </ul>
  )
}
