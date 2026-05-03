// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Githooks(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		<h4 className="ui top attached header">
			{i18n("repo.settings.githooks")}
		</h4>
		<div className="ui attached segment">
			<div className="ui list flex-items-block">
				<div className="item"><span>{i18n("repo.settings.githooks_desc")}</span></div>
				{((props.hooks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item">
					<span className={`${(props.isActive) ? `tw-text-green` : `tw-text-text-light`}`}><span className="svg-icon" aria-label="octicon-dot-fill"></span></span>
					<span className="gt-ellipsis tw-flex-1">{item.name as any}</span>
					<a className="muted tw-p-2" href={`${String(props.repoLink ?? "")}/settings/hooks/git/${String(props.name|PathEscape ?? "")}`}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
				</div>
				</React.Fragment>))}
			</div>
		</div>
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
