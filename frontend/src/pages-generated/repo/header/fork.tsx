// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Fork(props: Record<string, unknown>) {
  return (<>
{/* $canNotForkOwn */}
<div className="ui labeled button"
	{...(!(props.isSigned) ? {"data-tooltip-content": String(i18n("repo.fork_guest_user") ?? "")} : {})} {...(props.canNotForkOwn ? {"data-tooltip-content": String(i18n("repo.fork_from_self") ?? "")} : {})}
>
	<a role="button" className={`ui compact small basic button ${(props.showForkModal) ? `show-modal` : ""}`}
		{...(!(props.isSigned) ? {"href": `/user/login`} : {})} {(props.showForkModal) ? (<>{/* see backend comment for this logic */}
			href="#" data-modal="#fork-repo-modal"
		</>) : null} {...("len $.UserAndOrgForks" === 1 ? {"href": `/`} : {})} {(props.canNotForkOwn) ? (<>
			href="#"
		</>) : (<>
			href={`${String(props.repoLink ?? "")}/fork`}
		</>)}
	>
		<span className="svg-icon" aria-label="octicon-repo-forked"></span><span className="text not-mobile">{i18n("repo.fork")}</span>
	</a>
	<a className="ui basic label" href={`${String(props.repository?.link ?? "")}/forks`}>
		{/* TODO: {{CountFmt $.Repository.NumForks}} */}
	</a>
</div>
{(props.showForkModal) ? (<>
<div className="ui small modal" id="fork-repo-modal">
	<div className="header">
		{i18n("repo.already_forked")}
	</div>
	<div className="content">
		<div className="ui relaxed list">
			{((props.userAndOrgForks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item">
					<a className="flex-text-block" href={String(props.link ?? "")}><span className="svg-icon" aria-label="octicon-repo-forked"></span>{item.fullName as any}</a>
				</div>
			</React.Fragment>))}
		</div>
		{(props.canSignedUserFork) ? (<>
		<div className="divider"></div>
		<a href={`${String(props.repoLink ?? "")}/fork`}>{i18n("repo.fork_to_different_account")}</a>
		</>) : null}
	</div>
</div>
</>) : null}

  </>)
}
