// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository wiki new">
	{/* template: repo/header */}
	<div className="ui container">
		{/* alert */}
		<div className="ui header flex-left-right">
			{i18n("repo.wiki.new_page")}
			{(props.pageIsWikiEdit) ? (<>
				<a className="ui tiny primary button" href={`${String(props.repoLink ?? "")}/wiki?action=_new`}>{i18n("repo.wiki.new_page_button")}</a>
			</>) : null}
		</div>
		<form className="ui form" action={`?action=${(props.pageIsWikiEdit) ? `_edit` : `_new`}`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className={`field ${(props.err_Title) ? `error` : ""}`}>
				<input name="title" value={String(props.title ?? "")} aria-label={String(i18n("repo.wiki.page_title") ?? "")} placeholder={String(i18n("repo.wiki.page_title") ?? "")} autofocus required />
			</div>
			<div className="help">
				{i18n("repo.wiki.page_name_desc")}
			</div>

			{/* $content */}
			{(!(props.pageIsWikiEdit)) ? (<>
				{/* TODO: {{$content = ctx.Locale.Tr "repo.wiki.welcome"}} */}
			</>) : null}
			{/* template: shared/combomarkdowneditor */}

			<div className="field tw-mt-4">
				<input name="message" aria-label={String(i18n("repo.wiki.default_commit_message") ?? "")} placeholder={String(i18n("repo.wiki.default_commit_message") ?? "")} />
			</div>
			<div className="divider"></div>
			<div className="flex-text-block tw-justify-end">
				<a className="ui basic cancel button" href={String(props.link ?? "")}>{i18n("cancel")}</a>
				<button className="ui primary button">{i18n("repo.wiki.save_page")}</button>
			</div>
		</form>
	</div>
</div>


  </>)
}
