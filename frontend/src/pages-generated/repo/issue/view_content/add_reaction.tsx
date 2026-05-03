// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function AddReaction(props: Record<string, unknown>) {
  return (<>
{("ctx.RootData.IsSigned") ? (<>
<div className="item action ui dropdown jump pointing top right select-reaction" data-action-url={String(props.actionURL ?? "")} aria-label={String(i18n("repo.reactions") ?? "")}>
	<a className="muted"><span className="svg-icon" aria-label="octicon-smiley"></span></a>
	<div className="menu">
		{((AllowedReactions) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<a className="item emoji" data-tooltip-content={String("" ?? "")} aria-label={String("" ?? "")} data-reaction-content={String("" ?? "")} data-global-click="onCommentReactionButtonClick">{/* TODO: {{ReactionToEmoji $value}} */}</a>
		</React.Fragment>))}
	</div>
</div>
</>) : null}

  </>)
}
