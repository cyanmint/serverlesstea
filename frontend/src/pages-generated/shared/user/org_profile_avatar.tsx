import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function OrgProfileAvatar(props: Record<string, unknown>) {
  return (<>
{(props.contextUser) && (<>
	<div className="ui container">
		<div className="ui vertically grid head">
			<div className="column">
				<div className="ui header flex-text-block tw-break-anywhere">
					{/* TODO: {{ctx.AvatarUtils.Avatar . 100}} */}
					<span className="tw-text-text-light"><a className="muted" href={String(props.homeLink ?? "")}>{props.displayName as any}</a></span>
					<span className="org-visibility">
						{(props.visibility?.isLimited) ? (<><div className="ui medium basic horizontal label">{i18n("org.settings.visibility.limited_shortname")}</div></>) : null}
						{(props.visibility?.isPrivate) ? (<><div className="ui medium basic horizontal label">{i18n("org.settings.visibility.private_shortname")}</div></>) : null}
					</span>
				</div>
			</div>
		</div>
	</div>
</>) }

  </>)
}
