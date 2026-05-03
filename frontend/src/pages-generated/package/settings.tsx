import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Settings(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className={`page-content package settings options${(props.contextUser?.isOrganization) ? ` organization` : ""}`}>
	{(props.contextUser?.isOrganization) ? (<>
		{/* template: org/header */}
	</>) : (<>
		{/* template: shared/user/org_profile_avatar */}
	</>)}
	<div className="ui container">
		{(!(props.contextUser?.isOrganization)) ? (<>
			{/* template: user/overview/header */}
		</>) : null}
		{/* alert */}
		<p><a href={String(props.packageDescriptor?.packageWebLink ?? "")}>{props.packageDescriptor?.package?.name as any}</a> / <strong>{i18n("repo.settings")}</strong></p>
		<h4 className="ui top attached header">
			{i18n("packages.settings.link")}
		</h4>
		<div className="ui attached segment">
			<p>{i18n("packages.settings.link.description")}</p>
			<form className="ui form form-fetch-action ignore-dirty flex-text-block" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" name="action" value="link" />
				<div data-global-init="initSearchRepoBox" className="ui search" data-uid={String(props.packageDescriptor?.owner?.iD ?? "")}>
					<div className="ui input">
						<input className="prompt" name="repo_name" value={String(props.linkedRepoName ?? "")} placeholder={String(i18n("search.repo_kind") ?? "")} autocomplete="off" />
					</div>
				</div>
				<button className="ui primary button">{i18n("packages.settings.link.button")}</button>
			</form>
		</div>
		<h4 className="ui top attached error header">
			{i18n("repo.settings.danger_zone")}
		</h4>
		<div className="ui attached error danger segment">
			<div className="flex-divided-list items-with-main">
				<div className="item">
					<div className="item-main">
						<div className="item-title">{i18n("packages.settings.delete")}</div>
						<div className="item-body">{i18n("packages.settings.delete.description")}</div>
					</div>
					<div className="item-trailing">
						<button className="ui basic red show-modal button" data-modal="#delete-package-modal">{i18n("packages.settings.delete")}</button>
					</div>
					<div className="ui tiny modal" id="delete-package-modal">
						<div className="header">
							{i18n("packages.settings.delete")}
						</div>
						<div className="content">
							<div className="ui warning message tw-break-anywhere">
								{i18n("packages.settings.delete.notice.package")}
							</div>
							<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
								<input type="hidden" name="action" value="delete" />
								<div className="field">
									<label>
										{i18n("packages.settings.delete.confirm")}
										<span className="tw-text-red">{props.packageDescriptor?.package?.name as any}</span>
									</label>
								</div>
								<div className="required field">
									<label>{i18n("packages.name")}</label>
									<input name="package_name" required maxlength="100" />
								</div>
								{/* template: base/modal_actions_confirm */}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


  </>)
}
