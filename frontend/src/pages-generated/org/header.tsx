// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Header(props: Record<string, unknown>) {
  return (<>
<div className="ui container tw-flex tw-gap-4">
	<div>{/* TODO: {{ctx.AvatarUtils.Avatar .Org 100}} */}</div>
	<div className="flex-relaxed-list">
		<div className="ui header flex-left-right tw-m-0">
			<div className="flex-text-block">
				<span className="tw-text-2xl">{props.org?.displayName as any}</span>
				{(props.org?.visibility?.isLimited) ? (<><span className="ui large basic horizontal label">{i18n("org.settings.visibility.limited_shortname")}</span></>) : null}
				{(props.org?.visibility?.isPrivate) ? (<><span className="ui large basic horizontal label">{i18n("org.settings.visibility.private_shortname")}</span></>) : null}
			</div>
			<div className="flex-text-block">
				{(props.enableFeed) ? (<>
					<a className="ui basic label button" href={`${String(props.org?.homeLink ?? "")}.rss`} data-tooltip-content={String(i18n("rss_feed") ?? "")}>
						<span className="svg-icon" aria-label="octicon-rss"></span>
					</a>
				</>) : null}
				{(props.isSigned) ? (<>
					{/* template: org/follow_unfollow */}
				</>) : null}
			</div>
		</div>
		{(props.renderedDescription) ? (<>
			<div className="render-content markup">{props.renderedDescription as any}</div>
		</>) : null}
		<div>
			{(props.org?.location) ? (<>
				<div className="flex-text-block"><span className="svg-icon" aria-label="octicon-location"></span> <span>{props.org?.location as any}</span></div>
			</>) : null}
			{(props.org?.website) ? (<>
				<div className="flex-text-block"><span className="svg-icon" aria-label="octicon-link"></span> <a className="muted" target="_blank" rel="me" href={String(props.org?.website ?? "")}>{props.org?.website as any}</a></div>
			</>) : null}
			{((props.isSigned && props.org?.email)) ? (<>
				<div className="flex-text-block"><span className="svg-icon" aria-label="octicon-mail"></span> <a className="muted" href={`mailto:${String(props.org?.email ?? "")}`}>{props.org?.email as any}</a></div>
			</>) : null}
		</div>
	</div>
</div>

{/* template: org/menu */}

  </>)
}
