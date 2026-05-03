import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Repos(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		<h4 className="ui top attached header">
			{i18n("settings.repos")}
		</h4>
		<div className="ui attached segment">
			{((props.allowAdopt || props.allowDelete)) ? (<>
				{(props.dirs) ? (<>
					<div className="ui list">
						{((props.dirs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							{/* $repo */}
							<div className={`item ${(!(props.repo)) ? `tw-py-1` : ""}`}>{/* if not repo, then there are "adapt" buttons, so the padding shouldn't be that default large */}
								<div className="content">
									{(props.repo) ? (<>
										{(item.repo?.isPrivate) ? (<>
											<span className="tw-text-gold icon"><span className="svg-icon" aria-label="octicon-lock"></span></span>
										</>) : null} {(item.repo?.isFork) ? (<>
											<span className="icon"><span className="svg-icon" aria-label="octicon-repo-forked"></span></span>
										</>) : null} {(item.repo?.isMirror) ? (<>
											<span className="icon"><span className="svg-icon" aria-label="octicon-mirror"></span></span>
										</>) : null} {(item.repo?.isTemplate) ? (<>
											<span className="icon"><span className="svg-icon" aria-label="octicon-repo-template"></span></span>
										</>) : (<>
											<span className="icon"><span className="svg-icon" aria-label="octicon-repo"></span></span>
										</>)}
										<a className="muted name" href={String("" ?? "")}>{/* TODO: {{$repo.OwnerName}} */}/{/* TODO: {{$repo.Name}} */}</a>
										<span className="tw-text-text-light-3" {...(!(item.repo?.size === 0) ? {"data-tooltip-content": String("" ?? "")} : {})}>{/* TODO: {{FileSize $repo.Size}} */}</span>
										{(item.repo?.isFork) ? (<>
											{i18n("repo.forked_from")}
											<span><a href={String("" ?? "")}>{/* TODO: {{$repo.BaseRepo.OwnerName}} */}/{/* TODO: {{$repo.BaseRepo.Name}} */}</a></span>
										</>) : null}
									</>) : (<>
										<span className="icon tw-inline-block tw-pt-2"><span className="svg-icon" aria-label="octicon-file-directory-fill"></span></span>
										<span className="name tw-inline-block tw-pt-2">{props.contextUser?.name as any}/{props.dir as any}</span>
										<div className="tw-float-right">
											{(props.allowAdopt) ? (<>
												<button className="ui button primary show-modal tw-p-2" data-modal={`#adopt-unadopted-modal-`}><span className="icon"><span className="svg-icon" aria-label="octicon-plus"></span></span><span className="label">{i18n("repo.adopt_preexisting_label")}</span></button>
												<div className="ui g-modal-confirm modal" id={`adopt-unadopted-modal-`}>
													<div className="header">
														<span className="label">{i18n("repo.adopt_preexisting")}</span>
													</div>
													<div className="content">
														<p>{i18n("repo.adopt_preexisting_content")}</p>
													</div>
													<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/user/settings/repos/unadopted`}>
														<input type="hidden" name="id" value={String("" ?? "")} />
														<input type="hidden" name="action" value="adopt" />
														{/* template: base/modal_actions_confirm */}
													</form>
												</div>
											</>) : null}
											{(props.allowDelete) ? (<>
												<button className="ui button red show-modal tw-p-2" data-modal={`#delete-unadopted-modal-`}><span className="icon"><span className="svg-icon" aria-label="octicon-x"></span></span><span className="label">{i18n("repo.delete_preexisting_label")}</span></button>
												<div className="ui g-modal-confirm modal" id={`delete-unadopted-modal-`}>
													<div className="header">
														<span className="label">{i18n("repo.delete_preexisting")}</span>
													</div>
													<div className="content">
														<p>{i18n("repo.delete_preexisting_content")}</p>
													</div>
													<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/user/settings/repos/unadopted`}>
														<input type="hidden" name="id" value={String("" ?? "")} />
														<input type="hidden" name="action" value="delete" />
														{/* template: base/modal_actions_confirm */}
													</form>
												</div>
											</>) : null}
										</div>
									</>)}
								</div>
							</div>
						</React.Fragment>))}
					</div>
					{/* template: base/paginate */}
				</>) : (<>
					<div className="item">
						{i18n("settings.repos_none")}
					</div>
				</>)}
			</>) : (<>
				{(props.repos) ? (<>
					<div className="ui list">
						{((props.repos) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<div className="item">
								<div className="content flex-text-block">
									{(item.isPrivate) ? (<>
										<span className="svg-icon" aria-label="octicon-lock"></span>
									</>) : null} {(item.isFork) ? (<>
										<span className="svg-icon" aria-label="octicon-repo-forked"></span>
									</>) : null} {(item.isMirror) ? (<>
										<span className="svg-icon" aria-label="octicon-mirror"></span>
									</>) : null} {(item.isTemplate) ? (<>
										<span className="svg-icon" aria-label="octicon-repo-template"></span>
									</>) : (<>
										<span className="svg-icon" aria-label="octicon-repo"></span>
									</>)}
									<a className="name" href={String(props.link ?? "")}>{item.ownerName as any}/{item.name as any}</a>
									<span>{/* TODO: {{FileSize .Size}} */}</span>
									{(item.isFork) ? (<>
										{i18n("repo.forked_from")}
										<span><a href={String(props.baseRepo?.link ?? "")}>{item.baseRepo?.ownerName as any}/{item.baseRepo?.name as any}</a></span>
									</>) : null}
								</div>
							</div>
						</React.Fragment>))}
					</div>
					{/* template: base/paginate */}
				</>) : (<>
					<div className="item">
						{i18n("settings.repos_none")}
					</div>
				</>)}
			</>)}
		</div>
	</div>

<div className="ui g-modal-confirm delete modal">
	<div className="header">
		<span className="svg-icon" aria-label="octicon-trash"></span>
		{i18n("settings.remove_account_link")}
	</div>
	<div className="content">
		<p>{i18n("settings.remove_account_link_desc")}</p>
	</div>
	{/* template: base/modal_actions_confirm */}
</div>

{/* template: user/settings/layout_footer */}

  </>)
}
