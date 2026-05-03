import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.emails.email_manage_panel")} ({i18n("admin.total")})
		</h4>
		<div className="ui attached segment">
			<div className="ui secondary filter menu tw-items-center tw-mx-0">
				<form className="ui form ignore-dirty tw-flex-1">
					{/* template: shared/search/combo */}
				</form>
				{/* Sort */}
				<div className="ui dropdown type jump item tw-mr-0">
					<span className="text">
						{i18n("repo.issues.filter_sort")}
					</span>
					<span className="svg-icon" aria-label="octicon-triangle-down"></span>
					<div className="menu">
						<a className={`${((props.sortType === "email" || !(props.sortType))) ? `active ` : ""}item`} href={`?sort=email&q=${String(props.keyword ?? "")}`}>{i18n("admin.emails.filter_sort.email")}</a>
						<a className={`${(props.sortType === "reverseemail") ? `active ` : ""}item`} href={`?sort=reverseemail&q=${String(props.keyword ?? "")}`}>{i18n("admin.emails.filter_sort.email_reverse")}</a>
						<a className={`${(props.sortType === "username") ? `active ` : ""}item`} href={`?sort=username&q=${String(props.keyword ?? "")}`}>{i18n("admin.emails.filter_sort.name")}</a>
						<a className={`${(props.sortType === "reverseusername") ? `active ` : ""}item`} href={`?sort=reverseusername&q=${String(props.keyword ?? "")}`}>{i18n("admin.emails.filter_sort.name_reverse")}</a>
					</div>
				</div>
			</div>
		</div>
		<div className="ui attached table segment">
			<table className="ui very basic table unstackable">
				<thead>
					<tr>
						<th data-sortt-asc="username" data-sortt-desc="reverseusername">
							{i18n("admin.users.name")}
							{/* TODO: {{SortArrow "username" "reverseusername" $.SortType false}} */}
						</th>
						<th>{i18n("admin.users.full_name")}</th>
						<th data-sortt-asc="email" data-sortt-desc="reverseemail" data-sortt-default="true">
							{i18n("email")}
							{/* TODO: {{SortArrow "email" "reverseemail" $.SortType true}} */}
						</th>
						<th>{i18n("admin.emails.primary")}</th>
						<th>{i18n("admin.emails.activated")}</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{((props.emails) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td><a href={`/${String(props.name | PathEscape ?? "")}`}>{item.name as any}</a></td>
							<td className="gt-ellipsis tw-max-w-48">{item.fullName as any}</td>
							<td className="gt-ellipsis tw-max-w-48">{item.email as any}</td>
							<td>{/* TODO: {{svg (Iif .IsPrimary "octicon-check" "octicon-x")}} */}</td>
							<td>
								{(item.canChange) ? (<>
									<a className="show-modal" href data-modal="#change-email-modal" data-modal-uid={String(props.uID ?? "")}
										data-modal-email={String(props.email ?? "")}
										data-modal-primary={`${(props.isPrimary) ? `1` : `0`}`}
										data-modal-activate={`${(props.isActivated) ? `0` : `1`}`}>
										{/* TODO: {{svg (Iif .IsActivated "octicon-check" "octicon-x")}} */}
									</a>
								</>) : (<>
									{/* TODO: {{svg (Iif .IsActivated "octicon-check" "octicon-x")}} */}
								</>)}
							</td>
							<td>
								<a className="link-action negative" href data-url={`${String(props.link ?? "")}/delete?id=${String(props.iD ?? "")}&uid=${String(props.uID ?? "")}`}
									data-modal-confirm-header={String(i18n("admin.emails.delete") ?? "")}
									data-modal-confirm-content={String(i18n("admin.emails.delete_desc") ?? "")}
								><span className="svg-icon" aria-label="octicon-trash"></span></a>
							</td>
						</tr>
					{/* else */}
						<tr><td className="tw-text-center" colspan="6">{i18n("no_results_found")}</td></tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>

		{/* template: base/paginate */}

		<div className="ui g-modal-confirm modal" id="change-email-modal">
			<div className="header">
				{i18n("admin.emails.change_email_header")}
			</div>
			<form className="content ui form" action={`/-/admin/emails/activate`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<p className="center">{i18n("admin.emails.change_email_text")}</p>

				<input type="hidden" name="sort" value={String(props.sortType ?? "")} />
				<input type="hidden" name="q" value={String(props.keyword ?? "")} />
				<input type="hidden" name="is_primary" value={String(props.isPrimary ?? "")} />
				<input type="hidden" name="is_activated" value={String(props.isActivated ?? "")} />

				<input type="hidden" name="uid" />
				<input type="hidden" name="email" />
				<input type="hidden" name="primary" />
				<input type="hidden" name="activate" />

				{/* template: base/modal_actions_confirm */}
			</form>
		</div>
	</div>

{/* template: admin/layout_footer */}

  </>)
}
