import React from 'react'
import { i18n } from '../../lib/i18n'

export default function ViewList(props: Record<string, unknown>) {
  return (<>
{/* use grid layout, still use the old ID because there are many other CSS styles depending on this ID */}
<div id="repo-files-table"
	{(props.hasFilesWithoutLatestCommit) ? (<>
		data-fetch-url={String(props.lastCommitLoaderURL ?? "")}
		data-fetch-trigger="load" data-fetch-sync="$morph"
		data-fetch-indicator=".repo-file-cell.notready.message"
	</>) : null}
>
	<div className="repo-file-line repo-file-last-commit">
		{/* template: repo/latest_commit */}
		<div>{((props.latestCommit && props.latestCommit?.committer)) ? (<>{/* TODO: {{DateUtils.TimeSince .LatestCommit.Committer.When}} */}</>) : null}</div>
	</div>
	{props.fileIconPoolHTML as any}
	{(props.hasParentPath) ? (<>
	<a className="repo-file-line parent-link silenced" href={`${String(props.branchLink ?? "")}${(props.parentPath) ? `` : ""}`}>
		{/* TODO: {{index $.FileIcons ".."}} */} ..
	</a>
	</>) : null}
	{((props.files) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="repo-file-item">
			{/* $entry */}
			{/* $commit */}
			{/* $submoduleFile */}
			<div className="repo-file-cell name muted-links">
				{/* TODO: {{index $.FileIcons $entry.Name}} */}
				{("$entry.IsSubModule") ? (<>
					{/* $submoduleLink */}
					{("$submoduleLink") ? (<>
						<a className="entry-name" href={String("" ?? "")} title={String("" ?? "")}>{/* TODO: {{$entry.Name}} */}</a>
						@ <a className="tw-text-primary" href={String("" ?? "")}>{/* TODO: {{ShortSha $submoduleFile.RefID}} */}</a>
					</>) : (<>
						<span className="entry-name" title={String("" ?? "")}>{/* TODO: {{$entry.Name}} */}</span>
						@ {/* TODO: {{ShortSha $submoduleFile.RefID}} */}
					</>)}
				</>) : (<>
					{("$entry.IsDir") ? (<>
						{/* $subJumpablePathName */}
						<a className="entry-name" href={`${String(props.treeLink ?? "")}/`} title={String("" ?? "")}>
							{/* $subJumpablePathFields */}
							{/* $subJumpablePathFieldLast */}
							{("$subJumpablePathFieldLast" === 0) ? (<>
								{/* $subJumpablePathName */}
							</>) : (<>
								{/* $subJumpablePathPrefixes */}
								<span className="tw-text-text-light-2">{/* TODO: {{StringUtils.Join $subJumpablePathPrefixes "/"}} */}</span>/{/* TODO: {{index $subJumpablePathFields $subJumpablePathFieldLast}} */}
							</>)}
						</a>
					</>) : (<>
						<a className="entry-name" href={`${String(props.treeLink ?? "")}/`} title={String("" ?? "")}>{/* TODO: {{$entry.Name}} */}</a>
						{("$entry.IsLink") ? (<>
							<a className="entry-symbol-link flex-text-inline" data-tooltip-content title={String(i18n("repo.find_file.follow_symlink") ?? "")} href={`${String(props.treeLink ?? "")}/?follow_symlink=1`}><span className="svg-icon" aria-label="octicon-link"></span></a>
						</>) : null}
					</>)}
				</>)}
			</div>
			<div className={`repo-file-cell message commit-summary ${(!("$commit")) ? `notready` : ""}`}>
				{("$commit") ? (<>
					{/* $commitLink */}
					{/* TODO: {{ctx.RenderUtils.RenderCommitMessageLinkSubject $commit.Message $commitLink $.Repository}} */}
				</>) : (<>
					… {/* will be loaded again by LastCommitLoaderURL */}
				</>)}
			</div>
			<div className="repo-file-cell age">{("$commit") ? (<>{/* TODO: {{DateUtils.TimeSince $commit.Committer.When}} */}</>) : null}</div>
		</div>
	</React.Fragment>))}
</div>

  </>)
}
