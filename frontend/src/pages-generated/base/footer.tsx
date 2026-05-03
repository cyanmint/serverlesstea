import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Footer(props: Record<string, unknown>) {
  return (<>
{(false) ? (<>
	{/* to make html structure "likely" complete to prevent IDE warnings */}
<html>
<body>
	<div>
</>) : null}

		{/* template: custom/body_inner_post */}
	</div>
	{/* template: custom/body_outer_post */}
	{/* template: base/footer_content */}
	{/* TODO: {{ctx.ScriptImport "js/index.js" "module"}} */}
	{/* template: custom/footer */}
	<script nonce={String("" ?? "")} type="module">
	if (!window.config?.frontendInited) alert("Frontend is not initialized, check console errors or asset files.")
	</script>
</body>
</html>

  </>)
}
