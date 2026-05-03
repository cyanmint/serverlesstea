import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Settings(props: Record<string, unknown>) {
  return (<>
{/* Template attributes:
- BaseLink: Base URL for the repository settings
- WebHook: Webhook object containing details about the webhook
- UseAuthorizationHeader: optional or required
- UseRequestSecret: optional or required */}
{/* $isNew */}

<div className="field">
	<label>{i18n("repo.settings.webhook.name")}</label>
	<input name="name" type="text" value={String(props.webhook?.name ?? "")} maxlength="255" />
	<p className="help">{i18n("repo.settings.webhook.name_helper")}</p>
</div>

<div className="inline field">
	<div className="ui checkbox">
		<input name="active" type="checkbox" {...((isNew || props.webhook?.isActive) ? {"checked": true} : {})} />
		<label>{i18n("repo.settings.active")}</label>
		<span className="help">{i18n("repo.settings.active_helper")}</span>
	</div>
</div>

{/* Authorization Header */}
{(props.useAuthorizationHeader) ? (<>
	{/* $attributeValid */}
	{(!(attributeValid)) ? (<><div className="ui error message">Invalid UseAuthorizationHeader: {props.useAuthorizationHeader as any}}</div></>) : null}
	{/* $required */}
	<div className={`field ${(required) ? `required` : ""}`}>
		<label>{i18n("repo.settings.authorization_header")}</label>
		<input name="authorization_header" type="text" value={String(props.webhook?.headerAuthorization ?? "")} {...(required ? {"required": true, "placeholder": "Bearer $access_token"} : {})} />
		{(!(required)) ? (<>
			<span className="help">{i18n("repo.settings.authorization_header_desc")}</span>
		</>) : null}
	</div>
</>) : null}

{/* Secret */}
{(props.useRequestSecret) ? (<>
	{/* $attributeValid */}
	{(!(attributeValid)) ? (<><div className="ui error message">Invalid UseRequestSecret: {props.useRequestSecret as any}}</div></>) : null}
	{/* $required */}
	<div className={`field ${(required) ? `required` : ""}`}>
		<label>{i18n("repo.settings.secret")}</label>
		<input name="secret" type="password" value={String(props.webhook?.secret ?? "")} autocomplete="off" {...(required ? {"required": true} : {})} />
		<span className="help">{i18n("repo.settings.webhook_secret_desc")}</span>
	</div>
</>) : null}

