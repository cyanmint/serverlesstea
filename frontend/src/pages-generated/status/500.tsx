import React from 'react'
import { i18n } from '../../lib/i18n'

export default function 500(props: Record<string, unknown>) {
  return (<>
{/* This page should only depend the minimal template functions/variables, to avoid triggering new panics.
* base template functions: AppName, AssetUrlPrefix, AssetURI, AppSubUrl
* ctx.Locale
* .Flash
* .ErrorMsg
* .SignedUser (optional) */}
<!DOCTYPE html>
<html lang={String("" ?? "")} data-theme={String("" ?? "")}>
<head>
	{/* TODO: {{ctx.HeadMetaContentSecurityPolicy}} */}
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Internal Server Error - {String(props.appName ?? "")}</title>
	<link rel="icon" href={`/img/favicon.svg`} type="image/svg+xml" />
	<link rel="alternate icon" href={`/img/favicon.png`} type="image/png" />
	{/* template: base/head_style */}
</head>
<body>
	<div className="full height">
		<nav className="ui secondary menu">
			<div className="ui container tw-flex">
				<div className="item tw-flex-1">
					<a href={`/`} aria-label={String(i18n("home_title") ?? "")}>
						<img width="30" height="30" src={`/img/logo.svg`} alt={String(i18n("logo") ?? "")} aria-hidden="true" />
					</a>
				</div>
				<div className="item">
					<button className="ui icon button disabled"><span className="svg-icon" aria-label="octicon-three-bars"></span></button>{/* a fake button to make the UI looks better */}
				</div>
			</div>
		</nav>
		<div className="divider tw-my-0"></div>
		<div role="main" className="page-content status-page-500">
			<div className="ui container" >
				{/* alert */}
				<div className="status-page-error">
					<div className="status-page-error-title">500 Internal Server Error</div>
					{(props.errorMsg) ? (<>
					<div className="tw-mt-8">
						<p>{i18n("error.occurred")}:</p>
						<pre className="tw-whitespace-pre-wrap tw-wrap-anywhere">{props.errorMsg as any}</pre>
					</div>
					</>) : null}
					<div className="tw-mt-8 tw-text-center">
						{((props.signedUser?.isAdmin || props.showFooterVersion)) ? (<><p>{i18n("admin.config.app_ver")}: {""}</p></>) : null}
						{(props.signedUser?.isAdmin) ? (<><p>{i18n("error.report_message")}</p></>) : null}
					</div>
				</div>
			</div>
		</div>
	</div>

	{/* When a sub-template triggers an 500 error, its parent template has been partially rendered, then the 500 page
		will be rendered after that partially rendered page, the HTML/JS are totally broken. Use this inline script to try to move it to main viewport.
		And this page shouldn't include any other JS file, avoid duplicate JS execution (still due to the partial rendering). */}
	<script nonce={String("" ?? "")} type="module">
		const embedded = document.querySelector('.page-content .page-content.status-page-500');
		if (embedded) {
			// move the 500 error page content to main view
			const embeddedParent = embedded.parentNode;
			let main = document.querySelector('.page-content');
			main = main ?? document.querySelector('body');
			main.prepend(document.createElement('hr'));
			main.prepend(embedded);
			embeddedParent.remove(); // remove the unrelated 500-page elements (eg: the duplicate nav bar)
		}
	</script>
</body>
</html>

  </>)
}
