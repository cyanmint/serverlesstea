import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Star(props: Record<string, unknown>) {
  return (<>
<div className="ui labeled button" {...(!(props.isSigned) ? {"data-tooltip-content": String(i18n("repo.star_guest_user") ?? "")} : {})}>
	{/* $buttonText */}
	{(props.isStaringRepo) ? (<>{/* TODO: {{$buttonText = ctx.Locale.Tr "repo.unstar"}} */}</>) : null}
	<a role="button" className="ui compact small basic button" aria-label={String("" ?? "")}
		{(props.isSigned) ? (<>
			data-fetch-method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}
			data-fetch-url={`${String(props.repoLink ?? "")}/action/${(props.isStaringRepo) ? `unstar` : `star`}`}
			data-fetch-sync="$closest(.ui.labeled.button)"
		</>) : (<>
			href={`/user/login`}
		</>)}
	>
		{/* TODO: {{svg (Iif $.IsStaringRepo "octicon-star-fill" "octicon-star")}} */}
		<span className="not-mobile" aria-hidden="true">{props.buttonText as any}</span>
	</a>
	<a className="ui basic label" href={`${String(props.repoLink ?? "")}/stars`}>
		{/* TODO: {{CountFmt .Repository.NumStars}} */}
	</a>
</div>

  </>)
}
