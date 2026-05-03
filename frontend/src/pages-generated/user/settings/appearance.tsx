import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Appearance(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">

		{/* Theme */}
		<h4 className="ui top attached header">
			{i18n("settings.manage_themes")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" action={`${String(props.link ?? "")}/theme`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className="field">
					{i18n("settings.theme_desc")}
					<a className="muted" target="_blank" href="https://github.com/go-gitea/gitea/blob/main/web_src/css/themes/" data-tooltip-content={String(i18n("settings.theme_colorblindness_prompt") ?? "")}>
						<span className="svg-icon" aria-label="octicon-question"></span> {i18n("settings.theme_colorblindness_help")}
					</a>
				</div>
				<div className="field">
					<label>{i18n("settings.ui")}</label>
					<div className="ui selection dropdown">
						<input type="hidden" name="theme" value={String(props.signedUser?.theme ?? "")} />
						<div className="text"></div> <span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu flex-items-menu">
							{((props.allThemes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{/* $extraIconName */}
								<div className="item" data-value={String("" ?? "")}>
									{/* TODO: {{$theme.DisplayName}} */} {/* TODO: {{svg $extraIconName}} */}
									<div className="description">{/* TODO: {{$theme.GetDescription}} */}</div>
								</div>
							</React.Fragment>))}
						</div>
					</div>
				</div>
				<div className="field">
					<button className="ui primary button">{i18n("settings.update_theme")}</button>
				</div>
			</form>
		</div>

		{/* Language */}
		<h4 className="ui top attached header">
			{i18n("settings.language")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" action={`${String(props.link ?? "")}/language`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className="field">
					<div className="ui language selection dropdown" id="language">
						<input name="language" type="hidden" value={String(props.signedUser?.language ?? "")} />
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="text">{((props.allLangs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>{(props.signedUser?.language === item.lang) ? (<>{item.name as any}</>) : null}</React.Fragment>))}</div>
						<div className="menu">
						{((props.allLangs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<div className={`item${(props.signedUser?.language === props.lang) ? ` active selected` : ""}`} data-value={String(props.lang ?? "")}>{item.name as any}</div>
						</React.Fragment>))}
						</div>
					</div>
				</div>
				<div className="field">
					<button className="ui primary button">{i18n("settings.update_language")}</button>
				</div>
			</form>
		</div>

		{/* Shown comment event types */}
		<h4 className="ui top attached header">
			{i18n("settings.hidden_comment_types")}
		</h4>
		<div className="ui attached segment">
			<p className="help">
				{i18n("settings.hidden_comment_types_description")}
			</p>
			<form className="ui form" action={`${String(props.link ?? "")}/hidden_comments`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className="inline field">
					<div className="ui checkbox" data-tooltip-content={String(i18n("settings.hidden_comment_types.ref_tooltip") ?? "")}>
						<input name="reference" type="checkbox" {/* TODO: {{if(call .IsCommentTypeGroupChecked "reference")}} */}checked />
						<label>{i18n("settings.comment_type_group_reference")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="label" type="checkbox" {...("call .IsCommentTypeGroupChecked "label"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_label")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="milestone" type="checkbox" {...("call .IsCommentTypeGroupChecked "milestone"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_milestone")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="assignee" type="checkbox" {...("call .IsCommentTypeGroupChecked "assignee"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_assignee")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="title" type="checkbox" {...("call .IsCommentTypeGroupChecked "title"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_title")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="branch" type="checkbox" {...("call .IsCommentTypeGroupChecked "branch"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_branch")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="time_tracking" type="checkbox" {...("call .IsCommentTypeGroupChecked "time_tracking"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_time_tracking")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="deadline" type="checkbox" {...("call .IsCommentTypeGroupChecked "deadline"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_deadline")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="dependency" type="checkbox" {...("call .IsCommentTypeGroupChecked "dependency"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_dependency")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="lock" type="checkbox" {...("call .IsCommentTypeGroupChecked "lock"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_lock")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="review_request" type="checkbox" {...("call .IsCommentTypeGroupChecked "review_request"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_review_request")}</label>
					</div>
				</div>

				<div className="inline field">
					<div className="ui checkbox">
						<input name="pull_request_push" type="checkbox" {...("call .IsCommentTypeGroupChecked "pull_request_push"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_pull_request_push")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<input name="project" type="checkbox" {...("call .IsCommentTypeGroupChecked "project"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_project")}</label>
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox" data-tooltip-content={String(i18n("settings.hidden_comment_types.issue_ref_tooltip") ?? "")}>
						<input name="issue_ref" type="checkbox" {...("call .IsCommentTypeGroupChecked "issue_ref"" ? {"checked": true} : {})} />
						<label>{i18n("settings.comment_type_group_issue_ref")}</label>
					</div>
				</div>
				<div className="field">
					<button className="ui primary button">{i18n("save")}</button>
				</div>
			</form>
		</div>
	</div>
{/* template: user/settings/layout_footer */}

  </>)
}
