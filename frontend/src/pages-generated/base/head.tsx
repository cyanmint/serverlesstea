import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Head(props: Record<string, unknown>) {
  return (<>
<!DOCTYPE html>
<html lang={String("" ?? "")} data-theme={String("" ?? "")}>
<head>
	{/* TODO: {{ctx.HeadMetaContentSecurityPolicy}} */}
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>{(props.title) ? (<>{props.title as any} - </>) : null}{props.pageTitleCommon as any}</title>
	<link rel="manifest" href={`/site-manifest.json`} />
	<meta name="author" content={`${(props.repository) ? `${String(props.owner?.name ?? "")}` : ``}`} />
	<meta name="description" content={`${(props.repository) ? `${String(props.repository?.name ?? "")}${(props.repository?.description) ? ` - ${String(props.repository?.description ?? "")}` : ""}` : ``}`} />
	<meta name="keywords" content={String("" ?? "")} />
	<meta name="referrer" content="same-origin" />{/* required by: 1. "redirect_to" cookie; 2. cross-origin protection */}
{(props.goGetImport) ? (<>
	<meta name="go-import" content={`${String(props.goGetImport ?? "")} git ${String(props.repoCloneLink?.hTTPS ?? "")}`} />
	<meta name="go-source" content={`${String(props.goGetImport ?? "")} _ ${String(props.goDocDirectory ?? "")} ${String(props.goDocFile ?? "")}`} />
</>) : null}
{((props.enableFeed && props.feedURL)) ? (<>
	<link rel="alternate" type="application/atom+xml" title="" href={`${String(props.feedURL ?? "")}.atom`} />
	<link rel="alternate" type="application/rss+xml" title="" href={`${String(props.feedURL ?? "")}.rss`} />
</>) : null}
	<link rel="icon" href={`/img/favicon.svg`} type="image/svg+xml" />
	<link rel="alternate icon" href={`/img/favicon.png`} type="image/png" />
	{/* template: base/head_opengraph */}
	{/* template: base/head_style */}
	{/* template: base/head_script */}
	{/* template: custom/header */}
</head>
<body>
	{/* template: custom/body_outer_pre */}

	<div className="full height">
		<noscript>{i18n("enable_javascript")}</noscript>

		{/* template: custom/body_inner_pre */}

		{(!(props.pageIsInstall)) ? (<>
			{/* template: base/head_navbar */}
		</>) : null}

{(false) ? (<>
	{/* to make html structure "likely" complete to prevent IDE warnings */}
	</div>
</body>
</html>
</>) : null}

  </>)
}
