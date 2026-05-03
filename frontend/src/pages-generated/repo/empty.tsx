// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Empty(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository quickstart">
	{/* template: repo/header */}
	<div className="ui container">
		<div className="ui grid">
			<div className="sixteen wide column content">
				{/* alert */}
				{(props.repository?.isArchived) ? (<>
					<div className="ui warning message tw-text-center">
						{(props.repository?.archivedUnix?.isZero) ? (<>
							{i18n("repo.archive.title")}
						</>) : (<>
							{i18n("repo.archive.title_date")}
						</>)}
					</div>
				</>) : null}

				{(props.repository?.isBroken) ? (<>
					<div className="ui segment center">{i18n("repo.broken_message")}</div>
				</>) : null} {(props.repoHasContentsWithoutBranch) ? (<>
					<div className="ui segment center">{i18n("repo.no_branch")}</div>
				</>) : null} {(props.canWriteCode) ? (<>
					<h4 className="ui top attached header">{i18n("repo.quick_guide")}</h4>
					<div className="ui attached guide table segment empty-repo-guide">
						<div className="item">
							<h3>{i18n("repo.clone_this_repo")} <small>{i18n("repo.clone_helper")}</small></h3>

							<div className="repo-button-row">
								{((props.canWriteCode && !(props.repository?.isArchived))) ? (<>
									<a className="ui small button" href={`${String(props.repoLink ?? "")}/_new/${String(props.branchName?.("|", "PathEscapeSegments") ?? "")}/`}>
										{i18n("repo.editor.new_file")}
									</a>
									{(props.repositoryUploadEnabled) ? (<>
									<a className="ui small button" href={`${String(props.repoLink ?? "")}/_upload/${String(props.branchName?.("|", "PathEscapeSegments") ?? "")}/`}>
										{i18n("repo.editor.upload_file")}
									</a>
									</>) : null}
								</>) : null}
								{/* template: repo/clone_buttons */}
							</div>
						</div>

						{(!(props.repository?.isArchived)) ? (<>
							<div className="divider tw-my-0"></div>

							<div className="item">
								<h3>{i18n("repo.create_new_repo_command")}</h3>
								<div className="markup">
									{/* $gitRemoteName */}
									<pre><code>touch README.md
git init{(props.repository?.objectFormatName !== "sha1") ? (<> --object-format={props.repository?.objectFormatName as any}</>) : null}{/* for sha256 repo, it needs to set "object-format" explicitly */}
{(props.repository?.defaultBranch !== "master") ? (<>git checkout -b {props.repository?.defaultBranch as any}</>) : null}
git add README.md
git commit -m "first commit"
git remote add {props.gitRemoteName as any} <span className="js-clone-url">{props.cloneButtonOriginLink?.hTTPS as any}</span>
git push -u {props.gitRemoteName as any} {props.repository?.defaultBranch as any}</code></pre>
								</div>
							</div>
							<div className="divider"></div>

							<div className="item">
								<h3>{i18n("repo.push_exist_repo")}</h3>
								<div className="markup">
									<pre><code>git remote add {props.gitRemoteName as any} <span className="js-clone-url">{props.cloneButtonOriginLink?.hTTPS as any}</span>
git push -u {props.gitRemoteName as any} {props.repository?.defaultBranch as any}</code></pre>
								</div>
							</div>
						</>) : null}
					</div>
				</>) : (<>
					<div className="ui segment center">{i18n("repo.empty_message")}</div>
				</>)}
			</div>
		</div>
	</div>
</div>


  </>)
}
