// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CiteButtons(props: Record<string, unknown>) {
  return (<>
<button className="ui citation button" id="citation-copy-apa" data-text="">
APA
</button>
<button className="ui citation button" id="citation-copy-bibtex" data-text="">
BibTeX
</button>
{/* the value will be updated by initCitationFileCopyContent, the code below is used to avoid UI flicking */}
<input id="citation-copy-content" value="" size="1" readonly />
<button className="ui icon button" id="citation-clipboard-btn" data-tooltip-content={String(i18n("copy") ?? "")} data-clipboard-target="#citation-copy-content">
	<span className="svg-icon" aria-label="octicon-copy"></span>
</button>

  </>)
}
