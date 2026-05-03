// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function RunnerList(props: Record<string, unknown>) {
  return (<>
<div className="runner-container">

	<h4 className="ui top attached header">
		{i18n("actions.runners.runner_manage_panel")} ({i18n("admin.total")})
		<div className="ui right">
			<div className="ui top right pointing dropdown jump">
				<button className="ui primary tiny button">
					{i18n("actions.runners.new")}
					<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				</button>
				<div className="menu">
					<div className="item">
						<a href="https://docs.gitea.com/usage/actions/act-runner">{i18n("actions.runners.new_notice")}</a>
					</div>
					<div className="divider"></div>
					<div className="header">
						Registration Token
					</div>
					<div className="ui action input">
						<input type="text" value={String(props.registrationToken ?? "")} readonly />
						<button className="ui basic label button" aria-label={String(i18n("copy") ?? "")} data-clipboard-text={String(props.registrationToken ?? "")}>
							<span className="svg-icon" aria-label="octicon-copy"></span>
						</button>
					</div>
					<div className="divider"></div>
					<div className="item">
						<a className="link-action" data-url={`${String(props.link ?? "")}/reset_registration_token`}
							data-modal-confirm={String(i18n("actions.runners.reset_registration_token_confirm") ?? "")}
						>
							{i18n("actions.runners.reset_registration_token")}
						</a>
					</div>
				</div>
			</div>

		</div>
	</h4>
	<div className="ui attached segment">
		<form className="ui form ignore-dirty" id="user-list-search-form" action={String(props.link ?? "")}>
			{/* template: shared/search/combo */}
		</form>
	</div>
	<div className="ui attached table segment">
		<table className="ui very basic table unstackable">
			<thead>
				<tr>
					<th data-sortt-asc="online" data-sortt-desc="offline">
						{i18n("actions.runners.status")}
						{/* TODO: {{SortArrow "online" "offline" .SortType false}} */}
					</th>
					<th data-sortt-asc="newest" data-sortt-desc="oldest">
						{i18n("actions.runners.id")}
						{/* TODO: {{SortArrow "oldest" "newest" .SortType false}} */}
					</th>
					<th data-sortt-asc="alphabetically" data-sortt-desc="reversealphabetically">
						{i18n("actions.runners.name")}
						{/* TODO: {{SortArrow "alphabetically" "reversealphabetically" .SortType false}} */}
					</th>
					<th>{i18n("actions.runners.version")}</th>
					<th>{i18n("actions.runners.owner_type")}</th>
					<th>{i18n("actions.runners.labels")}</th>
					<th>{i18n("actions.runners.last_online")}</th>
					<th>{i18n("edit")}</th>
				</tr>
			</thead>
			<tbody>
				{((props.runners) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<tr>
						<td>
							<span className={`ui label ${(props.isOnline) ? `green` : ""}`}>{item.statusLocaleName?.("ctx.Locale") as any}</span>
							{(item.isDisabled) ? (<><span className="ui grey label">{i18n("actions.runners.disabled")}</span></>) : null}
						</td>
						<td>{item.iD as any}</td>
						<td><p data-tooltip-content={String(props.description ?? "")}>{item.name as any}</p></td>
						<td>{(item.version) ? (<>{item.version as any}</>) : (<>{i18n("unknown")}</>)}</td>
						<td><span data-tooltip-content={String(props.belongsToOwnerName ?? "")}>{item.belongsToOwnerType?.localeString?.("ctx.Locale") as any}</span></td>
						<td>
							<span className="flex-text-inline tw-flex-wrap">{((item.agentLabels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><span className="ui label">{item as any}</span></React.Fragment>))}</span>
						</td>
						<td>{(item.lastOnline) ? (<>{/* TODO: {{DateUtils.TimeSince .LastOnline}} */}</>) : (<>{i18n("never")}</>)}</td>
						<td>
							{(item.editableInContext?.(props.runnerOwnerID, props.runnerRepoID)) ? (<>
								<a href={`${String(props.link ?? "")}/${String(props.iD ?? "")}`}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
							</>) : null}
						</td>
					</tr>
				{/* else */}
					<tr>
						<td className="tw-text-center" colSpan="8">{i18n("actions.runners.none")}</td>
					</tr>
				</React.Fragment>))}
			</tbody>
		</table>
	</div>

	{/* template: base/paginate */}

</div>

  </>)
}
