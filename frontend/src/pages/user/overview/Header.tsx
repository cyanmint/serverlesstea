interface Props { username: string }
export default function OverviewHeader({ username }: Props) {
  return <div className="overview-header"><h2>{username}</h2></div>
}
