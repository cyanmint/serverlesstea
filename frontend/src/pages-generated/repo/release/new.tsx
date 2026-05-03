import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository new release">
	{/* template: repo/header */}
	<div className="ui container">
		<h2 className="ui dividing header">
			{(props.pageIsEditRelease) ? (<>
				{i18n("repo.release.edit_release")}
				<div className="sub header">{i18n("repo.release.edit_subheader")}</div>
			</>) : (<>
				{i18n("repo.release.new_release")}
				<div className="sub header">{i18n("repo.release.new_subheader")}</div>
			</>)}
		</h2>
		{/* alert */}

		<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} data-global-init="initReleaseEditForm"
			data-existing-tags={String("" ?? "")}
			data-tag-helper={String(i18n("repo.release.tag_helper") ?? "")}
			data-tag-helper-new={String(i18n("repo.release.tag_helper_new") ?? "")}
			data-tag-helper-existing={String(i18n("repo.release.tag_helper_existing") ?? "")}
		>
			<div className={`inline field ${(props.err_TagName) ? `error` : ""}`}>
				<label className="tw-block tw-mb-1"><b>{i18n("repo.git_tag")}</b></label>
				{(props.pageIsEditRelease) ? (<>
					<input type="hidden" name="tag_name" value={String(props.tag_name ?? "")} />
					<input type="hidden" name="tag_target" value={String(props.tag_target ?? "")} />
					<span>{props.tag_name as any} @ {props.tag_target as any}</span>
				</>) : (<>
					<div className="flex-text-block tw-flex-wrap">
						<input type="text" className="tw-w-auto" name="tag_name" value={String(props.tag_name ?? "")} aria-label={String(i18n("repo.release.tag_name") ?? "")} placeholder={String(i18n("repo.release.tag_name") ?? "")} autofocus required maxlength="255" />
						<div className="tag-target-selector tw-contents">
							<span>@</span>
							<div className="ui selection dropdown">
								<input type="hidden" name="tag_target" value={String(props.tag_target ?? "")} />
								<span className="svg-icon" aria-label="octicon-git-branch"></span>
								<div className="text">
									{i18n("repo.release.target")} :
									<strong id="repo-branch-current">{props.repository?.defaultBranch as any}</strong>
								</div>
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
								<div className="menu">
									{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
										<div className="item" data-value={String("" ?? "")}>{item as any}</div>
									</React.Fragment>))}
								</div>
							</div>
						</div>
					</div>
					<div>
						<span className="help tag-name-helper tw-pb-0">{i18n("repo.release.tag_helper")}</span>
					</div>
				</>)}
			</div>

			<div className={`field ${(props.err_Title) ? `error` : ""}`}>
				<label><b>{i18n("repo.release.title")}</b></label>
				<input name="title" aria-label={String(i18n("repo.release.title") ?? "")} placeholder={String(i18n("repo.release.title") ?? "")} value={String(props.title ?? "")} autofocus maxlength="255" />
			</div>

			<div className="field">
				<label><b>{i18n("repo.release.notes")}</b></label>
				<button type="button" className="ui small compact button generate-release-notes"
					data-generate-url={`${String(props.repoLink ?? "")}/releases/generate-notes`}
					data-tooltip-content={String(i18n("repo.release.generate_notes_desc") ?? "")}
					data-text-missing-tag={String(i18n("repo.release.generate_notes_missing_tag") ?? "")}
				>
					{i18n("repo.release.generate_notes")}
				</button>
			</div>
			<div className="field">
				{/* template: shared/combomarkdowneditor */}
			</div>

			{((props.attachments) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="field flex-text-block" id={`attachment-${String(props.iD ?? "")}`}>
					<div className="flex-text-block tw-flex-1">
						<input name={`attachment-edit-${String(props.uUID ?? "")}`} className="tw-max-w-[48em]" required value={String(props.name ?? "")} />
						<input name={`attachment-del-${String(props.uUID ?? "")}`} type="hidden" value="false" />
						<span className="tw-text-text-light tw-flex-shrink-0">{item.size | FileSize as any}</span>
						<span data-tooltip-content={String(i18n("repo.release.download_count") ?? "")}>
							<span className="svg-icon" aria-label="octicon-info"></span>
						</span>
					</div>
					<a className="ui mini compact red button" data-global-click="onReleaseEditAttachmentDelete"  data-id={String(props.iD ?? "")} data-uuid={String(props.uUID ?? "")}>
						{i18n("remove")}
					</a>
				</div>
			</React.Fragment>))}
			{(props.isAttachmentEnabled) ? (<>
				<div className="field">
					{/* template: repo/upload */}
				</div>
			</>) : null}

			{(!(props.pageIsEditRelease)) ? (<>
				<div className="field">
					<div className="ui checkbox">
						<input type="checkbox" name="add_tag_msg" />
						<label><strong>{i18n("repo.release.add_tag_msg")}</strong></label>
					</div>
				</div>
			</>) : (<>
				<input type="hidden" name="add_tag_msg" value="false" />
			</>)}

			<div className="field">
				<div className="ui checkbox">
					<input type="checkbox" name="prerelease" {...(props.prerelease ? {"checked": true} : {})} />
					<label><strong>{i18n("repo.release.prerelease_desc")}</strong></label>
				</div>
				<div className="help tw-block tw-ml-[21px]">{i18n("repo.release.prerelease_helper")}</div>
			</div>

			<div className="flex-text-block tw-justify-end">
				{(props.pageIsEditRelease) ? (<>
					<a className="ui small button" href={`${String(props.repoLink ?? "")}/releases`}>
						{i18n("repo.release.cancel")}
					</a>
					<a className="ui small red button link-action"
						data-modal-confirm-header={String(i18n("repo.release.deletion") ?? "")} data-modal-confirm-content={String(i18n("repo.release.deletion_desc") ?? "")}
						data-url={`${String(props.repoLink ?? "")}/releases/delete?id=${String(props.iD ?? "")}`}>
						{i18n("repo.release.delete_release")}
					</a>
					{(props.isDraft) ? (<>
						<button className="ui small button" type="submit" name="draft" value="1">{i18n("repo.release.save_draft")}</button>
						<button className="ui small primary button">{i18n("repo.release.publish")}</button>
					</>) : (<>
						<button className="ui small primary button">{i18n("repo.release.edit_release")}</button>
					</>)}
				</>) : (<>
					{(props.showCreateTagOnlyButton) ? (<>
						<button className="ui small button" name="tag_only" value="1">{i18n("repo.release.add_tag")}</button>
					</>) : null}
					<button className="ui small button" name="draft" value="1">{i18n("repo.release.save_draft")}</button>
					<button className="ui small primary button">{i18n("repo.release.publish")}</button>
				</>)}
			</div>
		</form>
	</div>
</div>

<div id="generate-release-notes-modal" className="ui mini modal">
	<div className="content ui form">
		<p>{i18n("repo.release.generate_notes_desc")}</p>
		<div className="field">
			<label>{i18n("repo.release.previous_tag")}</label>
			<select name="previous_tag" className="ui selection dropdown"></select>
		</div>
		<div className="actions">
			<button className="ui primary ok button">{i18n("repo.release.generate_notes")}</button>
		</div>
	</div>
</div>



  </>)
}
