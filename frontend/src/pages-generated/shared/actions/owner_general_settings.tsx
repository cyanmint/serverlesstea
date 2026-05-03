// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function OwnerGeneralSettings(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("actions.general.cross_repo")}
</h4>
<div className="ui attached segment">
	<form className="ui form form-fetch-action " action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		{/* Cross-Repository Access */}
		<div className="help">{i18n("actions.general.cross_repo_desc")}</div>

		{/* Allowed Repositories List */}
		<div className="field tw-mt-4">
			<h5 className="ui header">
				{i18n("actions.general.cross_repo_target_repos")}
			</h5>
			<div className="ui attached segment tw-p-2">
				<div className="ui divided relaxed list flex-items-block muted-links">
					{((props.allowedRepos) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item">
						{/* template: repo/icon */}
						<a className="tw-flex-1" href={String("" ?? "")}>{/* TODO: {{$repo.FullName}} */}</a>
						<button className="ui red compact tiny button link-action" type="button" data-url={`?cross_repo_remove_target_id=`}>{i18n("remove")}</button>
					</div>
					{/* else */}
					<div className="item">
						{i18n("org.repos.none")}
					</div>
					</React.Fragment>))}
				</div>
			</div>

			<h5 className="ui header">
				{i18n("actions.general.cross_repo_add")}
			</h5>
			<div className="flex-text-block">
				<div data-global-init="initSearchRepoBox" data-uid={String(props.ownerID ?? "")} data-exclusive="true" className="ui search tw-flex-1">
					<div className="ui input">
						<input className="prompt" name="cross_repo_add_target_name" required placeholder={String(i18n("search.repo_kind") ?? "")} autocomplete="off" />
					</div>
				</div>
				<button className="ui primary button" type="submit" name="cross_repo_add_target" value="true">{i18n("add")}</button>
			</div>
		</div>
	</form>
</div>

<h4 className="ui top attached header">
	{i18n("actions.general.permissions")}
</h4>
<div className="ui attached segment">
	<form className="ui form form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} data-global-init="initOwnerActionsPermissionsForm">
		{/* template: shared/actions/permission_mode_select */}
		<div className="divider"></div>
		{/* template: shared/actions/permissions_table */}

		<div className="field">
			<button className="ui primary button">{i18n("repo.settings.update_settings")}</button>
		</div>
	</form>
</div>

  </>)
}
