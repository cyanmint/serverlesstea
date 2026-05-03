import React from 'react'
import { i18n } from '../../lib/i18n'

export default function UserCards(props: Record<string, unknown>) {
  return (<>
{/* need to reload after "watch/unwatch" or "star/unstar" fetch actions */}
<div className="user-cards" id="user-cards-container" data-fetch-trigger="fetch-reload">
	{(props.cardsTitle) ? (<>
	<h2 className="ui dividing header">
		{props.cardsTitle as any}
	</h2>
	</>) : null}
	<ul className="list">
		{((props.cards) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<li className="item ui segment">
				<a href={String(props.homeLink ?? "")}>
					{/* TODO: {{ctx.AvatarUtils.Avatar . 48}} */}
				</a>
				<h3 className="name"><a href={String(props.homeLink ?? "")}>{item.displayName as any}</a></h3>

				<div className="meta">
					{(item.website) ? (<>
						<span className="svg-icon" aria-label="octicon-link"></span> <a href={String(props.website ?? "")} target="_blank">{item.website as any}</a>
					</>) : null} {(item.location) ? (<>
						<span className="svg-icon" aria-label="octicon-location"></span> {item.location as any}
					</>) : (<>
						<span className="svg-icon" aria-label="octicon-calendar"></span> {i18n("user.joined_on")}
					</>)}
				</div>
			</li>
		</React.Fragment>))}
	</ul>

	{/* template: base/paginate */}
</div>

  </>)
}
