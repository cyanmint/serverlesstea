import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Watch(props: Record<string, unknown>) {
  return (<>
<div className="ui labeled button" {(!(props.isSigned)) ? (<>data-tooltip-content={String(i18n("repo.watch_guest_user") ?? "")}</>) : null}>
	{/* $buttonText */}
	{(props.isWatchingRepo) ? (<>{/* TODO: {{$buttonText = ctx.Locale.Tr "repo.unwatch"}} */}</>) : null}
	<a role="button" className="ui compact small basic button" aria-label={String("" ?? "")}
		{(props.isSigned) ? (<>
			data-fetch-method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}
			data-fetch-url={`${String(props.repoLink ?? "")}/action/${(props.isWatchingRepo) ? `unwatch` : `watch`}`}
			data-fetch-sync="$closest(.ui.labeled.button)"
		</>) : (<>
			href={`/user/login`}
		</>)}
	>
		<span className="svg-icon" aria-label="octicon-eye"></span>
		<span className="not-mobile" aria-hidden="true">{/* $buttonText */}</span>
	</a>
	<a className="ui basic label" href={`${String(props.repoLink ?? "")}/watchers`}>
		{/* TODO: {{CountFmt .Repository.NumWatches}} */}
	</a>
</div>

  </>)
}
