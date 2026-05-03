import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Fork(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository">
	{/* template: repo/header */}
	<div className="ui container">
		{/* alert */}
		<form className="ui form form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`${String(props.repoLink ?? "")}/_fork/${String(props.branchName | PathEscapeSegments ?? "")}`}>
			<div className="tw-text-center">
				<div className="tw-my-[40px]">
					<h3>{i18n("repo.editor.fork_create")}</h3>
					<p>{i18n("repo.editor.fork_create_description")}</p>
				</div>
				<button className="ui primary button">{i18n("repo.fork_repo")}</button>
			</div>
		</form>
	</div>
</div>


  </>)
}
