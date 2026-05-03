import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Fileisempty(props: Record<string, unknown>) {
  return (<>
<div className="file-not-rendered-prompt">
	{i18n("repo.file_is_empty")}
</div>

  </>)
}
