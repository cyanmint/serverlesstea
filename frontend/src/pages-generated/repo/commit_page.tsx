import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitPage(props: Record<string, unknown>) {
  return (<>

{/* $commitLinkBase */}
<div role="main" aria-label={String(props.title ?? "")} className="page-content repository diff">
	{/* template: repo/header */}
	<div className="ui container fluid padded">
		<div className="ui top attached header clearing segment tw-relative commit-header">
			<div className="tw-flex tw-mb-4 tw-gap-1">
				<h3 className="tw-mb-0 tw-flex-1"><span className="commit-summary" title={String(props.commit?.summary ?? "")}>{/* TODO: {{ctx.RenderUtils.RenderCommitMessage .Commit.Message $.Repository}} */}</span>{/* template: repo/commit_statuses */}</h3>
				{(!(props.pageIsWiki)) ? (<>
					<div className="commit-header-buttons">
						<a className="ui primary tiny button" href={String(props.sourcePath ?? "")}>
							{i18n("repo.diff.browse_source")}
						</a>
						{((props.permission?.canWrite?.("ctx.Consts.RepoUnitTypeCode") && !(props.repository?.isArchived) && !(props.isDeleted))) ? (<>{/* TODO: {{- /* * / -}} */}
							<div className="ui dropdown primary tiny button">
								{i18n("repo.commit.operations")}
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
								<div className="menu">
									<div className="header">{i18n("repo.commit.operations")}</div>
									<div className="divider"></div>
									<div className="item show-create-branch-modal"
										data-content={String(i18n("repo.branch.new_branch_from") ?? "")} {/* used by the form */}
										data-branch-from={String("" ?? "")}
										data-branch-from-urlcomponent={String(props.commitID ?? "")}
										data-modal="#create-branch-modal">
										{i18n("repo.branch.create_branch_operation")}
									</div>
									<div className="item show-create-branch-modal"
										data-content={String(i18n("repo.branch.new_branch_from") ?? "")} {/* used by the form */}
										data-branch-from={String("" ?? "")}
										data-branch-from-urlcomponent={String(props.commitID ?? "")}
										data-modal="#create-tag-modal"
										data-modal-from-span="#modal-create-tag-from-span"
										data-modal-form="#create-tag-form">
										{i18n("repo.tag.create_tag_operation")}
									</div>
									<div className="item show-modal revert-button"
										data-modal="#cherry-pick-modal"
										data-modal-cherry-pick-type="revert"
										data-modal-cherry-pick-header={String(i18n("repo.commit.revert-header") ?? "")}
										data-modal-cherry-pick-content={String(i18n("repo.commit.revert-content") ?? "")}
										data-modal-cherry-pick-submit={String(i18n("repo.commit.revert") ?? "")}>{i18n("repo.commit.revert")}</div>
									<div className="item cherry-pick-button show-modal"
										data-modal="#cherry-pick-modal"
										data-modal-cherry-pick-type="cherry-pick"
										data-modal-cherry-pick-header={String(i18n("repo.commit.cherry-pick-header") ?? "")}
										data-modal-cherry-pick-content={String(i18n("repo.commit.cherry-pick-content") ?? "")}
										data-modal-cherry-pick-submit={String(i18n("repo.commit.cherry-pick") ?? "")}>{i18n("repo.commit.cherry-pick")}</div>
									<div className="ui g-modal-confirm modal" id="cherry-pick-modal">
										<div className="header">
											<span id="cherry-pick-header"></span>
										</div>
										<div className="content">
											<p id="cherry-pick-content" className="branch-dropdown"></p>

											<form method="get">
												{/* template: repo/branch_dropdown */}
												<input type="hidden" id="cherry-pick-type" name="cherry-pick-type" /><br />
												<button type="submit" id="cherry-pick-submit" className="ui primary button"></button>
											</form>
										</div>
									</div>
									<div className="ui small modal" id="create-branch-modal">
										<div className="header">
											{i18n("repo.branch.new_branch")}
										</div>
										<div className="content">
											<form className="ui form" id="create-branch-form" data-action="" data-base-action={`${String(props.repoLink ?? "")}/branches/_new/commit/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
												<div className="field">
													<label>
														{i18n("repo.branch.new_branch_from")}
													</label>
												</div>
												<div className="required field">
													<label htmlFor="new_branch_name">{i18n("repo.branch.name")}</label>
													<input id="new_branch_name" name="new_branch_name" required />
												</div>

												<div className="actions">
													<button className="ui cancel button">{i18n("settings.cancel")}</button>
													<button className="ui primary button">{i18n("repo.branch.confirm_create_branch")}</button>
												</div>
											</form>
										</div>
									</div>
									<div className="ui small modal" id="create-tag-modal">
										<div className="header">
											{i18n("repo.tag.create_tag_operation")}
										</div>
										<div className="content">
											<form className="ui form" id="create-tag-form" data-action="" data-base-action={`${String(props.repoLink ?? "")}/branches/_new/commit/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
												<input type="hidden" name="create_tag" value="true" />
												<div className="field">
													<label>
														{i18n("repo.tag.create_tag_from")}
													</label>
												</div>
												<div className="required field">
													<label htmlFor="new_branch_name">{i18n("repo.release.tag_name")}</label>
													<input id="new_branch_name" name="new_branch_name" required />
												</div>

												<div className="actions">
													<button className="ui cancel button">{i18n("settings.cancel")}</button>
													<button className="ui primary button">{i18n("repo.tag.confirm_create_tag")}</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</>) : null}
					</div>
				</>) : null}
			</div>
			{("IsMultilineCommitMessage .Commit.Message") ? (<>
				<pre className="commit-body">{/* TODO: {{ctx.RenderUtils.RenderCommitBody .Commit.Message $.Repository}} */}</pre>
			</>) : null}
			{/* template: repo/commit_load_branches_and_tags */}
		</div>

		<div className="ui bottom attached segment flex-text-block tw-flex-wrap">
			<div className="flex-text-inline">
				{(props.author) ? (<>
					{/* TODO: {{ctx.AvatarUtils.Avatar .Author 20}} */}
					{(props.author?.fullName) ? (<>
						<a href={String(props.author?.homeLink ?? "")}><strong>{props.author?.fullName as any}</strong></a>
					</>) : (<>
						<a href={String(props.author?.homeLink ?? "")}><strong>{props.commit?.author?.name as any}</strong></a>
					</>)}
				</>) : (<>
					{/* TODO: {{ctx.AvatarUtils.AvatarByEmail .Commit.Author.Email .Commit.Author.Email 20}} */}
					<strong>{props.commit?.author?.name as any}</strong>
				</>)}
			</div>

			<span className="tw-text-text-light">{/* TODO: {{DateUtils.TimeSince .Commit.Author.When}} */}</span>

			<div className="flex-text-inline">
				{((props.commit?.committer?.name !== props.commit?.author?.name || props.commit?.committer?.email !== props.commit?.author?.email)) ? (<>
					<span className="tw-text-text-light">{i18n("repo.diff.committed_by")}</span>
					{((props.verification?.committingUser && props.verification?.committingUser?.iD)) ? (<>
						{/* TODO: {{ctx.AvatarUtils.Avatar .Verification.CommittingUser 20}} */}
						<a href={String(props.verification?.committingUser?.homeLink ?? "")}><strong>{props.commit?.committer?.name as any}</strong></a>
					</>) : (<>
						{/* TODO: {{ctx.AvatarUtils.AvatarByEmail .Commit.Committer.Email .Commit.Committer.Name 20}} */}
						<strong>{props.commit?.committer?.name as any}</strong>
					</>)}
				</>) : null}
			</div>

			{(props.verification) ? (<>
				{/* template: repo/commit_sign_badge */}
			</>) : null}

			<div className="tw-flex-1"></div>

			<div className="flex-text-inline tw-gap-5">
				{(props.parents) ? (<>
					<div className="flex-text-inline">
						<span>{i18n("repo.diff.parent")}</span>
						{((props.parents) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<a className="ui label commit-id-short" href={`/`}>{/* TODO: {{ShortSha .}} */}</a>
						</React.Fragment>))}
					</div>
				</>) : null}
				<div className="flex-text-inline">
					<span>{i18n("repo.diff.commit")}</span>
					<a className="ui label commit-id-short" href={`/`}>{/* TODO: {{ShortSha .CommitID}} */}</a>
				</div>
			</div>
		</div>

		{(props.noteRendered) ? (<>
			<div className="ui top attached header segment git-notes">
				<span className="svg-icon" aria-label="octicon-note"></span>
				{i18n("repo.diff.git-notes")}:
				{(props.noteAuthor) ? (<>
					<a href={String(props.noteAuthor?.homeLink ?? "")}>
						{(props.noteAuthor?.fullName) ? (<>
							<strong>{props.noteAuthor?.fullName as any}</strong>
						</>) : (<>
							<strong>{props.noteCommit?.author?.name as any}</strong>
						</>)}
					</a>
				</>) : (<>
					<strong>{props.noteCommit?.author?.name as any}</strong>
				</>)}
				<span className="tw-text-text-light">{/* TODO: {{DateUtils.TimeSince .NoteCommit.Author.When}} */}</span>
			</div>
			<div className="ui bottom attached info segment git-notes">
				<pre className="commit-body">{props.noteRendered as any}</pre>
			</div>
		</>) : null}

		{/* template: repo/diff/box */}
	</div>
</div>


  </>)
}
