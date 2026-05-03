import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function IssueManagement(props: Record<string, unknown>) {
  return (<>
{((props.isRepoAdmin && !(props.repository?.isArchived))) ? (<>
	<div className="divider"></div>

	{/* Pin issue */}
	{((props.pinEnabled || props.issue?.isPinned)) ? (<>
		<form className="tw-mt-1 form-fetch-action single-button-form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} {(props.newPinAllowed) ? (<>action={`${String(props.issue?.link ?? "")}/pin`}</>) : (<>data-tooltip-content={String(i18n("repo.issues.max_pinned") ?? "")}</>)}>
			<button className={`fluid ui button ${(!(props.newPinAllowed)) ? `disabled` : ""}`}>
				{(!(props.issue?.isPinned)) ? (<>
					<span className="svg-icon" aria-label="octicon-pin"></span>
					{i18n("pin")}
				</>) : (<>
					<span className="svg-icon" aria-label="octicon-pin-slash"></span>
					{i18n("unpin")}
				</>)}
			</button>
		</form>
	</>) : null}

	{/* Lock/unlock conversation */}
	<button className={`tw-mt-1 fluid ui show-modal button${(props.issue?.isLocked) ? ` red` : ""}`} data-modal="#lock-conversation">
		{(props.issue?.isLocked) ? (<>
			<span className="svg-icon" aria-label="octicon-key"></span> {i18n("repo.issues.unlock")}
		</>) : (<>
			<span className="svg-icon" aria-label="octicon-lock"></span> {i18n("repo.issues.lock")}
		</>)}
	</button>
	<div className="ui tiny modal" id="lock-conversation">
		<div className="header">
			{(props.issue?.isLocked) ? (<>
				{i18n("repo.issues.unlock.title")}
			</>) : (<>
				{i18n("repo.issues.lock.title")}
			</>)}
		</div>
		<div className="content">
			<div className="ui warning message">
				{(props.issue?.isLocked) ? (<>
					{i18n("repo.issues.unlock.notice_1")}<br />
					{i18n("repo.issues.unlock.notice_2")}<br />
				</>) : (<>
					{i18n("repo.issues.lock.notice_1")}<br />
					{i18n("repo.issues.lock.notice_2")}<br />
					{i18n("repo.issues.lock.notice_3")}<br />
				</>)}
			</div>

			<form className="ui form form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`${String(props.issue?.link ?? "")}${(props.issue?.isLocked) ? `/unlock` : `/lock`}`}>

				{(!(props.issue?.isLocked)) ? (<>
					<div className="field">
						<strong>{i18n("repo.issues.lock.reason")}</strong>
					</div>

					<div className="field">
						<div className="ui fluid dropdown selection">
							<input type="hidden" name="reason" />
							<div className="text"></div> <span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<div className="menu">
								<div className="item" data-value=""></div>
								{((props.lockReasons) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<div className="item" data-value={String("" ?? "")}>{item as any}</div>
								</React.Fragment>))}
							</div>
						</div>
					</div>
				</>) : null}

				<div className="actions">
					<button className="ui cancel button">{i18n("settings.cancel")}</button>
					{/* explicitly focus the submit button, to avoid Fomantic modal focuses and popups the dropdown */}
					<button className="ui red button" autofocus>
						{(props.issue?.isLocked) ? (<>
							{i18n("repo.issues.unlock_confirm")}
						</>) : (<>
							{i18n("repo.issues.lock_confirm")}
						</>)}
					</button>
				</div>
			</form>
		</div>
	</div>
	<button className="tw-mt-1 fluid ui show-modal button" data-modal="#sidebar-delete-issue">
		<span className="svg-icon" aria-label="octicon-trash"></span>
		{i18n("repo.issues.delete")}
	</button>
	<div className="ui g-modal-confirm modal" id="sidebar-delete-issue">
		<div className="header">
			{(props.issue?.isPull) ? (<>
				{i18n("repo.pulls.delete.title")}
			</>) : (<>
				{i18n("repo.issues.delete.title")}
			</>)}
		</div>
		<div className="content">
			<p>
				{(props.issue?.isPull) ? (<>
					{i18n("repo.pulls.delete.text")}
				</>) : (<>
					{i18n("repo.issues.delete.text")}
				</>)}
			</p>
		</div>
		<form action={`${String(props.issue?.link ?? "")}/delete`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			{/* template: base/modal_actions_confirm */}
		</form>
	</div>
</>) : null}

  </>)
}
