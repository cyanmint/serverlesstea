import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Accountlinks(props: Record<string, unknown>) {
  return (<>
{/* No account links, no way to add account links: Menu will not be shown. */}
{((props.accountLinks || props.orderedOAuth2Names)) ? (<>
<h4 className="ui top attached header">
	{i18n("settings.manage_account_links")}
	{(props.orderedOAuth2Names) ? (<>
		<div className="ui right">
			<div className="ui dropdown">
				<div className="ui primary tiny button">{i18n("settings.link_account")}</div>
				<div className="menu">
					{((props.orderedOAuth2Names) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{/* $provider */}
						<a className="item" href={`/user/oauth2/`}>
							{/* TODO: {{$provider.IconHTML 20}} */}
							{/* TODO: {{$provider.DisplayName}} */}
						</a>
					</React.Fragment>))}
				</div>
			</div>
		</div>
	</>) : null}
</h4>

<div className="ui attached segment">
	<div className="flex-divided-list items-with-main">
		<div className="item">
			{i18n("settings.manage_account_links_desc")}
		</div>
		{((props.accountLinks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				{/* $providerData */}
				<div className="item-leading">
					{/* TODO: {{$providerData.IconHTML 20}} */}
				</div>
				<div className="item-main">
					<span className="item-title" data-tooltip-content={String("" ?? "")}>
						{/* TODO: {{$loginSource.Name}} */}
					</span>
					{(item.loginSource?.isActive) ? (<>
					<span className="flex-text-body tw-text-primary">{i18n("repo.settings.active")}</span>
					</>) : null}
				</div>
				<div className="item-trailing">
					<button className="ui red tiny button delete-button" data-modal-id="delete-account-link" data-url={`/user/settings/security/account_link`} data-id={String("" ?? "")}>
						{i18n("settings.delete_key")}
					</button>
				</div>
			</div>
		</React.Fragment>))}
	</div>

	<div className="ui g-modal-confirm delete modal" id="delete-account-link">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("settings.remove_account_link")}
		</div>
		<div className="content">
			<p>{i18n("settings.remove_account_link_desc")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</div>
</>) : null}

  </>)
}
