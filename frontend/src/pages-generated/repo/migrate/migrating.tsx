import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Migrating(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository">
	{/* template: repo/header */}
	<div className="ui container">
		<div className="ui grid">
			<div className="sixteen wide column content">
				{/* alert */}
				<div className="home">
					<div className="ui stackable middle very relaxed page grid">
						<div id="repo_migrating" className="sixteen wide tw-text-center centered column" data-migrating-repo-link={String(props.link ?? "")}>
							<div>
								<img alt src={`/img/loading.png`} />
							</div>
						</div>
						<div id="repo_migrating_failed_image" className="sixteen wide tw-text-center centered column tw-hidden">
							<div>
								<img alt src={`/img/failed.png`} />
							</div>
						</div>
					</div>
					<div className="ui stackable middle very relaxed page grid">
						<div className="sixteen wide tw-text-center centered column">
							<div id="repo_migrating_progress">
								<p>{i18n("repo.migrate.migrating")}</p>
								<p id="repo_migrating_progress_message"></p>
							</div>
							<div id="repo_migrating_failed" className="tw-hidden">
								{(props.cloneAddr) ? (<>
									<p>{i18n("repo.migrate.migrating_failed")}</p>
								</>) : (<>
									<p>{i18n("repo.migrate.migrating_failed_no_addr")}</p>
								</>)}
								<p id="repo_migrating_failed_error"></p>
							</div>
							{(props.permission?.isAdmin) ? (<>
								<div className="divider"></div>
								<div className="item">
									{(props.failed) ? (<>
										<button className="ui basic red show-modal button" data-modal="#delete-repo-modal">{i18n("repo.settings.delete")}</button>
									</>) : (<>
										<button className="ui basic show-modal button" data-modal="#cancel-repo-modal">{i18n("cancel")}</button>
									</>)}
									<button id="repo_migrating_retry" data-migrating-task-retry-url={`${String(props.link ?? "")}/settings/migrate/retry`} className="ui basic button tw-hidden">{i18n("retry")}</button>
								</div>
							</>) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div className="ui small modal" id="delete-repo-modal">
	<div className="header">
		{i18n("repo.settings.delete")}
	</div>
	<div className="content">
		<div className="ui warning message">
			{i18n("repo.settings.delete_notices_1")}<br />
			{i18n("repo.settings.delete_notices_2")}
			{(props.repository?.numForks) ? (<><br />
			{i18n("repo.settings.delete_notices_fork_1")}
			</>) : null}
		</div>
		<form className="ui form" action={`${String(props.link ?? "")}/settings`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<input type="hidden" name="action" value="delete" />
			<div className="field">
				<label>
					{i18n("repo.settings.enter_repo_name_to_confirm")}
					<span className="tw-text-red">{props.repository?.name as any}</span>
				</label>
			</div>
			<div className="required field">
				<label>{i18n("repo.repo_name")}</label>
				<input name="repo_name" required />
			</div>

			<div className="actions">
				<button className="ui cancel button">{i18n("settings.cancel")}</button>
				<button className="ui red button">{i18n("repo.settings.confirm_delete")}</button>
			</div>
		</form>
	</div>
</div>

<div className="ui g-modal-confirm modal" id="cancel-repo-modal">
	<div className="header">
		{i18n("repo.migrate.cancel_migrating_title")}
	</div>
	<form action={`${String(props.link ?? "")}/settings/migrate/cancel`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className="content">
			{i18n("repo.migrate.cancel_migrating_confirm")}
		</div>
		{/* template: base/modal_actions_confirm */}
	</form>
</div>



  </>)
}
