import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Searchbottom(props: Record<string, unknown>) {
  return (<>
{((props.result?.language || !(props.result?.updatedUnix?.isZero))) ? (<>
<div className="ui bottom attached table segment flex-left-right">
		<div className="tw-flex tw-items-center tw-ml-4">
			{(props.result?.language) ? (<>
					<i className="color-icon tw-mr-2" style={`background-color: ${String(props.result?.color ?? "")}`}></i>{props.result?.language as any}
			</>) : null}
		</div>
		<div className="tw-mr-4">
			{(!(props.result?.updatedUnix?.isZero)) ? (<>
					<span className="ui grey text">{i18n("explore.code_last_indexed_at")}</span>
			</>) : null}
		</div>
</div>
</>) : null}

  </>)
}
