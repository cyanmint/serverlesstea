import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Reactions(props: Record<string, unknown>) {
  return (<>
<div className="bottom-reactions" data-action-url={String(props.actionURL ?? "")} role="group" aria-label={String(i18n("repo.reactions") ?? "")}>
{((props.reactions) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	{/* $hasReacted */}
	<a role="button" className={`ui label basic${(props.hasReacted) ? ` primary` : ""}${(!("ctx.RootData.IsSigned")) ? ` disabled` : ""}`}
		data-global-click="onCommentReactionButtonClick"
		data-tooltip-content title={`${(props.value?.getMoreUserCount > 0) ? ` ${i18n("repo.reactions_more")}` : ""}`}
		aria-label={`: ${(props.value?.getMoreUserCount > 0) ? ` ${i18n("repo.reactions_more")}` : ""}`}
		data-tooltip-placement="bottom-start"
		data-reaction-content={String("" ?? "")} data-has-reacted={String("" ?? "")}>
		<span className="reaction">{/* TODO: {{ReactionToEmoji $key}} */}</span>
		<span className="reaction-count">{/* TODO: {{len $value}} */}</span>
	</a>
</React.Fragment>))}
{("AllowedReactions") ? (<>
	{/* template: repo/issue/view_content/add_reaction */}
</>) : null}
</div>

  </>)
}
