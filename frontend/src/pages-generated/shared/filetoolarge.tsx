// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Filetoolarge(props: Record<string, unknown>) {
  return (<>
<div className="file-not-rendered-prompt">
	{i18n("repo.file_too_large")}
	{(props.rawFileLink) ? (<><a href={String(props.rawFileLink ?? "")} rel="nofollow">{i18n("repo.file_view_raw")}</a></>) : null}
</div>

  </>)
}
