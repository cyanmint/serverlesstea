import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Unadopted(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.repos.unadopted")}
			<div className="ui right">
				<a className="ui primary tiny button" href={`/-/admin/repos`}>{i18n("admin.repos.repo_manage_panel")}</a>
			</div>
		</h4>
		<div className="ui attached segment">
			<form className="ui form ignore-dirty">
				<div className="ui small fluid action input">
					<input name="search" value="true" type="hidden" />
					<input name="q" value={String(props.keyword ?? "")} placeholder={String(i18n("repo.adopt_search") ?? "")} autofocus />
					{/* template: shared/search/button */}
				</div>
			</form>
		</div>
		{(props.search) ? (<>
			<div className="ui attached segment settings">
				{(props.dirs) ? (<>
					<div className="ui aligned divided list">
						{((props.dirs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<div className="item flex-text-block">
								<span className="tw-flex-1"> <span className="svg-icon" aria-label="octicon-file-directory-fill"></span> {props.dir as any}</span>
								<div>
									<button className="ui button primary show-modal tw-p-2" data-modal={`#adopt-unadopted-modal-`}><span className="svg-icon" aria-label="octicon-plus"></span> {i18n("repo.adopt_preexisting_label")}</button>
									<div className="ui g-modal-confirm modal" id={`adopt-unadopted-modal-`}>
										<div className="header">
											<span className="label">{i18n("repo.adopt_preexisting")}</span>
										</div>
										<div className="content">
											<p>{i18n("repo.adopt_preexisting_content")}</p>
										</div>
										<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/-/admin/repos/unadopted`}>
											<input type="hidden" name="id" value={String("" ?? "")} />
											<input type="hidden" name="action" value="adopt" />
											<input type="hidden" name="q" value={String(props.keyword ?? "")} />
											<input type="hidden" name="page" value={String(props.currentPage ?? "")} />
											{/* template: base/modal_actions_confirm */}
										</form>
									</div>
									<button className="ui button red show-modal tw-p-2" data-modal={`#delete-unadopted-modal-`}><span className="svg-icon" aria-label="octicon-x"></span> {i18n("repo.delete_preexisting_label")}</button>
									<div className="ui g-modal-confirm modal" id={`delete-unadopted-modal-`}>
										<div className="header">
											<span className="label">{i18n("repo.delete_preexisting")}</span>
										</div>
										<div className="content">
											<p>{i18n("repo.delete_preexisting_content")}</p>
										</div>
										<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/-/admin/repos/unadopted`}>
											<input type="hidden" name="id" value={String("" ?? "")} />
											<input type="hidden" name="action" value="delete" />
											<input type="hidden" name="q" value={String(props.keyword ?? "")} />
											<input type="hidden" name="page" value={String(props.currentPage ?? "")} />
											{/* template: base/modal_actions_confirm */}
										</form>
									</div>
								</div>
							</div>
						</React.Fragment>))}
					</div>
					{/* template: base/paginate */}
				</>) : (<>
					<div className="item">
						{i18n("admin.repos.unadopted.no_more")}
					</div>
					{/* template: base/paginate */}
				</>)}
			</div>
		</>) : null}
	</div>

{/* template: admin/layout_footer */}

  </>)
}
