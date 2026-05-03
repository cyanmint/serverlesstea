import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ViewDetails(props: Record<string, unknown>) {
  return (<>
<div className="flex-divided-list items-with-main">
	<div className="item">
		<div className="item-leading">
			{/* TODO: {{ctx.AvatarUtils.Avatar .User 48}} */}
		</div>
		<div className="item-main">
			<div className="item-title">
				{/* template: shared/user/name */}
				{(props.user?.isAdmin) ? (<>
					<span className="ui basic label">{i18n("admin.users.admin")}</span>
				</>) : null}
				{(props.user?.isTypeBot) ? (<>
					<span className="ui basic label">{i18n("admin.users.bot")}</span>
				</>) : null}
			</div>
			<div className="item-body">
				<b>{i18n("admin.users.auth_source")}:</b>
				{/* TODO: {{Iif (eq .LoginSource.ID 0) (ctx.Locale.Tr "admin.users.local") .LoginSource.Name}} */}
			</div>
			<div className="item-body">
				<b>{i18n("admin.users.activated")}:</b>
				{/* TODO: {{svg (Iif .User.IsActive "octicon-check" "octicon-x")}} */}
			</div>
			<div className="item-body">
				<b>{i18n("admin.users.prohibit_login")}:</b>
				{/* TODO: {{svg (Iif .User.ProhibitLogin "octicon-check" "octicon-x")}} */}
			</div>
			<div className="item-body">
				<b>{i18n("admin.users.restricted")}:</b>
				{/* TODO: {{svg (Iif .User.IsRestricted "octicon-check" "octicon-x")}} */}
			</div>
			<div className="item-body">
				<b>{i18n("settings.visibility")}:</b>
				{(props.user?.visibility?.isPublic) ? (<>{i18n("settings.visibility.public")}</>) : null}
				{(props.user?.visibility?.isLimited) ? (<>{i18n("settings.visibility.limited")}</>) : null}
				{(props.user?.visibility?.isPrivate) ? (<>{i18n("settings.visibility.private")}</>) : null}
			</div>
			<div className="item-body">
				<b>{i18n("admin.users.2fa")}:</b>
				{/* TODO: {{svg (Iif .TwoFactorEnabled "octicon-check" "octicon-x")}} */}
			</div>
			{(props.user?.language) ? (<>
				<div className="item-body">
					<span className="flex-text-inline">
						<b>{i18n("settings.language")}:</b>
						{((props.allLangs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>{(props.user?.language === item.lang) ? (<>{item.name as any}</>) : null}</React.Fragment>))}
					</span>
				</div>
			</>) : null}
			{(props.user?.location) ? (<>
				<div className="item-body">
					<span className="flex-text-inline"><span className="svg-icon" aria-label="octicon-location"></span>{props.user?.location as any}</span>
				</div>
			</>) : null}
			{(props.user?.website) ? (<>
				<div className="item-body">
					<span className="flex-text-inline">
						<span className="svg-icon" aria-label="octicon-link"></span>
						<a target="_blank" href={String(props.user?.website ?? "")}>{props.user?.website as any}</a>
					</span>
				</div>
			</>) : null}
		</div>
	</div>
</div>

  </>)
}
