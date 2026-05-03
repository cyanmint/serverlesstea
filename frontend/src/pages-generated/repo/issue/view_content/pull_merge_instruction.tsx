import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function PullMergeInstruction(props: Record<string, unknown>) {
  return (<>
{/* $data */}
{/* $pull */}
<div className="divider"></div>
<details>
	<summary>{i18n("repo.pulls.cmd_instruction_hint")}</summary>
	<div className="tw-mt-2">
		<div><h3>{i18n("repo.pulls.cmd_instruction_checkout_title")}</h3>{i18n("repo.pulls.cmd_instruction_checkout_desc")}</div>
		{/* $localBranch */}
		{(props.pull?.headRepo?.iD !== props.pull?.baseRepo?.iD) ? (<>
			{/* TODO: {{$localBranch = print $pull.HeadRepo.OwnerName "-" $pull.HeadBranch}} */}
		</>) : null}
		<div className="ui secondary segment tw-font-mono">
			{/* $gitRemoteName */}
			{(props.pull?.flow === 0) ? (<>
			<div>git fetch -u {(props.pull?.headRepo?.iD !== props.pull?.baseRepo?.iD) ? (<>{/* TODO: {{ctx.AppFullLink $pull.HeadRepo.Link}} */}</>) : (<>{props.gitRemoteName as any}</>)} {/* TODO: {{$pull.HeadBranch}} */}:{props.localBranch as any}</div>
			</>) : (<>
			<div>git fetch -u {props.gitRemoteName as any} {/* TODO: {{$pull.GetGitHeadRefName}} */}:{props.localBranch as any}</div>
			</>)}
			<div>git checkout {props.localBranch as any}</div>
		</div>
		{(props.data?.showMergeInstructions) ? (<>
		<div>
			<h3>{i18n("repo.pulls.cmd_instruction_merge_title")}</h3>
			{i18n("repo.pulls.cmd_instruction_merge_desc")}
			{(!(props.data?.autodetectManualMerge)) ? (<>
				<div>{i18n("repo.pulls.cmd_instruction_merge_warning")}</div>
			</>) : null}
		</div>
		<div className="ui secondary segment tw-font-mono">
			<div data-pull-merge-style="merge">
				<div>git checkout {/* TODO: {{$pull.BaseBranch}} */}</div>
				<div>git merge --no-ff {props.localBranch as any}</div>
			</div>
			<div className="tw-hidden" data-pull-merge-style="rebase">
				<div>git checkout {/* TODO: {{$pull.BaseBranch}} */}</div>
				<div>git merge --ff-only {props.localBranch as any}</div>
			</div>
			<div className="tw-hidden" data-pull-merge-style="rebase-merge">
				<div>git checkout {props.localBranch as any}</div>
				<div>git rebase {/* TODO: {{$pull.BaseBranch}} */}</div>
				<div>git checkout {/* TODO: {{$pull.BaseBranch}} */}</div>
				<div>git merge --no-ff {props.localBranch as any}</div>
			</div>
			<div className="tw-hidden" data-pull-merge-style="squash">
				<div>git checkout {/* TODO: {{$pull.BaseBranch}} */}</div>
				<div>git merge --squash {props.localBranch as any}</div>
			</div>
			<div className="tw-hidden" data-pull-merge-style="fast-forward-only">
				<div>git checkout {/* TODO: {{$pull.BaseBranch}} */}</div>
				<div>git merge --ff-only {props.localBranch as any}</div>
			</div>
			<div className="tw-hidden" data-pull-merge-style="manually-merged">
				<div>git checkout {/* TODO: {{$pull.BaseBranch}} */}</div>
				<div>git merge {props.localBranch as any}</div>
			</div>
			<div>git push {props.gitRemoteName as any} {/* TODO: {{$pull.BaseBranch}} */}</div>
		</div>
		</>) : null}
	</div>
</details>

  </>)
}
