import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Commits(props: Record<string, unknown>) {
  return (<>
<div id="rev-container">
	<ul id="rev-list">
		{((props.graph?.commits) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<li {...(item.commit?.rev ? {"id": `commit-`} : {})} data-flow={String("" ?? "")}>
				{(item.commit?.onlyRelation) ? (<>
					<span></span>
				</>) : (<>
					{/* every field must be in a span to get correctly styled */}
					<span>
						{/* template: repo/commit_sign_badge */}
					</span>

					<span className="message tw-inline-block gt-ellipsis">
						{/* TODO: {{ctx.RenderUtils.RenderCommitMessage $commit.Subject $.Repository}} */}
					</span>

					<span className="commit-refs flex-text-inline">
						{(($commit.Refs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							{/* $refGroup */}
							{(refGroup === "pull") ? (<>
								{((!(props.hidePRRefs) || "SliceUtils.Contains $.SelectedBranches .Name")) ? (<>
									{/* it's intended to use issues not pulls, if it's a pull you will get redirected */}
									<a className="ui basic tiny button" href={`${String(props.repoLink ?? "")}/${(props.repository?.unitEnabled?.(ctx, "ctx.Consts.RepoUnitTypePullRequests")) ? `pulls` : `issues`}/${String(props.shortName|PathEscape ?? "")}`}>
										<span className="svg-icon" aria-label="octicon-git-pull-request"></span> #{item.shortName as any}
									</a>
								</>) : null}
							</>) : null} {(refGroup === "tags") ? (<>
								{/* TODO: {{- template "repo/tag/name" dict "AdditionalClasses" "tag-label" "RepoLink" $.Repository.Link "TagName" .ShortName -}} */}
							</>) : null} {(refGroup === "remotes") ? (<>
								<a className="ui basic tiny button" href={`${String(props.repoLink ?? "")}/src/commit/`}>
									<span className="svg-icon" aria-label="octicon-cross-reference"></span> {item.shortName as any}
								</a>
							</>) : null} {(refGroup === "heads") ? (<>
								<a className="ui basic tiny button" href={`${String(props.repoLink ?? "")}/src/branch/${String(props.shortName|PathEscape ?? "")}`}>
									<span className="svg-icon" aria-label="octicon-git-branch"></span> {item.shortName as any}
								</a>
							</>) : (<>
								{/* Unknown ref type .Name */}
							</>)}
						</React.Fragment>))}
					</span>

					<span className="flex-text-inline tw-text-12">
						{(item.commit?.user) ? (<>
							{/* TODO: {{ctx.AvatarUtils.Avatar $commit.User 18}} */}
							{/* TODO: {{$commit.User.GetShortDisplayNameLinkHTML}} */}
						</>) : (<>
							{/* $gitUserName */}
							{/* TODO: {{ctx.AvatarUtils.AvatarByEmail $commit.Commit.Author.Email $gitUserName 18}} */}
							{/* $gitUserName */}
						</>)}
					</span>

					<span className="time flex-text-inline">{/* TODO: {{DateUtils.FullTime $commit.Date}} */}</span>
				</>)}
			</li>
		</React.Fragment>))}
	</ul>
</div>

  </>)
}
