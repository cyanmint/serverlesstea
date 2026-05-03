// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ViewEmails(props: Record<string, unknown>) {
  return (<>
<div className="flex-divided-list items-with-main">
	{((props.emails) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="item">
			<div className="item-main">
				<div className="flex-text-block">
					<a href={`mailto:${String(props.email ?? "")}`}>{item.email as any}</a>
					{(item.isPrimary) ? (<>
						<div className="ui primary label">{i18n("settings.primary")}</div>
					</>) : null}
					{(item.isActivated) ? (<>
						<div className="ui green label">{i18n("settings.activated")}</div>
					</>) : (<>
						<div className="ui label">{i18n("settings.requires_activation")}</div>
					</>)}
				</div>
			</div>
		</div>
	</React.Fragment>))}
</div>

  </>)
}
