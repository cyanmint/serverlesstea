import React from 'react'
import { i18n } from '../../lib/i18n'

export default function FooterContent(props: Record<string, unknown>) {
  return (<>
<footer className="page-footer" role="group" aria-label={String(i18n("aria.footer") ?? "")}>
	<div className="left-links" role="contentinfo" aria-label={String(i18n("aria.footer.software") ?? "")}>
		{("ShowFooterPoweredBy") ? (<>
			<a target="_blank" href="https://about.gitea.com">{i18n("powered_by")}</a>
		</>) : null}
		{((props.showFooterVersion || props.pageIsAdmin)) ? (<>
			<span>
			{i18n("version")}:
			{(props.isAdmin) ? (<>
				<a href={`/-/admin/config`}>{""}</a>
			</>) : (<>
				{""}
			</>)}
			</span>
		</>) : null}
		{((props.templateLoadTimes && "ShowFooterTemplateLoadTime")) ? (<>
			<span>
				{i18n("page")}: <strong>{/* TODO: {{LoadTimes .PageStartTime}} */}</strong>
				{i18n("template")}{(props.templateName) ? (<> {props.templateName as any}</>) : null}: <strong>{/* TODO: {{call .TemplateLoadTimes}} */}</strong>
			</span>
		</>) : null}
		{(props.viteModeIsDev) ? (<><span className="ui basic label primary">ViteDevMode</span></>) : null}
	</div>
	<div className="right-links" role="group" aria-label={String(i18n("aria.footer.links") ?? "")}>
		<div className="ui dropdown custom" id="footer-theme-selector">
			<span className="default-text">{/* TODO: {{ctx.RenderUtils.RenderThemeItem ctx.CurrentWebTheme 16}} */}</span>
			<div className="menu theme-menu"></div>
		</div>
		<div className="ui dropdown upward">
			<span className="flex-text-inline"><span className="svg-icon" aria-label="octicon-globe"></span> {/* TODO: {{ctx.Locale.LangName}} */}</span>
			<div className="menu language-menu">
				{((props.allLangs?.("-")) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<a lang={String(props.lang ?? "")} data-url={`/?lang=${String(props.lang ?? "")}`} className={`item ${("ctx.Locale.Lang" === props.lang) ? `selected` : ""}`}>{item.name as any}</a>
				{/* TODO: {{end -}} */}
			</div>
		</div>
		<a href={`/licenses.txt`}>{i18n("licenses")}</a>
		{(item.enableSwagger) ? (<><a href={`/api/swagger`}>API</a></>) : null}
		{/* template: custom/extra_links_footer */}
	</div>
</footer>

  </>)
}
