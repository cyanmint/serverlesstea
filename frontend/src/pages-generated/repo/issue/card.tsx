import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Card(props: Record<string, unknown>) {
  return (<>
{(props.issue) && (<>
	{(props.page?.project?.cardType === 1) ? (<>{/* Images and Text */}
		{/* $attachments */}
		{(props.attachments) ? (<>
		<div className="card-attachment-images">
			{((props.attachments) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<img loading="lazy" src={String(props.downloadURL ?? "")} alt={String(props.name ?? "")} />
			</React.Fragment>))}
		</div>
		</>) : null}
	</>) : null}
	<div className="content tw-w-full">
		<div className="tw-flex tw-items-start tw-gap-[5px]">
			<div className="issue-card-icon">
				{/* template: shared/issueicon */}
			</div>
			<a className="issue-card-title muted issue-title tw-break-anywhere" href={String(props.link ?? "")}>{props.title?.("|", "ctx.RenderUtils.RenderIssueSimpleTitle") as any}</a>
			{((props.isPinnedIssueCard && props.page?.isRepoAdmin)) ? (<>
				<a role="button" className="issue-card-unpin muted flex-text-inline" data-tooltip-content={i18n("repo.issues.unpin")} data-issue-id={String(props.iD ?? "")} data-unpin-url={`${String(props.page?.link ?? "")}/unpin/${String(props.index ?? "")}`}>
					<span className="svg-icon" aria-label="octicon-x"></span>
				</a>
			</>) : null}
		</div>
		<div className="meta">
			<span className="tw-text-grey-light muted-links">
				{(!(props.page?.repository)) ? (<>{props.repo?.fullName as any}</>) : null}#{props.index as any}
				{/* $timeStr */}
				{(props.originalAuthor) ? (<>
					{/* TODO: {{ctx.Locale.Tr .GetLastEventLabelFake $timeStr .OriginalAuthor}} */}
				</>) : null} {(props.poster?.iD > 0) ? (<>
					{/* TODO: {{ctx.Locale.Tr .GetLastEventLabel $timeStr .Poster.HomeLink .Poster.GetDisplayName}} */}
				</>) : (<>
					{/* TODO: {{ctx.Locale.Tr .GetLastEventLabelFake $timeStr .Poster.GetDisplayName}} */}
				</>)}
			</span>
		</div>
		{(props.milestoneID) ? (<>
		<div className="meta tw-my-1">
			<a className="milestone" href={`${String(props.repo?.link ?? "")}/milestone/${String(props.milestoneID ?? "")}`}>
				<span className="svg-icon" aria-label="octicon-milestone"></span>
				<span className="tw-align-middle">{props.milestone?.name as any}</span>
			</a>
		</div>
		</>) : null}
		{(props.page?.linkedPRs) ? (<>
		{((index $.Page.LinkedPRs .ID) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="meta tw-my-1">
			<a href={`${String(props.repo?.link ?? "")}/pulls/${String(props.index ?? "")}`}>
				<span className={`tw-m-0 ${(props.pullRequest?.hasMerged) ? `tw-text-purpletw-text-red` : `tw-text-green`}`}><span className="svg-icon" aria-label="octicon-git-merge"></span></span>
				<span className="tw-align-middle">{item.title as any} <span className="tw-text-grey-light">#{item.index as any}</span></span>
			</a>
		</div>
		</React.Fragment>))}
		</>) : null}
		{/* $tasks */}
		{(props.tasks > 0) ? (<>
			<div className="meta tw-my-1">
				<span className="svg-icon" aria-label="octicon-checklist"></span>
				<span className="tw-align-middle">{props.getTasksDone as any} / {props.tasks as any}</span>
			</div>
		</>) : null}
	</div>

	{((props.labels || props.assignees)) ? (<>
	<div className="issue-card-bottom">
		{/* the labels container must always be present, to help the assignees list right-aligned */}
		<div className="issue-card-bottom-part labels-list">
			{((props.labels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{/* $link */}
				{/* TODO: {{$link = QueryBuild $link "labels" $label.ID}} */}
				{/* TODO: {{ctx.RenderUtils.RenderLabelWithLink $label $link}} */}
			</React.Fragment>))}
		</div>
		{(props.assignees) ? (<>
		<div className="issue-card-bottom-part tw-justify-end">
			{((props.assignees) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<a target="_blank" href={String(props.homeLink ?? "")} data-tooltip-content={`${i18n("repo.projects.column.assigned_to")} ${String(props.name ?? "")}`}>{/* TODO: {{ctx.AvatarUtils.Avatar . 24}} */}</a>
			</React.Fragment>))}
		</div>
		</>) : null}
	</div>
	</>) : null}
</>) }

  </>)
}
