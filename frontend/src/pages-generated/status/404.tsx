// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function 404(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className={`page-content ${(props.isRepo) ? `repository` : ""}`}>
	{(props.isRepo) ? (<>{/* template: repo/header */}</>) : null}
	<div className="ui container">
		{/* alert */}
		<div className="status-page-error">
			<div className="status-page-error-title">404 Not Found</div>
			<div className="tw-text-center">
				<div className="tw-my-4">{(props.notFoundPrompt) ? (<>{props.notFoundPrompt as any}</>) : (<>{i18n("error404")}</>)}</div>
				{(props.notFoundGoBackURL) ? (<>
					<a className="tw-block tw-my-4" href={String(props.notFoundGoBackURL ?? "")}>{i18n("go_back")}</a>
				</>) : null}
			</div>
		</div>
	</div>
</div>


  </>)
}
