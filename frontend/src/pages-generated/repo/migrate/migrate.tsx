// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Migrate(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository new migrate">
	<div className="ui middle very relaxed page grid">
		<div className="column">
			{/* template: repo/migrate/helper */}
			<div className="ui cards migrate-entries">
				{((props.services) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<a className="ui card migrate-entry flex-text-block" href={`/repo/migrate?service_type=&org=${String(props.org ?? "")}&mirror=${String(props.mirror ?? "")}`}>
						{(item.name === "github") ? (<>
							<span className="svg-icon" aria-label="octicon-mark-github"></span>
						</>) : null} {(item.name === "gitlab") ? (<>
							<span className="svg-icon" aria-label="gitea-gitlab"></span>
						</>) : null} {(item.name === "gitbucket") ? (<>
							<span className="svg-icon" aria-label="gitea-gitbucket"></span>
						</>) : (<>
							{/* TODO: {{svg (printf "gitea-%s" .Name) 184}} */}
						</>)}
						<div className="content">
							<div className="header tw-text-center">
								{item.title as any}
							</div>
							<div className="description tw-text-center tw-text-balance">
								{/* TODO: {{ctx.Locale.Tr (printf "repo.migrate.%s.description" .Name)}} */}
							</div>
						</div>
					</a>
				</React.Fragment>))}
			</div>
		</div>
	</div>
</div>


  </>)
}
