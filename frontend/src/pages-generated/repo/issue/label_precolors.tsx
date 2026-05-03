// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function LabelPrecolors(props: Record<string, unknown>) {
  return (<>
<div className="precolors">
	<button type="button" className="ui button generate-random-color">
		<span className="svg-icon" aria-label="octicon-sync"></span>
	</button>
	<div>
		<div className="tw-flex">
			<a className="color" style="background-color:#e11d21" data-color-hex="#e11d21"></a>
			<a className="color" style="background-color:#eb6420" data-color-hex="#eb6420"></a>
			<a className="color" style="background-color:#fbca04" data-color-hex="#fbca04"></a>
			<a className="color" style="background-color:#009800" data-color-hex="#009800"></a>
			<a className="color" style="background-color:#006b75" data-color-hex="#006b75"></a>
			<a className="color" style="background-color:#207de5" data-color-hex="#207de5"></a>
			<a className="color" style="background-color:#0052cc" data-color-hex="#0052cc"></a>
			<a className="color" style="background-color:#5319e7" data-color-hex="#5319e7"></a>
		</div>
		<div className="tw-flex">
			<a className="color" style="background-color:#f6c6c7" data-color-hex="#f6c6c7"></a>
			<a className="color" style="background-color:#fad8c7" data-color-hex="#fad8c7"></a>
			<a className="color" style="background-color:#fef2c0" data-color-hex="#fef2c0"></a>
			<a className="color" style="background-color:#bfe5bf" data-color-hex="#bfe5bf"></a>
			<a className="color" style="background-color:#bfdadc" data-color-hex="#bfdadc"></a>
			<a className="color" style="background-color:#c7def8" data-color-hex="#c7def8"></a>
			<a className="color" style="background-color:#bfd4f2" data-color-hex="#bfd4f2"></a>
			<a className="color" style="background-color:#d4c5f9" data-color-hex="#d4c5f9"></a>
		</div>
	</div>
</div>

  </>)
}
