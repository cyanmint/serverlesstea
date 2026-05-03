import React from 'react'
import { i18n } from '../../lib/i18n'

export default function ViewContent(props: Record<string, unknown>) {
  return (<>
{/* $isTreePathRoot */}

<div className="repo-view-content-data tw-hidden" data-document-title={String("" ?? "")} data-document-title-common={String("" ?? "")}></div>
{/* template: repo/sub_menu */}
<div className="repo-button-row">
	<div className="repo-button-row-left">
	{(!(isTreePathRoot)) ? (<>
		{/* template: repo/view_file_tree_toggle_button */}
	</>) : null}

	{/* template: repo/branch_dropdown */}

	{((props.pullRequestCtx?.canCreateNewPull && props.refFullName?.isBranch)) ? (<>
		{/* $compareLink */}
		<a id="new-pull-request" role="button" className="ui compact basic button" href={String("" ?? "")}
			data-tooltip-content={String(i18n("repo.pulls.compare_changes") ?? "")}>
			<span className="svg-icon" aria-label="octicon-git-pull-request"></span>
		</a>
	</>) : null}

	{((isTreePathRoot && props.repository?.isTemplate)) ? (<>
		<a role="button" className="ui primary compact button" href={`/repo/create?template_id=${String(props.repository?.iD ?? "")}`}>
			{i18n("repo.use_template")}
		</a>
	</>) : null}

	{(!(isTreePathRoot)) ? (<>
		{/* $treeNameIdxLast */}
		<span className="breadcrumb">
			<a className="section" href={`${String(props.repoLink ?? "")}/src/${String(props.refTypeNameSubURL ?? "")}`} title={String(props.repository?.name ?? "")}>{/* TODO: {{StringUtils.EllipsisString .Repository.Name 30}} */}</a>
			{/* TODO: {{- range $i, $v := .TreeNames -}} */}
				<span className="breadcrumb-divider">/</span>
				{/* TODO: {{- if eq $i $treeNameIdxLast -}} */}
					<span className="active section" title={String("" ?? "")}>{/* $v */}</span>
					<button className="btn interact-fg tw-mx-1" data-clipboard-text={String(props.treePath ?? "")} data-tooltip-content={String(i18n("copy_path") ?? "")}><span className="svg-icon" aria-label="octicon-copy"></span></button>
				{/* TODO: {{- else -}} */}
					{/* $p */}<span className="section"><a href={`${String(props.branchLink ?? "")}/`} title={String("" ?? "")}>{/* $v */}</a></span>
				{/* TODO: {{- end -}} */}
			{/* TODO: {{- end -}} */}
		</span>
	</>) : null}
	</div>

	<div className="repo-button-row-right">
		<div className="repo-file-search-container"
				data-global-init="initRepoFileSearch"
				data-repo-link={String(props.repoLink ?? "")}
				data-current-ref-name-sub-url={String(props.refTypeNameSubURL ?? "")}
				data-tree-list-url={`${String(props.repoLink ?? "")}/tree-list/${String(props.refTypeNameSubURL ?? "")}`}
				data-no-results-text={String(i18n("repo.find_file.no_matching") ?? "")}
				data-placeholder={String(i18n("repo.find_file.go_to_file") ?? "")}
		><div className="ui small input global-shortcut-wrapper"><input placeholder={String(i18n("repo.find_file.go_to_file") ?? "")} /><kbd>T</kbd></div></div>

		{(props.refFullName?.isBranch) ? (<>
			{/* $addFilePath */}
			{(props.isViewFile) ? (<>
				{("len .TreeNames" > 1) ? (<>
					{/* TODO: {{$addFilePath = StringUtils.Join (slice .TreeNames 0 (Eval (len .TreeNames) "-" 1)) "/"}} */}
				</>) : (<>
					{/* TODO: {{$addFilePath = ""}} */}
				</>)}
			</>) : null}
			<button className="ui dropdown basic compact jump button repo-add-file" {...(!(props.repository?.canEnableEditor) ? {"disabled": true} : {})}>
				{i18n("repo.editor.add_file")}
				<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				<div className="menu">
					<a className="item" href={`${String(props.repoLink ?? "")}/_new/${String(props.branchName?.("|", "PathEscapeSegments") ?? "")}/`}>
						<span className="svg-icon" aria-label="octicon-file-added"></span>{i18n("repo.editor.new_file")}
					</a>
					{(props.repositoryUploadEnabled) ? (<>
					<a className="item" href={`${String(props.repoLink ?? "")}/_upload/${String(props.branchName?.("|", "PathEscapeSegments") ?? "")}/`}>
						<span className="svg-icon" aria-label="octicon-upload"></span>{i18n("repo.editor.upload_file")}
					</a>
					</>) : null}
					<a className="item" href={`${String(props.repoLink ?? "")}/_diffpatch/${String(props.branchName?.("|", "PathEscapeSegments") ?? "")}/`}>
						<span className="svg-icon" aria-label="octicon-diff"></span>{i18n("repo.editor.patch")}
					</a>
				</div>
			</button>

			{((!(props.isViewFile) && !(isTreePathRoot))) ? (<>
			<button className="ui dropdown basic compact jump button tw-px-3" data-tooltip-content={String(i18n("repo.more_operations") ?? "")}>
				<span className="svg-icon" aria-label="octicon-kebab-horizontal"></span>
				<div className="menu">
					<a className="item" data-clipboard-text={`${String(props.repository?.link ?? "")}/src/commit/${String(props.commitID ?? "")}/`} data-clipboard-text-type="url">
						<span className="svg-icon" aria-label="octicon-link"></span>{i18n("repo.file_copy_permalink")}
					</a>
					{((!(props.disableDownloadSourceArchives) && props.refFullName)) ? (<>
						<div className="divider"></div>
						<a className="item muted archive-link" href={`${String(props.repoLink ?? "")}/archive/.zip?path=`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span>{i18n("repo.download_directory_as")}</a>
						<a className="item muted archive-link" href={`${String(props.repoLink ?? "")}/archive/.tar.gz?path=`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span>{i18n("repo.download_directory_as")}</a>
					</>) : null}
					{((props.repository?.canContentChange && !(isTreePathRoot))) ? (<>
						<div className="divider"></div>
						<a className="item tw-text-danger" href={`${String(props.repoLink ?? "")}/_delete/${String(props.branchName?.("|", "PathEscapeSegments") ?? "")}/${String(props.treePath?.("|", "PathEscapeSegments") ?? "")}`}>
							<span className="svg-icon" aria-label="octicon-trash"></span>{i18n("repo.editor.delete_this_directory")}
						</a>
					</>) : null}
				</div>
			</button>
			</>) : null}
		</>) : null}
		{/* Only show clone panel in repository home page */}
		{(isTreePathRoot) ? (<>
			{/* template: repo/clone_panel */}
		</>) : null}
		{((!(isTreePathRoot) && !(props.isViewFile) && !(props.isBlame))) ? (<>{/* IsViewDirectory (not home), TODO: split the templates, avoid using "if" tricks */}
			<a className="ui compact button" href={`${String(props.repoLink ?? "")}/commits/${String(props.refTypeNameSubURL ?? "")}/${String(props.treePath?.("|", "PathEscapeSegments") ?? "")}`}>
				<span className="svg-icon" aria-label="octicon-history"></span>{i18n("repo.file_history")}
			</a>
		</>) : null}
	</div>
</div>
{(props.isViewFile) ? (<>
	{/* template: repo/view_file */}
</>) : null} {(props.isBlame) ? (<>
	{/* template: repo/blame */}
</>) : (<>{/* IsViewDirectory */}
	{(isTreePathRoot) ? (<>
		{/* template: repo/code/upstream_diverging_info */}
	</>) : null}
	{/* template: repo/view_list */}
	{((props.readmeExist && (props.renderAsMarkup || props.isPlainText))) ? (<>
		{/* template: repo/view_file */}
	</>) : null}
</>)}

  </>)
}
