import React from 'react'
import { i18n } from '../../lib/i18n'

export default function HeadBanner(props: Record<string, unknown>) {
  return (<>
{/* $banner */}
{(banner) ? (<>
<div className="ui info message web-banner-container">
	<div className="render-content markup web-banner-content">
		{/* TODO: {{ctx.RenderUtils.MarkdownToHtml $banner.ContentMessage}} */}
	</div>
	<button type="button" className="btn dismiss-banner link-action" aria-label={String(i18n("dismiss") ?? "")} data-url={`/-/web-banner/dismiss`}>
		<span className="svg-icon" aria-label="octicon-x"></span>
	</button>
</div>
</>) : null}

  </>)
}
