// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Users(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{props.title as any}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div id="search-user-box" className="ui search input tw-align-middle">
					<input className="prompt" name="user" placeholder={String(i18n("search.user_kind") ?? "")} autocomplete="off" autofocus required />
				</div>
				<button className="ui primary button">{i18n("admin.badges.add_user")}</button>
			</form>
		</div>
		{(props.users) ? (<>
		<div className="ui attached segment">
			<div className="flex-divided-list items-with-main">
				{((props.users) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item tw-items-center">
						<div className="item-leading">
							<a href={String(props.homeLink ?? "")}>{/* TODO: {{ctx.AvatarUtils.Avatar . 32}} */}</a>
						</div>
						<div className="item-main">
							<div className="item-title">
								{/* template: shared/user/name */}
							</div>
						</div>
						<div className="item-trailing">
							<a className="ui red tiny button inline link-action" data-url={`${String(props.link ?? "")}/delete?id=${String(props.iD ?? "")}`} data-modal-confirm={String(i18n("admin.badges.delete_user_desc") ?? "")}>
								{i18n("admin.badges.remove_user")}
							</a>
						</div>
					</div>
				</React.Fragment>))}
			</div>
		</div>
		</>) : null}
		{/* template: base/paginate */}
	</div>

{/* template: admin/layout_footer */}

  </>)
}
