// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function ParticipantList(props: Record<string, unknown>) {
  return (<>
{(props.participants) ? (<>
	<div className="divider"></div>
	<span className="text"><strong>{i18n("repo.issues.num_participants")}</strong></span>
	<div className="ui list tw-flex tw-flex-wrap">
		{((props.participants) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<a {...(item.iD > 0 ? {"href": String(props.homeLink ?? "")} : {})} data-tooltip-content={String(props.getDisplayName ?? "")}>
				{/* TODO: {{ctx.AvatarUtils.Avatar . 20 "tw-my-0.5 tw-mr-1"}} */}
			</a>
		</React.Fragment>))}
	</div>
</>) : null}

  </>)
}
