// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function FollowUnfollow(props: Record<string, unknown>) {
  return (<>
<button className="ui basic button" data-fetch-method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} data-fetch-url={`${String(props.org?.homeLink ?? "")}?action=${(props.isFollowing) ? `unfollow` : `follow`}`}>
	{(props.isFollowing) ? (<>
		{i18n("user.unfollow")}
	</>) : (<>
		{i18n("user.follow")}
	</>)}
</button>

  </>)
}
