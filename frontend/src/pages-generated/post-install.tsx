// @ts-nocheck
import React from 'react'
import { i18n } from '../lib/i18n'

export default function PostInstall(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content install post-install tw-h-full">
	<div className="home tw-text-center tw-h-full tw-flex tw-flex-col tw-justify-center">{/* the "home" class makes the links green */}
		{/* the "cup" has a handler, so move it a little leftward to make it visually in the center */}
		<div className="tw-ml-[-30px]"><img width="160" src={`/img/loading.png`} alt aria-hidden="true" /></div>
		<div className="tw-my-[2em] tw-text-[18px]">
			<a id="goto-after-install" href={``}>{i18n("install.installing_desc")}</a>
		</div>
	</div>
</div>


  </>)
}
