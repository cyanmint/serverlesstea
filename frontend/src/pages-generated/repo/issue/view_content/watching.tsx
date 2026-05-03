import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Watching(props: Record<string, unknown>) {
  return (<>
<button className="fluid ui button" type="button" data-fetch-method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} data-fetch-url={`${String(props.issue?.link ?? "")}/watch?watch=`}>
	{(props.issueWatch?.isWatching) ? (<>
		<span className="svg-icon" aria-label="octicon-mute"></span> {i18n("repo.issues.unsubscribe")}
	</>) : (<>
		<span className="svg-icon" aria-label="octicon-unmute"></span> {i18n("repo.issues.subscribe")}
	</>)}
</button>

  </>)
}
