// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CommitForm(props: Record<string, unknown>) {
  return (<>
<div className="commit-form-wrapper">
	{/* TODO: {{ctx.AvatarUtils.Avatar .SignedUser 40 "commit-avatar"}} */}
	<div className="commit-form avatar-content-left-arrow">
		<h3>
		{(props.commitFormOptions?.willSign) ? (<>
			<span data-tooltip-content={String(i18n("repo.signing.will_sign") ?? "")}><span className="svg-icon" aria-label="octicon-lock"></span></span>
			{i18n("repo.editor.commit_signed_changes")}
		</>) : (<>
			<span title={String("" ?? "")}><span className="svg-icon" aria-label="octicon-unlock"></span></span>
			{i18n("repo.editor.commit_changes")}
		</>)}
		</h3>
		<div className="field">
			<input name="commit_summary" maxlength="100" placeholder={`${(props.pageIsDelete) ? `${i18n("repo.editor.delete")}${i18n("repo.editor.upload_files_to_dir")}${i18n("repo.editor.add_tmpl")}${i18n("repo.editor.patch")}` : `${i18n("repo.editor.update")}`}`} value={String(props.commit_summary ?? "")} />
		</div>
		<div className="field">
			<textarea name="commit_message" placeholder={String(i18n("repo.editor.commit_message_desc") ?? "")} rows="5">{props.commit_message as any}</textarea>
		</div>
		<div className="inline field">
			<div className="ui checkbox">
				<input name="signoff" type="checkbox" />
				<label>{i18n("repo.editor.signoff_desc")}</label>
			</div>
		</div>
		<div className="quick-pull-choice js-quick-pull-choice">
			<div className="field">
				<div className={`ui radio checkbox ${(!(props.commitFormOptions?.canCommitToBranch)) ? `disabled` : ""}`}>
					<input type="radio" className="js-quick-pull-choice-option" name="commit_choice" value="direct" data-button-text={String(i18n("repo.editor.commit_changes") ?? "")} {...(props.commit_choice === "direct" ? {"checked": true} : {})} />
					<label>
						<span className="svg-icon" aria-label="octicon-git-commit"></span>
						{i18n("repo.editor.commit_directly_to_this_branch")}
						{(!(props.commitFormOptions?.canCommitToBranch)) ? (<>
						<div className="ui visible small warning message">
							{i18n("repo.editor.no_commit_to_branch")}
							<ul>
								{(!(props.commitFormOptions?.userCanPush)) ? (<><li>{i18n("repo.editor.user_no_push_to_branch")}</li></>) : null}
								{((props.commitFormOptions?.requireSigned && !(props.commitFormOptions?.willSign))) ? (<><li>{i18n("repo.editor.require_signed_commit")}</li></>) : null}
							</ul>
						</div>
						</>) : null}
					</label>
				</div>
			</div>
			{((!(props.repository?.isEmpty) && !(props.isEditingFileOnly))) ? (<>
				<div className="field">
					<div className="ui radio checkbox">
						{(props.commitFormOptions?.canCreatePullRequest) ? (<>
							<input type="radio" className="js-quick-pull-choice-option" name="commit_choice" value="commit-to-new-branch" data-button-text={String(i18n("repo.editor.propose_file_change") ?? "")} {...(props.commit_choice === "commit-to-new-branch" ? {"checked": true} : {})} />
						</>) : (<>
							<input type="radio" className="js-quick-pull-choice-option" name="commit_choice" value="commit-to-new-branch" data-button-text={String(i18n("repo.editor.commit_changes") ?? "")} {...(props.commit_choice === "commit-to-new-branch" ? {"checked": true} : {})} />
						</>)}
						<label>
							<span className="svg-icon" aria-label="octicon-git-pull-request"></span>
							{(props.commitFormOptions?.canCreatePullRequest) ? (<>
								{i18n("repo.editor.create_new_branch")}
							</>) : (<>
								{i18n("repo.editor.create_new_branch_np")}
							</>)}
						</label>
					</div>
				</div>
				<div className={`quick-pull-branch-name ${(!(props.commit_choice === "commit-to-new-branch")) ? `tw-hidden` : ""}`}>
					<div className="new-branch-name-input field">
						<span className="svg-icon" aria-label="octicon-git-branch"></span>
						<input type="text" name="new_branch_name" maxlength="100" value={String(props.new_branch_name ?? "")} className="input-contrast tw-mr-1 js-quick-pull-new-branch-name" placeholder={String(i18n("repo.editor.new_branch_name_desc") ?? "")} {...(props.commit_choice === "commit-to-new-branch" ? {"required": true} : {})} title={String(i18n("repo.editor.new_branch_name") ?? "")} />
						<span className="text-muted js-quick-pull-normalization-info"></span>
					</div>
				</div>
			</>) : null}
		</div>
		{((props.commitCandidateEmails && (true /* TODO: len .CommitCandidateEmails */) > 1)) ? (<>
			<div className="field">
				<label>{i18n("repo.editor.commit_email")}</label>
				<select className="ui selection dropdown" name="commit_email">
					{((props.commitCandidateEmails) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<option {...(props.email === props.commitDefaultEmail ? {"selected": true} : {})} value={String("" ?? "")}>{props.email as any}</option>
					</React.Fragment>))}
				</select>
			</div>
		</>) : null}
	</div>
	<input type="hidden" name="last_commit" value={String(props.last_commit ?? "")} />
	<button id="commit-button" type="submit" className="ui primary button">
		{(props.commit_choice === "commit-to-new-branch") ? (<>{i18n("repo.editor.propose_file_change")}</>) : (<>{i18n("repo.editor.commit_changes")}</>)}
	</button>
	<a className="ui button red" href={`${(props.returnURI) ? `${String(props.returnURI ?? "")}` : `${String(props.branchLink ?? "")}/`}`}>{i18n("repo.editor.cancel")}</a>
</div>

  </>)
}