{/* Branch filter */}
<div className="field">
	<label>{i18n("repo.settings.branch_filter")}</label>
	<input name="branch_filter" type="text" value={String("" ?? "")} />
	<span className="help">
		{i18n("repo.settings.branch_filter_desc_1")}
		{i18n("repo.settings.branch_filter_desc_2")}
		{i18n("repo.settings.branch_filter_desc_doc")}
		<ul>
			<li><code>main</code></li>
			<li><code>{main,feature/*}</code></li>
			<li><code>{refs/heads/feature/*,refs/tags/release/*}</code></li>
		</ul>
	</span>
</div>

<div className="field">
	<h4>{i18n("repo.settings.event_desc")}</h4>
	<div className="grouped event type fields">
		<div className="field">
			<div className="ui radio non-events checkbox">
				<input name="events" type="radio" value="push_only" {...((isNew || props.webhook?.pushOnly) ? {"checked": true} : {})} />
				<label>{i18n("repo.settings.event_push_only")}</label>
			</div>
		</div>
		<div className="field">
			<div className="ui radio non-events checkbox">
				<input name="events" type="radio" value="send_everything" {...(props.webhook?.sendEverything ? {"checked": true} : {})} />
				<label>{i18n("repo.settings.event_send_everything")}</label>
			</div>
		</div>
		<div className="field">
			<div className="ui radio events checkbox">
				<input name="events" type="radio" value="choose_events" {...(props.webhook?.chooseEvents ? {"checked": true} : {})} />
				<label>{i18n("repo.settings.event_choose")}</label>
			</div>
		</div>
	</div>

	<div className={`events fields ui grid ${(!(props.webhook?.chooseEvents)) ? `tw-hidden` : ""}`}>
		{/* Repository Events */}
		<div className="fourteen wide column">
			<label>{i18n("repo.settings.event_header_repository")}</label>
		</div>
		{/* Create */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="create" type="checkbox" {...(props.webhook?.hookEvents?.get?.("create") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_create")}</label>
					<span className="help">{i18n("repo.settings.event_create_desc")}</span>
				</div>
			</div>
		</div>
		{/* Delete */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="delete" type="checkbox" {...(props.webhook?.hookEvents?.get?.("delete") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_delete")}</label>
					<span className="help">{i18n("repo.settings.event_delete_desc")}</span>
				</div>
			</div>
		</div>
		{/* Fork */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="fork" type="checkbox" {...(props.webhook?.hookEvents?.get?.("fork") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_fork")}</label>
					<span className="help">{i18n("repo.settings.event_fork_desc")}</span>
				</div>
			</div>
		</div>
		{/* Push */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="push" type="checkbox" {...(props.webhook?.hookEvents?.get?.("push") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_push")}</label>
					<span className="help">{i18n("repo.settings.event_push_desc")}</span>
				</div>
			</div>
		</div>
		{/* Repository */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="repository" type="checkbox" {...(props.webhook?.hookEvents?.get?.("repository") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_repository")}</label>
					<span className="help">{i18n("repo.settings.event_repository_desc")}</span>
				</div>
			</div>
		</div>
		{/* Release */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="release" type="checkbox" {...(props.webhook?.hookEvents?.get?.("release") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_release")}</label>
					<span className="help">{i18n("repo.settings.event_release_desc")}</span>
				</div>
			</div>
		</div>
		{/* Package */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="package" type="checkbox" {...(props.webhook?.hookEvents?.get?.("package") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_package")}</label>
					<span className="help">{i18n("repo.settings.event_package_desc")}</span>
				</div>
			</div>
		</div>

		{/* Wiki */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="wiki" type="checkbox" {...(props.webhook?.hookEvents?.get?.("wiki") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_wiki")}</label>
					<span className="help">{i18n("repo.settings.event_wiki_desc")}</span>
				</div>
			</div>
		</div>

		{/* Status */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="status" type="checkbox" {...(props.webhook?.hookEvents?.get?.("status") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_statuses")}</label>
					<span className="help">{i18n("repo.settings.event_statuses_desc")}</span>
				</div>
			</div>
		</div>

		{/* Issue Events */}
		<div className="fourteen wide column">
			<label>{i18n("repo.settings.event_header_issue")}</label>
		</div>
		{/* Issues */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="issues" type="checkbox" {...(props.webhook?.hookEvents?.get?.("issues") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_issues")}</label>
					<span className="help">{i18n("repo.settings.event_issues_desc")}</span>
				</div>
			</div>
		</div>
		{/* Issue Assign */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="issue_assign" type="checkbox" {...(props.webhook?.hookEvents?.get?.("issue_assign") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_issue_assign")}</label>
					<span className="help">{i18n("repo.settings.event_issue_assign_desc")}</span>
				</div>
			</div>
		</div>
		{/* Issue Label */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="issue_label" type="checkbox" {...(props.webhook?.hookEvents?.get?.("issue_label") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_issue_label")}</label>
					<span className="help">{i18n("repo.settings.event_issue_label_desc")}</span>
				</div>
			</div>
		</div>
		{/* Issue Milestone */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="issue_milestone" type="checkbox" {...(props.webhook?.hookEvents?.get?.("issue_milestone") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_issue_milestone")}</label>
					<span className="help">{i18n("repo.settings.event_issue_milestone_desc")}</span>
				</div>
			</div>
		</div>
		{/* Issue Comment */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="issue_comment" type="checkbox" {...(props.webhook?.hookEvents?.get?.("issue_comment") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_issue_comment")}</label>
					<span className="help">{i18n("repo.settings.event_issue_comment_desc")}</span>
				</div>
			</div>
		</div>

		{/* Pull Request Events */}
		<div className="fourteen wide column">
			<label>{i18n("repo.settings.event_header_pull_request")}</label>
		</div>
		{/* Pull Request */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="pull_request" type="checkbox" {...(props.webhook?.hookEvents?.get?.("pull_request") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_pull_request")}</label>
					<span className="help">{i18n("repo.settings.event_pull_request_desc")}</span>
				</div>
			</div>
		</div>
		{/* Pull Request Assign */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="pull_request_assign" type="checkbox" {...(props.webhook?.hookEvents?.get?.("pull_request_assign") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_pull_request_assign")}</label>
					<span className="help">{i18n("repo.settings.event_pull_request_assign_desc")}</span>
				</div>
			</div>
		</div>
		{/* Pull Request Label */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="pull_request_label" type="checkbox" {...(props.webhook?.hookEvents?.get?.("pull_request_label") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_pull_request_label")}</label>
					<span className="help">{i18n("repo.settings.event_pull_request_label_desc")}</span>
				</div>
			</div>
		</div>
		{/* Pull Request Milestone */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="pull_request_milestone" type="checkbox" {...(props.webhook?.hookEvents?.get?.("pull_request_milestone") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_pull_request_milestone")}</label>
					<span className="help">{i18n("repo.settings.event_pull_request_milestone_desc")}</span>
				</div>
			</div>
		</div>
		{/* Pull Request Comment */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="pull_request_comment" type="checkbox" {...(props.webhook?.hookEvents?.get?.("pull_request_comment") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_pull_request_comment")}</label>
					<span className="help">{i18n("repo.settings.event_pull_request_comment_desc")}</span>
				</div>
			</div>
		</div>
		{/* Pull Request Review */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="pull_request_review" type="checkbox" {...(props.webhook?.hookEvents?.get?.("pull_request_review") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_pull_request_review")}</label>
					<span className="help">{i18n("repo.settings.event_pull_request_review_desc")}</span>
				</div>
			</div>
		</div>
		{/* Pull Request Sync */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="pull_request_sync" type="checkbox" {...(props.webhook?.hookEvents?.get?.("pull_request_sync") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_pull_request_sync")}</label>
					<span className="help">{i18n("repo.settings.event_pull_request_sync_desc")}</span>
				</div>
			</div>
		</div>
		{/* Pull Request Review Request */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="pull_request_review_request" type="checkbox" {...(props.webhook?.hookEvents?.get?.("pull_request_review_request") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_pull_request_review_request")}</label>
					<span className="help">{i18n("repo.settings.event_pull_request_review_request_desc")}</span>
				</div>
			</div>
		</div>
		{/* Workflow Events */}
		<div className="fourteen wide column">
			<label>{i18n("repo.settings.event_header_workflow")}</label>
		</div>
		{/* Workflow Run Event */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="workflow_run" type="checkbox" {...(props.webhook?.hookEvents?.get?.("workflow_run") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_workflow_run")}</label>
					<span className="help">{i18n("repo.settings.event_workflow_run_desc")}</span>
				</div>
			</div>
		</div>
		{/* Workflow Job Event */}
		<div className="seven wide column">
			<div className="field">
				<div className="ui checkbox">
					<input name="workflow_job" type="checkbox" {...(props.webhook?.hookEvents?.get?.("workflow_job") ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.event_workflow_job")}</label>
					<span className="help">{i18n("repo.settings.event_workflow_job_desc")}</span>
				</div>
			</div>
		</div>
	</div>
</div>

<div className="field">
	{(isNew) ? (<>
		<button className="ui primary button">{i18n("repo.settings.add_webhook")}</button>
	</>) : (<>
		<button className="ui primary button">{i18n("repo.settings.update_webhook")}</button>
		<a className="ui red button link-action"
			data-url={`${String(props.baseLink ?? "")}/delete?id=${String(props.webhook?.iD ?? "")}`}
			data-modal-confirm={String(i18n("repo.settings.webhook_deletion_desc") ?? "")}
		>{i18n("repo.settings.delete_webhook")}</a>
	</>)}
</div>

  </>)
}
