// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Invite(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content">
	<div className="ui container">
		{/* alert */}
		<div className="tw-flex tw-justify-center">
			<div className="flex-relaxed-list">
				<div className="tw-flex tw-justify-center">{/* TODO: {{ctx.AvatarUtils.Avatar .Organization 140}} */}</div>
				<div>{i18n("org.teams.invite.title")}</div>
				<div>{i18n("org.teams.invite.by")}</div>
				<div>{i18n("org.teams.invite.description")}</div>
				<form className="ui form tw-mt-4" data-action="" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<button className="fluid ui primary button">{i18n("org.teams.join")}</button>
				</form>
			</div>
		</div>
	</div>
</div>


  </>)
}
